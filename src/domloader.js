/**
 * DOM loader, a magical place
 */

exports.load = function(){
	var loaded = false, src, jsFiles =[], inlineCode = '';

	// gets page and parses body for script tags
	request(global.testingUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			
			var scripts = body.match(/<script[\s\S]*?>[\s\S]*?<\/script>/g), i;
			scripts = Array.prototype.slice.call(scripts);

			for(i in scripts){
				if(scripts.hasOwnProperty(i)){

					var script = scripts[i];

					if(script.indexOf(' src=') > -1){

						var scriptPart = script.substring(script.indexOf('src="') + 5, script.lastIndexOf('">'));
						var scriptName = (scriptPart[0] == '/')? scriptPart.substring(1): scriptPart;

						jsFiles.push(scriptName.replace(/&amp;/ig, '&'));
					} else {	
						
						inlineCode += script.replace(/(<script .*">)|(<\/script>)/g, '');
					}
				}
			}

			inlineCode = inlineCode.replace(/&amp;/g, '&');

			// Setup jsdom with hardcore options
			// Note: html fragment should be basic, and features are mandatory
			document = global.document = jsdom.jsdom('<html><head></head><body></body></html>', {
				url: global.testingUrl,
				features: {
					FetchExternalResources   : ["script", "img", "css", "frame", "iframe", "link"],
					ProcessExternalResources : ["script", "img", "css", "frame", "iframe", "link"],
					MutationEvents           : '2.0',
					QuerySelector            : true,
				   SkipExternalResources	 : false
				}
			});

			// global document setup
			// All required browser objects MUST BE available to Ext otherwise it won't work.
			window = global.window = global.document.parentWindow;
			location = global.location = location = window.location;
			navigator = global.navigator = global.window.navigator;
			self = global.self = window;
			
			// adding previously parsed inlineCode to head of new document
			var pageScripts = document.createElement('script');
			pageScripts.innerHTML = inlineCode;
			document.head.appendChild(pageScripts);

			// DOMParser object also must be present or Ext will throw errors
			window.DOMParser = global.window.DOMParser = new global.DOMParser();

			// Mandatory reload is 'the thing' that makes this process work.
			// After adding script to head we have to reload it, since
			// jsdom won't execute <script>'s whatever you do. 
			// NOTE: 
			// This is unsafe though, someone could inject code to format your hdd.
			// Do this in familiar environments
			window.location.reload();

			// DOM loaded, waiting for 1 second for scripts to load ...
			setTimeout(function(){

				Ext = global.Ext = window.Ext;

				// if you want to see what's loaded to page uncomment the next line
				//for( var i in Ext.ComponentManager.all){ console.log(i) }
			}, 1000); // this timeout period could be increased if your app fails to load in a sec
		}
	});
};
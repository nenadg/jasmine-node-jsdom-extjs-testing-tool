/**
 *	Ext.JS Test runner
 * Runs your tests against your Ext.JS application
 * 
 * --------------------------------------------------------------------------------------------
 * We don't use selenium-webdriver at this moment since it's html dump sucks, and comes escaped
 * but if for any reason you need it, just uncomment following lines:
 *
 * var webdriver = require('selenium-webdriver');
 * var client = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();
 * global.webdriver = webdriver;
 * global.client = client;
 *
 * ,also include this to package.json "selenium-webdriver": "2.44.0" in dependencies part
 */

var DOMParser = require('xmldom').DOMParser,
	jsdom = require('jsdom'),
	XMLHttpRequest = require('./src/XMLHttpRequest'),
	request = require('request'),
	domLoader = require('./src/domloader.js'),
	config = require('./configuration/env.json'),
	testingUrl = config.testingUrl,
	testingVariant = config.testingVariant;

// sets jasmine's environment defaults
jasmine.getEnv().defaultTimeoutInterval = 10000;
jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

// sets globals that will be in use by dom loader
global.jsdom = jsdom;
global.DOMParser = DOMParser;
global.XMLHttpRequest = XMLHttpRequest;
global.request = request;
global.testingVariant = testingVariant;
global.testingUrl = testingUrl;

console.log('> Loading ' + testingVariant + ' variant against ' + testingUrl + '\n');
// Execute dom loader script to get everything in place
domLoader.load();

describe('General test runner', function(){

	// Test definitions are placed in definitions.spec.js
	// We can't use --autotest because it'll ignore tests ordering,
	// we must follow in most of the cases.
	//
	// If you want to use --autotest, name your tests like this:
	//			1.firstTest.spec.js
	//			2.secondTest.spec.js
	//			... and so on.

	require('./src/definitions.js');

	afterEach(function(){
		// something that should happen meanwhile
	});
});
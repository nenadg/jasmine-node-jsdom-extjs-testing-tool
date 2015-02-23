exports.loadsNamespace = it('Should figure out if namespace of my app is available', function (done) {

	waitsFor(function () {

		MyNS = global.MyNS = window.MyNS;

		return MyNS != undefined;

	}, 'Test if namespace is there', 100);

	runs(function () {
		
		expect(MyNS).toBeDefined();
		done();
	});
});
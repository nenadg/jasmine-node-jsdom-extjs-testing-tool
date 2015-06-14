exports.loadsNamespace = it('Should figure out if namespace of my app is available', function (done) {

	waitsFor(function () {

		MyTestApp = global.MyTestApp = window.MyTestApp;

		return MyTestApp != undefined;

	}, 'Test if namespace is there', 100);

	runs(function () {
		
		expect(MyTestApp).toBeDefined();
		done();
	});
});
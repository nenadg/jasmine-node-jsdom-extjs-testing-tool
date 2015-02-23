exports.loadsExt = it('Should load Ext.JS', function (done) {

	waitsFor(function () {
		Ext = global.Ext;

		return Ext != undefined;
	});

	runs(function () {
		
		expect(Ext.ComponentQuery.query('tabpanel')).toBeDefined();
		expect(Ext).toBeDefined();
		expect(Ext.getVersion()).toBeTruthy();
		expect(Ext.getVersion().major).toEqual(5);

		done();
	});
});
exports.firesRandomButton = it('Should fireHandler on Button and click `Yes` in generated yes-no dialog', function (done) {

	waitsFor(function () {

		var button = Ext.ComponentQuery.query('button[text=Button]')[0];
			button.fireHandler();

		var yesButton = Ext.ComponentQuery.query('button[text=Yes]')[0];
			yesButton.fireHandler();

		return MyNS.app.clicked === true;

	}, 'Test if namespace is there', 100);

	runs(function () {
		
		expect(MyNS.app.clicked).toBe(true);
		done();
	});
});
module( "Simple address book app test" );

	test("MVC's should be a functions", function() {
		expect( 3 );
		equal(typeof Contacts.model, 'function', 'Contacts.model should be a function');
		equal(typeof Contacts.view, 'function', 'Contacts.view should be a function');
		equal(typeof Contacts.controller, 'function', 'Contacts.controller should be a function');
	});

	test("Contacts.model testing", function() {
		expect( 3 );
		var contactNote = new Contacts.model({name: "My name is test", email:"testsisgood@gmail.com"});
		equal( contactNote.name(), "My name is test", "Should return the same name" );
		contactNote.name("Actually Test");
		equal( contactNote.name(), "Actually Test", "Should permit to change the name" );
		equal( contactNote.email(), "testsisgood@gmail.com", "Should return the same email" );
	});

	var dummyElement = document.getElementById("dummy");
	test("m.render testing", function() {
		expect(2);
		var view1 = m("div", {}, [
			m("div", {}, "0"),
			m("div", {}, "1"),
			m("div", {}, "2")
		]);
		var view2= m("div", {}, [
			m("div", {}, "0")
		]);
		m.render(dummyElement, view1);
		equal(dummyElement.innerHTML, "<div><div>0</div><div>1</div><div>2</div></div>", "view1 rendered correctly");
		m.render(dummyElement, view2);
		equal(dummyElement.innerHTML, "<div><div>0</div></div>", "view2 should be rendered correctly");
	});
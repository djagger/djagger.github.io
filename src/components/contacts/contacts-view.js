Contacts.view = function (ctrl) {

	var removeNote = function (index) {
		return m('button.close', { onclick: ctrl.removeNote.curry(index), type:'button' }, 'x');
	};

	var beautifulLine = function() {
		if (ctrl.list.length >= 1) {
			return m('hr');
		}
	};

	return m('.contacts', [

			//Add new input fields
			m('form.form-horizontal', { role:'form' }, [
				m('.form-group', [
					m('.col-sm-3', [
						m('input[type=text].form-control', { value: ctrl.name(), onchange: m.withAttr('value', ctrl.name), placeholder: 'Your name (min 5 characters)' } ),
					]),
				]),
				m('.form-group', [
					m('.col-sm-3', [
						m('input[type=text].form-control', { value: ctrl.email(), onchange: m.withAttr('value', ctrl.email), placeholder: 'Your email' } ),
					]),
				]),
			]),

			//Add button
			m('.form-group', [
				m('a.btn.btn-primary.btn-sm', { onclick: ctrl.addNote, href:'#' }, 'Add new Note'),
			]),

			beautifulLine(),

			//Contacts form
			m('form.form-horizontal', { role:'form' }, [
				ctrl.list.map(function (contact, index) {
					return [
						m('.row', [
							m('.col-md-4', [
								m('h3', "Note #" + (index+1)),
							]),
							m('.col-md-1', [
								removeNote(index),
							]),
						]),
						m('.form-group', [
							m('label.col-sm-1.control-label', "Name:"),
							m('.col-sm-3' + (ctrl.hasErrorOfLengthChar(contact.name()) ? '' : '.has-error'), [
								m('input[type=text].form-control', { value: contact.name(), onchange: m.withAttr('value', contact.name), placeholder: 'Your name (min 5 characters)' } ),
							]),
						]),
						m('.form-group', [
							m('label.col-sm-1.control-label', "Email:"),
							m('.col-sm-3' + (ctrl.hasErrorEmail(contact.email()) ? '' : '.has-error'), [
								m('input[type=text].form-control', { value: contact.email(), onchange: m.withAttr('value', contact.email), placeholder: 'Your email' } ),
							]),
						]),
					]
				}),
			]),
		
	]);

};
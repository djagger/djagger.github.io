Contacts.controller = function () {

	var ctrl = this;

	//Contacts collection
	ctrl.list = Contacts.storage.get();

	//Update with props
	console.log('Objects in localStorage: ');
	ctrl.list = ctrl.list.map(function(item) {
		console.log(item);
		return new Contacts.model(item);
	});

	ctrl.name  = m.prop('');
	ctrl.email = m.prop('');

	ctrl.addNote = function () {
		var prepareName = ctrl.name().trim();
		var prepareEmail = ctrl.email().trim();
		if (prepareName&&prepareEmail) {
			ctrl.list.push(new Contacts.model({name: prepareName, email: prepareEmail}));
			Contacts.storage.put(ctrl.list);
		}
		ctrl.name('');
		ctrl.email('');
	};

	ctrl.removeNote = function (index) {
		ctrl.list.splice(index, 1);
		Contacts.storage.put(ctrl.list);
	};

	ctrl.hasErrorOfLengthChar = function (name) {
		return name.length > 4;
	};

	ctrl.hasErrorEmail = function (email) {
		/*
			Функция проверки формата адреса e-mail.
			Возвращает true, если адрес соответствует формату, false - в противном случае.

			Правила формирования имени домена:
				Название домена должно состоять более чем из одного символа, начинаться и заканчиваться буквой
				латинского алфавита или цифрой. Промежуточными символами могут быть буквы латинского алфавита,
				цифры или дефис. (Примечание: Минимальная длина доменного имени для зон SU, BIZ, INFO и DE принята
				равной  3 символа)

			Правила формирования названии доменной зоны:
				Имя доменной зоны должно состоять из букв латинского алфавита. Количество символов должно
				быть от 2 до 6 включительно
				(примеры доменных зон: 3 символа - info, 4 символа - travel, 6 символов - museum).
		*/
		var validEmailPattern = /^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,6}$/i;
		return validEmailPattern.test(email);
	};

};
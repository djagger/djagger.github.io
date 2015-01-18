var Contacts = Contacts || {};

(function () {

	var storage_id = 'mithril-address-book-app';
	Contacts.storage = {

		get: function () {
			return JSON.parse(localStorage.getItem(storage_id) || '[]');
		},

		put: function (contactsNote) {
			localStorage.setItem(storage_id, JSON.stringify(contactsNote));
		}

	};

})();

Contacts.model = function (data) {
	this.name = m.prop(data.name);
	this.email = m.prop(data.email);
};
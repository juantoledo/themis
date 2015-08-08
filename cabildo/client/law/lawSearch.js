Template.lawSearch.helpers({
	lawsFound: function() {
		Meteor.subscribe("lawSearches", Session.get("lawSearchValue"));
		if (Session.get("lawSearchValue")) {
			return Laws.find({}, { sort: [["score", "desc", "date: -1"]] });
		} else {
			return Laws.find({});
		}
	}
});

Template.lawSearch.events({
	"submit #lawSearch": function (e) {
		e.preventDefault();
		Session.set("lawSearchValue", $("#lawSearchValue").val());
	}
});
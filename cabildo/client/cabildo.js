Template.recentLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
	})
}

Template.recentLaws.recentLaws = function(){
	return Laws.find({}, {sort:{date: -1}, limit:5}).fetch();
}
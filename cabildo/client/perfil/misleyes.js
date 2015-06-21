Template.misleyes.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws", Meteor.userId());
		
	})
}

Template.misleyes.userLaws = function(){
	return Laws.find({owner:Meteor.userId()}, {sort:{date: -1}});
}
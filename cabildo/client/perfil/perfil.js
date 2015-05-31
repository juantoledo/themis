Template.perfil.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws", Meteor.userId());
		
	})
}

Template.perfil.userLaws = function(){
	return Laws.find({owner:Meteor.userId()}, {sort:{date: -1}});
}
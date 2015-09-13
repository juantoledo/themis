Template.congressLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws", Meteor.userId());
	})
}

Template.congressLaws.userName = function(){
  return getUserName(Meteor.user());
}

Template.congressLaws.congressLaws = function(){
	return Laws.find({"type": LAW_TYPE_CONGRESS}, {sort:{date: -1}});
}
Template.senateLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws", Meteor.userId());
	})
}

Template.senateLaws.userName = function(){
  return getUserName(Meteor.user());
}

Template.senateLaws.senateLaws = function(){
	return Laws.find({"type": LAW_TYPE_CONGRESS, "congressType": "" + LAW_TYPE_CONGRESS_SENATOR}, {sort:{date: -1}});
}


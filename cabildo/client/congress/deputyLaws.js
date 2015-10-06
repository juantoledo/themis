Template.deputyLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws", Meteor.userId());
	})
}

Template.deputyLaws.userName = function(){
  return getUserName(Meteor.user());
}

Template.deputyLaws.deputyLaws = function(){
	return Laws.find({"type": LAW_TYPE_CONGRESS, "congressType": "" + LAW_TYPE_CONGRESS_DEPUTY}, {sort:{date: -1}});
}


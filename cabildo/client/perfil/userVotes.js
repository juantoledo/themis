Template.userVotes.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws", Meteor.userId());
	})
}

Template.userVotes.userName = function(){
  return getUserName(Meteor.user());
}

Template.userVotes.laws = function(){
	return Laws.find({"councilorVotes.councilorId": Meteor.userId()}, {sort:{date: -1}});
}
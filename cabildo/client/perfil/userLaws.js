Template.userLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("userLaws", Meteor.userId());
	})
}

Template.userLaws.userName = function(){
  return getUserName(Meteor.user());
}

Template.userLaws.laws = function(){
	return Laws.find({owner: Meteor.userId()}, {sort:{date: -1}});
}
Template.recentLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
	})
}

Template.moreVotedLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
	})
}

Template.moreCommentedLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
	})
}



Template.recentLaws.recentLaws = function(){
	return Laws.find({}, {sort:{date: -1}, limit:5}).fetch();
}

Template.moreVotedLaws.moreVotedLaws = function(){
	
	return Laws.find({}, { sort: [["votesQuantity", "desc"]], limit:5 });
}

Template.moreCommentedLaws.moreCommentedLaws = function(){
	
	return Laws.find({}, { sort: [["commentsQuantity", "desc"]], limit:5 });
}
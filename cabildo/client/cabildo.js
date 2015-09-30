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

Template.recentCongressLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
	})
}

Template.moreVotedCongressLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
	})
}

Template.moreCommentedCongressLaws.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
	})
}



Template.recentLaws.recentLaws = function(){
	return Laws.find({"type": LAW_TYPE_USER}, {sort:{date: -1}, limit:5}).fetch();
}

Template.moreVotedLaws.moreVotedLaws = function(){
	return Laws.find({"type": LAW_TYPE_USER}, { sort: [["votesQuantity", "desc"]], limit:5 });
}

Template.moreCommentedLaws.moreCommentedLaws = function(){
	
	return Laws.find({"type": LAW_TYPE_USER}, { sort: [["commentsQuantity", "desc"]], limit:5 });
}

Template.recentCongressLaws.recentCongressLaws = function(){
	return Laws.find({"type": LAW_TYPE_CONGRESS}, {sort:{date: -1}, limit:5}).fetch();
}

Template.moreVotedCongressLaws.moreVotedCongressLaws = function(){
	return Laws.find({"type": LAW_TYPE_CONGRESS}, { sort: [["votesQuantity", "desc"]], limit:5 });
}

Template.moreCommentedCongressLaws.moreCommentedCongressLaws = function(){
	
	return Laws.find({"type": LAW_TYPE_CONGRESS}, { sort: [["commentsQuantity", "desc"]], limit:5 });
}
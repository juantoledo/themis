Template.reviewCongressVote.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("deputies");
	})
}


Template.reviewCongressVote.deputiesVote = function(){
	return Deputies.find({}, {});
}

Template.reviewCongressVote.typeVote = function(){
	return retrieveTypeVoteDescription(this.type);
}
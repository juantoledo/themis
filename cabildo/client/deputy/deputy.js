Template.deputy.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("deputies");
	})
}

Template.deputy.typeVote = function(){
	return retrieveTypeVoteDescription(this.type);
}

Template.deputy.isDeputy = function(){
	return CONGRESSMAN_DEPUTY == this.type;
}


Template.deputy.photobyType = function(){
	return retrieveTypeVoteImage(this.type);
}


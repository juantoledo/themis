Template.deputy.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("deputies");
	})
}

Template.deputy.typeVote = function(){
	return retrieveTypeVoteDescription(this.type);
}

Template.deputy.photobyType = function(){
	return "finger_up.png";
	//finger_up.png finger_down.png abstention.png
}


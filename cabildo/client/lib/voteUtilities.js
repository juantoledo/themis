retrieveTypeVoteDescription = function(type) {
	if(type == LAW_COUNCILOR_VOTE_IN_FAVOR){
		return "++1";
	}
	else if(type == LAW_COUNCILOR_VOTE_AGAINST){
		return "--1";
	}
	else if(type == LAW_COUNCILOR_VOTE_ABSTENTION){
		return "no voto";
	}
	return "voto no determinado";
}

retrieveTypeVoteImage = function(type) { 
	if(type == LAW_COUNCILOR_VOTE_IN_FAVOR){
		return "finger_up.png";
	}
	else if(type == LAW_COUNCILOR_VOTE_AGAINST){
		return "finger_down.png";
	}
	else if(type == LAW_COUNCILOR_VOTE_ABSTENTION){
		return "abstention.png";
	}
	return "imagen no determinada";
}

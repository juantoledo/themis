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

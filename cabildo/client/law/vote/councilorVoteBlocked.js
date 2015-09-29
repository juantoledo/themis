Template.councilorVoteBlocked.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
		Meteor.subscribe("cabildoUsers");
	})
}


Template.councilorVoteBlocked.helpers({

	fingerUpText: function () {
		var lawId = this._id;
		
		var numberVotesLawUser = Laws.find({_id:lawId, "councilorVotes":{"type":1, "councilorId": Meteor.userId()}}).count();

		if(numberVotesLawUser >= 1){
			return "++1";
		}
		return "";
	},

	totalFingerUp: function () {
		return this.votesInFavor;

	},

	fingerDownText: function () {
		var lawId = this._id;
		
		var numberVotesLawUser = Laws.find({_id:lawId, "councilorVotes":{"type":2, "councilorId": Meteor.userId()}}).count();

		if(numberVotesLawUser >= 1){
			return "--1";
		}
		return "";
	},

	totalFingerDown: function () {
		return this.votesAgainst;
	},

	fingerAbstention: function () {
		var lawId = this._id;
		
		var numberVotesLawUser = Laws.find({_id:lawId, "councilorVotes":{"type":0, "councilorId": Meteor.userId()}}).count();

		if(numberVotesLawUser >= 1){
			return "Se abstiene";
		}
		return "";
	},

	totalAbstention: function () {
		return this.votesAbstention;
	}

});


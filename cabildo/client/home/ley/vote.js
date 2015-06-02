Template.vote.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws", Meteor.userId());
		
	})
}

Template.vote.events({
	"click .fingerUp": function (event, template) {
		var typeVote = 1;
		var lawId = template.data._id;

		
		var options = {lawId:lawId,
						typeVote:typeVote};

		Meteor.call('addVote', options);
	},

	"click .fingerDown": function (event, template) {
		var typeVote = 2;
		var lawId = template.data._id;

		
		var options = {lawId:lawId,
						typeVote:typeVote};

		Meteor.call('addVote', options);
	}
});

Template.vote.helpers({

	fingerUpText: function () {
		var lawId = this._id;
		
		var numberVotesLawUser = Laws.find({_id:lawId, "votes":{"type":1, "owner": Meteor.userId()}}).count();

		if(numberVotesLawUser >= 1){
			return "++1";
		}
		return "";
	},

	totalFingerUp: function () {
		var lawId = this._id;
		
		var lawWithApprovedVotes = Laws.find({_id:lawId, "votes.type":1}).fetch();

		return countVotes(lawWithApprovedVotes[0], 1);

	},

	fingerDownText: function () {
		var lawId = this._id;
		
		var numberVotesLawUser = Laws.find({_id:lawId, "votes":{"type":2, "owner": Meteor.userId()}}).count();

		if(numberVotesLawUser >= 1){
			return "--1";
		}
		return "";
	},

	totalFingerDown: function () {
		var lawId = this._id;
		
		var lawWithDeclineVotes = Laws.find({_id:lawId, "votes.type":2}).fetch();

		return countVotes(lawWithDeclineVotes[0], 2);
	}

});

function countVotes(law, type){
		var count = 0;
		if(law != undefined && law.votes != undefined){
			for(var i = 0; i < law.votes.length; i++) {
			  if(law.votes[i].type == type){
			  	count = count + 1;
			  }

			}
		}
		return count;
	}
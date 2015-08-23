Template.councilorVote.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
		
	})
}

Template.councilorVote.events({
	"click .fingerUp": function (event, template) {
		var typeVote = 1;
		var lawId = template.data._id;
		var councilorId = Meteor.userId();
		
		var hasOldVote = Laws.find({_id:lawId, "councilorVotes.councilorId": Meteor.userId()}).count() > 0;

		var options = {lawId: lawId,
						typeVote: typeVote,
						councilorId: councilorId,
						hasOldVote: hasOldVote};

		Meteor.call('addCouncilorVote', options);
	},

	"click .fingerDown": function (event, template) {
		var typeVote = 2;
		var lawId = template.data._id;
		var councilorId = Meteor.userId();
		
		var hasOldVote = Laws.find({_id:lawId, "councilorVotes.councilorId": Meteor.userId()}).count() > 0;


		var options = {lawId: lawId,
						typeVote: typeVote,
						councilorId: councilorId,
						hasOldVote: hasOldVote};

		Meteor.call('addCouncilorVote', options);
	},


	"click .fingerAbstention": function (event, template) {
		var typeVote = 0;
		var lawId = template.data._id;
		var councilorId = Meteor.userId();
		
		var hasOldVote = Laws.find({_id:lawId, "councilorVotes.councilorId": Meteor.userId()}).count() > 0;

		var options = {lawId: lawId,
						typeVote: typeVote,
						councilorId: councilorId,
						hasOldVote: hasOldVote};

		Meteor.call('addCouncilorVote', options);
	}
});

Template.councilorVote.helpers({

	fingerUpText: function () {
		var lawId = this._id;
		
		var numberVotesLawUser = Laws.find({_id:lawId, "councilorVotes":{"type":1, "councilorId": Meteor.userId()}}).count();

		if(numberVotesLawUser >= 1){
			return "++1";
		}
		return "";
	},

	totalFingerUp: function () {
		var lawId = this._id;
		
		var lawWithApprovedVotes = Laws.find({_id:lawId, "councilorVotes.type":1}).fetch();

		return countVotes(lawWithApprovedVotes[0], 1);

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
		var lawId = this._id;
		
		var lawWithDeclineVotes = Laws.find({_id:lawId, "councilorVotes.type":2}).fetch();

		return countVotes(lawWithDeclineVotes[0], 2);
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
		var lawId = this._id;
		
		var lawWithDeclineVotes = Laws.find({_id:lawId, "councilorVotes.type":2}).fetch();

		return countVotes(lawWithDeclineVotes[0], 0);
	}

});

function countVotes(law, type){
		var count = 0;
		if(law != undefined && law.councilorVotes != undefined){
			for(var i = 0; i < law.councilorVotes.length; i++) {
			  if(law.councilorVotes[i].type == type){
			  	count = count + 1;
			  }

			}
		}
		return count;
	}
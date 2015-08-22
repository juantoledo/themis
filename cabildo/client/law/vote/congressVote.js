Template.congressVote.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("deputies");
	})
}


Template.congressVote.deputiesVote = function(){
	return Deputies.find({}, {});
}

Template.congressVote.events({
	"click .fingerUp": function (event, template) {
		var typeVote = 1;
		var lawId = template.data._id;
		var deputyId = this._id;
		
		var options = {	lawId:lawId,
						deputyId: deputyId,
						typeVote:typeVote
						};

		Meteor.call('addCongressVote', options);
	},

	"click .fingerDown": function (event, template) {
		var typeVote = 2;
		var lawId = template.data._id;
		var deputyId = this._id;
		
		var options = {	lawId:lawId,
						deputyId: deputyId,
						typeVote:typeVote
						};

		Meteor.call('addCongressVote', options);
	},

	"click .fingerAbstention": function (event, template) {
		var typeVote = 0;
		var lawId = template.data._id;
		var deputyId = this._id;
		
		var options = {	lawId:lawId,
						deputyId: deputyId,
						typeVote:typeVote
						};

		Meteor.call('addCongressVote', options);
	}
});

Template.congressVote.helpers({

	fingerUpText: function () {
		var deputyId = this._id;
		var lawId = Session.get('currentLawId');
		
		var numberVotesLawUser = Laws.find({_id:lawId, "congressVotes":{"type":1, "deputyId": deputyId}}).count();

		if(numberVotesLawUser >= 1){
			return "++1";
		}
		return "";
	},

	totalFingerUp: function () {
		var lawId = Session.get('currentLawId');
		
		var lawWithApprovedVotes = Laws.find({_id:lawId, "congressVotes.type":1}).fetch();

		return countVotes(lawWithApprovedVotes[0], 1);

	},

	fingerDownText: function () {
		var deputyId = this._id;
		var lawId = Session.get('currentLawId');

		var numberVotesLawUser = Laws.find({_id:lawId, "congressVotes":{"type":2, "deputyId": deputyId}}).count();

		if(numberVotesLawUser >= 1){
			return "--1";
		}
		return "";
	},

	totalFingerDown: function () {
		var lawId = Session.get('currentLawId');
		
		var lawWithDeclineVotes = Laws.find({_id:lawId, "congressVotes.type":2}).fetch();

		return countVotes(lawWithDeclineVotes[0], 2);
	},

	fingerAbstention: function () {
		var deputyId = this._id;
		var lawId = Session.get('currentLawId');

		var numberVotesLawUser = Laws.find({_id:lawId, "congressVotes":{"type":0, "deputyId": deputyId}}).count();

		if(numberVotesLawUser >= 1){
			return "No votó";
		}
		return "";
	},

	totalAbstention: function () {
		var lawId = Session.get('currentLawId');
		
		var lawWithAbstentionVotes = Laws.find({_id:lawId, "congressVotes.type":0}).fetch();

		return countVotes(lawWithAbstentionVotes[0], 0);
	}

});

function countVotes(law, type){
		var count = 0;
		if(law != undefined && law.congressVotes != undefined){
			for(var i = 0; i < law.congressVotes.length; i++) {
			  if(law.congressVotes[i].type == type){
			  	count = count + 1;
			  }

			}
		}
		return count;
	}
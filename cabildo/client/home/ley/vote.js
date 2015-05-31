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

	fingerDownText: function () {
		var lawId = this._id;
		
		var numberVotesLawUser = Laws.find({_id:lawId, "votes":{"type":2, "owner": Meteor.userId()}}).count();

		if(numberVotesLawUser >= 1){
			return "--1";
		}
		return "";
	}

});
Template.congressVote.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("deputies");
	})
}


Template.congressVote.deputiesVote = function(){
	return Deputies.find({}, {});
}

Template.congressVote.isCreator = function(){
	var creators = this.creators;
	var lawId = Session.get('currentLawId');

	if(creators == undefined){
		return false;
	}

	for(var i = 0; i < creators.length; i++){
		if(lawId === creators[i].lawId){
			return true;
		}
	}
	
	return false;
}

Template.congressVote.events({
	"click .fingerUp": function (event, template) {
		var typeVote = 1;
		var lawId = template.data._id;
		var deputyId = this._id;
		var deputyName = this.name;
		
		addCongressVote(lawId, deputyId, typeVote, deputyName);
		addDeputyVote(lawId, deputyId, typeVote, template.data.lawTitle);
	},

	"click .fingerDown": function (event, template) {
		var typeVote = 2;
		var lawId = template.data._id;
		var deputyId = this._id;
		var deputyName = this.name;
		
		addCongressVote(lawId, deputyId, typeVote, deputyName);
		addDeputyVote(lawId, deputyId, typeVote, template.data.lawTitle);
	},

	"click .fingerAbstention": function (event, template) {
		var typeVote = 0;
		var lawId = template.data._id;
		var deputyId = this._id;
		var deputyName = this.name;
		
		addCongressVote(lawId, deputyId, typeVote, deputyName);
		addDeputyVote(lawId, deputyId, typeVote, template.data.lawTitle);
	},

	'click #creatorLaw': function(event, template){
		var lawId = template.data._id;
		var lawTitle = template.data.lawTitle;
		var name = this.name;
		var congressId = this._id;
		
		var options = { lawId: lawId,
						congressId: congressId,
						name: name,
						lawTitle: lawTitle}

		Meteor.call('congressCreatorLaw', options);
	},
	
	'click #noCreatorLaw': function(event, template){
		var lawId = template.data._id;
		var lawTitle = template.data.lawTitle;
		var name = this.name;
		var congressId = this._id;

		var options = { lawId: lawId,
						congressId: congressId,
						name: name,
						lawTitle: lawTitle}

		Meteor.call('congressNoCreatorLaw', options);
	}
});

Template.congressVote.helpers({

	fingerUpText: function () {
		var deputyId = this._id;
		var name = this.name;
		var lawId = Session.get('currentLawId');
		
		var numberVotesLawUser = Laws.find({_id:lawId, "congressVotes":{"type":1, "deputyId": deputyId, "deputyName": name}}).count();

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
		var name = this.name;
		var lawId = Session.get('currentLawId');

		var numberVotesLawUser = Laws.find({_id:lawId, "congressVotes":{"type":2, "deputyId": deputyId, "deputyName": name}}).count();

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
		var name = this.name;
		var lawId = Session.get('currentLawId');

		var numberVotesLawUser = Laws.find({_id:lawId, "congressVotes":{"type":0, "deputyId": deputyId, "deputyName": name}}).count();

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

function addDeputyVote(lawId, deputyId, typeVote, lawTitle){
	var options = {	
			lawId:lawId,
			deputyId: deputyId,
			typeVote: typeVote,
			lawTitle: lawTitle
		};

	Meteor.call('addDeputyVote', options);
}

function addCongressVote(lawId, deputyId, typeVote, deputyName){
	var options = {	
			lawId:lawId,
			deputyId: deputyId,
			typeVote:typeVote,
			deputyName: deputyName
		};

	Meteor.call('addCongressVote', options);
}

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
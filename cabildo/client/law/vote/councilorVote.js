Template.councilorVote.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
		Meteor.subscribe("cabildoUsers");
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


		if(!hasOldVote && this.state == LAW_STATE_IN_PROGRESS){
			if(hasToNotify(this.votesQuantity + 1)){
				var type = getTypeNotification(this.type);
				makeVotesNotifications(lawId, this.followers, this.lawTitle, type, this.votesQuantity + 1);
			}
		}
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

		if(!hasOldVote && this.state == LAW_STATE_IN_PROGRESS){

			if(hasToNotify(this.votesQuantity + 1)){
				var type = getTypeNotification(this.type);
				makeVotesNotifications(lawId, this.followers, this.lawTitle, type, this.votesQuantity + 1);
			}	
		}
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
	
		if(!hasOldVote && this.state == LAW_STATE_IN_PROGRESS){

			if(hasToNotify(this.votesQuantity + 1)){
				var type = getTypeNotification(this.type);
				makeVotesNotifications(lawId, this.followers, this.lawTitle, type, this.votesQuantity + 1);
			}

			
		}
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

function makeVotesNotifications(lawId, followers, lawTitle, notificationType, votesQuantity){
	if(followers != undefined){
		for(var i = 0; i < followers.length; i++){
			if(Meteor.userId() == followers[i].follower){
				continue;
			}

			var notificationsQuantity = getUserNotificationsQuantity(followers[i].follower);

			var options = { lawId: lawId,
							follower: followers[i].follower,
							lawTitle: lawTitle,
							type: notificationType,
							votesQuantity: votesQuantity,
							counter: notificationsQuantity }

			Meteor.call('addUserVoteNotification', options);
		}
	}
}

function getTypeNotification(lawType){
	var notificationType = NOTIFICATION_TYPE_USER_LAW_VOTES;
	if(lawType == LAW_TYPE_USER){
		notificationType = NOTIFICATION_TYPE_USER_LAW_VOTES;
	}
	else if(lawType == LAW_TYPE_CONGRESS){
		notificationType = NOTIFICATION_TYPE_CONGRESS_LAW_VOTES;
	}

	return notificationType;
}

function hasToNotify(votesQuantity){
	for(var i = 0; i < VOTES_NOTIFICATIONS.length; i++){
		if(votesQuantity == VOTES_NOTIFICATIONS[i]){
			return true;
		}
	} 
	return false;
}

function getUserNotificationsQuantity(councilorId){
	
	var notificationsQuantity = 0;
	var cabildoUser = CabildoUsers.findOne({_id: councilorId});
	var notifications = cabildoUser.notifications;
	
	if(notifications == undefined || notifications.length == 0){
		notificationsQuantity = 1
	}
	else{
		notificationsQuantity = notifications.length + 1;
	}

	return notificationsQuantity;
}
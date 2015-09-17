Template.law.rendered = function(){
	Deps.autorun(function(){
        Meteor.subscribe("laws");
        Meteor.subscribe("cabildoUsers");
	})

	

}

Template.law.lawState = function(){
	return getLawState(this.state);
}

Template.law.createLawIdSession = function(){

	closeNotificationDialog();
	Session.set('currentLawId', this._id);
	return '';
}

Template.law.isFollower = function(){
	var followers = this.followers;

	if(followers == undefined){
		return false;
	}

	for(var i = 0; i < followers.length; i++){
		if(Meteor.userId() === followers[i].follower){
			return true;
		}
	}
	return false;
}

Template.law.isOwnerLaw = function(){
	var owner = this.owner;

	if(owner === Meteor.userId()){
		return true;
	}

	return false;
}

Template.law.isCongressLaw = function(){
	var type = this.type;

	if(type == LAW_TYPE_CONGRESS){
		return true;
	}

	return false;
}

Template.law.isClosed = function(){
	if(this.state == LAW_STATE_CLOSED){
		return true;
	}
	return false;
}

Template.law.events({

	'click #closeCongressLaw':function(evt, tmpl){
    	var councilorVotes = this.councilorVotes;
    	var lawId = this._id;
		var lawTitle = this.lawTitle;

		if(councilorVotes != undefined && councilorVotes.length > 0){
			for(var i = 0; i < councilorVotes.length; i++){
				createUserClosedLawNotification(lawId, lawTitle, councilorVotes[i]);
				closeLaw(lawId);
			}
		}
	},
	'click #followLaw': function(evt, tmpl){
		var lawId = this._id;
		var options = { lawId: lawId}

		Meteor.call('userFollowLaw', options);
	},
	
	'click #unFollowLaw': function(evt, tmpl){
		var lawId = this._id;
		var options = { lawId: lawId}

		Meteor.call('userUnfollowLaw', options);
	}

})

function closeNotificationDialog(){
	
}

function createUserClosedLawNotification(lawId, lawTitle, vote){
	var  councilorId = vote.councilorId;
	var notificationsQuantity = getUserNotificationsQuantity(councilorId);

	var options = { lawId: lawId,
					lawTitle: lawTitle,
					councilorId: councilorId, 
                    state: 1,
                    type: 3,
                    counter: notificationsQuantity
                  }
      
    Meteor.call('addUserNofication', options);

}

function closeLaw(lawId){
	var options = { lawId: lawId}
	
	Meteor.call('closeLaw', options);
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
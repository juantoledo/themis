Template.law.rendered = function(){
	Deps.autorun(function(){
        Meteor.subscribe("laws");
	})

	

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
	var notificationsDialog = $( "#notificationsDialog" );
	if(notificationsDialog != undefined){
		notificationsDialog.dialog('close');	
	}
}

function createUserClosedLawNotification(lawId, lawTitle, vote){
	var  councilorId = vote.councilorId;

	var options = { lawId: lawId,
					lawTitle: lawTitle,
					councilorId: councilorId, 
                    state: 1,
                    type: 3
                  }
      
    Meteor.call('addUserNofication', options);

}

function closeLaw(lawId){
	var options = { lawId: lawId}
	
	Meteor.call('closeLaw', options);
}
Template.comments.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("comments");
		Meteor.subscribe("cabildoUsers");
	})
}


Template.comments.comments = function(){
		return Comments.find({"lawId":this._id});
}

Template.comment.hasEditPermissions = function(){
		var owner = this.owner;
		return Meteor.userId() === owner;
}

Template.comment.modeEditComment = function(){
	var editComment = false;
	var currentComentaryToEdit = Session.get('currentComentaryToEdit');		

	if(this._id === currentComentaryToEdit)
		return true;
	return false;
}

Template.comments.failMessage = function(){
  return Session.get('displayFailCommentMessage');
}

Template.comments.hasFailMessage = function(){
  if (Session.get('displayFailCommentMessage') != null)
    return true;
  return false;
}


Template.comments.events({

	'click #publish-comment-form':function(evt, tmpl){
		Session.set('displayFailCommentMessage', null);
		var errorMessage = '';

		var commentText = tmpl.find('#newCommentInput').value;
		var lawId = this._id;

		if(!validNotEmptyField(commentText)) errorMessage = errorMessage + '<br />El campo para los comentarios es requerido';		

		if(errorMessage.length > 0){
	    	Session.set('displayFailCommentMessage', errorMessage);
	    	return false;
	    }

		var userName = getUserName(Meteor.user());

		var options = {commentText:commentText, createdBy:userName, lawId:lawId};
			
		var type = getTypeNotification(this.type);

		Meteor.call('addComment', options);
		$('#newCommentInput').val("").select().focus();
		
		if(this.state == LAW_STATE_IN_PROGRESS){
			makeFollowerNotifications(lawId, this.followers, this.lawTitle, type);
		}
		Session.set('displayFailCommentMessage', null);
	}

})

Template.comment.events({

	'click #editCommentButton':function(evt, tmpl){
		Session.set('currentComentaryToEdit', this._id);		
		
	},

	'click #edit-comment-form':function(evt, tmpl){
		
		var commentText = tmpl.find('#editedComment').value;
		var _id = tmpl.data._id;
		var options = {commentText:commentText,
						_id:_id};
		
		Meteor.call('editComment', options);
		Session.set('currentComentaryToEdit', undefined);		
	}

})

function makeFollowerNotifications(lawId, followers, lawTitle, notificationType){
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
							counter: notificationsQuantity + 1}

			Meteor.call('addUserCommentNotification', options);
		}
	}
}

function getTypeNotification(lawType){
	var notificationType = NOTIFICATION_TYPE_USER_LAW_WITH_COMMENTS;
	if(lawType == LAW_TYPE_USER){
		notificationType = NOTIFICATION_TYPE_USER_LAW_WITH_COMMENTS;
	}
	else if(lawType == LAW_TYPE_CONGRESS){
		notificationType = NOTIFICATION_TYPE_CONGRESS_LAW_WITH_COMMENTS;
	}

	return notificationType;
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
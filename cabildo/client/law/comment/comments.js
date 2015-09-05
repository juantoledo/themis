Template.comments.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("comments");
		
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

Template.comments.events({

	'click #submitCommentLaw':function(evt, tmpl){
		
		var commentText = tmpl.find('#newCommentInput').value;
		var lawId = this._id;
		
		var userName = getUserName(Meteor.user());

		var options = {commentText:commentText, createdBy:userName, lawId:lawId};
			
		var type = getTypeNotification(this.type);

		Meteor.call('addComment', options);
		$('#newCommentInput').val("").select().focus();
		
		if(this.state == LAW_STATE_IN_PROGRESS){
			makeFollowerNotifications(lawId, this.followers, this.lawTitle, type);
		}
	}

})

Template.comment.events({

	'click #editCommentButton':function(evt, tmpl){
		Session.set('currentComentaryToEdit', this._id);		
		
	},

	'click #publishCommentButton':function(evt, tmpl){
		
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

			var options = { lawId: lawId,
							follower: followers[i].follower,
							lawTitle: lawTitle,
							type: notificationType}

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
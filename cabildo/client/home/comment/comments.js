Template.comments.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("comments");
		
	})
}


Template.comments.comments = function(){
		return Comments.find({"lawId":this._id});
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
			
		Meteor.call('addComment', options);
		$('#newCommentInput').val("").select().focus();
		
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



function getUserName(user){
	if(user.emails != undefined){
		return user.emails[0].address;
	}
	return 'nombre por defecto';
}
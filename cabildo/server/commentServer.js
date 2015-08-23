Meteor.publish("comments", function(){
	return Comments.find();
})

Meteor.methods({
		
	'addComment':function(options){
		var currentLaw = Laws.findOne({_id:options.lawId});	

		var commentsQuantity = currentLaw.commentsQuantity;
		if(commentsQuantity == undefined){
			commentsQuantity = 1;
		}
		else{			
			commentsQuantity = commentsQuantity + 1;
		}

		Laws.update(options.lawId, { 
			$set: {commentsQuantity: commentsQuantity}
		});


		var comment = {
			commentText:options.commentText,
			owner:Meteor.userId(),
			createdBy:options.createdBy,
			date: new Date(),
			lawId:options.lawId
		}
		Comments.insert(comment);
	},


	'editComment':function(options){
		Comments.update(options._id, { $set: { commentText: options.commentText} });		
	}
			
})
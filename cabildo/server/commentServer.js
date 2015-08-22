Meteor.publish("comments", function(){
	return Comments.find();
})

Meteor.methods({
		
	'addComment':function(options){
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
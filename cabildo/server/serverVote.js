Meteor.publish("laws", function(userid){
	return Laws.find();
})

Meteor.methods({
	
	'addVote':function(options){
	
		Laws.update(options.lawId, { $pull: { votes: {			
				owner: Meteor.userId()
			}}});	

		Laws.update(options.lawId, { $push: { votes: {
				type: options.typeVote,			
				owner: Meteor.userId()
			}}});

	
	}		
	
})


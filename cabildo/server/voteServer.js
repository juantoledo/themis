Meteor.methods({
	
	'addCongressVote':function(options){
	
		Laws.update(options.lawId, { $pull: { congressVotes: {			
				deputyId: options.deputyId
			}}});	

		Laws.update(options.lawId, { $push: { congressVotes: {
				type: options.typeVote,			
				deputyId: options.deputyId
			}}});

	
	}		
	
})

Meteor.methods({
	
	'addCongressVote':function(options){
	
		Laws.update(options.lawId, { $pull: { congressVotes: {			
				deputyId: options.deputyId
			}}});	

		Laws.update(options.lawId, { $push: { congressVotes: {
				type: options.typeVote,			
				deputyId: options.deputyId
			}}});

	
	},

	'addCouncilorVote':function(options){
	
		Laws.update(options.lawId, { $pull: { councilorVotes: {			
				councilorId: options.councilorId
			}}});	

		Laws.update(options.lawId, { $push: { councilorVotes: {
				type: options.typeVote,			
				councilorId: options.councilorId
			}}});

	
	}		
	
})

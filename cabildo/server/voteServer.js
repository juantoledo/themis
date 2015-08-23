Meteor.methods({
	
	'addCongressVote':function(options){
	
		Laws.update(options.lawId, { $pull: { 
			congressVotes: {			
				deputyId: options.deputyId
			}
		}});

		Laws.update(options.lawId, { $push: { 
			congressVotes: {
				type: options.typeVote,			
				deputyId: options.deputyId
			}
		}});

	
	},

	'addCouncilorVote':function(options){
	
		Laws.update(options.lawId, { $pull: { councilorVotes: {			
				councilorId: options.councilorId
			}}});	

		var currentLaw = Laws.findOne({_id:options.lawId});	

		var votesQuantity = currentLaw.votesQuantity;
		if(votesQuantity == undefined){
			votesQuantity = 1;
		}
		else{
			if(!options.hasOldVote){
				votesQuantity = votesQuantity + 1;
			}
		}



		Laws.update(options.lawId, { 
			$push: { 
				councilorVotes: {
					type: options.typeVote,			
					councilorId: options.councilorId
				}
			},
			$set: {votesQuantity: votesQuantity}
			
		});

	
	}		
	
})

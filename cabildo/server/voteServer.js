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
				deputyId: options.deputyId,
				deputyName: options.deputyName
			}
		}});

	
	},

	'addCouncilorVote':function(options){
	
		

		var currentLaw = Laws.findOne({_id:options.lawId});	

		var votesInFavor = currentLaw.votesInFavor;
		var votesAgainst = currentLaw.votesAgainst;
		var votesAbstention = currentLaw.votesAbstention;
		var votesQuantity = currentLaw.votesQuantity;

		if(votesQuantity == undefined){
			votesInFavor = 0;
			votesAgainst = 0;
			votesAbstention = 0;
			votesQuantity = 1;
			if(options.typeVote == LAW_COUNCILOR_VOTE_IN_FAVOR){
				votesInFavor = 1;
			}
			else if(options.typeVote == LAW_COUNCILOR_VOTE_AGAINST){
				votesAgainst = 1;
			}
			else if(options.typeVote == LAW_COUNCILOR_VOTE_ABSTENTION){
				votesAbstention = 1;
			}
		}
		else{
			if(options.hasOldVote){

				var oldCouncilorVote = Laws.findOne(
					{_id: options.lawId, "councilorVotes" :{"type": LAW_COUNCILOR_VOTE_IN_FAVOR,
							"councilorId": options.councilorId}},
					{ fields: {"councilorVotes.type": 1}});
				if(oldCouncilorVote != undefined){
					votesInFavor = votesInFavor -1;
				}
				else{
					oldCouncilorVote = Laws.findOne(
						{_id: options.lawId, "councilorVotes" :{"type": LAW_COUNCILOR_VOTE_AGAINST,
								"councilorId": options.councilorId}},
						{ fields: {"councilorVotes.type": 1}});
					if(oldCouncilorVote != undefined){
						votesAgainst = votesAgainst - 1;
					}
					else{
						oldCouncilorVote = Laws.findOne(
							{_id: options.lawId, "councilorVotes" :{"type": LAW_COUNCILOR_VOTE_ABSTENTION,
									"councilorId": options.councilorId}},
							{ fields: {"councilorVotes.type": 1}});
						if(oldCouncilorVote != undefined){
							votesAbstention = votesAbstention - 1;
						}
					}
				}
			}


			
			else{
				votesQuantity = votesQuantity + 1;
			}

			if(options.typeVote == LAW_COUNCILOR_VOTE_IN_FAVOR){
				votesInFavor = votesInFavor + 1;
			}
			else if(options.typeVote == LAW_COUNCILOR_VOTE_AGAINST){
				votesAgainst = votesAgainst + 1;
			}
			else if(options.typeVote == LAW_COUNCILOR_VOTE_ABSTENTION){
				votesAbstention = votesAbstention + 1;
			}
		}


		var pulled = Laws.update(options.lawId, { $pull: { councilorVotes: {			
				councilorId: options.councilorId
			}}});	

		Laws.update(options.lawId, { 
			$push: { 
				councilorVotes: {
					type: options.typeVote,			
					councilorId: options.councilorId
				}
			},
			$set: {	votesQuantity: votesQuantity,
					votesInFavor: votesInFavor,
					votesAgainst: votesAgainst,
					votesAbstention: votesAbstention}
			
		});

	
	},

	'addDeputyVote':function(options){
	
		Deputies.update(options.deputyId, { $pull: { 
			votes: {			
				lawId: options.lawId
			}
		}});

		Deputies.update(options.deputyId, { $push: { 
			votes: {
				type: options.typeVote,			
				lawId: options.lawId,
				lawTitle: options.lawTitle
			}
		}});

	
	}
	
})

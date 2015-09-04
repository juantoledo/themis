Meteor.publish("laws", function(){
	return Laws.find();
})

Meteor.publish("userLaws", function(userid){
	return Laws.find({owner: userid}, {sort:{date: -1}});
})

Meteor.publish("userVotes", function(userid){
	return Laws.find({owner: userid}, {sort:{date: -1}});
})

Meteor.methods({
		
	'addUserLaw':function(options){
		var law = {
			lawTitle: options.lawTitle,
			lawContent: options.lawContent,
			categories: options.categories,
			type: 1,
			state: 1,
			owner: Meteor.userId(),
			createdBy: options.createdBy,
			dateClose: options.dateClose,
			date: new Date()
		}
		Laws.insert(law);
	},

	'addCongressLaw':function(options){
		
		var law = {
			lawTitle: options.lawTitle,
			lawContent: options.lawContent,
			categories: options.categories,
			type: 2,
			state: 1,
			owner: Meteor.userId(),
			createdBy:options.createdBy,
			legislature: options.lawLegislature,
			dateAdmision: options.lawDateAdmision,
            state: options.lawState,
            bulletin: options.lawBulletinNumber,
            matter: options.lawMatter,
            initiative: options.lawInitiative,
            chamberOrigin: options.lawChamberOrigin,
            date: new Date()
		}
		Laws.insert(law);
	},

	'closeLaw':function(options){
		Laws.update(options.lawId, { $set: { state: 2} });		
	},

	'userFollowLaw':function(options){

		Laws.update(options.lawId, { $push: { 
			followers: {
				follower: Meteor.userId()
			}
		}});
	},

	'userUnfollowLaw': function(options){

		Laws.update(options.lawId, { $pull: { 
			followers: {			
				follower: Meteor.userId()
			}
		}});
	}	
					
})
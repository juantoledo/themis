Meteor.publish("laws", function(){
	return Laws.find();
})

Meteor.publish("userLaws", function(userid){
	return Laws.find({owner: userid}, {sort:{date: -1}});
})

Meteor.methods({
		
	'addUserLaw':function(options){
		var law = {
			lawTitle: options.lawTitle,
			lawContent: options.lawContent,
			categories: options.categories,
			owner: Meteor.userId(),
			createdBy:options.createdBy,
			date: new Date(),
			type: 1 
		}
		Laws.insert(law);
	},

	'addCongressLaw':function(options){
		console.log('--------' + options);

		var law = {
			lawTitle: options.lawTitle,
			lawContent: options.lawContent,
			categories: options.categories,
			owner: Meteor.userId(),
			createdBy:options.createdBy,
			type: 2,
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
	}
					
})
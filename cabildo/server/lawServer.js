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
			date: new Date() 
		}
		Laws.insert(law);
	}
					
})
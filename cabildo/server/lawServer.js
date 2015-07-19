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
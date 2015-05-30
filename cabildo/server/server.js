Meteor.publish("laws", function(userid){
	return Laws.find();
})

Meteor.methods({
	
	'addLaw':function(options){
		var law = {
			text:options.text,
			owner:Meteor.userId(),
			date: new Date()
		}
		Laws.insert(law);
	}
		
	
})

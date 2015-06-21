if(Meteor.isServer){

	Meteor.publish("laws", function(userid){
		return Laws.find();
	})


	Meteor.methods({
		
		'addLaw':function(options){
			var law = {
				text:options.text,
				owner:Meteor.userId(),
				createdBy:options.createdBy,
				date: new Date() 
			}
			Laws.insert(law);
		},
		'editLaw':function(options){
			
			Laws.update(options.lawId, { $set: { text: options.text} });
			
		}
			
		
	})

}
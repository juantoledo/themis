Meteor.publish("deputies", function(){
	return Deputies.find();
})

Meteor.methods({
	'congressCreatorLaw':function(options){

		Deputies.update(options.congressId, { $push: { 
			creators: {
				lawId: options.lawId,
				lawTitle: options.lawTitle
			}
		}});

		Laws.update(options.lawId, { $push: { 
			creators: {
				deputyId: options.congressId,
				name: options.name
			}
		}});



	},

	'congressNoCreatorLaw': function(options){

		Deputies.update(options.congressId, { $pull: { 
			creators: {
				lawId: options.lawId,
				lawTitle: options.lawTitle
			}
		}});

		Laws.update(options.lawId, { $pull: { 
			creators: {
				deputyId: options.congressId,
				name: options.name
			}
		}});
	}	
})
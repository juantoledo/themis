Meteor.publish("laws", function(){
	return Laws.find();
})
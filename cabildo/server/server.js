Meteor.publish("laws", function(){
	return Laws.find();
})

Meteor.publish("categories", function(){
	return Categories.find();
})
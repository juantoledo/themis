Meteor.publish("deputies", function(){
	return Deputies.find();
})
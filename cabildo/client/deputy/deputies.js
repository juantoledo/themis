Template.deputies.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("deputies");
	})
}


Template.deputies.deputies = function(){
	return Deputies.find({}, {});
}
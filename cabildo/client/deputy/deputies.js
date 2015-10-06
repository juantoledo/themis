Template.deputies.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("deputies");
	})
}


Template.deputies.deputies = function(){
	return Deputies.find({"type": CONGRESSMAN_DEPUTY}, {});
}

Template.senators.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("deputies");
	})
}


Template.senators.senators = function(){
	return Deputies.find({"type": CONGRESSMAN_SENATOR}, {});
}
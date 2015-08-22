Template.law.rendered = function(){
	Deps.autorun(function(){
        Meteor.subscribe("laws");
	})
}

Template.law.createLawIdSession = function(){
	Session.set('currentLawId', this._id);
	return '';
}
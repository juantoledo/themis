Template.myPerfil.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("cabildoUsersByUserId", cabildoUsersByUserId);
	})
}

Template.myPerfil.currentUser = function(){
	return CabildoUsers.findOne({_id:Meteor.userId()});
}
Template.myPerfil.editNameMode = function(){
	return Session.get('editNameMode');		
}


Template.myPerfil.events({

	'click #editName':function(evt, tmpl){
		var userName = tmpl.find('#userName').value;
		var userId = this._id;

		CabildoUsers.update(userId, { $set: { name: userName} });	
		Session.set('editNameMode', false);		

	},
	'click #initiateEditName':function(evt, tmpl){
		Session.set('editNameMode', true);			
	}


})

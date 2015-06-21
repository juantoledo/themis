Template.perfil.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws", Meteor.userId());
		
	})
}

Template.perfil.userLaws = function(){
	return Laws.find({owner:Meteor.userId()}, {sort:{date: -1}});
}


Template.perfil.helpers({

	currentPerfilTemplate: function(){
		var currentPerfilTempl = Session.get('currentPerfilTempl');
		if(currentPerfilTempl == undefined){
			currentPerfilTempl = 'misleyes';
			Session.set('currentPerfilTempl', currentPerfilTempl);
		}

		return currentPerfilTempl;
	}
	
})


Template.perfil.events({
		"click #misLeyes": function (event, tmpl) {
			Session.set('currentPerfilTempl','misleyes');
			
		},

		"click #misDatos": function (event, tmpl) {
			Session.set('currentPerfilTempl','misdatos');
			
		}
	});

Session.set('currentNavigationButton','activeBtnInicio');

Template.navigation.activeBtnInicio = function(){
	if(Session.get('currentNavigationButton') === 'activeBtnInicio'){
		return "active";
	}
	return "";
}

Template.navigation.activeBtnPerfil = function(){
	if(Session.get('currentNavigationButton') === 'activeBtnPerfil'){
		return "active";
	}
	return "";
}

Template.navigation.activeBtnCongreso = function(){
	if(Session.get('currentNavigationButton') === 'activeBtnCongreso'){
		return "active";
	}
	return "";
}

Template.navigation.events({
	"click #btnInicio": function (event, tmpl) {
		Session.set('currentNavigationButton','activeBtnInicio');
	},

	"click #btnPerfil": function (event, tmpl) {
		Session.set('currentNavigationButton','activeBtnPerfil');
	},

	"click #btnCongreso": function (event, tmpl) {
		Session.set('currentNavigationButton','activeBtnCongreso');
	}
});

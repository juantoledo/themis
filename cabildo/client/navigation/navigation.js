Template.navigation.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("cabildoUsers");
	})
}

Template.navigation.userName = function(){

  	var user = CabildoUsers.findOne({_id:Meteor.userId()});

  	if(user == undefined){
  		return 'Usuario no registrado';
  	}
	return 'Usuario: ' + user.name;
}

Template.navigation.isLogged = function(){

  	var userId = Meteor.userId();
	if(userId != undefined){
		return true;
	}
  	
	return false;
}

Template.navigation.events = {
	'click #sessionClosed': function(){
	    Meteor.logout();
	}
}

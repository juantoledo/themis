Template.navigation.userName = function(){

  	var user = Meteor.users.findOne({_id:Meteor.userId()});

  	if(user == undefined){
  		return 'Usuario no registrado';
  	}
	return 'Usuario: ' + user.profile.name;
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

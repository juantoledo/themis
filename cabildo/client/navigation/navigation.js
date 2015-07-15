Template.navigation.userName = function(){

  	var user = Meteor.users.findOne({_id:Meteor.userId()});

  	if(user == undefined){
  		return 'Usuario no registrado';
  	}
	return 'Usuario: ' + user.profile.name;
}

var currentUser = undefined;

Template.myPerfil.rendered = function(){

}

Template.myPerfil.userInformation = function(){
	currentUser = Meteor.users.findOne({_id:Meteor.userId()});

	return currentUser;
//	return currentUser.profile.name;
}

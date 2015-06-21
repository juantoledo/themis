Template.misdatos.userMail = function(){
	return getUserName(Meteor.user());
}

function getUserName(user){
	if(user.emails != undefined){
		return user.emails[0].address;
	}
	return 'nombre por defecto';
}
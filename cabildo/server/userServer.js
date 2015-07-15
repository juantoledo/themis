Meteor.methods({
		
	'addCouncilorUser':function(options){
		var roles = ['councilor-user'];
    	var userId = Accounts.createUser({email: options.userMail, password : options.password,  profile: { name: options.userName }});
   

    	Roles.addUsersToRoles(userId, roles);
	}
			
		
})
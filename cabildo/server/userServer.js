Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: '6LdS7wkTAAAAAIp1fMoZWMa73J_FNLin1soJYbP6'
    });
});

Meteor.methods({
		
	'addCouncilorUser':function(options){

		var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, options.g_recaptcha_response);
        
        if(verifyCaptchaResponse.data.success == false ){
            return verifyCaptchaResponse.data;
        }

		var roles = ['councilor-user'];
    	var userId = Accounts.createUser({email: options.userMail, password : options.password,  profile: { name: options.userName }});
   

    	Roles.addUsersToRoles(userId, roles);
	}
			
		
})
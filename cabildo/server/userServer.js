Meteor.publish("cabildoUsers", function(){
    return CabildoUsers.find();
})
Meteor.publish("cabildoUsersByUserId", function(userid){
    return CabildoUsers.find({_id: userid}, {sort:{date: -1}});
})

CabildoUsers.allow({  
  
  update: function (userId, doc, fields, modifier) {
  
    return true;
  }
});


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

        var cabildoUser = {
            _id: userId,
            email: options.userMail,
            name: options.userName,
            createdBy: Meteor.userId(),
            date: new Date(),
            notifications: []
        }
        CabildoUsers.insert(cabildoUser);
        
        Meteor.call('sendEmail',
            options.userMail,
            'cabildouser@gmail.com',
            'Bienvenido a Cabildo '+ options.userName +' (o como se vaya a llamar)',
            'Esto tiene que ser un template html <h1>bonito</h1>.');
      
        
	},

    'addAdminUser':function(options){

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, options.g_recaptcha_response);
        
        if(verifyCaptchaResponse.data.success == false ){
            return verifyCaptchaResponse.data;
        }

        var roles = ['admin-user'];
        var userId = Accounts.createUser({email: options.userMail, password : options.password,  profile: { name: options.userName }});
   

        Roles.addUsersToRoles(userId, roles);
        
        var cabildoUser = {
            _id: userId,
            email: options.userMail,
            name: options.userName,
            createdBy: Meteor.userId(),
            date: new Date(),
            notifications: []
        }
        CabildoUsers.insert(cabildoUser);

        Meteor.call('sendEmail',
            options.userMail,
            'cabildouser@gmail.com',
            'Bienvenido a Cabildo Admin '+ options.userName +' (o como se vaya a llamar)',
            'Esto tiene que ser un template html <h1>bonito</h1>.');

    }
			
		
})

Meteor.startup(function() {
    reCAPTCHA.config({
        theme: 'light',  // 'light' default or 'dark'
        publickey: '6LdS7wkTAAAAAHbAkTNe3wm--67rEKp4eAwwDSGM'
    });
});

Template.registry.rendered = function() { 
  
    Session.set('displaySuccessMessage', null);
	Session.set('displayFailMessage', null);

  	$( "#dialog" ).dialog({autoOpen: false,
  						width: 600,
        				height: 500}); 
}


Template.registry.successMessage = function(){
  return Session.get('displaySuccessMessage');
}

Template.registry.failMessage = function(){
  return Session.get('displayFailMessage');
}

Template.registry.hasSuccessMessage = function(){
  if (Session.get('displaySuccessMessage') != null)
    return true;
  return false;
  
}

Template.registry.hasFailMessage = function(){
  if (Session.get('displayFailMessage') != null)
    return true;
  return false;
}

Template.registry.events({
	'click #createUser' : function(e, tmpl) {
	    Session.set('displayFailMessage', null);
	   
	    var errorMessage = '';

	    var userName = tmpl.find('#userName').value;
	    var userMail = tmpl.find('#userMail').value;
	    var password = tmpl.find('#userPassword').value;
	    var userPasswordConfirm = tmpl.find('#userPasswordConfirm').value;


	    if(!validNotEmptyField(userName)) errorMessage = errorMessage + '<br />El campo Nombre usuario es requerido';
	    if(!validNotEmptyField(userMail)) errorMessage = errorMessage + '<br />El campo Correo electrónico es requerido';  	
	    if(!validNotEmptyField(password)) errorMessage = errorMessage + '<br />Las contraseñas son requeridas';  	
	    if(!validNotEmptyField(userPasswordConfirm)) errorMessage = errorMessage + '<br />Las contraseñas son requeridas';  	

	    if(errorMessage.length > 0){
	    	Session.set('displayFailMessage', errorMessage);
	    	Session.set('displaySuccessMessage', null);
	    	return false;
	    }

	    if(!(password === userPasswordConfirm)){
	    	Session.set('displayFailMessage', 'Error: Los password deben ser iguales.');
	    	Session.set('displaySuccessMessage', null);
	    	//$('#userPassword').val().select().focus();
	    	return false;
	    }

	    if(!isValidPassword(password)){
	    	return false;
	    }

	    var options = {
	    	userName:userName, 
	    	userMail:userMail, 
	    	password:password,
	    	g_recaptcha_response : $('#g-recaptcha-response').val()
	    };

	    Meteor.call('addCouncilorUser', options, function(err, result){
	      	console.log(result);

	      	if (err) {
	            Session.set('displayFailMessage', '' + err);
	            Session.set('displaySuccessMessage', null);
	            $('#userName').val('').select().focus();
	            
	      	} 
	      	else if(result != undefined && result.success == false){
	      		Session.set('displayFailMessage', 'Necesitamos que asegures que no eres un robot');
	            Session.set('displaySuccessMessage', null);
	      	}
	      	else {
	        	Session.set('displayFailMessage', null);
	        	Session.set('displaySuccessMessage', 'La cuenta ha sido creada');
	        	$('#userName').val('');
	        	$('#userMail').val('');
	        	$('#userPassword').val('');
	        	$('#userPasswordConfirm').val('');	   
	      	}

    	});

	    return false;
	},

	'click #createAdminUser' : function(e, tmpl) {
	    Session.set('displayFailMessage', null);
	    
	    var errorMessage = '';

	    var userName = tmpl.find('#userName').value;
	    var userMail = tmpl.find('#userMail').value;
	    var password = tmpl.find('#userPassword').value;
	    var userPasswordConfirm = tmpl.find('#userPasswordConfirm').value;


	    if(!validNotEmptyField(userName)) errorMessage = errorMessage + '<br />El campo Nombre usuario es requerido';
	    if(!validNotEmptyField(userMail)) errorMessage = errorMessage + '<br />El campo Correo electrónico es requerido';  	
	    if(!validNotEmptyField(password)) errorMessage = errorMessage + '<br />Las contraseñas son requeridas';  	
	    if(!validNotEmptyField(userPasswordConfirm)) errorMessage = errorMessage + '<br />Las contraseñas son requeridas';  	

	    if(errorMessage.length > 0){
	    	Session.set('displayFailMessage', errorMessage);
	    	Session.set('displaySuccessMessage', null);
	    	return false;
	    }

	    if(!(password === userPasswordConfirm)){
	    	Session.set('displayFailMessage', 'Error: Los password deben ser iguales.');
	    	Session.set('displaySuccessMessage', null);
	    	//$('#userPassword').val().select().focus();
	    	return false;
	    }

	    if(!isValidPassword(password)){
	    	return false;
	    }

	    var options = {
	    	userName:userName, 
	    	userMail:userMail, 
	    	password:password,
	    	g_recaptcha_response : $('#g-recaptcha-response').val()
	    };

	    Meteor.call('addAdminUser', options, function(err, result){
	      	console.log(result);

	      	if (err) {
	            Session.set('displayFailMessage', '' + err);
	            Session.set('displaySuccessMessage', null);
	            $('#userName').val('').select().focus();
	            
	      	} 
	      	else if(result != undefined && result.success == false){
	      		Session.set('displayFailMessage', 'Necesitamos que asegures que no eres un robot');
	            Session.set('displaySuccessMessage', null);
	      	}
	      	else {
	        	Session.set('displayFailMessage', null);
	        	Session.set('displaySuccessMessage', 'La cuenta ha sido creada');
	        	$('#userName').val('');
	        	$('#userMail').val('');
	        	$('#userPassword').val('');
	        	$('#userPasswordConfirm').val('');	   
	      	}

    	});

	    return false;
	},

	'click #conditions' : function(e, tmpl) {
		 var dial = $( '#dialog' );
		 dial.dialog('open');

		 return false;
	}


    
});


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
	'submit #register-form' : function(e, tmpl) {
	    Session.set('displayFailMessage', null);
	    var hasEmptyFields = false;
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
	    	return false;
	    }

	    if(!isValidPassword(password)){
	    	return false;
	    }

	    var options = {userName:userName, userMail:userMail, password:password};

	    Meteor.call('addCouncilorUser', options, function(err){
	      	if (err) {
	            Session.set('displayFailMessage', '' + err);
	            Session.set('displaySuccessMessage', null);
	            
	      	} else {
	        	Session.set('displayFailMessage', null);
	        	Session.set('displaySuccessMessage', 'La cuenta ha sido creada');
	        	tmpl.find('#userName').value = "";
	        	tmpl.find('#userMail').value = "";
	        	tmpl.find('#userPassword').value = "";
	        	tmpl.find('#userPasswordConfirm').value = "";
	      	}

    	});

	    return false;
	}

    
});
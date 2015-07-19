Template.login.rendered = function() { 
  
    Session.set('displaySuccessMessage', null);
	Session.set('displayFailMessage', null);

}

Template.login.successMessage = function(){
  return Session.get('displaySuccessMessage');
}

Template.login.failMessage = function(){
  return Session.get('displayFailMessage');
}

Template.login.hasSuccessMessage = function(){
  if (Session.get('displaySuccessMessage') != null)
    return true;
  return false;
  
}

Template.login.hasFailMessage = function(){
  if (Session.get('displayFailMessage') != null)
    return true;
  return false;
}

Template.login.events({
	'submit #login-form' : function(e, tmpl) {
	    Session.set('displayFailMessage', null);
	    var hasEmptyFields = false;
	    var errorMessage = '';

	    var userMail = tmpl.find('#userMail').value;
	    var password = tmpl.find('#userPassword').value;

	    if(!validNotEmptyField(userMail)) errorMessage = errorMessage + '<br />El campo Correo electrónico es requerido';  	
	    if(!validNotEmptyField(password)) errorMessage = errorMessage + '<br />La contraseña es requerida';  	

	    if(errorMessage.length > 0){
	    	Session.set('displayFailMessage', errorMessage);
	    	Session.set('displaySuccessMessage', null);
	    	return false;
	    }

	    Meteor.loginWithPassword(userMail, password, function(err){
	      	if (err) {
	            Session.set('displayFailMessage', '' + err);
	            Session.set('displaySuccessMessage', null);	          
	            $('#userPassword').val('').select().focus();
	            
	      	} else {
	        	Session.set('displayFailMessage', null);
	        	Session.set('displaySuccessMessage', 'Has ingresado, Bienvenido');
	        	$('#userMail').val('');
	        	$('#userPassword').val('');	        	
	      	}

    	});

	    return false;
	}

    
});

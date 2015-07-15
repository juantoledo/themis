validNotEmptyField = function(value) {
  
	if(value == undefined || value.trim() === ""){
		return false;
	}
	return true;
}

isValidPassword = function(val) {
  if (val.length >= 6) {
    return true;
  } else {
    Session.set('displayFailMessage', 'Error: la contraseña es muy pequeña. Mínimo 6 carácteres');
    Session.set('displaySuccessMessage', null);
    return false; 
  }
}
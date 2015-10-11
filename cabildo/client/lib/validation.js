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

isValidDate = function(dateClosed){
  var dateSeparated = dateClosed.split('/');


  if(!validLength(dateSeparated)){
    return false;
  }



  if(isAfterCurrentDate(dateSeparated)){
    return true;
  }
  else{
    return false;
  }

}

validLength = function(date){
  return  (date.length == 3) ? true : false;
}

isAfterCurrentDate = function(dateSeparated){
  var inputDay = dateSeparated[0];
  var inputMonth = dateSeparated[1];
  var inputYear = dateSeparated[2];

  if(!$.isNumeric(inputDay) || !$.isNumeric(inputMonth) || !$.isNumeric(inputYear)){
    return false;
  }

  if(!isValidDay(inputDay)){
    return false;
  }
  if(!isValidMonth(inputMonth)){
    return false;
  }
  if(!isValidYear(inputYear)){
    return false;
  }

  var date = new Date();
  var currentDay = date.getDate();
  var currentMonth = date.getMonth() + 1;
  var currentYear = date.getFullYear();

  if(currentYear > inputYear)
  {
    return false;
  }
  else if(currentYear < inputYear)
  {
    return true;
  }
  else
  {
    if(currentMonth > inputMonth)
    {
      return false;
    }
    else if(currentMonth < inputMonth)
    {
      return true;
    }
    else{
      if(currentDay >= inputDay){
        return false;
      }
      else{
        return true;
      }
    }
  }


}

isValidDay = function(day){
  if(day > 0 && day < 32){
    return true;
  }
  return false;
}

isValidMonth = function(month){
  if(month > 0 && month < 13){
    return true;
  }
  return false;
}

isValidYear = function(year){
  if(year > 0 && year < 10000){
    return true;
  }
  return false;
}
Template.createLaw.rendered = function(){
  Session.set('createLawFailMessage', null);
  Session.set('createLawSuccessMessage', null);
}

Template.createLaw.successMessage = function(){
  return Session.get('createLawSuccessMessage');
}

Template.createLaw.failMessage = function(){
  return Session.get('createLawFailMessage');
}

Template.createLaw.hasSuccessMessage = function(){
  if (Session.get('createLawSuccessMessage') != null)
    return true;
  return false;
  
}

Template.createLaw.hasFailMessage = function(){
  if (Session.get('createLawFailMessage') != null)
    return true;
  return false;
}

Template.createLaw.currentDate = function(){
  var currentDate = new Date();
  return moment(currentDate).format('YYYY-MM-DD');
  
}

Template.createLaw.events({

  'click #lawCreateSubmit':function(evt, tmpl){
    Session.set('createLawFailMessage', null);
    var errorMessage = '';


    var lawTitle = tmpl.find('#lawTitle').value;
    var lawContent = tmpl.find('#lawContent').value;
    var userName = getUserName(Meteor.user());
    var categoriesSelected = Session.get('categoriesSelected');
    var dateClose = tmpl.find('#dateClose').value;

    if(!validNotEmptyField(lawTitle)) errorMessage = errorMessage + '<br />El campo título de ley es requerido';  
    if(!validNotEmptyField(lawContent)) errorMessage = errorMessage + '<br />El campo contenido de ley es requerido';   
    if(!validNotEmptyField(dateClose)) errorMessage = errorMessage + '<br />El campo fecha de término votación es requerido';   
    if(!validNotEmptyField(userName)) errorMessage = errorMessage + '<br />El usuario debe encontrarse registrado en cabildo';    
    if(validNotEmptyField(dateClose)){
      if(!isValidDate(dateClose)){
        errorMessage = errorMessage + '<br />El campo fecha de término votación no tiene un formato válido';   
      }
    }

  
    if(errorMessage.length > 0){
      Session.set('createLawFailMessage', errorMessage);
      Session.set('createLawSuccessMessage', null);
      return false;
    }

    var options = { lawTitle: lawTitle, 
                    lawContent: lawContent,
                    categories: categoriesSelected,
                    createdBy: userName,
                    dateClose: dateClose};
      
    Meteor.call('addUserLaw', options);

    Session.set('createLawFailMessage', null);
    Session.set('createLawSuccessMessage', 'La ley ha sido creada exitosamente');

    $('#lawTitle').val('').select().focus();
    $('#lawContent').val('');
    $('#dateClose').val('');

    Session.set('categoriesSelected', []);  
    $( "#categoriesPlace" ).empty();
    
  }

})

function isValidDate(dateClosed){
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

function validLength(date){
  return  (date.length == 3) ? true : false;
}

function isAfterCurrentDate(dateSeparated){
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

function isValidDay(day){
  if(day > 0 && day < 32){
    return true;
  }
  return false;
}

function isValidMonth(month){
  if(month > 0 && month < 13){
    return true;
  }
  return false;
}

function isValidYear(year){
  if(year > 0 && year < 10000){
    return true;
  }
  return false;
}
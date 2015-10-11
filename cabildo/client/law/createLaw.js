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


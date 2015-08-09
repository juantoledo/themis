Template.createCongressLaw.rendered = function(){
  Session.set('createCongressLawFailMessage', null);
  Session.set('createCongressLawSuccessMessage', null);
}

Template.createCongressLaw.successMessage = function(){
  return Session.get('createCongressLawSuccessMessage');
}

Template.createCongressLaw.failMessage = function(){
  return Session.get('createCongressLawFailMessage');
}

Template.createCongressLaw.hasSuccessMessage = function(){
  if (Session.get('createCongressLawSuccessMessage') != null)
    return true;
  return false;
  
}

Template.createCongressLaw.hasFailMessage = function(){
  if (Session.get('createCongressLawFailMessage') != null)
    return true;
  return false;
}

Template.createCongressLaw.events({

  'click #lawCreateSubmit':function(evt, tmpl){
    Session.set('createCongressLawFailMessage', null);
    var errorMessage = '';


    var lawTitle = tmpl.find('#lawTitle').value;
    var lawContent = tmpl.find('#lawContent').value;
    var userName = getUserName(Meteor.user());
    var categoriesSelected = Session.get('categoriesSelected');

    if(!validNotEmptyField(lawTitle)) errorMessage = errorMessage + '<br />El campo título de ley es requerido';  
    if(!validNotEmptyField(lawContent)) errorMessage = errorMessage + '<br />El campo contenido de ley es requerido';   
    if(!validNotEmptyField(userName)) errorMessage = errorMessage + '<br />El usuario debe encontrarse registrado en cabildo';    


    if(errorMessage.length > 0){
      Session.set('createCongressLawFailMessage', errorMessage);
      Session.set('createCongressLawSuccessMessage', null);
      return false;
    }

    var options = { lawTitle: lawTitle, 
                    lawContent: lawContent,
                    categories: categoriesSelected,
                    createdBy: userName};
      
    Meteor.call('addUserLaw', options);

    Session.set('createCongressLawFailMessage', null);
    Session.set('createCongressLawSuccessMessage', 'La ley ha sido creada exitosamente');

    $('#lawTitle').val('').select().focus();
    $('#lawContent').val('');

    Session.set('categoriesSelected', []);  
    $( "#categoriesPlace" ).empty();
    
  }

})

 
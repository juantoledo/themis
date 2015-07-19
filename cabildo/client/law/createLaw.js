Template.createLaw.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");

	});

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

Template.createLaw.events({

  'click #lawCreateSubmit':function(evt, tmpl){
    Session.set('createLawFailMessage', null);
    var errorMessage = '';


    var lawTitle = tmpl.find('#lawTitle').value;
    var lawContent = tmpl.find('#lawContent').value;
    var userName = getUserName(Meteor.user());
    var categoriesSelected = Session.get('categoriesSelected');

    if(!validNotEmptyField(lawTitle)) errorMessage = errorMessage + '<br />El campo título de ley es requerido';  
    if(!validNotEmptyField(lawContent)) errorMessage = errorMessage + '<br />El campo contenido de ley es requerido';   
    if(!validNotEmptyField(userName)) errorMessage = errorMessage + '<br />El usuario debe encontrarse registrado en cabildo';    


    if(errorMessage.length > 0){
      Session.set('createLawFailMessage', errorMessage);
      Session.set('createLawSuccessMessage', null);
      return false;
    }

    var options = { lawTitle: lawTitle, 
                    lawContent: lawContent,
                    categories: categoriesSelected,
                    createdBy: userName};
      
    Meteor.call('addUserLaw', options);

    Session.set('createLawFailMessage', null);
    Session.set('createLawSuccessMessage', 'La ley ha sido creada exitosamente');

    $('#lawTitle').val('').select().focus();
    $('#lawContent').val('');

    Session.set('categoriesSelected', []);  
    $( "#categoriesPlace" ).empty();
    
  }

})


function getUserName(user){
  if(user == null){
    return null;
  }
  return user.profile.name;
}

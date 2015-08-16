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
    var lawLegislature = tmpl.find('#lawLegislature').value;
    var lawDateAdmision = tmpl.find('#lawDateAdmision').value;
    var lawState = tmpl.find('#lawState').value;
    var lawBulletinNumber = tmpl.find('#lawBulletinNumber').value;
    var lawMatter = tmpl.find('#lawMatter').value;
    var lawInitiative = tmpl.find('#lawInitiative').value;
    var lawChamberOrigin = tmpl.find('#lawChamberOrigin').value;

    if(!validNotEmptyField(lawTitle)) errorMessage = errorMessage + '<br />El campo título de ley es requerido';  
    if(!validNotEmptyField(lawContent)) errorMessage = errorMessage + '<br />El campo contenido de ley es requerido';   
    if(!validNotEmptyField(userName)) errorMessage = errorMessage + '<br />El usuario debe encontrarse registrado en cabildo';    
    if(!validNotEmptyField(lawLegislature)) errorMessage = errorMessage + '<br />El número de legislatura es requerido';    
    if(!validNotEmptyField(lawDateAdmision)) errorMessage = errorMessage + '<br />La fecha de ingreso es requerida';    
    if(!validNotEmptyField(lawState)) errorMessage = errorMessage + '<br />El estado de la ley es requerido';    
    if(!validNotEmptyField(lawBulletinNumber)) errorMessage = errorMessage + '<br />El número de boletín es requerido';    
    if(!validNotEmptyField(lawMatter)) errorMessage = errorMessage + '<br />La materia de la ley es requerida';    
    if(!validNotEmptyField(lawInitiative)) errorMessage = errorMessage + '<br />El tipo de iniciativa es requerida';    
    if(!validNotEmptyField(lawChamberOrigin)) errorMessage = errorMessage + '<br />La cámara de origen es requerida';    
    
    if(errorMessage.length > 0){
      Session.set('createCongressLawFailMessage', errorMessage);
      Session.set('createCongressLawSuccessMessage', null);
      return false;
    }

    var options = { lawTitle: lawTitle, 
                    lawContent: lawContent,
                    categories: categoriesSelected,
                    createdBy: userName,
                    lawLegislature: lawLegislature,
                    lawDateAdmision: lawDateAdmision,
                    lawState: lawState,
                    lawBulletinNumber: lawBulletinNumber,
                    lawMatter: lawMatter,
                    lawInitiative: lawInitiative,
                    lawChamberOrigin: lawChamberOrigin};
      
    Meteor.call('addCongressLaw', options);

    Session.set('createCongressLawFailMessage', null);
    Session.set('createCongressLawSuccessMessage', 'La ley ha sido creada exitosamente');

    $('#lawTitle').val('').select().focus();
    $('#lawContent').val('');
    $('#lawLegislature').val('');
    $('#lawDateAdmision').val('');
    $('#lawState').val('');
    $('#lawBulletinNumber').val('');
    $('#lawMatter').val('');
    $('#lawInitiative').val('');
    $('#lawChamberOrigin').val('');

    Session.set('categoriesSelected', []);  
    $( "#categoriesPlace" ).empty();
    
  }

})

 
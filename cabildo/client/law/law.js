Template.law.rendered = function(){
	Deps.autorun(function(){
        Meteor.subscribe("laws");
        Meteor.subscribe("cabildoUsers");
	})

	FB.init({
      appId      : '1382581492041125',
      status     : true,
      xfbml      : true
    });

}


window.fbAsyncInit = function() {
   FB.init({
      appId      : '1382581492041125',
      status     : true,
      xfbml      : true
    });
  };


Template.law.config = function(){
	var config = { 
		"data-href": "www.face.com"
	}
	return config;
}

Template.law.getLawUrl = function(){
	
	return "http://www.votalaley.com/law" + this._id;
}

Template.law.hasFailMessage = function(){
  if (Session.get('editLawFailMessage') != null)
    return true;
  return false;
}

Template.law.failMessage = function(){
  return Session.get('editLawFailMessage');
}

Template.law.hasEditLawPermissions = function(){
		var owner = this.owner;
		return Meteor.userId() === owner;
}

Template.law.isModeEditLaw = function(){
	var editLaw = false;
	var currentLawToEdit = Session.get('currentLawToEdit');		

	if(this._id === currentLawToEdit)
		return true;
	return false;
}

Template.law.lawState = function(){
	return getLawState(this.state);
}

Template.law.congressLawTypeName = function(){
	return getCongressLawType(this.congressType);
}

Template.law.createLawIdSession = function(){

	closeNotificationDialog();
	Session.set('currentLawId', this._id);
	return '';
}

Template.law.isFollower = function(){
	var followers = this.followers;

	if(followers == undefined){
		return false;
	}

	for(var i = 0; i < followers.length; i++){
		if(Meteor.userId() === followers[i].follower){
			return true;
		}
	}
	return false;
}

Template.law.followersCount = function(){
	var followers = this.followers;

	if(followers == undefined){
		return 0;
	}

	return followers.length;
}

Template.law.isOwnerLaw = function(){
	var owner = this.owner;

	if(owner === Meteor.userId()){
		return true;
	}

	return false;
}

Template.law.isCongressLaw = function(){
	var type = this.type;

	if(type == LAW_TYPE_CONGRESS){
		return true;
	}

	return false;
}

Template.law.isClosed = function(){
	if(this.state == LAW_STATE_CLOSED){
		return true;
	}
	return false;
}

Template.law.events({
	'keyup #facebookComment':function(evt,tmpl){ 
		if(evt.which === 13){
			var d2 = 3;
			var fjs = evt.getElementsByTagName(tmpl)[0];
			FB.ui(
			 {
			  method: 'feed'
			 }
			);
		}
	},

	'click #closeCongressLaw':function(evt, tmpl){
    	var councilorVotes = this.councilorVotes;
    	var lawId = this._id;
		var lawTitle = this.lawTitle;

		if(councilorVotes != undefined && councilorVotes.length > 0){
			for(var i = 0; i < councilorVotes.length; i++){
				createUserClosedLawNotification(lawId, lawTitle, councilorVotes[i]);
				closeLaw(lawId);
			}
		}
	},
	'click #followLaw': function(evt, tmpl){
		var lawId = this._id;
		var options = { lawId: lawId}

		Meteor.call('userFollowLaw', options);
	},
	
	'click #unFollowLaw': function(evt, tmpl){
		var lawId = this._id;
		var options = { lawId: lawId}

		Meteor.call('userUnfollowLaw', options);
	},

	'click #deputyFromCreators': function(evt, tmpl){
		Router.go('deputy', { _id: this.deputyId });
	},

	'click #editLawButton':function(evt, tmpl){
		Session.set('currentLawToEdit', this._id);				
	},

	'click #publishCongressLawButton':function(evt, tmpl){
		
		Session.set('editLawFailMessage', null);
    	var errorMessage = '';


   		var lawId = this._id;
    	var lawContent = tmpl.find('#lawContentEdit').value;
   		var userName = getUserName(Meteor.user());
    	var link = tmpl.find('#linkEdit').value;
    	var lawLegislature = tmpl.find('#lawLegislatureEdit').value;
    	var lawDateAdmision = tmpl.find('#lawDateAdmisionEdit').value;
    	var lawBulletinNumber = tmpl.find('#lawBulletinNumberEdit').value;
    	var lawMatter = tmpl.find('#lawMatterEdit').value;
    	var lawInitiative = tmpl.find('#lawInitiativeEdit').value;
    	var lawChamberOrigin = tmpl.find('#lawChamberOriginEdit').value;
    
	    if(!validNotEmptyField(lawContent)) errorMessage = errorMessage + '<br />El campo contenido de ley es requerido';   
	    if(!validNotEmptyField(userName)) errorMessage = errorMessage + '<br />El usuario debe encontrarse registrado en cabildo';    
    	if(!validNotEmptyField(link)) errorMessage = errorMessage + '<br />El link oficial es requerido';    
	    if(!validNotEmptyField(lawLegislature)) errorMessage = errorMessage + '<br />El número de legislatura es requerido';    
	    if(!validNotEmptyField(lawDateAdmision)) errorMessage = errorMessage + '<br />La fecha de ingreso es requerida';    
	    if(!validNotEmptyField(lawBulletinNumber)) errorMessage = errorMessage + '<br />El número de boletín es requerido';    
	    if(!validNotEmptyField(lawMatter)) errorMessage = errorMessage + '<br />La materia de la ley es requerida';    
	    if(!validNotEmptyField(lawInitiative)) errorMessage = errorMessage + '<br />El tipo de iniciativa es requerida';    
    	if(!validNotEmptyField(lawChamberOrigin)) errorMessage = errorMessage + '<br />La cámara de origen es requerida';    
    
	    if(errorMessage.length > 0){
	      Session.set('editLawFailMessage', errorMessage);
	      Session.set('editLawSuccessMessage', null);
	      return false;
	    }

	    var options = { lawContent: lawContent,	                  
	                    createdBy: userName,
	                    lawLegislature: lawLegislature,
	                    lawDateAdmision: lawDateAdmision,
	                    lawBulletinNumber: lawBulletinNumber,
	                    lawMatter: lawMatter,
	                    lawInitiative: lawInitiative,
	                    lawChamberOrigin: lawChamberOrigin,
	                    link: link,
	                	lawId: lawId};
      
    	Meteor.call('editCongressLaw', options);


		Session.set('currentLawToEdit', undefined);	
		Session.set('editLawFailMessage', null);	
		
	},

	'click #publishUserLawButton':function(evt, tmpl){

		Session.set('editLawFailMessage', null);
	    var errorMessage = '';

	    var lawId = this._id;
	    var lawContent = tmpl.find('#lawContentEdit').value;
	    var userName = getUserName(Meteor.user());
	    var dateClose = tmpl.find('#dateCloseEdit').value;

	    if(!validNotEmptyField(lawContent)) errorMessage = errorMessage + '<br />El campo contenido de ley es requerido';   
	    if(!validNotEmptyField(dateClose)) errorMessage = errorMessage + '<br />El campo fecha de término votación es requerido';   
	    if(!validNotEmptyField(userName)) errorMessage = errorMessage + '<br />El usuario debe encontrarse registrado en cabildo';    
	    if(validNotEmptyField(dateClose)){
	      if(!isValidDate(dateClose)){
	        errorMessage = errorMessage + '<br />El campo fecha de término votación no tiene un formato válido';   
	      }
	    }

	  
	    if(errorMessage.length > 0){
	      Session.set('editLawFailMessage', errorMessage);
	      Session.set('editLawSuccessMessage', null);
	      return false;
	    }

	    var options = { 
	    				lawId: lawId,
	    				lawContent: lawContent,
	                    createdBy: userName,
	                    dateClose: dateClose};
	      
	    Meteor.call('editUserLaw', options);
		
		Session.set('currentLawToEdit', undefined);	
		Session.set('editLawFailMessage', null);
	},

	'click #cancelEditionLawButton':function(evt, tmpl){

		Session.set('currentLawToEdit', undefined);	
		Session.set('editLawFailMessage', null);
	}

})

function closeNotificationDialog(){
	
}

function createUserClosedLawNotification(lawId, lawTitle, vote){
	var  councilorId = vote.councilorId;
	var notificationsQuantity = getUserNotificationsQuantity(councilorId);

	var options = { lawId: lawId,
					lawTitle: lawTitle,
					councilorId: councilorId, 
                    state: 1,
                    type: 3,
                    counter: notificationsQuantity
                  }
      
    Meteor.call('addUserNofication', options);

}

function closeLaw(lawId){
	var options = { lawId: lawId}
	
	Meteor.call('closeLaw', options);
}

function getUserNotificationsQuantity(councilorId){
	
	var notificationsQuantity = 0;
	var cabildoUser = CabildoUsers.findOne({_id: councilorId});
	var notifications = cabildoUser.notifications;
	
	if(notifications == undefined || notifications.length == 0){
		notificationsQuantity = 1
	}
	else{
		notificationsQuantity = notifications.length + 1;
	}

	return notificationsQuantity;
}
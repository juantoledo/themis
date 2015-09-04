Template.navigation.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("cabildoUsers");
	})
	$( "#notificationsDialog" ).dialog({autoOpen: false,
  						width: 400,
        				height: 300}); 
}

Template.navigation.userName = function(){

  	var user = CabildoUsers.findOne({_id:Meteor.userId()});

  	if(user == undefined){
  		return 'Usuario no registrado';
  	}
	return 'Usuario: ' + user.name;
}

Template.navigation.isLogged = function(){

  	var userId = Meteor.userId();
	if(userId != undefined){
		return true;
	}
  	
	return false;
}

Template.navigation.pendentNotifications = function(){
	var user = CabildoUsers.findOne({_id:Meteor.userId()});

	if(user == undefined){
		return;
	}
	var userNotifications = user.notifications;

	var pendentNotifications = [];

	if(userNotifications != undefined && userNotifications.length != undefined){
		for(var i = 0; i < userNotifications.length; i++){
			if(userNotifications[i].state == 1){
				pendentNotifications.push(userNotifications[i]);
			}
		}
	}

	return pendentNotifications;	
}

Template.navigation.messageType = function(){

	if( this.type == 1){
		return "Ley de usuario: Tu votaste por esta ley que ha sido cerrada, haz click para ver su resumen";
	}
	else if( this.type == 2){
		return "Ley de usuario: Esta ley que sigues ha alcanzado el voto número " + this.votes + ", haz click para ver su resumen";
	}
	else if( this.type == 3){
		return "Ley de congreso: Tu votaste por esta ley que ha sido cerrada, haz click para ver su resumen";
	}
	else if( this.type == 4){
		return "Ley de congreso: Esta ley que sigues ha alcanzado el voto número " + this.votes + ", haz click para ver su resumen";
	}
	else if( this.type == 5){
		return "Ley de usuario: Esta ley que sigues tiene " + this.comments + " comentario(s) que no haz visto, haz click para verlos";
	}
	else if( this.type == 6){
		return "Ley de congreso: Esta ley que sigues tiene " + this.comments + " comentario(s) que no haz visto, haz click para verlos";
	}
	return "holi";
}


Template.navigation.events = {
	'click #sessionClosed': function(){
	    Meteor.logout();
	},
	'click #userNotifications' : function(e, tmpl) {
		 var dial = $( '#notificationsDialog' );
		 dial.dialog('open');

		 return false;
	}
}

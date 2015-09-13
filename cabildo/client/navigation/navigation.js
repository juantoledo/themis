Template.navigation.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("cabildoUsers");
	})
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
	pendentNotifications = retrievePendentUserNotifications();

	return pendentNotifications;	
}

Template.navigation.userNotifications = function(){
	userNotifications = retrieveUserNotifications();

	var notificationsOrdered = bubbleSortOrder(userNotifications);

	return notificationsOrdered;	
}

Template.navigation.isView = function(){
	
	var state = this.state;
	if(state == NOTIFICATION_STATE_VIEW){
		return true;
	}
	return false;	
}

Template.navigation.messageType = function(){

	if( this.type == 1){
		return "Ley de usuario: Tu votaste por esta ley que ha sido cerrada, haz click para ver su resumen";
	}
	else if( this.type == 2){
		return "Ley de usuario: Esta ley que sigues ha alcanzado el voto número " + this.number + ", haz click para ver su resumen";
	}
	else if( this.type == 3){
		return "Ley de congreso: Tu votaste por esta ley que ha sido cerrada, haz click para ver su resumen";
	}
	else if( this.type == 4){
		return "Ley de congreso: Esta ley que sigues ha alcanzado el voto número " + this.number + ", haz click para ver su resumen";
	}
	else if( this.type == 5){
		return "Ley de usuario: Esta ley que sigues tiene nuevos comentario, haz click para verlos";
	}
	else if( this.type == 6){
		return "Ley de congreso: Esta ley que sigues tiene nuevos comentario, haz click para verlos";
	}

	return "¡Notificacion no identificada!";
}


Template.navigation.events = {
	'click #sessionClosed': function(){
	    Meteor.logout();
	},
	'click #userNotifications' : function(e, tmpl) {

		 $('#user-notifications').modal()
		 var moddd = $('#user-notifications');

		 return false;
	},
	'mouseover #lawFromNotification': function(e, tmpl){
		if(NOTIFICATION_STATE_NO_VIEW == this.state){
			var options = {
				follower : Meteor.userId(),
				lawId : this.lawId,
				lawTitle : this.lawTitle,
				date : this.date,
				number : this.number,
				type : this.type,
				state : NOTIFICATION_STATE_VIEW
			}

			Meteor.call('updateUserNotification', options);
		}

	},
	
	'click #lawFromNotification2': function(e, tmpl){
		if(this.number != undefined && this.number > 0){
			var options = {
				follower : Meteor.userId(),
				lawId : this.lawId,
				lawTitle : this.lawTitle,
				date : this.date,
				number : 0,
				type : this.type,
				state : NOTIFICATION_STATE_VIEW
			}

			Meteor.call('updateUserNotification', options);
		}

		Router.go('law', { _id: this.lawId });
		$('#user-notifications').modal('hide');
	},

	'mouseover #lawFromNotificationView': function(e, tmpl){
		if(NOTIFICATION_STATE_NO_VIEW == this.state){
			var options = {
				follower : Meteor.userId(),
				lawId : this.lawId,
				lawTitle : this.lawTitle,
				date : this.date,
				number : this.number,
				type : this.type,
				state : NOTIFICATION_STATE_VIEW,
				counter : this.counter
			}

			Meteor.call('updateUserNotification', options);
		}

	},
	
	'click #lawFromNotificationView2': function(e, tmpl){
		if(this.number != undefined && this.number > 0){
			var options = {
				follower : Meteor.userId(),
				lawId : this.lawId,
				lawTitle : this.lawTitle,
				date : this.date,
				number : 0,
				type : this.type,
				state : NOTIFICATION_STATE_VIEW,
				counter : this.counter
			}

			Meteor.call('updateUserNotification', options);
		}

		Router.go('law', { _id: this.lawId });
		$('#user-notifications').modal('hide');
	}
}

function retrievePendentUserNotifications(){
	var user = CabildoUsers.findOne({_id:Meteor.userId()}, {sort:{date: -1}});

	if(user == undefined){
		return;
	}
	var userNotifications = user.notifications;

	var pendentNotifications = [];

	if(userNotifications != undefined && userNotifications.length != undefined){
		for(var i = 0; i < userNotifications.length; i++){
			if(userNotifications[i].state == NOTIFICATION_STATE_NO_VIEW){
				pendentNotifications.push(userNotifications[i]);
			}
		}
	}

	return pendentNotifications;
}

function retrieveUserNotifications(){
	var user = CabildoUsers.findOne({_id:Meteor.userId()}, {sort:{date: -1}});

	if(user == undefined){
		return;
	}
	var userNotifications = user.notifications;

//	var userNotifications = [];

//	if(userNotifications != undefined && userNotifications.length != undefined){
//		for(var i = 0; i < userNotifications.length; i++){
//			if(userNotifications[i].state == NOTIFICATION_STATE_VIEW  || userNotifications[i].state == NOTIFICATION_STATE_NO_VIEW){
//				viewedNotifications.push(userNotifications[i]);
//			}
//		}
//	}

	return userNotifications;
}


function bubbleSortOrder(notifications){
	for(var i = 0; i < notifications.length; i++){
		for(var j = 0; j < notifications.length; j++){
			if(notifications[i].counter > notifications[j].counter){
				var temp = notifications[j];
				notifications[j] = notifications[i];
				notifications[i] = temp;
			}
		}
	}

	return notifications;
}
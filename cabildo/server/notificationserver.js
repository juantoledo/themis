Meteor.methods({
		
	'addUserNofication':function(options){
		var notificationsQuantity;

		if(options.counter == undefined || options.counter == 0){
				var notificationsQuantity = getUserNotificationsQuantity(options.councilorId);
		}
		else{
			notificationsQuantity = options.counter;
		}

		CabildoUsers.update(options.councilorId, { $push: { 
			notifications: {
				lawId: options.lawId, 	
				lawTitle: options.lawTitle,	
				state: options.state,
				type: options.type,
				date: new Date(),
				counter: notificationsQuantity
			}
		}});

	},
 
	'addUserCommentNotification': function(options){
		
		var notification = CabildoUsers.findOne(
			{$or: 
				[{_id: options.follower, "notifications.lawId": options.lawId, 
					"notifications.type": NOTIFICATION_TYPE_USER_LAW_WITH_COMMENTS},
				{_id: options.follower, "notifications.lawId": options.lawId, 
					"notifications.type": NOTIFICATION_TYPE_CONGRESS_LAW_WITH_COMMENTS}]}, 
			{"notifications.$": 1});

		if(notification != undefined && notification.notifications != undefined){
			var comments = notification.notifications[0].number;
			comments = comments + 1;
			console.log('comments ' + comments);


			CabildoUsers.update(options.follower, { $pull: { 
				notifications: {
					lawId: options.lawId,
					type: options.type
				}
			}});

			CabildoUsers.update(options.follower, { $push: { 
				notifications: {
					lawId: options.lawId, 	
					lawTitle: options.lawTitle,	
					state: NOTIFICATION_STATE_NO_VIEW,
					type: options.type,
					date: new Date(),
					number: comments,
					counter: options.counter
				}
			}});

		}
		else{
			CabildoUsers.update(options.follower, { $push: { 
				notifications: {
					lawId: options.lawId, 	
					lawTitle: options.lawTitle,	
					state: NOTIFICATION_STATE_NO_VIEW,
					type: options.type,
					date: new Date(),
					number: 1,
					counter: options.counter
				}
			}});
		}
	},

	'addUserVoteNotification': function(options){
		
		console.log('-------------------- before query ');
		var notification = CabildoUsers.findOne(
			{$or: 
				[{_id: options.follower, "notifications.lawId": options.lawId, 
					"notifications.type": NOTIFICATION_TYPE_USER_LAW_VOTES},
				{_id: options.follower, "notifications.lawId": options.lawId, 
					"notifications.type": NOTIFICATION_TYPE_CONGRESS_LAW_VOTES}]}, 
			{"notifications.$": 1});

		console.log('--------------------' + notification);

		if(notification != undefined && notification.notifications != undefined){
			
			CabildoUsers.update(options.follower, { $pull: { 
				notifications: {
					lawId: options.lawId,
					type: options.type
				}
			}});

			CabildoUsers.update(options.follower, { $push: { 
				notifications: {
					lawId: options.lawId, 	
					lawTitle: options.lawTitle,	
					state: NOTIFICATION_STATE_NO_VIEW,
					type: options.type,
					date: new Date(),
					number: options.votesQuantity,
					counter: options.counter
				}
			}});

		}
		else{
			CabildoUsers.update(options.follower, { $push: { 
				notifications: {
					lawId: options.lawId, 	
					lawTitle: options.lawTitle,	
					state: NOTIFICATION_STATE_NO_VIEW,
					type: options.type,
					date: new Date(),
					number: options.votesQuantity,
					counter: options.counter
				}
			}});
		}
	},
	'updateUserNotification' : function(options){
		
		CabildoUsers.update(options.follower, { $pull: { notifications: {			
			lawId: options.lawId,
			type: options.type
		}}});	

		CabildoUsers.update(options.follower, { 
			$push: { 
				notifications: {
					lawId: options.lawId, 	
					lawTitle: options.lawTitle,	
					state: options.state,
					type: options.type,
					date: options.date,
					number: options.number,
					counter: options.counter
				}
			}			
		});
	}
					
})

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
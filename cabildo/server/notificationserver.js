Meteor.methods({
		
	'addUserNofication':function(options){

		CabildoUsers.update(options.councilorId, { $push: { 
			notifications: {
				lawId: options.lawId, 	
				lawTitle: options.lawTitle,	
				state: options.state,
				type: options.type,
				date: new Date()
			}
		}});

	},
 
	'addUserCommentNotification': function(options){
		
		var notification = CabildoUsers.findOne({$or: [{_id: options.follower, "notifications.lawId": options.lawId, "notifications.type": 5},{_id: options.follower, "notifications.lawId": options.lawId, "notifications.type": 6}]}, {"notifications.$": 1});

		if(notification != undefined && notification.notifications != undefined){
			var comments = notification.notifications[0].comments;
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
					state: 1,
					type: options.type,
					date: new Date(),
					comments: comments
				}
			}});

		}
		else{
			CabildoUsers.update(options.follower, { $push: { 
				notifications: {
					lawId: options.lawId, 	
					lawTitle: options.lawTitle,	
					state: 1,
					type: options.type,
					date: new Date(),
					comments: 1
				}
			}});
		}
	}
					
})
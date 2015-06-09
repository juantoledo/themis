


Template.ley.ownerName = function(){
	//Laws.find({}, {sort:{date: -1}});
	var ownerId = this.owner;

	//var user = Users.find(ownerId, {});

	var user = Meteor.users.findOne({_id:ownerId});

	return user.emails[0].address;
}

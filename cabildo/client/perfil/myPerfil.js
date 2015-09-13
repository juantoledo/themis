Template.myPerfil.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("cabildoUsers");
		Meteor.subscribe("laws");
	})
}

Template.myPerfil.currentUser = function(){
	return CabildoUsers.findOne({_id:Meteor.userId()});
}
Template.myPerfil.editNameMode = function(){
	return Session.get('editNameMode');		
}


Template.myPerfil.events({

	'click #editName':function(evt, tmpl){
		var userName = tmpl.find('#userName').value;
		var userId = this._id;

		CabildoUsers.update(userId, { $set: { name: userName} });	
		Session.set('editNameMode', false);		

	},
	'click #initiateEditName':function(evt, tmpl){
		Session.set('editNameMode', true);			
	},

	'click #generateLawClosedNotifications':function(evt, tmpl){
		var lawsNoClosed = Laws.find({"state":1}).fetch();
		notificateClosedLaws(lawsNoClosed);


	}


})

function notificateClosedLaws(lawsNoClosed){
	for(var i = 0; i < lawsNoClosed.length; i++){
		var lawDateClose = lawsNoClosed[i].dateClose;
		var lawId = lawsNoClosed[i]._id;
		var lawTitle = lawsNoClosed[i].lawTitle;

		//if(lawDateClose < (new Date())){

		 	
			var votes = lawsNoClosed[i].councilorVotes;

			if(votes != undefined && votes.length > 0){
				for(var v = 0; v < votes.length; v++){
					createUserClosedLawNotification(lawId, lawTitle, votes[v]);
					closeLaw(lawId);
				}
			}
		//}


	}
}

function createUserClosedLawNotification(lawId, lawTitle, vote){
	

	var  councilorId = vote.councilorId;

	var options = { lawId: lawId,
					lawTitle: lawTitle,
					councilorId: councilorId, 
                    state: 1,
                    type: 1
                  }
      
    Meteor.call('addUserNofication', options);

}

function closeLaw(lawId){
	var options = { lawId: lawId}
	
	Meteor.call('closeLaw', options);
}


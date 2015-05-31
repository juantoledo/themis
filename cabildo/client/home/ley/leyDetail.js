if(Meteor.isClient){
	Session.set('isModeEditLaw',false);
	Template.leyDetail.owner2 = function(){

		return Router.current().route.path(this);
	}

	Template.leyDetail.isModeEditLaw = function(){
		return Session.equals('isModeEditLaw',true);
	}

	Template.leyDetail.events({
		"click #edit-law-enable": function (event, tmpl) {
			Session.set('isModeEditLaw',true);
			Meteor.flush();
			focusText(tmpl.find("#edit-law"));
		},

		'click .editLawSubmit':function(evt, tmpl){
		
			var leyText = tmpl.find('.editLawText').value;
			var lawId = tmpl.data._id;
			var options = {text:leyText,
							lawId:lawId};
			
			Meteor.call('editLaw', options);
			Session.set('isModeEditLaw',false);
		}
	});

	function focusText(i){
		i.focus();
		i.select();
	}
}
Template.home.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws", Meteor.userId());
		
	})
}

Template.home.leyes = function(){
	return Laws.find({}, {sort:{date: -1}});
}

Template.home.events({

	'click .leySubmit':function(evt, tmpl){
		
		var leyText = tmpl.find('.leyText').value;
		var userName = getUserName(Meteor.user());

		var options = {text:leyText, createdBy:userName};
			
		Meteor.call('addLaw', options);
		$('.leyText').val("").select().focus();
			
			
		
	}

})


function getUserName(user){
	if(user.emails != undefined){
		return user.emails[0].address;
	}
	return 'nombre por defecto';
}
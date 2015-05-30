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
			var options = {text:leyText};
			
			Meteor.call('addLaw', options);
			$('.leyText').val("").select().focus();
			
			
		
	}

})
Template.randomLaw.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
	})
}

Template.randomLaw.law = function(){
	var lastLaws = Laws.find({}, {sort:{date: -1}, limit:30}).fetch();
	var randomIndex = randomInRange(0, lastLaws.length - 1);

	return lastLaws[randomIndex];

}

Template.randomLaw.createdTimer = function(){
	


	return moment(this.date).fromNow();

}

randomInRange =  function(min, max){
	var random = Math.floor(Math.random() * (max - min + 1)) + min;
	return random;
}

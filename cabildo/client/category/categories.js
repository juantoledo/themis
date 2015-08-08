Template.categories.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("categories");
		Meteor.subscribe("laws");
	})
}

Template.categories.categoryLaws = function(){
  return Categories.find();
}

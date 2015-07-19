Template.userLaw.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("categories");
	})
}



Template.userLaw.lawCategories = function(){

	var lawCategories = this.categories;
	var divCategories = '';

	lawCategories.forEach(function(categoryType) {
		backgrounds = foundBackgroundCategory(categoryType);

		background = backgrounds[0].background;
    	divCategories = divCategories + '<span class="cat" style="background: ' + background + '">' + categoryType + ' </span>';
  	});

	return divCategories;
}

foundBackgroundCategory = function(categoryType) {
	return Categories.find({"type": categoryType}).fetch();
}
Template.category.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("laws");
		Meteor.subscribe("categories");
    	Session.set('categoriesSelected', []);	
	})
}

Template.category.helpers({
  settings: function() {
    return {
      position: "top",
      limit: 5,
      rules: [
        {
          token: '',
          collection: Categories,
          field: "type",       
          template: Template.userPill,
          matchAll: true
        },
        {
          token: '@',
          collection: Categories,
          field: "type",       
          template: Template.userPill,
          matchAll: true
        }

      ]
    };
  }
});

Template.category.events({
	
	'blur #autocompleteCategory' : function(event, template) {
		
		var categorySelected =	$( "#lawCategory" ).val();	    
	},
	'keyup #autocompleteCategory' : function(event, template) {
		if(event.which == 13 || event.keyCode == 13){
			var categorySelected =	$( "#lawCategory" ).val();	
		}

		
	   
	},	
	'autocompleteselect #autocompleteCategory' : function(event, template, doc) {
	    addCategorySelected(doc.type);
      $( "#lawCategory" ).val('');
	},

  'click #deleteCategory' : function(event, template) {
    var indexCategoryToRemove = -1;
    var count = -1;

    var categoryToDelete = event.target;
    var categoryType = categoryToDelete.outerText;
    categoryToDelete.remove();

    var categoriesSelected = Session.get('categoriesSelected');

    categoriesSelected.forEach(function(categorySelectedPreviously) {
      count = count + 1;

      if(categorySelectedPreviously === categoryType){
        indexCategoryToRemove = count;
        return;
      }
    });

    categoriesSelected.splice(indexCategoryToRemove);
    Session.set('categoriesSelected', categoriesSelected);
  }

});


addCategorySelected = function(categoryType) {
  var categoriesSelected = Session.get('categoriesSelected');

  if(existCategorySelected(categoryType)){
    return;
  }

  categoriesSelected.push(categoryType);

  Session.set('categoriesSelected', categoriesSelected);

  var newdiv = '<div id="deleteCategory">' + categoryType + ' </div>';
  var categoriesPlace =  $( "#categoriesPlace" );   
  categoriesPlace.append(newdiv);
}

existCategorySelected = function(categoryTypeToAdd) {
  var existCategory = false;

  var categoriesSelected = Session.get('categoriesSelected');
  
  categoriesSelected.forEach(function(categorySelectedPreviously) {
    if(categorySelectedPreviously === categoryTypeToAdd){
      existCategory = true;
      return;
    }
  });
  return existCategory;
}

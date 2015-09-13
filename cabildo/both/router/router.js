Router.route('/', function () {
  this.render('main'); 
});

Router.route('/createLaw', function () {
  this.render('createLaw'); 
});

Router.route('/createCongressLaw', function () {
  this.render('createCongressLaw'); 
});

Router.route('/main', function () {
  this.render('main'); 
});

Router.route('/categories', function () {
  this.render('categories'); 
});

Router.route('/userLaws', function () {
  this.render('userLaws'); 
});

Router.route('/myPerfil', function () {
  this.render('myPerfil'); 
});

Router.route('/userVotes', function () {
  this.render('userVotes'); 
});

Router.route('/lawSearch', function () {
  this.render('lawSearch'); 
});

Router.route('/login', function () {
  this.render('login'); 
});

Router.route('/registry', function () {
  this.render('registry'); 
});

Router.route('/deputies', function () {
  this.render('deputies'); 
});

Router.route('/congressLaws', function () {
  this.render('congressLaws'); 
});

Router.map(function(){
	this.route('law', {
		path:'/law:_id',
		data:function(){
			return Laws.findOne({_id:this.params._id});
		}
	})
});

Router.map(function(){
  this.route('congressLawDetail', {
    path:'/congressLawDetail:_id',
    data:function(){
      return Laws.findOne({_id:this.params._id});
    }
  })
});

Router.map(function(){
  this.route('lawFromNotifications', {
    path:'/law:lawId',
    data:function(){
      return Laws.findOne({_id:this.params.lawId});
    }
  })
});

Router.map(function(){
  this.route('deputy', {
    path:'/deputy:_id',
    data:function(){
      depus = Deputies.findOne({_id:this.params._id});
      return depus;
    }
  })
}); 

Router.map(function(){
  this.route('userPerfil', {
    path:'/userPerfil:owner',
    waitOn: function() {
      return Meteor.subscribe('cabildoUsers');
    },
    data:function(){
      return CabildoUsers.findOne({_id:this.params.owner});
    }
  })
});

Router.map(function(){
  this.route('categoryLaws', {
    path:'/type:type',
    waitOn: function() {
      return Meteor.subscribe('laws');
    },
    data: function () {
      templateData = {  categoryLaws: Laws.find({"categories":this.params.type}),
                        categorySelected: this.params.type };
      return templateData;
    }

 //   data: {
 //     posts: [
 //       {
 //         title: 'Did you know that...',
 //         text: 'If you yelled for 8 years, 7 months and 6 days, you would have produced enough sound energy to heat up one cup of coffee.'
 //       },
 //       {
 //         title: 'Hello World',
 //         text: 'Hi, i am new here!'
 //       }
 //     ],
 //     lawss: [Laws.find({})]
 //   }

  })
});



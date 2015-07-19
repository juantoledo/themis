Router.route('/', function () {
  this.render('main'); 
});

Router.route('/createLaw', function () {
  this.render('createLaw'); 
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

Router.route('/lawSearch', function () {
  this.render('lawSearch'); 
});

Router.route('/login', function () {
  this.render('login'); 
});

Router.route('/registry', function () {
  this.render('registry'); 
});

Router.map(function(){
	this.route('law', {
		path:'/law:_id',
		data:function(){
			return Laws.findOne({_id:this.params._id});
		}
	})
});



Router.route('/home', function () {
  this.render('home');
});
Router.route('/perfil', function () {
  this.render('perfil');
});
Router.route('/', function () {
  this.render('splash'); 
});


Router.map(function(){
	this.route('leyDetail', {
		path:'/leyDetail:_id',
		data:function(){
			return Laws.findOne({_id:this.params._id});
		}
	})
});

Deps.autorun(function(){
	Meteor.subscribe("laws", Meteor.userId());
		
})
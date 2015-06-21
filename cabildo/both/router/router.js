
Router.route('/home', function () {
  this.render('home');
});
Router.route('/perfil', function () {
  this.render('perfil');
});
Router.route('/misleyes', function () {
  this.render('misleyes'); 
});
Router.route('/misdatos', function () {
  this.render('misdatos'); 
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


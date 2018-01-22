Jetman.ExplosionEffect = { 
	init: function(game){

		    this.group = game.add.group();
		    this.group.createMultiple(3, 'kaboom');
		    this.group.forEach(this.setup, this);
	},

	play: function(obj){
		    var explosion = this.group.getFirstExists(false);
			explosion.reset(obj.centerX, obj.y);
			explosion.play('kaboom',30,false,true);
	},

	setup: function(obj){

	    obj.anchor.x = 0.5;
	    obj.anchor.y = 0.5;
	    obj.animations.add('kaboom');


	}
}
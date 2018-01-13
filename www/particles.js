Jetman.Particles = {
	
	 initParticles: function(game){
	 	this.game = game;
		this.emitter = game.add.emitter();
		this.emitter.makeParticles('jetParticle');
		this.emitter.maxParticles = 1;
		this.emitter.gravity = 0;
		this.emitter.setAlpha(0.2,1);

		this.emitter.start(
				false,  //release all particles at once
				200,	//time in ms each particle lasts  	
				1		//interval between particle release 
			);
		this.emitter.on = false;
	},

	startJetpackParticleFlare: function(){	
		this.emitter.y = Jetman.Player.sprite.centerY;
		this.emitter.x =  Jetman.Player.sprite.centerX;
		this.emitter.emitX =  Jetman.Player.sprite.centerX;
		this.emitter.emitY =  Jetman.Player.sprite.centerY;
		this.emitter.on = true;
		
    },

    stopJetpackParticleFlare: function(){
    	this.emitter.on = false;
    }

};


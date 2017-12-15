Jetman.Particles = {
	
	 initParticles: function(game){
	 	this.game = game;
	 	this.isBurstingActive = false,
		this.emitter = game.add.emitter(0, 0, 100);
		this.emitter.makeParticles('jetParticle');
		this.emitter.frequency = 1;
		this.emitter.minRotation = 0;
		this.emitter.maxRotation = 0;
		this.emitter.gravity = 0;
		this.emitter.setAlpha(1,0,0);
		this.emitter.lifespan = 300;
		this.emitter.frequency = 25;
		//this.emitter.quantity = 25;
	},

	jetpackParticleFlare: function(){
		this.emitter.y = Jetman.Player.sprite.centerY;
		this.emitter.x =  Jetman.Player.sprite.centerX;
		this.emitter.emitX =  Jetman.Player.sprite.centerX;
		this.emitter.emitY =  Jetman.Player.sprite.centerY;
		this.emitter.start(true, 300, 25, 4);
    },

    startParticleBurstWithTimeout: function(){
    	//debugger;
    	
    	Jetman.Player.fuel =100;
    	return;
    	// Jetman.Player.hasFuel = true;
     //    this.isBurstingActive = true; 
     //    function stopburst(){
     //    	//debugger;
     //    	console.log('started');
     //    	Jetman.Player.hasFuel = false;
     //      this.isBurstingActive = false;
     //    }

     //    if(Jetman.Player.hasFuel === false){
      		
     //    	this.game.time.events.add(1500, stopburst, this);
        	
     //    }
        
    },

    startParticleBurstNoTimeout: function(){
    	this.isBurstingActive = true;
    }

};


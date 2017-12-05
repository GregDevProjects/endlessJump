function Particles(){
	this.isBurstingActive = false;
	 this.construct = function(){
		this.emitter = game.add.emitter(0, 0, 100);
		this.emitter.makeParticles('jetParticle');
		this.emitter.frequency = 1;
		this.emitter.minRotation = 0;
		this.emitter.maxRotation = 0;
		this.emitter.gravity = 1000;
		this.emitter.setAlpha(1,0,0);
		this.emitter.lifespan = 300;
		this.emitter.frequency = 50;
		//this.emitter.quantity = 25;
	}

	this.construct();

	this.jetpackParticleFlare = function(){
		this.emitter.y = player.player.centerY;
		this.emitter.x = player.player.centerX;
		this.emitter.emitX = player.player.centerX;
		this.emitter.emitY = player.player.centerY;
		this.emitter.start(true, 300, 50, 4);
    }

    this.startParticleBurstWithTimeout = function(){
        this.isBurstingActive = true;
        function stopburst(){
          this.isBurstingActive = false;
        }
        game.time.events.add(250, stopburst, this);
    }

    this.startParticleBurstNoTimeout = function(){
    	this.isBurstingActive = true;
    }

    return this;
}
Jetman.Level1 = function(game){};
Jetman.Level1.prototype = {
	  create :function() {  
      this.game.renderer.renderSession.roundPixels = true;
      this.game.time.advancedTiming = true;
      this.game.stage.backgroundColor = 0xcc7b09;

      Jetman.Platforms.initGroups(this.game);
      Jetman.Platforms.initTileMap(this.game);
      Jetman.Platforms.tileObjectsToSprites();
      Jetman.Particles.initParticles(this.game);
      Jetman.Player.initPlayer(this.game);
      
    },

    update: function() {
      //hackey 
     // spawner.start(this.game);
      

      // if(Jetman.Particles.isBurstingActive){
      //   Jetman.Particles.jetpackParticleFlare();
      // }
      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.Platforms.fireball, Jetman.Platforms.onFireballPlayerOverlap);
      this.game.physics.arcade.overlap(Jetman.Platforms.fireball, Jetman.Platforms.platforms, Jetman.Platforms.onFireballPlatformOverlap);

      this.game.physics.arcade.collide(Jetman.Player.sprite, Jetman.Platforms.platforms, undefined, null, this); 

      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.Platforms.fuel, Jetman.Platforms.onFuelOverlap, null, this);
      Jetman.Input.dragControl(this.game);

      // if(Jetman.Player.fuel >0){
      //   Jetman.Player.fuel--;
      //   Jetman.Particles.isBurstingActive = true;
      //   console.log( Jetman.Player.fuel);
      // }else{
      //    Jetman.Particles.isBurstingActive = false;
      // }
    },


    render: function() {
        this.game.debug.pointer(this.game.input.activePointer);
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
   this.game.debug.text(Jetman.Player.fuel, 32,200);
    //         this.game.debug.text("Time until event: " + this.game.time.events.duration.toFixed(0), 32, 32);
    // this.game.debug.text("Next tick: " + this.game.time.events.next.toFixed(0), 32, 64);
        this.game.debug.body(Jetman.Player.sprite);
      //  this.game.debug.spriteInfo(Jetman.Player.sprite, 32, 32);
    }


}
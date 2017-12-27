Jetman.Level1 = function(game){};
Jetman.Level1.prototype = {
	  create :function() {  
      this.game.renderer.renderSession.roundPixels = true;
      this.game.time.advancedTiming = true;
      this.game.stage.backgroundColor = 0xcc7b09;

      Jetman.Platforms.initGroups(this.game);
      Jetman.Platforms.initTileMap(this.game);
      Jetman.Particles.initParticles(this.game);
      Jetman.Player.initPlayer(this.game);
      //TODO: new object for map 
      Jetman.SpikeEnemies.init(Jetman.Platforms.map,this.game);
      Jetman.Fuel.init(Jetman.Platforms.map,this.game);    
      Jetman.JumpPad.init(Jetman.Platforms.map,this.game);   
    },

    update: function() {

      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.Platforms.fireball, Jetman.Platforms.onFireballPlayerOverlap);

      this.game.physics.arcade.overlap(Jetman.Platforms.fireball, Jetman.Platforms.platforms, Jetman.Platforms.onFireballPlatformOverlap);

      //tile collisions 
      this.game.physics.arcade.collide(Jetman.Player.sprite, Jetman.Platforms.platforms, Jetman.Platforms.onPlatformCollision, null, this); 
      this.game.physics.arcade.collide(Jetman.Player.sprite, Jetman.Platforms.walls, Jetman.Platforms.onWallColide, null, this); 

      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.JumpPad.group, Jetman.JumpPad.onPlayerOverlap, null, this);

       this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.Fuel.group, Jetman.Fuel.onFuelOverlap, null, this);



      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.SpikeEnemies.group, Jetman.SpikeEnemies.onPlayerSpikeEnemyOverlap);

      Jetman.Input.dragControl(this.game);
      //spike enemy code 
      Jetman.SpikeEnemies.group.forEach(function(aSpikedEnemy){
        aSpikedEnemy.move();
      });

      this.game.physics.arcade.collide(Jetman.SpikeEnemies.group, Jetman.Platforms.platforms, Jetman.SpikeEnemies.onSpikedEnemyPlatformOverlap);
      this.game.physics.arcade.collide(Jetman.SpikeEnemies.group, Jetman.Platforms.walls, Jetman.SpikeEnemies.onSpikedEnemyPlatformOverlap);
      Jetman.Player.angleUpright();
      
    },


    render: function() {
     // this.game.debug.pointer(this.game.input.activePointer);
      this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
      this.game.debug.text(Jetman.Player.fuel, 32,200);
    //         this.game.debug.text("Time until event: " + this.game.time.events.duration.toFixed(0), 32, 32);
    // this.game.debug.text("Next tick: " + this.game.time.events.next.toFixed(0), 32, 64);
       // this.game.debug.body(Jetman.Player.sprite);
        //this.game.debug.spriteInfo(Jetman.Player.sprite, 32, 32);

     // Jetman.SpikeEnemies.group.forEach( this.game.debug.body);

    }


}
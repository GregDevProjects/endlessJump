Jetman.Level1 = function(game){};
Jetman.Level1.prototype = {
	  create :function() {  
      // this.game.renderer.renderSession.roundPixels = true;
      // this.game.time.advancedTiming = true;
       





      Jetman.Platforms.initTileMap(this.game);
      Jetman.Particles.initParticles(this.game);
      Jetman.Player.initPlayer(this.game);
       Jetman.Player.fuel = 150;
      Jetman.Walker.init(Jetman.Platforms.map,this.game);

      Jetman.Jumper.init(Jetman.Platforms.map,this.game);
      //TODO: new object for map 
      Jetman.SpikeEnemies.init(Jetman.Platforms.map,this.game);
     // Jetman.Fuel.init(Jetman.Platforms.map,this.game);    
      Jetman.JumpPad.init(Jetman.Platforms.map,this.game);   

      Jetman.Platforms.initBackground(this.game);



    },

    update: function() {

      //jumper code 
      this.game.physics.arcade.collide(Jetman.Jumper.group, Jetman.Platforms.platforms);
      Jetman.Jumper.group.forEach(function(aWalker){
       
       aWalker.move();
          aWalker.game.physics.arcade.collide(Jetman.Player.sprite, aWalker.button, aWalker.onButtonOverlap, null, this); 
          aWalker.game.physics.arcade.collide(Jetman.Player.sprite, aWalker, aWalker.onPlayerCollision, null, this); 
       });




      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.Platforms.fireball, Jetman.Platforms.onFireballPlayerOverlap);

      this.game.physics.arcade.overlap(Jetman.Platforms.fireball, Jetman.Platforms.platforms, Jetman.Platforms.onFireballPlatformOverlap);

      //tile collisions 
      this.game.physics.arcade.collide(Jetman.Player.sprite, Jetman.Platforms.platforms, Jetman.Platforms.onPlatformLayerCollision, null, this); 
      this.game.physics.arcade.collide(Jetman.Player.sprite, Jetman.Platforms.death, Jetman.Platforms.onDeathLayerCollision, null, this); 



      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.JumpPad.group, Jetman.JumpPad.onPlayerOverlap, null, this);

      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.SpikeEnemies.group, Jetman.SpikeEnemies.onPlayerSpikeEnemyOverlap);

    
      //spike enemy code 
      Jetman.SpikeEnemies.group.forEach(function(aSpikedEnemy){
       
        if(aSpikedEnemy.children[0].key === "button"){
          aSpikedEnemy.game.physics.arcade.collide(Jetman.Player.sprite, aSpikedEnemy.children[0], Jetman.SpikeEnemies.onButtonOverlap, null, this); 
        }
        aSpikedEnemy.move();
      });
      

      this.game.physics.arcade.collide(Jetman.SpikeEnemies.group, Jetman.Platforms.platforms, Jetman.SpikeEnemies.onSpikedEnemyPlatformOverlap);

        Jetman.Input.dragControl(this.game);
      Jetman.Player.angleUpright();
      
    },


    render: function() {
     // this.game.debug.pointer(this.game.input.activePointer);
      // this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
      this.game.debug.text("Fuel: " + Jetman.Player.fuel, 32,200);
       this.game.debug.text("Max Combo: " + Jetman.Player.maxCombo, 32,150);
    //  this.game.debug.body(Jetman.JumpPad.group.children[5]);




    }


}
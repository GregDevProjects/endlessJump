Jetman.Level1 = function(game){};
Jetman.Level1.prototype = {
	  create :function() {  
      this.game.renderer.renderSession.roundPixels = true;
      this.game.time.advancedTiming = true;
     // this.game.stage.backgroundColor = 0xE7E3E2;
      var sprite = this.game.add.tileSprite(0, 0, 360, 9600, 'bg');
       

      Jetman.Platforms.initGroups(this.game);
      Jetman.Platforms.initTileMap(this.game);
      Jetman.Particles.initParticles(this.game);
      Jetman.Player.initPlayer(this.game);
       Jetman.Player.fuel = 10000;
      Jetman.Walker.init(Jetman.Platforms.map,this.game);
      //TODO: new object for map 
      Jetman.SpikeEnemies.init(Jetman.Platforms.map,this.game);
     // Jetman.Fuel.init(Jetman.Platforms.map,this.game);    
      Jetman.JumpPad.init(Jetman.Platforms.map,this.game);   

     
      // debugger;
    },

    update: function() {

      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.Platforms.fireball, Jetman.Platforms.onFireballPlayerOverlap);

      this.game.physics.arcade.overlap(Jetman.Platforms.fireball, Jetman.Platforms.platforms, Jetman.Platforms.onFireballPlatformOverlap);

      //tile collisions 
      this.game.physics.arcade.collide(Jetman.Player.sprite, Jetman.Platforms.platforms, Jetman.Platforms.onTileCollision, null, this); 


      this.game.physics.arcade.collide(Jetman.Walker.group, Jetman.Platforms.platforms);

      this.game.physics.arcade.collide(Jetman.Walker.group, Jetman.Platforms.boundries);

      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.JumpPad.group, Jetman.JumpPad.onPlayerOverlap, null, this);

      this.game.physics.arcade.overlap(Jetman.Player.sprite, Jetman.SpikeEnemies.group, Jetman.SpikeEnemies.onPlayerSpikeEnemyOverlap);

      Jetman.Input.dragControl(this.game);
      //spike enemy code 
      Jetman.SpikeEnemies.group.forEach(function(aSpikedEnemy){
       
        if(aSpikedEnemy.children[0].key === "button"){
          aSpikedEnemy.game.physics.arcade.collide(Jetman.Player.sprite, aSpikedEnemy.children[0], Jetman.SpikeEnemies.onButtonOverlap, null, this); 
        }
        aSpikedEnemy.move();
      });

      //walker code
      Jetman.Walker.group.forEach(function(aWalker){
       
        aWalker.move(aWalker);
        aWalker.game.physics.arcade.collide(Jetman.Player.sprite, aWalker.button, aWalker.onButtonOverlap, null, this); 
        aWalker.game.physics.arcade.collide(Jetman.Player.sprite, aWalker, aWalker.onPlayerCollision, null, this); 

      });

      this.game.physics.arcade.collide(Jetman.SpikeEnemies.group, Jetman.Platforms.platforms, Jetman.SpikeEnemies.onSpikedEnemyPlatformOverlap);

      Jetman.Player.angleUpright();
      
    },


    render: function() {
     // this.game.debug.pointer(this.game.input.activePointer);
      this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
      this.game.debug.text("Fuel: " + Jetman.Player.fuel, 32,200);
      this.game.debug.text("Max Combo: " + Jetman.Player.maxCombo, 32,150);
    //  this.game.debug.body(Jetman.JumpPad.group.children[5]);




    }


}
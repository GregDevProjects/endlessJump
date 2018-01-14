Jetman.Level1 = function(game){};
Jetman.Level1.prototype = {
	  create :function() {  
      this.game.time.advancedTiming = true;
      Jetman.Platforms.initTileMap(this.game);
     Jetman.Particles.initParticles(this.game);

      Jetman.Player.initPlayer(this.game);
      Jetman.Player.fuel = 200000;

      Jetman.Walker.init(Jetman.Platforms.map,this.game);

      Jetman.Jumper.init(Jetman.Platforms.map,this.game);

      Jetman.SpikeEnemies.init(Jetman.Platforms.map,this.game);

      Jetman.JumpPad.init(Jetman.Platforms.map,this.game);   

      Jetman.Boundry.init(Jetman.Platforms.map,this.game);

      Jetman.Platforms.initBackground(this.game);

    



    },

    update: function() {


      //tile collisions 
      this.game.physics.arcade.collide(Jetman.Player.sprite, Jetman.Platforms.platforms, Jetman.Platforms.onPlatformLayerCollision, null, this); 
      this.game.physics.arcade.collide(Jetman.Player.sprite, Jetman.Platforms.death, Jetman.Platforms.onDeathLayerCollision, null, this); 
      Jetman.Input.dragControl(this.game);
      Jetman.Player.angleUpright();
      
    },


    render: function() {
     // this.game.debug.pointer(this.game.input.activePointer);
       this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
      this.game.debug.text("Fuel: " + Jetman.Player.fuel, 32,200);
       this.game.debug.text("Max Combo: " + Jetman.Player.maxCombo, 32,150);
    //  this.game.debug.body(Jetman.Boundry.group.children[0]);




    }


}
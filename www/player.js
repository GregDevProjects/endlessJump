Jetman.Player = {
    initPlayer: function(game){
        firstrun = true;
        this.game = game;
        var x = Jetman.Platforms.map.objects.playerStart[0].x; 
        var y = Jetman.Platforms.map.objects.playerStart[0].y;
        this.flySpeed = 200;


        this.sprite =  this.game.add.sprite(x, y, 'player'); 
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.allowGravity = true;
        this.sprite.body.collideWorldBounds=true;
        this.sprite.body.gravity.y = 300;    
        this.game.camera.follow(this.sprite);
        this.game.camera.targetOffset.y = -game.height/4;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.fuel = 0;
        this.enableAngleCorrection = false;
        this.sprite.body.bounce.y = 1;
        Jetman.Player.sprite.body.maxVelocity.y= this.flySpeed;

       // this.hasFuel = false;
    },

    death: function(){
        this.game.camera.target = null;
        this.game.camera.flash(0xff0000, 500);
        this.sprite.kill();

        var x = Jetman.Platforms.map.objects.playerStart[0].x; 
        var y = Jetman.Platforms.map.objects.playerStart[0].y;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.body.allowGravity = true;
        this.sprite.body.velocity.set(0);
        this.sprite.revive(x,y);
        this.game.camera.targetOffset.set(0);
        this.game.camera.follow(this.sprite);    
    },

    moveRight: function(){
        this.sprite.body.velocity.x = 50;
    },

    moveLeft: function(){
        this.sprite.body.velocity.x = -50; 
    },

    flyToActivePointer: function(){
        if(this.fuel <= 0){
            this.sprite.body.allowGravity = true;
            return false;
        }
        Jetman.Player.sprite.body.allowGravity = false; 
        this.game.physics.arcade.moveToPointer(Jetman.Player.sprite, this.flySpeed, this.game.input.activePointer, 0);
        Jetman.Player.anglePlayerToPointer();
        Jetman.Particles.jetpackParticleFlare();
        this.fuel--;
        return true;
    },

    stop: function(){
        this.sprite.body.allowGravity = true;
        this.sprite.body.velocity.x = 0;
    },

    anglePlayerToPointer: function() {
      this.sprite.rotation = this.game.physics.arcade.angleToPointer(Jetman.Player.sprite, this.game.input.activePointer);
      this.sprite.angle += 90;
    },

    angleUpright: function() {
        if(this.enableAngleCorrection){
            if(this.sprite.body.rotation >= 2.5 || this.sprite.body.rotation <= -2.5){
              if(this.sprite.body.rotation < 0){
                this.sprite.body.rotation += 5;
              } else {
                this.sprite.body.rotation -= 5;
              }  
            } else {
              this.enableAngleCorrection = false;
            }
            
        }
    },

    startAnglingUpright: function(){
         this.enableAngleCorrection = true;
    }

}

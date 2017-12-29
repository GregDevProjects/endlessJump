Jetman.Player = {
    initPlayer: function(game){
        firstrun = true;
        this.game = game;
        var x = Jetman.Platforms.map.objects.playerStart[0].x; 
        var y = Jetman.Platforms.map.objects.playerStart[0].y;
        this.flySpeed = 200;
        this.didCollideWithJumpadX = false;

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
      //  this.sprite.body.bounce.x = 0.5;
        this.sprite.body.maxVelocity.y= this.flySpeed; 
         this.sprite.body.drag.x = 100;
        this.isOnJumpPadMomentum = false;
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
      //  this.game.camera.targetOffset.set(0);
        this.game.camera.follow(this.sprite);    
    },

    moveRight: function(){
      if(Jetman.Player.didCollideWithJumpadX){
        if(Jetman.Player.sprite.body.velocity.x <= 0)
        Jetman.Player.didCollideWithJumpadX= false;
        return;
      }
        this.sprite.body.velocity.x = 70;
    },

    moveLeft: function(){
      if(Jetman.Player.didCollideWithJumpadX){
        if(Jetman.Player.sprite.body.velocity.x <= 0)
        Jetman.Player.didCollideWithJumpadX= false;
        return;
      }
        this.sprite.body.velocity.x = -70; 
    },

    flyToActivePointer: function(){
        if(this.fuel <= 0 || this.isOnJumpPadMomentum){
            this.sprite.body.allowGravity = true;
            return false;
        }
        this.enableAngleCorrection = false;
        Jetman.Player.sprite.body.allowGravity = false; 
        this.game.physics.arcade.moveToPointer(Jetman.Player.sprite, this.flySpeed, this.game.input.activePointer, 0);
        Jetman.Player.anglePlayerToPointer();
        Jetman.Particles.jetpackParticleFlare();
        this.fuel--;
        return true;
    },

    stop: function(){
        this.sprite.body.allowGravity = true;

       // this.sprite.body.velocity.x >= 3 ? this.sprite.body.velocity.x-=3 : this.sprite.body.velocity.x+=3;
        // this.sprite.body.velocity.x = 0;
        // if(this.sprite.body.blocked.down){
        //     this.sprite.body.velocity.x = 0;
        // }
    },

    anglePlayerToPointer: function() {
      this.sprite.rotation = this.game.physics.arcade.angleToPointer(Jetman.Player.sprite, this.game.input.activePointer);
      this.sprite.angle += 95;
    },

    angleUpright: function() {
        if(this.enableAngleCorrection && !this.isOnJumpPadMomentum){
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

     
            this.handleJumpPadSpin();
        


    },

    startAnglingUpright: function(){
         this.enableAngleCorrection = true;
    },

    handleJumpPadSpin: function(){
        if(!this.isOnJumpPadMomentum){
            return;
        }
        this.sprite.body.rotation += 8;
        if(this.sprite.body.velocity.y>=-20){
            this.isOnJumpPadMomentum = false;
            Jetman.Player.sprite.body.maxVelocity.y= this.flySpeed;
            this.startAnglingUpright();
        }       
    }

}

//if running out of fuel while holding keep momentum \
//go slow when out of fuel
Jetman.Player = {

    MAX_FUEL: 400,

    initPlayer: function(game){
        // firstrun = true;
        this.game = game;
        var x = Jetman.Platforms.map.objects.playerStart[0].x; 
        var y = Jetman.Platforms.map.objects.playerStart[0].y;
        this.flySpeed = 200;
        this.didCollideWithJumpadX = false;

        this.sprite =  this.game.add.sprite(x, y, 'player'); 
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.allowGravity = true;
        this.sprite.body.gravity.y = 300;    
        this.game.camera.follow(this.sprite);
        this.game.camera.targetOffset.y = -game.height/4;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.fuel = 0;
        this.enableAngleCorrection = false;
        this.sprite.body.bounce.y = 0.5;
        //this.sprite.body.maxVelocity.y= this.flySpeed; 
        this.sprite.body.drag.x = 150;
      //  this.sprite.body.drag.y = 50;
        this.isOnJumpPadMomentum = false;
        this.currentComboCounter = 0;
        this.maxCombo = 0;
        this.isFlinging = false;
       // this.isFlingingRight = false;
        this.disableFling = false;
    },

    death: function(){
      //  return;
        Jetman.Text.displayDeathText(this.game);
        Jetman.ExplosionEffect.play(this.sprite);
        this.game.camera.target = null;
        this.game.camera.flash(0xff0000, 500);
        this.sprite.kill();
        this.resetCombo();
        this.game.camera.onFlashComplete.add(function() {
          this.game.state.restart();
        }, this);
        
    },

    fling: function(angle, force){
        if(this.isFlinging || this.isOnJumpPadMomentum){// || this.disableFling){
           return;
        }
        this.game.physics.arcade.velocityFromAngle(
            angle,
            force,
            this.sprite.body.velocity
        );
        this.isFlinging = true;
        this.isFlingingRight = this.sprite.body.velocity.x > 0 ? true : false;
    },

    flyToActivePointer: function(){
        if(this.fuel <= 0 ){
            //when the fuel runs out 
            this.sprite.body.allowGravity = true;
            Jetman.Particles.stopJetpackParticleFlare();
            return false;
        }
        this.fly();
        return true;
    },

    fly: function(){
        if(this.isOnJumpPadMomentum){
            return;
        }
        this.disableFling = true;
        this.isFlinging = false;
        Jetman.FuelGauge.sprite.setPointerPosition(false);
        this.enableAngleCorrection = false;
        Jetman.Player.sprite.body.allowGravity = false; 
        this.game.physics.arcade.moveToPointer(Jetman.Player.sprite, this.flySpeed, this.game.input.activePointer, 0);
        Jetman.Player.anglePlayerToPointer();
        Jetman.Particles.startJetpackParticleFlare();
        this.fuel--;
    },

    stop: function(){
        Jetman.Particles.stopJetpackParticleFlare();
        this.sprite.body.allowGravity = true;
        this.disableFling = false;
    },

    applySuddenVelocity: function(xVelocity, yVelocity){
        this.isFlinging = false;
        this.sprite.body.allowGravity = true;
        this.sprite.body.velocity.y = yVelocity;
        this.sprite.body.velocity.x = xVelocity;
        this.isOnJumpPadMomentum = true;
        if(xVelocity > 0 || xVelocity < 0) {
            Jetman.Player.didCollideWithJumpadX = true;
        }
    },

    anglePlayerToPointer: function() {
      this.sprite.rotation = this.game.physics.arcade.angleToPointer(Jetman.Player.sprite, this.game.input.activePointer);
      this.sprite.angle += 95;
    },

    handleRotations: function() {
        if(this.enableAngleCorrection ){ 
            this.rotateToStandingPostion();
            return
            
        }

        if(this.isOnJumpPadMomentum){
            this.handleJumpPadSpin();
            return;

        }

        if(this.isFlinging){
            this.handleFlingSpin();
            return;
        }
        
    },

    rotateToStandingPostion: function(){
        if(this.sprite.body.rotation >= 2.5 || this.sprite.body.rotation <= -2.5){
          if(this.sprite.body.rotation < 0){
            this.sprite.body.rotation += 5;
          } else {
            this.sprite.body.rotation -= 5;
          }  
        } else {
            this.isFlinging = false;
            this.enableAngleCorrection = false;
            this.isOnJumpPadMomentum = false;
        }
    },

    handleFlingSpin: function(){
        if(this.isFlingingRight){
            this.sprite.body.rotation += 8;
        } else {
            this.sprite.body.rotation -= 8;
        }
         
    },

    startAnglingUpright: function(){
         this.enableAngleCorrection = true;
    },

    handleJumpPadSpin: function(){
        this.sprite.body.rotation += 8;
        if(this.sprite.body.velocity.y>=-20){   
            this.startAnglingUpright();
        }       
    },

    incrementCombo: function(){
        this.currentComboCounter+=1;
        if(this.currentComboCounter < 2){
            return;
        }
        if(this.currentComboCounter > this.maxCombo){
            this.maxCombo = this.currentComboCounter;
        }
        Jetman.Text.displayRiseAndFadeOutText(
            this.sprite.centerX - 50, 
            this.sprite.y, 
            this.currentComboCounter + " COMBO", 
            this.game
        );
    },

    resetCombo: function(){
         this.currentComboCounter = 0;
    },

    increaseFuel: function(amount){
        if(amount + this.fuel  > this.MAX_FUEL){
            this.fuel = this.MAX_FUEL;
            Jetman.FuelGauge.sprite.setPointerPosition(true);
            return;
        }
        this.fuel += amount;
        Jetman.FuelGauge.sprite.setPointerPosition(true);
    }


}

//if running out of fuel while holding keep momentum \
//go slow when out of fuel
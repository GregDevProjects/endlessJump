Jetman.Jumper = {
  VelocityChange : {
    UP: {x: 0, y: 700},
    UP_RIGHT: {x: 250, y: 700}
  },

	init: function(map,game){

	  this.group = game.add.group();
    this.group.enableBody = true;
    this.moveSpeed = 20;
    game.physics.arcade.enable(this.group);

    // this.boundryGroup = game.add.group();
    // this.boundryGroup.enableBody = true;
    // this.sprite.body.gravity.y = 300;  
    for (var i=0;i<map.objects.jumper.length;i++) {
      map.objects.jumper[i].gid = 8;     
     }


    map.createFromObjects('jumper', 8,'jumper',0,true,false,this.group,  this.jumper(game), false, false);

    this.group.forEach(function(aJumper){
       
        aJumper.init();
    });

    this.group.setAll('body.gravity.y',200);
    this.group.setAll('body.collideWorldBounds',true);
   // this.boundryGroup.setAll('body.moves',false);
	},


  jumper: function(game){
    this.sprite =  Phaser.Sprite;
    this.sprite.prototype.moveSpeed = 200;
    this.sprite.prototype.jumpSpeed = 300;
    this.sprite.prototype.controlledFallSpeed = 3.5;
    this.sprite.prototype.move = function(){

      if(this.centerY < Jetman.Player.sprite.centerY   && this.body.blocked.none){
       this.moveTowardsPlayer();
        return;
      }

      if(this.body.blocked.down ||this.body.blocked.left || this.body.blocked.right){

        if(this.isJumperSlightlyAbovePlayer()) {
          this.moveTowardsPlayer();
        } else {
          this.jumpTowardsPlayer();
        }
      } 
    }

    this.sprite.prototype.isJumperSlightlyAbovePlayer = function(){
      return this.centerY < Jetman.Player.sprite.centerY -200;
    }

    this.sprite.prototype.moveTowardsPlayer = function(){
      if(this.centerX > Jetman.Player.sprite.centerX){
          this.body.velocity.x -= this.controlledFallSpeed;
      } else {
        this.body.velocity.x += this.controlledFallSpeed;
      }
    }

    this.sprite.prototype.jumpTowardsPlayer = function(){
        this.body.velocity.y = -this.jumpSpeed;

        if(this.centerX > Jetman.Player.sprite.centerX){
            this.body.velocity.x = -this.moveSpeed;
        } else {
          this.body.velocity.x = this.moveSpeed;
        }
    }

    this.sprite.prototype.init = function(){
      this.button = this.addChild(game.make.sprite(0, -10, 'button'));
      game.physics.enable(this.button, Phaser.Physics.ARCADE);
      this.button.body.moves = false
    }

    this.sprite.prototype.onButtonOverlap = function(player, button){
      if(!button.body.touching.up){
        return;
    }

    Jetman.Player.incrementCombo();
    Jetman.Player.fuel += 150;
    Jetman.Player.applySuddenVelocity(0,-300);
    button.parent.kill();
    button.kill();
  }

    this.sprite.prototype.onPlayerCollision = function(player,button){
      Jetman.Player.death();
    }
    return this.sprite;
  }

};

Jetman.Walker = {
  VelocityChange : {
    UP: {x: 0, y: 700},
    UP_RIGHT: {x: 250, y: 700}
  },

	init: function(map,game){

	  this.group = game.add.group();
    this.group.enableBody = true;
    this.moveSpeed = 20;
    game.physics.arcade.enable(this.group);

    // var walker = function(game){
    //   this.moveSpeed = 20;
    // }

   // debugger;
 //   walker.prototype.moveSpeed = this.moveSpeed;

   this.boundryGroup = game.add.group();
    this.boundryGroup.enableBody = true;
    // this.sprite.body.gravity.y = 300;  
    for (var i=0;i<map.objects.walker.length;i++) {
      map.objects.walker[i].gid = 7;     
     }


    map.createFromObjects('walker', 7,'walker',0,true,false,this.group,  this.walker(game), false, false);

    this.group.forEach(function(aWalker){
       
        aWalker.init();
    });

    //MAJOR FAIL
    //USE INVISIVLE TILE INSTEAD 
   //  map.createFromObjects('walkerBoundry', 8,'spikeEnemy',0,true,false,this.boundryGroup, Phaser.Sprite, false, false);


    this.group.setAll('body.gravity.y',1000);
    this.group.setAll('body.collideWorldBounds',true);
    this.boundryGroup.setAll('body.moves',false);
//this.sprite.body.collideWorldBounds=true;
	},


  move: function(sprite){
    
    if(sprite.body.blocked.right || sprite.body.blocked.left ){
      this.moveSpeed = -this.moveSpeed;
    }
    sprite.body.velocity.x = this.moveSpeed;
   // console.log(this.moveSpeed);
  },

  walker: function(game){
    this.sprite =  Phaser.Sprite;
    this.sprite.prototype.moveSpeed = 50;

    this.sprite.prototype.move = function(){
      if(this.body.blocked.right || this.body.blocked.left ){
        this.moveSpeed = -this.moveSpeed;
      }
      this.body.velocity.x = this.moveSpeed;
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


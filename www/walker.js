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

   this.boundryGroup = game.add.group();
    this.boundryGroup.enableBody = true;
    // this.sprite.body.gravity.y = 300;  
    for (var i=0;i<map.objects.walker.length;i++) {
      map.objects.walker[i].properties = {};
      map.objects.walker[i].gid = 7; 
      map.objects.walker[i].properties.move = this.move;
      map.objects.walker[i].properties.moveSpeed = this.moveSpeed;
      map.objects.walker[i].properties.boundries = [];
      for (var z=0;z<map.objects.walkerBoundry.length;z++) {
        map.objects.walkerBoundry[z].gid = 8;

       if(map.objects.walkerBoundry[z].type === map.objects.walker[i].type){
         //  map.objects.walker[i].properties.boundry = map.objects.walker[i];
           map.objects.walker[i].properties.boundries.push(map.objects.walkerBoundry[i].x);
       }
       
     }
      // switch (map.objects.jumpPad[i].name) {
      //   case "up" :  
      //    map.objects.jumpPad[i].gid = 5;
      //     break;       
      //   case "upRight" :
      //    map.objects.jumpPad[i].gid = 6;    
      //    map.objects.jumpPad[i].properties = {rotation: 45};
      //    map.objects.jumpPad[i].properties.anchor = {x:0.5, y:0.5};//.setTo(0.5, 0.5);
      //    break;     
      //}
    }

    map.createFromObjects('walker', 7,'button',0,true,false,this.group, Phaser.Sprite, false, false);
    //MAJOR FAIL
    //USE INVISIVLE TILE INSTEAD 
     map.createFromObjects('walkerBoundry', 8,'spikeEnemy',0,true,false,this.boundryGroup, Phaser.Sprite, false, false);


    this.group.setAll('body.gravity.y',1000);
    this.group.setAll('body.collideWorldBounds',true);
    this.boundryGroup.setAll('body.moves',false);
//this.sprite.body.collideWorldBounds=true;
	},

  onPlayerOverlap: function(player, jumpPad){
      switch (jumpPad.name){
        case "up":
          Jetman.Player.applySuddenVelocity(Jetman.JumpPad.VelocityChange.UP.x,-Jetman.JumpPad.VelocityChange.UP.y);
          break;
        case "upRight":
          Jetman.Player.applySuddenVelocity(Jetman.JumpPad.VelocityChange.UP_RIGHT.x,-Jetman.JumpPad.VelocityChange.UP_RIGHT.y);
          break;
      }
  },

  move: function(sprite){
    
    if(sprite.body.blocked.right || sprite.body.blocked.left ){
      this.moveSpeed = -this.moveSpeed;
      debugger;
    }
    sprite.body.velocity.x = this.moveSpeed;
    console.log(this.moveSpeed);
  }



};


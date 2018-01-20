Jetman.JumpPad = {
  VelocityChange : {
    UP: {x: 0, y: 700},
    UP_RIGHT: {x: 250, y: 700}
  },

	init: function(map,game){

    for (var i=0;i<map.objects.jumpPad.length;i++) {

      new JumpPad(
          map.objects.jumpPad[i].name, 
          game,
          map.objects.jumpPad[i].x,
          map.objects.jumpPad[i].y 
        );
    }
	}
}

JumpPad = function(name, game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'jumpPadUp');
    this.name = name;
    //this.enableBody = true;
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);

    if(this.name === "upRight"){
      this.rotation = 45;
      this.anchor = {x:0.5, y:0.5};
    }

    this.animations.add('motion', null, 2, true);
    this.animations.play('motion');

    this.onPlayerOverlap = function(player, jumpPad){
      switch (jumpPad.name){
      case "up":
      Jetman.Player.applySuddenVelocity(Jetman.JumpPad.VelocityChange.UP.x,-Jetman.JumpPad.VelocityChange.UP.y);
      break;
      case "upRight":
      Jetman.Player.applySuddenVelocity(Jetman.JumpPad.VelocityChange.UP_RIGHT.x,-Jetman.JumpPad.VelocityChange.UP_RIGHT.y);
      break;
    }
  }
   game.add.existing(this);
}


JumpPad.prototype = Object.create(Phaser.Sprite.prototype);
JumpPad.prototype.constructor = JumpPad;

JumpPad.prototype.update = function() {
  this.game.physics.arcade.overlap(Jetman.Player.sprite, this, this.onPlayerOverlap);
}
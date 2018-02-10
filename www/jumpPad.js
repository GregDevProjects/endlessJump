JumpPad = function(game, type ) {
    Phaser.Sprite.call(this, game, 0, 0, 'jumpPadUp');
    this.jumpPadType = type;
    //this.enableBody = true;
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);

    if(this.jumpPadType === Jetman.JumpPadRight.TYPE_ID){
      this.rotation = 45;
      this.anchor = {x:0.5, y:0.5};
    }

    if(this.jumpPadType === Jetman.JumpPadLeft.TYPE_ID){
      this.rotation = -45;
      this.anchor = {x:0.5, y:0.5};
    }

    this.animations.add('motion', null, 2, true);
    this.animations.play('motion');

    this.onPlayerOverlap = function(player, jumpPad){
      switch (jumpPad.jumpPadType){
      case Jetman.JumpPadUp.TYPE_ID:
        Jetman.Player.applySuddenVelocity(Jetman.JumpPad.VelocityChange.UP.x,-Jetman.JumpPad.VelocityChange.UP.y);
        break;
      case Jetman.JumpPadRight.TYPE_ID:
        Jetman.Player.applySuddenVelocity(Jetman.JumpPad.VelocityChange.UP_RIGHT.x,-Jetman.JumpPad.VelocityChange.UP_RIGHT.y);
        break;
      case Jetman.JumpPadLeft.TYPE_ID:
        Jetman.Player.applySuddenVelocity(-Jetman.JumpPad.VelocityChange.UP_LEFT.x,-Jetman.JumpPad.VelocityChange.UP_LEFT.y);
    }
  }
   game.add.existing(this);
}


JumpPad.prototype = Object.create(Phaser.Sprite.prototype);
JumpPad.prototype.constructor = JumpPad;

JumpPad.prototype.update = function() {
  this.game.physics.arcade.overlap(Jetman.Player.sprite, this, this.onPlayerOverlap);
}

Jetman.JumpPad = {

  VelocityChange : {
    UP: {x: 0, y: 400},
    UP_RIGHT: {x: 300, y: 400},
    UP_LEFT: {x: 300, y: 400}
  }

}

Jetman.JumpPadUp = {
  TYPE_ID : 5,
  QUANTITY : 3,
  SPRITE : JumpPad,
}

Jetman.JumpPadRight = {
  TYPE_ID : 6,
  QUANTITY : 2,
  SPRITE : JumpPad,
}

Jetman.JumpPadLeft = {
  TYPE_ID : 7,
  QUANTITY : 2,
  SPRITE : JumpPad,
}
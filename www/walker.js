Jetman.Walker = {
    


}


Walker = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'walker');
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 1000;
    this.walkerMoveSpeed = 50;
    this.button = this.addChild(game.make.sprite(0, -10, 'button'));
    game.physics.enable(this.button, Phaser.Physics.ARCADE);
    this.button.body.moves = false;
    //value will be givin by poolspawner
    this.arrayIndex;

    this.move = function() {
        if (this.body.blocked.right || this.body.touching.right || this.body.blocked.left ||this.body.touching.left) {
            this.reverseDirections();
        }
        this.body.velocity.x = this.walkerMoveSpeed;
    }

    this.reverseDirections = function(thisWalker){
        this.walkerMoveSpeed = -this.walkerMoveSpeed;
    }

    this.test = function(walker,yo){
      //  debugger;
      walker.x+=20;
      walker.walkerMoveSpeed = -walker.walkerMoveSpeed;
    }

    this.onPlayerWalkerCollision = function(player, walker) {
        Jetman.Player.death();
    }


    this.onPlayerButtonCollision = function(button, player) {

        if (!button.body.touching.up) {
            return;
        }

        Jetman.ExplosionEffect.play(button.parent);
        Jetman.Player.incrementCombo();
        Jetman.Player.fuel += 100;
        Jetman.Player.applySuddenVelocity(0, -300);
        button.parent.kill();
        button.kill();
        Jetman.PoolSpawner.respawn(button.parent.arrayIndex);
    }

    game.add.existing(this);
    this.kill();
}


Walker.prototype = Object.create(Phaser.Sprite.prototype);
Walker.prototype.constructor = Walker;

Walker.prototype.update = function() {
   
    this.game.physics.arcade.collide(this, Jetman.Platforms.platforms);
    this.game.physics.arcade.collide(this, Jetman.Boundry.group);
    this.game.physics.arcade.collide(this, Jetman.Player.sprite, this.onPlayerWalkerCollision);
    this.game.physics.arcade.collide(this.button, Jetman.Player.sprite, this.onPlayerButtonCollision);
    
    this.move();

}
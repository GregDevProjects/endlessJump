//turret
//aim towards player 
//shoot projectile 

Jetman.Turret = {
    


}


Turret = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'Turret');
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);

    game.add.existing(this);
    this.kill();
}


Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

Turret.prototype.update = function() {
   

}
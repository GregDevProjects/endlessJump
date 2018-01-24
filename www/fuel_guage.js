Jetman.FuelGauge= {
    MAX_ROTATION : 1.1,
    MIN_ROTATION : -1.3,

    init: function(game){
        this.sprite = new FuelGauge(game);
        this.sprite.setPointerPosition(false);
    }

}

FuelGauge = function(game) {
    this.game = game;
    Phaser.Sprite.call(this, game, 20, game.height - 70, 'guage');
    this.fixedToCamera = true;
    this.pointer = this.addChild(game.make.sprite(25  , 25, 'guagePointer'));
    this.pointer.anchor.setTo(0.5, 0.5);
    game.add.existing(this);

    this.radiansMoved = Jetman.FuelGauge.MAX_ROTATION + -Jetman.FuelGauge.MIN_ROTATION;

    this.setPointerPosition = function(tweenEnabled){
        fuel = Jetman.Player.fuel;
        var percentage = fuel / Jetman.Player.MAX_FUEL;
        var radianValue = this.radiansMoved * percentage;
        var newRotation = radianValue + Jetman.FuelGauge.MIN_ROTATION;

        if(tweenEnabled){
            this.game.add.tween(this.pointer).to( { rotation: newRotation }, 500, Phaser.Easing.Linear.None, true);
        } else {
            this.pointer.rotation = newRotation;
        }

    }

}


FuelGauge.prototype = Object.create(Phaser.Sprite.prototype);
FuelGauge.prototype.constructor = FuelGauge;


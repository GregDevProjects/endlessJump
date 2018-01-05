Jetman.Text = {
	displayRiseAndFadeOutText: function(x,y, text, game){
		var style = { font: "40px Arial", fill: "#ff0044", align: "center" };
		var myText =  game.add.text(x,y, text);
		game.add.tween(myText).to({
			y: y -100
		}, 1000, Phaser.Easing.Linear.None, true);
		game.add.tween(myText).to({
			alpha: 0
		}, 1000, Phaser.Easing.Linear.None, true);
	}
}
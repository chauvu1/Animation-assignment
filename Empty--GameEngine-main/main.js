var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprite_sheet.png");
ASSET_MANAGER.queueDownload("./spritesheetbear.png");
ASSET_MANAGER.queueDownload("./background.png");
ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
	var ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	gameEngine.addEntity(new Character(gameEngine, 50, 50, ASSET_MANAGER.getAsset("./spritesheetbear.png")));
	gameEngine.start();
});

var singleplayer =
{
    currentLevel:0,

    start:function(savedData = undefined)
	{
        game.mode = "singleplayer";

        // Finally start the level
        singleplayer.startCurrentLevel(savedData);
    },
    
    startCurrentLevel:function(savedData = undefined)
	{
        game.level = maps.singleplayer[this.currentLevel];

        console.log(game.level);

        generate.seed = Math.floor(Math.random() * 10000);
        
        game.offsetX = game.level.startX * game.gridSize;
        game.offsetY = game.level.startY * game.gridSize;

        if(obstruction.singleplayer[this.currentLevel])
        {
            singleplayer.generateCurrentMapGrid(
                obstruction.singleplayer[this.currentLevel].mapObstructedTerrain);
        }
        else
        {
            console.log(`%cThis level doesn't have obstruction for this level: ${this.currentLevel}`, 
            'background: #000; color: #ff0033');
            console.log(`%cObstruction range is from 0 to ${obstruction.singleplayer.length}`, 
            'background: #000; color: #ff6a00');
        }

        renderer.setCamera();

        background.init(savedData);
        
        renderer.level(savedData);

        //renderer.setCamera(savedData);
        console.log("startCurrentLevel doone");
    },

    nextLevel:function()
    {
        this.currentLevel++;
        
        if(game.campaignMode)
        {
            ui.currentLevel = this.currentLevel;
            ui.init(renderer.app);
        }
        else
        {
            renderer.missionbriefing();
        }
    },

    sendCommand:function(uids,orders)
	{
        console.log("sendCommand");

        game.setSelectedItemIndexes(uids,orders);

        game.sortSelectedItems(game.selectedItemIndexes,orders);

        //game.sortForInfantryFirst(uids,orders);

		game.processCommand(uids,orders);
    },  

    scaleOrders:function(orders)
    {
        if(orders.to)
        {
            orders.to.x = orders.to.x * productionInverseRatioX + game.offsetX;
            orders.to.y = orders.to.y * productionInverseRatio + game.offsetY;

            orders.to.x = orders.to.x / game.gridSize;
            orders.to.y = orders.to.y / game.gridSize;
        }
    },
    
    generateCurrentMapGrid:function(mapObstructedTerrain)
    {
        game.currentMapTerrainGrid = [];

        if(!game.level.mapGridWidth)
            game.level.mapGridWidth = game.level.backgroundWidth / game.gridSize;

        if(!game.level.mapGridHeight)
            game.level.mapGridHeight = game.level.backgroundHeight / game.gridSize;

        for (var y=0; y < game.level.mapGridHeight; y++)
        {
            game.currentMapTerrainGrid[y] = [];
        }

        game.fillGridWithFullTiles(mapObstructedTerrain);
    },
}
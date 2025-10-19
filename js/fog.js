var fog =
{
    update:0,
    updateLimit:1000,
    elapsedTime:0,

    init:function()
    {
    },

    setSubGrid:function(x, y, visionGrid, team, state, hidden)
    {
        if(team != game.team)
        {
            if(!state.firing)
                return;
        }

        if(hidden)
            return;

        if(!visionGrid)
            return;
            
        x = Math.floor(x);
        y = Math.floor(y);

        var gridY = y - Math.floor(visionGrid.length / 2);
        var gridX = x - Math.floor(visionGrid[0].length / 2);

        for (var y = 0; y < visionGrid.length; y++)
        {
            for (var x = 0; x < visionGrid[y].length; x++)
            {
                if(gridY + y < 0 || gridX + x < 0)
                    continue;

                if(gridY + y >= game.level.mapGridHeight || gridX + x >= game.level.mapGridWidth)
                    continue;

                if(game.currentFogGrid[gridY + y][gridX + x] == 1)
                    continue;
                
                game.currentFogGrid[gridY + y][gridX + x] = visionGrid[y][x];
            }
        }
    },

    draw:function()
    {
        var startTime = performance.now();
        renderer.drawFogOfWar();
        var endTime = performance.now();
        this.elapsedTime = this.elapsedTime + (endTime - startTime);        
    },

    reset:function()
    {
        for(var i = 0; i < renderer.fogOfWarPartialCellCount; i++)
        {
            renderer.fogOfWarPartialCellArray[i].visible = false;
        }
    },

    clean:function()
    {
        //if(game.currentFogGrid)
        //    return;
        
        var rowLimt = productionTileHeight + game.offsetYIndex;
        var colLimt = productionTileWidth + game.offsetXIndex;

        if(rowLimt > game.currentFogGrid.length)
            rowLimt = game.currentFogGrid.length;

        if(colLimt > game.currentFogGrid[0].length)
            colLimt = game.currentFogGrid[0].length;

        for(var rows = game.offsetYIndex; rows < rowLimt; rows++)
        {
            for(var cols = game.offsetXIndex; cols < colLimt; cols++)
            {
                if(game.currentFogGrid[rows][cols] == 0)
                    continue;

                if(game.currentFogGrid[rows][cols] == 1)
                    continue;

                if(game.currentFogGrid[rows][cols] == 5)
                {
                    var adjustedRows = rows + 1;
                    var adjustedCols = cols + 1;

                    if(adjustedRows == rowLimt)
                        continue;

                    if(adjustedCols == colLimt)
                        continue;

                    if(game.currentFogGrid[adjustedRows][cols] != 0)
                        game.currentFogGrid[rows][cols] = 8;

                    if(game.currentFogGrid[rows][adjustedCols] != 0)
                        game.currentFogGrid[rows][cols] = 9;
                }

                if(game.currentFogGrid[rows][cols] == 4)
                {
                    var adjustedRows = rows + 1;
                    var adjustedCols = cols - 1;

                    if(adjustedRows == rowLimt)
                        continue;

                    if(adjustedCols == -1)
                        continue;

                    if(game.currentFogGrid[adjustedRows][cols] != 0)
                        game.currentFogGrid[rows][cols] = 7;

                    if(game.currentFogGrid[rows][adjustedCols] != 0)
                        game.currentFogGrid[rows][cols] = 9;
                }

                if(game.currentFogGrid[rows][cols] == 3)
                {
                    if(rows - 1 >= 0 && game.currentFogGrid[rows - 1][cols] != 0)
                        game.currentFogGrid[rows][cols] = 8;

                    if(game.currentFogGrid[rows][cols + 1] != 0)
                        game.currentFogGrid[rows][cols] = 6;
                }

                if(game.currentFogGrid[rows][cols] == 2)
                {
                    if(rows - 1 >= 0 && game.currentFogGrid[rows - 1][cols] != 0)
                        game.currentFogGrid[rows][cols] = 7;

                    if(game.currentFogGrid[rows][cols - 1] != 0)
                        game.currentFogGrid[rows][cols] = 6;                    
                }

                if(game.currentFogGrid[rows][cols] == 9)
                {
                    var adjustedRows = rows + 1;

                    if(adjustedRows == rowLimt)
                        continue;

                    if(game.currentFogGrid[adjustedRows][cols] != 0)
                       game.currentFogGrid[rows][cols] = 1;
                }

                if(game.currentFogGrid[rows][cols] == 8)
                {
                    var adjustedCols = cols + 1;

                    if(adjustedCols == colLimt)
                        continue;

                    if(game.currentFogGrid[rows][adjustedCols] != 0)
                        game.currentFogGrid[rows][cols] = 1;
                }

                if(game.currentFogGrid[rows][cols] == 7)
                {
                    var adjustedCols = cols - 1;

                    if(adjustedCols == -1)
                        continue;

                    if(game.currentFogGrid[rows][adjustedCols] != 0)
                        game.currentFogGrid[rows][cols] = 1;
                }

                if(game.currentFogGrid[rows][cols] == 6)
                {
                    var adjustedRows = rows - 1;

                    if(adjustedRows == -1)
                        continue;

                    if(game.currentFogGrid[adjustedRows][cols] != 0)
                        game.currentFogGrid[rows][cols] = 1;
                }
            }
        }
    }
}
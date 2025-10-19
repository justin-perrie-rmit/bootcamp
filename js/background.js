var background =
{
    rotationXLimit:880,
    rotationYLimit:500,
    tileNames:[],
    renderTilesNames:[],
    width:0,
    height:0,
    numberOfHorizontalTiles:3,
    numberOfVerticalTiles:3,
    verticalSubTileY:44,
    verticalSubTileY:25,
    tileXindex:4,
    tileYindex:4,
    rotateXindex:0,
    rotateYindex:0,

    init:function(savedData = undefined)
    {
        if(this.tileNames.length > 0)
        {
            renderer.backgroundContainer.removeChildren();
            renderer.container.removeChildren();
            this.tileNames.length = 0;
        }

        this.width = savedData ? savedData.backgroundWidth : game.level.backgroundWidth;
        this.height = savedData ? savedData.backgroundHeight : game.level.backgroundHeight;

        if(game.level.numberOfHorizontalTiles < this.tileXindex)
            this.tileXindex = game.level.numberOfHorizontalTiles;

        if(game.level.numberOfVerticalTiles < this.tileYindex)    
            this.tileYindex = game.level.numberOfVerticalTiles;

        this.numberOfHorizontalTiles = game.level.numberOfHorizontalTiles;
        this.numberOfVerticalTiles = game.level.numberOfVerticalTiles;

        //this.numberOfHorizontalTiles = 3;
        //this.numberOfVerticalTiles = 3;

        this.startingTile = Math.floor(game.offsetYIndex / this.verticalSubTileY);

        if(!debug.production)
        {
            //this.startingTile = this.startingTile -1;
            this.startingTile = 8;
        }

        this.startingTile = this.startingTile * this.numberOfVerticalTiles;

        if(savedData)
        {
            this.setTilenames(savedData.mapImages);
        }
        else
        {
            this.setTilenames(game.level.mapImages);
        }
    },

    setTilenames:function(mapImages)
    {
        if(mapImages)
        {
            var index = 0;

            for(var i = 0; i < this.numberOfVerticalTiles; i++)
            {
                for(var j = 0; j < this.numberOfHorizontalTiles; j++)
                {
                    this.tileNames.push(mapImages + index + ".png");
    
                    index++;
                }   
            }

            var index = this.startingTile;
            this.renderTilesNames.push(index);
            this.renderTilesNames.push((index + 1));
            this.renderTilesNames.push((index + 2));

            index = index + this.numberOfVerticalTiles
            this.renderTilesNames.push(index);
            this.renderTilesNames.push((index + 1));
            this.renderTilesNames.push((index + 2));

            index = index + this.numberOfVerticalTiles
            this.renderTilesNames.push(index);
            this.renderTilesNames.push((index + 1));
            this.renderTilesNames.push((index + 2));
        }
    },

    moveDownY:function()
    {
        if(renderer.backgroundContainer.y == 0)
            return;

        if((renderer.backgroundContainer.y % 500) == 0)
        {
            this.tileYindex++;
            this.rotateYindex++;

            if(this.rotateYindex == 4)
            {
                this.rotateYindex = 0;
            }
        }
    },

    moveUpY:function()
    {
        if(renderer.backgroundContainer.y == 0)
            return;

        if((renderer.backgroundContainer.y % 500) == 0)
        {
            this.tileYindex--;
            this.rotateYindex--;

            if(this.rotateYindex == -1)
            {
                this.rotateYindex = 3;
            }
        }
    },

    moveRightX:function()
    {
        if(renderer.backgroundContainer.x == 0)
            return;

        if((renderer.backgroundContainer.x % 880) == 0)
        {
            this.tileXindex++;
            this.rotateXindex++;

            if(this.rotateXindex == 4)
            {
                this.rotateXindex = 0;
            }
        }
    },

    moveLeftX:function()
    {
        if(renderer.backgroundContainer.x == 0)
            return;

        if((renderer.backgroundContainer.x % 880) == 0)
        {
            this.tileXindex--;
            this.rotateXindex--;

            if(this.rotateXindex == -1)
            {
                this.rotateXindex = 3;
            }
        }
    }
}
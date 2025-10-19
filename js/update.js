var update =
{
    //uids:[],
    from:[],
    orders:undefined,

    gameState:function()
    {
        var updateNeeded = true;

        if(this.from)
        {
            for (var i = 0; i < this.from.length; i++)
            {
                var item = game.items[lookup.get(this.from[i].uid)];
    
                if(!item)
                {
                    console.log("missing game item");
                    continue;
                }            
    
                if(!((item.x == this.from[i].x) || (item.y == this.from[i].y) || (item.direction == this.from[i].direction) ||
                    (item.accelerationIndex = this.from[i].accelerationIndex)))
                {
                    console.log("A new update is needed");
                    updateNeeded = true;
                    break;
                }
            }
    
            while (this.from.length > 0 && updateNeeded)
            {
                var updates = this.from.shift();
    
                var item = game.items[lookup.get(updates.uid)];
    
                if(!item)
                {
                    continue;
                }
    
                item.x = updates.x;
                item.y = updates.y;
    
                item.sprite.x = item.x * game.gridSize - game.offsetX;
                item.sprite.y = item.y * game.gridSize - game.offsetY + display.maininterface.mapImageYOffset;
    
                item.direction = updates.direction;
    
                if(item.animationCount)
                    item.animationCount = updates.animationCount;
    
                if(item.animationSpeed)
                    item.animationSpeed = updates.animationSpeed;
    
                if(item.accelerationIndex)
                    item.accelerationIndex = updates.accelerationIndex;
            }
        }

        if(this.orders)
        {
            console.log(this.orders);
            console.log(this.uids);
            console.log(this);

            game.setSelectedItemIndexes(this.uids,this.orders);

            game.sortSelectedItems(game.selectedItemIndexes, this.orders);

            console.log(this.uids);

            game.sortForInfantryFirst(this.uids,this.orders);

            if(this.uids)
            {
                for (var i = 0; i < this.uids.length; i++)
                {   
                    var item = game.items[lookup.get(this.uids[i])];
    
                    console.log(item.type);
                }
            }
    
            game.processCommand(this.uids,this.orders);

            this.orders = undefined;
        }
    },

    setNewGameState(newData)
    {
        console.log("setNewGameState");
        console.log(newData.uids);
        this.uids = newData.uids;
        this.from = newData.from;
        this.orders = newData.orders;
    }
}
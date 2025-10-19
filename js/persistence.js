var persistence = 
{
    saveItemsData:undefined,
    
    save:function()
    {
        return;
        
        var offset = {};

        offset.backgroundOffsetX = renderer.backgroundContainer.x;
        offset.backgroundOffsetY = renderer.backgroundContainer.y;

        offset.panX = game.offsetX;
        offset.panY = game.offsetY;

        var items = [];
        var terrains = [];
        var thresholds = [];
        var triggers = [];

        this.saveItem(items);
        this.saveTerrains(terrains);
        this.saveThresholds(thresholds);
        this.saveTriggers(triggers);

        this.saveItemsData = {};
        
        this.saveItemsData.currentLevel = singleplayer.currentLevel;
        this.saveItemsData.backgroundWidth = background.width;
        this.saveItemsData.backgroundHeight = background.height;
        this.saveItemsData.items = JSON.stringify(items);
        this.saveItemsData.terrains = JSON.stringify(terrains);
        this.saveItemsData.thresholds = JSON.stringify(thresholds);
        this.saveItemsData.trigger_uids = JSON.stringify(triggers);
        this.saveItemsData.offset = JSON.stringify(offset);
        this.saveItemsData.mapImages = game.level.mapImages;
        this.saveItemsData.mapImage = game.level.mapImage;
        
        let cash = {};
        cash[game.team] = economy.cash;

        this.saveItemsData.cash = JSON.stringify(cash);

        console.log(this.saveItemsData);
    },

    load:function()
    {
        if(!this.saveItemsData)
            return undefined;

        var loadData = {};
        
        loadData.currentLevel = this.saveItemsData.currentLevel;
        loadData.backgroundWidth = this.saveItemsData.backgroundWidth;
        loadData.backgroundHeight = this.saveItemsData.backgroundHeight;
        loadData.items = JSON.parse(this.saveItemsData.items);
        loadData.terrains = JSON.parse(this.saveItemsData.terrains);
        loadData.thresholds = JSON.parse(this.saveItemsData.thresholds);
        loadData.trigger_uids = JSON.parse(this.saveItemsData.trigger_uids);
        loadData.offset = JSON.parse(this.saveItemsData.offset);
        loadData.mapImages = this.saveItemsData.mapImages;
        loadData.mapImage = this.saveItemsData.mapImage;
        loadData.cash = JSON.parse(this.saveItemsData.cash);

        console.log(loadData.items);

        singleplayer.currentLevel = loadData.currentLevel;

        return loadData;
    },

    saveItem:function(items)
    {
        for(var i = 0; i < game.items.length; i++)
        {
            if(game.items[i].type == 'terrain')
                continue;

            if(game.items[i].type == 'thresholds')
                continue;

            var item = {};

            item.uid = game.items[i].uid;
            item.name = game.items[i].name;
            item.type = game.items[i].type;
            item.x = game.items[i].x;
            item.y = game.items[i].y;
            item.spriteX = game.items[i].sprite.x;
            item.spriteY = game.items[i].sprite.y;
            item.direction = game.items[i].direction;
            item.animationDirection = game.items[i].animationDirection;
            item.hitPoints = game.items[i].hitPoints;

            if(game.items[i].orders)
            {
                item.orders = {};

                item.orders.type = game.items[i].orders.type;

                if(game.items[i].orders.from)
                {
                    item.orders.from = game.items[i].orders.from;
                }

                if(game.items[i].orders.to)
                {
                    item.orders.to = {};

                    item.orders.to.x = game.items[i].orders.to.x;
                    item.orders.to.y = game.items[i].orders.to.y;
                }

                if(game.items[i].orders.path)
                {
                    item.orders.path = game.items[i].orders.path;
                }
            }

            if(game.items[i].team)
            {
                item.team = game.items[i].team;
            }

            if(game.items[i].life)
            {
                item.life = game.items[i].life;
            }

            if(game.items[i].target)
            {
                item.targetUid = game.items[i].target.uid;
            }

            if(game.items[i].lastMovementX)
            {
                item.lastMovementX = game.items[i].lastMovementX;
            }

            if(game.items[i].lastMovementY)
            {
                item.lastMovementY = game.items[i].lastMovementY;
            }

            if(game.items[i].weaponType)
            {
                item.weaponType = game.items[i].weaponType;
            }

            if(game.items[i].bullet)
            {
                item.bullet = {};

                item.bullet.name = game.items[i].bullet.name;
				item.bullet.damage = game.items[i].bullet.damage;
				item.bullet.directions = game.items[i].bullet.directions;
				item.bullet.speed = game.items[i].bullet.speed;
				item.bullet.turnSpeed = game.items[i].bullet.turnSpeed;
				item.bullet.frames = game.items[i].bullet.frames;
				item.bullet.bulletFrames = game.items[i].bullet.bulletFrames;

                item.bullet.x = game.items[i].bullet.x;
                item.bullet.y = game.items[i].bullet.y;
                item.bullet.flyCount = game.items[i].bullet.flyCount;
                item.bullet.flyLimit = game.items[i].bullet.flyLimit;
                item.bullet.direction = game.items[i].bullet.direction;
                item.bullet.animationCount = game.items[i].bullet.animationCount;
            }

            if(game.items[i].box)
            {
                item.box = game.items[i].box;
            }

            if(game.items[i].bubble)
            {
                item.bubble = game.items[i].bubble;
            }

            items.push(item);
        }
    },

    saveTerrains:function(terrains)
    {
        for(var i = 0; i < game.items.length; i++)
        {
            if(game.items[i].type != 'terrain')
                continue;

            var terrain = {};

            terrain.uid = game.items[i].uid;
            terrain.name = game.items[i].name;
            terrain.type = game.items[i].type;
            terrain.x = game.items[i].x;
            terrain.y = game.items[i].y;
            terrain.spriteX = game.items[i].sprite.x;
            terrain.spriteY = game.items[i].sprite.y;

            terrains.push(terrain);
        }
    },

    saveThresholds:function(thresholds)
    {
        for(var i = 0; i < game.items.length; i++)
        {
            if(game.items[i].type != 'thresholds')
                continue;
            
            var threshold = {};

            threshold.uid = game.items[i].uid;
            threshold.name = game.items[i].name;
            threshold.type = game.items[i].type;
            threshold.x = game.items[i].x;
            threshold.y = game.items[i].y;
            threshold.spriteX = game.items[i].sprite.x;
            threshold.spriteY = game.items[i].sprite.y;

            thresholds.push(threshold);
        }
    },

    saveTriggers:function(trigger_uids)
    {
        for(var i = 0; i < triggers.activeTriggers.size; i++)
        {
            if(!triggers.activeTriggers.get(i).complete)
                continue;

            trigger_uids.push(triggers.activeTriggers.get(i).uid);
        }
    },
}
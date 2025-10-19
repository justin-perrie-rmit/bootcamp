var sidebar =
{
    "buttons":
    {
        "buildings":
        [
            {"name":"powerplant","x":896,"y":311,"active":false,"building":false,"deploy":false,"wait":true,"count":-1,"limit":240/10,"cost":250,"powerusage":0},
            {"name":"barracks","x":940,"y":311,"active":false,"building":false,"deploy":false,"wait":true,"count":-1,"limit":360/10,"cost":300,"powerusage":50},
            {"name":"factory","x":984,"y":311,"active":false,"building":false,"deploy":false,"wait":true,"count":-1,"limit":720/10,"cost":2000,"powerusage":250},
            {"name":"radar","x":896,"y":346,"active":false,"building":false,"deploy":false,"wait":true,"count":-1,"limit":480/10,"cost":1250,"powerusage":10},
            {"name":"airport","x":940,"y":346,"active":false,"building":false,"deploy":false,"wait":true,"count":-1,"limit":180/10,"cost":3000,"powerusage":350},
            {"name":"wind_capture","x":984,"y":346,"active":false,"building":false,"deploy":false,"wait":true,"count":-1,"limit":180/10,"cost":1250,"powerusage":0},
        ],
        "infantry":
        [
            {"name":"soldier","x":896,"y":381,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":120/1,"cost":10},
            {"name":"grenadier","x":940,"y":381,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":180/1,"cost":150},
            {"name":"rocketeer","x":984,"y":381,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":240/1,"cost":300},
        ],
        "vehicles":
        [
            {"name":"jeep","x":896,"y":451,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":360/10,"cost":400},
            {"name":"apc","x":940,"y":451,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":540/10,"cost":700},
            {"name":"tank","x":984,"y":451,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":720/10,"cost":1200},
            {"name":"rocket-truck","x":896,"y":486,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":840/10,"cost":1450},
            {"name":"prospector","x":940,"y":486,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":480/10,"cost":500},
            {"name":"blank","x":984,"y":486},
        ],
        "aircrafts":
        [
            {"name":"apache","x":896,"y":521,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":840/10,"cost":0},
            {"name":"jet","x":940,"y":521,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":480/5,"cost":500},
            {"name":"bomber","x":984,"y":521,"active":false,"building":false,"deploy":false,"wait":false,"count":-1,"limit":480/5,"cost":500}
        ],
        "specials":
        [
            {"name":"portable_power_generator","x":896,"y":451,"active":false,"building":false,"deploy":false,"wait":true,"count":-1,"limit":240/10,"cost":0},
            {"name":"ammo_crate","x":940,"y":451,"active":false,"cases":false,"deploy":false,"wait":true,"count":-1,"limit":240/10,"cost":0},
            {"name":"fuel_tank","x":984,"y":451,"active":false,"cases":false,"deploy":false,"wait":true,"count":-1,"limit":240/10,"cost":0},
        ]
    },

    originTypePointX:900,
    originTypePointY:311,

    originButtonPointX:1780,
    originButtonPointY:311,

    offsetX:44,
    offsetY:35,

    eventButtons:[],
    deployBuildings:[],

    buttonDelay:0,
    buttonLimit:4,

    buildingUid:undefined,
    near:undefined,

    init:function()
    {
        this.near = new QuadTree.Boundary();
    },

    buttonsActive:function(itemName, itemType)
    {
        renderer.assignSidebarButtons(game.level.sidebar, itemName, itemType);
    },

    assignButtonFunction:function(name, type, produce, button)
    {
        button.on('click', ()=> {
            if(button.done)
            {
                if(button.photo)
                {
                    mouse.specialPhoto = true;
                }
                else if(button.soil)
                {
                    mouse.specialSoil = true;
                }
                else
                {
                    mouse.placement = true;
                    game.deployBuilding = button.name;
                    game.deployBuildingProduce = button.produce;
                }
                
                button.count = 0;
                button.progressing = false;
                button.done = false;
                button.texture = renderer.buttonTexturesMap.get(name)[1];

                this.eventButtons.splice(button.eventIndex, 1);
            }
            else
            {
                if(button.progressing)
                    return;
                // console.log(name)
                // console.log(produce)
                // console.log(renderer.buttonTexturesMap.get(name));
                button.texture = renderer.buttonTexturesMap.get(name)[2];
    
                console.log(window);
                console.log(window[produce]);
                console.log(window[produce].list[name]);
                console.log(window[produce].list[name].powerUsage);

                if(name == "photo")
                    button.photo = true;

                if(name == "soil")
                    button.soil = true;
    
                if(!game.canAdd(window[produce].list[name].powerUsage))
                    return;
    
                if(!game.canBuy(window[produce].list[name].cost))
                    return;
    
                button.name = name;
                button.produce = produce;
                button.count = 0;
                button.limit = window[produce].list[name].limit;
                button.wait = window[produce].list[name].wait;
                button.progressing = true;

                this.buildingUid = mouse.clickedUid;
                
                this.eventButtons.push({"button": button});
            }
        });
    },

    update:function()
    {
        // if(this.eventButtons.length > 0)
        //     console.log("event is present")

        for(var i = this.eventButtons.length - 1; i >= 0; i--)
        {
            if(this.eventButtons[i].button.count == this.eventButtons[i].button.limit)
            {
                if(this.eventButtons[i].button.wait)
                {
                    this.eventButtons[i].button.done = true;
                    this.eventButtons[i].button.eventIndex = i;
                    this.eventButtons[i].button.texture =
                        renderer.buttonTexturesMap.get(this.eventButtons[i].button.name)[3];
                }
                else
                {
                    this.eventButtons[i].button.texture =
                        renderer.buttonTexturesMap.get(this.eventButtons[i].button.name)[1];

                    this.buildImmediately(this.eventButtons[i].button);

                    this.eventButtons.splice(i, 1);
                }

                continue;
            }

            this.eventButtons[i].button.count++; 
        }
    },

    buildImmediately:function(button)
    {
        console.log(game.primaryBarrack);

        if(game.primaryBarrack && game.primaryBarrack.produces.includes(button.name))
        {
            this.near.x = game.primaryBarrack.x * game.gridSize - 200;
			this.near.y = game.primaryBarrack.y * game.gridSize + display.maininterface.mapImageYOffset;
			this.near.w = this.near.x + 400;
			this.near.h = this.near.y + 150;

            var nearItems = physics.queryArmy(this.near);

            var validPosition = this.searchThroughDeployPosition(game.primaryBarrack, nearItems);

            if(validPosition)
            {
                button.progressing = false;
                button.done = false;

                mouse.train(mouse.clickedUid, button.name,
                    game.primaryBarrack.x,
                    game.primaryBarrack.y,
                    validPosition.x,
                    validPosition.y,
                    game.team);

                return;
            }
        }
        else if(game.primaryFactory && game.primaryFactory.produces.includes(button.name))
        {
            this.near.x = game.primaryFactory.x * game.gridSize - 200;
			this.near.y = game.primaryFactory.y * game.gridSize + display.maininterface.mapImageYOffset;
			this.near.w = this.near.x + 400;
			this.near.h = this.near.y + 400;

            var nearItems = physics.queryArmy(this.near);

            var validPosition = this.searchThroughDeployPosition(game.primaryFactory, nearItems);

            if(validPosition)
            {
                button.progressing = false;
                button.done = false;

                mouse.construct(mouse.clickedUid, button.name,
                    game.primaryFactory.x,
                    game.primaryFactory.y,
                    validPosition.x,
                    validPosition.y,
                    game.team,
                    game.primaryFactory.produce,
                    game.primaryFactory.defaultProduceFrame);

                return;
            }
            // for(var k = 0; k < game.primaryFactory.deployPosition.length; k++)
            // {
            //     var validConstruct = false;

            //     if(game.primaryFactory.deployPosition[k].uid == undefined)
            //     {
            //         validConstruct = true;
            //     }
            //     else
            //     {
            //         var item = game.items[lookup.get(game.primaryFactory.deployPosition[k].uid)];

            //         if(!item)
            //         {                                                
            //             validConstruct = true;
            //         }
            //         else
            //         {
            //             if(!(item.x == game.primaryFactory.x + game.primaryFactory.deployPosition[k].x &&
            //                 item.y == game.primaryFactory.y + game.primaryFactory.deployPosition[k].y - 
            //                 display.maininterface.mapImageYOffset / game.gridSize))
            //             {
            //                 validConstruct = true;
            //             }
            //         }
            //     }

            //     if(validConstruct)
            //     {
            //         button.progressing = false;
            //         button.done = false;

            //         mouse.construct(mouse.clickedUid, button.name,
            //             game.primaryFactory.x,
            //             game.primaryFactory.y,
            //             game.primaryFactory.deployPosition[k].x,
            //             game.primaryFactory.deployPosition[k].y,
            //             game.team,
            //             game.primaryFactory.produce,
            //             game.primaryFactory.defaultProduceFrame);

            //         return;
            //     }
            // }                                    
        }
        else if(game.primaryAirport && game.primaryAirport.produces.includes(button.name))
        {       
            var buildingIndex = lookup.get(this.buildingUid);

            if(window["aircrafts"].list[button.name].canLandOnHelipad)
            {
                console.log(game.items[buildingIndex].helipadDeployPosition);

                deployX = game.items[buildingIndex].helipadDeployPosition.x;
                deployY = game.items[buildingIndex].helipadDeployPosition.y;
                
                game.items[buildingIndex].helipadDeployPosition.uid = renderer.itemUID;
                
                mouse.assemble(mouse.clickedUid, button.name,
                    game.items[buildingIndex].x,
                    game.items[buildingIndex].y,
                    deployX,
                    deployY,
                    game.team,
                    game.items[buildingIndex].produce,
                    0);
            }
            else
            {
                var full = true;

                console.log(game.items[buildingIndex].hangerPositions);

                var k;

                for(k = 0; k < game.items[buildingIndex].hangerPositions.length; k++)
                {
                    if(game.items[buildingIndex].hangerPositions[k].uid == undefined)
                    {
                        full = false;
                        break;
                    }
                }
                
                if(full)
                {
                    game.showMessage("Airport is full, too many planes here!");
                }
                else
                {
                    deployX = game.items[buildingIndex].hangerPositions[k].x;
                    deployY = game.items[buildingIndex].hangerPositions[k].y;
                    deployUid = game.items[buildingIndex].uid;

                    game.items[buildingIndex].hangerPositions[k].uid = renderer.itemUID;
                    
                    mouse.assemble(mouse.clickedUid, button.name,
                        game.items[buildingIndex].x,
                        game.items[buildingIndex].y,
                        deployX,
                        deployY,
                        deployUid,
                        game.team,
                        game.items[buildingIndex].produce,
                        k);
                }
            }

            button.progressing = false;
            button.done = false;
        }

        // var buildingIndex = lookup.get(this.buildingUid);

        // if(game.items[buildingIndex].name == "airport")
        // {
        //     if(window["aircrafts"].list[this.buttons[i].name].canLandOnHelipad)
        //     {
        //         console.log(game.items[buildingIndex].helipadDeployPosition);

        //         deployX = game.items[buildingIndex].helipadDeployPosition.x;
        //         deployY = game.items[buildingIndex].helipadDeployPosition.y;

        //         game.items[buildingIndex].helipadDeployPosition.uid = renderer.itemUID;
                
        //         mouse.assemble(mouse.clickedUid, this.buttons[i].name,
        //             game.items[buildingIndex].x + deployX,
        //             game.items[buildingIndex].y + deployY,
        //             game.team,
        //             game.items[buildingIndex].produce,
        //             0);
        //     }
        //     else
        //     {
        //         var full = true;

        //         console.log(game.items[buildingIndex].hangerPositions);

        //         var k;

        //         for(k = 0; k < game.items[buildingIndex].hangerPositions.length; k++)
        //         {
        //             if(game.items[buildingIndex].hangerPositions[k].uid == undefined)
        //             {
        //                 full = false;
        //                 break;
        //             }
        //         }
                
        //         if(full)
        //         {
        //             game.showMessage("Airport is full, too many planes here!");
        //         }
        //         else
        //         {
        //             var deployX = 0;
        //             var deployY = 0;

        //             deployX = game.items[buildingIndex].hangerPositions[k].x;
        //             deployY = game.items[buildingIndex].hangerPositions[k].y;

        //             game.items[buildingIndex].hangerPositions[k].uid = renderer.itemUID;
                    
        //             mouse.assemble(mouse.clickedUid, this.buttons[i].name,
        //                 game.items[buildingIndex].x + deployX,
        //                 game.items[buildingIndex].y + deployY,
        //                 game.team,
        //                 game.items[buildingIndex].produce,
        //                 k);
        //         }
        //     }
        // }
    },

    // searchThroughDeployPosition:function()
    // {
    //     for(var k = 0; k < game.primaryBarrack.deployPosition.length; k++)
    //     {
    //         for(var l = 0; l < nearItems.length; l++)
    //         {
    //             if(game.primaryBarrack.x + game.primaryBarrack.deployPosition[k].x == nearItems[l].x / game.gridSize &&
    //                 game.primaryBarrack.y + game.primaryBarrack.deployPosition[k].y == nearItems[l].y / game.gridSize)
    //             {
    //                 // If true the outloop should continue to the next entry
    //                 // If all are false within inner loop
    //                 // I'm also a little concern about the / game.gridSize (20) 
    //                 // For example, game.primaryBarrack.x + game.primaryBarrack.deployPosition[k].x could be 43.5 which becomes 870
    //                 // game.primaryBarrack.y + game.primaryBarrack.deployPosition[k].y could be 18 which becomes 360
    //                 // is there any chance of rounding errors with this simple maths?
    //             }
    //         }
    //     }
    // },

    searchThroughDeployPosition: function(primaryItem, nearItems) 
    {
        const primaryItemX = primaryItem.x;
        const primaryItemY = primaryItem.y;

        console.log(nearItems);

        for (let k = 0; k < primaryItem.deployPosition.length; k++) 
        {
            const deployOffset = primaryItem.deployPosition[k];
            const deployPixelX = (primaryItemX + deployOffset.x) * game.gridSize;
            const deployPixelY = (primaryItemY + deployOffset.y) * game.gridSize - display.maininterface.mapImageYOffset;

            let isBlocked = false;

            for (let l = 0; l < nearItems.length; l++) 
            {
                const item = nearItems[l];
                if (!item) 
                    continue;

                //console.log(item.x, deployPixelX, item.y, deployPixelY);

                if (item.x == deployPixelX && item.y == deployPixelY) 
                {
                    isBlocked = true;
                    break;
                }
            }

            if (!isBlocked) 
            {
                // Found a valid position
                console.log("K: " + k);
                return { x: deployOffset.x, y: deployOffset.y };
            }
        }

        // No valid deploy position found
        return null;
    },

    deactiveAllButtons:function()
    {
        for(var i = 0; i < game.sidebarButtons.length; i++)
        {
            game.sidebarButtons[i].sprite.interactive = false;
            game.sidebarButtons[i].sprite.visible = false;
        }
    }
}
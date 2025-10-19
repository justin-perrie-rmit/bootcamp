var supplies =
{
	list:
	{
		"ammo_crate":
		{
			name:"ammo_crate",
			supplyType:"replenish",
			defaultProduceFrame:12,
			// Properties for drawing the object
			frames:1,
			pixelWidth:25,
            pixelHeight:4,
			baseWidth:25,
			baseHeight:25,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1],
				[1,1]
			],
			passableGrid:[
				[1,1],
				[1,1]
			],
			sight:3,
			vision:90,
			totalLife:25,
			hitPoints:25,
			cost:2000,
			limit:240,
			wait:true,
			done:false,
			powerOutput:0,
			powerUsage:0,
			animation:true,
            animationCount:1,
            animationLimit:2,
            animationSpeed:0,
            animationSpeedLimit:2,
            animationSlowSpeed:0,
            animationSlowSpeedLimit:30,
			spriteImages:[
				{name:"healthy",count:1},
				{name:"damaged",count:1},
			]
		},
		"fuel_tank":
		{
			name:"fuel_tank",
			supplyType:"refuel",
			defaultProduceFrame:12,
			// Properties for drawing the object
			frames:1,
			pixelWidth:25,
            pixelHeight:4,
			baseWidth:25,
			baseHeight:25,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1],
				[1,1]
			],
			passableGrid:[
				[1,1],
				[1,1]
			],
			sight:3,
			vision:90,
			totalLife:25,
			hitPoints:25,
			cost:2000,
			limit:240,
			wait:true,
			done:false,
			powerOutput:0,
			powerUsage:0,
			animation:true,
            animationCount:1,
            animationLimit:2,
            animationSpeed:0,
            animationSpeedLimit:2,
            animationSlowSpeed:0,
            animationSlowSpeedLimit:30,
			spriteImages:[
				{name:"healthy",count:1},
				{name:"damaged",count:1},
			]
		}
    },
    defaults:
	{
		type:"supplies",
		animationIndex:0,
		direction:0,
		reloadTimeLeft:0,
		cellCollisionMode:1000,
		coolDown:0,
		coolDownLimit:120,
		supply:{"bullet":0, "grenade": 0, "rocket":0, "shell": 0},
		supplyLimits:{"bullet":30, "grenade": 60, "rocket":180, "shell": 300},
		near:undefined,
		selectionRadius:1,
		selectionBorderShape:"rectangle",
		action:"stand",
		selected:false,
		drawTheLifeBar:false,
        selectable:true,

        outputTest:function()
        {

		},

		init:function()
		{
			this.near = new QuadTree.Boundary();

			var translateX = this.x * game.gridSize;
			var translateY = this.y * game.gridSize + 80;

			this.near.x = translateX - 200;
			this.near.y = translateY - 200;
			this.near.w = this.near.x + 400;
			this.near.h = this.near.y + 400;
		},

		processOrders:function()
		{
			switch (this.orders.type)
			{
				case "refuel":
					this.refuel();
					break;				
				case "replenish":
					this.replenish();
					break;
				case "stand":
					this.stand();
					break;
			}
		},

		update()
		{
		},

		replenish:function()
		{
			var amryFound = physics.queryArmy(this.near);

			if(!amryFound)
			{
				this.orders.type = "stand";
				return;
			}

			if(amryFound.length == 0)
			{
				this.orders.type = "stand";
				return;
			}
			
			if (amryFound && amryFound.length > 0)
			{
				for (var i = 0; i < amryFound.length; i++)
				{
					var item = game.items[lookup.get(amryFound[i].uid)];

					switch (item.weaponType)
					{
						case "bullet":
							if (this.supply.bullet % this.supplyLimits.bullet == 0)
							{
								item.ammo++;
								item.ammo = Math.min(item.ammo, item.ammoCapacity);
								console.log(item.ammo);
							}
							break;
						case "grenade":
							if (this.supply.grenade % this.supplyLimits.grenade == 0)
							{
								item.ammo++;
								item.ammo = Math.min(item.ammo, item.ammoCapacity);
								console.log(item.ammo);
							}
							break;
						case "rocket":
							if (this.supply.rocket % this.supplyLimits.rocket == 0)
							{
								item.ammo++;
								item.ammo = Math.min(item.ammo, item.ammoCapacity);
							}
							break;
						case "shell":
							if (this.supply.shell % this.supplyLimits.shell == 0)
							{
								item.ammo++;
								item.ammo = Math.min(item.ammo, item.ammoCapacity);
							}
							break;
						default:
							break;
					}
				}				
			}

			this.supply.bullet++;
			this.supply.grenade++;
			this.supply.rocket++;
			this.supply.shell++;
		},

		refuel:function()
		{
			var amryFound = physics.queryArmy(this.near);

			if(!amryFound)
			{
				this.orders.type = "stand";
				return;
			}

			if(amryFound.length == 0)
			{
				this.orders.type = "stand";
				return;
			}
			
			if (amryFound && amryFound.length > 0)
			{
				for (var i = 0; i < amryFound.length; i++)
				{
					var item = game.items[lookup.get(amryFound[i].uid)];

					if(item)
					{
						if(item.fuel != undefined)
						{
							item.fuel = item.fuel + 0.1;
							item.fuel = Math.min(item.fuel, item.fuelCapacity);
							console.log(item.fuel);
						}
					}
				}
			}
		},

		stand:function()
		{
			if(this.coolDown == this.coolDownLimit)
			{
				this.coolDown = 0;
				
				this.orders.type = this.supplyType;
				return;
			}

			this.coolDown++;
		},

		takeDamage:function(damage)
		{
			this.life = this.life - damage;

			this.lifeBarSprite.scale.set(1, 1);
			this.lifeBarSprite.scale.set(this.pixelWidth * this.life / this.hitPoints / 100, 4 / 100);

			this.destroyed();
		},

		destroyed:function()
		{
			if(this.isAlive && this.life <= 0)
			{
				this.isAlive = false; 

				if(this.bullet)
				{
                    renderer.removeBullet(this.bullet.sprite);
				}

				if(this.state)
					this.state.attacking = false;

				renderer.removeItem(this);

				for (var y = 0; y < this.passableGrid.length; y++)
				{
					for (var x = 0; x < this.passableGrid[y].length; x++)
					{
						if(this.passableGrid[y][x])
						{
							var gridY = Math.floor(this.y - this.passableGrid.length / 2) + y;
							var gridX = Math.floor(this.x - this.passableGrid[y].length / 2) + x;

							if(game.currentMapTerrainGrid && game.currentMapTerrainGrid.length != 0)
								game.currentMapTerrainGrid[gridY][gridX] = flags.CELL_COLLISION_MODE_OFF;

							if(game.currentTerrainMapPassableGrid && game.currentTerrainMapPassableGrid.length != 0)
								game.currentTerrainMapPassableGrid[gridY][gridX] = flags.CELL_COLLISION_MODE_OFF;

							if(game.currentMapIsleGrid && game.currentMapIsleGrid.length != 0)
								game.currentMapIsleGrid[gridY][gridX] = flags.CELL_COLLISION_MODE_OFF;
							
							if(game.currentIsleMapPassableGrid && game.currentIsleMapPassableGrid.length != 0)
								game.currentIsleMapPassableGrid[gridY][gridX] = flags.CELL_COLLISION_MODE_OFF;
						}
					}
				}
			}
		},

        draw:function()
        {
			this.animate();

			if(this.drawTheLifeBar)
				this.drawLifeBar();

			if (this.selected)
			{
				if(this.team == game.team)
					this.drawSelection();
			}

			if(game.radarTotal > 0)
				this.drawMiniMapMarker();
        },

		animate:function()
        {
			if(this.frames > 1)
			{
				

				if((this.animationSpeed % this.animationSpeedLimit) == 0)
				{
					if(this.animationCount < this.animationLimit)
					{	
						this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
							[this.animationCount];
	
						this.animationCount++;
					}
					else
					{
						this.animationCount = 0;
					}
				}
			}
            
            this.animationSpeed++;

			if(this.bullet)
				this.animateBullet();
        },

        drawSelection:function()
		{			
			this.selectionSprite.x = this.sprite.x;
			this.selectionSprite.y = this.sprite.y;
			this.selectionBorderSprite.x = this.sprite.x;
			this.selectionBorderSprite.y = this.sprite.y;
		},

		drawLifeBar:function()
		{				
			this.lifeBarSprite.x = this.sprite.x;
			this.lifeBarSprite.y = this.sprite.y - this.baseHeight / 2 - game.lifeBarHeight / 2;

			this.lifeBarBorderSprite.x = this.sprite.x;
			this.lifeBarBorderSprite.y = this.sprite.y - this.baseHeight / 2 - game.lifeBarHeight / 2;
		},

		drawMiniMapMarker:function()
		{	
			this.miniMapMarker.visible = true;

			if(minimap.zoomOut)
			{
				this.miniMapMarker.x = display.minimapScreen.x + 
					((this.sprite.x + game.offsetX) / 20) /
					game.level.mapGridWidth * 
			   		display.minimapScreen.dimension;

				this.miniMapMarker.y = display.minimapScreen.y + 
					((this.sprite.y - display.maininterface.mapImageYOffset + game.offsetY) / 20) / 
					game.level.mapGridHeight *
					display.minimapScreen.dimension;
			}
			else
			{
				this.miniMapMarker.x = display.minimapScreen.x +
					this.sprite.x / 
		   			display.gameplayScreen.width *
		   			display.minimapScreen.dimension;

				this.miniMapMarker.y = display.minimapScreen.y + 
					(this.sprite.y-display.maininterface.mapImageYOffset) / 
					display.gameplayScreen.height *
					display.minimapScreen.dimension;
			}			

			if(this.miniMapMarker.x < display.minimapScreen.x)
				this.miniMapMarker.visible = false;

			if(this.miniMapMarker.x > display.minimapScreen.x + display.minimapScreen.dimension + canvasWidthOffset)
				this.miniMapMarker.visible = false;

			if(this.miniMapMarker.y < display.minimapScreen.y)
				this.miniMapMarker.visible = false;

			if(this.miniMapMarker.y > display.minimapScreen.y + display.minimapScreen.dimension)
				this.miniMapMarker.visible = false;
		},

		animateBullet:function()
		{
			if(this.bullet.update)
				this.bullet.update();

			if(this.bullet.animate)
				this.bullet.animate();
		},

		select:function()
		{
			this.selected = true;
			this.drawTheLifeBar = true;

			this.selectionSprite.visible = true;
			this.selectionSprite.scale.set(this.baseWidth / 2, this.baseHeight / 2);

			this.selectionBorderSprite.visible = true;
			this.selectionBorderSprite.scale.set(this.baseWidth / 100, this.baseHeight / 100);
			
			this.lifeBarBorderSprite.visible = true;
			
			this.lifeBarSprite.visible = true;
			this.lifeBarSprite.scale.set(this.baseWidth * this.life / this.hitPoints / 100, 4 / 100);
		},

		unselect:function()
		{
			this.selected = false;

			this.selectionSprite.visible = false;
			this.selectionSprite.scale.set(1, 1);

			this.selectionBorderSprite.visible = false;
			this.lifeBarBorderSprite.visible = false;

			this.lifeBarSprite.visible = false;
			this.lifeBarSprite.scale.set(1, 1);
		}
    }
}
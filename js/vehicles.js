var vehicles =
{
	list:
	{
        "prospector":
		{
			name:"prospector",
			canAttack:false,
			canLoad:true,
			canExtract:true,
			pixelWidth:25,
			pixelHeight:25,
			pixelOffsetX:12,
			pixelOffsetY:12,
			collisionWidth:25,
			collisionHeight:25,
			radius:15,
			speed:6,
			nearVision:6,
			runningSpeed:2,
			slowSpeed:1.5,
			topSpeed:6,
			lowSpeed:8,
			hiSpeed:12,
			velocityThreshold:16,
			sight:3,
			vision:154,
			limit:480,
			wait:false,
			done:false,
			cost:500,
			resource:"none",
    	    hitPoints:50,
            turnSpeed:4,
			turnLimit:1,
			frames:16,
			direction:12,
			iconColor:0xB200FF,
			iconShape:"circle",
			directions:16,
			spriteImages:[
				{name:"stand",count:1,directions:frames}
			],
			passableGrid:[
				[1,1],
				[1,1]
			],
			visionGridX:5,
			visionGridY:5,
			visionGrid:undefined,
        },
        "jeep":
		{
			name:"jeep",
			canAttack:true,
			canExtract:false,
			canTargetLand:true,
			canTargetAir:false,
			weaponType:"bullet",
			soundType:"bullet2",
			pixelWidth:40,
			pixelHeight:40,
			pixelOffsetX:20,
			pixelOffsetY:20,
			collisionWidth:25,
			collisionHeight:40,
			radius:22,
			speed:6,
			nearVision:11,
			runningSpeed:6,
			slowSpeed:3,
			topSpeed:6,
			velocityThreshold:0,
			targetThreshold:0.1,
			weaponSpeed:20,	
			sight:8,
			vision:192,
			reloadTime:50,
			limit:360,
			wait:false,
			done:false,
			cost:400,
			ammoCapacity:100,
			ammo:undefined,
			fuelCapacity:100.0,
			fuelConsumption:0.05,
			fuel:undefined,
    	    hitPoints:100,
            turnSpeed:4,
			turnLimit:1,
			frames:16,
			direction:12,
			directions:16,
			iconColor:0xFFFF00,
			iconShape:"circle",
			collisionOffset:0.02,
			spriteImages:[
				{name:"stand",count:1,directions:frames}
			],
			passableGrid:[
				[1,1],
				[1,1]
			],
			buildableGrid:[
				[1,1],
				[1,1]
			],
			visionGridX:30,
			visionGridY:30,
			visionGrid:undefined,			
		},
		"apc":
		{
			name:"apc",
			canAttack:false,
			canExtract:false,
			canTargetLand:true,
			canTargetAir:false,
			loadable:true,
			weaponType:"bullet",
			pixelWidth:40,
			pixelHeight:40,
			pixelOffsetX:20,
			pixelOffsetY:20,
			collisionWidth:25,
			collisionHeight:40,
			radius:18,
			speed:6,
			runningSpeed:5,
			slowSpeed:3,
			topSpeed:6,
			velocityThreshold:3,
			sight:5,
			vision:192,
			limit:540,
			wait:false,
			done:false,
			cost:400,
    	    hitPoints:200,
            turnSpeed:3,
			turnLimit:1,
			frames:16,
			direction:12,
			directions:16,
			iconColor:0xFF00DC,
			iconShape:"circle",
			loadable:true,
			loadThreshold:64,
			transport:[],
			transportLimit:5,
			spriteImages:[
				{name:"stand",count:1,directions:frames}
			],
			passableGrid:[
				[1,1],
				[1,1]
			],
			visionGridX:8,
			visionGridY:8,
			visionGrid:undefined,	
        },
        "tank":
		{
			name:"tank",
			canAttack:true,
			canExtract:false,
			canTargetLand:true,
			canTargetAir:false,
			weaponType:"shell",
			soundType:"shell2",
			pixelWidth:48,
			pixelHeight:48,
			pixelOffsetX:24,
			pixelOffsetY:24,
			radius:22,
			sight:9,
			nearVision:16,
			speed:6, // 6
			runningSpeed:4,
			slowSpeed:1.5,
			topSpeed:6, // 6
			velocityThreshold:7,
			targetThreshold:0.1,
			weaponSpeed:24,	
			reloadTime:180,
			turnTime:60,
			limit:720,
			wait:false,
			done:false,
			cost:1200,
			ammoCapacity:300,
			ammo:undefined,
    	    hitPoints:1000,
            turnSpeed:4, // 4
			turnLimit:2,
			frames:16,
			direction:12,
			directions:16,
			iconColor:0x4CFF00,
			iconShape:"circle",
			collisionOffset:0.01,
			spriteImages:[
				{name:"stand",count:1,directions:frames}
			],
			passableGrid:[
				[1,1],
				[1,1]
			],
			buildableGrid:[
				[1,1],
				[1,1]
			],
			visionGridX:16,
			visionGridY:16,
			visionGrid:undefined,
		},
		"rocket-truck":
		{
			name:"rocket-truck",
			canAttack:true,
			canExtract:false,
			canTargetLand:true,
			canTargetAir:true,
			weaponType:"rocket",
			soundType:"heatseeker2",
			pixelWidth:40,
			pixelHeight:40,
			pixelOffsetX:20,
			pixelOffsetY:20,
			collisionWidth:25,
			collisionHeight:40,
			radius:22,
			sight:12,
			nearVision:19,
			speed:6,
			runningSpeed:3,
			slowSpeed:2.5,
			topSpeed:6,
			velocityThreshold:11,
			targetThreshold:0.1,
			weaponSpeed:20,
			vision:308,
			reloadTime:240,
			limit:840,
			wait:false,
			done:false,
			cost:400,
			ammoCapacity:400,
			ammo:undefined,
    	    hitPoints:100,
            turnSpeed:2,
			turnLimit:2,
			frames:16,
			direction:12,
			directions:16,
			iconColor:0x7F0037,
			iconShape:"circle",
			collisionOffset:0.01,
			spriteImages:[
				{name:"stand",count:1,directions:frames}
			],
			passableGrid:[
				[1,1],
				[1,1]
			],
			visionGridX:11,
			visionGridY:11,
			visionGrid:undefined,
        },
    },
    defaults:
	{
		animation:"stand",
		layer:"surface",
		orders:{type:"stand"},
		waitingOrders:{type:undefined},
		waitingTime:0,
		waitingTimeLimit:60,
		waitForThreshold:false,
		selected:false,
		selectable:true,
		hidden:false,
		inRange:false,
		target:undefined,
		targets:undefined,
		bullet:undefined,
		attackRange:0.75,
		exclusionRange:3,
		cellCollisionMode:100,
		scaleCollision:1,
		reloadTimeLeft:0,
		restingCount:0,
		adjustForSlowSpeed:1,
		collided:false,
		canTurnBack:false,
		detouring:false,
		isArmy:true,
		isNavy:false,
		isAirforce:false,
		accelerationIndex:0,
		accelerationFactor:[
				1.0, 0.99, 0.98, 0.97, 0.96, 0.95, 0.93, 0.91, 0.89, 0.85,
				0.82, 0.8, 0.87, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55,
				0.5, 0.48, 0.47, 0.46, 0.45, 0.44, 0.43, 0.42, 0.41, 0.3,0.1,
				0.01, 0.0],
		cosDirectionTable:[
			1, 0.9238795325112867, 0.7071067811865476, 0.38268343236508984,
			6.123233995736766e-17, -0.3826834323650897, -0.7071067811865475, -0.9238795325112867,
			-1, -0.923879532511287, -0.7071067811865477, -0.3826834323650895,
			-1.8369701987210297e-16, 0.38268343236509, 0.7071067811865474, 0.9238795325112868
		],		
		sinDirectionTable:[
			0, 0.3826834323650898, 0.7071067811865475, 0.9238795325112867,
			1, 0.9238795325112867, 0.7071067811865476, 0.3826834323650899,
			1.2246467991473532e-16, -0.3826834323650892, -0.7071067811865475, -0.9238795325112868,
			-1, -0.9238795325112866, -0.7071067811865477, -0.38268343236508956
		],  
		grid:undefined,
		start:[],
		end:[],
		path:[],
		distanceFromDestinationSquared:0,
		distanceFromTargetSquared:0,
		previousDistance:100,
		turnCount:0,
		beepCount:0,
		beepLimit:100,
		noPathCount:0,
		noPathLimit:6,
		selectionRadius:100,
		selectionBorderShape:"circle",
		uniqueCollision:new Set(),
		repellentCollisionFactor:0,
		repellentCollisionIndex:0,
		repellentCollisionLimit:2,
		nextMovementX:0,
		nextMovementY:0,
		previousDirection:0,
		hasCollided:false,
		hasCollidedSkin:false,
		hasCollidedStop:false,
		clockWiseTurn:false,
		movingTowardDestination:false,
		movingTowardDestinationColor:0x000000,
		nextStepCount:0,
		
        outputTest:function()
        {
			if(debug.vehiclesDebug)
				console.log(this.name);
			this.collisionCount = 0;
		},

		processOrders:function()
		{
			if(debug.logSync)
			{
				if(!(this.orders.type == "stand"))
					logs.silentLog("uid: " + this.uid + ", orders: " + this.orders.type);
			}

			switch (this.orders.type)
			{
				case "attack":
					this.attack(this.orders.to);
					break;
				case "attacking":
					this.attackingTo();
					break;
				case "firing":
					this.firing();
					break;
				case "fire":
					this.fire();
					break;
				case "attacked":
					this.attacked();
					break;
				case "assist":
					this.assist();
					break;
				case "extract":
					this.extract(this.orders.to);
					break;
				case "extractFromResource":
					this.extractFromResource();
					break;
				case "load":
					this.load(this.orders.to);
					break;
				case "unload":
					this.unload();
					break;
				case "move":
					this.move();
					break;
				case "moveTo":					
                    this.moveTo(this.orders.to);
					break;
				case "detourTo":					
                    this.detourTo();
					break;
				case "turning":
					this.turningTo();
					break;
				case "waitToTurn":
					this.waitToTurn();
					break;
				case "turningToFire":
					this.turningToFire();
					break;
				case "waitToTurnWhenFiring":
					this.waitToTurnWhenFiring();
					break;
				case "turningToStand":
					this.turningToStand();
					break;
				case "waitToTurnWhenStanding":
					this.waitToTurnWhenStanding();
					break;
				case "moving":
					this.movingTo(this.orders.to);
					break;
				case "waiting":
					this.waiting();
					break;
				case "standing":
					this.standing();
					break;
				case "stand":
					this.stand();
					break;
			}
		},

		update:function()
		{
			if(this.reloadTimeLeft > 0)
				this.reloadTimeLeft--;

			if(physics.skipQuadTreeUpdate)
				physics.skipQuadTreeUpdate = this.orders.type == "stand";

			if(debug.fogOfWar)
				fog.setSubGrid(this.x, this.y, this.visionGrid, this.team, this.state, this.hidden);
		},
		
		init()
		{
			this.pos = createVector2D(this.x, this.y);
			this.vel = createVector2D(0, 0);
			this.acc = createVector2D(0, 0);

			this.uniqueCollision = new Set();
			this.ammo = this.ammoCapacity;
			this.fuel = this.fuelCapacity;
		},

		attack:function(destination)
		{
			// Set a super state of attacking
			// Used for all attack states

			this.state.attacking = true;
			
			// Destionation holds a target's uid
			// and searches the target. This search only occurs
			// once and returns the same target for the
			// selection group
			if(destination && destination.target)
			{
				console.log("attack - this.uid: " + this.uid);
				
				this.target = target.searchForTarget(destination.target.uid);

				let position = {x:this.x, y:this.y};
				let next = {x:this.target.x, y:this.target.y};	
	
				// this.correctDirection = Math.round(findAngle(next,position,this.directions));

				this.correctDirection = Math.floor(findAngle(next,position,this.directions));

				this.clockWiseTurn = rotateShortDifference(this.direction, this.correctDirection, 0, this.directions) > 0 ? true : false;
			}
			
			this.orders.type = "moveTo";
		},

		attacked:function()
		{
			// Search for friendly vehicles,
			// currently at a wide range.

			if(this.state.retreating)
				return;

			var friendlyVehicle = findFriendlyVehicles(
				this.team,
				this.near);
								
			// var friendlyInfantry = findFriendlyInfantry(
			// 	this.team,
			// 	this.radius,
			// 	3,3,
			// 	this.x,
			// 	this.y);	

			if(friendlyVehicle)
			{
				for(var i = 0; i < friendlyVehicle.length; i++)
				{
					if(!friendlyVehicle[i].canAttack)
						continue;

					if(friendlyVehicle[i].state.attacking)
						continue;

					if(friendlyVehicle[i].target)
						continue;

					friendlyVehicle[i].orders.type = "assist";
					break;
				}
			}

			// if(friendlyInfantry)
			// {				
			// 	for(var i = 0; i < friendlyInfantry.length; i++)
			// 	{
			// 		if(friendlyInfantry[i].state.retreating)
			// 			continue;

			// 		if(!friendlyInfantry[i].canAttack)
			// 			continue;	

			// 		friendlyInfantry[i].orders.type = "assist";
			// 	}
			// }

			if(this.state.attacking)
				return;
			
			if(this.state.attacking != true)
			{	
				console.log("attacked - this.uid: " + this.uid);
				this.state.attacking = true;
				
				target.addItemToAttackedTarget(this.target.uid, this);

				let position = {x:this.x, y:this.y};
				let next = {x:this.target.x, y:this.target.y};	
	
				// this.correctDirection = Math.round(findAngle(next,position,this.directions));

				this.correctDirection = Math.floor(findAngle(next,position,this.directions));

				this.clockWiseTurn = rotateShortDifference(this.direction, this.correctDirection, 0, this.directions) > 0 ? true : false;
				
				this.orders.type = "moveTo";
			}				
		},

		assist:function()
		{
			// If no target, found targets

			if(this.state.attacking)
				return;

			if(!this.target)
			{
				var newTarget = findClosestGroundTarget(
					this,					
					this.team,
					this.near);
				
				// target may be undefined
				if(newTarget)
				{		
					console.log("assist - this.uid: " + this.uid);		
					this.orders.type = "moveTo";

					this.orders.to = {};

					this.state.attacking = true;

					this.target = newTarget;

					let position = {x:this.x, y:this.y};
					let next = {x:this.target.x, y:this.target.y};	
		
					// this.correctDirection = Math.round(findAngle(next,position,this.directions));

					this.correctDirection = Math.floor(findAngle(next,position,this.directions));

					this.clockWiseTurn = rotateShortDifference(this.direction, this.correctDirection, 0, this.directions) > 0 ? true : false;

					target.addItemToAttackedTarget(this.target.uid, this);
				}
			}
		},

		firing:function()
		{
			if(this.target == undefined)
			{
				if(debug.vehiclesDebug)
				{
					console.log("target is undefined");
					console.log(this.uid);
				}
				console.log("standing orders(3)");
				this.orders.type = "standing"; // Should these be standing
				this.attacking = false;
				// And if so, attacking should set to false
				return;
			}

			if(this.target.state.flying && this.canTargetAir)
			{
				if(this.reloadTimeLeft == 0)
				{
					if(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) < Math.pow(this.sight, 2))
					{						
						// Target is dead, resume aircraft stand
						if(this.target.life <= 0)
						{
							this.state.attacking = false;
						
							this.setNewTarget();
						}
						else
						{
							if(this.ammo > 0)
							{
								this.orders.type = "fire";
							}
						}	
					}
				}
			}
			else
			{
				// Wait for reload
				if(this.reloadTimeLeft == 0)
				{
					if(this.target.life <= 0)
					{
						this.state.attacking = false;
						
						this.setNewTarget();	
					}					
					else
					{
						console.log(this.ammo);
						if(this.ammo > 0)
						{
							this.orders.type = "fire";
						}
					}
				}
			}
		},

		fire:function()
		{		
			// Creates a unique bullet
			// No need to create the same
			// bullet serval times
			this.reloadTimeLeft = this.reloadTime;

			if(!this.bullet)
			{
				var bulletIndex = 0;

				var bulletLists = Object.keys(bullets.list);

				for(var i = 0; i < bulletLists.length; i++)
				{
					if(bulletLists[i] == this.weaponType)
					{
						bulletIndex = i;
						break;
					}
				}
				
				this.bullet = {};
				this.bullet.name = game.bullets[bulletIndex].name;
				this.bullet.produce = game.bullets[bulletIndex].produce;
				this.bullet.damage = game.bullets[bulletIndex].damage;
				this.bullet.directions = game.bullets[bulletIndex].directions;
				this.bullet.speed = game.bullets[bulletIndex].speed;
				this.bullet.turnSpeed = game.bullets[bulletIndex].turnSpeed;
				this.bullet.frames = game.bullets[bulletIndex].frames;
				this.bullet.bulletFrames = game.bullets[bulletIndex].bulletFrames;
				this.bullet.animationCount = game.bullets[bulletIndex].animationCount;
				this.bullet.drawSpeed = game.bullets[bulletIndex].drawSpeed;
				this.bullet.spin = game.bullets[bulletIndex].spin;
				this.bullet.aoe = game.bullets[bulletIndex].aoe;
				this.bullet.aoeLimit = game.bullets[bulletIndex].aoeLimit;
				this.bullet.suicide = game.bullets[bulletIndex].suicide;
			}	
			
			this.bullet.x = this.x;
			this.bullet.y = this.y;
			this.bullet.flyCount = 0;
			this.bullet.flyLimit = this.reloadTime || this.bullet.flyLimit;
			this.bullet.targetThreshold = this.targetThreshold || this.bullet.targetThreshold;
			this.bullet.speed = this.weaponSpeed || this.bullet.speed;
			this.bullet.direction = this.direction;
			this.bullet.animationCount = 0;
			this.bullet.attacker = this;
			this.bullet.target = this.target;

			renderer.produceBullet(this.bullet);

			this.bullet.update = window["bullets"].defaults.update;
			
			sounds.play(this.soundType);

			if(this.ammo > 0)
				this.ammo--;

			this.reloadTimeLeft = Math.floor(this.reloadTime * framerate.deltaMultiplierFactor) | 0;

			if(this.bullet.areaOfEffectRadius != undefined)
				this.bullet.targetPosition = {x:this.target.x, y:this.target.y};

			this.bullet.target = this.target;
			
			// Return to firing state for reload
			this.orders.type = "firing";
		},

		extract:function(destination)
		{
			if(!this.target)
				if(destination && destination.target)
					this.target = target.searchForTarget(destination.target.uid);

			console.log(this.target);

			if(!this.target.locked)
			{
				this.target.locked = this.uid;
				this.state.extracting = true;

				cells.remove(
					this.uid,
					game.currentTerrainMapPassableGrid,
					this.cellCollisionMode);
	
				this.orders.type = "moveTo";
			}
			else
			{
				this.orders.type = "stand";
			}
		},

		extractFromResource:function()
		{
			renderer.removeItem(this);

			var item  = {
				"name":"extractor", "type":"buildings", "team":this.team,
				"x":this.target.x,
				"y":this.target.y };

			if(this.team == game.team)
				economy[this.target.name + "ExtractorCount"]++;

			if(debug.vehiclesDebug)
				if(this.team == game.team)
				console.log(economy[this.target.name + "ExtractorCount"]);		
				
			console.log(this.target);

			renderer.removeAndFindResource(this.target);
			renderer.addItem(undefined, item);
		},

		load:function(destination)
		{
			// Target needs to be undefine if the previous
			// target is on the same side

			// Can happen capturing and attacking at the same time

			if(this.target == undefined)
			{
				if(destination && destination.target)
				{
					this.target = target.searchForTarget(destination.target.uid);

					if(debug.logInfantry)
						console.log('this.target.uid: ' + this.target.uid);
				}
			}

			if(this.target)
			{
				if(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) < this.target.loadThreshold)
				{
					if(this.target.loadable && this.target.transport.length < this.target.transportLimit)
					{
						this.removeVehicleFromTheCellTile();

						this.target.transport.push(this);
						this.sprite.visible = false;
						this.lifeBarSprite.visible = false;
						this.selectionSprite.visible = false;
						this.selectionBorderSprite.visible = false;
						this.lifeBarBorderSprite.visible = false;
						this.selectable = false;
						
						renderer.deleteItem(this);
					}

					this.orders.type = "stand"; // Needs to be stand

					return;
				}
				else
				{
					this.orders.type = "stand"; // Needs to be stand
				}
			}
			else
			{
				this.state.loading = false;
			}			
		},

		loading:function()
		{
			// if(this.path.length>1)
			// {
			// 	if(this.nextStep == undefined)
			// 		this.nextStep = {x:this.path[1].x+0.5,y:this.path[1].y+0.5};

			// 	var distanceFromDestinationSquared = Math.pow(this.x -
			// 		this.nextStep.x, 2) + Math.pow(this.y - this.nextStep.y, 2);

			// 	if(distanceFromDestinationSquared < Math.pow(this.radius/game.gridSize, 2))
			// 	{	
			// 		this.nextStep = {x:this.path[1].x+0.5,y:this.path[1].y+0.5};
			// 		this.path.shift();

			// 		if(this.path.length == 1)
			// 		{
			// 			if(this.target)
			// 				this.nextStep = {x:this.target.x,y:this.target.y};
			// 			else
			// 				this.nextStep = {x:this.path[0].x,y:this.path[0].y};
			// 		}
			// 	}
			// }

			console.log("loading");

			if(this.state.loading)
			{
				if(this.target)
				{
					if(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) < 0.01)
					{
						if(this.target.loadable && this.target.transport.length < this.target.transportLimit)
						{
							this.target.transport.push(this.name);
							renderer.removeItem(this);
						}

						this.orders.type = "standing";

						return;
					}
				}
				else
				{
					this.state.loading = false;
				}
			}			

			//this.moving();
		},

		unload:function()
		{
			if(this.transport.length > 0 &&
				Math.pow(Math.floor((mouse.x + game.offsetX * productionRatio) / game.gridSize) - this.x, 2) + 
				Math.pow(Math.floor((mouse.y + game.offsetY * productionRatio) / game.gridSize) - display.maininterface.mapImageYGridOffset - this.y, 2) < 
				this.loadThreshold)
			{
				var item = this.transport[0];

				item.sprite.visible = true;

				item.sprite.x = mouse.x;
				item.sprite.y = mouse.y;
				item.x = item.sprite.x / game.gridSize + (game.offsetX / game.gridSize);
				item.y = item.sprite.y / game.gridSize + (game.offsetY / game.gridSize) - display.maininterface.mapImageYGridOffset;

				cells.add(item.uid, item.x, item.y, item.radius / game.gridSize,
					game.currentTerrainMapPassableGrid,
					item.cellCollisionMode);

				item.selectable = true;
				item.target = undefined;

				game.items.push(item);
				this.transport.splice(0, 1);

				this.orders.type = "stand";
			}		
		},

		/**
		 * Starts the movement of the vehicle, ironically, no 
		 * movement is done.
		 * 
		 * Instead the vehicle removes its collision tile(s), 
		 * this needs to be done for whole platoon, before moving.
		 * 
		 * This prevents any vehicle getting trapped by their
		 * follow vehicles. 
		 */
		move:function()
		{
			var groupId = nav.addGroupIdToTracker(this.orders.to.id, this.orders.to.x, this.orders.to.y);

			if(groupId)
				this.orders.to.id = groupId;

			console.log(this.orders.to.id);

			this.orders.to.y = this.orders.to.y - display.maininterface.mapImageYOffset * productionRatio;

			this.orders.to.x = this.orders.to.x * productionInverseRatioX + game.offsetX;
			this.orders.to.y = this.orders.to.y * productionInverseRatio + game.offsetY;

			this.orders.to.x = this.orders.to.x / game.gridSize;
			this.orders.to.y = this.orders.to.y / game.gridSize;

			let gridX = Math.floor(this.orders.to.x);
			let gridY = Math.floor(this.orders.to.y);

			// Clamp to valid grid range
			gridY = Math.max(0, Math.min(gridY, game.currentTerrainMapPassableGrid.length - 1));
			gridX = Math.max(0, Math.min(gridX, game.currentTerrainMapPassableGrid[gridY].length - 1));

			// Now safe to access the grid
			if (game.currentTerrainMapPassableGrid[gridY][gridX] == flags.CELL_COLLISION_MODE_FULL)
			{
				this.orders.type = "stand";
				return;
			}
            
			nav.pathCounter = 0;

			this.nextStep = undefined;

			this.state.retreating = false;
			
			if(this.state.attacking)
			{
				if(!this.target)
					this.state.attacking = false;

				if(this.target && distance(this.x, this.y, this.orders.to.x, this.orders.to.y) > distance(this.x, this.y, this.target.x, this.target.y))
				{
					this.state.retreating = true;
				}

				if(this.state.attacking)
				{	
					cells.remove_tactical_grid(
						this.uid,
						game.currentTerrainMapPassableGrid,
						this.cellCollisionMode);
				}
			}

			this.target = undefined;

			this.state.attacking = false;
			this.state.extracting = false;
			// Reset surrounding
			this.surrounding = false;

			console.log("vehicles move");

			this.orders.type = "moveTo";
		},

		moveTo:function(destination)
		{
			console.log("vehicles moveTo");
			if(debug.logMultiplayerStats)
			{
				console.log("%cstarting stats",
				'background: #000; color: #6cbf27');

				console.log("this.uid: " + this.uid);
				console.log("this.type: " + this.type);
				console.log("this.name: " + this.name);
				console.log("this.team: " + this.team);
				console.log("this.x: " + this.x + ", " + this.y);
				console.log("this.spriteX: " + this.sprite.x + ", " + this.sprite.y);
				console.log("this.direction: " + this.direction);
				console.log("this.accelerationIndex: " + this.accelerationIndex);

				console.log("%cend starting stats",
				'background: #000; color: #6cbf27');
			}

			this.scaleCollision = 1;

			if(this.state.attacking)
			{
				if(!this.target)
				{
					console.log("return to stand");
					this.orders.type = "standing";
					return;
				}

				this.scaleCollision = 0.5;
			}

			cells.remove(
				this.uid,
				game.currentTerrainMapPassableGrid,
				this.cellCollisionMode);

			this.start[0] = Math.floor(this.x);
			this.start[1] = Math.floor(this.y);

			//nav.deleteMarkers(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);

			this.path = undefined;
			this.nextStep = undefined;
			this.previousDistance = 100;

			// If a vehicle is moving only, no
			// target will be available, but a
			// desination will be available

			// If a vehicle is attacking, a
			// target will be available, but may
			// needed to transferred to destination

			if(!destination)
			{
				var destination = {};
				
				if(this.target)
				{
					destination.x = this.target.x;
					destination.y = this.target.y;
					destination.target = this.target;			
				}				
			}
			else
			{
				if(this.target)
				{
					destination.x = this.target.x;
					destination.y = this.target.y;
					destination.target = this.target;		
				}
			}

			if(destination.x)
			{
				if(game.mode != "multiplayer")
                {
					// if(!(this.state.attacking || this.state.extracting))
					//  	this.spreadDestination(destination);
				}

				this.end[0] = Math.floor(destination.x);
				this.end[1] = Math.floor(destination.y);
			}

			this.grid = [...game.currentTerrainMapPassableGrid];

			// if vehicle is outside bounds, just fly straight towards goal
			if (this.start[1]<0||this.start[1]>=game.level.mapGridHeight||this.start[0]<0||this.start[0]>=game.level.mapGridWidth)
			{
			   newDirection = findAngle(destination,this,this.directions);
			}
			else
			{
				var path;

				if(this.state.attacking || this.state.extracting)
				{	
					var itemCollisionGrid = determineCollisionGrid(this);
					var targetCollisionGrid = determineCollisionGrid(this.target);

					var item_current_tiles = cells.take_snapshot(
						this.x,
						this.y,
						itemCollisionGrid,
						this.grid);

					var target_current_tiles = cells.take_snapshot(
						this.target.x,
						this.target.y,
						targetCollisionGrid,
						this.grid);

					path = Tactical_AStar(this.uid,this.grid,this.end,this.start,heuristic.euclidean,this.cellCollisionMode);

					cells.restore_snapshot(
						this.target.x,
						this.target.y,
						targetCollisionGrid,
						this.grid,
						target_current_tiles);

					cells.restore_snapshot(
						this.x,
						this.y,
						itemCollisionGrid,
						this.grid,
						item_current_tiles);
				}
				else
				{
					path = Tactical_AStar(this.uid,this.grid,this.end,this.start,heuristic.euclidean,this.cellCollisionMode);
				}
				
				if(path)
				{
					if(path.length == 0)
					{	
						console.log("Zero Path, uid: " + this.uid);
							
						this.zeroPath();
					}
					else if(path.length > 0)
					{
						this.onPath(path);
					}
				}
				else
				{
					this.noPath();
				}			
			}
		},

		detourTo:function()
		{
			var keepMoving = true;

			if(!path)
			{
				this.noPath();
				return;
			}

			for(var i = 0; i < this.path.length; i++)
			{
				console.log(this.path[i].y + " " + this.path[i].x);

				if(this.grid[this.path[i].y][this.path[i].x] == flags.CELL_COLLISION_MODE_MEDIUM)
				{
					keepMoving = false;
				}
			}

			if(keepMoving)
			{
				this.orders.type = "moving";
				return;
			}

			this.start[0] = Math.floor(this.x);
			this.start[1] = Math.floor(this.y);

			if (this.start[1]<0||this.start[1]>=game.level.mapGridHeight||this.start[0]<0||this.start[0]>=game.level.mapGridWidth)
			{
			   newDirection = findAngle(destination,this,this.directions);
			}
			else
			{
				var path;

				if(this.state.attacking || this.state.extracting)
				{	
					var itemCollisionGrid = determineCollisionGrid(this);
					var targetCollisionGrid = determineCollisionGrid(this.target);

					var item_current_tiles = cells.take_snapshot(
						this.x,
						this.y,
						itemCollisionGrid,
						this.grid);

					var target_current_tiles = cells.take_snapshot(
						this.target.x,
						this.target.y,
						targetCollisionGrid,
						this.grid);

					path = Tactical_AStar(this.uid,this.grid,this.end,this.start,heuristic.euclidean,this.cellCollisionMode);

					cells.restore_snapshot(
						this.target.x,
						this.target.y,
						targetCollisionGrid,
						this.grid,
						target_current_tiles);

					cells.restore_snapshot(
						this.x,
						this.y,
						itemCollisionGrid,
						this.grid,
						item_current_tiles);
				}
				else
				{
					path = Tactical_AStar(this.uid,this.grid,this.end,this.start,heuristic.euclidean,this.cellCollisionMode);
					
					game.showMessage("New Path")
				}
				
				if(path)
				{
					if(path.length == 0)
					{	
						console.log("Zero Path, uid: " + this.uid);
							
						this.zeroPath();
					}
					else if(path.length > 0)
					{
						this.onPath(path);
					}
				}
				else
				{
					this.noPath();
				}			
			}
		},

		/**
		 * Turns to the correction direction to start along
		 * the path.
		 */
		turningTo:function()
		{
			if(Math.floor(this.direction) == this.correctDirection)
			{
				this.orders.type = "moving";

				//if(this.state.attacking)
				// 	this.setTacticalCoordinates(this.path, this.target.x, this.target.y, this.sight);
			}				
			else
			{
				if(this.clockWiseTurn)
					this.direction++;
				else
					this.direction--;
					
				this.direction = wrapDirection(this.direction,this.directions);

				this.turnTime = 3;
				this.orders.type = "waitToTurn";
			}
		},

		waitToTurn:function()
		{
			if(this.turnTime == 0)
			{
				this.orders.type = "turning";
				return;
			}

			this.turnTime--;
		},

		turningToFire:function()
		{
			if(Math.floor(this.direction) == this.correctDirection)
			{
				this.orders.type = "firing";
			}				
			else
			{
				if(this.clockWiseTurn)
					this.direction++;
				else
					this.direction--;
					
				this.direction = wrapDirection(this.direction,this.directions);

				this.turnTime = 3;
				this.orders.type = "waitToTurnWhenFiring";
			}
		},

		waitToTurnWhenFiring:function()
		{
			if(this.turnTime == 0)
			{
				this.orders.type = "turningToFire";
				return;
			}

			this.turnTime--;
		},

		turningToStand:function()
		{
			if(Math.floor(this.direction) == this.correctDirection)
			{
				this.direction = Math.floor(this.direction);
				this.orders.type = "standing";
			}				
			else
			{
				if(this.clockWiseTurn)
					this.direction++;
				else
					this.direction--;
					
				this.direction = wrapDirection(this.direction,this.directions);

				this.turnTime = 3;
				this.orders.type = "waitToTurnWhenStanding";
			}
		},

		waitToTurnWhenStanding:function()
		{
			if(this.turnTime == 0)
			{
				this.orders.type = "turningToStand";
				return;
			}

			this.turnTime--;
		},

		/**
		 * The actual movement of the vehicle and that follows
		 * the pre-determined path.
		 */
		movingTo:function()
		{
			if(this.path.length>1)
			{
				if(this.nextStep == undefined)
					this.nextStep = createVector2D(
						this.path[1].x+0.5, this.path[1].y+0.5);

				this.distanceFromDestinationSquared = Math.pow(this.x -
					this.nextStep.x, 2) + Math.pow(this.y - this.nextStep.y, 2);

				if(this.distanceFromDestinationSquared < Math.pow(this.radius/game.gridSize, 2))
				{
					this.speed = this.topSpeed;
					this.nextStep = createVector2D(
						this.path[1].x+0.5, this.path[1].y+0.5);
					//nav.deleteMarker(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);
					this.path.shift();
					this.fuel = this.fuel - this.fuelConsumption;
					this.fuel = Math.max(0, this.fuel);
				}
            }
			else if(this.path.length>0)
			{
				/*	Vehicle keeps to the last step, once reached it 
					removes the last step and ends.
				*/
				if(!this.orders.to)
				{
					this.orders.to = {};
					this.orders.to.x = this.end[0];
					this.orders.to.y = this.end[1];
					this.state.attacking = false;
					this.orders.type = "standing";
					return;	
				}

				this.distanceFromDestinationSquared = Math.pow(this.x -
					this.orders.to.x, 2) + Math.pow(this.y - this.orders.to.y, 2);
					
				if(this.distanceFromDestinationSquared < Math.pow(this.radius/(game.gridSize), 2))
				{	
					//nav.deleteMarker(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);
					this.path.shift();
					this.fuel = this.fuel - this.fuelConsumption;
					this.fuel = Math.max(0, this.fuel);
				}

				/*	Sometimes vehicles can't find the exact point to stand.
					As in they stand over it, with a slow turn speed,
					vehicles will spin.

					The following if statement avoids that, by recording
					the previous distances, and once the distance is greater
					than the previous distance, the vehicle have to stop.

					The last step is removed.
				*/
				if(this.distanceFromDestinationSquared > this.previousDistance)
				{
					//nav.deleteMarker(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);
					this.path.shift();
					this.fuel = this.fuel - this.fuelConsumption;
					this.fuel = Math.max(0, this.fuel);
				}
				else
				{
					this.previousDistance = this.distanceFromDestinationSquared;
				}

				var start = [];
				start[0] = Math.floor(this.x);
				start[1] = Math.floor(this.y);
			}
			else
			{
				// Returns the previousDistance to a large number, a reset.
				var debugPreviousDistance = this.previousDistance;
				this.previousDistance = 100;

				if(this.state.extracting)
				{
					this.orders.type = "extractFromResource";
				}
				else
				{
					// Vehicle stops here
					if(debug.logMultiplayerStats)
					{
						console.log("vehicle stop here: " + this.uid);
						console.log("debugPreviousDistance: " + debugPreviousDistance);
						console.log(this.x + " " + this.y);
					}
					this.state.attacking = false;
					
					this.correctDirection = Math.floor(nav.getGlobalDirection(this.orders.to.id, this.direction));

					this.clockWiseTurn = rotateShortDifference(
						this.direction, this.correctDirection , 0, this.directions) > 0 ? true : false;

					this.orders.type = "turningToStand";
				}

				return false;
			}
			
			// Once close enough to target, stop and attack
			if(this.state.attacking)
			{				
				if(this.target)
				{					
					if(this.target.life <= 0)
					{
						this.setNewTarget();
					}

					if(this.target)
					{
						// In range to fire, standing first, add to grid, then fire!
						if(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) < Math.pow(this.sight, 2))
						{	
							if(game.currentTerrainMapPassableGrid[Math.floor(this.y)][Math.floor(this.x)] != flags.CELL_COLLISION_MODE_FULL)
							{
								cells.remove_tactical_grid(
									this.uid,
									 game.currentTerrainMapPassableGrid,
									 this.cellCollisionMode);
	
								this.state.attacking = true;
								console.log("standing orders(2)");
								this.orders.type = "standing";
								return;	
							}
						}
					}
				}
				else
				{
					// If no target
					this.state.attacking = false;
					this.orders.type = "standing";
					return;	
				}
			}

			this.moving();
		},

		moving:function()
		{
			if(this.fuel <= 0.1)
			{
				this.orders.type = "standing";
				return;
			}

			if(this.waitForThreshold)
				return;

			if(this.nextStep == undefined)
			{
				this.orders.type = "standing";
				return;
			}
				
			var newDirection = findAngle(this.nextStep,this,this.directions);
			var difference = angleDiff(this.direction,newDirection,this.directions);
			var turnAmount = this.turnSpeed*game.turnSpeedAdjustmentFactor;
			var movement = (this.speed * this.accelerationFactor[this.accelerationIndex]) *
				game.speedAdjustmentFactor;	
				
			var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI ;
			this.nextMovementX = -(movement*Math.sin(angleRadians));
			this.nextMovementY = -(movement*Math.cos(angleRadians));
			this.previousDirection = this.direction;

			// Update the drawing of the sprite
            this.sprite.x = (this.sprite.x +(this.nextMovementX
                * game.gridSize));
            this.sprite.y = (this.sprite.y +(this.nextMovementY
				* game.gridSize));

			this.lastMovementX = this.x;	
			this.lastMovementY = this.y;

			// Update the real coordinates of the sprite
            this.x = (this.x +this.nextMovementX);
			this.y = (this.y +this.nextMovementY);

			this.movingTowardDestination = moveTowardDestination(this.x, this.y, this.lastMovementX, this.lastMovementY, this.end[0], this.end[1]);

			if(this.movingTowardDestination)
			{
				this.movingTowardDestinationColor = 0x00FF00;
			}
			else
			{
				this.movingTowardDestinationColor = 0xFFFF00;
			}

			if(debug.logSync)
			{
				// logs.silentLog("vehicles uid: " + this.uid + ", x: " + this.x + ", y:" +  this.y + ", newDirection: " + newDirection +
				// 				", difference: " + difference + ", turnAmount: " + turnAmount + ", movement: " + movement +
				// 				", angleRadians: " + angleRadians);
			}

			//this.checkForThresholds();
			this.turnCount++;

			if (Math.abs(difference)>turnAmount && (this.turnCount) > this.turnLimit)
			{
				this.turnCount = 0;
				this.direction = wrapDirection(this.direction+turnAmount*Math.abs(difference)/difference,this.directions);	
			}

			this.steering();

			return true;
		},

		applyForce:function(force)
		{
			this.acc.add(force);
		},		

		steering:function()
		{	
			this.hasCollided = false;
			this.hasCollidedSkin = false;
			this.hasCollidedStop = false;

			var t0 = performance.now();
			itemsFound = physics.queryArmy(this.near);
			var t1 = performance.now();
			renderer.updatePassByMsCount(t1 - t0);

			if(itemsFound && itemsFound.length > 0)
			{	
				var nearByItems = [];

				for(var i = 0; i < itemsFound.length; i++)
				{
					if(itemsFound[i].uid == this.uid)
						continue;

					nearByItems.push(game.items[lookup.get(itemsFound[i].uid)]);
				}

				var collidedBodyItems = physics.detect(this, nearByItems, "vision", "bumper");
				var collidedSkinItems = physics.detect(this, nearByItems, "skin", "skin");

				for(var j = 0; j < collidedBodyItems.length; j++)
				{
					this.hasCollided = true;
					
					if(this.state.attacking)
					{
						if(isMoving(this) && isMoving(collidedBodyItems[j]))
						{						
							if(findFurthestItem(this, collidedBodyItems[j]))
							{
								this.stop();
							}
						}
					}
					else
					{							
						if(isMoving(this) && isMoving(collidedBodyItems[j]))
						{						
							if(findFurthestItem(this, collidedBodyItems[j]))
								this.stop();
						}
					}
				}

				for(var i = 0; i < collidedSkinItems.length; i++)
				{					
					if(this.orders.to)
					{
						if(collidedSkinItems[i].orders.to)
						{
							if(this.orders.to.id == collidedSkinItems[i].orders.to.id &&
								collidedSkinItems[i].orders.type == "stand" ||
								collidedSkinItems[i].orders.type == "standing" ||
								collidedSkinItems[i].orders.type == "turningToStand")
							{
								this.state.attacking = false;

								this.correctDirection = Math.floor(nav.getGlobalDirection(this.orders.to.id, this.direction));

								this.clockWiseTurn = rotateShortDifference(
									this.direction, this.correctDirection , 0, this.directions) > 0 ? true : false;

								this.orders.type = "turningToStand";
								
								if(debug.logMultiplayerStats)
								{
									console.log("change to stand via another vehicle: " + this.uid);
									console.log(this.x + " " + this.y);
								}

								return;
							}
						}
					}
					else
					{
						this.state.attacking = false;
						this.orders.type = "standing";
						return;
					}
				}				
			}

			this.velocity();
		},

		checkForThresholds:function()
		{
			for(var i = 0; i < game.items.length; i++)
			{
				if(game.items[i] && game.items[i].type != "thresholds")
					continue;

				if(game.items[i] && game.items[i].collide(this, this.x * game.gridSize, this.y * game.gridSize, this.radius))
				{
					// this.sprite.x = (this.sprite.x - ((this.nextMovementX)
					// 	* game.gridSize));
					// this.sprite.y = (this.sprite.y - ((this.nextMovementY)
					// 	* game.gridSize));
				
					// // Update the real coordinates of the sprite
					// this.x = (this.x - this.nextMovementX);
					// this.y = (this.y - this.nextMovementY);
				}
			}
		},

		// Not implemented, but may used as a wait and resume
		resting:function()
		{
			if(this.restingCount == 120)
			{
				this.orders.type = "stand";
				this.restingCount = 0;
			}

			this.restingCount++
		},

		wait:function()
		{
			console.log("wait");
			this.accelerationIndex = this.accelerationFactor.length - 2;
		},

		/**
		 * Once the first vehicle has reached the destination,
		 * the whole platoon stops.
		 * 
		 * Additionally, the vehicle will occupy a series of 
		 * collision cells and the sets then on.
		 * 
		 * This is true for the whole platoon. 
		 */
		standing:function()
		{
			// Add the cells to the grid
			cells.add(this.uid, this.x,this.y,this.radius / game.gridSize,
				game.currentTerrainMapPassableGrid,
				this.cellCollisionMode);

			if(this.orders.to && this.orders.to.id)
				nav.removeItemFromGroup(this.orders.to.id);

			//if(nav.multiType)
			//	nav.deleteMarker(game.currentTerrainMapPassableGrid, this.path);

			if(debug.logSync)
			{
				logs.silentLog("vehicles standing: " + this.x + " " +  this.y + " " + this.uid)
				logs.syncLog("vehicles standing: " + this.x + " " +  this.y + " " + this.uid);
			}

			this.previousDistance = 100;
			this.lastMovementX = undefined;
			this.lastMovementY = undefined;

			//cells.set(game.currentTerrainMapPassableGrid);

			if(this.state.attacking)
			{
				if(this.target)
				{
					if(this.target.life > 0)
					{
						let position = {x:this.x, y:this.y};
						let next = {x:this.target.x, y:this.target.y};	
			
						// if(game.mode == "multiplayer")
                		// {
						// 	this.order.type = "standing";
						// }
						// else
						// {
							this.correctDirection = Math.floor(findAngle(next,position,this.directions));

							this.clockWiseTurn = rotateShortDifference(this.direction, this.correctDirection, 0, this.directions) > 0 ? true : false;
	
							this.orders.type = "turningToFire";
						//}
					}
					else
					{
						this.target = undefined;
						this.orders.type = "stand";
					}
				}
			}
			else
			{
				cells.remove_tactical_grid(
					this.uid,
					game.currentTerrainMapPassableGrid,
					this.cellCollisionMode);

				//nav.toDestinationTracker.delete(this.orders.to);
				console.log("change to stand: " + this.uid);
				// Resume to original stand state				
				this.orders.type = "stand";
			}
		},

		/**
		 * Default state of the vehicle
		 * 
		 * Shouldn't do anything
		 */
		stand:function()
		{
				
		},

		noPath:function()
		{
			console.log("%cNo Path",
				'background: #000; color: #dcbf27');

			if(this.state.attacking)
			{
				console.log("%cAttacking",
				'background: #000; color: #dcbf27');
				console.log("No Path target...");
				console.log(this.target);
				console.log(this.uid);
			}

			if(this.noPathCount == this.noPathLimit)
			{
				this.state.attacking = false;
				this.target = undefined;
				this.standing();
				return;
			}

			this.noPathCount++;

			this.waitingOrders.type = "moveTo";
			this.orders.type = "waiting";
			console.log("noPathCount: " + this.noPathCount);
		},

		zeroPath:function()
		{
			console.log("%cZero Path",
				'background: #000; color: #dcbf27');

			if(this.state.attacking)
			{
				console.log("%cAttacking",
				'background: #000; color: #dcbf27');
				console.log("target...");
				console.log(this.target);
			}
		},

		onPath:function(path)
		{
			console.log("vehicles onPath");
			if(this.state.attacking)
			{
				console.log("%cAttacking",
				'background: #000; color: #00ff27');
				console.log("onPath");
				console.log(this.uid);
			}

			this.noPathCount = 0;

			if(this.state.attacking)
			 	this.setTacticalCoordinates(path, this.target.x, this.target.y, this.sight);
			// else
			//  	this.setPlacementCoordinates(path, this.end[0], this.end[1], 1);

			this.path = path;

			//if(nav.multiType)
			//{
			//	console.log("path length: " + path.length);
				//nav.createMarkers(this.cellCollisionMode, game.currentTerrainMapPassableGrid, path);
			//}

			if (!this.lastMovementX)
			{	
				let position = {x:this.x, y:this.y};
				let next = undefined;

				if(!this.target)
				{
					if(this.path.length > 8)
					{
						next = {x:this.path[8].x, y:this.path[8].y};
					}
					else
					{
						next = {x:this.end[0], y:this.end[1]};
					}

					// this.correctDirection = Math.round(findAngle(next,position,this.directions));

					this.correctDirection = Math.floor(findAngle(next,position,this.directions));

					this.clockWiseTurn = rotateShortDifference(this.direction, this.correctDirection, 0, this.directions) > 0 ? true : false;
				}
	
				
			 	this.orders.type = "turning";
			}
			else
			{
				this.orders.type = "moving";
			}
		},

		waiting:function()
		{
			if(this.waitingTime == this.waitingTimeLimit)
			{
				this.waitingTime = 0;
				this.orders.type = this.waitingOrders.type;
			}

			this.waitingTime++;
		},

		passBy:function(slowerItems)
		{
			// Updates the grid
			// Takes a snapshot of the current vehicles position
			// and excludes them, assisting the A* search

			var path = undefined;							
			//this.start[0] = Math.floor(this.nextStep.x);
			//this.start[1] = Math.floor(this.nextStep.y);
			
			this.start[0] = Math.floor(this.x);
			this.start[1] = Math.floor(this.y);

			//this.grid = $.extend([],game.currentTerrainMapPassableGrid);
			this.grid = [...game.currentTerrainMapPassableGrid];

			if(this.state.attacking)
			{	
				cells.remove_tactical_grid(
					this.uid,
					game.currentTerrainMapPassableGrid,
					this.cellCollisionMode);

				console.log("creating tactical path");
				var itemCollisionGrid = determineCollisionGrid(this);
				var targetCollisionGrid = determineCollisionGrid(this.target);

				var item_current_tiles = cells.take_snapshot(
					this.x,
					this.y,
					itemCollisionGrid,
					this.grid);

				var target_current_tiles = cells.take_snapshot(
					this.target.x,
					this.target.y,
					targetCollisionGrid,
					this.grid);

				//for(var i = 0; i < slowerItems.length; i++)
				for(var i = 0; i < game.items.length; i++)
				{
					//if(isMoving(slowerItems[i]))
					//{
						// cells.add(slowerItems[i].uid, slowerItems[i].x, slowerItems[i].y,
						// 	slowerItems[i].radius / game.gridSize,
						// 	game.currentTerrainMapPassableGrid,
						// 	slowerItems[i].cellCollisionMode);
					//}

					cells.add(game.items[i].uid, game.items[i].x, game.items[i].y,
							game.items[i].radius / game.gridSize,
							game.currentTerrainMapPassableGrid,
							game.items[i].cellCollisionMode);
				}

				var coords_current_tiles = cells.take_coords_snapshot(this.start,this.end,this.grid);

				var t0 = performance.now();

				path = Tactical_AStar(this.uid,this.grid,this.end,this.start,heuristic.euclidean,this.cellCollisionMode);

				var t1 = performance.now();

				cells.restore_coords_snapshot(coords_current_tiles,this.grid);

				//for(var i = 0; i < slowerItems.length; i++)
				for(var i = 0; i < game.items.length; i++)
				{
					//if(isMoving(slowerItems[i]))
					//{
						// cells.remove(
						// 	slowerItems[i].uid,
						// 	game.currentTerrainMapPassableGrid,
						// 	slowerItems[i].cellCollisionMode);
					//}

					cells.remove(
						game.items[i].uid,
						game.currentTerrainMapPassableGrid,
						game.items[i].cellCollisionMode);
				}

				cells.restore_snapshot(
					this.target.x,
					this.target.y,
					targetCollisionGrid,
					this.grid,
					target_current_tiles);
				cells.restore_snapshot(
					this.x,
					this.y,
					itemCollisionGrid,
					this.grid,
					item_current_tiles);
			}
			else
			{
				if(debug.drawStats)
				{
					debug.passByCount++;

					renderer.updatePassByCount(debug.passByCount);
				}

				if(slowerItems.length > 0)
				{
					console.log(slowerItems);
				}

				for(var i = 0; i < slowerItems.length; i++)
				{
					if(isMoving(slowerItems[i]))
					{
						cells.add(slowerItems[i].uid, slowerItems[i].x, slowerItems[i].y,
							this.radius / game.gridSize,
							game.currentTerrainMapPassableGrid,
							slowerItems[i].cellCollisionMode);
					}
				}

				var t0 = performance.now();
				path = Tactical_AStar(this.uid,this.grid,this.end,this.start,heuristic.euclidean,this.cellCollisionMode);
				var t1 = performance.now();

				for(var i = 0; i < slowerItems.length; i++)
				{
					if(isMoving(slowerItems[i]))
					{
						cells.remove(
							slowerItems[i].uid,
							game.currentTerrainMapPassableGrid,
							slowerItems[i].cellCollisionMode);
					}
				}
			}

			if(path)
			{
				if(path.length > 1)
				{
					path.splice(0, 1);
					//console.log("new path");
					this.onPath(path);
				}
			}
		},

		accelerate:function()
		{
			if(this.accelerationIndex > 0)
				this.accelerationIndex--;
		},

		decelerate:function()
		{
			if(this.accelerationIndex < this.accelerationFactor.length - 2)
				this.accelerationIndex++;
		},

		velocity:function()
		{
			if(this.accelerationIndex == this.velocityThreshold)
				return;

			if(this.accelerationIndex < this.velocityThreshold)
				this.accelerationIndex++;

				if(this.accelerationIndex > this.velocityThreshold)
				this.accelerationIndex--;	
		},

		stop:function()
		{
			this.accelerationIndex = this.accelerationFactor.length - 1;
			this.movingTowardDestinationColor = 0xFF0000;
		},

		fullSpeed:function()
		{
			this.accelerationIndex = 0;
		},

		setTacticalCoordinates:function(path, targetX, targetY, sight)
		{
			if(!path)
				return;
			path.reverse();
			var pathIndex = 0;
			while(Math.pow(targetX - path[pathIndex].x, 2) + Math.pow(targetY - path[pathIndex].y, 2)
				< Math.pow(sight, 2))
			{
				pathIndex++;
				if(pathIndex == path.length)
					return;
			}
			cells.remove_tactical_grid(
				this.uid, game.currentTerrainMapPassableGrid, this.cellCollisionMode
			);
			
			cells.add_tactical_grid(
				this.uid, 
				pathIndex, path, this.radius / game.gridSize,
				game.currentTerrainMapPassableGrid,
				this.cellCollisionMode);

			//cells.tactical_set(game.currentTerrainMapPassableGrid);
			path.reverse();
		},

		spreadDestination:function(destination)
		{
			var newDestination = {};

			newDestination.acc = createVector2D();
			newDestination.vel = createVector2D();

			var endX = 0;
			var endY = 0;

			var orginalDestionationX = destination.x;
			var orginalDestionationY = destination.y;

			newDestination.pos = createVector2D(destination.x, destination.y);
			newDestination.acc.mult(0);
			newDestination.vel.mult(0);
			newDestination.vel = Vector.random2D();

			var norm = generate.normalise(
				generate.randomNumber(generate.seed), generate.seed);

			newDestination.vel.setMag(norm + 1); 

			newDestination.pos.add(newDestination.vel);
			newDestination.vel.add(newDestination.acc);

			destination.x = newDestination.pos.x;
			destination.y = newDestination.pos.y;

			endX = Math.floor(destination.x);
			endY = Math.floor(destination.y);

			if(endX < 0 || endY < 0)
			{
				destination.x = orginalDestionationX;
				destination.y = orginalDestionationY;
				
				return;
			}

			if(game.currentTerrainMapPassableGrid[endY][endX] == flags.CELL_COLLISION_MODE_FULL)
			{
				destination.x = orginalDestionationX;
				destination.y = orginalDestionationY;
				
				return;
			}

			if(game.currentTerrainMapPassableGrid[endY][endX] > flags.CELL_COLLISION_MODE_SOFT)
			{
				destination.x = orginalDestionationX;
				destination.y = orginalDestionationY;
				
				return;
			}
		},

		setPlacementCoordinates:function(path, targetX, targetY, sight)
		{
			if(!path)
				return;
			path.reverse();
			var pathIndex = 0;

			while(this.grid[path[pathIndex].y][path[pathIndex].x] != 0)
			{
				pathIndex++;
			}

			path.splice(0, pathIndex);

			cells.remove_tactical_grid(
				this.uid, this.grid, this.cellCollisionMode
			);
			
			cells.add_tactical_grid(
				this.uid, 
				pathIndex, path, this.radius / game.gridSize,
				this.grid,
				this.cellCollisionMode);

			//cells.tactical_set(game.currentTerrainMapPassableGrid);
			path.reverse();
		},

		createPolygon()
		{
			this.body = new Array(8);
			this.skin = new Array(8);
			this.vision = new Array(8);
			this.bumper = new Array(8);
			this.near = new QuadTree.Boundary();
		},

		animate:function()
        {	
			// if(this.orders.type == "stand")
			// 	return;

			if(this.direction == undefined)
				console.log("this.direction is undefined");
			this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
				[wrapDirection(Math.round(this.direction),this.directions)];

			if(this.bullet)
				this.animateBullet();
			
			var tempTexture = renderer.texturesMap.get(this.team + "_" + this.name)[0];
			//var angle = wrapDirection(Math.round(this.direction),this.directions) * 22.5 * Math.PI / 180;
			
			var cosAngle = this.cosDirectionTable[wrapDirection(Math.round(this.direction),this.directions)];
			var sinAngle = this.sinDirectionTable[wrapDirection(Math.round(this.direction),this.directions)];

			var translateX = this.x * game.gridSize;
			var translateY = this.y * game.gridSize + display.maininterface.mapImageYOffset;

			var textureWidthHalf = tempTexture.width / 2;
			var textureHeightHalf = tempTexture.height / 2;

			var textureWidth = tempTexture.width / 2;
			var textureHeight = tempTexture.height / 2;

			var textureWidthFull = tempTexture.width / 2 * this.nearVision;
			var textureHeightFull = tempTexture.height / 2 * this.nearVision;

			this.body[0] = (-textureWidthHalf * cosAngle) - (-textureHeightHalf * sinAngle) + translateX;
			this.body[1] = (-textureWidthHalf * sinAngle) + (-textureHeightHalf * cosAngle) + translateY;
			this.body[2] = (+textureWidthHalf * cosAngle) - (-textureHeightHalf * sinAngle) + translateX;
			this.body[3] = (+textureWidthHalf * sinAngle) + (-textureHeightHalf * cosAngle) + translateY; 
			this.body[4] = (+textureWidthHalf * cosAngle) - (+textureHeightHalf * sinAngle) + translateX;
			this.body[4] = (+textureWidthHalf * cosAngle) - (+textureHeightHalf * sinAngle) + translateX;
			this.body[5] = (+textureWidthHalf * sinAngle) + (+textureHeightHalf * cosAngle) + translateY;
			this.body[6] = (-textureWidthHalf * cosAngle) - (+textureHeightHalf * sinAngle) + translateX;
			this.body[7] = (-textureWidthHalf * sinAngle) + (+textureHeightHalf * cosAngle) + translateY;

			this.skin[0] = (-textureWidth * cosAngle * 1.25) - (-textureHeight * sinAngle * 1.25) + translateX;
			this.skin[1] = (-textureWidth * sinAngle * 1.25) + (-textureHeight * cosAngle * 1.25) + translateY;
			this.skin[2] = (+textureWidth * cosAngle * 1.25) - (-textureHeight * sinAngle * 1.25) + translateX;
			this.skin[3] = (+textureWidth * sinAngle * 1.25) + (-textureHeight * cosAngle * 1.25) + translateY; 
			this.skin[4] = (+textureWidth * cosAngle * 1.25) - (+textureHeight * sinAngle * 1.25) + translateX;
			this.skin[5] = (+textureWidth * sinAngle * 1.25) + (+textureHeight * cosAngle * 1.25) + translateY;
			this.skin[6] = (-textureWidth * cosAngle * 1.25) - (+textureHeight * sinAngle * 1.25) + translateX;
			this.skin[7] = (-textureWidth * sinAngle * 1.25) + (+textureHeight * cosAngle * 1.25) + translateY;

			this.vision[0] = ((-tempTexture.width - 10) / 2 * cosAngle * 1.05) - ((-tempTexture.height - 40) / 2 * sinAngle) + translateX;
			this.vision[1] = ((-tempTexture.width - 10) / 2 * sinAngle * 1.05) + ((-tempTexture.height - 40) / 2 * cosAngle) + translateY;
			this.vision[2] = ((+tempTexture.width + 10) / 2 * cosAngle * 1.05) - ((-tempTexture.height - 40) / 2 * sinAngle) + translateX;
			this.vision[3] = ((+tempTexture.width + 10) / 2 * sinAngle * 1.05) + ((-tempTexture.height - 40) / 2 * cosAngle) + translateY; 
			this.vision[4] = ((+tempTexture.width + 10) / 2 * cosAngle * 1.05) - ((+tempTexture.height - 80) / 2 * sinAngle) + translateX;
			this.vision[5] = ((+tempTexture.width + 10) / 2 * sinAngle * 1.05) + ((+tempTexture.height - 80) / 2 * cosAngle) + translateY; 
			this.vision[6] = ((-tempTexture.width - 10) / 2 * cosAngle * 1.05) - ((+tempTexture.height - 80) / 2 * sinAngle) + translateX;
			this.vision[7] = ((-tempTexture.width - 10) / 2 * sinAngle * 1.05) + ((+tempTexture.height - 80) / 2 * cosAngle) + translateY;

			this.bumper[0] = ((-tempTexture.width - 10) / 2 * cosAngle * 1.05) - ((-tempTexture.height + 10) / 2 * sinAngle) + translateX;
			this.bumper[1] = ((-tempTexture.width - 10) / 2 * sinAngle * 1.05) + ((-tempTexture.height + 10) / 2 * cosAngle) + translateY;
			this.bumper[2] = ((+tempTexture.width + 10) / 2 * cosAngle * 1.05) - ((-tempTexture.height + 10) / 2 * sinAngle) + translateX;
			this.bumper[3] = ((+tempTexture.width + 10) / 2 * sinAngle * 1.05) + ((-tempTexture.height + 10) / 2 * cosAngle) + translateY; 
			this.bumper[4] = ((+tempTexture.width + 10) / 2 * cosAngle * 1.05) - ((+tempTexture.height + 20) / 2 * sinAngle) + translateX;
			this.bumper[5] = ((+tempTexture.width + 10) / 2 * sinAngle * 1.05) + ((+tempTexture.height + 20) / 2 * cosAngle) + translateY; 
			this.bumper[6] = ((-tempTexture.width - 10) / 2 * cosAngle * 1.05) - ((+tempTexture.height + 20) / 2 * sinAngle) + translateX;
			this.bumper[7] = ((-tempTexture.width - 10) / 2 * sinAngle * 1.05) + ((+tempTexture.height + 20) / 2 * cosAngle) + translateY;

			this.near.x = translateX - 200;
			this.near.y = translateY - 200;
			this.near.w = this.near.x + 400;
			this.near.h = this.near.y + 400;
			
			this.bodyCollision.clear();
			this.skinCollision.clear();
			this.visionCollision.clear();
			this.bumperCollision.clear();
			this.nearCollision.clear();

			if(keyboard.collisionDebug)
			{	
				if(this.hasCollided)
				{
					this.bodyCollision.lineStyle(1, 0xFFFF00, 1);
					this.skinCollision.lineStyle(1, 0xFF0000, 1);
					this.visionCollision.lineStyle(1, 0xB200FF, 1);
					this.bumperCollision.lineStyle(1, 0xB2FF00, 1);
					this.nearCollision.lineStyle(1, 0x00B2FF, 1);
				}
				else
				{
					this.bodyCollision.lineStyle(1, 0x00FF00, 1);
					this.skinCollision.lineStyle(1, 0x0000FF, 1);
					this.visionCollision.lineStyle(1, 0xFF00B2, 1);
					this.bumperCollision.lineStyle(1, 0xFFB200, 1);
					this.nearCollision.lineStyle(1, 0x00FFB2, 1);
				}

				renderer.drawPolygon(this.bodyCollision, this.body, game.offsetX, game.offsetY);
				renderer.drawPolygon(this.skinCollision, this.skin, game.offsetX, game.offsetY);
				renderer.drawPolygon(this.visionCollision, this.vision, game.offsetX, game.offsetY);
				renderer.drawPolygon(this.bumperCollision, this.bumper, game.offsetX, game.offsetY);
			}
		},
		
		animateBullet:function()
		{
			if(this.bullet.update)
				this.bullet.update();

			if(this.bullet.animate)
				this.bullet.animate();
		},

		removeVehicleFromTheCellTile()
		{
			cells.remove(
				this.uid,
				game.currentTerrainMapPassableGrid,
				this.cellCollisionMode);
		},

		determineDistanceFromTarget:function(targetX, targetY)
		{
			this.distanceFromTargetSquared = Math.pow(this.x - targetX, 2)
				+ Math.pow(this.y - targetY, 2);
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

				cells.remove(
					this.uid,
					game.currentTerrainMapPassableGrid,
					this.cellCollisionMode);

				cells.remove_tactical_grid(
					this.uid,
					game.currentTerrainMapPassableGrid,
					this.cellCollisionMode
				);
			}
		},

		setNewTarget:function()
		{
			cells.remove_tactical_grid(
				this.uid,
				game.currentTerrainMapPassableGrid,
				this.cellCollisionMode);

			var newTarget = findClosestGroundTarget(
				this,
				this.team,
				this.near);
			
			if(newTarget)
			{			
				console.log("new target found: " + newTarget.uid);
				this.orders.type = "moveTo";
				this.state.attacking = true;
				this.target = newTarget;
				return;
			}
		},
		
		draw:function()
		{	
			if(!(this.waitForThreshold))
				this.animate();

			if (this.selected)
			{
				this.drawSelection();
				this.drawLifeBar();
				this.drawPath();
				this.drawEndLine();
			}

			if(game.cncDisplay)
			{
				this.drawIcon();
			}

			if(game.radarTotal > 0)
				this.drawMiniMapMarker();
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
			this.lifeBarSprite.y = this.sprite.y - game.lifeBarHeight;

			this.lifeBarBorderSprite.x = this.sprite.x;
			this.lifeBarBorderSprite.y = this.sprite.y - game.lifeBarHeight;
		},	
		
		drawIcon:function()
		{
			this.iconSprite.x = this.sprite.x;
			this.iconSprite.y = this.sprite.y;

			var angle = (wrapDirection(invertDirection(Math.round(this.direction), this.directions),this.directions) * 22.5 * Math.PI / 180);
			
			this.iconDirectionSprite.x = this.sprite.x;
			this.iconDirectionSprite.y = this.sprite.y;
			this.iconDirectionSprite.rotation = angle;
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

		drawPath:function()
		{
			this.pathLine.clear();

			if(this.path && this.path.length > 0)
			{				
				this.pathLine.moveTo(this.sprite.x, this.sprite.y);

				for(var i = 0; i < this.path.length; i++)
				{
					this.pathLine.lineStyle(2, 0xFFFFFF)
						.lineTo((this.path[i].x * 20 - game.offsetX) + 0.5, (this.path[i].y * 20 + 80 - game.offsetY) + 0.5);
				}
			}
		},

		drawEndLine:function()
		{
			this.endLine.clear();

			if(this.end)
			{				
				this.endLine.moveTo(this.sprite.x, this.sprite.y);
				this.endLine.lineStyle(2, this.movingTowardDestinationColor)
					.lineTo((this.end[0] * 20 - game.offsetX) + 0.5, (this.end[1] * 20 + 80 - game.offsetY) + 0.5);
			}
		},

		select:function()
		{
			this.selected = true;

			this.selectionSprite.visible = true;
			this.selectionSprite.scale.set(this.radius / 100, this.radius  / 100);

			this.selectionBorderSprite.visible = true;

			this.lifeBarBorderSprite.visible = true;

			this.lifeBarSprite.visible = true;
			this.lifeBarSprite.scale.set(this.pixelWidth * this.life / this.hitPoints / 100, 4 / 100);

			renderer.cncText.text = "Name: " + toTitleCase(this.name) + "\n";
			renderer.cncText.text = renderer.cncText.text + "Life: " + this.life + "\n";
			renderer.cncText.text = renderer.cncText.text + "Ammo: " + this.ammo;
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
		},

		push(item)
		{
			allocator.setFirst("vehicles");
			allocator.setLast("vehicles");

			game.items.push(item);
		},

		remove:function(item)
		{

		}
    }
}
var ships =
{
	list:
	{
		"aircraft-carrier":
		{
			name:"aircraft carrier",
			// Properties for drawing the object
            frames:1,
            pixelWidth:69,
			pixelHeight:59,
			baseWidth:69,
			baseHeight:69,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			sight:3,
    	    totalLife:500,
			cost:5000,
			spriteImages:[
				{name:"healthy",count:1}
			],
			visionGridX:11,
			visionGridY:11,
			visionGrid:undefined,
			layer:"surface",
        },
        "battle-cruiser":
		{
			name:"battle-cruiser",
			// Properties for drawing the object
            frames:1,
            pixelWidth:69,
			pixelHeight:59,
			baseWidth:69,
			baseHeight:69,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			sight:3,
    	    totalLife:500,
			cost:5000,
			spriteImages:[
				{name:"healthy",count:1}
			],
			visionGridX:11,
			visionGridY:11,
			visionGrid:undefined,
			layer:"surface",
        },
        "destroyer":
		{
			name:"destroyer",
			// Properties for drawing the object
			radius:70,
            frames:8,
            pixelWidth:69,
			pixelHeight:59,
			baseWidth:69,
			baseHeight:69,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			sight:3,
    	    totalLife:500,
			cost:5000,
			spriteImages:[
				{name:"healthy",count:1}
			],
			visionGridX:11,
			visionGridY:11,
			visionGrid:undefined,
			layer:"surface",
        },
        "submarine":
		{
			name:"submarine",
			// Properties for drawing the object
			radius:15,
            frames:1,
            pixelWidth:69,
			pixelHeight:59,
			baseWidth:69,
			baseHeight:69,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
    	    totalLife:500,
			cost:5000,
			spriteImages:[
				{name:"healthy",count:1}
			],
			visionGridX:11,
			visionGridY:11,
			visionGrid:undefined,
			layer:"submerge",
        },
		"future-battle-ship":
		{
			name:"future-battle-ship",
			canAttack:true,
			// Properties for drawing the object
			hitPoints:100,
			directions:8,
			radius:120,
			speed:2,
            frames:8,
			turnSpeed:8,
			sight:30,
			reloadTime:520,
			targetThreshold:0.1,
			weaponSpeed:12,	
			directionMultipiler:0,
			velocityThreshold:0,
			weaponType:"rocket",
			soundType:"heatseeker2",
			layer:2,
			turnLimit:3,
			iconColor:0xFFFF00,
			iconShape:"circle",
			lockedWayPoint:[],
            pixelWidth:69,
			pixelHeight:59,
			baseWidth:69,
			baseHeight:69,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[]
			],
    	    totalLife:500,
			cost:5000,
			spriteImages:[
				{name:"healthy",count:1}
			],
			visionGridX:52,
			visionGridY:52,
			visionGrid:undefined,
			layer:"surface",
        },
		"future-submarine":
		{
			name:"future-submarine",
			canAttack:true,
			hitPoints:100,
			// Properties for drawing the object
			directions:8,
			radius:120,
			speed:2,
            frames:16,
			turnSpeed:8,
			turnLimit:3,
			sight:24,
			reloadTime:520,
			targetThreshold:0.1,
			weaponSpeed:12,	
			weaponType:"rocket",
			soundType:"heatseeker2",
			layer:1,
			lockedWayPoint:[],
			directionMultipiler:1,
			iconColor:0xFFFF00,
			iconShape:"circle",
            pixelWidth:69,
			pixelHeight:59,
			baseWidth:69,
			baseHeight:69,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
    	    totalLife:500,
			cost:5000,
			spriteImages:[
				{name:"healthy",count:1}
			],
			visionGridX:16,
			visionGridY:16,
			visionGrid:undefined,
			layer:"submerge",
        },
		"future-carrier":
		{
			name:"future-carrier",
			canAttack:true,
			// Properties for drawing the object
			directions:8,
			radius:120,
			speed:2,
            frames:8,
			turnSpeed:2,
			turnLimit:3,
            pixelWidth:69,
			pixelHeight:59,
			baseWidth:69,
			baseHeight:69,
			pixelOffsetX:0,
			pixelOffsetY:0,
			lockedWayPoint:[],
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			sight:3,
    	    totalLife:500,
			cost:5000,
			spriteImages:[
				{name:"healthy",count:1}
			],
			visionGridX:11,
			visionGridY:11,
			visionGrid:undefined,
			layer:"surface",
		},
		"future-transport":
		{
			name:"future-transport",
			loadable:true,
			loadThreshold:256,
			transport:[],
			transportLimit:10,
			// Properties for drawing the object
			directions:8,
			radius:80,
			speed:2,
            frames:8,
			turnSpeed:2,
			turnLimit:3,
            pixelWidth:69,
			pixelHeight:59,
			baseWidth:69,
			baseHeight:69,
			pixelOffsetX:0,
			pixelOffsetY:0,
			hitPoints:100,
			lockedWayPoint:[],
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			sight:3,
    	    totalLife:500,
			cost:5000,
			spriteImages:[
				{name:"healthy",count:1}
			],
			visionGridX:11,
			visionGridY:11,
			visionGrid:undefined,
			layer:"surface",
		},
		"tank":
		{
			name:"tank",
			// Properties for drawing the object
			directions:8,
			radius:120,
			speed:2,
            frames:8,
			turnSpeed:2,
            pixelWidth:69,
			pixelHeight:59,
			baseWidth:69,
			baseHeight:69,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			sight:3,
    	    totalLife:500,
			cost:5000,
			spriteImages:[
				{name:"healthy",count:1}
			],
			visionGridX:11,
			visionGridY:11,
			visionGrid:undefined,
			layer:"surface",
        }
    },
    defaults:
	{
		orders:{type:"stand"},
		wayPoints:undefined,
		onWayPoints:undefined,
		turnCount:0,
		lastDifference:1,
		calculatedPathLength:-1.0,		
		selected:false,
		selectable:true,
		hidden:false,
		reloadTimeLeft:0,
		cellCollisionMode:100,
		selectionRadius:100,
		selectionBorderShape:"circle",
		start:[],
		end:[],
		hasCollided:false,
		hasCollidedSkin:false,
		hasCollidedStop:false,
		isArmy:false,
		isNavy:true,
		isAirforce:false,
		accelerationIndex:0,
		accelerationFactor:[
				1.0, 0.99, 0.98, 0.97, 0.96, 0.95, 0.93, 0.91, 0.89, 0.85,
				0.82, 0.8, 0.87, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55,
				0.5, 0.48, 0.47, 0.46, 0.45, 0.44, 0.43, 0.42, 0.41, 0.3,0.1,
				0.01, 0.0],
		// cosDirectionTable:[
		// 	1, 0.9238795325112867, 0.7071067811865476, 0.38268343236508984,
		// 	6.123233995736766e-17, -0.3826834323650897, -0.7071067811865475, -0.9238795325112867,
		// 	-1, -0.923879532511287, -0.7071067811865477, -0.3826834323650895,
		// 	-1.8369701987210297e-16, 0.38268343236509, 0.7071067811865474, 0.9238795325112868
		// ],		
		// sinDirectionTable:[
		// 	0, 0.3826834323650898, 0.7071067811865475, 0.9238795325112867,
		// 	1, 0.9238795325112867, 0.7071067811865476, 0.3826834323650899,
		// 	1.2246467991473532e-16, -0.3826834323650892, -0.7071067811865475, -0.9238795325112868,
		// 	-1, -0.9238795325112866, -0.7071067811865477, -0.38268343236508956
		// ], 
		cosDirectionTable:[
			1, 0.7071067811865476,
			6.123233995736766e-17, -0.7071067811865475,
			-1, -0.7071067811865477,
			-1.8369701987210297e-16, 0.7071067811865474
		],		
		sinDirectionTable:[
			0, 0.7071067811865475,
			1, 0.7071067811865476,
			1.2246467991473532e-16, -0.7071067811865475,
			-1, -0.7071067811865477
		], 		

		outputTest:function()
        {
            console.log(this.name);
        },

		processOrders:function()
		{
			switch (this.orders.type)
			{
				case "attack":
					this.attack(this.orders.to);
					break;
				case "attacking":
					this.attackingTo();
					break;
				case "turnToFire":
					this.turnToFire();
					break;
				case "firing":
					this.firing();
					break;
				case "fire":
					this.fire();
					break;				
				case "move":
					this.move();
					break;
				case "moveTo":
                    this.moveTo(this.orders.to);
					break;
				case "turning":
					this.turningTo();
					break;
				case "moving":
					this.movingTo();
					break;
				case "unload":
					this.unload();
					break;
				case "standing":
					this.standing();
					break;
				case "stand":
					this.stand();
					break;
			}
		},

		init:function()
		{
			this.headLeft = {x:0,y:0};
			this.headRight = {x:0,y:0};
		},

		update:function()
		{
			if(this.reloadTimeLeft > 0)
			 	this.reloadTimeLeft--;

			if(debug.fogOfWar)
				fog.setSubGrid(this.x, this.y, this.visionGrid, this.team, this.state, this.hidden);
		},

		attack:function(destination)
		{
			console.log("attack");

			this.state.type = this.state.attack;
		
			// Set a super state of attacking
			// Used for all attack states
			this.state.attacking = true;
			// Destionation holds a target's uid
			// and searches the target. This search only occurs
			// once and returns the same target for the
			// selection group

			if(destination && destination.target)
			{
				this.target = target.searchForTarget(destination.target.uid);
				target.addItemToAttackedTarget(this.target.uid, this);
			}
			
			this.orders.type = "moveTo";
		},

		attacked:function()
		{
			// If the vehicle doesn't want attack anymore,
			// retreat and don't attack back
			if(this.retreating)
				return;

			console.log("attacked");

			// Search for friendly vehicles,
			// currently at a wide range.
			var friendlyVehicle = findClosetFriendlyAttackingVehicle(
				this.team,
				this.radius,
				4,4,
				this.x,this.y);
			
			// Search for friendly vehicles,
			// currently at a narrow range.
			var friendlyInfantry = findFriendlyInfantry(
				this.team,
				this.radius,
				3,3,
				this.x,this.y);	

			// If any friendly vehicles were found,
			// help with the attack
			// though friendly Vehciles can select
			// own target
			if(friendlyVehicle)
			{	
				if(!friendlyVehicle.attacking)
				{
					friendlyVehicle.attacking = true;
					friendlyVehicle.orders.type = "assist";
				}
			}

			// If any friendly infantry were found,
			// help with the attack
			if(friendlyInfantry.length > 0)
			{				
				for(var i = 0; i < friendlyInfantry.length; i++)
				{
					if(friendlyInfantry[i].attacking)
						continue;

					if(!friendlyInfantry[i].canAttack)
						continue;	

					// Don't include any infantry that already know
					// about the attack.
					// May use attacking super state instead	
					friendlyInfantry[i].attacking = true
					friendlyInfantry[i].orders.type = "assist";
					// The maximum number of infantry
					// can join the attack as congestion
					// isn't a problem
				}
			}
			
			if(this.orders.type != "fire" && this.orders.type != "firing")
			{	
				target.addItemToAttackedTarget(this.target.uid, this);

				this.orders.type = "firing";
			}
		},

		/**
		 * issue: turnToFire doesn't turn towards the taget,
		 * before firing.
		 */
		turnToFire:function()
		{
			// Once the direction of the vehicle is facing
			// the right direction, start firing
			if(this.state.attacking)
				this.orders.type = "firing";
			else
				this.orders.type = "moving";
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
				this.orders.type = "standing"; // Should these be standing
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
							this.target = undefined;						
							this.orders.type = "standing";
							this.state.attacking = false;
							this.orders.to = undefined;
						}
						else
						{
							this.orders.type = "fire";
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
						
						//this.setNewTarget();	
						this.orders.type = "standing";
						return;
					}					
					else
					{
						this.orders.type = "fire";
					}
				}
			}
		},

		fire:function()
		{		
			if(!this.bullet)
			{	
				var bulletIndex = 0;

				for(var i = 0; i < game.bullets.length; i++)
				{
					if(game.bullets[i].name == this.weaponType)
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
			
			this.orders.type = "firing";
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
			//alert("this.orders.to.y: " + this.orders.to.y)

			this.orders.to.y = this.orders.to.y - display.maininterface.mapImageYOffset * productionRatio;

			this.orders.to.x = this.orders.to.x * productionInverseRatio + game.offsetX;
			this.orders.to.y = this.orders.to.y * productionInverseRatio + game.offsetY;

			this.orders.to.x = this.orders.to.x / game.gridSize;
			this.orders.to.y = this.orders.to.y / game.gridSize;

			nav.lockTheShipToWayPoints(this.x, this.y, this.direction, flags.LAYER_UNLOCKED);

			this.pathIncrement = 1;
			
			if(this.state.attacking)
				this.retreating = true;

			this.wayPoints = undefined;

			this.target = undefined;

			this.state.attacking = false;
			this.extracting = false;

			this.surrounding = false;
			this.reloadTimeLeft = 0;

			this.orders.type = "moveTo";
		},

		/**
		 * Determines the static path that the vehicle
		 * will follow.
		 */
		moveTo:function(destination)
		{
			this.start[0] = Math.floor(this.x);
			this.start[1] = Math.floor(this.y);

			var range = 0;
			var path;

			this.onWayPoints = false;

			if (!destination)
			{
				var destination = {};

				if (this.target)
				{
					destination.x = this.target.x;
					destination.y = this.target.y;
					destination.target = this.target;
				}

				if (game.currentMapIsleGrid[Math.floor(destination.y / game.gridSize)][Math.floor(destination.x / game.gridSize)] != flags.CELL_COLLISION_MODE_OFF)
				{
					return;
				}
			}
			else
			{
				if (this.target)
				{
					destination.x = this.target.x;
					destination.y = this.target.y;
					destination.target = this.target;
				}
			}

			if (game.currentMapIsleGrid[Math.floor(destination.y)][Math.floor(destination.x)] > flags.CELL_COLLISION_MODE_OFF)
			{
				if (!this.target)
				{
					console.log("Invalid destination");
					this.state.attacking = false;
					this.orders.type = "standing";
					return;
				}
			}

			if(this.state.attacking && Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) < Math.pow(this.sight, 2))
			{
				this.orders.type = "firing";
				return;
			}

			nav.toDestinationTracker.add(destination);

			// if (this.wayPoints)
			// {
			// 	if (nav.wayPointsLocked.has(this.uid))
			// 	{
			// 		lockedCoordinates = nav.wayPointsLocked.get(this.uid).split(" ");
			// 		nav.wayPoints[lockedCoordinates[0]][lockedCoordinates[1]].locked = 0;
			// 	}

			// 	this.lockedWayPoint[0] = this.wayPoints[0].x;
			// 	this.lockedWayPoint[1] = this.wayPoints[0].y;
			// 	this.wayPoints.splice(0, 1);
			// }
			// else
			// {
			this.end[0] = Math.floor(destination.x);
			this.end[1] = Math.floor(destination.y);
			//}

			this.grid = nav.copyIsleGrid();

			if (this.start[1] < 0 || this.start[1] >= game.level.mapGridHeight || this.start[0] < 0 || this.start[0] >= game.level.mapGridWidth)
			{
				this.orders.path = [this, destination];
				newDirection = findAngle(destination, this, this.directions);
			}
			else
			{
				path = naval_astar.search(this, nav.wayPoints, this.end);

				if (path && path.length > 0)
				{
					this.orders.path = path;
				}
			}

			if (this.orders.path && this.orders.path.length > 0)
			{
				this.orders.type = "moving";
			}
			else
			{
				this.orders.type = "standing";
			}
		},

		/**
		 * Turns to the correction direction to start along
		 * the path.
		 */
		turningTo:function()
		{
			this.orders.type = "moving";
		},

		/**
		 * The actual movement of the ship and that follows
		 * the pre-determined path.
		 */
		movingTo:function()
		{
			nav.pathLengths.set(this.uid, nav.calcPathLength(this, this.orders.path, this.wayPoints));

			var otherShips = physics.checkForCollidingRadius(this, "ships");

			if(otherShips.length > 0)
			{
				for(var i = 0; i < otherShips.length; i++)
				{
					if((otherShips[i].orders.type == "standing" || otherShips[i].orders.type == "stand"))
					{
						nav.pathLengths.delete(this.uid);
						this.wayPoints = undefined;
						this.orders.path.length = 0;
						this.nextStep = undefined;
						this.orders.type = "standing";
						//alert("otherShips[i].orders.type == standing || otherShips[i].orders.type == stand")
	
						return;
					}				

					if(nav.pathLengths.has(otherShips[i].uid))
					{
						if(nav.pathLengths.get(this.uid) > nav.pathLengths.get(otherShips[i].uid))
						{
							return;
						}
					}
				}
			}

			if(this.orders.path.length>1)
			{
				if(this.nextStep == undefined)
					this.nextStep = {x:this.orders.path[1].x + 0.5,y:this.orders.path[1].y + 0.5};

				var distanceFromDestinationSquared = Math.pow(this.x -
					this.nextStep.x, 2) + Math.pow(this.y - this.nextStep.y, 2);

				if(distanceFromDestinationSquared < 1.0)
				{	
					this.nextStep = {x:this.orders.path[1].x + 0.5,y:this.orders.path[1].y + 0.5};

					this.orders.path.shift();
				}
			}
			else if(this.orders.path.length>0)
			{
				/*	Vehicle keeps to the last step, once reached it 
					removes the last step and ends.
				*/
				if(this.nextStep == undefined)
					this.nextStep = {x:this.orders.path[0].x + 0.5,y:this.orders.path[0].y + 0.5};

				var distanceFromDestinationSquared = Math.pow(this.x -
					this.nextStep.x, 2) + Math.pow(this.y - this.nextStep.y, 2);

				if(distanceFromDestinationSquared < 1.0)
				{
					//this.nextStep = {x:this.orders.path[1].x + 0.5,y:this.orders.path[1].y + 0.5};
					this.orders.path.shift();
				}
			}
			else if(this.orders.path.length == 0)
			{
				const headLeftY = Math.floor(this.headLeft.y / 20) - 4;
				const headLeftX = Math.floor(this.headLeft.x / 20);
				const headRightY = Math.floor(this.headRight.y / 20) - 4;
				const headRightX = Math.floor(this.headRight.x / 20);

				this.nextStep = {x:this.end[0],y:this.end[1]};

				var distanceFromDestinationSquared = Math.pow(this.x -
					this.nextStep.x, 2) + Math.pow(this.y - this.nextStep.y, 2);

				if(distanceFromDestinationSquared < 40.0 && 
					game.currentIsleMapPassableGrid[headLeftY][headLeftX] == 100 ||
					game.currentIsleMapPassableGrid[headRightY][headRightX ] == 100)
				{
					console.log("collision stand");
					this.previousDistance = 100;
					this.nextStep = undefined;
					this.orders.type = "standing";
					return;
				}

				if(distanceFromDestinationSquared < 1.0)
				{
					console.log("distanceFromDestinationSquared stand");
					this.previousDistance = 100;
					this.nextStep = undefined;
					this.orders.type = "standing";
					return;
				}

				// if(distanceFromDestinationSquared > this.previousDistance)
				// {
				// 	console.log("over step stand");
				// 	this.previousDistance = 100;
				// 	this.nextStep = undefined;
				// 	this.orders.type = "standing";
				// 	return;
				// }
				// else
				// {
				// 	this.previousDistance = distanceFromDestinationSquared;
				// }
			}

			if(this.state.attacking)
			{
				if(this.target)
				{
					if(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) < Math.pow(this.sight, 2))
					{
						this.orders.type = "standing";
						return;
					}
				}
				else
				{
					this.state.attacking = false;
				}
			}
			
			this.moving();
		},

		moving:function()
		{
			// On rare times, the nextStep will become undefined
			// Not sure how?
			// But if so, handle it
			// otherwise the game will crash

			if(this.nextStep == undefined)
			{
				// Just moving, then stop

				if(debug.vehiclesDebug)
				{
					console.log("%cNo path is avaialbe, returning to the standing state",
						'background: #777; color: #86131d');
					console.log("Vehicle uid: " + this.uid);
					console.log("Vehicle type: " + this.name);
					console.log("Vehicle path length: " +this.orders.path.length);
				}

				this.state.attacking = false;
				
				//alert("this.nextStep == undefined")
				this.orders.type = "standing";
				return;
			}

			var newDirection = findAngle(this.nextStep,this,this.directions);

			var difference = angleDiff(this.direction,newDirection,this.directions);
			
			var turnAmount = this.turnSpeed*game.turnSpeedAdjustmentFactor;
			
			var movement = (this.speed * this.accelerationFactor[this.accelerationIndex]) *
				game.speedAdjustmentFactor;	

			var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI ;
			this.lastMovementX = -(movement*Math.sin(angleRadians));
			this.lastMovementY = -(movement*Math.cos(angleRadians));			
		
			// Update the drawing of the sprite
			this.sprite.x = (this.sprite.x +(this.lastMovementX
				* game.gridSize));
			this.sprite.y = (this.sprite.y +(this.lastMovementY
				* game.gridSize));

			if(this.vision)
			{
				//this.vision.position.x = this.sprite.x;
				//this.vision.position.y = this.sprite.y;
			}

			// Update the real coordinates of the sprite
			this.x = (this.x +this.lastMovementX);
			this.y = (this.y +this.lastMovementY);

			this.turnCount++;

			if (Math.abs(difference)>turnAmount  && (this.turnCount) > this.turnLimit)
			{
				this.turnCount = 0;				
				this.direction = wrapDirection(
					this.direction+turnAmount*Math.abs(difference)/difference,this.directions);	
			}

			this.waiting = false;

			this.steering();

			return true;
		},

		steering:function()
		{
			this.hasCollided = false;
			this.hasCollidedSkin = false;
			this.hasCollidedStop = false;

			itemsFound = physics.queryShips(this.near);

			if(itemsFound && itemsFound.length > 0)
			{	
				var nearByItems = [];

				for(var i = 0; i < itemsFound.length; i++)
				{
					if(itemsFound[i].uid == this.uid)
						continue;

					nearByItems.push(game.items[lookup.get(itemsFound[i].uid)]);
				}

				var collidedSkinItems = physics.detect(this, nearByItems, "skin", "skin");

				for(var i = 0; i < collidedSkinItems.length; i++)
				{					
					if(this.orders.to)
					{
						if(collidedSkinItems[i].orders.to)
						{
						if(isMoving(this) && isMoving(collidedSkinItems[i]))
							{						
								if(findFurthestItem(this, collidedSkinItems[i]))
								{
									this.stop();
								}
							}
						}
					}
					else
					{
						this.state.attacking = false;
						//alert("var i = 0; i < collidedSkinItems.length; i++")
						this.orders.type = "standing";
						return;
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

								//alert("collidedSkinItems[i].orders.to")
								this.orders.type = "standing";
								
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

				this.velocity();				
				
				return;
			}

			this.velocity();
		},

		unload:function()
		{
			if(canUnload())
			{
				var item = this.transport[0];

				// var positions = cells.place(
				// 	this.transport,
				// 	game.currentTerrainMapPassableGrid
				// );

				// console.log(positions);

				item.sprite.visible = true;

				item.sprite.x = mouse.x * productionInverseRatioX;
				item.sprite.y = mouse.y * productionInverseRatio;
				item.x = (item.sprite.x + game.offsetX) / game.gridSize;
				item.y = (item.sprite.y + game.offsetY) / game.gridSize - display.maininterface.mapImageYGridOffset;

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
			//alert("standing")
			// Add the cells to the grid
			//alert(this.x + " " + this.y + " " + this.direction + " " + flags.LAYER_SURFACE_LOCKED)
			nav.lockTheShipToWayPoints(this.x, this.y, this.direction, flags.LAYER_SURFACE_LOCKED);

			if(debug.logSync)
				logs.syncLog("ships standing: " + this.x + " " +  this.y + " " + this.sprite.x + " " + this.sprite.y);

			this.retreating = false;

			if(this.state.attacking)
			{
				this.orders.type = "turnToFire";
			}
			else
			{
				nav.toDestinationTracker.delete(this.orders.to);

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

		velocity:function()
		{
			if(this.accelerationIndex == this.velocityThreshold)
				return;

			if(this.accelerationIndex < this.velocityThreshold)
				this.accelerationIndex++;

				if(this.accelerationIndex > this.velocityThreshold)
				this.accelerationIndex--;	
		},

		slowDown:function()
		{
			if(this.accelerationIndex < this.accelerationFactor.length / 2)
				this.accelerationIndex++;
		},

		stop:function()
		{
			this.accelerationIndex = this.accelerationFactor.length - 1;
			this.movingTowardDestinationColor = 0xFF0000;
		},

		fullSpeed:function()
		{
			//console.log("stop");
			this.accelerationIndex = 0;
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

		createPolygon()
		{
			this.skin = new Array(8);
			this.near = new QuadTree.Boundary();
		},

		draw:function()
		{            
			this.animate();
			
			if (this.selected)
			{
				this.drawSelection();
				this.drawLifeBar();
			}

			if(game.cncDisplay)
			{
				this.drawIcon();
			}
        },

		animate:function()
        {	
			if(this.orders.type == 'fire' || this.orders.type == 'firing')
			{
				this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
					[wrapAnimationDirection
						(Math.round(this.direction),this.directions,this.directionMultipiler)];
			}
			else
			{
				this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)[0];
				const angle = wrapDirection(Math.round(this.direction+8), this.directions) * (2 * Math.PI / this.directions);
				this.sprite.rotation = angle;
			}

			if(this.bullet)
				this.animateBullet();

			var tempTexture = renderer.texturesMap.get(this.team + "_" + this.name)[0];

			var cosAngle = this.cosDirectionTable[wrapDirection(Math.round(this.direction),this.directions)];
			var sinAngle = this.sinDirectionTable[wrapDirection(Math.round(this.direction),this.directions)];

			var translateX = this.x * game.gridSize;
			var translateY = this.y * game.gridSize + display.maininterface.mapImageYOffset;

			var textureWidthHalf = tempTexture.width / 2;
			var textureHeightHalf = tempTexture.height / 2;

			var textureWidth = tempTexture.width;
			var textureHeight = tempTexture.height;

			this.skin[0] = (-textureWidth * cosAngle * 1.25) - (-textureHeight * sinAngle * 1.25) + translateX;
			this.skin[1] = (-textureWidth * sinAngle * 1.25) + (-textureHeight * cosAngle * 1.25) + translateY;
			this.skin[2] = (+textureWidth * cosAngle * 1.25) - (-textureHeight * sinAngle * 1.25) + translateX;
			this.skin[3] = (+textureWidth * sinAngle * 1.25) + (-textureHeight * cosAngle * 1.25) + translateY; 
			this.skin[4] = (+textureWidth * cosAngle * 1.25) - (+textureHeight * sinAngle * 1.25) + translateX;
			this.skin[5] = (+textureWidth * sinAngle * 1.25) + (+textureHeight * cosAngle * 1.25) + translateY;
			this.skin[6] = (-textureWidth * cosAngle * 1.25) - (+textureHeight * sinAngle * 1.25) + translateX;
			this.skin[7] = (-textureWidth * sinAngle * 1.25) + (+textureHeight * cosAngle * 1.25) + translateY;

			this.headLeft.x = (-textureWidthHalf * cosAngle) - (-textureHeightHalf * sinAngle) + translateX;
			this.headLeft.y = (-textureWidthHalf * sinAngle) + (-textureHeightHalf * cosAngle) + translateY;
			this.headRight.x = (+textureWidthHalf * cosAngle) - (-textureHeightHalf * sinAngle) + translateX;
			this.headRight.y = (+textureWidthHalf * sinAngle) + (-textureHeightHalf * cosAngle) + translateY;

			this.near.x = translateX - 400;
			this.near.y = translateY - 400;
			this.near.w = this.near.x + 800;
			this.near.h = this.near.y + 800;
			
			this.skinCollision.clear();

			if(keyboard.collisionDebug)
			{	
				if(this.hasCollided)
				{
					this.skinCollision.lineStyle(1, 0xFF0000, 1);
				}
				else
				{
					this.skinCollision.lineStyle(1, 0x0000FF, 1);
				}

				renderer.drawPolygon(this.skinCollision, this.skin, game.offsetX, game.offsetY);
			}

			this.headLeftCollision.clear();
			this.headLeftCollision.lineStyle(1, 0xFF0000, 1);
			this.headRightCollision.clear();
			this.headRightCollision.lineStyle(1, 0xFF0000, 1);

			// renderer.drawRectangle(this.headLeftCollision, this.headLeft, 1, 1, game.offsetX, game.offsetY);
			// renderer.drawRectangle(this.headRightCollision, this.headRight, 1, 1, game.offsetX, game.offsetY);			
		},

		animateBullet:function()
		{
			if(this.bullet.update)
				this.bullet.update();

			if(this.bullet.animate)
				this.bullet.animate();
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
			this.lifeBarSprite.y = this.sprite.y - this.radius - game.lifeBarLargeHeight;

			this.lifeBarBorderSprite.x = this.sprite.x;
			this.lifeBarBorderSprite.y = this.sprite.y - this.radius - game.lifeBarLargeHeight;
		},

		drawIcon:function()
		{
			this.iconSprite.x = this.sprite.x;
			this.iconSprite.y = this.sprite.y;

			var angle = (wrapDirection(invertDirection(Math.round(this.direction), this.directions),this.directions) * 45 * Math.PI / 180);
			
			this.iconDirectionSprite.x = this.sprite.x;
			this.iconDirectionSprite.y = this.sprite.y;
			this.iconDirectionSprite.rotation = angle;
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
    }
}
var civilians =
{
	list:
	{
        "dead-scientist":
		{
			name:"dead-scientist",
			canAttack:false,
			canLoad:true,
			pixelWidth:20,
            pixelHeight:24,
			weaponType:"bullet",
			soundType:"bullet1",	
			targetThreshold:0.1,
			weaponSpeed:20,		
			radius:9,
			speed:3,
			runningSpeed:1,
			sight:4,
			vision:154,
			nearVision:9,
			reloadTime:120,
			cost:100,
			resource:"none",
    	    hitPoints:25,
            turnSpeed:4,
            frames:1,
            animationCount:1,
            animationLimit:2,
			animationSpeed:0,
            animationSpeedLimit:6,
            animationSlowSpeed:0,
            animationSlowSpeedLimit:30,
			direction:0,
			directions:8,
			spriteImages:[
				{name:"stand",count:1,directions:frames}
			],
			buildableGrid:[
				[1]
			],
			passableGrid:[
				[1]
			],
			visionGridX:10,
			visionGridY:10,
			visionGrid:undefined,
		},    
		"scientist":
		{
			name:"scientist",
			canAttack:false,
			canLoad:true,
			pixelWidth:20,
			pixelHeight:24,
			weaponType:"bullet",
			soundType:"bullet1",	
			targetThreshold:0.1,
			weaponSpeed:20,		
			radius:9,
			speed:3,
			runningSpeed:1,
			sight:4,
			vision:154,
			nearVision:9,
			reloadTime:120,
			cost:100,
			resource:"none",
			hitPoints:25,
			turnSpeed:4,
			frames:16,
			animationCount:1,
			animationLimit:2,
			animationSpeed:0,
			animationSpeedLimit:6,
			animationSlowSpeed:0,
			animationSlowSpeedLimit:30,
			direction:0,
			directions:8,
			nextXDirection:[0,1,1,1,0,-1,-1,-1],
			nextYDirection:[-1,-1,0,1,1,1,0,-1],
			roamingDistance:{
				maxDistance:5,
				distance:-1,
			},
			waitState:{
				state:"",
				timer:0,
				timerLimit:100
			},
			spriteImages:[
				{name:"stand",count:1,directions:frames}
			],
			buildableGrid:[
				[1]
			],
			passableGrid:[
				[1]
			],
			visionGridX:10,
			visionGridY:10,
			visionGrid:undefined,
		}
	},
	defaults:
	{
		animation:"stand",
		orders:{type:"stand"},
		destination:undefined,	
		selected:false,
		selectable:true,
		rotation:0,
		exclusionRange:3,
		cellCollisionMode:1,
		scaleInnerCollision:0.75,
		scaleOuterCollision:1.00,
		selectionRadius:100,
		selectionBorderShape:"circle",
		hasCollided:false,
		hasCollidedSkin:false,
		hasCollidedStop:false,
		grid:undefined,
		path:[],
		start:[],
		end:[],

        outputTest:function()
        {
		},

		processOrders:function()
		{
			switch (this.orders.type)
			{
				case "defend":
					this.defend();
					break;
				case "attacked":
					this.attacked();
					break;
				case "load":
					this.load(this.orders.to);
					break;
				case "loading":
					this.loading();
					break;
				case "waitTo":
					this.waitTo();
					break;
				case "roam":
					this.roam();
					break;
				case "move":
					this.move();
					break;
				case "moveTo":
					// Move towards destination until distance from destination is less aircraft radius
                    this.moveTo(this.orders.to);
					break;
				case "turning":
					this.turningTo();
					break;
				case "moving":
					// Move towards destination until distance from destination is less aircraft radius
					this.movingTo();
					break;
				case "wait":
					this.wait();
					break;
				case "standing":
					this.standing();
					break;
				case "stand":
					this.stand();
					break;
			}
		},

		roam:function()
		{
			this.start[0] = Math.round(this.x);
			this.start[1] = Math.round(this.y);
			
			this.grid = [...game.currentTerrainMapPassableGrid];
			
			let maxMoveDistance = -1; // Unlimited movement by default
			
			if (this.orders.to && this.orders.to.radius !== undefined) {
				maxMoveDistance = this.orders.to.radius;
			}
			
			do
			{
				var nextDirection = generate.randomNumber(this.directions) - 1;
			
				this.orders.to.x = this.start[0] + this.nextXDirection[nextDirection];
				this.orders.to.y = this.start[1] + this.nextYDirection[nextDirection];
			}
			while (
				this.grid[this.orders.to.y][this.orders.to.x] === flags.CELL_COLLISION_MODE_FULL) // Only check distance if maxMoveDistance is set
			;
			
			const deltaX = this.orders.to.x - this.originX;
			const deltaY = this.orders.to.y - this.originY;

			let roamingDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			
			if(roamingDistance > this.roamingDistance.maxDistance)
			{
				this.orders.to.x = this.originX;
				this.orders.to.y = this.originY;
			}

			this.state.roaming = true;
			this.orders.type = "moveTo";
		},

		/**
		 * Starts the movement of the Civilian, ironically, no 
		 * movement is done.
		 * 
		 * Instead the the Civilian remove its collision tile(s), 
		 * this needs to be done for whole platoon, before moving.
		 * 
		 * This prevents any Civilian getting trapped by their
		 * follow Civilian men or women. 
		 */
		move:function()
		{
			console.log("move");

			this.orders.to.y = this.orders.to.y - display.maininterface.mapImageYOffset * productionRatio;

			this.orders.to.x = this.orders.to.x * productionInverseRatio + game.offsetX;
			this.orders.to.y = this.orders.to.y * productionInverseRatio + game.offsetY;

			this.orders.to.x = this.orders.to.x / game.gridSize;
			this.orders.to.y = this.orders.to.y / game.gridSize;

			if(game.currentTerrainMapPassableGrid[
                Math.floor(this.orders.to.y)][Math.floor(this.orders.to.x)]
                 == flags.CELL_COLLISION_MODE_FULL)
            {
				console.log("no move, return to stand");
				this.orders.type = "stand";
                return;
            }
			
			this.removeCivilianFromTheCellTile();

			// Target needs to be undefine if the previous
			// target is on the same side
			this.target = undefined;

			// Can happen when capturing and attacking at the same time
			this.state.retreating = false;
			this.state.attacking = false;
			this.state.firing = false;
			this.state.capturing = false;

			console.log("Civilian move");
			this.orders.type = "moveTo";
		},

		/**
		 * Determines the static path that the Civilian
		 * will follow.
		 */
		moveTo:function(destination)
		{
			if(debug.logMultiplayerStats)
			{
				console.log("%cstarting stats",
				'background: #000; color: #6cbf27');

				console.log("this.uid: " + this.uid);
				console.log("this.x: " + this.x + ", " + this.y);
				console.log("this.spriteX: " + this.sprite.x + ", " + this.sprite.y);
				console.log("this.direction: " + this.direction);

				console.log("%cend starting stats",
				'background: #000; color: #6cbf27');
			}

			if(this.state.attacking)
			{
				if(!this.target)
				{
					console.log("return to stand");
					this.orders.type = "standing";
					return;
				}
			}

			cells.remove(
				this.uid,				
				game.currentTerrainMapPassableGrid,
				this.cellCollisionMode);

			//nav.deleteMarkers(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);

			this.path = undefined;

			// First find path to destination
			this.start[0] = Math.floor(this.x)
			this.start[1] = Math.floor(this.y);

			var range = 0;

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

			// destination.y -= display.maininterface.mapImageYOffset * productionRatio;

			// destination.x *= productionInverseRatio / game.gridSize;
			// destination.y *= productionInverseRatio / game.gridSize;

			//this.spreadDestination(destination);

			this.end[0] = Math.floor(destination.x);
			this.end[1] = Math.floor(destination.y);

			//this.grid = $.extend([],game.currentTerrainMapPassableGrid);
			this.grid = [...game.currentTerrainMapPassableGrid];

			if(destination && destination.target)
			{
				// Allow destination to be "movable" so that algorithm can find a path
				if(destination.target.type == "terrain")
				{
					//this.grid[Math.floor(destination.y)][Math.floor(destination.x)] = 0;
				}
				
				if(destination.target.type == "buildings" || destination.target.type == "vehicles")
				{
					// Since building and vehicles have a large collision grid

					// The a * search may not reach the target
					// The range varialble increases the torlance
					// at the end of the path

					//if(this.grid[Math.floor(destination.y)][Math.floor(destination.x)] == 1)
						range = 3;
				}
				else if(destination.target.type == "Civilian")
				{
					//if(this.grid[Math.floor(destination.y)][Math.floor(destination.x)] == 1)
						range = 2;
				}		
			}

			// if Civilian is outside bounds, just fly straight towards goal
			if (this.start[1]<0||this.start[1]>=game.level.mapGridHeight||this.start[0]<0||this.start[0]>=game.level.mapGridWidth)
			{
			   //this.path = [this,destination];
			   newDirection = findAngle(destination,this,this.directions);
			}
			else
			{
				var path;
				if(this.state.loading)
				{
					var t0 = performance.now();
					path = nav.getPath(
						this,this.grid,this.start,this.end,this.cellCollisionMode,range,this.pathIncrement);
					var t1 = performance.now();
				}
				else
				{
					var t0 = performance.now();

					path = Tactical_AStar(this.uid,this.grid,this.end,this.start,heuristic.euclidean,this.cellCollisionMode,range);

					var t1 = performance.now();

					if(debug.logCivilian)
						console.log(`nav.copyGrid() took ${t1 - t0} milliseconds.`);
				}

				/**
				 * Very important for additional movements.
				 * 
				 * When Civilian are grouped, often the non-leading
				 * Civilian wont be able to reach the destination.
				 * 
				 * Therefore it hold its previous next step and 
				 * try to reach it.
				 * 
				 * However, typically a leading Civilian will be
				 * in place trying to the new destination.
				 * 
				 * Without the reset, two Civilian or more will
				 * result in an unbreakable collision 
				 * 
				 */ 

				if(path)
				{
					if(path.length == 0)
					{
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
			if(this.direction == this.correctDirection)
			{
				this.orders.type = "moving";
			}				
			else
			{
				if(this.state.attacking)
				{
					let position = {x:this.x, y:this.y};
		
					this.correctDirection = findAngle(this.target,position,this.directions);
	
					this.direction = wrapDirection(this.correctDirection, this.directions);
				}
				else
				{
					let position = {x:this.x, y:this.y};
					let next = {x:this.path[1].x+0.5, y:this.path[1].y+0.5};
		
					this.correctDirection = findAngle(next,position,this.directions);
	
					this.direction = wrapDirection(this.correctDirection, this.directions);
				}
			}
		},

		/**
		 * The actual movement of the Civilian and that follows
		 * the pre-determined path.
		 */
		movingTo:function()
		{
			if(this.path.length>1)
			{
				if(this.nextStep == undefined)
					this.nextStep = {x:this.path[1].x+0.5,y:this.path[1].y+0.5};

				var distanceFromDestinationSquared = Math.pow(this.x -
					this.nextStep.x, 2) + Math.pow(this.y - this.nextStep.y, 2);

				if(distanceFromDestinationSquared < Math.pow(this.radius/game.gridSize, 2))
				{
					this.nextStep = {x:this.path[1].x+0.5,y:this.path[1].y+0.5};
					//nav.deleteMarker(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);
					this.path.shift();

					//if(nav.multiType)
					//	nav.createMarkers(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);
				}
            }
			else if(this.path.length>0)
			{
				/*	Civilian keeps to the last step, once reached it 
					removes the last step and ends.
				*/
				var distanceFromDestinationSquared = Math.pow(this.x -
					this.orders.to.x, 2) + Math.pow(this.y - this.orders.to.y, 2);

				//console.log("distanceFromDestinationSquared: " + distanceFromDestinationSquared);
					
				if(distanceFromDestinationSquared < Math.pow(this.radius/(game.gridSize), 2))
				{	
					//nav.deleteMarker(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);
					this.path.shift();
				}

				/*	Sometimes Civilian can't find the exact point to stand.
					As in they stand over it, with a slow turn speed,
					Civilian will spin.

					The following if statement avoids that, by recording
					the previous distances, and once the distance is greater
					than the previous distance, the Civilian have to stop.

					The last step is removed.
				*/
				if(distanceFromDestinationSquared > this.previousDistance)
				{
					//nav.deleteMarker(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);
					this.path.shift();
				}
				else
				{
					this.previousDistance = distanceFromDestinationSquared;
				}
			}
			else
			{
				// Returns the previousDistance to a large number, a reset.
				this.previousDistance = 100;

				if(this.state.capturing)
				{
					this.captureBuilding();
				}
				else if(this.state.loading)
				{
					this.orders.type = "standing";
				}
				else
				{
					// Civilian stops here
					if(debug.logMultiplayerStats)
					{
						console.log("vehicle stop here: " + this.uid);
						console.log(this.x + " " + this.y);
					}
					
					this.state.attacking = false;
					this.orders.type = "standing";
				}

				this.capturing = false;

				return false;
			}

			// Once close enough to target, stop and attack
			if(this.state.attacking)
			{				
				if(this.target)
				{					
					if(this.target.life <= 0)
					{
						if(this.target.destory)
						{
							this.target.destory();
						}

						this.setNewTarget();
					}

					if(this.target)
					{
						// In range to fire, standing first to add to grid, then fire!
						if(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) < Math.pow(this.sight, 2))
						{	
							this.state.attacking = true;
							this.orders.type = "standing";
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

			this.moving();
		},
		
		moving:function()
		{
			// On rare times, the nextStep will become undefined
			// Not sure how?
			// But if so, handle it
			// otherwise the game will crash
			if(this.waitForThreshold)
				return;

			if(this.nextStep == undefined)
			{
				// Searches for a new target
				if(this.state.attacking)
				{
					if(debug.vehiclesDebug)
					{
						console.log("%cNo path is avaialbe, finding a new target",
						'background: #000; color: #3aef38');
						console.log("Vehicle uid: " + this.uid);
						console.log("Vehicle uid: " + this.team);
						console.log("Vehicle type: " + this.name);
					}

					var target = findNextClosetGroundAttackingTarget(
						this.target,
						this.team,
						this.radius,
						3,3,
						this.x,this.y);

					if(target)
					{
						this.target = target;
						this.orders.type = "attack";
						return;
					}
					else
					{
						if(debug.vehiclesDebug)
						{
							console.log("%cNo path is avaialbe, returning to the standing state",
								'background: #777; color: #86131d');
							console.log("Vehicle uid: " + this.uid);
							console.log("Vehicle type: " + this.name);
							console.log("Vehicle path length: " +this.path.length);
						}

						this.state.attacking = false;
						
						this.orders.type = "standing";
						return;	
					}
				}
				else
				{
					// Just moving, then stop

					if(debug.logCivilian)
					{
						console.log("%cNo path is avaialbe, returning to the standing state",
							'background: #777; color: #86131d');
						console.log("Vehicle uid: " + this.uid);
						console.log("Vehicle type: " + this.name);
						console.log("Vehicle path length: " +this.path.length);
					}

					this.state.attacking = false;
					this.orders.type = "standing";
					return;	
				}		
			}			

			var newDirection = findAngle(this.nextStep,this,this.directions);
			var difference = angleDiff(this.direction,newDirection,this.directions);
			var turnAmount = this.turnSpeed*game.turnSpeedAdjustmentFactor;
			var movement = (this.speed)*game.speedAdjustmentFactor*framerate.delta;

			var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI ;
			this.lastMovementX = -(movement*Math.sin(angleRadians));
			this.lastMovementY = -(movement*Math.cos(angleRadians));

            this.sprite.x = (this.sprite.x +(this.lastMovementX
                * game.gridSize));
            this.sprite.y = (this.sprite.y +(this.lastMovementY
				* game.gridSize));

			// Update the real coordinates of the sprite
            this.x = (this.x +this.lastMovementX);
			this.y = (this.y +this.lastMovementY);

			if(debug.logSync)
				logs.silentLog("Civilian x: " + this.x + ", y:" +  this.y);

			//this.checkForThresholds();
			//this.steering();

			this.collided = false;

			// Surrounding occurs when the first attacking vehicle is firing
			// at a target. Other attacking vehicles of the same target,
			// chance their behaviour

			//this.checkForVehicles();
			
			if (Math.abs(difference)>turnAmount)
				this.direction = wrapDirection(this.direction+turnAmount*Math.abs(difference)/difference,this.directions);		
			
			return true;
		},

		waitTo:function()
		{
			if(this.waitState.timer == this.waitState.timerLimit)
			{
				this.orders.type = this.waitState.type;
				this.waitState.timer = 0;
				return;
			}

			this.waitState.timer++;
		},

		/**
		 * Once the first Civilian has reached the destination,
		 * the whole platoon stops.
		 * 
		 * Additionally, the Civilian will occupy a series of 
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

			//if(nav.multiType)
			//	nav.deleteMarker(game.currentTerrainMapPassableGrid, this.path);

			if(debug.logSync)
			{
				logs.silentLog("Civilian standing " + this.x + " " +  this.y);
				logs.syncLog("Civilian standing " + this.x + " " +  this.y);
			}

			renderer.applyCamouflage(this);

			this.setFixedAnimation(0);

			//this.retreating = false;

			if(this.state.roaming)
			{
				this.waitState.type = "roam";
				this.orders.type = "waitTo";
			}
			else if(this.state.attacking)
			{
				// Set straight away if attacking
				// for other vehicles
				//cells.set(game.currentTerrainMapPassableGrid);

				for(var i = 0; i < game.items.length; i++)
				{
					if(!game.items[i])
						continue;

					if(!game.items[i].state)
						continue;

					if(!game.items[i].state.attacking)
						continue;

					if(game.items[i].team != this.team)
						continue;

					if(!game.items[i].isArmy)
						continue;

					if(game.items[i].target != this.target)
						continue;

					if(game.items[i].orders.type == "firing" || game.items[i].orders.type == "fire")
						continue;

					if(game.items[i] == this)
						continue;
					
					game.items[i].orders.type = "moveTo";
					game.items[i].state.attacking = true;
				}
				
				this.orders.type = "turnToFire";
			}
			else
			{
				// Resume to original stand state				
				this.orders.type = "stand";
			}
		}, 
		
		/**
		 * Default state of the Civilian
		 */
		stand:function()
		{
							
		},

		noPath:function()
		{
			this.state.attacking = false;
			this.orders.type = "standing";
		},

		zeroPath:function()
		{
			this.state.attacking = false;
		},

		onPath:function(path)
		{
			this.path = path;

			//if(nav.multiType)
				nav.createMarkers(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);

			this.nextStep = undefined;

			if(debug.logCivilian)
			{
				console.log("On Path");
				console.log(this.state.attacking);
				console.log(path.length);
			}

			if (path.length>1)
			{					
				this.orders.type = "turning";
			}
			else
			{
				if(this.state.attacking)
				{						
					this.orders.type = "attacking";
				}
				else
				{
					this.orders.type = "moving";
				}
			}
		},
		
		// searchForNearTargets:function()
		// {
		// 	var targets = findTypeSortedTargets(
		// 		this.team,
		// 		this.type,
		// 		this.radius,
		// 		this.attackRange,
		// 		this.exclusionRange,
		// 		this.x,
		// 		this.y);

		// 	return targets;
		// },

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

			newDestination.vel.setMag(norm + 0.5); 

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

		removeCivilianFromTheCellTile()
		{
			cells.remove(
				this.uid,				
				game.currentTerrainMapPassableGrid,
				this.cellCollisionMode);
		},

		checkForThresholds()
		{
			for(var i = 0; i < game.items.length; i++)
			{
				if(game.items[i].type != "thresholds")
					continue;

				game.items[i].collide(this, this.x * game.gridSize, this.y * game.gridSize)
			}
		},

		steering:function()
		{
			this.hasCollided = false;
			this.hasCollidedSkin = false;
			this.hasCollidedStop = false;

			vehiclesFound = physics.queryArmy(this.near);

			if(vehiclesFound && vehiclesFound.length > 0)
			{	
				var nearByItems = [];

				for(var i = 0; i < vehiclesFound.length; i++)
				{
					if(vehiclesFound[i].uid == this.uid)
						continue;

					var item = game.items[lookup.get(vehiclesFound[i].uid)];

					if(item.type == "Civilian")
						continue;

					nearByItems.push(item);
				}

				if(nearByItems.length == 0)
					return;				

				var collidedItems = physics.detect(this, nearByItems, "skin", "skin");

				for(var i = 0; i < collidedItems.length; i++)
				{
					// if(this.target == undefined)
					// {
						if(this.orders.to)
						{
							if(collidedItems[i].orders.to)
							{
								if(this.orders.to.id == collidedItems[i].orders.to.id &&
									collidedItems[i].orders.type == "stand" ||
									collidedItems[i].orders.type == "standing" ||
									collidedItems[i].orders.type == "turningToStand")
								{
									// Set to standing if the group as the same destination and
									// is stand or standing,
									// except if the target is undefined

									this.state.attacking = false;
									this.orders.type = "standing";

									return;
								}
							}
						}
					//}
				}

				// for(var i = 0; i < collidedItems.length; i++)
				// {
				// 	this.hasCollidedSkin = true;

				// 	var furtherVehicle = findLongestPath(this, collidedItems[i]);

				// 	if(furtherVehicle)
				// 	{						
				// 		if(this.uid == furtherVehicle.uid)
				// 		{	
				// 			if(isMoving(this) && isMoving(collidedItems[i]))
				// 			{
				// 				if(collidedItems[i].speed < this.speed)
				// 				{
				// 					this.decelerate();
				// 					this.state.detouring = true;
				// 					return;
				// 				}
				// 			}
				// 		}						
				// 	}

				// 	if(furtherVehicle)
				// 	{
				// 		if(this.uid == furtherVehicle.uid)
				// 		{	
				// 			if(isMoving(this) && isMoving(collidedItems[i]))
				// 			{
				// 				this.decelerate();
				// 				this.state.detouring = true;
				// 				return;
				// 			}
				// 		}
				// 	}

				// 	var collidedBodyItems = physics.detect(this, nearByItems, "body", "body");

				// 	for(var j = 0; j < collidedBodyItems.length; j++)
				// 	{
				// 		this.hasCollided = true;

				// 		var furtherVehicleBody = findLongestPath(this, collidedBodyItems[j]);

				// 		if(this.state.attacking)
				// 		{
				// 			if(furtherVehicleBody)
				// 			{
				// 				if(this.uid == furtherVehicleBody.uid)
				// 				{									
				// 					this.stop();
				// 				}
				// 			}
				// 		}
				// 		else
				// 		{
				// 			if(furtherVehicleBody)
				// 			{
				// 				if(this.uid == furtherVehicleBody.uid)
				// 				{									
				// 					this.stop();
				// 				}
				// 			}
				// 		}
				// 	}		
				// }
			}
		},

		accelerate:function()
		{
			
		},

		decelerate:function()
		{

		},

		stop:function()
		{
			//this.accelerationIndex = this.accelerationFactor.length - 1;
		},

		takeDamage:function(damage)
		{
			this.life = this.life - damage;

			this.lifeBarSprite.scale.set(1, 1);
			this.lifeBarSprite.scale.set(this.pixelWidth * this.life / this.hitPoints / 100, 4 / 100);

			this.lifeBarBorderSprite.scale.set(this.life / this.hitPoints, 1);

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

				//nav.deleteMarkers(this.cellCollisionMode, game.currentTerrainMapPassableGrid, this.path);

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
			var newTarget = findClosestGroundTarget(
				this,
				this.team,
				this.near);
				
			if(!newTarget)
			{
				this.state.attacking = false;
				this.target = undefined;

				// No target found when searching for new target
				// Set to standing

				this.orders.type = "standing";
				return;
			}
			
			if(newTarget)
			{				
				console.log("new target found");
				this.orders.type = "moveTo";
				this.state.attacking = true;
				this.target = newTarget;
				return;
			}
		},
		
		draw:function()
		{
            if(this.orders.type != "stand" && this.orders.type != "firing" && this.orders.type != "waitTo" && !(this.waitForThreshold))
				this.animate();

			this.animateCollision();

			if(this.bullet)
				this.animateBullet();

			if (this.selected)
			{
				this.drawSelection();
				this.drawLifeBar();
				this.drawPath();
				this.drawDebugPath();
			}

			if(game.cncDisplay)
			{
				this.drawIcon();
			}

			if(game.radarTotal > 0)
				this.drawMiniMapMarker();
		},
		
		/**
		 * Creates the skin collision
		 * 
		 * Creates the body collision 
		 */
		 createPolygon()
		 {
			/*var tempTexture = renderer.texturesMap.get(this.team + "_" + this.name)[0];			

			this.body = [];
			this.skin = [];
			this.bodyLineColor = 0xFFFFFF;
			var a = this.direction * 22.5 * Math.PI / 180;
			var cosAngle = Math.cos(a);
			var sinAngle = Math.sin(a);

			this.body.push(-tempTexture.width / 2 * cosAngle - -tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.body.push(-tempTexture.width / 2 * sinAngle + -tempTexture.height / 2 * cosAngle + this.sprite.y);
			this.body.push(+tempTexture.width / 2 * cosAngle - -tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.body.push(+tempTexture.width / 2 * sinAngle + -tempTexture.height / 2 * cosAngle + this.sprite.y);
			this.body.push(+tempTexture.width / 2 * cosAngle - +tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.body.push(+tempTexture.width / 2 * sinAngle + +tempTexture.height / 2 * cosAngle + this.sprite.y);
			this.body.push(-tempTexture.width / 2 * cosAngle - +tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.body.push(-tempTexture.width / 2 * sinAngle + +tempTexture.height / 2 * cosAngle + this.sprite.y);

			this.skin.push(-tempTexture.width / 2 * cosAngle - -tempTexture.height / 2 * sinAngle + this.sprite.x - 8);
			this.skin.push(-tempTexture.width / 2 * sinAngle + -tempTexture.height / 2 * cosAngle + this.sprite.y - 8);
			this.skin.push(+tempTexture.width / 2 * cosAngle - -tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.skin.push(+tempTexture.width / 2 * sinAngle + -tempTexture.height / 2 * cosAngle + this.sprite.y);
			this.skin.push(+tempTexture.width / 2 * cosAngle - +tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.skin.push(+tempTexture.width / 2 * sinAngle + +tempTexture.height / 2 * cosAngle + this.sprite.y);
			this.skin.push(-tempTexture.width / 2 * cosAngle - +tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.skin.push(-tempTexture.width / 2 * sinAngle + +tempTexture.height / 2 * cosAngle + this.sprite.y);*/

			var tempTexture = renderer.texturesMap.get(this.team + "_" + this.name)[0];
			var angle = wrapDirection(Math.round(this.direction),this.directions) * 22.5 * Math.PI / 180;
			var cosAngle = Math.cos(angle);
			var sinAngle = Math.sin(angle);	

			this.body = [];
			this.body.push((-tempTexture.width / 2) * cosAngle * this.scaleInnerCollision); this.body.push((-tempTexture.height / 1) * sinAngle * this.scaleInnerCollision);
			this.body.push((+tempTexture.width / 2) * cosAngle * this.scaleInnerCollision); this.body.push((-tempTexture.height / 1) * sinAngle * this.scaleInnerCollision); 
			this.body.push((+tempTexture.width / 2) * cosAngle * this.scaleInnerCollision); this.body.push((+tempTexture.height / 1) * sinAngle * this.scaleInnerCollision); 
			this.body.push((-tempTexture.width / 2) * cosAngle * this.scaleInnerCollision); this.body.push((+tempTexture.height / 1) * sinAngle * this.scaleInnerCollision);

			this.skin = [];
			this.skin.push((-tempTexture.width / 2) * cosAngle * this.scaleOuterCollision); this.skin.push((-tempTexture.height / 1) * sinAngle * this.scaleOuterCollision);
			this.skin.push((+tempTexture.width / 2) * cosAngle * this.scaleOuterCollision); this.skin.push((-tempTexture.height / 1) * sinAngle * this.scaleOuterCollision); 
			this.skin.push((+tempTexture.width / 2) * cosAngle * this.scaleOuterCollision); this.skin.push((+tempTexture.height / 1) * sinAngle * this.scaleOuterCollision); 
			this.skin.push((-tempTexture.width / 2) * cosAngle * this.scaleOuterCollision); this.skin.push((+tempTexture.height / 1) * sinAngle * this.scaleOuterCollision);

			this.vision = [];
			this.vision.push((-tempTexture.width / 2) * cosAngle * 1.0); this.vision.push((-tempTexture.height / 2) * sinAngle * 1.0);
			this.vision.push((+tempTexture.width / 2) * cosAngle * 1.0); this.vision.push((-tempTexture.height / 2) * sinAngle * 1.0); 
			this.vision.push((+tempTexture.width / 2) * cosAngle * 1.0); this.vision.push((+tempTexture.height / 2) * sinAngle * 1.0); 
			this.vision.push((-tempTexture.width / 2) * cosAngle * 1.0); this.vision.push((+tempTexture.height / 2) * sinAngle * 1.0);

			this.near = new QuadTree.Boundary();
		 },
        
        animate:function()
        {
            if((this.animationSpeed % Math.round(this.animationSpeedLimit / framerate.delta)) == 0)
            {
                if(this.animationCount < this.animationLimit)
                {	
					this.animationDirection = wrapAnimationDirection(
						Math.round(this.direction),this.directions,
						this.animationCount);

					this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
						[this.animationDirection];

                    this.animationCount++;
                }
                else
                {
                    this.animationCount = 0;
                }
            }   
            
			this.animationSpeed++;
		},

		animateCollision:function()
        {
			if(this.direction == undefined)
				console.log("this.direction is undefined");

			var tempTexture = renderer.texturesMap.get(this.team + "_" + this.name)[0];
			var angle = wrapDirection(Math.round(this.direction),this.directions) * 45 * Math.PI / 180;
			var cosAngle = Math.cos(angle);
			var sinAngle = Math.sin(angle);

			// this.body[0] = -tempTexture.width / 2 * cosAngle - -tempTexture.height / 2 * sinAngle + this.sprite.x;
			// this.body[1] = -tempTexture.width / 2 * sinAngle + -tempTexture.height / 2 * cosAngle + this.sprite.y;
			// this.body[2] = +tempTexture.width / 2 * cosAngle - -tempTexture.height / 2 * sinAngle + this.sprite.x;
			// this.body[3] = +tempTexture.width / 2 * sinAngle + -tempTexture.height / 2 * cosAngle + this.sprite.y;
			// this.body[4] = +tempTexture.width / 2 * cosAngle - +tempTexture.height / 2 * sinAngle + this.sprite.x;
			// this.body[5] = +tempTexture.width / 2 * sinAngle + +tempTexture.height / 2 * cosAngle + this.sprite.y;
			// this.body[6] = -tempTexture.width / 2 * cosAngle - +tempTexture.height / 2 * sinAngle + this.sprite.x;
			// this.body[7] = -tempTexture.width / 2 * sinAngle + +tempTexture.height / 2 * cosAngle + this.sprite.y;
			
			// var skinOffset = 16;
			// this.skin[0] = -(tempTexture.width + skinOffset) / 2 * cosAngle - -(tempTexture.height + skinOffset) / 2 * sinAngle + this.sprite.x;
			// this.skin[1] = -(tempTexture.width + skinOffset) / 2 * sinAngle + -(tempTexture.height + skinOffset) / 2 * cosAngle + this.sprite.y;
			// this.skin[2] = +(tempTexture.width + skinOffset) / 2 * cosAngle - -(tempTexture.height + skinOffset) / 2 * sinAngle + this.sprite.x;
			// this.skin[3] = +(tempTexture.width + skinOffset) / 2 * sinAngle + -(tempTexture.height + skinOffset) / 2 * cosAngle + this.sprite.y;
			// this.skin[4] = +(tempTexture.width + skinOffset) / 2 * cosAngle - +(tempTexture.height + skinOffset) / 2 * sinAngle + this.sprite.x;
			// this.skin[5] = +(tempTexture.width + skinOffset) / 2 * sinAngle + +(tempTexture.height + skinOffset) / 2 * cosAngle + this.sprite.y;
			// this.skin[6] = -(tempTexture.width + skinOffset) / 2 * cosAngle - +(tempTexture.height + skinOffset) / 2 * sinAngle + this.sprite.x;
			// this.skin[7] = -(tempTexture.width + skinOffset) / 2 * sinAngle + +(tempTexture.height + skinOffset) / 2 * cosAngle + this.sprite.y;

			var translateX = this.x * game.gridSize;
			var translateY = this.y * game.gridSize + 80;

			this.body[0] = (-tempTexture.width / 2 * cosAngle * this.scaleInnerCollision) - (-tempTexture.height / 2 * sinAngle * this.scaleInnerCollision) + this.x * game.gridSize;
			this.body[1] = (-tempTexture.width / 2 * sinAngle * this.scaleInnerCollision) + (-tempTexture.height / 2 * cosAngle * this.scaleInnerCollision) + this.y * game.gridSize + 80;
			this.body[2] = (+tempTexture.width / 2 * cosAngle * this.scaleInnerCollision) - (-tempTexture.height / 2 * sinAngle * this.scaleInnerCollision) + this.x * game.gridSize;
			this.body[3] = (+tempTexture.width / 2 * sinAngle * this.scaleInnerCollision) + (-tempTexture.height / 2 * cosAngle * this.scaleInnerCollision) + this.y * game.gridSize + 80; 
			this.body[4] = (+tempTexture.width / 2 * cosAngle * this.scaleInnerCollision) - (+tempTexture.height / 2 * sinAngle * this.scaleInnerCollision) + this.x * game.gridSize;
			this.body[5] = (+tempTexture.width / 2 * sinAngle * this.scaleInnerCollision) + (+tempTexture.height / 2 * cosAngle * this.scaleInnerCollision) + this.y * game.gridSize + 80;
			this.body[6] = (-tempTexture.width / 2 * cosAngle * this.scaleInnerCollision) - (+tempTexture.height / 2 * sinAngle * this.scaleInnerCollision) + this.x * game.gridSize;
			this.body[7] = (-tempTexture.width / 2 * sinAngle * this.scaleInnerCollision) + (+tempTexture.height / 2 * cosAngle * this.scaleInnerCollision) + this.y * game.gridSize + 80;

			this.skin[0] = (-tempTexture.width / 2 * cosAngle * this.scaleOuterCollision) - (-tempTexture.height / 2 * sinAngle * this.scaleOuterCollision) + this.x * game.gridSize;
			this.skin[1] = (-tempTexture.width / 2 * sinAngle * this.scaleOuterCollision) + (-tempTexture.height / 2 * cosAngle * this.scaleOuterCollision) + this.y * game.gridSize + 80;
			this.skin[2] = (+tempTexture.width / 2 * cosAngle * this.scaleOuterCollision) - (-tempTexture.height / 2 * sinAngle * this.scaleOuterCollision) + this.x * game.gridSize;
			this.skin[3] = (+tempTexture.width / 2 * sinAngle * this.scaleOuterCollision) + (-tempTexture.height / 2 * cosAngle * this.scaleOuterCollision) + this.y * game.gridSize + 80; 
			this.skin[4] = (+tempTexture.width / 2 * cosAngle * this.scaleOuterCollision) - (+tempTexture.height / 2 * sinAngle * this.scaleOuterCollision) + this.x * game.gridSize;
			this.skin[5] = (+tempTexture.width / 2 * sinAngle * this.scaleOuterCollision) + (+tempTexture.height / 2 * cosAngle * this.scaleOuterCollision) + this.y * game.gridSize + 80;
			this.skin[6] = (-tempTexture.width / 2 * cosAngle * this.scaleOuterCollision) - (+tempTexture.height / 2 * sinAngle * this.scaleOuterCollision) + this.x * game.gridSize;
			this.skin[7] = (-tempTexture.width / 2 * sinAngle * this.scaleOuterCollision) + (+tempTexture.height / 2 * cosAngle * this.scaleOuterCollision) + this.y * game.gridSize + 80;

			this.vision[0] = ((-tempTexture.width - 40) / 2 * cosAngle * 1.0) - ((-tempTexture.height - 40) / 2 * sinAngle * 1.0) + this.x * game.gridSize;
			this.vision[1] = ((-tempTexture.width - 40) / 2 * sinAngle * 1.0) + ((-tempTexture.height - 40) / 2 * cosAngle * 1.0) + this.y * game.gridSize + 80;
			this.vision[2] = ((+tempTexture.width + 40) / 2 * cosAngle * 1.0) - ((-tempTexture.height - 40) / 2 * sinAngle * 1.0) + this.x * game.gridSize;
			this.vision[3] = ((+tempTexture.width + 40) / 2 * sinAngle * 1.0) + ((-tempTexture.height - 40) / 2 * cosAngle * 1.0) + this.y * game.gridSize + 80; 
			this.vision[4] = ((+tempTexture.width + 40) / 2 * cosAngle * 1.0) - ((+tempTexture.height - 40) / 2 * sinAngle * 1.0) + this.x * game.gridSize;
			this.vision[5] = ((+tempTexture.width + 40) / 2 * sinAngle * 1.0) + ((+tempTexture.height - 40) / 2 * cosAngle * 1.0) + this.y * game.gridSize + 80; 
			this.vision[6] = ((-tempTexture.width - 40) / 2 * cosAngle * 1.0) - ((+tempTexture.height - 40) / 2 * sinAngle * 1.0) + this.x * game.gridSize;
			this.vision[7] = ((-tempTexture.width - 40) / 2 * sinAngle * 1.0) + ((+tempTexture.height - 40) / 2 * cosAngle * 1.0) + this.y * game.gridSize + 80;

			this.near.x = translateX - 100;
			this.near.y = translateY - 100;
			this.near.w = this.near.x + 200;
			this.near.h = this.near.y + 200;
			
			this.bodyCollision.clear();
			this.skinCollision.clear();
			this.visionCollision.clear();
			this.nearCollision.clear();

			if(keyboard.collisionDebug)
			{	
				if(this.hasCollided)
				{
					this.bodyCollision.lineStyle(1, 0xFFFF00, 1);
					this.skinCollision.lineStyle(1, 0xFF0000, 1);
					this.visionCollision.lineStyle(1, 0xB200FF, 1);
					this.nearCollision.lineStyle(1, 0x00FFB2, 1);
				}
				else
				{
					this.bodyCollision.lineStyle(1, 0x00FF00, 1);
					this.skinCollision.lineStyle(1, 0x0000FF, 1);
					this.visionCollision.lineStyle(1, 0xFF00B2, 1);
					this.nearCollision.lineStyle(1, 0x00FFB2, 1);
				}

				// renderer.drawPolygon(this.bodyCollision, this.body, game.offsetX, game.offsetY);
				// renderer.drawPolygon(this.skinCollision, this.skin, game.offsetX, game.offsetY);
				// renderer.drawPolygon(this.visionCollision, this.vision, game.offsetX, game.offsetY);
				// renderer.drawRectangle(this.nearCollision, this.near, 200, 200, game.offsetX, game.offsetY);
			}
		},
		
		animateBullet:function()
		{
			if(this.bullet.update)
				this.bullet.update();

			if(this.bullet.animate)
				this.bullet.animate();
		},

		setFixedAnimation(frame)
		{
			this.animationDirection = wrapAnimationDirection(
				Math.round(this.direction),this.directions,	frame);

			this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
				[this.animationDirection];
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

			var angle = (wrapDirection(invertDirection(Math.round(this.direction), this.directions),this.directions) * 45 * Math.PI / 180);
			
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
			this.pathCNCLine.clear();

			if(this.path && this.path.length > 0)
			{				
				this.pathCNCLine.moveTo(this.sprite.x, this.sprite.y);

				for(var i = 0; i < this.path.length; i++)
				{
					this.pathCNCLine.lineStyle(1, 0xFFFFFF)
						.lineTo((this.path[i].x * 20 - game.offsetX) + 0.5, (this.path[i].y * 20 + 80 - game.offsetY) + 0.5);
				}
			}
		},

		drawDebugPath:function()
		{
			this.pathLine.clear();

			if(this.path && this.path.length > 0)
			{				
				this.pathLine.moveTo(this.sprite.x, this.sprite.y);

				for(var i = 0; i < this.path.length; i++)
				{
					this.pathLine.lineStyle(1, 0x0000FF)
						.lineTo((this.path[i].x * 20 - game.offsetX) + 0.5, (this.path[i].y * 20 + 80 - game.offsetY) + 0.5);
				}
			}
		},

		allCivilianStand:function()
		{
			for(var i = 0; i < game.items.length; i++)
			{
				if(game.items[i].type == "Civilian")
				{
					game.items[i].orders = {type:"stand"};
				}
			}
		},

		resetState:function()
		{
			this.state.attacking = false;
            this.state.firing= false;
            this.state.retreating = false;
            this.state.capturing = false;
            this.state.extracting = false;
            this.state.flying = false;
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

		teleport:function(x, y)
		{
			this.removeCivilianFromTheCellTile();

			this.x = x;
			this.y = y;

			this.sprite.x = this.x * game.gridSize - game.offsetX;
			this.sprite.y = this.y * game.gridSize - game.offsetY + display.maininterface.mapImageYOffset;

			cells.add(this.uid, this.x,this.y,this.radius / game.gridSize,
				game.currentTerrainMapPassableGrid,
				this.cellCollisionMode);
		}
	}
}
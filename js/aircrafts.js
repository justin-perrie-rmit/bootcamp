var aircrafts =
{
	list:
	{
        "apache":
		{
			name:"apache",
			canAttack:true,
			hitPoints:100,
			pixelWidth:20,
			weaponType:"bullet",
			soundType:"bullet1",
			targetThreshold:0.1,
			reloadTime:60,
			radius:15,
            frames:32,
			sight:8,
            speed:8,
			limit:840,
			wait:false,
			done:false,
			canTakeOff:false,
			canLand:false,
			canLandOnHelipad:true,
			takeOffspeed:1,
			landingSpeed:1,
			topSpeed:12,
			groundSpeed:2,
			turnSpeed:4,
			animation:true,
            animationCount:1,
            animationLimit:2,
            animationSpeed:0,
            animationSpeedLimit:2,
            animationSlowSpeed:0,
            animationSlowSpeedLimit:30,
			takeOffLandingOffset:16,
			deployUid:undefined,
            direction:8,
			directions:8,
			passableGrid:[
				[1]
			],
			circleIndex:0,
			circleCounter:0,
			circlePaths:[
				{x:0,y:-3,speed:8},
				{x:3,y:-3,speed:8},
				{x:3,y:0,speed:8},
				{x:3,y:3,speed:8},
				{x:0,y:3,speed:8},
				{x:-3,y:3,speed:8},
				{x:-3,y:0,speed:8},
				{x:-3,y:-3,speed:8},
			],
			vision:128,
			visionGridX:8,
			visionGridY:8,
			visionGrid:undefined,
		},
		"jet":
		{
			name:"jet",
			canAttack:true,
			canTargetAir:true,
			hitPoints:100,
			pixelWidth:20,
			radius:15,
            frames:16,
			sight:12,
			limit:480,
			wait:false,
			done:false,
			weaponType:"rocket",
			soundType:"heatseeker2",
			reloadTime:120,
			targetThreshold:0.05,
			weaponSpeed:12,
			canTakeOff:true,
			canLand:true,
			canLandOnHelipad:false,
			takeOffspeed:1,
			landingSpeed:1,
			topSpeed:24,
			attackSpeed:36,
			groundSpeed:6,
			turnSpeed:8,
			animation:true,
            animationCount:0,
            animationLimit:1,
            animationSpeed:0,
            animationSpeedLimit:2,
            animationSlowSpeed:0,
            animationSlowSpeedLimit:30,
			direction:8,
            directions:8,
			deployUid:undefined,
			takeOffLandingOffset:8,
			passableGrid:[
				[1]
			],
			circleIndex:0,
			circleCounter:0,
			circlePaths:[
				{x:0,y:-3,speed:8},
				{x:3,y:-3,speed:8},
				{x:3,y:0,speed:8},
				{x:3,y:3,speed:8},
				{x:0,y:3,speed:8},
				{x:-3,y:3,speed:8},
				{x:-3,y:0,speed:8},
				{x:-3,y:-3,speed:8},
			],
			vision:98,
			visionGridX:8,
			visionGridY:8,
			visionGrid:undefined,
        },
		"bomber":
		{
			name:"bomber",
			canAttack:true,
			hitPoints:100,
			pixelWidth:20,
			radius:15,
            frames:16,
			speed:12,
			sight:12,
			limit:480,
			wait:false,
			done:false,
			weaponType:"bomb",
			soundType:"heatseeker2",
			targetThreshold:0.05,
			reloadTime:300,
			weaponSpeed:4,
			canTakeOff:true,
			canLand:true,
			canLandOnHelipad:false,
			takeOffspeed:1,
			landingSpeed:1,
			topSpeed:12,
			groundSpeed:6,
			turnSpeed:4,
			animation:true,
            animationCount:0,
            animationLimit:1,
            animationSpeed:0,
            animationSpeedLimit:2,
            animationSlowSpeed:0,
            animationSlowSpeedLimit:30,
			direction:8,
            directions:8,
			deployUid:undefined,
			takeOffLandingOffset:8,
			passableGrid:[
				[1]
			],
			circleIndex:0,
			circleCounter:0,
			circlePaths:[
				{x:0,y:-3,speed:8},
				{x:3,y:-3,speed:8},
				{x:3,y:0,speed:8},
				{x:3,y:3,speed:8},
				{x:0,y:3,speed:8},
				{x:-3,y:3,speed:8},
				{x:-3,y:0,speed:8},
				{x:-3,y:-3,speed:8},
			],
			vision:98,
			visionGridX:8,
			visionGridY:8,
			visionGrid:undefined,
        },
		"transport":
		{
			name:"transport",
			canAttack:false,
			hitPoints:100,
			pixelWidth:20,
			radius:15,
            frames:16,
			speed:12,
			sight:12,
			weaponType:"bomb",
			soundType:"heatseeker2",
			targetThreshold:0.05,
			reloadTime:300,
			weaponSpeed:4,
			canTakeOff:true,
			canLand:true,
			canLandOnHelipad:false,
			takeOffspeed:1,
			landingSpeed:1,
			topSpeed:12,
			groundSpeed:6,
			turnSpeed:4,
			animation:true,
            animationCount:0,
            animationLimit:1,
            animationSpeed:0,
            animationSpeedLimit:2,
            animationSlowSpeed:0,
            animationSlowSpeedLimit:30,
			direction:8,
            directions:8,
			deployUid:undefined,
			takeOffLandingOffset:8,
			passableGrid:[
				[1]
			],
			circleIndex:0,
			circleCounter:0,
			circlePaths:[
				{x:0,y:-3,speed:8},
				{x:3,y:-3,speed:8},
				{x:3,y:0,speed:8},
				{x:3,y:3,speed:8},
				{x:0,y:3,speed:8},
				{x:-3,y:3,speed:8},
				{x:-3,y:0,speed:8},
				{x:-3,y:-3,speed:8},
			],
			vision:98,
			visionGridX:8,
			visionGridY:8,
			visionGrid:undefined,
        }
    },
    defaults:
	{
		animation:"float",
        orders:{type:"float"},
		layer:"air",
		takeOffPosition:undefined,
		currentHangerPosition:undefined,
        lastMovementX:0,
		lastMovementY:0,
		speed:0,
		wayPointX:0,	
		wayPointY:0,
		approachPositionX:0,
		approachPositionY:0,
		distanceFromDestinationSquared:0,	
		reloadTimeLeft:0,
		previousDistance:99999999,
		takingOffCounter:0,
		takingOffIndex:0,
		landingIndex:0,
		hidden:false,
		selected:false,
		selectable:true,
		

        outputTest:function()
        {

		},

		init()
		{
			this.takeOffPosition = {};
		},

		update:function()
		{
			if(this.reloadTimeLeft > 0)
				this.reloadTimeLeft--;

			if(debug.fogOfWar)
				fog.setSubGrid(this.x, this.y, this.visionGrid, this.team, this.state, this.hidden);
		},

		processOrders:function()
		{
            this.lastMovementX = 0;
			this.lastMovementY = 0;

			switch (this.orders.type)
			{
				case "take-off":
					this.takeOff();
					break;
				case "taking-off":
					this.takingOff();
					break;
				case "approaching":
					this.approaching()
					break;
				case "approach":
					// Move towards destination until distance from destination is less aircraft radius
					
					// if(this.state.takingOff)
					// {
					// 	this.state.approaching = true;
					// 	this.orders.type = "take-off";			
					// 	return;							
					// }

					this.approach();
					 
					break;
				case "land":
					this.land();
					break;
				case "landing":
					this.landing();
					break;
				case "fly":
					this.fly();
					break;
				case "circle":
					if(this.state.takingOff)
					{
						if(this.takeOffPath)
						{
							this.orders.type = "take-off";
							return;
						}
					}

					this.circling();
					break;	
				case "attack":
					this.state.attacking = true;

					if(this.state.takingOff)
					{
						this.orders.type = "take-off";			
						return;							
					}

					this.attack(this.orders.to);
					break;
				case "firing":
					this.firing();
					break;
				case "fire":
					this.fire();
					break;
				case "break-away":
					this.breakAway();
					break;
				case "breaking-away":
					this.breakingAway();
					break;
				case "taxi-in":
					this.taxiIn();
					break;
				case "move":
					if(this.state.takingOff)
					{
						this.orders.type = "take-off";			
						return;							
					}					

					this.move();

					break;
				case "moveTo":
					// Move towards destination until distance from destination is less aircraft radius

                    this.moveTo(this.orders.to);
					break;
				
				case "stand":
					
					break;
			}
        },

		attack:function(destination)
		{
			// Target needs to be undefine if the previous
			// target is on the same side

			this.target = target.searchForTarget(destination.target.uid);

			target.addItemToAttackedTarget(this.target.uid, this);

			this.minDistance = Number.MAX_SAFE_INTEGER;

			this.speed = this.attackSpeed;

			// Target's coordinates is based real x and y, not graphical.

			this.orders.to.x = this.orders.to.x * productionInverseRatio;
			this.orders.to.y = this.orders.to.y * productionInverseRatio;

			this.orders.type = "moveTo";
		},

		attacked:function()
		{
			// If the vehicle doesn't want attack anymore,
			// retreat and don't attack back
			if(this.retreating)
				return;

			console.log("attacked");
			
			if(this.orders.type != "fire" && this.orders.type != "firing")
			{	
				target.addItemToAttackedTarget(this.target.uid, this);

				this.orders.type = "firing";
			}
		},

		move:function()
		{
			// Move towards destination until distance from destination is less aircraft radius

			// Orders.to's coordinates is based on graphical x and y, not real.

			this.orders.to.y = this.orders.to.y - display.maininterface.mapImageYOffset * productionRatio;

			this.orders.to.x = this.orders.to.x * productionInverseRatio + game.offsetX;
			this.orders.to.y = this.orders.to.y * productionInverseRatio + game.offsetY;

			this.orders.to.x = this.orders.to.x / game.gridSize;
			this.orders.to.y = this.orders.to.y / game.gridSize;
			
			this.speed = this.topSpeed;

			this.circleCounter = 0;
			this.minDistance = Number.MAX_SAFE_INTEGER;

			this.orders.type = "moveTo";
		},
        
        moveTo:function()
		{
			var distanceFromDestinationSquared = Math.pow(this.orders.to.x -
				this.x, 2) + Math.pow(this.orders.to.y - this.y, 2);
								
			if (distanceFromDestinationSquared < Math.pow(this.radius/(game.gridSize), 2) || distanceFromDestinationSquared > this.minDistance)
			{
				this.circleIndex = Math.round(this.direction);

				if(this.circleIndex == this.directions)
					this.circleIndex = 0;
				
				this.wayPointX = this.circlePaths[this.circleIndex].x + this.x;
				this.wayPointY = this.circlePaths[this.circleIndex].y + this.y;

				this.speed = this.circlePaths[this.circleIndex].speed;

				this.minDistance = Number.MAX_SAFE_INTEGER;

				this.orders.type = "circle";
				return;				
			}
			else
			{
				this.minDistance = distanceFromDestinationSquared;
			}

			this.moving();
		},
		
		moving:function()
		{
			var newDirection = findAngle(this.orders.to,this,this.directions);
			
			// Calculate difference between new direction and current direction
			var difference = angleDiff(this.direction,newDirection,this.directions);
			// Calculate amount that aircraft can turn per animation cycle
			var turnAmount = this.turnSpeed*game.turnSpeedAdjustmentFactor;

			if (Math.abs(difference)>turnAmount)
			{
				// Keep turning
				this.direction = wrapDirection(
					this.direction+turnAmount*Math.abs(difference)/difference,
					this.directions);
			}
			else
			{
				// Move to a new position depended on the previous position, angle and speed
				
				// var movement = this.speed * game.speedAdjustmentFactor*game.deltaAdjustmentFactor;
				//console.log("Speed: " + this.speed);
				var movement = this.speed * game.speedAdjustmentFactor;
				var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI;
				this.lastMovementX = - (movement*Math.sin(angleRadians));
				this.lastMovementY = - (movement*Math.cos(angleRadians));

				// Update the drawing of the sprite
				this.sprite.x = (this.sprite.x +(this.lastMovementX
					* game.gridSize));
				this.sprite.y = (this.sprite.y +(this.lastMovementY
					* game.gridSize));		

				// Update the real coordinates of the sprite
				this.x = (this.x +this.lastMovementX);
				this.y = (this.y +this.lastMovementY);

				if(this.state.attacking)
				{
					if(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) < Math.pow(this.sight, 2))
					{
						console.log("ready to fire");

						this.orders.type = "fire";
					}
				}
			}
		},

		takeOff:function()
		{
			console.log("aircraft taking off");

			var airportIndex = lookup.get(this.deployUid);
			
			if(this.canLandOnHelipad)
			{
				game.items[airportIndex].helipadDeployPosition.uid = undefined;

				this.orders.type = "fly";
			}
			else
			{
				console.log("airportIndex: " + airportIndex);
				console.log("game.items[airportIndex].name: " + game.items[airportIndex].name);
				console.log(game.items[airportIndex].hangerPositions);
				
				for(var i = 0; i < game.items[airportIndex].hangerPositions.length; i++)
				{
					if(!game.items[airportIndex].hangerPositions[i].uid)
						continue;

					if(game.items[airportIndex].hangerPositions[i].uid == this.uid)
					{
						game.items[airportIndex].hangerPositions[i].uid = undefined;
						this.orders.type = "taking-off";
						return;
					}
				}
			}
		},

		takingOff:function()
		{
			var airportIndex = lookup.get(this.deployUid);

			this.distanceFromDestinationSquared = 
				Math.pow(game.items[airportIndex].takeOffPaths[this.currentHangerPosition][this.takingOffIndex].x + game.items[airportIndex].x - this.x, 2) + 
				Math.pow(game.items[airportIndex].takeOffPaths[this.currentHangerPosition][this.takingOffIndex].y + game.items[airportIndex].y - this.y, 2);

			if(this.distanceFromDestinationSquared < 0.01)
			{
				this.previousDistance = game.bigNumber;

				this.direction = game.items[airportIndex].takeOffPaths[this.currentHangerPosition][this.takingOffIndex].direction;
				this.takeOffspeed = game.items[airportIndex].takeOffPaths[this.currentHangerPosition][this.takingOffIndex].speed;
				this.takingOffIndex++;

				if(this.takingOffIndex == game.items[airportIndex].takeOffPaths[this.currentHangerPosition].length)
				{
					this.orders.type = "fly";
				}
				return;				
			}
			else if(this.distanceFromDestinationSquared > this.previousDistance)
			{
				this.previousDistance = game.bigNumber;

				this.direction = game.items[airportIndex].takeOffPaths[this.currentHangerPosition][this.takingOffIndex].direction;
				this.takeOffspeed = game.items[airportIndex].takeOffPaths[this.currentHangerPosition][this.takingOffIndex].speed;
				this.takingOffIndex++;

				if(this.takingOffIndex == game.items[airportIndex].takeOffPaths[this.currentHangerPosition].length)
				{
					this.orders.type = "fly";
				}
				return;	
			}

			this.previousDistance = this.distanceFromDestinationSquared;

			this.takingOffCounter++;
			
			// Move to a new position depended on the previous position, angle and speed
			var movement = this.takeOffspeed*game.speedAdjustmentFactor;

			//var movement = this.takeOffspeed*game.speedAdjustmentFactor;
			var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI;
			this.lastMovementX = - (movement*Math.sin(angleRadians));
			this.lastMovementY = - (movement*Math.cos(angleRadians));

			// Update the drawing of the sprite
			this.sprite.x = (this.sprite.x +(this.lastMovementX
				* game.gridSize));
			this.sprite.y = (this.sprite.y +(this.lastMovementY
				* game.gridSize));

			// Update the real coordinates of the sprite
			this.x = (this.x +this.lastMovementX);
			this.y = (this.y +this.lastMovementY);
		},

		fly:function()
		{	
			if(this.state.attacking)
				this.orders.type = "attack";
			else
				this.orders.type = "move";

			this.state.flying = true;
			this.state.retreating = false;
			this.state.takingOff = false;
			this.state.landing = false;
			this.takingOffCounter = 0;
			this.takingOffIndex = 0;
			this.animation = true;
		},

		circling:function()
		{
			var distanceFromDestinationSquared = Math.pow(this.wayPointX - this.x, 2) + Math.pow(this.wayPointY - this.y, 2);
								
			if (distanceFromDestinationSquared < Math.pow(this.radius/(game.gridSize), 2) || distanceFromDestinationSquared > this.minDistance)
			{
				this.speed = this.circlePaths[this.circleIndex].speed;

				this.direction = wrapDirection(
					this.direction+1, this.directions);

				this.circleIndex++;

				if(this.circleIndex == this.circlePaths.length)
				{					
					this.circleIndex = 0;
				}

				this.wayPointX = this.circlePaths[this.circleIndex].x + this.x;
				this.wayPointY = this.circlePaths[this.circleIndex].y + this.y;

				this.minDistance = Number.MAX_SAFE_INTEGER;

				return;
			}
			else
			{
				this.minDistance = distanceFromDestinationSquared;
			}

			// if(distanceFromDestinationSquared > this.previousDistance)
			// {
			// 	this.speed = this.circlePaths[this.circleIndex].speed;

			// 	this.direction = wrapDirection(
			// 		this.direction+1, this.directions);

			// 	this.circleIndex++;

			// 	if(this.circleIndex == this.circlePaths.length)
			// 	{					
			// 		this.circleIndex = 0;
			// 	}

			// 	this.wayPointX = this.circlePaths[this.circleIndex].x + this.x;
			// 	this.wayPointY = this.circlePaths[this.circleIndex].y + this.y;
			// }
			// else
			// {
			// 	this.previousDistance = distanceFromDestinationSquared;
			// }

			// var movement = this.speed*game.speedAdjustmentFactor*game.deltaAdjustmentFactor;;
			var movement = this.speed*game.speedAdjustmentFactor;
			var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI;
			this.lastMovementX = - (movement*Math.sin(angleRadians));
			this.lastMovementY = - (movement*Math.cos(angleRadians));

			// Update the drawing of the sprite
			this.sprite.x = (this.sprite.x +(this.lastMovementX
				* game.gridSize));
			this.sprite.y = (this.sprite.y +(this.lastMovementY
				* game.gridSize));

			if(this.vision)
			{
				this.vision.x = this.sprite.x;
				this.vision.y = this.sprite.y;
			}

			// Update the real coordinates of the sprite
			this.x = (this.x +this.lastMovementX);
			this.y = (this.y +this.lastMovementY);
		},

		firing:function()
		{
			if(this.target.team == this.team)
			{
				alert("this target is the same team")
				this.state.attacking = false;
				this.target = undefined;
				this.orders.type = "standing";

				return;
			}

			if(this.reloadTimeLeft == 0)
			{
				if(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2) >= Math.pow(this.sight, 2))
				{
					this.orders.type = "attack";
				}
				else
				{
					// Target is dead, resume standing
					if(this.target.life <= 0)
					{
						this.target = undefined;
						
						this.state.attacking = false;

						if(this.canLandOnHelipad)
							this.orders.type = "float";
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
			
			if(this.canLandOnHelipad)
				this.orders.type = "firing";
			else
				this.orders.type = "break-away";
		},

		breakAway:function()
		{
			if((this.uid % 2) == 0)
				this.direction = wrapDirection(
					this.direction-1, this.directions);
			else
				this.direction = wrapDirection(
					this.direction+1, this.directions);

			var movement = this.speed*game.speedAdjustmentFactor;
			var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI;
			this.breakAwayToX = - (movement*Math.sin(angleRadians));
			this.breakAwayToY = - (movement*Math.cos(angleRadians));

			this.breakAwayToX = this.breakAwayToX * 40 + this.x;
			this.breakAwayToY = this.breakAwayToY * 40 + this.y;

			this.state.attacking = false;

			this.minDistance = Number.MAX_SAFE_INTEGER;

			this.orders.type = "breaking-away"
		},

		breakingAway:function()
		{
			var distanceFromDestinationSquared = Math.pow(this.breakAwayToX - this.x, 2) + Math.pow(this.breakAwayToY - this.y, 2);

			if (distanceFromDestinationSquared < Math.pow(this.radius/(game.gridSize), 2) || distanceFromDestinationSquared > this.minDistance)
			{
				if(this.circlePaths)
				{
					this.circleIndex = wrapDirection(Math.round(this.direction), this.directions);

					this.wayPointX = this.circlePaths[this.circleIndex].x + this.x;
					this.wayPointY = this.circlePaths[this.circleIndex].y + this.y;

					this.speed = this.circlePaths[this.circleIndex].speed;

					this.minDistance = Number.MAX_SAFE_INTEGER;

					this.orders.type = "circle";
					return;
				}
			}

			var movement = this.speed*game.speedAdjustmentFactor;
			var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI;
			this.lastMovementX = - (movement*Math.sin(angleRadians));
			this.lastMovementY = - (movement*Math.cos(angleRadians));

			// Update the drawing of the sprite
			this.sprite.x = (this.sprite.x +(this.lastMovementX
				* game.gridSize));
			this.sprite.y = (this.sprite.y +(this.lastMovementY
				* game.gridSize));

			if(this.vision)
			{
				this.vision.x = this.sprite.x;
				this.vision.y = this.sprite.y;
			}

			// Update the real coordinates of the sprite
			this.x = (this.x +this.lastMovementX);
			this.y = (this.y +this.lastMovementY);
		},

		approach:function()
		{
			var airport = game.items[lookup.get(this.orders.to.airportUid)];

			if(this.canLandOnHelipad)
			{
				this.approachPositionX = airport.x + airport.helipadApproachPosition.x;
				this.approachPositionY = airport.y + airport.helipadApproachPosition.y;

				this.takeOffPosition.x = airport.x + airport.helipadDeployPosition.x; 
				this.takeOffPosition.y = airport.y + airport.helipadDeployPosition.y;

				this.landingPath = airport.helipadLandingPaths;
				this.takeOffPath = airport.helipadTakeOffPaths;

				this.animation = true;
				this.minDistance = Number.MAX_SAFE_INTEGER;

				this.orders.type = "approaching";
				return;
			}
			else
			{
				this.approachPositionX = airport.x + airport.approachPosition.x;
				this.approachPositionY = airport.y + airport.approachPosition.y;

				for(var j=0; j < airport.hangerPositions.length; j++)
				{
					if(airport.hangerPositions[j].uid == undefined)
					{
						airport.hangerPositions[j].uid = this.uid;

						this.currentHangerPosition = j;
						this.speed = this.topSpeed;
	
						this.takeOffPosition.x = this.orders.to.takeOffPositionX + airport.hangerPositions[j].x; 
						this.takeOffPosition.y = this.orders.to.takeOffPositionY + airport.hangerPositions[j].y; 

						this.animation = true;
						this.minDistance = Number.MAX_SAFE_INTEGER;
		
						this.orders.type = "approaching";
						return;
					}
				}
			}
		},

		approaching:function()
		{
			this.orders.to.x = this.approachPositionX;
			this.orders.to.y = this.approachPositionY;

			var distanceFromDestinationSquared = Math.pow(this.orders.to.x -
				this.x, 2) + Math.pow(this.orders.to.y - this.y, 2);

			if (distanceFromDestinationSquared < Math.pow(this.radius/(game.gridSize), 2) || distanceFromDestinationSquared > this.minDistance)
			{
				this.x = this.approachPositionX;
				this.y = this.approachPositionY;
				this.sprite.x = this.x * game.gridSize - game.offsetX;
				this.sprite.y = this.y * game.gridSize - game.offsetY + display.maininterface.mapImageYOffset;
				this.orders.type = "land";
				return;			
			}
			else
			{
				this.moving();
			}
		},

		land:function()
		{
			this.deployUid = this.orders.to.airportUid

			var airportIndex = lookup.get(this.orders.to.airportUid);
			
			if(this.canLandOnHelipad)
            {
				this.direction = game.items[airportIndex].helipadApproachPosition.direction;
				this.speed = game.items[airportIndex].helipadApproachPosition.speed;
			}
			else
			{
				if(this.landingIndex == game.items[airportIndex].landingPaths[this.currentHangerPosition].length)
				{
					this.landingIndex = 0;
					this.takingOffCounter = 0;
					this.takingOffIndex = 0;
					this.takeOffspeed = 1;
					this.speed = 0;
					this.orders.type = "float";
					this.direction = 0;
					this.state.takingOff = true;
					return;
				}

				this.direction = game.items[airportIndex].landingPaths[this.currentHangerPosition][this.landingIndex].direction;
				this.speed = game.items[airportIndex].landingPaths[this.currentHangerPosition][this.landingIndex].speed;
			}

			this.animation = true;
			this.state.approaching = false;

			if(this.target && this.target.target)
			{
				this.state.retreating = true;
			}

			this.orders.type = "landing";
			return;
		},

		landing:function()
		{			
			var airportIndex = lookup.get(this.orders.to.airportUid);

			console.log(game.items[airportIndex].landingPaths[this.currentHangerPosition][this.landingIndex].x + " " + game.items[airportIndex].landingPaths[this.currentHangerPosition][this.landingIndex].y);

			this.distanceFromDestinationSquared = 
				Math.pow(game.items[airportIndex].landingPaths[this.currentHangerPosition][this.landingIndex].x + game.items[airportIndex].x - this.x, 2) + 
				Math.pow(game.items[airportIndex].landingPaths[this.currentHangerPosition][this.landingIndex].y + game.items[airportIndex].y - this.y, 2);

			if(this.distanceFromDestinationSquared < 0.01)
			{
				this.previousDistance = game.bigNumber;
				this.landingIndex++;
				this.orders.type = "land";

				return;
			}
			else if(this.distanceFromDestinationSquared > this.previousDistance)
			{
				this.previousDistance = game.bigNumber;
				this.landingIndex++;
				this.orders.type = "land";

				return;
			}

			this.previousDistance = this.distanceFromDestinationSquared;

			this.state.landing = true;
			var movement = this.speed*game.speedAdjustmentFactor*framerate.delta;
			var angleRadians = -(Math.round(this.direction)/this.directions)*2*Math.PI;
			this.lastMovementX = - (movement*Math.sin(angleRadians));
			this.lastMovementY = - (movement*Math.cos(angleRadians));

			// Update the drawing of the sprite
			this.sprite.x = (this.sprite.x +(this.lastMovementX
				* game.gridSize));
			this.sprite.y = (this.sprite.y +(this.lastMovementY
				* game.gridSize));

			// Update the real coordinates of the sprite
			this.x = (this.x +this.lastMovementX);
			this.y = (this.y +this.lastMovementY);
		},

		takeDamage:function(damage)
		{
			this.life = 0;

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
		
		draw:function()
		{            
			this.animate();			
			
			if (this.selected)
			{
				this.drawSelection();
				this.drawLifeBar();
			}

			if(game.radarTotal > 0)
				this.drawMiniMapMarker();
        },
        
        animate:function()
        {			
			if(this.animation)
			{
				if((this.animationSpeed % this.animationSpeedLimit) == 0)
				{
					if(this.animationCount < this.animationLimit)
					{
						if(this.speed < this.groundSpeed)
						{	this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
								[wrapAnimationDirection(Math.round(this.direction),this.directions,
								this.animationCount)];
							
						}          
						else
						{
							this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
								[wrapAnimationDirection(Math.round(this.direction),this.directions,
								this.animationCount)+this.takeOffLandingOffset];	
						}
	
						this.animationCount++;
					}
					else
					{
						this.animationCount = 0;
					}
				}
			}
			else
			{
				this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
					[this.direction];
			}
            
            this.animationSpeed++;

			if(this.bullet)
				this.animateBullet();
        },

		animateBullet:function()
		{
			if(this.bullet.update)
				this.bullet.update();

			if(this.bullet.animate)
				this.bullet.animate();

			if(this.additionalBullets)
			{
				for(var i = 0; i < this.additionalBullets.length; i++)
				{
					if(this.additionalBullets[i].update)
						this.additionalBullets[i].update();
	
					if(this.additionalBullets[i].animate)
						this.additionalBullets[i].animate();
				}
			}
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

		select:function()
		{
			this.selected = true;

			this.selectionSprite.visible = true;
			this.selectionSprite.scale.set(this.radius / 100, this.radius  / 100);

			this.selectionBorderSprite.visible = true;

			this.lifeBarBorderSprite.visible = true;

			this.lifeBarSprite.visible = true;
			this.lifeBarSprite.scale.set(this.pixelWidth * this.life / this.hitPoints / 100, 4 / 100);
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
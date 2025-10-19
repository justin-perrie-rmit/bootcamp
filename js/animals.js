var animals =
{
	list:
	{
		"seal":
		{
            name:"seal",
			// Properties for drawing the object
            frames:8,
			speed:2,
			radius:1,
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
            direction:1,
            directions:8,
			nextXDirection:[0,1,1,1,0,-1,-1,-1],
			nextYDirection:[-1,-1,0,1,1,1,0,-1],
        }
    },
    defaults:
	{
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
				case "assist":
					this.assist();
					break;
				case "attack":
					this.attack(this.orders.to);
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
				case "attacked":
					this.attacked();
					break;
				case "capture":
					this.capture(this.orders.to);
					break;
				case "captureBuilding":
					this.captureBuilding(this.orders.to);
					break;
				case "load":
					this.load(this.orders.to);
					break;
				case "loading":
					this.loading();
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
					this.moving();
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

		update:function()
		{
			if(this.reloadTimeLeft > 0)
				this.reloadTimeLeft--;

			if(debug.fogOfWar)
				fog.setSubGrid(this.x, this.y, this.visionGrid, this.team, this.state);
		},

		move:function()
		{
			this.orders.type = "moveTo";
		},

		moveTo:function()
		{
			this.start[0] = Math.round(this.x);
			this.start[1] = Math.round(this.y);
			
			this.grid = [...game.currentTerrainMapPassableGrid];
			
			let maxMoveDistance = -1; // Unlimited movement by default
			
			if (this.orders.to && this.orders.to.radius !== undefined) {
				maxMoveDistance = this.orders.to.radius;
			}
			
			let distance = 0;
			
			do
			{
				var nextDirection = generate.randomNumber(this.directions) - 1;
			
				this.end[0] = this.start[0] + this.nextXDirection[nextDirection];
				this.end[1] = this.start[1] + this.nextYDirection[nextDirection];
			
				distance = Math.abs(this.end[0] - this.start[0]) + Math.abs(this.end[1] - this.start[1]); // Manhattan distance
			}
			while (
				this.grid[this.end[1]][this.end[0]] !== flags.CELL_COLLISION_MODE_OFF ||
				(maxMoveDistance >= 0 && distance > maxMoveDistance) // Only check distance if maxMoveDistance is set
			);
			
			this.direction = nextDirection;
			this.nextStep = { x: this.end[0], y: this.end[1] };
			this.orders.type = "moving";			
		},

		moving:function()
		{
			var distanceFromDestinationSquared = Math.pow(this.x -
				this.nextStep.x, 2) + Math.pow(this.y - this.nextStep.y, 2);

			//console.log(distanceFromDestinationSquared);
				
			if(distanceFromDestinationSquared < Math.pow(this.radius/(game.gridSize), 2))
			{
				this.orders.type = "moveTo";
				return;
			}			

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
		},

        stand:function()
		{
			this.orders.type = "move";		
		},

        draw:function()
		{
            if(this.orders.type != "stand" && this.orders.type != "firing")
				this.animate();
		},

        animate:function()
        {
			this.animationDirection = wrapAnimationDirection(
				Math.round(this.direction),this.directions);

			this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
				[this.animationDirection];
            // if((this.animationSpeed % Math.round(this.animationSpeedLimit / framerate.delta)) == 0)
            // {
            //     if(this.animationCount < this.animationLimit)
            //     {	
			// 		this.animationDirection = wrapAnimationDirection(
			// 			Math.round(this.direction),this.directions,
			// 			this.animationCount);

			// 		this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)
			// 			[this.animationDirection];

            //         this.animationCount++;
            //     }
            //     else
            //     {
            //         this.animationCount = 0;
            //     }
            // }   
            
			// this.animationSpeed++;
		},
    }
}
var turrets =
{
	list:
	{
        "laser-tower":
		{
			name:"laser-tower",
			// Properties for drawing the object
            frames:1,
            pixelWidth:20,
			pixelHeight:80,
			baseWidth:20,
			baseHeight:80,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1],
				[1,1],
				[1,1],
				[1,1],
			],
			passableGrid:[
				[1,1],
				[1,1],
				[1,1],
				[1,1]
			],
			sight:3,
    	    totalLife:500,
			cost:1500,
			animationCount:0,
            animationLimit:6,
			reloadTimeLeft:0,
			reloadTimeLimit:60,
			powerUsage:0,
			spriteImages:[
				{name:"healthy",count:1}
			],
        },
        
    },
    defaults:
    {
        type:"turrets",
		target:undefined,
        animationIndex:0,
        direction:0,        
        action:"stand",
        selected:false,
        drawTheLifeBar:false,
        selectable:true,

        outputTest:function()
        {
            console.log(this.name);

			/*var laserSprite = new PIXI.Graphics();

        	renderer.bulletsContainer.addChild(laserSprite);

			laserSprite.lineStyle(1, 0xffffff)
				.moveTo(100, 100)
				.lineTo(400, 600);*/
		},

		processOrders:function()
		{
            switch (this.orders.type)
			{
				case "fire":
					this.fire();
					break;
				case "radiate":
					this.radiate();
					break;
				case "recharge":
					this.recharge();
					break;
				case "stand":
					this.guard();
					break;
            }
        },

		guard:function()
		{
			//console.log(this.sight);

			var target = findGroundTarget(
				this.team,
				this.sight,
				8,
				8,
				this.x,
				this.y);

			if(target)
			{
				this.target = target;
				this.orders.type = "fire";
			}
		},

		fire:function()
		{
			if(!this.laser)
			{	
				var laserIndex = 0;				

				this.laser = {};
				this.laser.name = game.lasers[laserIndex].name;
				this.laser.soundType = game.lasers[laserIndex].soundType;
			}

			this.laser.sprite = renderer.produceStrikeBullet();
			//this.laser.sprite.position.set(this.sprite.x, this.sprite.y);

			// Draw the line (endPoint should be relative to myGraph's position)
			this.laser.sprite.lineStyle(1, 0xff0000)
				.moveTo(this.sprite.x, this.sprite.y - (this.sprite.height / 2))
				.lineTo(this.target.sprite.x, this.target.sprite.y);

			sounds.play(this.laser.soundType);

			renderer.removeItem(this.target);

			this.orders.type = "radiate";
		},

		radiate:function()
		{
			if(this.animationCount < this.animationLimit)
			{
				this.animationCount++;
			}
			else
			{
				renderer.removeLaser(this.laser);
				this.animationCount = 0;
				this.orders.type = "recharge";
			}
		},

		recharge:function()
		{
			if(this.reloadTimeLeft < this.reloadTimeLimit)
			{
				this.reloadTimeLeft++;
			}
			else
			{
				this.reloadTimeLeft = 0;
				this.orders.type = "stand";
			}
		},

        draw:function()
        {
			this.clear();

			if(this.laser)
				this.animateLaser();

			if(this.drawTheLifeBar)
				this.drawLifeBar();

			if (this.selected)
			{
				if(this.team == game.team)
					this.drawSelection();
			}

			/*if(fog.fog_state == fog.STATE.SHRINK || 
				fog.fog_state == fog.STATE.TRANSPARENT)
			{
				if(this.team == game.team)
					renderer.drawExpandingVision(this);
			}*/
        },

        drawSelection:function()
		{			
			this.selectionGraphicBorder.lineStyle(2, styles.selectionBorderColor, 1);
			this.selectionGraphicBorder.drawRect(
				this.sprite.x - this.baseWidth / 2,
				this.sprite.y - this.baseHeight / 2, 
				this.baseWidth, this.baseHeight);			

			this.selectionGraphicBorder.alpha = 0.3;

			this.selectionGraphic.beginFill(styles.selectionFillColor);
			this.selectionGraphic.drawRect(0,0,this.baseWidth, this.baseHeight);
			this.selectionGraphic.endFill();
			this.selectionGraphic.x = this.sprite.x - this.baseWidth / 2;
			this.selectionGraphic.y = this.sprite.y - this.baseHeight / 2;
			//this.selectionGraphic.x = this.sprite.x;
			//this.selectionGraphic.y = this.sprite.y;
			this.selectionGraphic.alpha = 0.2;
		},

		drawLifeBar:function()
		{				
			this.lifeBar.beginFill(styles.lifeBarHealthyFillColor);			
			this.lifeBar.lineStyle(1, styles.lifeBarBorderColor, 1);
			this.lifeBar.drawRect(0, 0, this.baseWidth*this.life/this.totalLife, 4);
			this.lifeBar.endFill();
			
			//this.lifeBar.x = this.sprite.x - this.baseWidth / 2;
			this.lifeBar.x = this.sprite.x;
			//this.lifeBar.y = this.sprite.y - game.lifeBarHeight - 20;
			this.lifeBar.y = this.sprite.y - 20;
			this.lifeBar.alpha = 0.7;
		},

		animateLaser:function()
		{
			if(this.laser.update)
				this.laser.update();

			if(this.laser.animate)
				this.laser.animate();
		},

		clear:function()
		{
			this.lifeBar.clear();
			this.selectionGraphicBorder.clear();
			this.selectionGraphic.clear();            
		}
    }
}
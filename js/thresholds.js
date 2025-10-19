var thresholds =
{
	list:
	{
        "auto_door":
		{
			name:"auto_door",
            frames:4,
            animationCount:3,
            animationLimit:4,
            animationSpeedLimit:30,            
            animationSpeed:0,
            openingTime:0,
            openingTimeLimit:60,
            waiting:new Set(),
            state:"close",
        }
    },
    defaults:
    {
        outputTest:function()
        {
            console.log(this.name);
		},

        update:function()
        {
            for(var i = 0; i < game.items.length; i++)
            {
                if(!game.items[i])
                    continue;

                if((game.items[i].type != "infantry" && game.items[i].type != "vehicles"))
                    continue;
               
                if(game.items[i].x > this.x && game.items[i].y > this.y &&
                    game.items[i].x < this.x + this.sprite.width / 20 &&
                    game.items[i].y < this.y + this.sprite.height / 20)
                {
                    if(this.state == "open")
                    {
                        if(this.waiting.has(game.items[i].uid))
                        {
                            this.waiting.delete(game.items[i].uid);
                            game.items[i].waitForThreshold = false;
                        }
                    }

                    if(this.state == "close")
                    {
                        this.state = "opening";
                    }

                    if(this.state != "open")
                    {
                        if(!this.waiting.has(game.items[i].uid))
                        {
                            this.waiting.add(game.items[i].uid);
                            game.items[i].waitForThreshold = true;
                        }
                    }
                }
            }
        },

        draw:function()
		{
            this.clear();
            
			this.animate();
        },

        animate:function()
        {
            if(this.state == "open")
                this.animateOpen();
            else if(this.state == "opening")
                this.animateOpening();
            else if(this.state == "closing")
                this.animateClosing();
            else if(this.state == "close")
                this.animateClose();
        },

        animateOpen:function()
        {   
            this.sprite.texture = renderer.texturesMap.get(this.name)[0];

            if(this.openingTime == this.openingTimeLimit)
            {
                this.openingTime = 0;
                this.state = "closing";
            }

            this.openingTime++;
        },

        animateClose:function()
        {
            this.sprite.texture = renderer.texturesMap.get(this.name)
                [this.animationLimit-1];
            this.animationCount = 3;
        },

        animateOpening:function()
        {            
            if(this.animationSpeed == 0)
			{
                if(this.animationCount > 0)
                {	
                    this.animationCount--;
                    
                    this.animationSpeed = this.animationSpeedLimit;
                    this.sprite.texture = renderer.texturesMap.get(this.name)
                        [this.animationCount];                

                    
                }
                else
                {
                    this.state = "open";
                    this.animationSpeed = 0;
                }
            }

            this.animationSpeed--;
        },

        animateClosing:function()
        {
            if(this.waiting.size > 0)
            {
                this.state = "open";
                return;
            }

            if((this.animationSpeed % this.animationSpeedLimit) == 0)
			{
                if(this.animationCount < this.animationLimit)
                {	
                    this.sprite.texture = renderer.texturesMap.get(this.name)
                        [this.animationCount];                

                    this.animationCount++;
                }
                else
                {
                    this.openingTime = 0;
                    this.waiting.clear();
                    this.state = "close";
                    this.animationCount = 0;
                    this.animationSpeed = 0;
                }
            }

            this.animationSpeed++;
        },

        createPolygon()
		{
			var tempTexture = renderer.texturesMap.get(this.name)[0];

			this.lockCollision = [];
			this.keyCollision = [];
			this.boxLineColor = 0xFFFFFF;
			var a = this.direction * 22.5 * Math.PI / 180;
			var cosAngle = Math.cos(a);
			var sinAngle = Math.sin(a);

			this.lockCollision.push(-tempTexture.width / 2 * cosAngle - -tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.lockCollision.push(-tempTexture.width / 2 * sinAngle + -tempTexture.height / 2 * cosAngle + this.sprite.y);
			this.lockCollision.push(+tempTexture.width / 2 * cosAngle - -tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.lockCollision.push(+tempTexture.width / 2 * sinAngle + -tempTexture.height / 2 * cosAngle + this.sprite.y);
			this.lockCollision.push(+tempTexture.width / 2 * cosAngle - +tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.lockCollision.push(+tempTexture.width / 2 * sinAngle + +tempTexture.height / 2 * cosAngle + this.sprite.y);
			this.lockCollision.push(-tempTexture.width / 2 * cosAngle - +tempTexture.height / 2 * sinAngle + this.sprite.x);
			this.lockCollision.push(-tempTexture.width / 2 * sinAngle + +tempTexture.height / 2 * cosAngle + this.sprite.y);

            var bubbleOffset = 100;
			this.keyCollision.push(-(tempTexture.width + bubbleOffset) / 2 * cosAngle - -(tempTexture.height + bubbleOffset) / 2 * sinAngle + this.sprite.x);
			this.keyCollision.push(-(tempTexture.width + bubbleOffset) / 2 * sinAngle + -(tempTexture.height + bubbleOffset) / 2 * cosAngle + this.sprite.y);
			this.keyCollision.push(+(tempTexture.width + bubbleOffset) / 2 * cosAngle - -(tempTexture.height + bubbleOffset) / 2 * sinAngle + this.sprite.x);
			this.keyCollision.push(+(tempTexture.width + bubbleOffset) / 2 * sinAngle + -(tempTexture.height + bubbleOffset) / 2 * cosAngle + this.sprite.y);
			this.keyCollision.push(+(tempTexture.width + bubbleOffset) / 2 * cosAngle - +(tempTexture.height + bubbleOffset) / 2 * sinAngle + this.sprite.x);
			this.keyCollision.push(+(tempTexture.width + bubbleOffset) / 2 * sinAngle + +(tempTexture.height + bubbleOffset) / 2 * cosAngle + this.sprite.y);
			this.keyCollision.push(-(tempTexture.width + bubbleOffset) / 2 * cosAngle - +(tempTexture.height + bubbleOffset) / 2 * sinAngle + this.sprite.x);
			this.keyCollision.push(-(tempTexture.width + bubbleOffset) / 2 * sinAngle + +(tempTexture.height + bubbleOffset) / 2 * cosAngle + this.sprite.y);

            console.log(this.lockCollision);
            console.log(this.keyCollision);
		},

        clear:function()
		{
        }
    }
}
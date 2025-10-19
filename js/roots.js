var roots =
{
    list:
	{
        "water-roots":
		{
            name:"water-roots",
			// Properties for drawing the object
            frames:41,
            additionalSprites:[],
            passableGrid:[
				[1,1,1]
			],
            // shadowColor:[0x002860],
			// shadowAngle:45,
			// shadowDistance:5,
            //glowColor:[0x7AC2FF],
            growthCount:1,
            growthDetails:[
                {sprite:1,x:0,y:-1},
                {sprite:22,x:1,y:-1},
                {sprite:13,x:-1,y:-1},
                {sprite:34,x:-1,y:1},
                {sprite:2,x:0,y:1},
                {sprite:2,x:1,y:1},
                {sprite:1,x:0,y:-2,replace:3,e:0},
                {sprite:2,x:0,y:2,replace:4,e:4},
                {sprite:5,x:-2,y:0},
                {sprite:6,x:2,y:0},
                {sprite:5,x:-3,y:0,replace:7,e:8},
                {sprite:6,x:3,y:0,replace:8,e:9},
                {sprite:12,x:-2,y:-2,replace:10,e:2},
                {sprite:12,x:-3,y:-3,replace:10,e:12},
                {sprite:39,x:-2,y:1,replace:37,e:3},
                {sprite:39,x:-3,y:1,replace:40,e:14},
                {sprite:19,x:2,y:-2,replace:18,e:1},
            ]
        }
    },
    defaults:
	{
        type:"roots",

        outputTest:function()
        {
            console.log(this.name);

            
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
				case "attacked":
					this.attacked();
					break;
				case "stand":
					this.stand();
					break;
			}
		},

        attacked:function()
		{
            this.orders.type = "stand";
        },

        stand:function()
        {

        },

        update()
		{
			if((this.growthCount % 50) == 0)
            {
                if(this.growthDetails.length == 0)
                    return;

                //console.log('new growth');

                // renderer.addAdditionSprites(this, this.growthDetails[0]);
                this.growthDetails.splice(0, 1);
            }

            this.growthCount++;
		},
        
        draw:function()
        {
			this.animate();
        },

        animate:function()
        {	
            //this.sprite.texture = renderer.texturesMap.get(this.team + "_" + this.name)[1];
        },
    }
}
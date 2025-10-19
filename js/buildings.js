/**
	This is the Building file for WOS which produces other buildings, units
	and additional game functionality.

	Building is a series of building that can be built.

	Construction Tool can build other buildings.
	Power Stations provide power for the buildings.
	Barracks produces infantry.
	Factory produces vehicles.
	Radar shows the mini map.
	Prospector (likely to be rename to extractor) extracts resources from
	the map. Further, cannot be built from Constructor Tool, comes from
	the vehicle prospector.

	Other buildings are planned.

	Note: Base, Starport, harvester are from the book are intended to be
	removed.

	Guard Turret is intended to be transformed to into similar building.

	Office Building is intended to be expanded to a great unban cities.

*/

var buildings =
{
	list:
	{
        /** All buidlings are hard coded with default	values.

				Each building which is built will have its own individual
				properties, such as uid, x and y positions. These properties
				are either defined in Maps as starting unit or built during
				gameplay from an Construction Tool or prospector.

		*/
		"city":
		{
			name:"city",
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
			powerUsage:0,
			spriteImages:[
				{name:"healthy",count:1}
			]
        },
		"science_post":
		{
			name:"science_post",
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
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			],
			passableGrid: [
				[0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
				[0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			],
			visionGridX:24,
			visionGridY:20,
			visionGrid:undefined,
			sight:3,
    	    totalLife:500,
			cost:5000,
			powerUsage:0,
			spriteImages:[
				{name:"healthy",count:1}
			]
        },
		"barracks":
		{
			name:"barracks",
			produce:"infantry",
			commandable:true,
			// Properties for drawing the object
            frames:1,
            pixelWidth:280,
			pixelHeight:59,
			baseWidth:280,
			baseHeight:180,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid: [
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			],
			passableGrid: [
				[0,0,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,1,1,1,1,1,1,1,0,0,0],
				[0,0,0,1,1,1,1,1,1,1,1,1,1,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[0,0,1,1,1,1,1,1,1,1,1,1,1,0],
				[0,0,0,0,1,1,1,1,1,1,1,1,0,0],
			],
			deployPosition:[
				{x:-2.5,y:8,uid:undefined},{x:-3.5,y:8,uid:undefined},{x:-4.5,y:8,uid:undefined},{x:-5.5,y:8,uid:undefined},{x:-6.5,y:8,uid:undefined},{x:-7.5,y:8,uid:undefined},
				{x:-2.5,y:9,uid:undefined},{x:-3.5,y:9,uid:undefined},{x:-4.5,y:9,uid:undefined},{x:-5.5,y:9,uid:undefined},{x:-6.5,y:9,uid:undefined},{x:-7.5,y:9,uid:undefined},
				{x:-2.5,y:10,uid:undefined},{x:-3.5,y:10,uid:undefined},{x:-4.5,y:10,uid:undefined},{x:-5.5,y:10,uid:undefined},{x:-6.5,y:10,uid:undefined},{x:-7.5,y:10,uid:undefined},
			],
			visionGridX:20,
			visionGridY:16,
			visionGrid:undefined,
			sight:3,
    	    totalLife:500,
			hitPoints:500,
			cost:5000,
			powerUsage:0,
			spriteImages:[
				{name:"healthy",count:1}
			],
			produces:["soldier","grenadier","rocketeer"]
        },
		"construction_tool":
		{
			name:"construction_tool",
			commandable:true,
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
				[1,1,1,1],
				[1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1],
				[1,1,1,1]
			],
			iconColor:0xFFFF00,
			iconShape:"rect",
			visionGridX:36,
			visionGridY:36,
			visionGrid:undefined,
			sight:6,
			vision:120,
    	    totalLife:500,
			hitPoints:500,
			cost:5000,
			armoured:true,
			powerUsage:0,
			powerOutput:0,
			spriteImages:[
				{name:"healthy",count:1}
			],
			produces:["powerplant","barracks","factory","radar","airport","wind_capture"]
		},
		"airport":
		{
			name:"airport",
			airCompatible:true,
			produce:"aircrafts",
			commandable:true,
			defaultProduceFrame:8,
			// Properties for drawing the object
            frames:1,
            pixelWidth:300,
			pixelHeight:59,
			baseWidth:300,
			baseHeight:160,
			pixelOffsetX:0,
			pixelOffsetY:0,
			produces:["apache","jet","bomber"],
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			],
			iconColor:0xFFFF00,
			iconShape:"rect",
			visionGridX:42,
			visionGridY:42,
			visionGrid:undefined,
			numberOfPlanes:0,
			maximumNumberOfPlanes:4,
			hangerPositions:[
				{x:-2.37,y:1.3,uid:undefined},
				{x:-1.5,y:1.3,uid:undefined},
				{x:0.5,y:1.3,uid:undefined},
				{x:1.25,y:1.3,uid:undefined}
			],
			deployIndex:0,
			takeOffPaths:[
				[
					{x:-2.37,y:-3.8,direction:2,speed:2},
					{x:4.9,y:-3.8,direction:3,speed:2},
					{x:5.05,y:0.8,direction:4,speed:2},
					{x:5.05,y:3.55,direction:6,speed:8},
					{x:4.35,y:3.55,direction:6,speed:18},
					{x:1.35,y:3.55,direction:6,speed:24},
					{x:-7.8,y:3.55,direction:6,speed:48}
				],
				[
					{x:-1.5,y:-3.8,direction:2,speed:2},
					{x:4.9,y:-3.8,direction:3,speed:2},
					{x:5.05,y:0.8,direction:4,speed:2},
					{x:5.05,y:3.55,direction:6,speed:8},
					{x:4.35,y:3.55,direction:6,speed:18},
					{x:1.35,y:3.55,direction:6,speed:24},
					{x:-7.8,y:3.55,direction:6,speed:48}
				],
				[
					{x:0.5,y:-3.8,direction:2,speed:2},
					{x:4.9,y:-3.8,direction:3,speed:2},
					{x:5.05,y:0.8,direction:4,speed:2},
					{x:5.05,y:3.55,direction:6,speed:8},
					{x:4.35,y:3.55,direction:6,speed:18},
					{x:1.35,y:3.55,direction:6,speed:24},
					{x:-7.8,y:3.55,direction:6,speed:48}
				],
				[
					{x:1.25,y:-3.8,direction:2,speed:2},
					{x:4.9,y:-3.8,direction:3,speed:2},
					{x:5.05,y:0.8,direction:4,speed:2},
					{x:5.05,y:3.55,direction:6,speed:8},
					{x:4.35,y:3.55,direction:6,speed:18},
					{x:1.35,y:3.55,direction:6,speed:24},
					{x:-7.8,y:3.55,direction:6,speed:48}
				]
			],
			landingPaths:[
				[
					{x:5.0,y:3.6,direction:6,speed:18},
					{x:1.0,y:3.6,direction:6,speed:16},
					{x:-1.0,y:3.6,direction:6,speed:12},
					{x:-2.35,y:3.6,direction:6,speed:8},
					{x:-5.35,y:3.6,direction:6,speed:4},
					{x:-6.35,y:3.6,direction:6,speed:3},
					{x:-7.35,y:3.6,direction:6,speed:2},
					{x:-7.35,y:0.3,direction:0,speed:2},
					{x:-3.0,y:-3.6,direction:1,speed:2},
					{x:-2.4,y:-3.6,direction:2,speed:2},
					{x:-2.37,y:-2.6,direction:4,speed:2},
				],
				[
					{x:12.35,y:3.6,direction:6,speed:18},
					{x:7.35,y:3.6,direction:6,speed:16},
					{x:4.35,y:3.6,direction:6,speed:12},
					{x:1.35,y:3.6,direction:6,speed:8},
					{x:-1.35,y:3.6,direction:6,speed:4},
					{x:-4.35,y:3.6,direction:6,speed:3},
					{x:-7.35,y:3.6,direction:0,speed:2},
					{x:-7.35,y:0.3,direction:1,speed:2},
					{x:-3.1,y:-3.8,direction:2,speed:2},
					{x:-1.5,y:-3.8,direction:4,speed:2},
					{x:-1.5,y:-2.6,direction:0,speed:0}
				],
				[
					{x:12.35,y:3.6,direction:6,speed:18},
					{x:7.35,y:3.6,direction:6,speed:16},
					{x:4.35,y:3.6,direction:6,speed:12},
					{x:1.35,y:3.6,direction:6,speed:8},
					{x:-1.35,y:3.6,direction:6,speed:4},
					{x:-4.35,y:3.6,direction:6,speed:3},
					{x:-7.35,y:3.6,direction:0,speed:2},
					{x:-7.35,y:0.3,direction:1,speed:2},
					{x:-3.1,y:-3.8,direction:2,speed:2},
					{x:0.5,y:-3.8,direction:4,speed:2},
					{x:0.5,y:-2.6,direction:0,speed:0}
				],
				[
					{x:12.35,y:3.6,direction:6,speed:18},
					{x:7.35,y:3.6,direction:6,speed:16},
					{x:4.35,y:3.6,direction:6,speed:12},
					{x:1.35,y:3.6,direction:6,speed:8},
					{x:-1.35,y:3.6,direction:6,speed:4},
					{x:-4.35,y:3.6,direction:6,speed:3},
					{x:-7.35,y:3.6,direction:0,speed:2},
					{x:-7.35,y:0.3,direction:1,speed:2},
					{x:-3.1,y:-3.8,direction:2,speed:2},
					{x:1.25,y:-3.8,direction:4,speed:2},
					{x:1.25,y:-2.6,direction:0,speed:0}
				]
			],
			helipadTakeOffPaths:[
				[
					{time:100,direction:0,speed:1},
					{time:250,direction:0,speed:4},
					{time:400,direction:0,speed:12}
				]
			],
			helipadLandingPaths:[				
				{x:-11.5,y:3,direction:2,speed:4},
				{x:-5.0,y:3,direction:0,speed:4},
				{x:-5.0,y:1.5,direction:0,speed:4},
			],
			approachPosition:
				{x:22.5,y:3.6,direction:14,speed:18},		
			helipadApproachPosition:
				{x:-11.5,y:-1.8,direction:4,speed:4},	
			helipadDeployPosition:
				{x:-5.15,y:5.35,uid:undefined},
			produces:["apache","jet","bomber"],
			sight:3,
    	    totalLife:500,
			hitPoints:500,
			cost:5000,
			powerUsage:0,
			powerOutput:0,
			limit:1800,
			wait:true,
			done:false,
			spriteImages:[
				{name:"healthy",count:1}
			],			
        },
		"airfield":
		{
			name:"airfield",
			airCompatible:true,
			// Properties for drawing the object
            frames:1,
            pixelWidth:300,
			pixelHeight:59,
			baseWidth:300,
			baseHeight:80,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			],
			visionGridX:42,
			visionGridY:42,
			visionGrid:undefined,
			numberOfPlanes:0,
			maximumNumberOfPlanes:4,
			hangerPositions:[
				{x:-2.37,y:-6.60,uid:undefined},
			],
			deployIndex:0,
			takeOffPaths:[
				[
					{x:-4.35,y:3.6,direction:2,speed:1},
					{x:-1.35,y:3.6,direction:2,speed:2},
					{x:1.35,y:3.6,direction:2,speed:4},
					{x:4.35,y:3.6,direction:2,speed:18},
					{x:7.35,y:3.6,direction:2,speed:24},
					{x:12.35,y:3.6,direction:2,speed:48}
				]
			],
			landingPaths:[
				[
					{x:12.35,y:3.6,direction:6,speed:8},
					{x:5.35,y:3.6,direction:6,speed:7},
					{x:0.35,y:3.6,direction:6,speed:6},
					{x:-2.35,y:3.6,direction:6,speed:4},
					{x:-3.35,y:3.6,direction:6,speed:2},
					{x:-4.35,y:3.6,direction:6,speed:2}
				]
			],
			approachPosition:
				{x:27.5,y:0,direction:14,speed:8},	
			sight:3,
    	    totalLife:500,
			hitPoints:500,
			cost:5000,
			powerUsage:0,
			powerOutput:0,
			spriteImages:[
				{name:"healthy",count:1}
			],			
        },
        "prospector":
		{
			// Extracts the resource that vehicle prospector settles on
			name:"prospector",
			pixelWidth:40,
			pixelHeight:60,
			baseWidth:40,
			baseHeight:20,
			pixelOffsetX:-2,
			pixelOffsetY:40,
			resource:"none",
			buildableGrid:[
				[1,1]
			],
			passableGrid:[
				[1,1]
			],
			sight:3,
			cost:5000,
			powerUsage:0,
		    totalLife:300,
			spriteImages:[
				{name:"utilise",count:8},
				{name:"healthy",count:1}
			],
        },
        "barracks_1":
		{
			name:"barracks_1",
			produce:"infantry",
			commandable:true,
			// Properties for drawing the object
			frames:1,
			pixelWidth:95,
			pixelHeight:78,
			baseWidth:95,
			baseHeight:77,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1],
				[1,1,1,1,1,1]
			],
			iconColor:0xFFFF00,
			iconShape:"rect",
			visionGridX:10,
			visionGridY:8,
			visionGrid:undefined,
			// Barracks can place new infantry into open space in a order fashion
			deployPosition:[
				{x:2.5,y:8,uid:undefined},{x:1.5,y:8,uid:undefined},{x:0.5,y:8,uid:undefined},{x:-0.5,y:8,uid:undefined},{x:-1.5,y:8,uid:undefined},{x:-2.5,y:8,uid:undefined},
				{x:2.5,y:9,uid:undefined},{x:1.5,y:9,uid:undefined},{x:0.5,y:9,uid:undefined},{x:-0.5,y:9,uid:undefined},{x:-1.5,y:9,uid:undefined},{x:-2.5,y:9,uid:undefined},
				{x:2.5,y:10,uid:undefined},{x:1.5,y:10,uid:undefined},{x:0.5,y:10,uid:undefined},{x:-0.5,y:10,uid:undefined},{x:-1.5,y:10,uid:undefined},{x:-2.5,y:10,uid:undefined},
			],
			produces:["soldier","grenadier","rocketeer"],
			deployIndex:0,
			sight:3,
			vision:60,
			totalLife:300,
			hitPoints:300,
			cost:300,
			powerUsage:50,
			powerOutput:0,
			limit:360,
			wait:true,
			done:false,
			canBePrimary:true,
			spriteImages:[
				{name:"healthy",count:1},
				{name:"damaged",count:1},
			],
		},
		"factory":
		{
			name:"factory",
			produce:"vehicles",
			commandable:true,
			defaultProduceFrame:12,
			// Properties for drawing the object
			frames:1,
			pixelWidth:144,
			pixelHeight:97,
			baseWidth:144,
			baseHeight:97,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1]
			],
			visionGridX:20,
			visionGridY:16,
			visionGrid:undefined,
			deployPosition:[
				{x:2.5,y:8,uid:undefined},{x:0.5,y:8,uid:undefined},{x:-1.5,y:8,uid:undefined},{x:-3.5,y:8,uid:undefined},
				{x:2.5,y:9.5,uid:undefined},{x:0.5,y:9.5,uid:undefined},{x:-1.5,y:9.5,uid:undefined},{x:-3.5,y:9.5,uid:undefined},
				{x:2.5,y:11,uid:undefined},{x:0.5,y:11,uid:undefined},{x:-1.5,y:11,uid:undefined},{x:-3.5,y:11,uid:undefined},
			],
			produces:["jeep","apc","tank","rocket-truck","prospector"],
			deployIndex:0,
			sight:3,
			vision:90,
			totalLife:500,
			hitPoints:500,
			cost:2000,
			powerUsage:250,
			powerOutput:0,
			limit:720,
			wait:true,
			done:false,
			canBePrimary:true,
			spriteImages:[
				{name:"healthy",count:1},
				{name:"damaged",count:1},
			],
		},
		"powerplant" :
		{
			name:"powerplant",
			// Properties for drawing the object
			frames:1,
			pixelWidth:85,
			pixelHeight:100,
			baseWidth:83,
			baseHeight:98,
			pixelOffsetX:-3,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			],
			passableGrid:[
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
				[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0],
				[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
				[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
				[0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
				[0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
			],
			iconColor:0xFFFF00,
			iconShape:"rect",
			visionGridX:20,
			visionGridY:20,
			visionGrid:undefined,
			sight:3,
			vision:60,
			totalLife:200,
			hitPoints:200,
			cost:250,
			powerOutput:100,
			powerUsage:0,
			limit:240,
			wait:true,
			done:false,
			spriteImages:[
				{name:"healthy",count:1},
				{name:"damaged",count:1},
			],			
		},
		"portable_power_generator":
		{
			name:"portable_power_generator",
			defaultProduceFrame:12,
			// Properties for drawing the object
			frames:2,
			pixelWidth:25,
            pixelHeight:4,
			baseWidth:25,
			baseHeight:25,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1],
			],
			passableGrid:[
				[1]
			],
			sight:3,
			vision:90,
			totalLife:25,
			hitPoints:25,
			cost:2000,
			limit:240,
			wait:true,
			done:false,
			powerOutput:50,
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
		"wind_capture":
		{
			name:"wind_capture",
			defaultProduceFrame:12,
			// Properties for drawing the object
			frames:2,
			pixelWidth:144,
			pixelHeight:97,
			baseWidth:144,
			baseHeight:97,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1]
			],
			passableGrid:[
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1]
			],
			sight:3,
			vision:90,
			totalLife:500,
			hitPoints:500,
			cost:2000,
			powerOutput:300,
			powerUsage:0,
			limit:900,
			wait:true,
			done:false,
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
		"radar" :
		{
			name:"radar",
			// Properties for drawing the object
			frames:1,
			pixelWidth:85,
			pixelHeight:100,
			baseWidth:85,
			baseHeight:100,
			pixelOffsetX:0,
			pixelOffsetY:0,
			// Properties for describing structure for pathfinding
			buildableGrid:[
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			],
			passableGrid:[
				[0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0],
				[0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
			],
			visionGridX:24,
			visionGridY:24,
			visionGrid:undefined,
			sight:3,
			vision:0,
			totalLife:500,
			hitPoints:500,
			cost:1250,
			powerOutput:0,
			powerUsage:100,
			limit:480,
			wait:true,
			done:false,
			displayMiniMap:true,
			spriteImages:[
				{name:"healthy",count:1},
				{name:"damaged",count:1},
			]
		},
		"extractor":
		{
            name:"extractor",
            frames:1,
            baseWidth:40,
			baseHeight:20,
			pixelOffsetX:0,
			pixelOffsetY:0,
            passableGrid:[
				[1,1],
				[1,1]
			],
		}
    },
    defaults:
	{
		type:"buildings",
		layer:"surface",
		animationIndex:0,
		direction:0,
		reloadTimeLeft:0,
		cellCollisionMode:1000,
		selectionRadius:1,
		selectionBorderShape:"rectangle",
		action:"stand",
		selected:false,
		drawTheLifeBar:false,
        selectable:true,
		buildable:true,

        outputTest:function()
        {
			if(this.name == "ground-turrent")
				this.orders.type = "guard";

            console.log(this.name);
		},

		processOrders:function()
		{
			switch (this.orders.type)
			{
				case "firing":
					this.firing();
					break;
				case "fire":
					this.fire();
					break;
				case "turnToAttack":
					this.turnToAttack();
					break;
				case "attack":
					this.attack();
					break;				
				case "guard":
					this.guard();
					break;
				case "repair":
					this.repair();
					break;
				case "stand":
					break;
			}
		},

		update()
		{
			if(debug.fogOfWar)
				fog.setSubGrid(this.x, this.y, this.visionGrid, this.team, this.state);
		},

		turnToAttack:function()
		{
			if(this.direction == this.correctDirection)
			{
				this.orders.type = "attack";
			}				
			else
			{
				let position = {x:this.x, y:this.y};				
	
				this.correctDirection = findAngle(this.orders.to,position,this.directions);

				this.direction = wrapDirection(this.correctDirection, this.directions);
			}
		},

		attack:function()
		{			
			/*if(Math.pow(this.orders.to.x - this.x,2) -
				Math.pow(this.orders.to.y - this.y,2) > this.sight)
			{
				this.orders.type = "guard";
			}

			console.log("attack");*/

			var target = findGroundTarget(
				this.team,
				this.sight,
				2,
				2,
				this.x,
				this.y);

			if(!target)
				this.orders = {type:"guard", to:target};
			
			
			this.orders.to = target;
			this.orders.type = "firing";
		},

		firing:function()
		{
			//console.log("firing");
			if(this.orders.to == undefined)
			{
				console.log("target is undefined");
				console.log(this.uid);
			}

			
			
			//console.log(bullets.list[this.weaponType].reloadTime);

			if((this.reloadTimeLeft % bullets.list[this.weaponType].reloadTime) == 0)
			{
				if(Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) >= Math.pow(this.sight, 2))
				{
					this.orders.type = "attack";					
					this.reloadTimeLeft--;
				}
				else
				{
					//console.log(this.orders.to.life);

					if(this.orders.to.life <= 0)
						this.orders.type = "guard";
					else
						this.orders.type = "fire";
				}		
			}

			this.reloadTimeLeft++;

			var target = findGroundTarget(
				this.team,
				this.sight,
				2,
				2,
				this.x,
				this.y);

			if(!target)
				this.orders = {type:"guard", to:target};				
		},

		fire:function()
		{			
			if(this.orders.to.life <= 0)
                renderer.removeItem(this.this.orders.to);

			if(!this.bullet)
			{				
				this.bullet = {};
				this.bullet.name = game.bullets[0].name;
				this.bullet.damage = game.bullets[0].damage;
				this.bullet.direction = game.bullets[0].direction;					
				this.bullet.directions = game.bullets[0].directions;
				this.bullet.speed = game.bullets[0].speed;
				this.bullet.turnSpeed = game.bullets[0].turnSpeed;
				this.bullet.frames = game.bullets[0].frames;
				this.bullet.bulletFrames = game.bullets[0].bulletFrames;
			}					
			
			this.bullet.sprite = renderer.produceBullet(this.bullet.name);
			this.bullet.sprite.x = this.sprite.x;
			this.bullet.sprite.y = this.sprite.y;
			this.bullet.x = this.x;
			this.bullet.y = this.y;
			this.bullet.sprite.visible = true;
			this.bullet.animationCount = 0;
			this.bullet.attacker = this;

			this.bullet.update = window["bullets"].defaults.update;

			if(this.bullet.areaOfEffectRadius != undefined)
			{
				this.bullet.targetPosition = {x:this.target.x, y:this.target.y};
				this.bullet.target = this.orders.to;
			}
			else
			{
				this.bullet.target = this.orders.to;
			}
			
			this.orders.type = "firing";
		},

		attacked:function()
		{
			this.state.attacking = true;
		},
		
		guard:function()
		{
			var target = findGroundTarget(
				this.team,
				this.sight,
				2,
				2,
				this.x,
				this.y);

			if(target)
				this.orders = {type:"turnToAttack", to:target};
		},

		repair:function()
		{
			if(this.life < this.totalLife)
			{
				this.life = this.life + 0.2;
			}
			else
			{
				this.life = this.totalLife;
				this.orders.type = "stand";
			}
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

			if(game.cncDisplay)
			{
				this.drawIcon();
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

		drawIcon:function()
		{
			this.iconSprite.x = this.sprite.x;
			this.iconSprite.y = this.sprite.y;

			this.iconDirectionSprite.x = this.sprite.x;
			this.iconDirectionSprite.y = this.sprite.y;
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
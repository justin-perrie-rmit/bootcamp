var ai = 
{
    RETURN_SUCCESSFUL:0,
    RETURN_CASH_ERROR:-1,
    RETURN_POWER_ERROR:-2,
    RETURN_PLACEMENT_ERROR:-3,
    
    MAX_NUMBER_OF_CONSTRUCTION_TOOLS:1,
    MAX_NUMBER_OF_POWER_STATIONS:8,
    MAX_NUMBER_OF_BARRACKS:1,
    MAX_NUMBER_OF_FACTORIES:1,
    MAX_NUMBER_OF_RADARS:1,
    MAX_NUMBER_OF_PROspectorS:4,
    MAX_NUMBER_OF_MILITARY_DEFENCE:8,
    MAX_NUMBER_OF_MILITARY_OFFENSE:200,

    n:0,

    powerplant:undefined,

    playerTeam:undefined,
    uniqueAITeams:undefined,
    aiBudgets:undefined,
    aiObjects:undefined,    
    aiTeamIndex:0,

    dependents:undefined,

    placements:[80,70, 80,60, 90,60, 100,60, 100,70, 100,50, 110,60],
    currentPlacement:{x:0,y:0},
    placementIndex:0,
    placementErrorCounter:0,
    placementErrorLimit:10,

    eight_point_placement:[-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1],

    seriesPlacements:undefined,

    powerplantPlacements:undefined,
    powerplantPlacementIndex:0,

    adding:0,

    techTree:undefined,
    techTreeIndex:0,

    additionalDetails:undefined,

    lastConstructorTool:undefined,
    lastBarracks:undefined,
    lastFactory:undefined,

    deployBarrackIndex:0,
    deployFactoryIndex:0,

    init:function()
    {
        this.aiBudgets = [];

        this.playerTeam = game.team;

        this.uniqueAITeams = [];    
        this.aiObjects = new Map();
        this.dependents = new Set();

        this.powerplantPlacements = [];
        this.powerplantPlacementIndex = 0;
        this.seriesPlacements = new Map();

        this.adding  =  0;

        this.techTree = undefined;
        this.techTreeIndex = 0;

        this.additionalDetails = undefined;

        this.lastConstructorTool = undefined;
        this.lastBarracks = undefined;
        this.lastFactory = undefined;

        this.deployBarrackIndex = 0;
        this.deployFactoryIndex = 0;

        for(var i = 0; i < game.level.items.length; i++)
        {
            if(game.level.items[i].team == this.playerTeam)
                continue;

            this.uniqueAITeams.push(game.level.items[i].team);

            if(!this.aiObjects.has(game.level.items[i].team))
            {
                let stats = {};
            
                stats.construct_built = 0;
                stats.power_built = 0;
                stats.barracks_built = 0;
                stats.cash_total = 0;
                stats.power_usage = 0;
                stats.power_total = 0;
    
                this.aiObjects.set(game.level.items[i].team, stats);
            }

            this.dependents.add(game.level.items[i].name);

            if(game.level.items[i].name == "construction_tool")
                this.aiObjects.get(game.level.items[i].team).construct_built++;

            if(game.level.items[i].name == "powerplant")
            {
                this.aiObjects.get(game.level.items[i].team).power_built++;
                this.aiObjects.get(game.level.items[i].team).power_level = this.aiObjects.get(game.level.items[i].team).power_built * 100;
            }

            if(game.level.items[i].name == "barracks")
                this.aiObjects.get(game.level.items[i].team).barracks_built++;
        }

        for(let team of this.aiObjects.keys())
        {
            this.aiObjects.get(team).cash_total = game.level.cash[team];
        }

        var construction_tool = {
            "name":"construction_tool",
            "type":"buildings",
            "limit":1080,
            "cost":5000,
            "power_usage":10,
            "power_total":10,
            "dependent":undefined
        };

        this.powerplant = {
            "name":"powerplant",
            "type":"buildings",
            "limit":240,
            "cost":250,
            "power_usage":0,
            "power_total":100,
            "eight_point_placement":true,
            "dependent":[construction_tool]
        };

        var barracks = {
            "name":"barracks",
            "type":"buildings",
            "limit":360,
            "cost":300,
            "power_usage":50,
            "power_total":0,
            "dependent":[this.powerplant]
        };

        var factory = {
            "name":"factory",
            "type":"buildings",
            "limit":720,
            "cost":2000,
            "power_usage":250,
            "power_total":0,
            "dependent":[this.powerplant]
        };

        var soldier = {
            "name":"soldier",
            "type":"infantry",
            "limit":360,
            "cost":300,
            "power_usage":0,
            "power_total":0,
            "dependent":[barracks]
        };

        var grenadier = {
            "name":"grenadier",
            "type":"infantry",
            "limit":360,
            "cost":300,
            "power_usage":0,
            "power_total":0,
            "dependent":[barracks]
        };

        var rocketeer = {
            "name":"rocketeer",
            "type":"infantry",
            "limit":360,
            "cost":300,
            "power_usage":0,
            "power_total":0,
            "dependent":[barracks]
        };

        var jeep = {
            "name":"jeep",
            "type":"vehicles",
            "limit":360,
            "cost":400,
            "power_usage":0,
            "power_total":0,
            "dependent":[factory]
        };

        var tank = {
            "name":"tank",
            "type":"vehicles",
            "limit":720,
            "cost":1200,
            "power_usage":0,
            "power_total":0,
            "dependent":[factory]
        };

        console.log(soldier);
        console.log(this.dependents);

        this.techTree = [];
        this.additionalDetails = [];

        this.techTree.push(soldier);
        this.techTree.push(grenadier);
        this.techTree.push(rocketeer);

        this.techTree.push(jeep);
        //this.techTree.push(tank);

        selector.add(this.techTree);
    },

    update:function()
    {
        if(!this.uniqueAITeams)
            return;

        if(this.n > 250)
        {
            console.log("Too many error placements")
            return;
        }

        if(this.aiTeamIndex == this.uniqueAITeams.length)
            this.aiTeamIndex = 0;

        let aiTeam = this.uniqueAITeams[this.aiTeamIndex];

        if(this.aiObjects.get(aiTeam).construct_built >= 1)
        {
            if(this.lastConstructorTool == undefined)
                this.lastConstructorTool = this.searchForItem("construction_tool", aiTeam);

            if(this.lastBarracks == undefined)
                this.lastBarracks = this.searchForItem("barracks", aiTeam); 

            if(this.lastFactory == undefined)
                this.lastFactory = this.searchForItem("factory", aiTeam);
            
            if(this.adding == 0 && this.placements.length > 0)
            {
                //console.log('adding');

                if(this.additionalDetails.length == 0)
                    this.additionalDetails.push(selector.select())

                if(!this.dependents.has(this.additionalDetails[0].dependent[0].name))
                {
                    if(debug.logAIDebug)
                        alert("needs " + this.additionalDetails[0].name)
                    
                    this.additionalDetails[0] = this.additionalDetails[0].dependent[0];
                    
                    if(debug.logAIDebug)
                        alert("dependent on " + this.additionalDetails[0].name)
                    
                    return;
                }

                var isValidBuild = this.validBuild(
                    this.additionalDetails[0].type,
                    this.additionalDetails[0].cost,
                    this.additionalDetails[0].power_usage,
                    this.additionalDetails[0].power_total,
                    aiTeam);

                if(isValidBuild == this.RETURN_SUCCESSFUL)
                {
                    this.adding = this.additionalDetails[0].limit;
                }
                else
                {
                    if(isValidBuild == this.RETURN_POWER_ERROR)
                    {
                        var additionalDetail = this.powerplant;

                        this.additionalDetails.unshift(additionalDetail);

                        return;
                    }

                    if(isValidBuild == this.RETURN_PLACEMENT_ERROR)
                    {
                        this.placementIndex = Math.floor(Math.random()*this.placements.length);
                    }

                    return;
                }
            }            
            
            this.adding--;

            if(this.adding == 0)
            {
                if(this.additionalDetails[0].eight_point_placement)
                {
                    this.placementWithSeries(this.additionalDetails[0]);
                }
                else
                {                    
                    this.removePlacement();
                }

                this.add(
                    aiTeam,
                    this.additionalDetails[0].name,
                    this.additionalDetails[0].type,
                    this.currentPlacement.x, this.currentPlacement.y
                );

                console.log(game.items[game.items.length-1]);

                strategist.add(game.items[game.items.length-1]);

                this.additionalDetails.splice(0, 1);
            }                       
        }

        this.aiTeamIndex++;

        strategist.update(aiTeam);
    },

    add:function(team, name, type, x, y)
    {
        var constructionUID = undefined;

        if(type == "buildings")
        {
            constructionUID = this.lastConstructorTool.uid;
        }
        else if(type == "infantry")
        {
            constructionUID = this.lastBarracks.uid;

            x = this.lastBarracks.x + this.lastBarracks.deployPosition[this.deployBarrackIndex].x;
            y = this.lastBarracks.y + this.lastBarracks.deployPosition[this.deployBarrackIndex].y;

            y = y + ((display.maininterface.mapImageYOffset / game.gridSize)) + 4;

            this.deployBarrackIndex++;
        }
        else if(type == "vehicles")
        {
            constructionUID = this.lastFactory.uid;

            x = this.lastFactory.x + this.lastFactory.deployPosition[this.deployFactoryIndex].x;
            y = this.lastFactory.y + this.lastFactory.deployPosition[this.deployFactoryIndex].y;
            
            y = y + ((display.maininterface.mapImageYOffset / game.gridSize)) + 4;

            this.deployFactoryIndex++;
        }

        var item  = {
            "name":name, "type":type, "team":team, "direction":0,
            "x":x,
            "y":y - (display.maininterface.mapImageYOffset / game.gridSize),
            "construct":true};
        
        game.sendCommand(constructionUID, item);
    },

    validBuild:function(type, payment, power_usage, power_total, team)
    {
        var placements = [];
        
        for(var i = 0; i < this.placements.length; i++)
        {
            placements.push(this.placements[i]);
        }

        if(debug.logAIDebug)
            alert('length of placement: ' + placements.length)

        var newCash = this.aiObjects.get(team).cash_total - payment;

        if(newCash < 0)
        {
            return this.RETURN_CASH_ERROR;
        }

        var newPower = this.aiObjects.get(team).power_usage + power_usage;

        if(newPower > this.aiObjects.get(team).power_total)
        {
            console.log("failed build for new power");
            return this.RETURN_POWER_ERROR;
        }

        console.log(type);

        do
        {
            if(this.n > 250)
                break;

            var placementIndex = Math.floor(Math.random() * (placements.length/2)) * 2;

            var deploy_x = placements[placementIndex];
            var deploy_y = placements[placementIndex + 1];

            console.log(deploy_x + " " + deploy_y);

            if(this.validPlacement(
                this.additionalDetails[0], deploy_x, deploy_y) == this.RETURN_SUCCESSFUL)
            {
                var stats = this.aiObjects.get(team);
    
                stats.cash_total = stats.cash_total - payment;
                stats.power_usage = stats.power_usage + power_usage;
                stats.power_total = stats.power_total + power_total;
        
                this.aiObjects.set(team, stats);

                this.currentPlacement.x = deploy_x;
                this.currentPlacement.y = deploy_y;
                this.placementIndex = placementIndex;

                console.log("%ccurrentPlacement.x: " + this.currentPlacement.x + ", currentPlacement.y: " + this.currentPlacement.y, 'background: #000; color: #eebb00')
                var additionalDetails = "additionalDetail: ";
                
                for(var i = 0; i < this.additionalDetails.length; i++)
                    additionalDetails += this.additionalDetails[i].name + " ";

                console.log("%c" + additionalDetails, 'background: #000; color: #00bb33');

                if(debug.logAIDebug)
                    alert(this.additionalDetails[0].name + " is pending a successful build")

                //this.removePlacement(); <<< --- Do not include here

                this.dependents.add(this.additionalDetails[0].name);
        
                console.log("successful build");
                return this.RETURN_SUCCESSFUL;
            }
            
            placements.splice(deploy_x, 1);
            placements.splice(deploy_x, 1);
        }
        while(true);
    },    

    placementWithSeries:function(additionalDetail)
    {
        if(!this.seriesPlacements.has(additionalDetail.name))
        {
            console.log(this.currentPlacement.x + ", " + this.currentPlacement.y)

            var eight_point_placement = [];
        
            for(var i = 0; i < this.eight_point_placement.length; i++)
            {
                eight_point_placement.push(this.eight_point_placement[i]);
            }

            eight_point_placement.push(this.currentPlacement.x);
            eight_point_placement.push(this.currentPlacement.y);
            
            this.seriesPlacements.set(additionalDetail.name, eight_point_placement);
            this.removePlacement();
        }
        else
        {
            var placements = this.seriesPlacements.get(additionalDetail.name);

            var placementX = placements[placements.length-2];
            var placementY = placements[placements.length-1];

            //console.log(placementX + " " + placementY)
            
            var lengthOfPlacement = 0;

            do
            {
                lengthOfPlacement = placements.length-2;

                if(lengthOfPlacement == 0)
                    break;

                var placementXOffset = Math.floor(Math.random() * (lengthOfPlacement/2)) * 2;
                var placementYOffset = placementXOffset + 1;
    
                var buildingPlacement = window[additionalDetail.type].list[additionalDetail.name].buildableGrid;
    
                var rows = buildingPlacement[0].length;
                var cols = buildingPlacement.length;

                console.log('--- PLACEMENT DETAILS ---');
                console.log(lengthOfPlacement);
                console.log(placementX + ", " + placementY);
                console.log(placementXOffset + " " + placementYOffset);
                console.log(this.eight_point_placement[placementXOffset] + " " + this.eight_point_placement[placementYOffset]);
    
                rows = rows * this.eight_point_placement[placementXOffset];
                cols = cols * this.eight_point_placement[placementYOffset];

                console.log(rows + " " + cols);
    
                this.currentPlacement.x = placementX + rows;
                this.currentPlacement.y = placementY + cols;

                console.log(this.currentPlacement.x + " " + this.currentPlacement.y)

                placements.splice(placementXOffset, 1);
                placements.splice(placementXOffset, 1);

                this.seriesPlacements.set(additionalDetail.name, placements);
            }
            while(this.validPlacement(
                additionalDetail, this.currentPlacement.x, this.currentPlacement.y) == this.RETURN_PLACEMENT_ERROR);

            console.log(eight_point_placement);
        }
    },

    validPlacement:function(additionalDetail, deploy_x, deploy_y)
    {
        if(additionalDetail.name == "barracks")
            var buildingPlacement = window[additionalDetail.type].list[additionalDetail.name + "_1"].buildableGrid;
        else
            var buildingPlacement = window[additionalDetail.type].list[additionalDetail.name].buildableGrid;

        var gridX = Math.floor((deploy_x) - buildingPlacement[0].length / 2);
        var gridY = Math.floor((deploy_y) - buildingPlacement.length / 2) ;

        console.log(window[additionalDetail.type].list[additionalDetail.name]);

        console.log("gridX: " + gridX + ", " + "gridY: " + gridY)

        if(gridX >= 0 && gridY >= 0 &&
            gridX <= game.level.mapGridWidth - buildingPlacement[0].length &&
            gridY <= game.level.mapGridHeight - buildingPlacement.length)
        {
            for(var y1 = 0; y1 < buildingPlacement.length; y1++)
            { 
                for(var x1 = 0; x1 < buildingPlacement[0].length; x1++)
                {
                    if(game.currentTerrainMapPassableGrid[gridY + y1][gridX + x1] >= 1)
                    {
                        console.log("failed placement build");
                        this.n++;
                        return this.RETURN_PLACEMENT_ERROR;
                    }
                }
            }
        }

        this.n = 0;

        return this.RETURN_SUCCESSFUL;
    },

    searchForItem:function(name, aiTeam)
    {
        for(var i = 0; i < game.items.length; i++)
        {
            if(aiTeam != game.items[i].team)
                continue;

            if(game.items[i].name != name)
                continue;

            return game.items[i];
        }

        return undefined;
    },

    removePlacement:function()
    {
       this.placements.splice(this.placementIndex, 1); 
       this.placements.splice(this.placementIndex, 1);
    },

    end:function()
    {
        this.uniqueAITeams = undefined;
    }
}
var nav = 
{
    gameMode:undefined,
    currentGrid:undefined,  
    currentIsleGrid:undefined, 
    pathTracker:new Map(),
    nextStepCollisionTracker:new Map(),
    toDestinationTracker:new Set(),
    wayPoints:[],
    wayPointsLocked:new Map(),
    navalWayPoints:new Map(),
    pathLengths:new Map(),
    globalDirections:[],
    groupIds:new Map(),
    limitedGroupIdsTracker:[],
    multiType:false,
    multiTypeLength:0,
    multiTypeMarkers:new Set(),
    pathCounter:0,
    sweepCounter:0,
    sweepLimit:3000,
    wayPointsSpacing:5,
    longDistance:false,

    addGroupIdToTracker(id, x, y)
    {
        if(!this.groupIds.has(id))
        {
            for (let [existingId, group] of this.groupIds) 
            {
                //if (areCoordinatesClose(group.x, group.y, x, y))
                if (Math.abs((group.x) - (x + game.offsetX)) <= 60 &&
                    Math.abs((group.y) - (y + game.offsetY)) <= 60)
                {
                    group.n++;
                    this.groupIds.set(existingId, group);
                    //game.showMessage("existingId: " + existingId)
                    
                    console.log("existingId: " + existingId);
                    
                    return existingId;                
                }
            }

            this.groupIds.set(id, {x:x + game.offsetX, y:y + game.offsetY, n:1});
            this.limitedGroupIdsTracker.push(id);
        
            if(this.limitedGroupIdsTracker.length > 10)
            {
                var oldestId = this.limitedGroupIdsTracker.shift();
                this.groupIds.delete(oldestId);
            }
        }
        else
        {
            var group = this.groupIds.get(id);
            group.n++;
            this.groupIds.set(id, group);
        }

        return undefined;
    },

    checkForGroupIds(id)
    {
        if(this.groupIds.has(id))
            return true;

        return false;
    },

    removeItemFromGroup(id)
    {
        if(this.groupIds.has(id))
        {
            var group = this.groupIds.get(id);
            group.n--;

            if(group.n == 0)
            {   
                for(var i = 0; i < game.items.length; i++)
                {
                    if(game.items[i] && game.items[i].type == "vehicles" && isMoving(game.items[i]))
                    {
                        if(game.items[i].orders.to.id == id)
                            continue;

                        game.items[i].orders.type = "detourTo";
                    }
                }

                this.groupIds.delete(id);

                for(var i = this.limitedGroupIdsTracker.length-1; i >= 0; i--)
                {
                    if(this.limitedGroupIdsTracker[i] == id)
                    {
                        this.limitedGroupIdsTracker.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },

    getGlobalDirection(id, direction)
    {
        if(this.globalDirections.length != 0)
        {
            for(var i = 0; i < this.globalDirections.length; i++)
            {
                if(this.globalDirections[i].id == id)
                {
                    return this.globalDirections[i].direction;
                }                
            }

            this.globalDirections.push({"id":id,"direction":direction});

            if(this.globalDirections.length == 50)
            {
                this.globalDirections.splice(0, 1);
            }

            return this.globalDirections[this.globalDirections.length-1].direction;
        }
        else
        {
            this.globalDirections.push({"id":id,"direction":direction});

            return this.globalDirections[0].direction;
        }
    },

    createMarkers:function(mode, terrianGrid, path)
    {
        
        for(var i = 0; i < path.length - 2; i++)
        {
            if(terrianGrid[path[i].y][path[i].x] == flags.CELL_COLLISION_MODE_OFF)
            {
                terrianGrid[path[i].y][path[i].x] = mode;
                this.multiTypeMarkers.add(path[i].y + " " + path[i].x);
            }
        }
    },

    deleteAllMarkers:function(terrianGrid)
    {
        if(this.multiTypeMarkers.size == 0)
            return;

        for (const coord of this.multiTypeMarkers)
        {
            const coords = coord.split(" ");
            var x = coords[1];
            var y = coords[0];

            terrianGrid[y][x] = flags.CELL_COLLISION_MODE_OFF;
        }

        this.multiTypeMarkers.clear();
    },

    createWayPoints:function(isleGrid)
    {
        var offset = 5;
        var adjust = 5;

        var rows = Math.floor(isleGrid.length / offset);
        var cols = Math.floor(isleGrid[0].length / offset);

        var a = 0;
        var w = 0;
        var x = 0;
        var y = 0;
        var z = 0;

        for(var i = 1; i < rows; i++)
        {
            this.wayPoints[i-1] = [];

            for(var j = 1; j < cols; j++)
            {
                if(isleGrid[i * offset][j * offset] == flags.CELL_COLLISION_MODE_MEDIUM ||
                    isleGrid[i * offset][j * offset] == flags.CELL_COLLISION_MODE_SOFT)
                {
                    this.wayPoints[i-1][j-1] = undefined;
                    continue;
                }

                this.wayPoints[i-1][j-1] = {};

                this.wayPoints[i-1][j-1].x = j * offset;
                this.wayPoints[i-1][j-1].y = i * offset;
                this.wayPoints[i-1][j-1].locked = flags.LAYER_UNLOCKED;
            }
        }

        for(var i = 1; i < rows; i++)
        {
            for(var j = 1; j < cols; j++)
            {
                if(this.wayPoints[i-1][j-1] == undefined)
                {
                    //this.wayPoints[i-1][j-1] = undefined;
                    
                    //alert()
                    continue;
                }

                var L = j * offset - adjust;
                var R = j * offset + adjust;
                var U = i * offset - adjust;
                var D = i * offset + adjust;

                var removeWayPoint = false;

                for(var x = L; x < R; x++)
                {
                    if(isleGrid[i * offset][x] == flags.CELL_COLLISION_MODE_MEDIUM ||
                        isleGrid[i * offset][x] == flags.CELL_COLLISION_MODE_SOFT)
                    {
                        removeWayPoint = true;
                        break;
                    }
                }

                for(var y = U; y < D; y++)
                {
                    if(isleGrid[y][j * offset] == flags.CELL_COLLISION_MODE_MEDIUM ||
                        isleGrid[y][j * offset] == flags.CELL_COLLISION_MODE_SOFT)
                    {
                        removeWayPoint = true;
                        break;
                    }
                }

                L = j * offset - adjust * 2;
                R = j * offset + adjust * 2;
                U = i * offset - adjust * 2;
                D = i * offset + adjust * 2;
                
                var numberOfHorizontalNeighbours = 0;
                var numberOfVerticalNeighbours = 0;

                if(L >= 0)
                {
                    if(isleGrid[i * offset][L] < flags.CELL_COLLISION_MODE_SOFT)
                    {
                        w++;
                        numberOfHorizontalNeighbours++;
                    }
                }

                if(R < isleGrid[0].length)
                {
                    if(isleGrid[i * offset][R] < flags.CELL_COLLISION_MODE_SOFT)
                    {
                        x++;
                        numberOfHorizontalNeighbours++;
                    }
                }

                if(U >= 0)
                {
                    if(isleGrid[U][j * offset] < flags.CELL_COLLISION_MODE_SOFT)
                    {
                        y++;
                        numberOfVerticalNeighbours++;
                    }
                }

                if(D < isleGrid.length)
                {
                    if(isleGrid[D][j * offset] < flags.CELL_COLLISION_MODE_SOFT)
                    {
                        z++;
                        numberOfVerticalNeighbours++;
                    }
                }
                
                if(!(numberOfHorizontalNeighbours == 2 && numberOfVerticalNeighbours == 0) ||
                    (numberOfHorizontalNeighbours == 0 && numberOfVerticalNeighbours == 2))
                {
                    if(removeWayPoint)
                    {
                        a++;
                        this.wayPoints[i-1][j-1] = undefined;
                    }
                }
            }
        }

        var numberOfWayPoints = 0;
        var wayPointsOutput = "";

        for(var i = 0; i < this.wayPoints.length; i++)
        {
            for(var j = 0; j < this.wayPoints[0].length; j++)
            {
                if(this.wayPoints[i][j])
                {
                    numberOfWayPoints++;
                    wayPointsOutput = wayPointsOutput + "*";
                }
                else
                {
                    wayPointsOutput = wayPointsOutput + "#";
                }
            }
            wayPointsOutput = wayPointsOutput + "\n";
        }

        for(var i = 0; i < game.items.length; i++)
        {
            if(game.items[i].type != "ships")
                continue;

            var angle = calculateAngle(game.items[i].direction, game.items[i].directions);

            var shipX = game.items[i].x;
            var shipY = game.items[i].y;

            var direction = game.items[i].direction;

            this.lockTheShipToWayPoints(shipX, shipY, direction, flags.LAYER_SURFACE_LOCKED);
        }
    },

    lockTheShipToWayPoints:function(shipX, shipY, direction, locked)
    {
        // if(locked != flags.LAYER_SURFACE_LOCKED)
        //     alert(direction)

        if(direction == 0 || direction == 4)
        {
            this.lockWayPoints(shipX, shipY, 0, -1, 0, 1, locked);
        }
        else if(direction == 2 || direction == 6)
        {
            this.lockWayPoints(shipX, shipY, -1, 0, 1, 0, locked);
        }
        else if(direction == 1 || direction == 5)
        {
            this.lockWayPoints(shipX, shipY, -1, 1, 1, -1, locked);
        }
        else if(direction == 3 || direction == 7)
        {
            this.lockWayPoints(shipX, shipY, -1, -1, 1, 1, locked);
        }
    },

    lockWayPoints:function(shipX, shipY, x1, y1, x2, y2, locked)
    {
        // if(locked != flags.LAYER_SURFACE_LOCKED)
        //     alert(shipX + " " + shipY)

        shipX = Math.round(shipX / 5) - 1;
        shipY = Math.round(shipY / 5) - 1;

        // if(locked != flags.LAYER_SURFACE_LOCKED)
        //     alert(shipX + " " + shipY + " " + x1 + " " + y1)
        if(this.wayPoints[shipY][shipX])
            this.wayPoints[shipY][shipX].locked = locked;
        
        shipX = Math.max(0, shipX + x1);
        shipY = Math.max(0, shipY + y1);

        // if(locked != flags.LAYER_SURFACE_LOCKED)
        //     alert(shipX + " " + shipY)

        console.log(this.wayPoints[shipY][shipX]);

        if(this.wayPoints[shipY][shipX])
            this.wayPoints[shipY][shipX].locked = locked;

        // Reset shipX and shipY to their original values
        shipX -= x1;
        shipY -= y1;

        // if(locked != flags.LAYER_SURFACE_LOCKED)
        //     alert(shipX + " " + shipY)

        shipX = Math.min(this.wayPoints.length - 1, shipX + x2);
        shipY = Math.min(this.wayPoints[0].length - 1, shipY + y2);

        // if(locked != flags.LAYER_SURFACE_LOCKED)
        //     alert(shipX + " " + shipY)

        if(this.wayPoints[shipY][shipX])
            this.wayPoints[shipY][shipX].locked = locked;
    },

    calcPathLength:function(item, path, wayPoints)
    {
        var pathLength = 0;
        var distanceFromDestinationSquared = 0;

        //if(!path)
        //    return 0;

        if(path.length > 0)
        {
            distanceFromDestinationSquared = Math.pow(item.x -
                path[0].x, 2) + Math.pow(item.y - path[0].y, 2);
        }

        if(wayPoints)
        {
            pathLength = pathLength + wayPoints.length * 1000000;
            pathLength = pathLength + path.length * 1000;
            pathLength = pathLength + distanceFromDestinationSquared;
        }
        else
        {
            pathLength = pathLength + path.length * 1000;
            pathLength = pathLength + distanceFromDestinationSquared;
        }

        return pathLength;
    },

    copyGrid:function()
    {
        if(this.currentGrid)
            return this.currentGrid;

        //this.currentGrid = $.extend([],game.currentTerrainMapPassableGrid);
        this.grid = [...game.currentTerrainMapPassableGrid];

        return this.currentGrid;
    },

    copyIsleGrid:function()
    {
        if(this.currentIsleGrid)
            return this.currentIsleGrid;

        //this.currentIsleGrid = $.extend([],game.currentIsleMapPassableGrid);
        this.currentIsleGrid = [...game.currentIsleMapPassableGrid];

        return this.currentIsleGrid;
    },

    reset:function()
    {
        this.currentGrid = undefined;
    },

    getPath(item,grid,start,end,cellCollisionMode=2,range=0,increment = 0)
    {
        return AStar(item.uid,grid,start,end,cellCollisionMode,range);
    },

    clear()
    {
        this.pathTracker.clear();
        this.nextStepCollisionTracker.clear();
        this.toDestinationTracker.clear();
        this.wayPoints = [],
        this.wayPointsLocked.clear();
        this.navalWayPoints.clear();
        this.pathLengths.clear();
        this.globalDirections =[],
        this.groupIds.clear();
        this.limitedGroupIdsTracker =[],
        multiType = false,
        multiTypeLength = 0,
        this.multiTypeMarkers.clear();
    }
}
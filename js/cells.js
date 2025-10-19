var cells = 
{
    uids_grid:undefined,
    tactical_uids_grid:undefined,
    cells_grid:undefined,
    tactical_grid:undefined,
    itereator:undefined,
    update:false,

    init:function()
    {
        this.uids_grid = new Map();
        this.tactical_uids_grid = new Map();
        this.cells_grid = new Map();
        this.tactical_grid = new Map();
    },

    add:function(uid, item_x, item_y, radius, passableGrid, cellMode = 0)
    {
        if(this.uids_grid.has(uid))
            return;

        var x1 = Math.max(Math.floor(item_x - radius), 0);
        var x2 = Math.min(Math.floor(item_x + radius), game.level.mapGridWidth-1);

        var y1 = Math.max(Math.floor(item_y - radius), 0);
        var y2 = Math.min(Math.floor(item_y + radius), game.level.mapGridHeight-1); 

        if(debug.logCells)
        {
            console.log("add from cells");  
            console.log(x1, x2, y1, y2);  
        }

        for(var x = x1; x <= x2; x++)
        {
            for(var y = y1; y <= y2; y++)
            {
                if(passableGrid[y][x] < flags.CELL_COLLISION_MODE_HARD)
                {
                    if(this.cells_grid.has(x + " " + y))
                    {
                        var cellStack = this.cells_grid.get(x + " " + y);

                        cellStack = cellStack + cellMode;
                    }
                    else
                    {
                        var cellStack = cellMode;
                    }

                    this.cells_grid.set(x + " " + y, cellStack);

                    if(cellStack >= flags.CELL_COLLISION_MODE_MEDIUM && cellStack < flags.CELL_COLLISION_MODE_HARD)
                    {
                        passableGrid[y][x] = flags.CELL_COLLISION_MODE_MEDIUM;
                    }
                    else if(cellStack > flags.CELL_COLLISION_MODE_OFF)
                    {
                        passableGrid[y][x] = flags.CELL_COLLISION_MODE_SOFT;
                    }
                }
            }
        }

        this.uids_grid.set(uid, {"x1":x1,"y1":y1,"x2":x2,"y2":y2});
    },

    remove:function(uid, passableGrid, cellMode = 0)
    {
        if(!this.uids_grid.has(uid))
            return;  
        
        if(debug.logCells)
        {   
            console.log("remove from cells");  
            console.log(this.uids_grid.get(uid).x1, this.uids_grid.get(uid).x2, this.uids_grid.get(uid).y1, this.uids_grid.get(uid).y2);      
        }

        var x1 = this.uids_grid.get(uid).x1;
        var x2 = this.uids_grid.get(uid).x2;

        var y1 = this.uids_grid.get(uid).y1;
        var y2 = this.uids_grid.get(uid).y2; 

        for(var x = x1; x <= x2; x++)
        {
            for(var y = y1; y <= y2; y++)
            {
                if(passableGrid[y][x] >= flags.CELL_COLLISION_MODE_SOFT)
                {
                    var cellStack = this.cells_grid.get(x + " " + y);

                    cellStack = cellStack - cellMode;

                    this.cells_grid.set(x + " " + y, cellStack);

                    if(cellStack == flags.CELL_COLLISION_MODE_OFF)
                    {
                        passableGrid[y][x] = flags.CELL_COLLISION_MODE_OFF;
                    }
                    else if(cellStack < flags.CELL_COLLISION_MODE_MEDIUM)
                    {
                        passableGrid[y][x] = flags.CELL_COLLISION_MODE_SOFT;
                    }
                }
            }
        }

        this.uids_grid.delete(uid);
    },

    place: function(items, passableGrid)
    {
        const positions = [];
        const queue = []; 
        const visited = new Set();

        let baseX = Math.floor((mouse.x * productionInverseRatioX + game.offsetX) / game.gridSize);
        let baseY = Math.floor((mouse.y * productionInverseRatio + game.offsetY) / game.gridSize - display.maininterface.mapImageYGridOffset);

        queue.push({ x: baseX, y: baseY });

        for (let item of items)
        {
            const result = this.nextValidSpot(
                item.radius / game.gridSize,
                passableGrid, queue, visited,
                item.cellCollisionMode
            );

            if (result)
            {
                positions.push(result);
            }
        }

        return positions;
    },

    nextValidSpot: function(radius, passableGrid, queue, visited, cellMode = 0)
    {
        console.log(radius);
        const directions = [[0,1], [1,0], [0,-1], [-1,0]];
        const width = game.level.mapGridWidth;
        const height = game.level.mapGridHeight;

        while (queue.length > 0)
        {
            const position = queue.shift();
            const key = `${position.x},${position.y}`;

            if (visited.has(key))
                continue;
            visited.add(key);

            if (passableGrid[position.y][position.x] >= flags.CELL_COLLISION_MODE_HARD)
                continue;

            const x1 = Math.max(Math.floor(position.x - radius), 0);
            const x2 = Math.min(Math.floor(position.x + radius), width - 1);
            const y1 = Math.max(Math.floor(position.y - radius), 0);
            const y2 = Math.min(Math.floor(position.y + radius), height - 1);

            let valid = true;

            for (let j = y1; j <= y2 && valid; j++)
            {
                for (let i = x1; i <= x2 && valid; i++)
                {
                    if (passableGrid[j][i] >= flags.CELL_COLLISION_MODE_SOFT)
                    {
                        valid = false;
                    }
                }
            }

            if (valid)
            {
                return position;
            }

            for (const [dx, dy] of directions)
            {
                const nx = position.x + dx;
                const ny = position.y + dy;

                console.log(nx + " " + ny);

                if (nx >= 0 && ny >= 0 && nx < width && ny < height)
                {
                    queue.push({ x: nx, y: ny });
                }
            }
        }

        return null;
    },

    // add_dynamic:function(item_uid, item_x, item_y, radius)
    // {
    //     var x1 = Math.max(Math.floor(item_x - radius), 0);
    //     var x2 = Math.min(Math.floor(item_x + radius), game.level.mapGridWidth-1);

    //     var y1 = Math.max(Math.floor(item_y - radius), 0);
    //     var y2 = Math.min(Math.floor(item_y + radius), game.level.mapGridHeight-1); 

    //     var tileStack = [];                    

    //     for(var x = x1; x <= x2; x++)
    //     {
    //         for(var y = y1; y <= y2; y++)
    //         {   
    //             tileStack.push({uid: item_uid, x:x, y:y});
    //         }
    //     }

    //     this.dynamic_grid.set(item_uid, tileStack);
    // },
    
    // update_dynamic:function(item_uid, collide, grid, passableGrid)
    // {
    //     const tilesIterator = this.dynamic_grid.values()

    //     var tiles = tilesIterator.next().value;

    //     if(!tiles)
    //         return false;

    //     do
    //     {
    //         for(var i = 0; i < tiles.length; i++)
    //         {
    //             if(item_uid == tiles[i].uid)
    //                 continue;

    //             if(grid[tiles[i].y][tiles[i].x] == flags.CELL_COLLISION_MODE_OFF)
    //                 passableGrid[tiles[i].y][tiles[i].x] = collide;
    //         }
    //     }
    //     while((tiles = tilesIterator.next().value) != undefined);
        
    //     return true;
    // },

    take_snapshot:function(item_x, item_y, collisionGrid, grid)
    {
        var x1, x2, y1, y2 = 0;

        if(collisionGrid.radius)
        {
            x1 = Math.max(Math.floor(item_x - collisionGrid.radius), 0);
            x2 = Math.min(Math.floor(item_x + collisionGrid.radius), game.level.mapGridWidth-1);

            y1 = Math.max(Math.floor(item_y - collisionGrid.radius), 0);
            y2 = Math.min(Math.floor(item_y + collisionGrid.radius), game.level.mapGridHeight-1);
        }
        else
        {
            x1 = Math.max(Math.floor(item_x - collisionGrid.gridX), 0);
            x2 = Math.min(Math.floor(item_x + collisionGrid.gridX), game.level.mapGridWidth-1);

            y1 = Math.max(Math.floor(item_y - collisionGrid.gridY), 0);
            y2 = Math.min(Math.floor(item_y + collisionGrid.gridY), game.level.mapGridHeight-1);
        }

        var current_tiles = [];    
        
        for(var x = x1; x <= x2; x++)
        {
            for(var y = y1; y <= y2; y++)
            {           
                current_tiles.push(grid[y][x]);

                grid[y][x] = flags.CELL_COLLISION_MODE_OFF;
            }
        }
        
        return current_tiles;
    },

    restore_snapshot:function(item_x, item_y, collisionGrid, grid, current_tiles)
    {
        var x1, x2, y1, y2 = 0;

        if(collisionGrid.radius)
        {
            x1 = Math.max(Math.floor(item_x - collisionGrid.radius), 0);
            x2 = Math.min(Math.floor(item_x + collisionGrid.radius), game.level.mapGridWidth-1);

            y1 = Math.max(Math.floor(item_y - collisionGrid.radius), 0);
            y2 = Math.min(Math.floor(item_y + collisionGrid.radius), game.level.mapGridHeight-1);
        }
        else
        {
            x1 = Math.max(Math.floor(item_x - collisionGrid.gridX), 0);
            x2 = Math.min(Math.floor(item_x + collisionGrid.gridX), game.level.mapGridWidth-1);

            y1 = Math.max(Math.floor(item_y - collisionGrid.gridY), 0);
            y2 = Math.min(Math.floor(item_y + collisionGrid.gridY), game.level.mapGridHeight-1);
        }

        for(var x = x1; x <= x2; x++)
        {
            for(var y = y1; y <= y2; y++)
            {                   
                grid[y][x] = current_tiles[0];
                current_tiles.splice(0,1);                
            }
        }
    },

    take_coords_snapshot:function(start, end, grid)
    {
        var coords_tiles = {}; 
        
        //if(grid[start[1]][start[0]] != flags.CELL_COLLISION_MODE_FULL)
        //{
            coords_tiles.startY = start[1];
            coords_tiles.startX = start[0];
            coords_tiles.start = grid[start[1]][start[0]];

            grid[start[1]][start[0]] = flags.CELL_COLLISION_MODE_OFF;
        //}

        if(grid[end[1]][end[0]] != flags.CELL_COLLISION_MODE_FULL)
        {
            coords_tiles.endY = end[1];
            coords_tiles.endX = end[0];
            coords_tiles.end = grid[end[1]][end[0]];

            grid[end[1]][end[0]] = flags.CELL_COLLISION_MODE_OFF;
        }

        return coords_tiles;
    },

    restore_coords_snapshot:function(coords_tiles, grid)
    {
        if(coords_tiles.start)
        {
            //if(grid[coords_tiles.startY][coords_tiles.startX] != flags.CELL_COLLISION_MODE_FULL)
            //{
                grid[coords_tiles.startY][coords_tiles.startX] = coords_tiles.start;
            //}
        }

        if(coords_tiles.end)
        {
            if(grid[coords_tiles.endY][coords_tiles.endX] != flags.CELL_COLLISION_MODE_FULL)
            {
                grid[coords_tiles.endY][coords_tiles.endX] = coords_tiles.end;
            }
        }
    },

    add_tactical_grid:function(uid, pathIndex, path, radius, passableGrid, cellMode = 0)
    {
        if(this.tactical_uids_grid.has(uid))
        {
            console.log("%cwarning try to add tactical uids, already have uid",'background: #000; color: #bcbf27');
            alert("try to add tactical uids, already have uid");
            
            return;
        }

        var x1 = Math.max(Math.floor(path[pathIndex].x - radius), 0);
        var x2 = Math.min(Math.floor(path[pathIndex].x + radius), game.level.mapGridWidth-1);

        var y1 = Math.max(Math.floor(path[pathIndex].y - radius), 0);
        var y2 = Math.min(Math.floor(path[pathIndex].y + radius), game.level.mapGridHeight-1);
        
        for(var x = x1; x <= x2; x++)
        {
            for(var y = y1; y <= y2; y++)
            {
                if(passableGrid[y][x] < flags.CELL_COLLISION_MODE_HARD)
                {
                    if(this.cells_grid.has(x + " " + y))
                    {
                        var cellStack = this.cells_grid.get(x + " " + y);

                        cellStack = cellStack + cellMode;
                    }
                    else
                    {
                        var cellStack = cellMode;
                    }

                    this.cells_grid.set(x + " " + y, cellStack);

                    if(cellStack >= flags.CELL_COLLISION_MODE_MEDIUM && cellStack < flags.CELL_COLLISION_MODE_HARD)
                    {
                        passableGrid[y][x] = flags.CELL_COLLISION_MODE_MEDIUM;
                    }
                    else if(cellStack > flags.CELL_COLLISION_MODE_OFF)
                    {
                        passableGrid[y][x] = flags.CELL_COLLISION_MODE_SOFT;
                    }
                }

                // if(this.tactical_grid.has(x + " " + y))
                // {              
                //     var tileStack = this.tactical_grid.get(x + " " + y);

                //     if(cellMode == flags.CELL_COLLISION_MODE_SOFT)
                //         tileStack = tileStack + flags.CELL_COLLISION_MODE_SOFT_LIMIT;
                //     else if(cellMode == flags.CELL_COLLISION_MODE_MEDIUM)
                //         tileStack = tileStack + flags.CELL_COLLISION_MODE_MEDIUM_LIMIT;

                //     this.tactical_grid.set(x + " " + y, tileStack);

                //     if(debug.logCells)
                //         console.log("adding tactical from passable grid coord: " + x + " " + y + " " + tileStack);
                // }
                // else
                // {
                //     var tileStack = 0;
                    
                //     if(cellMode == flags.CELL_COLLISION_MODE_SOFT)
                //         tileStack = tileStack + flags.CELL_COLLISION_MODE_SOFT_LIMIT;
                //     else if(cellMode == flags.CELL_COLLISION_MODE_MEDIUM)
                //         tileStack = tileStack + flags.CELL_COLLISION_MODE_MEDIUM_LIMIT;

                //     this.tactical_grid.set(x + " " + y, tileStack);

                //     if(debug.logCells)
                //         console.log("adding tactical from passable grid coord: " + x + " " + y + " " + tileStack);
                // }  
            }
        }

        this.tactical_uids_grid.set(uid, {"x1":x1,"y1":y1,"x2":x2,"y2":y2, "cellMode":cellMode});
    },

    remove_tactical_grid:function(uid, passableGrid, cellMode = 0)
    {
        if(!this.tactical_uids_grid.has(uid))
            return;

        var x1 = this.tactical_uids_grid.get(uid).x1;
        var x2 = this.tactical_uids_grid.get(uid).x2;

        var y1 = this.tactical_uids_grid.get(uid).y1;
        var y2 = this.tactical_uids_grid.get(uid).y2; 

        for(var x = x1; x <= x2; x++)
        {
            for(var y = y1; y <= y2; y++)
            {
                //if(passableGrid[y][x] >= flags.CELL_COLLISION_MODE_SOFT)
                //{
                    var cellStack = this.cells_grid.get(x + " " + y);

                    cellStack = cellStack - cellMode;

                    this.cells_grid.set(x + " " + y, cellStack);

                    if(cellStack == flags.CELL_COLLISION_MODE_OFF)
                    {
                        passableGrid[y][x] = flags.CELL_COLLISION_MODE_OFF;
                    }
                    else if(cellStack < flags.CELL_COLLISION_MODE_MEDIUM)
                    {
                        passableGrid[y][x] = flags.CELL_COLLISION_MODE_SOFT;
                    }
                //}
            }
        }

        this.tactical_uids_grid.delete(uid);
    },

    clear_tactical_grid:function(passableGrid)
    {
        if(this.tactical_uids_grid.size == 0)
            return;

        console.log(this.tactical_uids_grid.size);

        while(this.tactical_uids_grid.size > 0)
        {
            this.itereator = this.tactical_uids_grid.keys();

            var uid = undefined;

            while((key = this.itereator.next().value) != undefined)
            {
                uid = key;

                var x1 = this.tactical_uids_grid.get(uid).x1;
                var x2 = this.tactical_uids_grid.get(uid).x2;
        
                var y1 = this.tactical_uids_grid.get(uid).y1;
                var y2 = this.tactical_uids_grid.get(uid).y2; 

                var cellMode = this.tactical_uids_grid.get(uid).cellMode; 
        
                for(var x = x1; x <= x2; x++)
                {
                    for(var y = y1; y <= y2; y++)
                    {
                        if(passableGrid[y][x] >= flags.CELL_COLLISION_MODE_SOFT)
                        {
                            var cellStack = this.cells_grid.get(x + " " + y);

                            cellStack = cellStack - cellMode;

                            this.cells_grid.set(x + " " + y, cellStack);

                            if(cellStack == flags.CELL_COLLISION_MODE_OFF)
                            {
                                passableGrid[y][x] = flags.CELL_COLLISION_MODE_OFF;
                            }
                            else if(cellStack < flags.CELL_COLLISION_MODE_MEDIUM)
                            {
                                passableGrid[y][x] = flags.CELL_COLLISION_MODE_SOFT;
                            }
                        }
                    }
                }
            }
            this.tactical_uids_grid.delete(uid);
        }
        // if(this.tactical_grid.size == 0)
        //     return;

        // this.itereator = this.tactical_grid.keys();
        // var count = 0;

        // while((key = this.itereator.next().value) != undefined)
        // {   
        //     count++;
        //     var keyStrs = key.split(" ");
        //     var y = parseInt(keyStrs[1],10);
        //     var x = parseInt(keyStrs[0],10);
        //     var tileStack = this.tactical_grid.get(x + " " + y);

        //     if(passableGrid[y][x] == flags.CELL_COLLISION_MODE_OFF)
        //     {
        //         this.tactical_grid.delete(x + " " + y);
        //         continue;
        //     }

        //     if(passableGrid[y][x] == flags.CELL_COLLISION_MODE_SOFT)
        //         tileStack = tileStack - flags.CELL_COLLISION_MODE_SOFT_LIMIT;
        //     else if(passableGrid[y][x] == flags.CELL_COLLISION_MODE_MEDIUM)
        //         tileStack = tileStack - flags.CELL_COLLISION_MODE_MEDIUM_LIMIT;
            
        //     if(debug.logCells)
        //         console.log("removing tactical from passable grid coord: " + x + " " + y + " " + tileStack);

        //     if(tileStack == 0)
        //     {      
        //         if(passableGrid[y][x] != flags.CELL_COLLISION_MODE_FULL)
        //             passableGrid[y][x] = flags.CELL_COLLISION_MODE_OFF;
        //     }
        //     else
        //     {
        //         this.tactical_grid.set(x + " " + y, tileStack);
        //     }
        // }

        // this.tactical_grid.clear();
    },

    set:function(passableGrid)
    {        
        this.itereator = this.static_grid.keys();

        while((key = this.itereator.next().value) != undefined)
        {   
            var keyStrs = key.split(" ");
            var y = parseInt(keyStrs[1],10);
            var x = parseInt(keyStrs[0],10);
            var tileStack = this.static_grid.get(x + " " + y);

            if(passableGrid[y][x] <= flags.CELL_COLLISION_MODE_MEDIUM)
            {
                if(tileStack >= flags.CELL_COLLISION_MODE_MEDIUM_LIMIT)
                {
                    passableGrid[y][x] = flags.CELL_COLLISION_MODE_MEDIUM;
                }
                else if(tileStack > flags.CELL_COLLISION_MODE_OFF)
                {
                    passableGrid[y][x] = flags.CELL_COLLISION_MODE_SOFT;
                }
            }
        }
    },

    // tactical_set:function(passableGrid)
    // {
    //     this.itereator = this.tactical_grid.keys();

    //     while((key = this.itereator.next().value) != undefined)
    //     {   
    //         var keyStrs = key.split(" ");
    //         var y = parseInt(keyStrs[1],10);
    //         var x = parseInt(keyStrs[0],10);
    //         var tileStack = this.tactical_grid.get(x + " " + y);

    //         if(passableGrid[y][x] <= flags.CELL_COLLISION_MODE_MEDIUM)
    //         {
    //             if(tileStack >= flags.CELL_COLLISION_MODE_MEDIUM_LIMIT)
    //             {
    //                 passableGrid[y][x] = flags.CELL_COLLISION_MODE_MEDIUM;
    //             }
    //             else if(tileStack > flags.CELL_COLLISION_MODE_OFF)
    //             {
    //                 passableGrid[y][x] = flags.CELL_COLLISION_MODE_SOFT;
    //             }
    //         }
    //     }
    // }
}
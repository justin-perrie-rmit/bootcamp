var Tactical_AStar = (function ()
{
    /**
     * A* (A-Star) algorithm for a path finder
     * @author  Andrea Giammarchi
     * @license Mit Style License
     */

    function diagonalSuccessors(uid, _N, _S, _E, _W, N, S, E, W, grid, rows, cols, result, i, mode, cellMode)
    {
        if(N > -1 && E < cols)
        {
            mode(grid[N][E], cellMode) && (result[i++] = {x:E, y:N});
        }

        if(N > -1 && W > -1)
        {
            mode(grid[N][W], cellMode) && (result[i++] = {x:W, y:N});
        }

        if(S < rows && E < cols)
        {
            mode(grid[S][E], cellMode) && (result[i++] = {x:E, y:S});
        }

        if(S < rows && W > -1)
        {
            mode(grid[S][W], cellMode) && (result[i++] = {x:W, y:S});
        }

        return result;
    }

    function successors(uid, x, y, grid, rows, cols, mode, cellMode)
    {
        var N = y - 1;
        var S = y + 1;
        var E = x + 1;
        var W = x - 1;

        _N = N > -1 && x > -1 && !grid[N][x];
        _S = S < rows && x > -1 && !grid[S][x];
        _E = E < cols && y > -1 && !grid[y][E];
        _W = W > -1 && y > -1 && !grid[y][W];
        result = [];
        i = 0;

        if(N > -1 && mode(grid[N][x], cellMode))
            _N = true;

        if(S < rows && mode(grid[S][x], cellMode))
            _S = true;

        if(E < cols && mode(grid[y][E], cellMode))
            _E = true;

        if(W > -1 && mode(grid[y][W], cellMode))
            _W = true;

        _N && (result[i++] = {x:x, y:N});
        _E && (result[i++] = {x:E, y:y});
        _S && (result[i++] = {x:x, y:S});
        _W && (result[i++] = {x:W, y:y});
        
        return diagonalSuccessors(uid, _N, _S, _E, _W, N, S, E, W, grid, rows, cols, result, i, mode, cellMode)
    }

    function collisionMode(cellMode, gridMode)
    {
        if(cellMode == flags.CELL_COLLISION_MODE_SOFT)
        {
            return gridMode <= flags.CELL_COLLISION_MODE_SOFT ? true : false;
        }

        return gridMode == flags.CELL_COLLISION_MODE_OFF ? true : false;
    }

    function euclidean(startX, startY, endX, endY)
    {
        var x = startX - endX;
        var y = startY - endY;

        return Math.sqrt(x * x + y * y);
    }

    function diagonalDistance(startX, startY, endX, endY)
    {
        return Math.max(Math.abs(startX - endX), Math.abs(startY - endY));
    }

    function Tactical_AStar(uid, grid, end, start, heuristic, cellMode = 0)
    {
        if(debug.logTacticalAstar)
        {
            if(grid[start[1]][start[0]] == flags.CELL_COLLISION_MODE_OFF)
            {
                console.log("%cSTART collision node is set to " + (grid[start[1]][start[0]] != flags.CELL_COLLISION_MODE_OFF) + ", start: " + 
                    start[0] + " " + start[1] + ", end: " + end[0] + " " + end[1], 
                    "background: #000; color: #00ff00");
            }
            else
            {
                console.log("%cSTART collision node is set to " + (grid[start[1]][start[0]] == flags.CELL_COLLISION_MODE_OFF) + ", start: " + 
                    start[0] + " " + start[1] + ", end: " + end[0] + " " + end[1], 
                    "background: #000; color: #ff0000");
            }

            if(grid[end[1]][end[0]] == flags.CELL_COLLISION_MODE_OFF)
            {
                console.log("%cEND collision node is set to " + (grid[end[1]][end[0]] != flags.CELL_COLLISION_MODE_OFF) + ", start: " + 
                    start[0] + " " + start[1] + ", end: " + end[0] + " " + end[1], 
                    "background: #000; color: #00ff00");
            }
            else
            {
                console.log("%cEND collision node is set to " + (grid[end[1]][end[0]] == flags.CELL_COLLISION_MODE_OFF) + ", start: " + 
                    start[0] + " " + start[1] + ", end: " + end[0] + " " + end[1], 
                    "background: #000; color: #ff0000");
            }
        }

        if(grid[start[1]][start[0]] > 0)
        {
            if(debug.logTacticalAstar)
            {
                if(!(cellMode == flags.CELL_COLLISION_MODE_SOFT && grid[start[1]][start[0]] == flags.CELL_COLLISION_MODE_SOFT))
                {
                    console.log("%cError START node has collision on: " + grid[start[1]][start[0]] + ", start: " + 
                        start[0] + " " + start[1] + ", end: " + end[0] + " " + end[1], 
                        "background: #000; color: #ff0000");
                }                
            }
        }

        var
            cols = grid[0].length,
            rows = grid.length,
            limit = cols * rows,
            result = []
        ;

        if(grid[end[1]][end[0]] > 0)
        {            
            if(debug.logTacticalAstar)
            {
                if(!(cellMode == flags.CELL_COLLISION_MODE_SOFT && grid[start[1]][start[0]] == flags.CELL_COLLISION_MODE_SOFT))
                {
                    console.log("%cError END node has collision on",
                    "background: #000; color: #ff0000");
                    console.log("UID: " + uid);
                    console.log("end[1][0]: " + end[1] + " " + end[0]);
                    console.log(grid[end[1]][end[0]]);
                }
            }
        }

        let neighbours = new Array(8);

        for(let i = 0; i < neighbours.length; i++)
        {
            let neighbour = new Node();
            neighbours[i] = neighbour;
        }

        var mode;

        if(cellMode == flags.CELL_COLLISION_MODE_SOFT)
        {
            mode = (cell, collision) => {                
                return cell <= collision;
            }
        }
        else if(cellMode == flags.CELL_COLLISION_MODE_MEDIUM)
        {
            mode = (cell, collision) => {
                return cell == 0;
            }
        }

        let closed = new Set();
        let openSet = new Set();
        let openHeap = new Heap(limit);

        let current = new Node();

        let destination = new Node(end[0], end[1], 0, 0, end[0]+end[1]*cols);

        openSet.add(start[0]+start[1]*cols);

        openHeap.add(new Node(start[0], start[1], 0, 0, start[0]+start[1]*cols));

        while(true)
        {
            current = openHeap.removeFirst();

            if(!current)
            {                
                return;
            }

            if(closed.has(current.x+current.y*cols))
            {
                closed.set(current.x+current.y*cols);
            }

            if (!(current.x == destination.x && current.y == destination.y))
            {
                let N = current.y - 1;
                let S = current.y + 1;
                let E = current.x + 1;
                let W = current.x - 1;

                let _N = false;
                let _S = false;
                let _E = false;
                let _W = false;

                _N = N > -1;
                _S = S < rows;
                _E = E < cols;
                _W = W > -1;

                _N = N > -1 && collisionMode(cellMode, grid[N][current.x]);
                _S = S < rows && collisionMode(cellMode, grid[S][current.x]);
                _E = E < cols && collisionMode(cellMode, grid[current.y][E]);
                _W = W > -1 && collisionMode(cellMode, grid[current.y][W]);

                neighboursIndex = 0;

                _N && (neighbours[neighboursIndex].x = current.x) && (neighbours[neighboursIndex++].y = N);
                _E && (neighbours[neighboursIndex].x = E) && (neighbours[neighboursIndex++].y = current.y);
                _S && (neighbours[neighboursIndex].x = current.x) && (neighbours[neighboursIndex++].y = S);
                _W && (neighbours[neighboursIndex].x = W) && (neighbours[neighboursIndex++].y = current.y);

                if (_N)
                {
                    _E && collisionMode(cellMode, grid[N][E]) && (neighbours[neighboursIndex].x = E) && (neighbours[neighboursIndex++].y = N);
                    _W && collisionMode(cellMode, grid[N][W]) && (neighbours[neighboursIndex].x = W) && (neighbours[neighboursIndex++].y = N);
                }

                if (_S)
                {
                    _E && collisionMode(cellMode, grid[S][E]) && (neighbours[neighboursIndex].x = E) && (neighbours[neighboursIndex++].y = S);
                    _W && collisionMode(cellMode, grid[S][W]) && (neighbours[neighboursIndex].x = W) && (neighbours[neighboursIndex++].y = S);
                }

                for (let i = 0; i < neighboursIndex; i++)
                {
                    if ((closed.has(neighbours[i].x + neighbours[i].y * cols)))
                    {
                        continue;
                    }

                    let newDistance = current.g + euclidean(current.x, current.y, neighbours[i].x, neighbours[i].y);

                    let neighbourInOpen = false;

                    neighbourInOpen = openSet.has(neighbours[i].x + neighbours[i].y * cols);

                    if (newDistance < neighbours[i].g ||
                        !(neighbourInOpen))
                    {
                        let newNode = new Node(neighbours[i].x, neighbours[i].y);

                        newNode.g = newDistance;
                        newNode.h = heuristic(newNode.x, newNode.y, destination.x, destination.y);
                        newNode.f = newNode.g + newNode.h;
                        newNode.parent = current;

                        openHeap.add(newNode);
                        openSet.add(newNode.x + newNode.y * cols);
                    }
                }
            }
            else
            {
                i = 0;
                length = 0;

                do
                {
                    result[i] = {x: current.x, y:current.y};
                    i++
                }
                while(current = current.parent);

                result.reverse();

                openHeap.clear();

                break;
            }
        }

        return result;
    }

    return Tactical_AStar;

}());
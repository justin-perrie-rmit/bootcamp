/*onmessage = function (e)
{
    var path;

    path = AStar(e.data.grid,
        e.data.start,
        e.data.end,
        'Euclidean',
        e.data.range);

    postMessage({"path":path,"end":e.data.end});
}*/

var AStar = (function ()
{
    /**
     * A* (A-Star) algorithm for a path finder
     * @author  Andrea Giammarchi
     * @license Mit Style License
     */

    /**
     * Modified for WoS path finding
     * @author Justin Perrie
     */

    function withinRange(current, end, range, cols)
    {
        if(range == 0)
        {
            if(current.v == end.v)
            {
                return true;
            }

            return false;
        }
        else
        {
            if(current.v == end.v)
            {
                return true;
            }
            
            var v1 = (end.x - range) + ((end.y - range) * cols);
            var v2 = (end.x + range) + ((end.y - range) * cols); 
            var v3 = (end.x + range) + ((end.y + range) * cols); 
            var v4 = (end.x - range) + ((end.y + range) * cols); 
    
            for(var i = v1; i <= v2; i++)
            {
                if(current.v == i)
                {
                    return true;
                }                    
            }
    
            for(var i = v2; i <= v3; i = i + cols)
            {
                if(current.v == i)
                {
                    return true;
                }                    
            }
    
            for(var i = v3; i >= v4 ; i--)
            {
                if(current.v == i)
                {
                    
                    return true;
                }                    
            }
    
            for(var i = v4; i >= v1; i = i - cols)
            {
                if(current.v == i)
                {
                    return true;
                }                    
            }

            return false;
        }       
    }

    function diagonalSuccessors(uid, _N, _S, _E, _W, N, S, E, W, grid, rows, cols, result, i, mode, cellMode)
    {
        if(N > -1 && W > -1 && E < cols)
        {
            mode(grid[N][E], cellMode) && (result[i++] = {x:E, y:N});
            mode(grid[N][W], cellMode) && (result[i++] = {x:W, y:N});
        }

        if(S < rows && W > -1 && E < cols)
        {
            mode(grid[S][E], cellMode) && (result[i++] = {x:E, y:S});
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

    function euclidean(startX, startY, endX, endY)
    {
        var x = startX - endX;
        var y = startY - endY;

        return Math.sqrt(x * x + y * y);
    }

    function AStar(uid, grid, start, end, cellMode = 0, range = 0)
    {
        var
            cols = grid[0].length,
            rows = grid.length,
            limit = cols * rows,
            list = {},
            result = [],
            open = [{x:start[0], y:start[1], f:0, g:0, v:start[0]+start[1]*cols}],
            length = 1,
            steps,
            adj, max, min, current, next
        ;

        var n = 0;
        var limit = 100;

        end = {x:end[0], y:end[1], v:end[0]+end[1]*cols};

        var mode;

        if(cellMode == flags.CELL_COLLISION_MODE_SOFT)
        {
            mode = (cell, collision) => {                
                if(cell == 0)
                    return true;
                else
                    return cell <= collision;
            }
        }
        else if(cellMode == flags.CELL_COLLISION_MODE_MEDIUM)
        {
            mode = (cell, collision) => {
                return cell == 0;
            }
        }

        do
        {
            max = limit;
            min = 0;

            for(var i = 0; i < length; ++i)
            {
                if(open[i].f < max)
                {
                    max = open[i].f;
                    
                    min = i;
                }
            }
            current = open.splice(min, 1)[0];
            steps++;
            n++;

            if(!withinRange(current, end, range, cols))
            {
                --length;
                
                next = successors(uid, current.x, current.y, grid, rows, cols, mode, cellMode);

                for(var i = 0; i < next.length; ++i)
                {
                    (adj = next[i]).p = current;
                    adj.f = 0;
                    adj.g = 0;
                    adj.v = adj.x + adj.y * cols;
                    current.g = 0;

                    if(!(adj.v in list))
                    {
                        adj.f = (adj.g = current.g + euclidean(adj.x, adj.y, current.x, current.y)) + euclidean(adj.x, adj.y, end.x, end.y);
                        adj.f = Math.round(adj.f * 10) / 10
                        open[length++] = adj;
                        list[adj.v] = 1;
                    }
                }
            }
            else
            {
                var i = 0;
                length = 0;

                do
                {
                    result[i] = {x: current.x, y:current.y};
                    i++
                }
                while(current = current.p);

                result.reverse();
            }
        }
        while(length);

        return result;
    }

    return AStar;

}());

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

function radians_to_degrees(radians)
{
    return radians * (180/Math.PI);
}
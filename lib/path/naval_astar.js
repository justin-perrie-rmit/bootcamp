var naval_astar =
{
    startWayPoint:undefined,
    endWayPoint:undefined,
    naval_path:undefined,

    search:function(item, wayPoints, end)
    {
        var rows = wayPoints.length;
        var cols = wayPoints[0].length;

        var limit = cols * rows;

        var path = [];

        var neighbours;
        //let closed = new Set();
        let closedSet = new Set();
        let openHeap = new Heap(limit);

        let current = new Node();   
        
        var destination = this.createDestination(end, cols, wayPoints);

        //var destination = {x:end[0],y:end[1]};

        closedSet.add(item.x + item.y * cols);
        
        openHeap.add(this.createSource(item, cols, wayPoints));

        //openHeap.add(new Node((item.y), (item.x), 0, 0, item.x + item.y * cols));

        while(true)
        {
            current = openHeap.removeFirst();

            if(!current)
                return;

            // if(closed.has(current.x+current.y*cols))
            // {
            //     closed.set(current.x+current.y*cols);
            // }

            if (!(current.x == destination.x && current.y == destination.y))
            {
                neighbours = this.createNeighbours(current, wayPoints, rows, cols);
                
                for(var i = 0; i < neighbours.length; i++)
                {
                    // if(neighbours[i] == undefined)
                    //     continue;

                    // if ((closed.has(neighbours[i].x + neighbours[i].y * cols)))
                    //     continue;                    

                    // if(neighbours[i] == undefined || item.layer == neighbours[i].locked || exploredSet.has(neighbours[i].h))
                    //     continue;

                    let newDistance = current.g + euclidean(current.x, current.y, neighbours[i].x, neighbours[i].y);

                    let neighbourInOpen = false;

                    neighbourInOpen = closedSet.has(neighbours[i].x + neighbours[i].y * cols);

                    if (!(neighbourInOpen))
                    {
                        //Node* newNode = new Node(neighbours[i].x, neighbours[i].y, neighbours[i].g, neighbours[i].h, neighbours[i].f, neighbours[i].parent);
                        let newNode = new Node(neighbours[i].x, neighbours[i].y);

                        newNode.g = newDistance;
                        newNode.h = euclidean(newNode.x, newNode.y, destination.x, destination.y);
                        newNode.f = newNode.g + newNode.h;
                        newNode.parent = current;

                        closedSet.add(newNode.x + newNode.y * cols);
                        openHeap.add(newNode);
                        

                    }
                }
            }
            else
            {
                i = 0;
                length = 0;

                do
                {
                    path.push({x: current.x, y:current.y});
                    i++
                }
                while(current = current.parent);

                path.reverse();

                openHeap.clear();

                break;
            }
        }

        return path;
    },

    createNeighbours: function(current, wayPoints, rows, cols)
    {
        var neighbours = [];

        var spacing = nav.wayPointsSpacing;
        var gridOffset = spacing; // offset for real-world alignment

        var x = Math.floor((current.x - gridOffset) / spacing);
        var y = Math.floor((current.y - gridOffset) / spacing);

        var directions = [
            [0, -1], // North
            [0, 1],  // South
            [1, 0],  // East
            [-1, 0]  // West
        ];

        for (var d = 0; d < directions.length; d++)
        {
            var dx = x + directions[d][0];
            var dy = y + directions[d][1];

            if (dx >= 0 && dx < cols && dy >= 0 && dy < rows && wayPoints[dy][dx])
            {
                var neighbour = wayPoints[dy][dx];
                if (neighbour.locked == flags.LAYER_UNLOCKED)
                    neighbours.push(neighbour);
            }
        }

        return neighbours;
    },

    createSource(item, cols, wayPoints)
    {
        var start_x = item.x;
        var start_y = item.y;

        var closestNode = null;
        var minDistance = Infinity;

        for (var i = 0; i < wayPoints.length; i++)
        {
            for (var j = 0; j < wayPoints[i].length; j++)
            {
                var point = wayPoints[i][j];
                if (!point) continue;

                var dx = point.x - start_x;
                var dy = point.y - start_y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < minDistance)
                {
                    minDistance = distance;
                    closestNode = point;
                }
            }
        }

        if (closestNode)
        {
            // You can adjust f value as needed; here using item.x + item.y * cols as in your code
            var fValue = start_x + start_y * cols;
            return new Node(closestNode.x, closestNode.y, 0, 0, fValue);
        }
        else
        {
            console.warn("No valid source point found.");
            return null;
        }
    },

    createDestination(end, cols, wayPoints)
    {
        var end_x = end[0];
        var end_y = end[1];

        var closestNode = null;
        var minDistance = Infinity;

        for (var i = 0; i < wayPoints.length; i++)
        {
            for (var j = 0; j < wayPoints[i].length; j++)
            {
                var point = wayPoints[i][j];
                if (!point) continue;

                var dx = point.x - end_x;
                var dy = point.y - end_y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < minDistance)
                {
                    minDistance = distance;
                    closestNode = point;
                }
            }
        }

        if (closestNode)
        {
            return new Node(closestNode.x, closestNode.y, 0, 0, 0);
        }
        else
        {
            console.warn("No valid waypoint found.");
            return null;
        }
    },

    euclidean:function(startX, startY, endX, endY)
    {
        var x = startX - endX;
        var y = startY - endY;

        return Math.sqrt(x * x + y * y);
    }
}
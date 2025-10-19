var floodFill =
{
    visited:undefined,
    secondaryNeighbours:undefined,

    search:function(x, y, grid, cellMode, off = 0)
    {
        start = {x:x, y:y, neighbours:[], visited:false};

        queue = [];

        this.visited = new Set();
        this.secondaryNeighbours = new Set();

        queue.push(start);

        while (queue.length > 0)
        {
            var currentNode = queue[0];

            queue.splice(0, 1);

            var x = currentNode.x;
            var y = currentNode.y;

            // console.log(x + " " + y);

            currentNode.visited = true;

            //grid[y][x] = cellMode;

            this.visited.add(y + " " + x);

            this.neighbours(grid, x, y, currentNode, cellMode, off).forEach((adjacent_neighbour)=>
            {
                if(!this.visited.has(adjacent_neighbour.y + " " + adjacent_neighbour.x))
                {
                    queue.push(adjacent_neighbour);
                }
            });
        }
    },

    neighbours:function(image, x, y, currentNode, cellMode, off = 0)
    {
        var U = y - 1;
        var D = y + 1;
        var L = x - 1;
        var R = x + 1;

        if(L >= 0 && image[y][L] >= cellMode && !this.visited.has(y + " " + L))
            currentNode.neighbours.push({x:L, y:y, neighbours:[], visited:false});

        if(L >= 0 && image[y][L] == off)
        {
            this.secondaryNeighbours.add(L + " " + y);
        }

        if(R < image.length && image[y][R] >= cellMode && !this.visited.has(y + " " + R))
            currentNode.neighbours.push({x:R, y:y, neighbours:[], visited:false});

        if(R < image.length && image[y][R] == off)
        {
            this.secondaryNeighbours.add(R + " " + y);
        }

        if(U >= 0 && image[y][R] >= cellMode && !this.visited.has(U + " " + x))
            currentNode.neighbours.push({x:x, y:U, neighbours:[], visited:false});

        if(U >= 0 && image[U][x] == off)
        {
            this.secondaryNeighbours.add(x + " " + U);
        }

        if(D < (image[0]).length && image[D][x] >= cellMode && !this.visited.has(D + " " + x))
            currentNode.neighbours.push({x:x, y:D, neighbours:[], visited:false});

        if(D < (image[0]).length && image[D][x] == off)
        {
            this.secondaryNeighbours.add(x + " " + D);
        }

        // console.log(image[y][L]);
        // console.log(image[y][R]);
        // console.log(image[U][x]);
        // console.log(image[D][x]);

        // console.log(cellMode);
        // console.log(currentNode.neighbours);

        return currentNode.neighbours;
    }
}

function startFloodFill()
{
    image = [
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,1,1,1,0],
        [0,1,1,1,0],
        [0,0,0,0,0]
    ];

    floodFill.search(2, 2, image, 1, 0);

    console.log(floodFill.visited.size)
    console.log(image);
    console.log(floodFill.secondaryNeighbours)
}
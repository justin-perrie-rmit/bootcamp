var NearestShortPath = (function ()
{
    var directionCoords = [[-1,-1],[0,-1],[+1,-1],[-1,0],[+1,0],[-1,+1],[0,+1],[+1,+1]];
    var visited = [];

    function euclidean(startX, startY, endX, endY)
    {
        var x = startX - endX;
        var y = startY - endY;
        
        return Math.sqrt(x * x + y * y);
    }

    function findNextClosestStep(grid, start, end)
    {
        var cols = grid[0].length;

        console.log(cols);

        var reductedDirectionCoords = [];

        for(var i = 0; i < directionCoords.length; i++)
        {
            for(var j = 0; j < visited.length; j++)
            {
                if(visited[j].x == directionCoords[0] &&
                    visited[j].y == directionCoords[1])
                {
                    continue;    
                }

                reductedDirectionCoords[i] = directionCoords[i];
            }
        }
            
        //visited = {};
        //console.log(grid);

        var nextSteps = [];

        for(var i = 0; i < reductedDirectionCoords.length; i++)
        {
            if(grid[(start[1] + reductedDirectionCoords[i][0])]
                    [start[0] + + reductedDirectionCoords[i][1]] == 0)
            {
                nextSteps.push(euclidean(start[0] + reductedDirectionCoords[i][0],
                    start[1] + reductedDirectionCoords[i][1],
                    end[0],
                    end[1]));
            }
        }
        
        /*if(grid[(start[1]-1)][start[0]-1] == 0)
            nextSteps.push(euclidean(start[0]-1, start[1]-1, end[0], end[1]));
        if(grid[(start[1]-1)][start[0]] == 0)
            nextSteps.push(euclidean(start[0], start[1]-1, end[0], end[1]));
        if(grid[(start[1]-1)][start[0]+1] == 0)
            nextSteps.push(euclidean(start[0]+1, start[1]-1, end[0], end[1]));
        if(grid[(start[1])][start[0]-1] == 0)
            nextSteps.push(euclidean(start[0]-1, start[1], end[0], end[1]));
        if(grid[(start[1])][start[0]+1] == 0)
            nextSteps.push(euclidean(start[0]+1, start[1], end[0], end[1]));
        if(grid[(start[1]+1)][start[0]+1] == 0)
            nextSteps.push(euclidean(start[0]-1, start[1]+1, end[0], end[1]));
        if(grid[(start[1]+1)][start[0]-1] == 0)
            nextSteps.push(euclidean(start[0], start[1]+1, end[0], end[1]));
        if(grid[(start[1]+1)][start[0]-1] == 0)
            nextSteps.push(euclidean(start[0]+1, start[1]+1, end[0], end[1]));*/

        /*if(grid[(start[1]-1)*cols + start[0]-1] == 0)
            nextSteps.push(euclidean(start[0]-1, start[1]-1, end[0], end[1]));
        if(grid[(start[1]-1)*cols + start[0]] == 0)
            nextSteps.push(euclidean(start[0], start[1]-1, end[0], end[1]));
        if(grid[(start[1]-1)*cols + start[0]+1] == 0)
            nextSteps.push(euclidean(start[0]+1, start[1]-1, end[0], end[1]));
        if(grid[(start[1])*cols + start[0]-1] == 0)
            nextSteps.push(euclidean(start[0]-1, start[1], end[0], end[1]));
        if(grid[(start[1])*cols + start[0]+1] == 0)
            nextSteps.push(euclidean(start[0]+1, start[1], end[0], end[1]));
        if(grid[(start[1]+1)*cols + start[0]+1] == 0)
            nextSteps.push(euclidean(start[0]-1, start[1]+1, end[0], end[1]));
        if(grid[(start[1]+1)*cols + start[0]-1] == 0)
            nextSteps.push(euclidean(start[0], start[1]+1, end[0], end[1]));
        if(grid[(start[1]+1)*cols + start[0]-1] == 0)
            nextSteps.push(euclidean(start[0]+1, start[1]+1, end[0], end[1]));*/

        //console.log(nextSteps);

        var min = nextSteps[0];
        //console.log(min);
        var index = 0;

        for(var i = 1; i < nextSteps.length; i++)
        {
            //console.log(nextSteps[i]);
            if(nextSteps[i] < min)
            {
                min = nextSteps[i];
                index = i;
                //console.log(index);
            }                 
        }

        visited.push({x:directionCoords[index][0], y: directionCoords[index][1]});

        return directionCoords[index];
    }

    function NearestShortPath(grid, start, end)
    {
        /*var start = [];
        start[0] = 1;
        start[1] = 1;

        var end = [];
        end[0] = 5;
        end[1] = 5;

        var path = [];*/

        console.log("start: " + start[0] + ", " + start[1]);
        console.log("end: " + end[0] + ", " + end[1]);

        var counter = 0;
        var limit = 1000;

        var path = [];
        
        do
        {
            if(counter == limit)
            {
                console.log("reach limit");
                break;
            }
            counter++;

            var newDirectionCoord = findNextClosestStep(grid, start, end);

            start[0] = start[0] + newDirectionCoord[0];
            start[1] = start[1] + newDirectionCoord[1];

            console.log(start[0] + ", " + start[1]);

            path.push({x:start[0]+newDirectionCoord[0],y:start[1]+newDirectionCoord[1]});
        }
        while(!(start[0] == end[0] && start[1] == end[1]));

        return path;
    }    

    return NearestShortPath;
}());

function run()
{
    console.log("Nearest Path");
    
    var grid = [
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,1,1,1,0,0,0,0,
        0,0,0,1,1,1,0,0,0,0,
        0,0,0,1,1,1,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
    ];

    var start = [];
    start[0] = 1;
    start[1] = 1;

    var end = [];
    end[0] = 7;
    end[1] = 7;

    var path = [];

    NearestShortPath(grid, start, end, path);

    console.log(path);
}
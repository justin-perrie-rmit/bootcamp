function distanceBetweenTwoPoints(startX, startY, endX, endY)
{
	var x = startX - endX;
	var y = startY - endY;

	return Math.sqrt(x * x + y * y);
}

var bline = 
{
    n:0,
    visted:new Set(),
    deadEnd:new Set(),

    search:function(n, grid,start,end)
    {
        path = [];
        var steps = 0;

        console.log("Starting position (search): " + start[0] + " " + start[1]);

        console.log("start x: " + start[0] + ", " + start[1]);
        console.log("end x: " + end[0] + ", " + end[1]);

        do
        {
            start = this.move(grid,start,end);

            if(!this.deadEnd.has(start[0] + " " + start[1]))
            {
                path.push({"x":start[0],"y":start[1]});

                steps++;
    
                if(n == steps)
                {
                    this.visted.clear();
                    this.deadEnd.clear();
                    return false;
                }
            }
        }
        while((!(start[0] == end[0] && start[1] == end[1])));

        this.visted.clear();
        this.deadEnd.clear();

        return path;
    },

    withinLength:function(n,grid,start,end)
    {
        var steps = 0;

        do
        {
            start = this.move(grid,start,end);       
            
            steps++;

            if(n == steps)
            {
                this.visted.clear();
                this.deadEnd.clear();
                return false;
            }
        }
        while((!(start[0] == end[0] && start[1] == end[1])));

        this.visted.clear();
        this.deadEnd.clear();

        return true;
    },

    move:function(grid,start,end)
    {
        var x = start[0];
        var y = start[1];

        var cols = grid[0].length;
        var rows = grid.length;

        var distances = [];
        var min;

        if(start[0] > 0)
        {
            x = start[0] - 1;

            if(grid[y][x] == 0 && !this.visted.has(x + " " + y) && !this.deadEnd.has(x + " " + y))
            {
                var distance = distanceBetweenTwoPoints(x, start[1], end[0], end[1]);
                distances.push({"dist":distance,"dir":2});
            } 
        }

        if(start[0] < rows - 1)
        {
            x = start[0] + 1;

            if(grid[y][x] == 0 && !this.visted.has(x + " " + y) && !this.deadEnd.has(x + " " + y))
            {
                var distance = distanceBetweenTwoPoints(x, start[1], end[0], end[1]);
                distances.push({"dist":distance,"dir":3});
            } 
        }

        x = start[0];

        if(start[1] > 0)
        {
            y = start[1] - 1;

            if(grid[y][x] == 0 && !this.visted.has(x + " " + y) && !this.deadEnd.has(x + " " + y))
            {   
                var distance = distanceBetweenTwoPoints(start[0], y, end[0], end[1]);
                distances.push({"dist":distance,"dir":0});
            }      
        }

        if(start[1] < cols - 1)
        {
            y = start[1] + 1;

            if(grid[y][x] == 0 && !this.visted.has(x + " " + y) && !this.deadEnd.has(x + " " + y))
            {
                var distance = distanceBetweenTwoPoints(start[0], y, end[0], end[1]);
                distances.push({"dist":distance,"dir":1});
            }
        }        

        x = start[0];
        y = start[1];        

        if(start[1] > 0 && start[0] > 0)
        {
            x = start[0] - 1;
            y = start[1] - 1;

            if(grid[y][x] == 0 && !this.visted.has(x + " " + y) && !this.deadEnd.has(x + " " + y))
            {
                x = start[0] - 1;
                y = start[1] - 1;
                distances.push({"dist":distanceBetweenTwoPoints(x, y, end[0], end[1]),"dir":4});
            }    
        }

        x = start[0];
        y = start[1];

        if(start[1] < cols - 1 && start[0] > 0)
        {
            x = start[0] - 1;
            y = start[1] + 1;

            if(grid[y][x] == 0 && !this.visted.has(x + " " + y) && !this.deadEnd.has(x + " " + y))
            {
                x = start[0] - 1;
                y = start[1] + 1;
                distances.push({"dist":distanceBetweenTwoPoints(x, y, end[0], end[1]),"dir":5});
            }    
        }

        x = start[0];
        y = start[1];

        if(start[1] < cols - 1 && start[0] < rows - 1)
        {
            x = start[0] + 1;
            y = start[1] + 1;

            if(grid[y][x] == 0 && !this.visted.has(x + " " + y) && !this.deadEnd.has(x + " " + y))
            {
                y = start[1] + 1;
                x = start[0] + 1;
                distances.push({"dist":distanceBetweenTwoPoints(x, y, end[0], end[1]),"dir":6});
            }    
        }

        y = start[1];
        x = start[0];

        if(start[1] > 0 )
        {
            x = start[0] + 1;
            y = start[1] - 1;

            if(grid[y][x] == 0 && !this.visted.has(x + " " + y) && !this.deadEnd.has(x + " " + y))
            {
                x = start[0] + 1;
                y = start[1] - 1;
                distances.push({"dist":distanceBetweenTwoPoints(x, y, end[0], end[1]),"dir":7});
            }    
        }

        min = 1000;
        var index = -1;

        for(var i = 0; i < distances.length; i++)
        {
            if(distances[i].dist < min)
            {
            min = distances[i].dist;
            index = distances[i].dir;
            }      
        }

        if(distances.length == 0)
        {
            console.log("dead end");

            this.visted.clear();

            this.deadEnd.add(start[0] + " " + start[1]);

            return start;
        }        

        if(index == 0)
            start[1] = start[1] - 1;

        if(index == 1)
            start[1] = start[1] + 1;

        if(index == 2)
            start[0] = start[0] - 1;

        if(index == 3)
            start[0] = start[0] + 1;

        if(index == 4)
        {
            start[0] = start[0] - 1;
            start[1] = start[1] - 1;
        }

        if(index == 5)
        {
            start[0] = start[0] - 1;
            start[1] = start[1] + 1;
        } 

        if(index == 6)
        {
            start[0] = start[0] + 1;
            start[1] = start[1] + 1;
        } 

        if(index == 7)
        {
            start[0] = start[0] + 1;
            start[1] = start[1] - 1;
        }     
        
        this.visted.add(start[0] + " " + start[1]);

        return start;
    }
}
/*
var grid = [];
for(var y = 0; y < 720; y++)
{
    grid[y] = [];

    for(var x = 0; x < 480; x++)
    {
        grid[y][x] = 0;
    }
}

var start = [];

start[0] = 5;
start[1] = 5;

var end = [];

end[0] = 60;
end[1] = 40;

const t2 = performance.now();
var results = bline.search(0, grid,start,end);
const t3 = performance.now();

var x = 0;
var y = 0;
//console.log(results);

for( var i = 0; i < results.length; i++)
{
    console.log("x: " + results[i].x + ", y: " + results[i].y)
}

console.log(results.length);

console.log(`Call to bline took ${t3 - t2} milliseconds.`);*/
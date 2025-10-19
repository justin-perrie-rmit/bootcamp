var LineSight = (function ()
{
    function scanGrid(x1,y1,x2,y2)
    {
        outer: for(var i = x1; i <= x2; i++)
        {
            inner: for(var j = y1; j <= y2; j++)
            {
                //console.log(i + ", " + j);                

                /*if(i == 7 && j == 7)
                {
                    break outer;
                }*/
            }
        }
    }

    function LineSight(start, end)
    {
        /*console.log("x1: " + start[0]);
        console.log("y1: " + start[1]);
        console.log("x2: " + end[0]);
        console.log("y2: " + end[1]);*/

        var startTime = performance.now();

        var x1 = Math.min(start[0],end[0]);
        var y1 = Math.min(start[1],end[1]);
        var x2 = Math.max(start[0],end[0]);        
        var y2 = Math.max(start[1],end[1]);

        scanGrid(x1, y1, x2, y2);

        console.log(performance.now() - startTime);

        /*console.log("x1: " + x1);
        console.log("y1: " + y1);
        console.log("x2: " + x2);        
        console.log("y2: " + y2);*/
    }   

    return LineSight;
}());
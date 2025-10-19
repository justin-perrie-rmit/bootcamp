box_counter = 0;

function boxOverlap(box1, box2)
{
    // var poly1 = box1;
    // var poly2 = box2;

    // var overlap = Infinity;

    // for (var shape = 0; shape < 2; shape++)
    // {
    //     if (shape == 1)
    //     {
    //         poly1 = box2;
    //         poly2 = box1;
    //     }

    //     for(var a = 0; a < poly1.length; a = a + 2)
    //     {
    //         var b = (a + 2) % poly1.length;
    //         var axisProjX = (poly1[b] - poly1[a]);
    //         var axisProjY = (poly1[b+1] - poly1[a+1]);

    //         var min_r1 = Infinity;
    //         var max_r1 = -Infinity;

    //         for(var p = 0; p < poly1.length; p = p + 2)
    //         {
    //             var q = (poly1[p] * axisProjX + poly1[p+1] * axisProjY);
    //             min_r1 = Math.min(min_r1, q);
    //             max_r1 = Math.max(max_r1, q);
    //         }

    //         var min_r2 = Infinity;
    //         var max_r2 = -Infinity;

    //         for(var p = 0; p < poly2.length; p = p + 2)
    //         {
    //             var q = (poly2[p] * axisProjX + poly2[p+1] * axisProjY);
    //             min_r2 = Math.min(min_r2, q);
    //             max_r2 = Math.max(max_r2, q);
    //         }

    //         overlap = Math.min(Math.min(max_r1, max_r2) - Math.max(min_r1, min_r2), overlap);

    //         if (!(max_r2 >= min_r1 && max_r1 >= min_r2))
	// 		    return false;
    //     }

    //     return true;
    // }

    var poly1 = box1;
    var poly2 = box2;

    var overlap = Infinity;

    for(var a = 0; a < poly1.length; a = a + 2)
    {
        // var b = (a + 2) % poly1.length;
        // var axisProjX = (poly1[b] - poly1[a]);
        // var axisProjY = (poly1[b+1] - poly1[a+1]);

        var axisProjX = (poly1[(a + 2) % poly1.length] - poly1[a]);
        var axisProjY = (poly1[(a + 3) % poly1.length] - poly1[a + 1]);

        var d = Math.sqrt(axisProjX * axisProjX + axisProjY * axisProjY);

        if(box_counter < 10000)
        {
            //collisionLog.push(axisProjX + ", " + poly1[b] + "," + poly1[a] +  "," + axisProjY + ", " + poly1[b+1] + "," + poly1[a+1] + "," + d);
        }

        box_counter++;

        axisProjX = axisProjX / d;
        axisProjY = axisProjY / d;

        var min_r1 = Infinity;
        var max_r1 = -Infinity;

        for(var p = 0; p < poly1.length; p = p + 2)
        {
            var q = (poly1[p] * axisProjX + poly1[p+1] * axisProjY);
            min_r1 = Math.min(min_r1, q);
            max_r1 = Math.max(max_r1, q);
        }

        var min_r2 = Infinity;
        var max_r2 = -Infinity;

        for(var p = 0; p < poly2.length; p = p + 2)
        {
            var q = (poly2[p] * axisProjX + poly2[p+1] * axisProjY);
            min_r2 = Math.min(min_r2, q);
            max_r2 = Math.max(max_r2, q);
        }

        overlap = Math.min(Math.min(max_r1, max_r2) - Math.max(min_r1, min_r2), overlap);
        
    }

    

    return overlap
}
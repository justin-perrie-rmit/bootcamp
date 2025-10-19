function shapeOverlap(box1, box2)
{
    var poly1 = box1;
    var poly2 = box2;

    for(var shape = 0; shape < 1; shape++)
    {
        if(shape == 1)
        {
            poly1 = box2;
            poly2 = box1;
        }

        for(var p = 0; p < poly1.length; p++)
        {
            var p1sx = poly1[p].x;
            var p1sy = poly1[p].y;

            var p1ex = poly1[(p + 1) % poly1.length].x;
            var p1ey = poly1[(p + 1) % poly1.length].y;

            for (var q = 0; q < poly2.length; q++)
            {
                var p2sx = poly2[q].x;
                var p2sy = poly2[q].y;

                var p2ex = poly2[(q + 1) % poly2.length].x;
                var p2ey = poly2[(q + 1) % poly2.length].y;

                var h = (p2ex - p2sx) * (p1sy - p1ey) - (p1sx - p1ex) * (p2ey - p2sy);
                var t1 = ((p2sy - p2ey) * (p1sx - p2sx) + (p2ex - p2sx) * (p1sy - p2sy)) / h;
                var t2 = ((p1sy - p1ey) * (p1sx - p2sx) + (p1ex - p1sx) * (p1sy - p2sy)) / h;

                if (t1 >= 0.0 && t1 < 1.0 && t2 >= 0.0 && t2 < 1.0)
                    return true;            
            }
        }
    }
  
  return false;
}

function shapeOverlapV2(box1, box2)
{
    var poly1 = box1;
    var poly2 = box2;

    for(var shape = 0; shape < 2; shape++)
    {
        if(shape == 1)
        {
            poly1 = box2;
            poly2 = box1;
        }

        for(var p = 0; p < poly1.length; p++)
        {
            var p1sx = poly1[p].x;
            var p1sy = poly1[p].y;

            var p1ex = poly1[(p + 1) % poly1.length].x;
            var p1ey = poly1[(p + 1) % poly1.length].y;

            for (var q = 0; q < poly2.length; q++)
            {
                var p2sx = poly2[q].x;
                var p2sy = poly2[q].y;

                var p2ex = poly2[(q + 1) % poly2.length].x;
                var p2ey = poly2[(q + 1) % poly2.length].y;

                var h = (p2ex - p2sx) * (p1sy - p1ey) - (p1sx - p1ex) * (p2ey - p2sy);
                var t1 = ((p2sy - p2ey) * (p1sx - p2sx) + (p2ex - p2sx) * (p1sy - p2sy)) / h;
                var t2 = ((p1sy - p1ey) * (p1sx - p2sx) + (p1ex - p1sx) * (p1sy - p2sy)) / h;

                if (t1 >= 0.0 && t1 < 1.0 && t2 >= 0.0 && t2 < 1.0)
                    return true;            
            }
        }
    }
  
  return false;
}

function shapeOverlapA(box1, box2)
{
    var poly1 = box1;
    var poly2 = box2;

    if(box1.p.length != 4 || box2.p.length != 4)
        return;

    var overlap = Infinity;

    for(var shape = 0; shape < 1; shape++)
    {
        if(shape == 1)
        {
            poly1 = box2;
            poly2 = box1;
        }

        for(var a = 0; a < poly1.p.length; a++)
        {
            var b = (a + 1) % poly1.p.length;
            var axisProjX = (poly1.p[b].x - poly1.p[a].x);
            var axisProjY = (poly1.p[b].y - poly1.p[a].y);

            var d = Math.sqrt(axisProjX * axisProjX + axisProjY * axisProjY);
            axisProjX = axisProjX / d;
            axisProjY = axisProjY / d;

            var min_r1 = Infinity;
            var max_r1 = -Infinity;

            for (var p = 0; p < poly1.p.length; p++)
            {
                var q = (poly1.p[p].x * axisProjX + poly1.p[p].y * axisProjY);
                min_r1 = Math.min(min_r1, q);
                max_r1 = Math.max(max_r1, q);
            }

            var min_r2 = Infinity;
            var max_r2 = -Infinity;

            for (var p = 0; p < poly2.p.length; p++)
            {
            var q = (poly2.p[p].x * axisProjX + poly2.p[p].y * axisProjY);
            min_r2 = Math.min(min_r2, q);
            max_r2 = Math.max(max_r2, q);
            }

            var overlap = Math.min(Math.min(max_r1, max_r2) - Math.max(min_r1, min_r2), overlap);

            //console.log("overlap: " + overlap);

            /*if (!(max_r2 >= min_r1 && max_r1 >= min_r2))
            {
            return false;
            }*/
        }
    }
    
    return overlap;
}

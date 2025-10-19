class QuadTree
{
    static get Point()
    {
        return class Point
        {
            uid;
            x;
            y;

            constructor(uid, x = 0, y = 0)
            {
                this.uid = uid;
                this.x = x;
                this.y = y;
            }
        };
    }

    static get Boundary()
    {
        return class Boundary
        {
            x;
            y;
            w;
            h;

            constructor(x = 0, y = 0, w = 0, h = 0)
            {
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
            }

            contains(x, y)
            {
                // if(!physics.once)
                // {
                //     console.log(x <= this.x + this.w);
                //     console.log(x >= this.x - this.w);
                //     console.log(y <= this.y + this.h);
                //     console.log(y >= this.y - this.h);
                // }
                return (x <= this.x + this.w &&
                    x > this.x - this.w &&
                    y <= this.y + this.h &&
                    y > this.y - this.h);
            }

            intersect(range)
            {
                return !(range.x - range.w > this.x + this.w ||
                    range.x + range.w < this.x - this.w ||
                    range.y - range.h > this.y + this.h ||
                    range.y + range.h < this.y - this.h);
            }

            intersectPoly(poly) {
                // Calculate the minimum and maximum x and y coordinates of the polygon
                const minX = Math.min(...poly.vertices.map(v => v.x));
                const maxX = Math.max(...poly.vertices.map(v => v.x));
                const minY = Math.min(...poly.vertices.map(v => v.y));
                const maxY = Math.max(...poly.vertices.map(v => v.y));
            
                // Check if the polygon's bounding box intersects with this boundary's bounding box
                return !(maxX < this.x - this.w || minX > this.x + this.w ||
                         maxY < this.y - this.h || minY > this.y + this.h);
            }

            within(x, y)
            {
                // console.log("(" + (x >= this.x) + "), (" +
                //      (x <= this.w) + "), (" +
                //      (y >= this.y) + "), (" +
                //      (y <= this.h) + ")");
                return (
                    x >= this.x &&
                    x <= this.w &&
                    y >= this.y &&
                    y <= this.h);
            }
        };
    }

    static get Poly()
    {
        return class Poly
        {
            constructor()
            {
                this.vertices = [
                    { x: 0, y: 0 },
                    { x: 0, y: 0 },
                    { x: 0, y: 0 },
                    { x: 0, y: 0 }
                ];
            }
    
            set(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0, x4 = 0, y4 = 0)
            {
                this.vertices = [
                    { x: x1, y: y1 },
                    { x: x2, y: y2 },
                    { x: x3, y: y3 },
                    { x: x4, y: y4 }
                ];
            }

            intersect(point)
            {
                return !(point.x < Math.min(...this.vertices.map(v => v.x)) ||
                         point.x > Math.max(...this.vertices.map(v => v.x)) ||
                         point.y < Math.min(...this.vertices.map(v => v.y)) ||
                         point.y > Math.max(...this.vertices.map(v => v.y)))
            }

            intersectPoly(poly)
            {
                // Calculate the minimum and maximum x and y coordinates of the polygon
                const minX = Math.min(...poly.vertices.map(v => v.x));
                const maxX = Math.max(...poly.vertices.map(v => v.x));
                const minY = Math.min(...poly.vertices.map(v => v.y));
                const maxY = Math.max(...poly.vertices.map(v => v.y));
            
                // Check if the polygon's bounding box intersects with this boundary's bounding box
                return !(maxX < this.x - this.w || minX > this.x + this.w ||
                         maxY < this.y - this.h || minY > this.y + this.h);
            }
    
            contains(point)
            {
                // Check if the point is outside the bounding box of the rotated polygon
                // if (
                //     point.x < Math.min(...this.vertices.map(v => v.x)) ||
                //     point.x > Math.max(...this.vertices.map(v => v.x)) ||
                //     point.y < Math.min(...this.vertices.map(v => v.y)) ||
                //     point.y > Math.max(...this.vertices.map(v => v.y)))
                // {
                //     return false;
                // }

                console.log(this.vertices);
    
                // Check if the point is on the correct side of all edges using SAT
                for (let i = 0; i < this.vertices.length; i++)
                {
                    const p1 = this.vertices[i];
                    const p2 = this.vertices[(i + 1) % this.vertices.length];

                    // Calculate the edge vector
                    const edgeX = p2.x - p1.x;
                    const edgeY = p2.y - p1.y;
                    
                    // Calculate the vector from p1 to the point
                    const toPointX = point.x - p1.x;
                    const toPointY = point.y - p1.y;

                    // Calculate the perpendicular vector to the edge
                    const perpendicularX = -edgeY;
                    const perpendicularY = edgeX;
    
                    // Calculate the dot product of the perpendicular vector and the vector to the point
                    const dotProduct = toPointX * perpendicularX + toPointY * perpendicularY;
    
                    if (dotProduct < 0) 
                        return false; // The point is on the wrong side of an edge
                }
    
                return true; // The point is inside the rotated polygon
            }
        }
    }

    get Point()
    {
        return QuadTree.Point;
    }

    get Boundary()
    {
        return QuadTree.Boundary;
    }

    get Poly()
    {
        return QuadTree.Poly;
    }

    boundary = undefined;
    capacity = 0;
    points = [];
    divided = false;
    currentItemCount = 0;

    upperRight = undefined;
	upperLeft = undefined;
	lowerRight = undefined;
	lowerLeft = undefined;

    constructor(boundary, n = 4)
    {
        this.boundary = boundary;
        this.capacity = n;
        this.divided = false;
    }

    insert(uid, x, y)
    {        
        if(!this.boundary.contains(x, y))
            return;

        if (this.currentItemCount < this.capacity)
        {
            var point = new QuadTree.Point(uid, x, y);
            this.points.push(point);

            this.currentItemCount++;
        }
        else
        {
            if (!this.divided)
            {
                this.subDivide();
            }

            this.upperRight.insert(uid, x, y);
            this.upperLeft.insert(uid, x, y);
            this.lowerRight.insert(uid, x, y);
            this.lowerLeft.insert(uid, x, y);
        }
    }

    subDivide()
	{
		var x = this.boundary.x;
		var y = this.boundary.y;
		var w = this.boundary.w;
		var h = this.boundary.h;

		var ur = new QuadTree.Boundary(x + w / 2, y - h / 2, w / 2, h / 2);
		var ul = new QuadTree.Boundary(x - w / 2, y - h / 2, w / 2, h / 2);
		var lr = new QuadTree.Boundary(x + w / 2, y + h / 2, w / 2, h / 2);
		var ll = new QuadTree.Boundary(x - w / 2, y + h / 2, w / 2, h / 2);

		this.upperRight = new QuadTree(ur, this.capacity);
		this.upperLeft = new QuadTree(ul, this.capacity);
		this.lowerRight = new QuadTree(lr, this.capacity);
		this.lowerLeft = new QuadTree(ll, this.capacity);

		this.divided = true;
	}

    query(range, found = undefined)
	{
		if (found == undefined)
			found = [];

        for (var i = 0; i < this.points.length; i++)
        {
            if (range.within(this.points[i].x, this.points[i].y))
            {
                found.push(this.points[i]);
            }
        }

        if (this.divided)
        {
            this.upperRight.query(range, found);
            this.upperLeft.query(range, found);
            this.lowerRight.query(range, found);
            this.lowerLeft.query(range, found);
        }

        return found;
	}

    queryPoly(poly, found)
    {
        if (!found)
            found = [];
    
        for (let p of this.points)
        {
            if (poly.contains(p))
                found.push(p);            
        }
    
        if (this.divided)
        {
            this.upperRight.queryPoly(poly, found);
            this.upperLeft.queryPoly(poly, found);
            this.lowerRight.queryPoly(poly, found);
            this.lowerLeft.queryPoly(poly, found);
        }
    
        return found;
    }

    show()
    {
        console.log('QuadTree Contents:');
        this.displayNode(this);
    }

    displayNode(node, depth = 0)
    {
        const indent = '  '.repeat(depth);
        console.log(indent + 'Node Boundary:', node.boundary);

        if (node.points.length > 0)
        {
            console.log(indent + 'Points:');
            for (const point of node.points)
            {
                console.log(indent + `- Point ${point.uid}: (${point.x}, ${point.y})`);
            }
        }

        if (node.divided)
        {
            console.log(indent + 'Subdivided Nodes:');
            console.log(indent + 'Upper Right:');
            this.displayNode(node.upperRight, depth + 1);

            console.log(indent + 'Upper Left:');
            this.displayNode(node.upperLeft, depth + 1);

            console.log(indent + 'Lower Right:');
            this.displayNode(node.lowerRight, depth + 1);

            console.log(indent + 'Lower Left:');
            this.displayNode(node.lowerLeft, depth + 1);
        }
    }

    checkUniqueIDs()
    {
        let count = 0;
        const uniqueIDs = new Set(); // Use a set to track unique IDs
        const result = this.checkUniqueIDsInTree(this, uniqueIDs);
        console.log(uniqueIDs.size);
        return result;
    }

    checkUniqueIDsInTree(node, uniqueIDs)
    {
        let result = true;

        for (const point of node.points)
        {
            if (uniqueIDs.has(point.uid))
            {
                console.log(`Duplicate UID found: ${point.uid}`);
                result = false; // Set result to false if a duplicate is found
            }
            else
            {
                uniqueIDs.add(point.uid);
            }
        }

        if (node.divided)
        {
            result = result && this.checkUniqueIDsInTree(node.upperRight, uniqueIDs);
            result = result && this.checkUniqueIDsInTree(node.upperLeft, uniqueIDs);
            result = result && this.checkUniqueIDsInTree(node.lowerRight, uniqueIDs);
            result = result && this.checkUniqueIDsInTree(node.lowerLeft, uniqueIDs);
        }

        return result;
    }
    
    clear()
    {
        this.divided = false;
        this.points = [];
        
        if (this.upperRight)
        {
            this.upperRight.clear();
            this.upperLeft.clear();
            this.lowerRight.clear();
            this.lowerLeft.clear();
        }
        
        this.upperRight = null;
        this.upperLeft = null;
        this.lowerRight = null;
        this.lowerLeft = null;
    }
}
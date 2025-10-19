class Node
{
    x = 0;
    y = 0;
	g = 0.0;
    h = 0.0;
    f = 0.0;
	parent = undefined;
	heapIndex = 0;

    constructor(x = 0, y = 0, g = 0.0, h = 0.0, f = 0.0, parent = undefined)
    {
        this.x = x;
        this.y = y;
        this.g = g;
        this.h = h;
        this.f = f;
        this.parent = parent;
    }

    compareTo(a, b)
	{
        if (a.f < b.f)
			return -1;
		else if (a.f == b.f)
		{
			if (a.h < b.h)
				return -1;
			else if (a.h == b.h)
				return 0;			
			else
				return 1;
		}
		else
			return 1;
	}
}
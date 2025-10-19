class Heap
{
    items;
    currentItemCount = 0;

    constructor(size)
    {
        this.items = Array(size).fill({});
    }

    add(item)
    {
        this.items[this.currentItemCount] = item;
        this.items[this.currentItemCount].heapIndex = this.currentItemCount;

        this.sortUp(this.items[this.currentItemCount]);

        this.currentItemCount++;
    }

    removeFirst()
    {
        var firstItem = this.items[0];

        if(this.currentItemCount == 0)
            return;
            
        this.currentItemCount--;
        this.items[0] = this.items[this.currentItemCount];
        this.items[0].heapIndex = 0;

        this.sortDown(this.items[0]);

        return firstItem;
    }

    updateItem(item)
    {
        this.sortUp(item);
    }

    sortDown(item)
    {
        var markedIndex = item.heapIndex;

        while(true)
        {
            var childIndexLeft = markedIndex * 2 + 1;
            var childIndexRight = markedIndex * 2 + 2;

            var swapIndex = 0;

            if(childIndexLeft < this.currentItemCount)
            {
                swapIndex = childIndexLeft;

                if(childIndexRight < this.currentItemCount)
                {
                    if(this.items[childIndexLeft].compareTo(this.items[childIndexLeft],this.items[childIndexRight]) > 0)
                    {
                        swapIndex = childIndexRight;
                    }
                }

                var compareValue = item.compareTo(this.items[markedIndex], this.items[swapIndex]);

                if(compareValue > 0)
                {
                    this.swap(markedIndex, swapIndex);
                    markedIndex = swapIndex;
                }
                else
                    return;
            }
            else
            {
                return;
            }
        }
    }

    sortUp(item)
    {
        var markedIndex = item.heapIndex;
        var parentIndex = parseInt((item.heapIndex - 1) / 2, 10);

        while(true)
        {
            var parentItem = this.items[parentIndex];

            if(item.compareTo(this.items[markedIndex], parentItem) < 0)
            {
                this.swap(markedIndex, parentIndex);
                markedIndex = parentIndex;
            }                
            else
                break;

            parentIndex = parseInt((markedIndex - 1) / 2, 10);
        }
    }

    swap(itemA, itemB)
    {
        var tempF = this.items[itemA].f;
        var tempH = this.items[itemA].h;
        var tempG = this.items[itemA].g;
        var tempX = this.items[itemA].x;
		var tempY = this.items[itemA].y;
		var tempP = this.items[itemA].parent;

        this.items[itemA].f = this.items[itemB].f;
        this.items[itemA].h = this.items[itemB].h;
        this.items[itemA].g = this.items[itemB].g;
        this.items[itemA].x = this.items[itemB].x;
		this.items[itemA].y = this.items[itemB].y;
		this.items[itemA].parent = this.items[itemB].parent;

        this.items[itemB].f = tempF;
        this.items[itemB].h = tempH;
        this.items[itemB].g = tempG;
        this.items[itemB].x = tempX;
		this.items[itemB].y = tempY;
		this.items[itemB].parent = tempP;
    }

    contains(item)
    {
        return this.items.contains(item);
    }

    capacity()
    {
        return this.items.length;
    }

    length()
    {
        return this.currentItemCount;
    }

    clear()
	{
		this.items.length = 0;
		this.currentItemCount = 0;
	}

    display()
    {
        for(let i = 0; i < this.currentItemCount; i++)
            console.log("{" + this.items[i].f + "} " + " ");
        console.log("\n");
    }
}

function heap_init()
{
    n1 = new Node();
    n1.f = 2.0;

    n2 = new Node();
    n2.f = 31.0;

    n3 = new Node();
    n3.f = 13.0;

    n4 = new Node();
    n4.f = 4.0;

    n5 = new Node();
    n5.f = 39.0;

    n6 = new Node();
    n6.f = 48.0;

    n7 = new Node();
    n7.f = 50.0;

    n8 = new Node();
    n8.f = 23.0;

    n9 = new Node();
    n9.f = 43.0;

    n10 = new Node();
    n10.f = 15.0;

    n11 = new Node();
    n11.f = 20.0;

    n12 = new Node();
    n12.f = 5.0;

    n13 = new Node();
    n13.f = 28.0;

    n14 = new Node();
    n14.f = 7.0;

    n15 = new Node();
    n15.f = 24.0;

    n16 = new Node();
    n16.f = 41.0;

    n17 = new Node();
    n17.f = 37.0;

    n18 = new Node();
    n18.f = 47.0;

    n19 = new Node();
    n19.f = 44.0;

    n20 = new Node();
    n20.f = 1.0;

    heap = new Heap(20);
    heap.add(n1);
    heap.add(n2);
    heap.add(n3);
    heap.add(n4);
    heap.add(n5);
    heap.add(n6);
    heap.add(n7);
    heap.add(n8);
    heap.add(n9);
    heap.add(n10);
    heap.add(n11);
    heap.add(n12);
    heap.add(n13);
    heap.add(n14);
    heap.add(n15);
    heap.add(n16);
    heap.add(n17);
    heap.add(n18);
    heap.add(n19);
    heap.add(n20);

    heap.display();

    f = heap.removeFirst().f;

    console.log("f: " + f)

    f = heap.removeFirst().f;

    console.log("f: " + f)

    f = heap.removeFirst().f;

    console.log("f: " + f)

    f = heap.removeFirst().f;

    console.log("f: " + f)

    f = heap.removeFirst().f;

    console.log("f: " + f)

    heap.display();
}
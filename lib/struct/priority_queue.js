class PriorityQueue
{
    #queue = [];

    isEmpty()
    {
        return this.queue.length == 0;
    }

    append(data)
    {
        this.queue.push(data);
    }

    exist(data)
    {
        return data in this.queue;
    }

    poll(remove = false)
    {
        min = 0;

        for(var i = 0; i < this.queue.length; i++)
        {
            if(this.queue[i].f < this.queue[min].f)
                min = i;
        }

        var item = this.queue[min];

        if(remove)
            this.queue.splice(min, 1);

        return item;
    }

    remove(data)
    {
        this.queue.splice(data, 1);
    }

    size()
    {
        return this.queue.length;
    }
}
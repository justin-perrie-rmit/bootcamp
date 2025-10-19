var allocator =
{
    firstIndices:new Map(),
    lastIndices:new Map(),

    pushFirst:function(item, search = undefined)
    {
        var index = 0;

        if(search != undefined && this.firstIndices.has(search))
        {
            index = this.firstIndices.get(search, game.items.length);

            if(index == 0)
                game.items.splice(index, 0, item);
            else
                game.items.splice(index-1, 0, item);

            return;
        }

        game.items.push(item);
    },

    setFirst:function(type)
    {
        if(!this.firstIndices.has(type))
        {
            this.firstIndices.set(type, game.items.length);
        }
    },

    setLast:function(type)
    {
        if(this.lastIndices.has(type))
        {
            this.lastIndices.set(type, game.items.length);
        }
    }
}
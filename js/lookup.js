var lookup =
{
    lookupMap:undefined,
    lastAddedItem:undefined,
    lastAddedItemName:"",

    init:function()
    {
        this.lookupMap = new Map();
    },

    add:function(uid, index)
    {
        this.lastAddedItem = uid;
        this.lookupMap.set(uid, index);
    },

    get:function(uid)
    {
        //console.log("uid: " + uid);

        var index = this.lookupMap.get(uid);

        //console.log("index: " + index);

        //console.log(game.items[index]);

        if(game.items[index] != undefined && uid == game.items[index].uid)
        {
            /*console.log("%cLook up was a hit",
				'background: #000; color: #00ff11');*/
            return index;
        }
        else
        {
            if(!uid)
                return;
            
            console.log("%cLook up was a miss: " + uid,
                'background: #000; color: #ff0011');
            for(var i = 0; i < game.items.length; i++)
            {
                if(game.items[i] && game.items[i].uid == uid)
                {
                    this.lookupMap.set(uid, i);

                    return this.lookupMap.get(uid);
                }
            }
        }
    },

    set:function(uid, index)
    {
        this.lookupMap.set(uid, index);
    }
}
var strategist =
{
    target:undefined,
    selected:[],
    uids:undefined,

    add:function(item)
    {
        this.selected.push(item);
    },

    update:function(team)
    {
        this.moveOnToNextTarget(team);

        if(this.selected.length == 0)
            return;

        if(!this.target)
        {
            for(var i = 0; i < game.items.length; i++)
            {
                if(game.items[i].team == team)
                    continue;

                this.target = game.items[i];
            }
        }

        this.uids = [];

        this.uids.length = 0;

        this.findAllOwnItemsViaTypeAndOrders(
            this.selected, team, "infantry", "stand");

        this.findAllOwnItemsViaTypeAndOrders(
            this.selected, team, "vehicles", "stand");

        this.selected.length = 0;

        game.sendCommand(this.uids,{type:"attack",to:{x:this.target.x, y:this.target.y,
            target:{
                uid:this.target.uid,
                name:this.target.name,
                type:this.target.type,
                team:this.target.team,
                x:this.target.x,
                y:this.target.y,
            },}, from:undefined});
    },

    moveOnToNextTarget:function(team)
    {
        if(this.target)
        {
            if(!this.target.isAlive)
            {
                this.target = undefined;

                for(var i = 0; i < game.items.length; i++)
                {
                    if(game.items[i].team == team)
                        continue;

                    if(!game.items[i].isAlive)
                        continue;

                    this.target = game.items[i];
                }

                if(!this.target)
                {
                    return;
                }

                this.findAllOwnItemsViaType(game.items, team, "infantry");
                this.findAllOwnItemsViaType(game.items, team, "vehicles");

                console.log(this.uids)
                console.log(this.target.x)
                console.log(this.target.y)

                game.sendCommand(this.uids,{type:"attack",to:{x:this.target.x, y:this.target.y,
                    target:{
                        uid:this.target.uid,
                        name:this.target.name,
                        type:this.target.type,
                        team:this.target.team,
                        x:this.target.x,
                        y:this.target.y,
                    },}, from:undefined});

                return;
            }
        }
    },

    findAllOwnItemsViaType:function(items, team, type)
    {   
        for(var i = 0; i < items.length; i++)
        {
            if(items[i].team != team)
                continue;

            if(items[i].type != type)
                continue;

            items[i].target = undefined;
            
            this.uids.push(items[i].uid);
        }
    },

    findAllOwnItemsViaTypeAndOrders:function(items, team, type, order)
    {   
        for(var i = 0; i < items.length; i++)
        {            
            if(items[i].team != team)
                continue;

            console.log("post team")
            console.log(items[i].type + " " + type)

            if(items[i].type != type)
                continue;

            console.log("post type")

            if(items[i].orders.type != order)
                continue;

            console.log("post order")

            items[i].target = undefined;
            
            this.uids.push(items[i].uid);
        }
    },
}
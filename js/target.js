var target = 
{
    currentIndex:0,
    currentTarget:undefined,
    attackedTarget:undefined,
    
    init:function()
    {
        this.attackedTarget = new Map();
    },

    searchForTarget:function(uid)
    {
        if(this.currentTarget && this.currentTarget.uid == uid)
            return this.currentTarget;     

        for(var i = 0; i < game.items.length; i++)
        {
            if(game.items[(this.currentIndex + i) % game.items.length] && game.items[(this.currentIndex + i) % game.items.length].uid == uid)
            {
                this.currentTarget = game.items[(this.currentIndex + i) % game.items.length];

                this.currentIndex = i;
                
                return this.currentTarget;
            }
        }
    },

    addItemToAttackedTarget:function(target_uid, item)
    {
        if(this.attackedTarget.has(target_uid))
        {                        
            var tileStack = this.attackedTarget.get(target_uid);

            tileStack.add(item);                  

            this.attackedTarget.set(target_uid, tileStack);
        }
        else
        {
            var tileStack = new Set();
            tileStack.add(item);
            this.attackedTarget.set(target_uid, tileStack);
        } 
    },

    getItemThatAreAttackingTarget:function(target)
    {
        if(!target)
            return;

        if(this.attackedTarget.has(target.target_uid))
        {
            return this.attackedTarget.get(target.target_uid);     
        }
    },

    removeItemFromTheAttackingTarget:function(target, item)
    {
        if(!target)
            return;

        if(this.attackedTarget.has(target.target_uid))
        {                        
            var tileStack = this.attackedTarget.get(target.target_uid);

            tileStack.delete(item);
            
            this.attackedTarget.set(target.target_uid, tileStack);
        }
    },

    removeTargetFromAttackingTarget:function(target_uid)
    {
        if(this.attackedTarget.has(target_uid))
        {
            this.attackedTarget.delete(target_uid)
        }
    },

    searchForNextTarget:function(nonTarget)
    {
        if(!nonTarget)
            return;

        var minDistance = 1000;

        for(var i = 0; i < game.items.length; i++)
        {
            if(game.items[(this.currentIndex + i) % game.items.length])
            {
                if(game.items[i] == nonTarget)
                    continue;

                if(game.items[i].team != nonTarget.team)
                    continue;

                if(game.items[i].type != nonTarget.type)
                    continue;

                var distance = Math.sqrt(
                    Math.pow(game.items[i].x - nonTarget.x, 2) + Math.pow(game.items[i].y - nonTarget.y, 2));	
                    
                if(distance < minDistance)
                {
                    minDistance = distance;
                    this.currentTarget = game.items[this.currentIndex + i];
                }

                this.currentIndex = i;
                
                return this.currentTarget;
            }
        }
    },

    nextCurrentIndex:function()
    {
        this.currentIndex++;
    },

    resetCurrentIndex:function()
    {
        this.currentIndex = 0;
    },

    clearCurrentTarget:function()
    {
        this.currentTarget = undefined;
    }    
}
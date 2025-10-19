async function runAction(action)
{
    let myPromise = new Promise(function(myResolve, myReject) {
        // "Producing Code" (May take some time)
        action();
    });

    myPromise.then(
        function(value) { /* code if successful */ },
        function(error) { /* code if some error */ }
    );
}

var triggers = 
{
    time:1000,
    availableTriggers:new Map(),
    activeTriggers:new Map(),
    blackboard:new Map(),
    blockActiveTrigger:false,

    init:function(savedData = undefined)
    {
        // this.availableTriggers.set("log", console.log);
        // this.availableTriggers.set("endLevel", game.endLevel);
        // this.availableTriggers.set("endMultiplayerLevel", game.endMultiplayerLevel);
        // this.availableTriggers.set("nextLevel", singleplayer.nextLevel);
        // this.availableTriggers.set("hasPlayerWon", game.hasPlayerWon);
        // this.availableTriggers.set("hasPlayerLost", game.hasPlayerLost);            
        // this.availableTriggers.set("hasObserverExit", game.hasObserverExit);

        if(game.level.triggers)
        {
            for(var i = 0; i < game.level.triggers.length; i++)
            {
                this.activeTriggers.set(i, game.level.triggers[i]);
                this.activeTriggers.get(i).uid = i;
                this.activeTriggers.get(i).complete = false;
            }

            // if(savedData)
            // {
            //     console.log(savedData.trigger_uids);

            //     for(var i = 0; i < savedData.trigger_uids.length; i++)
            //     {
            //         this.activeTriggers.delete(savedData.trigger_uids[i]);
            //         console.log(savedData.trigger_uids[i]);
            //     }
            // }

            //console.log(this.activeTriggers);
            
            for(let trigger of this.activeTriggers.values())
            {
                this.run(trigger);
            }
        }        
    },

    run:function(trigger)
    {   
        if(trigger.type == "timed")
        {
            trigger.timeout = setTimeout(function()
            {
                triggers.runTimed(trigger);
            }, trigger.time);            
        }
        else if(trigger.type == "conditional")
        {
            trigger.interval = setInterval(function()
            {  
                triggers.runConditional(trigger);
            }, this.time);
        }
        else if(trigger.type == "conditional_timed")
        {            
            trigger.interval = setInterval(function()
            {
                triggers.runConditionalTimed(trigger, trigger.time);
            }, this.time); 
        }
        else if(trigger.type == "runConditionalInteruptTimer")
        {            
            trigger.interval = setInterval(function()
            {
                triggers.runConditionalInteruptTimer(trigger, trigger.time);
            }, this.time); 
        }
        else if(trigger.type == "instinct")
        {
            trigger.action();
        }
    },

    runTimed:function(trigger)
    {
        if(trigger.repeat)
        {
            this.run(trigger);
        }

        if(typeof(trigger.action) !== 'string')
        {
            trigger.action(trigger);
        }
        else
        {
            var action = this.availableTriggers.get(trigger.action);

            var parameters = trigger.parameters;

            if(parameters.length == 0)
                action();
            else if(parameters.length == 1)
                action(parameters[0]);
            else if(parameters.length == 2)
                action(parameters[0],parameters[1]);
            else if(parameters.length == 3)
                action(parameters[0],parameters[1],parameters[2]);
            else if(parameters.length == 4)
                action(parameters[0],parameters[1],parameters[2],parameters[3]);        
        }
    },

    runConditional:function(trigger)
    {
        if(typeof(trigger.condition) !== 'string')
        {         
            if (trigger.condition())
            {
                if (trigger.depend)
                {
                    // Don't proceed if trigger processing is currently blocked
                    if (this.blockActiveTrigger)
                        return;

                    var dependOn = true;

                    for (var i = 0; i < trigger.depend.length; i++)
                    {
                        var key = trigger.uid + trigger.depend[i];
                        var dependency = this.activeTriggers.get(key);

                        // Fail if dependency is missing or incomplete
                        if (!dependency || !dependency.complete)
                        {
                            dependOn = false;
                            break;
                        }
                    }

                    // Stop here if dependencies aren't fully satisfied
                    if (!dependOn)
                        return;
                }

                // All dependencies are satisfied, clear the trigger
                this.clear(trigger);

                // Call the action if it's a function
                if (typeof trigger.action !== 'string')
                {
                    trigger.action(trigger);
                }
                else
                {
                    var action = this.availableTriggers.get(trigger.action);
    
                    var parameters = trigger.parameters;
        
                    if(parameters.length == 0)
                        action();
                    else if(parameters.length == 1)
                        action(parameters[0]);
                    else if(parameters.length == 2)
                        action(parameters[0],parameters[1]);
                    else if(parameters.length == 3)
                        action(parameters[0],parameters[1],parameters[2]);
                    else if(parameters.length == 4)
                        action(parameters[0],parameters[1],parameters[2],parameters[3]);
                }
            }
            // try
            // {
            //     if(trigger.condition())
            //     {
            //         if(trigger.depend)
            //         {
            //             var dependOn = true;
    
            //             for(var i = 0; i < trigger.depend.length; i++)
            //             {
            //                 if(!this.activeTriggers.get(trigger.uid + trigger.depend[i]).complete)
            //                 {
            //                     dependOn = false;
            //                     break;
            //                 }
            //             }
    
            //             if(!dependOn)
            //                 return;
            //         }
    
            //         this.clear(trigger);
            
            //         if(typeof(trigger.action) !== 'string')
            //             trigger.action(trigger);
            //         else
            //         {
            //             var action = this.availableTriggers.get(trigger.action);
        
            //             var parameters = trigger.parameters;
            
            //             if(parameters.length == 0)
            //                 action();
            //             else if(parameters.length == 1)
            //                 action(parameters[0]);
            //             else if(parameters.length == 2)
            //                 action(parameters[0],parameters[1]);
            //             else if(parameters.length == 3)
            //                 action(parameters[0],parameters[1],parameters[2]);
            //             else if(parameters.length == 4)
            //                 action(parameters[0],parameters[1],parameters[2],parameters[3]);
            //         }
            //     }
            // }
            // catch(error)
            // {
            //     console.log("An error with this trigger, deleting it.");
            //     console.trace();
            //     var index = trigger.uid
            //     this.availableTriggers.delete(index);
            //     this.clear(trigger);
            // }
            
        }
        else
        {
            var result;

            var condition = this.availableTriggers.get(trigger.condition);
    
            var parameters = trigger.parameters;

            if(parameters.length == 0)
                result = condition();
            else if(parameters.length == 1)
                result = condition(parameters[0]);
            else if(parameters.length == 2)
                result = condition(parameters[0],parameters[1]);
            else if(parameters.length == 3)
                result = condition(parameters[0],parameters[1],parameters[2]);
            else if(parameters.length == 4)
                result = condition(parameters[0],parameters[1],parameters[2],parameters[3]);

            if(result)
                console.log(result);

            if(result)
            {
                this.clear(trigger);
        
                if(typeof(trigger.action) !== 'string')
                {
                    trigger.action(trigger);
                }
                else
                {
                    var action = this.availableTriggers.get(trigger.action);
    
                    var parameters = trigger.parameters;
        
                    if(parameters.length == 0)
                        action();
                    else if(parameters.length == 1)
                        action(parameters[0]);
                    else if(parameters.length == 2)
                        action(parameters[0],parameters[1]);
                    else if(parameters.length == 3)
                        action(parameters[0],parameters[1],parameters[2]);
                    else if(parameters.length == 4)
                        action(parameters[0],parameters[1],parameters[2],parameters[3]);
                }
            }
        }        
    },

    runConditionalInteruptTimer:function(trigger, time)
    {
        if(typeof(trigger.condition) !== 'string')
        {
            if(trigger.condition())
            {
                clearInterval(trigger.interval);

                trigger.timeout = setInterval(function()
                {
                    if(trigger.interupt())
                    {
                        clearInterval(trigger.timeout);
                        return;
                    }

                    if(typeof(trigger.action) !== 'string')
                    {
                        trigger.action(trigger);
                    }                   
                }, time);
            }
        }
    },

    runConditionalTimed:function(trigger, time)
    {
        if(typeof(trigger.condition) !== 'string')
        {
            if(trigger.condition())
            {
                clearInterval(trigger.interval);

                trigger.timeout = setTimeout(function()
                {
                    if(trigger.condition())
                    {
                        trigger.action();
                    }
                }, time);
            }
        }
    },

    setToBlackboard(field, value)
    {
        if(!triggers.blackboard.has(value))
        {
            for(var i = 0; i < game.items.length; i++)
            {
                if(game.items[i][field] == value)
                {
                    triggers.blackboard.set(value, game.items[i].uid);
                    break;
                }
            }
        }
    },

    setBlockActiveTrigger:function(blockActiveTrigger)
    {
        this.blockActiveTrigger = blockActiveTrigger;
    },

    clear:function(trigger)
    {
        if(trigger.type == "timed")
            clearTimeout(trigger.timeout);
        else if(trigger.type == "conditional")
            clearInterval(trigger.interval);
        else if(trigger.type == "conditional_timed")
            clearInterval(trigger.interval);
        else if(trigger.type == "runConditionalInteruptTimer")
            clearInterval(trigger.interval);

        trigger.complete = true;  
    },

    clearAll:function()
    {
        if(game.level.triggers)
        {
            for(var i = 0; i < game.level.triggers.length; i++)
            {
                this.clear(game.level.triggers[i]);
            }
        }

        this.activeTriggers.clear();
        this.blackboard.clear();
    }
}
var logs =
{
    logs:[],
    syncLogs:[],
    n:0,

    silentLog:function(str)
    {
        this.logs.push(str);
    },

    syncLog:function(str)
    {
        this.syncLogs.push(str)
    },

    printAll:function()
    {
        if(this.n == 0)
        {
            this.logs.forEach(element => console.log(element));
        }
        else
        {
            for(var i = 0; i < n; i++)
                console.log(this.logs[i]);
        }
    },

    printAllSilent:function()
    {        
        for(var i = 0; i < this.logs.length; i++)
            console.log(this.logs[i]);
    },

    printAllSync:function()
    {        
        for(var i = 0; i < this.syncLogs.length; i++)
            console.log(this.syncLogs[i]);
    },

    clearSyncLogs:function()
    {
        while(this.syncLogs.length > 0)
            this.syncLogs.splice(0, 1);
    }
}
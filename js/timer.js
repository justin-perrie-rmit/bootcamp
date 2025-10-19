var timer =
{
    init:function()
    {
        this.elapsedTimer = setInterval(function()
        {
            game.elapsedTime++;
            //console.log("elapsedTime: " + game.elapsedTime);
        }, 1000);   
    },

    reset:function()
    {
        game.elapsedTime = 0;
        clearInterval(this.elapsedTimer);
    }
}
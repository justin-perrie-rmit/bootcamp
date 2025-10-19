const TICK_RATE = 1000 / 60 / 1000;

var clock =
{
    timer:9999999999,
    day:0,
    days:11,

    update:function()
    {
        //console.log(this.timer);
        //alert()
        this.timer = this.timer - TICK_RATE;
        
    },

    expired: function()
    {
        return this.timer <= 0;
    },

    reset:function()
    {
        this.timer = 300;
    }
}
var sections =
{
    quads:[],
    track:undefined,
    coords:undefined,

    init:function()
    {
        for(var y = 0; y < game.level.mapGridHeight / 10; y++)
        {
            this.quads[y] = [];
            
            for(var x = 0; x < game.level.mapGridWidth / 10; x++)
            {
                this.quads[y][x] = [];
            }
        }

        this.track = new Set();
        this.coords = new Map();
    },

    set:function(x,y,uid,radius)
    {
        var roundedX = Math.floor(x / 10);
        var roundedY = Math.floor(y / 10);

        //console.log("y: " + Math.floor(y / 10) + " , x: " + Math.floor(x / 10));
        //console.log("uid: " + uid);

        this.quads[roundedY][roundedX].push({
            "uid":uid,
            "radius":radius
        });

        this.track.add(uid + roundedY + roundedX);
        this.coords.set(uid, {"x": roundedX, "y": roundedY});
    },

    update:function(uid, x, y)
    {
        var roundedX = Math.floor(x / 10);
        var roundedY = Math.floor(y / 10);

        if(this.track.has(uid + roundedY + roundedX))
        {
            /*var previousX = this.trackX.get(uid);
            var previousY = this.trackY.get(uid);

            trackX.set(uid, Math.floor(x / 10));
            trackY.set(uid, Math.floor(y / 10));

            var sectionItems = this.quads[previousY][previousX];*/
        }
        else
        {
            var coords = this.coords.get(uid);

            if(coords)
            {
                this.track.delete(uid + coords.y + coords.x);
                this.track.add(uid + roundedY + roundedX);
    
                //console.log("Current: " + roundedX + " " + roundedY+ " , Previous: " + coords.x + " " + coords.y);
    
                this.coords.set(uid, {"x": roundedX, "y": roundedY});
            }
        }

        //console.log(this.track.size);
    },

    get:function(x,y)
    {
        return this.quads[Math.floor(y / 10)][Math.floor(x / 10)];
    },

    display:function()
    {
        //console.log(this.quads);
    }
}
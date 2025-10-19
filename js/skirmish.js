var skirmish =
{
    currentLevel:0,
    teamDetails:[],
    levels:[16,17,18],

    init:function()
    {
        this.teamDetails.length = 8;

        for(var i = 0; i < this.teamDetails.length; i++)
        {
            this.teamDetails[i] = ["none", "none"];
        }

        game.level = maps.singleplayer[this.currentLevel];

        for(var i = 0; i < maps.singleplayer.length; i++)
        {
            if(maps.singleplayer[i].type == "skirmish")
            {
                singleplayer.currentLevel = i;
                console.log(singleplayer.currentLevel);
                break;
            }
        }

        for(var i = this.currentLevel; i < maps.singleplayer.length; i++)
        {
            if(maps.singleplayer[i].type == "skirmish")
            {
                renderer.skirmishMapPreviewPaths.push(maps.singleplayer[i].mapPreview);
            }
        }

        renderer.currentMapPreviewPath = renderer.skirmishMapPreviewPaths[this.currentLevel];
    },

    start:function(savedData = undefined)
	{
        for(var i = 0; i < this.teamDetails.length; i++)
        {
            if(this.teamDetails[i][1] == "player")
            {
                game.team = this.teamDetails[i][0];
                break;
            }
        }
    }
}
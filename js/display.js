var display = 
{
    "splashscreen":
    {
        "windowedOffsetY":-111,

        getTGDFileName:function()
        {
            var filename = "images/tgd_title_splash.png";

            return filename;
        },

        getJPFileName:function()
        {
            var filename = "images/tgd_jp_splash.png";

            return filename;
        },

        getDisclaimerFileName:function()
        {
            var filename = "images/wos_disclaimer.png";

            return filename;
        }
    },
    "intro":
    {
        "windowedOffsetY":-111,

        getFileName:function()
        {
            var filename = "images/intro.png";

            if(debug.production)
                filename = "images/interface/" + productionWidth + "_" + productionHeight + "/intro.png";

            return filename;
        },

        getDiscordFileName:function()
        {
            var filename = "images/discord.png";

            return filename;
        },

        getPatreonFileName:function()
        {
            var filename = "images/patreon.png";

            return filename;
        },
    },
    "teamselection":
    {
        getFileName:function()
        {
            var filename = "images/teamselection.png";

            if(debug.production)
                filename = "images/interface/" + productionWidth + "_" + productionHeight + "/teamselection.png";
            
            return filename;
        }
    },
    "missionbriefing":
    {
        getFileName:function()
        {
            var filename = "images/missionbriefing.png";

            if(debug.production)
                filename = "images/interface/" + productionWidth + "_" + productionHeight + "/missionbriefing.png";

            return filename;
        }
    },
    "skirmish":
    {
        getFileName:function()
        {
            var filename = "images/skirmish.png";

            if(debug.production)
                filename = "images/interface/" + productionWidth + "_" + productionHeight + "/skirmish.png";

            return filename;
        }
    },
    "maininterface":
    {
        "mapImageXOffset":0,
        "mapImageYOffset":0,
        "mapImageYGridOffset":4,
        "filenames":[],

        getFileNames:function()
        {
            if(!debug.production)
            {
                display.maininterface.filenames.push("images/maininterface.png")
            }
            else
            {
                display.maininterface.filenames.push("images/interface/" + productionWidth + "_" + productionHeight + "/maininterface.png");
            }

            return display.maininterface.filenames;
        }
    },
    "dialogue":
    {
        getFileName:function()
        {
            var filename = "images/dialogue/dialogue.png";

            return filename;
        }
    },
    "close":
    {
        getFileName:function()
        {
            var filename = "images/close/close.png";

            return filename;
        }
    },
    "login":
    {
        getFileName:function()
        {
            var filename = "images/login/login.png";

            return filename;
        }
    },
    "expenses":
    {
        getFileName:function()
        {
            var filename = "images/expenses/expenses.png";

            return filename;
        }
    },
    "gameover":
    {
        getFileName:function()
        {
            var filename = "images/gameover/gameover.png";

            return filename;
        }
    },
    "bonus":
    {
        getFileName:function()
        {
            var filename = "images/bonus/bonus.png";

            return filename;
        }
    },
    "gameplayScreen":
    {
        "width":1760,
        "height":1000,
    },
    "minimapScreen":
    {
        "dimension":122,
        "x": 1781,
        "y": 17,
        "width":88,
        "height":50,
        "antiWidth":139
    }
}
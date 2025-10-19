var narration =
{
    dialogueTracks:new Map(),
    audio:undefined,
    currentTrackName:undefined,
    repeat:false,
    shuffle:false,
    volume:0.3,
    mute:false,
    pause:false,
    count:0,

    init:function()
    {
        // this.missionTracks.set("campaign_technology_level_zero", new Howl({
        //     src:["../audio/campaign_technology_level_zero.ogg"],
        //     volume: this.volume,
        //     sprite:{
        //         "0":[0,1692],
        //         "1":[1692,2734],
        //         "2":[4426,1631],
        //         "3":[6057,1510],
        //         "4":[7567,4686],
        //         "5":[12253,2690],
        //         "6":[15247,2508],
        //         "7":[17755,1138],
        //         "8":[18893,1785],
        //         "9":[20678,4805],
        //         "10":[25483,1541],
        //         "11":[27024,1606],
        //         "12":[28630,917],
        //         "13":[29547,17108],
        //     }
        // }));
    },

    add:function(level, dialogue)
    {
        if(!flags.GAME_OVER)
            this.dialogueTracks.set(dialogue, "../audio/" + level + "/" + nonNegativeHashCode(removePunctuation(dialogue)) + ".mp3"); 
        else
            this.dialogueTracks.set(dialogue, "../audio/game-over/" + nonNegativeHashCode(removePunctuation(dialogue)) + ".mp3"); 
    },

    play:function(dialogue)
    {
        if(!(debug.audio && debug.audioNarration))
        {
            this.volume = 0;
        }
        else
        {
            music.setVolume(0.05);
        }
        
        if(debug.logNarration)
            console.log("play narration");
        // console.log(this.count.toString());
        // this.missionTracks.get(scene).play(this.count.toString());
        // this.count++;
        console.log(dialogue);
        this.audio = new Howl(
        {            
            src:[this.dialogueTracks.get(dialogue)],
            html5:true,
            loop:false,
            volume: this.volume,
            onload:()=>{
                if(debug.logNarration)
                    console.log("Loaded current narration");
                if(this.audio)
                    this.audio.play();
            },
            onerror: () => {
                //if (debug.logNarration)
                console.log("Error loading or playing narration audio.");
                console.log(dialogue);
            
                // Fallback handling: maybe skip audio and proceed
                // if (game.showMessages.length > 0) {
                //     game.showDialogue();
                // } else {
                //     game.clearDialogue();
                //     game.nextCampaignLevel();
                // }
            },
            onend: () => {
                if(debug.logNarration)
                    console.log("Playback finished");

                // if(debug.translateDialogue)
                // {
                //     const path = this.dialogueTracks.get(dialogue);

                //     const lastSlash = path.lastIndexOf('/');
                //     const lastDot = path.lastIndexOf('.');
    
                //     const hash = path.substring(lastSlash + 1, lastDot);

                //     payload = {"sendTo":"smart","hash":hash, "dialogue":dialogue};
    
                //     localise.sendMessage(payload);
                // }

                // if(game.showMessages.length > 0)
                // {
                //     game.showDialogue();
                // }
                // else
                // {
                //     game.clearDialogue();
                //     game.nextCampaignLevel();
                // }
            },
        });        
    },

    stop:function()
    {
        if(this.audio)
        {
            if(this.audio.playing())
            {
                this.audio.stop();
            }
        }
        
        if(debug.logNarration)
            console.log("stop narration");        
    },

    pause:function()
    {
        if(this.audio)
            this.audio.pause();
    },

    resume:function()
    {
        if(this.audio && !this.audio.playing())
            this.audio.play();
    },

    reset:function()
    {
        this.count = 0;
    },

    clear:function()
    {
        if(this.audio && !this.audio.playing())
            this.audio = undefined;
    },

    validateDialogueTracks:function()
    {
        for (const [key, file] of this.dialogueTracks.entries()) {
            const audio = new Howl({
                src: [file],
                html5: true,
                preload: true,
                onload: () => {
                    console.log(`Validated audio file for key: ${key}`);
                    validTracks.set(key, file);
                },
                onloaderror: () => {
                    console.warn(`Audio file missing or invalid for key: ${key} ${nonNegativeHashCode(this.removePunctuation(key)) + ".mp3"}`);
                },
            });
        }
    }
}
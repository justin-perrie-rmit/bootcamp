var framerate =
{
    fps:0,
    delta:0,
    runIndefinitely:true,
    fpsAverage:[],
    loaded:false,
    loaded2:false,

    getRefreshRate(callback){
        framerate.fps = 60;
        framerate.deltaMultiplierFactor = Math.round((framerate.fps / 60) * 10) / 10;
        framerate.delta = 1 / framerate.deltaMultiplierFactor;
        framerate.elapsedTime = 1 / framerate.fps;
        console.log(framerate.delta);
    }
}


var transition =
{
    fadeOut:function(app, existingContainer, duration = 1, color = 0x000000FF)
    {
        const whiteScreen = new PIXI.Graphics();
        whiteScreen.beginFill(color);
        whiteScreen.drawRect(0, 0, app.screen.width, app.screen.height);
        whiteScreen.alpha = 1; // Fully opaque
        app.stage.addChild(whiteScreen);
    
        const startTime = Date.now();
        const interval = 16;
        const fadeInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
    
            whiteScreen.alpha = 1 - progress;
    
            if (progress >= 1) {
                clearInterval(fadeInterval);
                app.stage.removeChild(whiteScreen);
            }
        }, interval);
    }
}
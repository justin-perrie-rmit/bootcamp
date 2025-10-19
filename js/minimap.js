var minimap =
{
    count:0,
    zoomOut:false,    

    clickOnMinimap:function()
    {
        if(mouse.x > display.minimapScreen.x &&
           mouse.x < display.minimapScreen.x + display.minimapScreen.dimension &&
            mouse.y > display.minimapScreen.y &&
            mouse.y < display.minimapScreen.y + display.minimapScreen.dimension)
        {
            this.count = 0;
            minimap.zoomOut = !minimap.zoomOut;
            //minimap.zoomOut = true;
            
            if(minimap.zoomOut)
                renderer.restoreMiniMap();
            else
                renderer.adjustMiniMap();
                
            renderer.scaleMiniMapBackground();
            return true;
        }

        return false;
    }
}
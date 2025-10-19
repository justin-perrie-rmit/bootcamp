var keyboard =
{
    pan:-1,

    init:function(mode)
    {
        window.addEventListener("keydown", (e) => {
            this.pan = -1;
    
            if(e.key == 'Shift')
            {
                game.runSpeed = 4;
            }

            if(e.key == 'ArrowUp' || e.key == 'w')
            {
                this.pan = flags.PAN_UP;
            }
    
            if(e.key == 'ArrowDown' || e.key == 's')
            {
                this.pan = flags.PAN_DOWN;
            }

            if(e.key == 'ArrowLeft'  || e.key == 'a')
            {
                this.pan = flags.PAN_LEFT;
            }

            if(e.key == 'ArrowRight' || e.key == 'd')
            {
                this.pan = flags.PAN_RIGHT;
            }
        });

        window.addEventListener("keyup", (e) => {
            if(e.key == 'Shift')
            {
                game.runSpeed = 2;
            }

            if(e.key == 'ArrowUp' || e.key == 'w')
            {
                this.pan = flags.PAN_NONE;
            }

            if(e.key == 'ArrowDown' || e.key == 's')
            {
                this.pan = flags.PAN_NONE;
            }

            if(e.key == 'ArrowLeft'  || e.key == 'a')
            {
                this.pan = flags.PAN_NONE;
            }

            if(e.key == 'ArrowRight' || e.key == 'd')
            {
                this.pan = flags.PAN_NONE;
            }
        });


    }
}
var sweeper =
{
    cleanSoftCells:undefined,
    cleanMediumCells:undefined,
    dirtySoftCells:undefined,
    dirtyMediumCells:undefined,

    y: undefined,
    x: undefined,

    run: function(passableGrid)
    {
        let i = 0;
        let j = 0;

        if (this.x !== undefined)
        {
            i = this.y;
            j = this.x;
            this.x = undefined;
        }

        for (; i < passableGrid.length; i++)
        {
            for (; j < passableGrid[i].length; j++)
            {
                if (passableGrid[i][j] === flags.CELL_COLLISION_MODE_SOFT || passableGrid[i][j] === flags.CELL_COLLISION_MODE_MEDIUM)
                {
                    this.y = i;
                    this.x = j;
                    this.x++;

                    var zombieCell = true;

                    for(var k = 0; k < game.items.length; k++)
                    {
                        d = distance(game.items[k].x, game.items[k].y, this.x, this.y)
                        if(d < 4)
                        {
                            zombieCell = false;
                            break;
                        }
                    }

                    if(zombieCell)
                    {
                        console.log("clear zombie cell at " + j + ", " + i + ", " + passableGrid[i][j]);
                        cells.tactical_grid.delete(i + " " + j);
                        passableGrid[i][j] = flags.CELL_COLLISION_MODE_OFF;
                    }


                    if (this.x >= passableGrid[i].length)
                    {
                        this.x = 0;
                        this.y++;
                    }
                    if (this.y >= passableGrid.length)
                    {
                        this.y = 0;
                    }

                    return;
                }
            }

            j = 0;
        }
    },

    // y:undefined,
    // x:undefined,

    // run:function(passableGrid)
    // {
    //     var i = 0;
    //     var j = 0;

    //     if(this.x != undefined)
    //     {
    //         i = this.y;
    //         j = this.x;
    //         this.x = undefined;
    //     }

    //     for (; i < passableGrid.length; i++)
    //     {
    //         while (true)
    //         {
    //             if (passableGrid[i][j] === flags.CELL_COLLISION_MODE_SOFT || flags.CELL_COLLISION_MODE_MEDIUM)
    //             {   
    //                 this.y = i;
    //                 this.x = j;
    //                 this.x++;

    //                 if(this.x == passableGrid[0].length)
    //                 {
    //                     this.x = 0;
    //                     this.y++;

    //                     if(this.y == passableGrid.length)
    //                         this.y = 0;
    //                 }
    //                 return;
    //             }

    //             if(j == passableGrid[0].length)
    //             {
    //                 j = 0;
    //                 break;
    //             }

    //             j++;
    //         }
    //     }
    // },

    setDirtyCells(x, y)
    {
        dirtyMediumCells.push([y, x]);
    }
}
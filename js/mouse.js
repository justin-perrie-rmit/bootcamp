/**
 * This is the Mouse file for WOS which which receives the majority of the input.
 * 
 * Mouse disable the typical right click that is used for web sites.
 * 
 * Draws and selects the selection box for the units.
 */

var mouse =
{
    x:0,
    y:0,

    gameX:0,
    gameY:0,

    gridX:0,
    gridY:0,

    previousX:0,
    previousY:0,
    
    velocity:0,

    numberOfSelected:0,

    dragPressed:false,
    dragSelect:false,
    placement:false,
    specialPhoto:false,
    specialSoil:false,
    building:false,

    repair:false,
    sell:false,
    unloadItem:false,
    target:false,

    deployBuilding:undefined,
    buildingSelected:undefined,
    clickedUid:undefined,

    currentItem:undefined,

    buildingPlacementValid:true,

    moveVoiceTypes:["yep","roger1","roger2"],

    singleton:false,

    /**
     * Initialise the mouse handler
     * 
     */
    init:function()
    {
        if(this.singleton)
            return;

        this.singleton = true;
        
        renderer.app.stage.on("pointermove", (e)=> {
            if(renderer.pause)
                return;

            mouse.x = Math.floor(e.data.global.x);
            mouse.y = Math.floor(e.data.global.y);

            mouse.calculateGameCoordinates();

            renderer.debugMouseX.text = "Mouse XX: " + mouse.x/* / game.gridSize*/;
            renderer.debugMouseY.text = "Mouse YY: " + mouse.y/* / game.gridSize*/;

            if(mouse.dragPressed)
            {
                if((Math.abs(mouse.dragX - mouse.gameX) > 4 ||  Math.abs(mouse.dragY - mouse.gameY) > 4) &&
                    mouse.x < (canvasWidth + canvasWidthOffset - display.maininterface.mapImageXOffset))
                {
                    mouse.dragSelect = true;
                }
            }
            else
            {
                mouse.dragSelect = false;
            }
        });

        renderer.app.stage.on("click", (e)=> {
            if(renderer.pause)
                return;

            if(this.building == false)
                mouse.click(e);
            mouse.dragSelect = false;
        });

        renderer.app.stage.on("rightclick", (e)=>{
            if(renderer.pause)
                return;
            mouse.rightClick(e);
        });

        renderer.app.stage.on("mousedown", (e)=> {

            if(renderer.pause)
                return;

            if(mouse.specialPhoto)
            {
                mouse.specialPhoto = false;
                renderer.captureArea();
            }

            if(mouse.specialSoil)
            {
                mouse.specialSoil = false;
            }
        });

        renderer.app.stage.on("mouseup", (e)=> {

            if(renderer.pause)
                return;

            console.log("mouse up");

            var shiftPressed = e.shiftKey;
            game.onlyInfantry = true;
            var numberOfSelectedItem = 0;

            console.log(game.onlyInfantry);

            if(mouse.dragSelect && !game.multiSelect && !game.multiAttackSelect)
            {
                game.clearSelection();
            }

            this.multiSelection(numberOfSelectedItem, shiftPressed);

            nav.multiType = false;
            mouse.dragPressed = false;

            if(game.selectedItems.length > 0)
            {
                var selectedType = game.selectedItems[0].type;

                for(var i = 1; i < game.selectedItems.length; i++)
                {
                    if(game.selectedItems[i].type != selectedType)
                    {
                        nav.multiType = true;
                        break;
                    }
                }
            }

            if(nav.multiType)
            {
                nav.multiTypeLength = game.selectedItems.length;
            }

            //renderer.debugMouseY.text = 'MultiType: ' + nav.multiType;

            if(game.selectedAttackItems.length > 0)
            {
                this.offensive(game.selectedAttackItems[0]);

                game.selectedAttackItems.length = 0;
            }

            renderer.selectionBox.clear();
        });

        // Listen for mousemove event on the canvas
        renderer.app.view.addEventListener('mousemove', () => {
            var item = this.itemUnderMouse();

            if(item)
            {
                if(findDistanceToItem(game.player, item) > game.distenceThreshold)
                {
                    document.body.style.cursor = autoIcon;
                    return;
                }
            }

            if(item && item.selectable)
            {
                document.body.style.cursor = selectionIcon;                      
            }
            else
            {
                document.body.style.cursor = autoIcon;
            }          
        });
    },

    click:function(ev)
    {
        // if(keyboard.textInputAdded)
        //     return;

        if(this.placement)
            return;

        if(minimap.clickOnMinimap())
            return;

        console.log("mouse clicked");
        
        var clickItem = this.itemUnderMouse();
        var shiftPressed = ev.shiftPressed;
        
        if(clickItem)
        {
            this.theClickedItem = clickItem;
            
            game.selectItem(clickItem, shiftPressed);
        }

        mouse.dragSelect = false;
    },

    rightClick:function(e)
    {
        var clickItem = this.itemUnderMouse();

        mouse.sell = false;
        mouse.repair = false;

        // If the game is in deployBuilding mode, right clicking will cancel deployBuilding mode
        if(game.deployBuilding)
        {
            sidebar.cancelDeployingBuilding();
            return;
        }

        console.log('rightClick');
        

        var selection = [];
        var uids = [];

        for(var i = 0; i < game.selectedItems.length; i++)
        {
            var item = game.selectedItems[i];

            uids.push(item.uid);
            selection.push({uid:item.uid,
                            x:item.x,
                            y:item.y,
                            type:item.type,
                            direction:item.direction,
                            animationCount:item.animationCount,
                            animationSpeed:item.animationSpeed,                                
                            accelerationIndex:item.accelerationIndex,
                            spriteX:item.sprite.x,
                            spriteY:item.sprite.y});
        }

        if(clickItem)
        {
            if(clickItem.isStudent)
            {
                this.talkToTutor(clickItem);
            }
            else if(clickItem.name == "tutor")
            {
                this.talkToTeacherTutor(clickItem);
            }
            else if(clickItem.name == "librarian")
            {
                this.talkToTeacherLibrarian(clickItem);
            }
            else if(clickItem.name == "desk")
            {
                renderer.textbookContainer.visible = true;
            }
        }
        else
        {
            this.move(uids, selection);
        }
    },

    talkToTutor:function(student)
    {
        student.orders.type = "talkToTutor";
        player.currentStudent = student;
        player.currentTeacher = undefined;
    },

    talkToTeacherTutor:function(teacher)
    {
        //teacher.orders.type = "talkToTeacher";
        renderer.showDialogue();
        player.currentTeacher = teacher;
        player.currentStudent = undefined;
    },

    talkToTeacherLibrarian:function(teacher)
    {
        //teacher.orders.type = "talkToLibrarian";
        renderer.showDialogue();
        player.currentTeacher = teacher;
        player.currentStudent = undefined;
    },

    /**
     * The mouse cursor is over a game element.
     *  
     *  Some items will change thet cursor image
     */

    itemUnderMouse:function()
    {
        if(mouse.x >= (canvasWidth + canvasWidthOffset - display.maininterface.mapImageXOffset))
        {
            console.log("outside of canvas");
            return;
        }

        for(var i = game.items.length -1; i >= 0; i--)
        {
            var item = game.items[i];

            if(!item)
                continue;

            var itemX = (game.items[i].x * game.gridSize) * productionRatioX;
            var itemY = (game.items[i].y * game.gridSize) * productionRatio;
            
            itemY = itemY - item.radius / 2;

            if(Math.pow((mouse.x + game.offsetX * productionRatioX) - itemX, 2) + Math.pow((mouse.y + game.offsetY * productionRatio) - itemY, 2) < Math.pow(item.radius * 2, 2))
            {
                return item;
            }
        }
    },

    /**
     * The driver for the units, such as attacking and loading.
     * 
     * Detects for mouse cursor image changes.
     */
    update:function()
    {
        var item = this.itemUnderMouse();

        if(item)
        {
            if(findDistanceToItem(game.player, item) > game.distenceThreshold)
            {
                document.body.style.cursor = autoIcon;
                return;
            }
        }

        if(item && item.selectable)
        {
            document.body.style.cursor = selectionIcon;                      
        }
        else if(game.panX == -1)
        {
            document.body.style.cursor = leftArrowIcon;
        }
        else if(game.panX == 1)
        {
            document.body.style.cursor = rightArrowIcon;
        }
        else if(game.panY == -1)
        {
            document.body.style.cursor = upArrowIcon;
        }
        else if(game.panY == 1)
        {
            document.body.style.cursor = downArrowIcon;
        }
        else
        {
            document.body.style.cursor = autoIcon;
        } 
        // var item = this.itemUnderMouse();

        // if(item && item.selectable)
        // {
        //     document.body.style.cursor = selectionIcon;                      
        // }
        // else
        // {
        //     document.body.style.cursor = autoIcon;
        // }
    },

    setStartingPointSelectionBox:function()
    {
        mouse.dragPressed = true;

        /**
         * Since the mouse coordinates are set to the native resolution
         * of the user's monitor, the mouse x and y need to be scaled
         * to match the actual coordinates of the items.
         */
        
        mouse.dragX = (mouse.x * productionInverseRatioX); 
        mouse.dragY = (mouse.y * productionInverseRatio); 
    },

    multiSelection:function(numberOfSelectedItem, shiftPressed = undefined)
    {
        /**
         * Since the mouse coordinates are set to the native resolution
         * of the user's monitor, the mouse x and y need to be scaled
         * to match the actual coordinates of the items.
         */

        var x1 = Math.min(mouse.x * productionInverseRatioX,mouse.dragX);
        var x2 = Math.max(mouse.x * productionInverseRatioX,mouse.dragX);

        var y1 = Math.min(mouse.y * productionInverseRatio,mouse.dragY);
        var y2 = Math.max(mouse.y * productionInverseRatio,mouse.dragY);

        x1 = (x1 + game.offsetX);
        x2 = (x2 + game.offsetX);

        y1 = (y1 + game.offsetY);
        y2 = (y2 + game.offsetY);

        y1 -= display.maininterface.mapImageYOffset;
        y2 -= display.maininterface.mapImageYOffset;
        
        if(x1 == NaN || y1 == NaN || x2 == NaN || y2 == NaN)
        {
            mouse.dragPressed = false;

            renderer.selectionBox.clear();
            
            return;
        }

        if(x1 == x2 || y1 == y2)
        {
            mouse.dragPressed = false;

            renderer.selectionBox.clear();
            
            return;
        }

        x1 /= game.gridSize;
        y1 /= game.gridSize;
        x2 /= game.gridSize;
        y2 /= game.gridSize;

        renderer.debugMouseDetails.text = "Mouse selectionBox x1: " + x1 + " x2: " + x2 + " y1: " + y1 + " y2: " + y2;
        renderer.debugOffsetX.text = "Mouse Offset X: " + game.offsetX / game.gridSize;
        renderer.debugOffsetY.text = "Mouse Offset Y: " + game.offsetY / game.gridSize;

        for (var i = game.items.length - 1; i >= 0; i--)
        {
            var item = game.items[i];

            // var itemX = (item.x * game.gridSize);
            // var itemY = (item.y * game.gridSize + display.maininterface.mapImageYOffset);

            if(!item)
                continue;

            if(item.type == "buildings")
                continue;   
            
            if(item.selectable && item.team == game.team && x1 <= item.x && x2 >= item.x)
            {
                if(y1<= item.y && y2 >= item.y)
                {
                    if(numberOfSelectedItem >= 12) // 12
                    {
                        if(item.type == "infantry")
                        {
                            game.selectedItemIndexes.unshift(i);
                            game.selectItem(item,shiftPressed);
                        }
                        //console.log("selected: " + numberOfSelectedItem);
                    }
                    else
                    {
                        
                        game.selectedItemIndexes.unshift(i);
                        game.selectItem(item,shiftPressed);
                        numberOfSelectedItem++;
                        //console.log("select: " + numberOfSelectedItem);
                    }
                }
            }   
            
            // var itemX = (game.items[i].x * game.gridSize) * productionRatioX;
            // var itemY = (game.items[i].y * game.gridSize + display.maininterface.mapImageYOffset) * productionRatio;

            if(game.multiAttackSelect)
            {
                if(item.selectable && item.team != game.team && x1 <= itemX && x2 >= itemX)
                {
                    if(y1<= itemY && y2 >= itemY)
                    {
                        game.selectAttackItem(item);
                    }
                }
            }    
        }
    },

    draw:function()
    {
        if(this.dragSelect)
        {
            var x = Math.min(mouse.x * productionInverseRatioX, mouse.dragX);
            var y = Math.min(mouse.y * productionInverseRatio, mouse.dragY);

            var width = Math.abs(mouse.x * productionInverseRatioX - mouse.dragX);
            var height = Math.abs(mouse.y * productionInverseRatio - mouse.dragY);

            // x = Math.floor(x);
            // y = Math.floor(y);

            // width = Math.floor(width);
            // height = Math.floor(height);

            renderer.selectionBox.clear();

            if(game.multiSelect)
                renderer.selectionBox.lineStyle(1 * productionInverseRatio, 0xFFD400, 1 * productionInverseRatio);
            else if(game.multiAttackSelect)
                renderer.selectionBox.lineStyle(1 * productionInverseRatio, 0xF40D30, 1 * productionInverseRatio);
            else
                renderer.selectionBox.lineStyle(1 * productionInverseRatio, 0xFFFFFF, 1 * productionInverseRatio);

            renderer.selectionBox.drawRect(
                (x)/* - (game.offsetX)*/,
                (y)/* - (game.offsetY)*/,
                width, height);
        }

        if(this.placement)
        {
            this.buildingPlacementValid = true;

            renderer.placementGrid.clear();
            renderer.placementGrid.lineStyle(1, 0xFFFFFF, 1);            

            var buildingPlacement = window[game.deployBuildingProduce].list[game.deployBuilding].buildableGrid;
            var buildingPlacementColor = styles.buildingCorrectPlacementColor;

            var buildingPlacementLengthX = buildingPlacement[0].length * productionRatioX;
            var buildingPlacementLengthY = buildingPlacement.length * productionRatio;

            var x = ((Math.floor((mouse.x / game.gridSize) - (buildingPlacementLengthX / 2)) * game.gridSize) + (game.offsetX * productionRatioX));
            var y = ((Math.floor((mouse.y / game.gridSize) - (buildingPlacementLengthY / 2)) * game.gridSize) + (game.offsetY * productionRatio));

            x *= productionInverseRatioX;
            y *= productionInverseRatio;

            var gridX = Math.floor(((mouse.x * productionInverseRatioX + (game.offsetX * productionRatioX) * productionInverseRatioX) / game.gridSize) - buildingPlacementLengthX / 2);
            var gridY = Math.floor(((mouse.y * productionInverseRatio + (game.offsetY * productionRatio) * productionInverseRatio) / game.gridSize) - buildingPlacementLengthY / 2);

            gridY = gridY - display.maininterface.mapImageYOffset / game.gridSize;
            
            if(gridX >= 0 && gridY >= 0 &&
               gridX <= game.level.mapGridWidth - buildingPlacement[0].length &&
               gridY <= game.level.mapGridHeight - buildingPlacement.length)
            {
                for(var y1 = 0; y1 < buildingPlacement.length; y1++)
                {
                    for(var x1 = 0; x1 < buildingPlacement[0].length; x1++)
                    {
                        if(game.currentTerrainMapPassableGrid[gridY + y1][gridX + x1] >= 1)
                        {
                            buildingPlacementColor = styles.buildingIncorrectPlacementColor;
                            this.buildingPlacementValid = false;
                            break;
                        }
                    }
                }
            }

            if(gridX < 0 || gridY < 0 ||
                gridX > game.level.mapGridWidth - buildingPlacement[0].length ||
                gridY > game.level.mapGridHeight - buildingPlacement.length)
            {
                buildingPlacementColor = styles.buildingIncorrectPlacementColor;
                this.buildingPlacementValid = false;
            }

            renderer.placementGrid.beginFill(buildingPlacementColor);

            renderer.placementGrid.drawRect(x - game.offsetX + (game.offsetX % game.gridSize),
                y - game.offsetY + (game.offsetY % game.gridSize),
                game.gridSize*buildingPlacement[0].length, game.gridSize*buildingPlacement.length);

            renderer.placementGrid.anchor = 0.5;

            renderer.placementGrid.alpha = 0.3;

            renderer.placementGrid.endFill();
        }
    },

    move:function(uids, selection)
    {   
        // Get all UIDs that can be commanded to move
        if(uids.length > 0)
        {
            this.numberOfSelected = uids.length;

            var newId = parseInt(Math.random() * 0xFF) + 100;

            game.sendCommand(uids,{type:"move",to:
                {x:mouse.x, 
                 y:mouse.y,
                selected:true, id:newId}, from:selection});
        }
    },

    /**
     * Recalculate the mouse pointer, ignoring the top game interfaces,
     * as well as adjusting for the grid.
     * 
     * Reducing the mouse pointer coordinates by grid size (20)
     */
    calculateGameCoordinates:function()
    {
        mouse.gameX = (mouse.x + game.offsetX);
        mouse.gameY = (mouse.y + game.offsetY);

        //mouse.gridX = Math.floor((mouse.x + game.offsetX * productionRatioX) / game.gridSize);
        //mouse.gridY = Math.floor((mouse.y + game.offsetY * productionRatio) / game.gridSize);
    },
}
var keyboard =
{
    pan:-1,

    init:function(mode)
    {
        window.addEventListener("keydown", (e) => {
            this.pan = -1;

            if (e.key === 'Tab')
            {
                e.preventDefault();
                renderer.textbookContainer.visible = false;
            }

            if (renderer.dialogueContainer.visible)
            {
                // Only handle escape while dialogue is open
                if (e.key === 'Tab')
                {
                    e.preventDefault();

                    if(player.currentStudent)
                    {
                        player.currentStudent.orders.type = "leave";
                        player.currentStudent.talkCount = 0;
                        player.currentStudent.state.talking = false;
                        player.currentStudent.state.talkingToTutor = false;
                        player.currentStudent.state.leaving = true;

                        renderer.clearTextOutput();

                        for(var i = 0; i < game.items.length; i++)
                        {
                            if(game.items[i].uid == player.currentStudent.uid)
                            {
                                game.items[i].target = undefined;
                            }
                        }

                        player.currentStudent = undefined;

                        client.sendMessage({
                            id: game.player.networkUid,
                            role:"dumb",
                            sendTo: "smart",
                            type:"leave",
                            code:game.player.id,
                        });
                    }

                    renderer.hideDialogue();
                }
                return; // Stop here — no movement or interaction during dialogue
            }

            if(e.key == 'Shift')
            {
                game.runSpeed = 4;
            }

            if(e.key == 'ArrowUp')
            {
                this.pan = flags.PAN_UP;
            }
    
            if(e.key == 'ArrowDown')
            {
                this.pan = flags.PAN_DOWN;
            }

            if(e.key == 'ArrowLeft')
            {
                this.pan = flags.PAN_LEFT;
            }

            if(e.key == 'ArrowRight')
            {
                this.pan = flags.PAN_RIGHT;
            }

            if (e.repeat)
                return;
    
            if(e.key == 'w')
            {
                game.player.moveUp();
            }
    
            if(e.key == 's')
            {
                game.player.moveDown();
            }

            if(e.key == 'a')
            {
                game.player.moveLeft();
            }

            if(e.key == 'd')
            {
                game.player.moveRight();
            }

            if(e.key == ' ' || e.key == 'e')
            {
                let closestItem = undefined;
                let closestDistance = Infinity;

                for (let i = 0; i < game.items.length; i++)
                {
                    const item = game.items[i];
                    if (!item)
                        continue;

                    if(item == game.player)
                        continue;

                    if(game.level.mode == "learning")
                    {
                        if(item.isStudent)
                        {
                            continue;
                        }
                    }

                    if(item.name == "narrator")
                        continue;

                    if(item.name == "lecturer")
                        continue;

                    if (game.player)
                    {
                        // Work out the Euclidean distance between player and item
                        const dx = item.x - game.player.x;
                        const dy = item.y - game.player.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        // Check if this item is the closest one so far
                        if (distance < closestDistance)
                        {
                            closestDistance = distance;
                            closestItem = item;
                        }
                    }
                }

                // Optional: perform an action with the closest item
                if (closestItem)
                {
                    if(closestItem.isStudent)
                    {
                        if(closestItem.orders.type != "talking")
                            mouse.talkToTutor(closestItem);
                    }
                    else if(closestItem.name == "tutor")
                    {
                        if(game.player.distanceToTutor < game.player.displayTutorThreshold) 
                            mouse.talkToTeacherTutor(closestItem);
                    }
                    else if(closestItem.name == "librarian")
                    {
                        if(game.player.distanceToLibrarian < game.player.distanceToLibrarianThreshold) 
                            mouse.talkToTeacherLibrarian(closestItem);
                    }
                    else if(closestItem.name == "desk")
                    {
                        renderer.textbookContainer.visible = true;
                    }
                }
            }
        });

        window.addEventListener("keyup", (e) => {
            if(e.key == 'Shift')
            {
                game.runSpeed = 2;
            }

            if(e.key == 'ArrowUp')
            {
                this.pan = flags.PAN_NONE;
            }

            if(e.key == 'ArrowDown')
            {
                this.pan = flags.PAN_NONE;
            }

            if(e.key == 'ArrowLeft')
            {
                this.pan = flags.PAN_NONE;
            }

            if(e.key == 'ArrowRight')
            {
                this.pan = flags.PAN_NONE;
            }

            if(e.key == 'w')
            {
                game.player.moveUpDirection = false;
            }

            if(e.key == 's')
            {
                game.player.moveDownDirection = false;
            }

            if(e.key == 'a')
            {
                game.player.moveLeftDirection = false;
            }

            if(e.key == 'd')
            {
                game.player.moveRightDirection = false;
            }
        });
    }
}
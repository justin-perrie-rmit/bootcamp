/**
 * This is the multiplayer file for WOS
 * 
 * It is called from index.html when the player select the 'Multiplayer' option
 * from the splash screen.
 * 
 * Singleplayer connects to a node js server and receives start up information.
 * 
 * Furthermore, it handles the incoming and outgoing traffic.
 * 
 * The local player will still experience the same delay for there own units as
 * well as their opponent.
 * 
 */

var multiplayer = 
{
    address:"wss://tgame.dev:8444",
    //ddress:"wss://13.239.94.229:8443",
    websocket:undefined,
    currentLevel:0,
    currentCommand:"",
    games:[],
    commands:[],
    lastCommandTime:undefined,
    lastOrders:undefined,
    joined:false,
    currentId:undefined,
    currentTick:0,
    tick:0,
    lastReceivedTick:0,
    sanityCheck:0,
    mode:undefined,

    init:function()
    {
        game.mode = "multiplayer";

        var WebSocketObject = window.WebSocket || window.MozWebSocket;

        if(!WebSocketObject)
        {
            console.log("Your browser does not support Websocket. Multiplayer will not work");
            return;
        }

        console.log("Created Web Socket!");
        
        this.websocket = new WebSocketObject(this.address);
        this.websocket.onmessage = multiplayer.handleMessage;

        this.websocket.onopen = () => {
            console.log("Web Socket open...");
        }

        this.websocket.onerror = () => {
            console.log("Web Socket error...");            
        }

        this.lastCommandTime = performance.now();
    },

    /**
     * Handles the incoming traffic from the server.
     * 
     * JSON (Javascript Object) is received from the server
     * assigns that object to a messageObject. This object
     * coordinates the client's behaviour.
     */
    handleMessage:function(message)
    {
        var messageObject = JSON.parse(message.data);
        
        switch(messageObject.type)
        {
            case "room_list":
                console.log("update room list");
                multiplayer.updateRoomStatus(messageObject);
                break;
            case "joined_game":
                multiplayer.joined = true;
                game.team = messageObject.team;
                console.log("joined room!!!");
                                              
                break;
            case "start_game":
                multiplayer.initialiseLevel(messageObject);
                multiplayer.startGame();
                break;
            case "command":
                multiplayer.corrections(messageObject)
                multiplayer.command(messageObject);
                break;
            case "add_research":
                multiplayer.addResearch(messageObject);
                break;
            case "ping":
                multiplayer.pong(messageObject);
                break
            case "pause_desync":
                multiplayer.desync(messageObject);
            case "gametick":
                multiplayer.recieveGameTick(messageObject);
                break;
            case "latency_ping":
                console.log("recieve latency ping");
                multiplayer.sendWebSocketMessage({type:"latency_pong"});
                break;
            case "chat":
                multiplayer.recieveMessage(messageObject);
                break;
            case "player_disconnected":
                console.log("other player has disconnected");
                renderer.removeGameList();
                renderer.removeMainInterface();
                game.endLevel();
                renderer.initialiseIntro();                
                break;    
        }
    },

    initialiseLevel:function(messageObject)
    {
        if(messageObject.pingpong)
        {
            console.log("acknowledgement to the server");
            multiplayer.acknowledgement();
        }

        console.log(messageObject);

        game.team = messageObject.team;
        generate.seed = messageObject.seed;

        renderer.setCameraOffset(
            messageObject.position.x,
            messageObject.position.y);
        
        game.level = messageObject.currentLevel;

        multiplayer.generateCurrentMapGrid(
            messageObject.mapTable,
            messageObject.currentObstraclesTerrain, messageObject.currentObstraclesIsle,
            messageObject.mapLookup
        );
            
        background.init();

        renderer.level();
    },

    startGame:function()
    {
        game.startMultiplayer();
        
        game.inGame = true;
    },

    updateRoomStatus:function(messageObject)
    {
        console.log(messageObject);

        renderer.updateGameTextList(messageObject.id, messageObject.status);       
    },

    join:function()
    {
        if(renderer.lobbyGameSelected)
        {
            if(renderer.lobbyGameSelected != "Full")
            {
                multiplayer.currentId = renderer.lobbyGameSelectedId;
                multiplayer.sendMessage({
                    type:"join_game",
                    id:multiplayer.currentId,
                    platform:multiplayer.mode
                });
            }
        }
    },

    inGame:function()
    {
        multiplayer.sendMessage({
            type:"in_game",
            id:multiplayer.currentId,
            platform:"player"
        });
    },

    acknowledgement:function()
    {
        multiplayer.sendMessage({
            type:"acknowledgement"
        });
    },

    pong:function(messageObject)
    {
        multiplayer.sendMessage({
            type:"pong",
            team:game.team,
            logs:logs.syncLogs
        });

        logs.clearSyncLogs();
    },

    desync:function(messageObject)
    {
        renderer.desyncText.visible = true;
        renderer.pause = true;
        renderer.skip = true;

        logs.printAllSilent();

        console.log("%cShowing Desync logs",
			'background: #000; color: #ef6c27');

        console.log(messageObject.latest_logs);
    },

    recieveGameTick:function(messageObject)
    {
        //console.log(messageObject);
    },

    adjustTick:function()
    {
        if(multiplayer.currentTick != multiplayer.lastReceivedTick)
        {
            console.log("Adjust tick to server");
            
            multiplayer.currentTick = multiplayer.lastReceivedTick;
        }
    },

    command:function(messageObject)
    {
        this.commandLock = false;

        var delay = Math.round(messageObject.slowestLatency - messageObject.latency);

        console.log("%cDelay by " + delay + " frames",
            'background: #000; color: #1cbf27');

        target.currentTarget = undefined;

        update.setNewGameState(messageObject);
    },

    corrections:function(messageObject)
    {
        if(!messageObject.from)
            return;

        
    },

    addResearch:function(messageObject)
    {
        console.log(messageObject);
    },

    recieveMessage:function(messageObject)
    {
        game.showMessage(messageObject.message);
    },

    leave:function()
    {
        console.log("leave");
        multiplayer.sendMessage({type:"leave"});
    },

    endGame:function()
    {
        console.log("end game mode: " + multiplayer.mode);
        multiplayer.sendMessage({type:"end_game"});
    },

    sendMessage:function(message)
    {
        this.websocket.send(JSON.stringify(message));
    },

    sendCommand:function(uids,orders,from)
	{
        if(!orders.construct)
        {
            if((performance.now() - this.lastCommandTime) < 1000)
                return;
        }

        this.lastCommandTime = performance.now();

        if(this.sameOrders(uids, orders))
            return;

        this.cloneOrders(uids, orders);

        multiplayer.sendWebSocketMessage(
        {
            type:"command",
            gameId:multiplayer.currentId,
            uids:uids,
            orders:orders,
            from:from
        });
    },

    sendChat:function(message)
    {
        multiplayer.sendWebSocketMessage(
        {
            type:"chat",
            message:message
        })
    },

    checksum:function(uids)
    {
        var checksum = {x:0,y:0};

        for(var i=0; i < game.items.length; i++)
        {   
            checksum.x = checksum.x + game.items[i].sprite.x;
            checksum.y = checksum.y + game.items[i].sprite.y;
        }

        return checksum;
    },

    /** sendWebSocketMessage sends the messages from Multiplayer
			to server. Messages are stringified via JSON.

			Note: Messages are measured for their size in bytes and
			is used for debugging purposes.
	*/
    sendWebSocketMessage:function(messageObject)
    {
        this.websocket.send(JSON.stringify(messageObject));
    },

    cloneOrders:function(uids, orders)
    {
        if(!this.lastOrders)
            this.lastOrders = {};

        this.lastOrders.type = orders.type;
        this.lastOrders.uids = uids;

        if(orders.to)
        {
            this.lastOrders.x = orders.to.x;
            this.lastOrders.y = orders.to.y;
        }
        else
        {
            this.lastOrders.x = orders.x;
            this.lastOrders.y = orders.y;
        }
    },

    sameOrders:function(uids, orders)
    {
        if(!this.lastOrders)
            return false;

        if(this.lastOrders.type == orders.type)
        {
            if (uids.length !== this.lastOrders.uids.length) 
                return false;

            for (let i = 0; i < uids.length; i++) 
                if (uids[i] !== this.lastOrders.uids[i]) 
                    return false;

            if(orders.to)
            {
                if(this.lastOrders.x == orders.to.x &&
                   this.lastOrders.y == orders.to.y)
                {
                    console.log(orders);
                    return true;
                }
            }
            else
            {
                if(this.lastOrders.x == orders.x &&
                   this.lastOrders.y == orders.y)
                {
                    console.log(orders);
                    return true;
                }
            }
        }

        return false;
    },

    generateCurrentMapGrid:function(mapTable, mapObstructedTerrain, mapObstructedIsle, mapLookup)
    {
        console.log(mapTable, mapObstructedTerrain, mapObstructedIsle, mapLookup);

        game.mapTable = mapTable;
        game.currentMapTerrainGrid = [];
        game.currentMapIsleGrid = [];
        game.currentTerrainMapLookupTable = [];

        for (var y=0; y < game.level.mapGridHeight; y++)
        {
            game.currentMapIsleGrid[y] = [];
            game.currentMapTerrainGrid[y] = [];
            game.currentTerrainMapLookupTable[y] = [];
        }

        game.fillGridWithFullTiles(mapObstructedTerrain, mapObstructedIsle, mapLookup);
    }
}
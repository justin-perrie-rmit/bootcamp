const canvasWidth = 1040;
const canvasHeight = 720;

const productionWidth = 1920;
const productionHeight = 1080;

const productionTileWidth = 88;
const productionTileHeight = 50;

let campaignTechnologyStartingLevel = 12;

let productionRatioX = 1;
let productionRatio = 1;
let productionInverseRatioX = 1;
let productionInverseRatio = 1;

let screenWidth = 0;
let screenHeight = 0;

let screenRatio = 1;

let isNonNativeResolution = false;
let isDisplayScale = false;

let canvasWidthOffset = 0;
let canvasHeightOffset = 0;

let tileWidthOffset = 0;
let tileHeightOffset = 0;

let isFullScreen = false;
let nearFullScreenHeight = 0;

//var memoryTotal = 0;

const autoIcon = "auto";
const noneIcon = "none";
const gameIcon = "url('images/cursor/cursor.png'),auto";
const targetIcon = "url('images/cursor/target.png'),auto";
const extractIcon = "url('images/cursor/extract.png'),auto";
const selectionIcon = "url(\'images/cursor/selection.png\'),auto";
const repairIcon = "url('images/cursor/repair.png'),auto";
const sellIcon = "url('images/cursor/sell.png'),auto";
const loadIcon = "url('images/cursor/load.png'),auto";
const unloadIcon = "url('images/cursor/unload.png'),auto";
const photoIcon = "url('images/cursor/photo.png'),auto";
const soilIcon = "url('images/cursor/soil.png'),auto";
const rightArrowIcon = "url('images/cursor/right-arrow.png'),auto";
const leftArrowIcon = "url('images/cursor/left-arrow.png'),auto";
const upArrowIcon = "url('images/cursor/up-arrow.png'),auto";
const downArrowIcon = "url('images/cursor/down-arrow.png'),auto";

const sidebarButtonStates = 4;

var renderer = {
    container:undefined,
    introContainer:undefined,
    teamSelectionContainer:undefined,
    missionbriefingContainer:undefined,
    skirmishContainer:undefined,
    skirmishDropdownContainer:undefined,
    lobbyContainer:undefined,
    backgroundContainer:undefined,
    textContainer:undefined,
    buttonsContainer:undefined,
    problemsContainer:undefined,
    slidesContainer:undefined,
    notesContainer:undefined,
    textbookContainer:undefined,
    propsContainer:undefined,
    dialogueContainer:undefined,
    loginContainer:undefined,
    expensesContainer:undefined,
    gameoverContainer:undefined,
    bonusContainer:undefined,
    resourcesContainer:undefined,
    thresholdContainer:undefined,
    lightsContainer:undefined,
    lightsSpxContainer:undefined,
    playerContainer:undefined,
    otherContainer:undefined,
    emittersContainer:undefined,
    itemsContainer:undefined,
    submergedItemsContainer:undefined,
    surfaceItemsContainer:undefined,
    airItemsContainer:undefined,
    gameplayContainer:undefined,
    characterContainer:undefined,
    gameInterfaceContainer:undefined,
    narratorContainer:undefined,
    miniMapContainer:undefined,
    debugContainer:undefined,
    markersContainer:undefined,
    wayPointsContainer:undefined,
    cncContrainer:undefined,
    selectionBoxContainer:undefined,
    intro:undefined,
    fpsText:undefined,
    fpsRatio:undefined,
    pathCounterText:undefined,
    pathLengthText:undefined,
    numberOfSelectedText:undefined,
    DeltaTimeText:undefined,
    fps:[],
    campaignText:undefined,
    startText:undefined,
    teamSelectionScreen:undefined,
    technologySelection:undefined,
    technologySelectionHover:undefined,
    socialEarthSelection:undefined,
    socialEarthSelectionHover:undefined,
    missionbriefingScreen:undefined,
    missionbriefingEnter:undefined,
    missionbriefingEnterHover:undefined,
    missionbriefingExit:undefined,
    missionbriefingExitHover:undefined,
    missionbriefingText:undefined,
    skirmishScreen:undefined,
    skirmishTeamButton:undefined,
    skirmishTeamButtons:undefined,
    skirmishStartButton:undefined,
    skirmishCancelButton:undefined,
    skirmishUpButton:undefined,
    skirmishDownButton:undefined,
    skirmishMapPreview:undefined,
    skirmishMapPreviewPaths:[],
    dialogueSprite:undefined,
    closeSprite:undefined,
    input:undefined,
    inputField:undefined,
    outputField:undefined,
    clock:undefined,
    currentMapPreviewPath:undefined,
    conversationMessages:[],
    conversationText:undefined,
    payText:undefined,
    problemsText:undefined,
    lecturerText:undefined,
    narratorText:undefined,
    textbookLineCounter:0,
    powerText:undefined,
    cashText:undefined,
    missionFailureText:undefined,
    mouseYText:undefined,
    multiTypeText:undefined,
    lobbyScreen:undefined,
    menuButton:undefined,
    menu:undefined,
    menuSaveButton:undefined,
    menuLoadButton:undefined,    
    menuDesktopButton:undefined,
    menuFullscreenButton:undefined,
    menuResumeButton:undefined,
    menuRestartButton:undefined,
    menuExitButton:undefined,
    startButton:undefined,
    startHighlightButton:undefined,
    cancelButton:undefined,
    cancelHighlightButton:undefined,
    lobbyScrollUpButton:undefined,
    lobbyScrollDownButton:undefined,
    lobbyGameSelected:undefined,
    lobbyGameSelectedId:0,
    lobbyScrollIndex:0,
    levelsLoaded:undefined,
    gameTextList:[],
    mapImage:[],
    maininterfaceFilenames:[],
    pauseAnimationLines:[],
    images:[],
    imageNames:undefined,
    blackScreen:undefined,
    loadingBox:undefined,
    resourceMasterSet:undefined,
    miniMapBackground:undefined,
    miniMapTeamBackground:undefined,
    miniMap:undefined,
    miniMapZoomInX:0,
    miniMapZoomInY:0,
    cncDisplay:false,
    cncBackground:undefined,
    cncCollisionRows:undefined,
    cncCollisionRowsSprite:undefined,
    cncText:undefined,
    controllerIcon:undefined,
    controllerTextures:undefined,
    theDay:1,
    expensesCount:0,
    expensesTexture:undefined,
    gameoverTexture:undefined,
    itemVision:100,
    expandVision:1,
    zoom: 1,
    inverseZoom:1,
    zoomLevelIndex:1,
    zoomLevels:[0.75, 1.0, 2.0],
    buttonImages:[],
    slidesImages:[],
    notesImages:[],
    textbookImages:[],
    propsImages:[],
    tile:undefined,
    tiles:[],
    tilesMap:undefined,
    wayPointTiles:undefined,
    background:undefined,
    cells:null,
    waterCells:null,
    markers:[],
    markersVisibility:false,
    wayPoints:[],
    wayPointsVisibility:false,
    photosTaken:[],
    nightTimeDisplay:undefined,
    nightTimeMode:false,
    maininterface:undefined,
    maininterfaceDiagonal:undefined,
    maininterfaceHorizontal:undefined,
    maininterfaceVertical:undefined,
    maininterfaceHorizontalScale:undefined,
    maininterfaceVerticalScale:undefined,
    selectionBox:undefined,
    texturesMap:undefined,
    buttonTexturesMap:undefined,
    indexes:undefined,
    overallFrames:0,
    buttonIndexes:undefined,
    buttonOverallFrames:0,
    introLoaded:false,
    teamSelectionLoaded:false,
    missionbriefingLoaded:false,
    skirmishLoaded:false,
    lobbyScreenLoaded:false,
    mainInterfaceLoaded:false,
    running:false,
    pause:true,
    skip:true,
    cameraOffsetX:0,
    cameraOffsetY:0,
    placementGrid:undefined,
    masks:undefined,
    inputTextBox:undefined,
    inputTextBoxDisplayed:false,
    itemUID:1,
    drawablePathDebug:[],
    nightVisionFilter:undefined,
    isDarkVisionOn:false,
    infraredFilter:undefined,
    blackAndWhiteFilter:undefined,
    isInfraredVisionOn:false,
    ultravioletFilter:undefined,
    isUltravioletVisionOn:false,
    shaderFilters:undefined,
    isUIOn:false,
    debugMouseX:undefined,
    debugMouseY:undefined,
    debugMouseDetails:undefined,
    debugOffsetX:undefined,
    debugOffsetY:undefined,
    debugUIDs:undefined,
    debugPathLength:0,
    debugTerrainCount:0,
    debugIsleCount:0,
    debugLookupCount:0,
    debugMsPassBy:0,
    secretMessage:"",

    init:function()
    {
        //document.getElementById("gamelayer").appendChild(app.view);
        this.container = new PIXI.Container();

        this.introContainer = new PIXI.Container(); 
        this.teamSelectionContainer = new PIXI.Container(); 
        this.missionbriefingContainer = new PIXI.Container();
        this.skirmishContainer = new PIXI.Container();
        this.skirmishDropdownContainer = new PIXI.Container();
        this.lobbyContainer = new PIXI.Container();
        this.backgroundContainer = new PIXI.Container();
        this.textContainer = new PIXI.Container();
        this.buttonsContainer = new PIXI.Container();
        this.problemsContainer = new PIXI.Container();
        this.slidesContainer = new PIXI.Container();
        this.notesContainer = new PIXI.Container();
        this.textbookContainer = new PIXI.Container();
        this.propsContainer = new PIXI.Container();
        this.dialogueContainer = new PIXI.Container();
        this.loginContainer = new PIXI.Container();
        this.expensesContainer = new PIXI.Container();
        this.gameoverContainer = new PIXI.Container();
        this.bonusContainer = new PIXI.Container();
        this.resourcesContainer = new PIXI.Container();
        this.thresholdContainer = new PIXI.Container();
        this.lightsContainer = new PIXI.Container();
        this.lightsSpxContainer = new PIXI.Container();
        this.playerContainer = new PIXI.Container();
        this.otherContainer = new PIXI.Container();
        this.emittersContainer = new PIXI.Container();
        this.itemsContainer = new PIXI.Container();
        this.submergedItemsContainer = new PIXI.Container();
        this.surfaceItemsContainer = new PIXI.Container();
        this.airItemsContainer = new PIXI.Container();
        this.gameplayContainer = new PIXI.Container();
        this.characterContainer = new PIXI.Container();
        this.gameInterfaceContainer = new PIXI.Container();
        this.narratorContainer = new PIXI.Container();
        this.miniMapContainer = new PIXI.Container();
        this.selectionBoxContainer = new PIXI.Container();
        this.debugContainer = new PIXI.Container();
        this.markersContainer = new PIXI.Container();
        this.wayPointsContainer = new PIXI.Container();
        this.cncContrainer = new PIXI.Container();

        this.selectionBox = new PIXI.Graphics();
        this.placementGrid = new PIXI.Graphics();
        this.cncBackground = new PIXI.Graphics();

        this.masks = new PIXI.Container();        

        this.campaignText = new PIXI.Text('0', {fill: 'white'});
        this.fpsText = new PIXI.Text('0', {fill: 'white'});
        this.fpsRatio = new PIXI.Text('0', {fill: 'white'});
        this.numberOfSelectedText = new PIXI.Text("Number of Selected: 0", {fill: 'white'});
        this.passByCountText = new PIXI.Text("Pass By Count: 0", {fill: 'white'});
        this.debugMsPassByText = new PIXI.Text("Pass By (Ms): 0", {fill: 'white'});

        this.desyncText = new PIXI.Text("Desync Detected", {fill: 'red'});
        this.desyncText.position.set(20, 300);
        this.desyncText.visible = false;

        this.debugMouseX = new PIXI.Text('Mouse X: 0', {fill: 'white'});
        this.debugMouseY = new PIXI.Text('Mouse Y: 0', {fill: 'white'});
        this.debugMouseDetails = new PIXI.Text('Mouse Details: ', {fill: 'white'});
        this.debugOffsetX = new PIXI.Text('Mouse OffsetX: ', {fill: 'white'});
        this.debugOffsetY = new PIXI.Text('Mouse OffsetY: ', {fill: 'white'});

        this.debugPathLength = new PIXI.Text('Path Length: ', {fill: 'white'});

        this.levelsLoaded = new Set();
        this.resourceMasterSet = new Set();
        this.debugUIDs = new Set();

        this.texturesMap = new Map();
        this.buttonTexturesMap = new Map();
        this.indexes = new Map();
        this.buttonIndexes = new Map();
        this.tilesMap = new Map();
        this.shaderFilters = new Map();

        this.debugContainer.visible = false;
    },

    start:function()
    {
        if(!debug.production)
        {
            this.app = new PIXI.Application({
                width: canvasWidth, 
                height: canvasHeight,
                backgroundColor: 0x000000,
                //transparent: true
            });
        }
        else
        {
            this.app = new PIXI.Application({
                width: productionWidth * window.devicePixelRatio, 
                height: productionHeight * window.devicePixelRatio,
                antialias: false,
                backgroundColor: 0x000000,
                backgroundAlpha: 1,
                powerPreference: "high-performance",
                //resolution: window.devicePixelRatio,
                //transparent: true
            });
        }

        //this.app.stage = new PIXI.display.Stage();
        this.app.stage = new PIXI.layers.Stage(); // Needs to latest version of pixi-layers.js

        this.app.stage.interactive = true;

        document.body.appendChild(this.app.view);

        if(debug.scale)
        {
            const scaleFactorX = window.innerWidth / productionWidth;
            const scaleFactorY = window.innerHeight / productionHeight;

            this.app.renderer.resize(window.innerWidth, window.innerHeight);
            this.app.stage.scale.set(scaleFactorX, scaleFactorY);
        }

        document.addEventListener('contextmenu', e => {
            e.preventDefault();
        });

        this.app.stage.addChild(this.container); 

        //debug.skipToIntro = !debug.production;
        
        this.intro();
    },

    intro:function()
    {
        PIXI.Assets.add(display.intro.getFileName(), display.intro.getFileName());

        this.resourceMasterSet.add(display.intro.getFileName());

        const texturesPromise = PIXI.Assets.load(Array.from(this.resourceMasterSet));

        texturesPromise.then((textures) => {
            renderer.initialiseIntro(textures);
            renderer.introLoaded = true;
        });
    },

    initialiseIntro:function(textures)
    {   
        this.startText = new PIXI.Text('Start', introStartStyle);

        introStartStyle.fill = ['white'];

        this.setIntroButtonsWidth();

        if(!debug.production)
            display.intro.windowedOffsetY = 0;

        this.setIntroButtonsHeight();

        this.enableIntroButtons();

        this.startText.on('pointerover', ()=> {
            introStartStyle.fill = ['gold'];
        });

        this.startText.on('pointerout', ()=> {
            introStartStyle.fill = ['white'];
        });

        this.startText.on('click', (e)=> {
            singleplayer.currentLevel = 0;

            mouse.x = Math.floor(e.data.global.x);
            mouse.y = Math.floor(e.data.global.y);

            this.app.stage.removeChild(this.introContainer);
            this.disableIntroButtons();
            
            if(debug.production)
            {
                canvasWidthOffset = screen.width /** window.devicePixelRatio*/ - canvasWidth;
                canvasHeightOffset = screen.height /** window.devicePixelRatio*/ - canvasHeight;
        
                document.querySelector("body").requestFullscreen()
                    .then(function() {
                        // element has entered fullscreen mode successfully
                        interface.windowedOffsetY = 0;
                    })
                    .catch(function(error) {
                        // element could not enter fullscreen mode
                    });
            }
            
            //game.team = "technology";
            
            //game.startSinglePlayer();
            this.login();
        });

        if(textures)
        {
            this.texturesMap.set(display.intro.getFileName(), textures[display.intro.getFileName()]);
        }

        this.intro = PIXI.Sprite.from(this.texturesMap.get(display.intro.getFileName()));

        this.introContainer.addChild(this.intro);

        if(debug.start)
            this.introContainer.addChild(this.startText);

        this.container.addChild(this.introContainer);
    },

    setIntroButtonsWidth:function()
    {
        this.startText.x = productionWidth * 0.5;
        this.startText.anchor.set(0.5);
    },

    setIntroButtonsHeight:function()
    {
        display.intro.windowedOffsetY = 0;

        this.startText.y = 900 + display.intro.windowedOffsetY;
    },

    setCamera:function(savedData)
    {
        if(savedData)
        {
            this.cameraOffsetX = savedData.offset.panX;
            this.cameraOffsetY = savedData.offset.panY;

            game.offsetX = this.cameraOffsetX;
            game.offsetY = this.cameraOffsetY;
        }
        else
        {
            this.cameraOffsetX = game.level.startX * game.gridSize;
            this.cameraOffsetY = game.level.startY * game.gridSize;

            if(debug.production)
            {        
                /**
                 * this code is checking whether the startY coordinate of the game level exceeds a certain threshold. 
                 * If it does, the code calculates the camera's Y offset based on the difference between startY and
                 * the threshold, multiplied by the gridSize. The threshold is determined by subtracting the ratio of
                 * productionHeight and game.gridSize from the mapGridHeight of the game level, and adding an offset
                 * based on display.maininterface.mapImageYOffset.
                 *
                 **/

                if(game.level.startY > game.level.mapGridHeight - (productionHeight / game.gridSize))
                {
                    game.level.startY = (game.level.startY - 
                        (game.level.startY - ((game.level.mapGridHeight - (productionHeight / game.gridSize)) + 
                        display.maininterface.mapImageYOffset / game.gridSize)));

                    this.cameraOffsetY = game.level.startY * game.gridSize;
                }

                if(game.level.startX > game.level.mapGridWidth - (productionWidth / game.gridSize))
                {
                    game.level.startX = (game.level.startX - 
                        (game.level.startX - (game.level.mapGridWidth - (productionWidth / game.gridSize))));

                    this.cameraOffsetX = game.level.startX * game.gridSize;
                }
            }

            game.offsetX = game.level.startX * game.gridSize;
            game.offsetY = game.level.startY * game.gridSize;

            game.offsetXIndex = this.cameraOffsetX / game.gridSize;
            game.offsetYIndex = this.cameraOffsetY / game.gridSize;
        }
    },

    setCameraOffset(cameraOffsetX, cameraOffsetY)
    {
        this.cameraOffsetX = cameraOffsetX * game.gridSize;
        this.cameraOffsetY = cameraOffsetY * game.gridSize;

        game.offsetX = cameraOffsetX * game.gridSize;
        game.offsetY = cameraOffsetY * game.gridSize;

        game.offsetXIndex = this.cameraOffsetX;
        game.offsetYIndex = this.cameraOffsetY;
    },

    login:function()
    {
        let loginFilename = display.login.getFileName();

        if(!this.resourceMasterSet.has(loginFilename))
        {
            PIXI.Assets.add(loginFilename, loginFilename);
            this.resourceMasterSet.add(loginFilename);
        }

        const texturesPromise = PIXI.Assets.load(Array.from(this.resourceMasterSet));

        texturesPromise.then((textures) =>
        {
            this.assignLogin(textures); 
        });
    },

    expenses:function()
    {
        let expensesFilename = display.expenses.getFileName();

        if(!this.resourceMasterSet.has(expensesFilename))
        {
            PIXI.Assets.add(expensesFilename, expensesFilename);
            this.resourceMasterSet.add(expensesFilename);
        }

        const texturesPromise = PIXI.Assets.load(Array.from(this.resourceMasterSet));

        texturesPromise.then((textures) =>
        {
            this.expensesTexture = textures;
        });
    },

    gameover:function()
    {
        let gameoverFilename = display.gameover.getFileName();

        if(!this.resourceMasterSet.has(gameoverFilename))
        {
            PIXI.Assets.add(gameoverFilename, gameoverFilename);
            this.resourceMasterSet.add(gameoverFilename);
        }

        const texturesPromise = PIXI.Assets.load(Array.from(this.resourceMasterSet));

        texturesPromise.then((textures) =>
        {
            this.assignGameover(textures); 
        });
    },

    bonus:function(message)
    {
        let bonusFilename = display.bonus.getFileName();

        if(!this.resourceMasterSet.has(bonusFilename))
        {
            PIXI.Assets.add(bonusFilename, bonusFilename);
            this.resourceMasterSet.add(bonusFilename);
        }

        const texturesPromise = PIXI.Assets.load(Array.from(this.resourceMasterSet));

        texturesPromise.then((textures) =>
        {
            this.assignBonus(message); 
        });
    },

    assignLogin:function(textures)
    {
        // --- Setup login ---
        this.loginContainer.removeChildren();

        const textureName = display.login.getFileName();
        const loginTexture = textures?.[textureName] || PIXI.Texture.from(textureName);

        this.loginSprite = new PIXI.Sprite(loginTexture);
        this.loginSprite.x = productionWidth / 2;
        this.loginSprite.y = productionHeight / 2;
        this.loginSprite.anchor.set(0.5, 0.5);

        this.loginContainer.addChild(this.loginSprite);

        // --- Setup Hardcoded Text Input ---
        this.input = new TextInputDetails();
        
        // Use numbers instead of strings for math
        const inputWidth = 1000;
        const inputFontSize = 20;

        this.input.inputWidth = inputWidth + "px";        // keep string if needed by the input field
        this.input.inputFontSize = inputFontSize + "px";  // same here
        this.input.placeholder = "Enter your Text...";
        this.input.password = false;

        // Now use numbers for x and y
        this.input.x = productionWidth / 2 - inputWidth / 2;
        this.input.y = productionHeight / 2 - inputFontSize / 2;

        // Ensure these are all present for PIXI.TextInput
        this.input.inputPadding = 10;
        this.input.inputColor = "#ffffff";

        this.input.boxDefaultFill = "#515151";
        this.input.boxFocusedFill = "#515151";

        this.input.boxDefaultStrokeColor = "#969696";
        this.input.boxFocusedStrokeColor = "#969696";

        this.input.boxDefaultStrokeWidth = 2;
        this.input.boxFocusedStrokeWidth = 2;

        this.inputField = this.generateTextInput(this.input);
        this.inputField.interactive = true;
        this.inputField.on('keydown', (keycode) => {
            if (keycode === 13) { // 13 is the keycode for Enter
                //this.clearTextOutput();
                this.gamecode = this.inputField.text;

                client.sendMessage({
                    code:this.inputField.text,
                    role:"dumb",
                    sendTo: "smart",
                    type:"login",
                    message:this.inputField.text
                });
                
                this.inputField.text = '';

                this.loginSprite.visible = false;

                this.inputField.interactive = false;
                this.inputField.visible = false;

                // game.team = "technology";
            
                // game.startSinglePlayer();
            }
        });
        
        this.loginContainer.addChild(this.inputField);

        this.app.stage.addChild(this.loginContainer); 
        console.log("added loginContainer");
    },

    removExpenses:function()
    {
        // --- Setup login ---
        this.loginContainer.removeChildren();
        this.expensesCount = 0;
    },

    assignExpenses:function(name)
    {
        const textureName = display.expenses.getFileName();
        const expensesTexture = this.expensesTexture?.[textureName] || PIXI.Texture.from(textureName);

        // Sprite setup
        const sprite = new PIXI.Sprite(expensesTexture);
        sprite.anchor.set(0.5);
        sprite.x = productionWidth / 2;
        sprite.y = productionHeight / 5 + (this.expensesCount * 120);

        // Text styling
        const textStyle = new PIXI.TextStyle({
            fill: "#FFFFFF",
            fontSize: 22,
            fontWeight: "bold",
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowDistance: 2,
        });

        const unpaidPenalties = {
            rent: "Rent's due! Better pay.",
            aircon_heating: "It's getting a bit chilly in here.",
            food: "You skipped a meal. Feeling hungry?",
            social: "No hangouts lately? Feeling a bit lonely.",
            family: "Family misses hearing from you.",
        };

        const text = new PIXI.Text(unpaidPenalties[name], textStyle);
        text.anchor.set(0.5);
        text.x = sprite.x;
        text.y = sprite.y; // offset slightly below sprite

        // Container for both sprite & text
        const tempContainer = new PIXI.Container();
        tempContainer.addChild(sprite);
        tempContainer.addChild(text);
        tempContainer.alpha = 0;

        this.expensesContainer.addChild(tempContainer);
        this.gameplayContainer.addChild(this.expensesContainer);

        // Animation timing
        const delay = this.expensesCount * 1000; // appear 1s apart
        const duration = 5000; // stay for 5 seconds
        const fadeInSpeed = 0.03;
        const fadeOutSpeed = 0.03;

        setTimeout(() =>
        {
            // --- Fade In ---
            const fadeInTicker = new PIXI.Ticker();
            fadeInTicker.add(() =>
            {
                tempContainer.alpha += fadeInSpeed;
                if (tempContainer.alpha >= 1)
                {
                    tempContainer.alpha = 1;
                    fadeInTicker.stop();
                    fadeInTicker.destroy();

                    // --- Wait, then Fade Out ---
                    setTimeout(() =>
                    {
                        const fadeOutTicker = new PIXI.Ticker();
                        fadeOutTicker.add(() =>
                        {
                            tempContainer.alpha -= fadeOutSpeed;
                            if (tempContainer.alpha <= 0)
                            {
                                tempContainer.alpha = 0;
                                fadeOutTicker.stop();
                                fadeOutTicker.destroy();
                                this.expensesContainer.removeChild(tempContainer);
                            }
                        });
                        fadeOutTicker.start();
                    }, duration);
                }
            });

            fadeInTicker.start();
        }, delay);

        this.expensesCount++;
    },

    assignGameover:function()
    {
        const textureName = display.gameover.getFileName();
        const gameoverTexture = PIXI.Texture.from(textureName);
    
        // --- Create sprite ---
        const sprite = new PIXI.Sprite(gameoverTexture);
        sprite.anchor.set(0.5);
        sprite.x = productionWidth / 2;
        sprite.y = productionHeight / 2;
    
        // --- Create text ---
        const textStyle = new PIXI.TextStyle({
            fill: "#FFFFFF",
            fontSize: 48,
            fontWeight: "bold",
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowDistance: 3,
        });
    
        const text = new PIXI.Text("GAME OVER", textStyle);
        text.anchor.set(0.5);
        text.x = sprite.x;
        text.y = sprite.y;
    
        // --- Container setup ---
        const tempContainer = new PIXI.Container();
        tempContainer.addChild(sprite);
        tempContainer.addChild(text);
        tempContainer.alpha = 0; // Start invisible
    
        this.gameoverContainer.addChild(tempContainer);
        this.gameplayContainer.addChild(this.gameoverContainer);
        this.gameplayContainer.addChild(this.bonusContainer);
    
        // --- Fade control ---
        const fadeInSpeed = 0.02;
        const fadeOutSpeed = 0.02;
        const visibleDuration = 5000; // 5 seconds on screen
    
        let fadeInDone = false;
        let timeVisible = 0;
    
        const ticker = new PIXI.Ticker();
        ticker.add((delta) =>
        {
            if (!fadeInDone)
            {
                tempContainer.alpha += fadeInSpeed * delta;
                if (tempContainer.alpha >= 1)
                {
                    tempContainer.alpha = 1;
                    fadeInDone = true;
                }
            }
            else
            {
                timeVisible += delta * 16.67; // Approx ms/frame
                if (timeVisible >= visibleDuration)
                {
                    tempContainer.alpha -= fadeOutSpeed * delta;
                    if (tempContainer.alpha <= 0)
                    {
                        tempContainer.alpha = 0;
                        ticker.stop();
                        ticker.destroy();
                        this.gameoverContainer.removeChild(tempContainer);
                        clock.day = 12;
                        renderer.clock.reset();
                        game.endLevel();
                        game.nextLevel();
                        economy.send();
                    }
                }
            }
        });
    
        ticker.start();
    },

    assignBonus:function(message)
    {
        const textureName = display.bonus.getFileName();
        const bonusTexture = PIXI.Texture.from(textureName);
    
        // --- Create sprite ---
        const sprite = new PIXI.Sprite(bonusTexture);
        sprite.anchor.set(0.5);
        sprite.x = productionWidth / 2;
        sprite.y = productionHeight / 2;
    
        // --- Create text ---
        const textStyle = new PIXI.TextStyle({
            fill: "#FFFFFF",
            fontSize: 48,
            fontWeight: "bold",
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowDistance: 3,
        });
    
        const text = new PIXI.Text(message, textStyle);
        text.anchor.set(0.5);
        text.x = sprite.x;
        text.y = sprite.y;
    
        // --- Container setup ---
        const tempContainer = new PIXI.Container();
        tempContainer.addChild(sprite);
        tempContainer.addChild(text);
        tempContainer.alpha = 0; // Start invisible
    
        this.bonusContainer.addChild(tempContainer);
        this.gameplayContainer.addChild(this.bonusContainer);
    
        // --- Fade control ---
        const fadeInSpeed = 0.02;
        const fadeOutSpeed = 0.02;
        const visibleDuration = 5000; // 5 seconds on screen
    
        let fadeInDone = false;
        let timeVisible = 0;
    
        const ticker = new PIXI.Ticker();
        ticker.add((delta) =>
        {
            if (!fadeInDone)
            {
                tempContainer.alpha += fadeInSpeed * delta;
                if (tempContainer.alpha >= 1)
                {
                    tempContainer.alpha = 1;
                    fadeInDone = true;
                }
            }
            else
            {
                timeVisible += delta * 16.67; // Approx ms/frame
                if (timeVisible >= visibleDuration)
                {
                    tempContainer.alpha -= fadeOutSpeed * delta;
                    if (tempContainer.alpha <= 0)
                    {
                        tempContainer.alpha = 0;
                        ticker.stop();
                        ticker.destroy();
                        this.bonusContainer.removeChild(tempContainer);
                        economy.bonus = undefined;
                    }
                }
            }
        });
    
        ticker.start();
    },

    level:function(savedData = undefined)
    {
        flags.GAME_OVER = false;
        
        if(savedData)
            renderer.loadLevel(savedData);
        else
            renderer.initialiseLevel(savedData);
        console.log("level load completed");          
    },

    initialiseLevel:function(savedData = undefined)
    {
        const tileImages = [];

        this.debugUIDs.clear();

        if(game.level.name == "payslip")
        {
            console.log(game.level);
            client.sendMessage({
                id: game.player.networkUid,
                role:"dumb",
                sendTo: "smart",
                type:"review",
                code:game.player.id,
                clockDay:clock.day,
            });
        }
        
        if(game.level.mapImages == undefined)
        {
            console.log("%cThis level's mapImages is undefined, check maps.js",
            'background: #000; color: #ff0033');
            return;
        }

        if(game.level.teams)
        {
            for(var i = 0; i < game.level.teams.length; i++)
            {
                if(game.level.teams[i].type == "Player")
                {
                    game.team = game.level.teams[i].name;
                    break;
                }
            }
        }

        game.deathRegistery = new Set();
        game.deleteStack.length = 0;

        this.overallFrames = 0;
        this.indexes.clear();
        this.imageNames = [];

        this.setAdditionalRequirements();
        this.setGameItems(game.level.items);
        this.setButtons(game.level.buttons);
        this.setMaterials(game.level.materials);
        this.setProps(game.level.props);
        this.setGameResources();
        this.setLights();
        this.setThresholds(game.level.thresholds);
        this.setSidebar(game.level.sidebar);
        this.setCharacters();
        this.setNightTime();
        this.setMenu();
        this.setConversationText();
        this.setLecturerText();

        if(!this.resourceMasterSet.has(game.level.mapImages))
        {
            this.mapImage.length = 0;

            for(var i = 0; i < background.tileNames.length; i++)
            {
                this.mapImage.push(background.tileNames[i]);
                PIXI.Assets.add(background.tileNames[i], background.tileNames[i]);
                this.resourceMasterSet.add(background.tileNames[i]);
            }

            this.resourceMasterSet.add(game.level.mapImages);
        }
        else
        {
            this.mapImage.length = 0;
        }

        let maininterfaceFilenames = display.maininterface.getFileNames();

        this.maininterfaceFilenames.length = 0;

        for(var i = 0; i < maininterfaceFilenames.length; i++)
        {
            if(!this.resourceMasterSet.has(maininterfaceFilenames[i]))
            {
                this.maininterfaceFilenames.push(maininterfaceFilenames[i]);
                PIXI.Assets.add(maininterfaceFilenames[i], maininterfaceFilenames[i]);
                this.resourceMasterSet.add(maininterfaceFilenames[i]);
            }
        }

        let dialogueFilename = display.dialogue.getFileName();

        if(!this.resourceMasterSet.has(dialogueFilename))
        {
            PIXI.Assets.add(dialogueFilename, dialogueFilename);
            this.resourceMasterSet.add(dialogueFilename);
        }

        let closeFilename = display.close.getFileName();

        if(!this.resourceMasterSet.has(closeFilename))
        {
            PIXI.Assets.add(closeFilename, closeFilename);
            this.resourceMasterSet.add(closeFilename);
        }

        const texturesPromise = PIXI.Assets.load(Array.from(this.resourceMasterSet));

        texturesPromise.then((textures) =>
        {
            this.assignBackground(textures);

            this.assignThresholds(textures, this.imageNames, game.level.thresholds);
            this.assignLights(textures, this.imageNames, game.level.lights);
            this.assignAdditionalRequirements(textures, this.imageNames);
            this.assignGameItems(textures, this.imageNames, game.level.resources, game.level.items);
            
            
            this.assignEmitter(game.level.emitters);
            this.assignShaders(game.level.shaders);
            
            this.playerContainer.addChild(this.placementGrid);

            this.playerContainer.addChild(this.submergedItemsContainer);
            this.otherContainer.addChild(this.submergedItemsContainer);

            this.playerContainer.addChild(this.surfaceItemsContainer);
            this.otherContainer.addChild(this.surfaceItemsContainer);

            this.playerContainer.addChild(this.airItemsContainer);
            this.otherContainer.addChild(this.airItemsContainer);

            this.itemsContainer.addChild(this.resourcesContainer);
            this.itemsContainer.addChild(this.thresholdContainer);
            this.itemsContainer.addChild(this.lightsContainer);
            this.itemsContainer.addChild(this.playerContainer);
            this.itemsContainer.addChild(this.otherContainer);
            this.itemsContainer.addChild(this.emittersContainer);

            this.gameplayContainer.addChild(this.itemsContainer);
            

            if(debug.production)
            {
                this.maininterfaceFilenames = display.maininterface.getFileNames();
                
                this.maininterface = PIXI.Sprite.from(textures[this.maininterfaceFilenames[0]]);

                //this.gameInterfaceContainer.addChild(this.maininterface);
            }
            
            this.assignInterface();
            this.container.addChild(this.lightsSpxContainer);

            this.assignMenu(textures);

            this.gameInterfaceContainer.addChild(this.conversationText);
            this.gameInterfaceContainer.addChild(this.lecturerText);
            this.gameInterfaceContainer.addChild(this.narratorContainer);

            this.assignSidebar(this.buttonImages, game.level.sidebar);
            this.assignButtons(textures, game.level.buttons);
            this.assignText(game.level.text);
            this.assignProblems(economy.problems);
            
            this.assignProps(textures, game.level.props);
            this.assignMaterials(textures, game.level.materials);
            this.assignCharacters(textures, this.imageNames);
            this.assignDay();
            this.assignClock(game.level.clock);
            this.assignDialogue(textures);
            this.gameplayContainer.addChild(this.dialogueContainer); 

            this.selectionBoxContainer.addChild(this.selectionBox);

            this.container.addChild(this.gameplayContainer);
            this.container.addChild(this.gameInterfaceContainer);
            this.container.addChild(this.characterContainer);

            triggers.init();

            if(game.level.name == "survey")
            {
                const gamecodeText = new PIXI.Text("Gamecode: ", {fill: 'red'});
                gamecodeText.text = "Gamecode: " + this.gamecode;
                gamecodeText.position.set(
                    productionWidth / 2 - 100,
                    450
                );

                this.textContainer.addChild(gamecodeText);
                this.gameplayContainer.addChild(this.textContainer);

                if(clock.day == 1)
                {
                    for(var i = 0; i < game.buttons.length; i++)
                    {
                        game.buttons[i].sprites[0].visible = false;

                        if(game.buttons[i].name.startsWith("first_survey"))
                        {
                            game.buttons[i].sprites[0].visible = true;
                        }
                    } 
                }
                else if(clock.day > 1 && clock.day < 12)
                {
                    for(var i = 0; i < game.buttons.length; i++)
                    {
                        game.buttons[i].sprites[0].visible = false;

                        if(game.buttons[i].name.startsWith("return_survey"))
                        {
                            game.buttons[i].sprites[0].visible = true;
                        }

                        if(game.buttons[i].name.startsWith("last_survey"))
                        {
                            game.buttons[i].sprites[0].visible = true;
                        }
                    } 
                }
                else if(clock.day == 12)
                {
                    for(var i = 0; i < game.buttons.length; i++)
                    {
                        game.buttons[i].sprites[0].visible = false;

                        if(game.buttons[i].name.startsWith("last_survey"))
                        {
                            game.buttons[i].sprites[0].visible = true;
                        }
                    } 
                }
            }

            if(game.level.mode == "learning")
            {
                this.sendDetailsToServer();
            }

            //director.init(game.items);
                
            if(game.level.ai)
            {
                ai.init();
            }                    

            // if(game.mode == "multiplayer")
            // {
            //     this.removeLobbyScreen();
            //     setInterval(() => {
            //         game.tick++
            //     }, 1);
            // }

            this.app.ticker.maxFPS = 60;

            PIXI.settings.ROUND_PIXELS = true;

            game.buildPassableGrid();
            
            this.app.stage.addChild(this.container);
            this.app.stage.addChild(this.selectionBoxContainer);

            //this.addTextInput();

            // if(debug.mouseCoords)
            // {
            //     this.container.addChild(this.debugMouseX);
            //     this.container.addChild(this.debugMouseY);
            //     this.container.addChild(this.debugMouseDetails);
            //     this.container.addChild(this.debugOffsetX);
            //     this.container.addChild(this.debugOffsetY);
            //     //this.container.addChild(this.debugPathLength);
            // }

            this.pause = false;
            this.skip = false;

            renderer.startLevel();
            timer.init();
            console.log("post renderer.startLevel"); 
            game.inGame = true;
        });

        console.log("about to finish initialiseLevel"); 
    },

    startLevel:function()
    {
        if (this.app.tickerCallback)
            this.app.ticker.remove(this.app.tickerCallback);

        if(debug.fpsCounter)
            this.initFPSMeasurements();

        if(debug.mouseCoords)
            this.initMouseMeasurements();

        if(debug.pathLength)
            this.initPathLength();
    
        this.app.tickerCallback = ((delta) => {
            
            if(this.nightVisionFilter)
                this.nightVisionFilter.uniforms.time += delta * 0.1;

            if (this.blackAndWhiteFilter)
            {
                const uniforms = this.blackAndWhiteFilter.uniforms;
                uniforms.time = Math.min(uniforms.time + delta * 0.03, 1.0); // Clamp to 1.0 max
            }

            if(this.infraredFilter)
                this.infraredFilter.uniforms.time += delta * 0.1;

            if(this.ultravioletFilter)
                this.ultravioletFilter.uniforms.time += delta * 0.1;

            //game.deltaAdjustmentFactor = delta.toFixed(2);
            //game.deltaAdjustmentRatio = (60 / delta / 60).toFixed(1);

            game.deltaAdjustmentFactor = delta; 
            game.deltaAdjustmentRatio = 60 / delta / 60;

            if(!this.pause)
                game.update();
            
            // var t0 = performance.now();
            // if(!this.pause)
            //     game.update();
            // var totalTime = performance.now() - t0;

            // if(totalTime > 3.0)
            //     console.log("%ctotal time: " + totalTime,
			// 	'background: #000; color: #fcbf27');

            if(!this.skip && !this.pause)
                game.draw();
            else
                this.drawPauseAnimation();
            
            if(debug.fpsCounter)
                this.measureFPS();

            this.updateClockDisplay();

            if(this.displacementSprite)
                this.displacementSprite.x++;
        });
        console.log("add tickerCallback");
        this.app.ticker.add(this.app.tickerCallback);
    },

    assignFullscreenWarning: function()
    {
        // --- Remove old warning if exists ---
        if (this.fullscreenWarning)
        {
            this.gameplayContainer.removeChild(this.fullscreenWarning);
            this.fullscreenWarning = null;
        }

        // --- Create text style ---
        const textStyle = new PIXI.TextStyle({
            fill: "#FFDD00",
            fontSize: 44,
            fontWeight: "bold",
            stroke: "#000000",
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowDistance: 4,
            align: "center",
            wordWrap: true,
            wordWrapWidth: productionWidth * 0.8
        });

        // --- Text content ---
        const message = "⚠️ Fullscreen Disabled\n\nPress F11 or click below to return to fullscreen.";
        const text = new PIXI.Text(message, textStyle);
        text.anchor.set(0.5);
        text.x = productionWidth / 2;
        text.y = productionHeight / 2 - 40;

        // --- Optional clickable "Return" button ---
        const buttonStyle = new PIXI.TextStyle({
            fill: "#FFFFFF",
            fontSize: 36,
            fontWeight: "bold",
            stroke: "#000000",
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowDistance: 3,
        });

        const buttonText = new PIXI.Text("🔁 Return to Fullscreen", buttonStyle);
        buttonText.anchor.set(0.5);
        buttonText.x = productionWidth / 2;
        buttonText.y = productionHeight / 2 + 80;
        buttonText.interactive = true;
        buttonText.buttonMode = true;

        buttonText.on("pointerdown", () =>
        {
            // Try to re-enter fullscreen
            if (document.documentElement.requestFullscreen)
                document.documentElement.requestFullscreen();
        });

        // --- Container setup ---
        const container = new PIXI.Container();
        container.addChild(text);
        container.addChild(buttonText);
        container.alpha = 0;

        this.gameplayContainer.addChild(container);
        this.fullscreenWarning = container;

        // --- Fade-in animation ---
        const fadeInSpeed = 0.03;
        const ticker = new PIXI.Ticker();

        ticker.add((delta) =>
        {
            if (container.alpha < 1)
            {
                container.alpha += fadeInSpeed * delta;
                if (container.alpha >= 1)
                    container.alpha = 1;
            }
        });

        ticker.start();
    },

    loadLevel:function(savedData)
    {
        this.resourceMasterSet.clear();
        this.debugUIDs.clear();
        this.overallFrames = 0;
        this.indexes.clear();
        this.imageNames = [];
        this.maininterfaceFilenames = [];

        console.log(savedData);

        this.setAdditionalRequirements();
        this.setGameItems(savedData.items);
        
        this.setGameResources();
        this.setLights();
        this.setThresholds(savedData.thresholds);

        this.setSidebar(savedData.sidebar);
        this.setCharacters();
        this.setNightTime();
        this.setMenu();
        this.setTexts();

        if(!this.resourceMasterSet.has(game.level.mapImages))
        {
            this.mapImage.length = 0;

            for(var i = 0; i < background.tileNames.length; i++)
            {
                this.mapImage.push(background.tileNames[i]);
                PIXI.Assets.add(background.tileNames[i], background.tileNames[i]);
                this.resourceMasterSet.add(background.tileNames[i]);
            }

            this.resourceMasterSet.add(game.level.mapImages);
        }
        else
        {
            this.mapImage.length = 0;
        }

        let maininterfaceFilenames = display.maininterface.getFileNames();

        this.maininterfaceFilenames.length = 0;

        for(var i = 0; i < maininterfaceFilenames.length; i++)
        {
            if(!this.resourceMasterSet.has(maininterfaceFilenames[i]))
            {
                this.maininterfaceFilenames.push(maininterfaceFilenames[i]);
                PIXI.Assets.add(maininterfaceFilenames[i], maininterfaceFilenames[i]);
                this.resourceMasterSet.add(maininterfaceFilenames[i]);
            }
        }

        const texturesPromise = PIXI.Assets.load(Array.from(this.resourceMasterSet));

        texturesPromise.then((textures) =>
        {
            this.assignBackground(textures);

            this.assignThresholds(textures, this.imageNames, game.level.thresholds);
            this.assignLights(textures, this.imageNames, game.level.lights);
            this.assignAdditionalRequirements(textures, this.imageNames);
            this.assignGameItems(textures, this.imageNames, game.level.resources, savedData.items);
            this.assignEmitter(game.level.emitters);

            this.playerContainer.addChild(this.placementGrid);

            this.playerContainer.addChild(this.submergedItemsContainer);
            this.otherContainer.addChild(this.submergedItemsContainer);

            this.playerContainer.addChild(this.surfaceItemsContainer);
            this.otherContainer.addChild(this.surfaceItemsContainer);

            this.playerContainer.addChild(this.airItemsContainer);
            this.otherContainer.addChild(this.airItemsContainer);

            this.container.addChild(this.resourcesContainer);
            this.container.addChild(this.thresholdContainer);
            this.container.addChild(this.lightsContainer);
            this.container.addChild(this.playerContainer);
            this.container.addChild(this.otherContainer);
            this.container.addChild(this.emittersContainer);

            if(debug.production)
            {
                this.maininterfaceFilenames = display.maininterface.getFileNames();
                
                this.maininterface = PIXI.Sprite.from(textures[this.maininterfaceFilenames[0]]);

                //this.gameInterfaceContainer.addChild(this.maininterface);
            } 
            
            this.assignInterface();
            this.container.addChild(this.lightsSpxContainer);

            this.assignMenu(textures);

            this.assignSidebar(this.buttonImages, game.level.sidebar);
            this.assignCharacters(textures, this.imageNames);

            this.selectionBoxContainer.addChild(this.selectionBox);
            this.assignControllerCursor();

            this.container.addChild(this.gameInterfaceContainer);
            this.container.addChild(this.characterContainer);

            physics.init();
            triggers.init();
                
            if(game.level.ai)
            {
                ai.init();
            }                    

            if(game.mode == "multiplayer")
            {
                this.removeLobbyScreen();
                setInterval(() => {
                    game.tick++
                }, 1);
            }

            this.app.ticker.maxFPS = 60;

            game.buildPassableGrid();

            this.app.stage.addChild(this.container);
            this.app.stage.addChild(this.selectionBoxContainer);

            this.addTextInput();

            game.initPowerUsage();
            game.initPowerTotal();
            game.setBuildingTotals();

            game.initCash();

            if(debug.mouseCoords)
            {
                this.container.addChild(this.debugMouseX);
                this.container.addChild(this.debugMouseY);
                this.container.addChild(this.debugMouseDetails);
                this.container.addChild(this.debugOffsetX);
                this.container.addChild(this.debugOffsetY);
                //this.container.addChild(this.debugPathLength);
            }

            this.pause = false;
            this.skip = false;

            renderer.startLevel();
            timer.init();
            console.log("post renderer.startLevel"); 
            game.inGame = true;
        });
    },

    setAdditionalRequirements:function()
    {
        if(game.level.additional_requirements)
        {
            for(var i = 0; i < game.level.additional_requirements.length; i++)
            {
                console.log(game.level.additional_requirements[i].type);
                var frames = window[game.level.additional_requirements[i].type].list[
                    game.level.additional_requirements[i].name].frames;

                for(var j = 0; j < frames; j++)
                {
                    var image = "images/" + game.level.additional_requirements[i].type
                        + "/" + game.level.additional_requirements[i].team
                        + "/" + game.level.additional_requirements[i].name
                        + "/" + j + ".png";

                    if(!this.resourceMasterSet.has(image))
                    {
                        this.images.push(image);
                        this.resourceMasterSet.add(image);
                    }

                    this.imageNames.push(image);
                }

                this.indexes.set(game.level.additional_requirements[i].team + "_" + game.level.additional_requirements[i].name,
                    {"index":this.overallFrames,"frames":frames}); 

                this.overallFrames = this.overallFrames + frames;                
            }
        }
    },

    setGameItems:function(items)
    {
        if(items == undefined)
        {
            console.log("%cThis level's game items are undefined, check maps.js",
            'background: #000; color: #ff0033');
            return;
        }
        console.log("items.length: " + items.length);

        for(var i = 0; i < items.length; i++)
        {
            if(this.indexes.get(items[i].team + "_" + items[i].name) != undefined)
                continue;

            console.log(items[i].type);
            
            console.log(window[items[i].type]);
            console.log(window[items[i].type].list);
            console.log(window[items[i].type].list[items[i].name]);

            var frames = window[items[i].type].list[items[i].name].frames;

            for(var j = 0; j < frames; j++)
            {
                var image = "images/" + items[i].type + "/"
                    + items[i].team + "/"
                    + items[i].name + "/" + j + ".png";

                if(!this.resourceMasterSet.has(image))
                {
                    this.images.push(image);
                    this.resourceMasterSet.add(image);
                }

                this.imageNames.push(image);
            } 
            
            this.indexes.set(items[i].team + "_" + items[i].name, {"index":this.overallFrames,"frames":frames}); 
            this.overallFrames = this.overallFrames + frames;
        }
    },

    setButtons:function(buttons)
    {
        if(buttons)
        {
            for(var i = 0; i < buttons.length; i++)
            {
                var frames = window[buttons[i].type].list[buttons[i].name].frames;

                for(var j = 0; j < frames; j++)
                {
                    var image = "images/" + buttons[i].type + "/" + buttons[i].name + "/" + j + ".png"

                    if(!this.resourceMasterSet.has(image))
                    {
                        this.buttonImages.push(image);
                        this.resourceMasterSet.add(image);
                    }
                }
            }
        }
    },

    setMaterials:function(materials)
    {
        if(materials)
        {
            for(var i = 0; i < materials.length; i++)
            {
                if(materials[i].name == "slides")
                {
                    this.setSlides();
                }

                if(materials[i].name == "notes")
                {
                    this.setNotes();
                }

                if(materials[i].name == "textbook")
                {
                    this.seTextbook();
                }
            }
        }
    },

    setSlides:function()
    {
        console.log(clock.day);
        
        var frames = window["materials"].list["slides" + clock.day].frames;
        
        for(var j = 0; j < frames; j++)
        {
            var image = "images/slides/" + clock.day + "/" + j + ".png"

            if(!this.resourceMasterSet.has(image))
            {
                this.slidesImages.push(image);
                this.resourceMasterSet.add(image);
            }
        }
    },

    setNotes:function()
    {
        var frames = window["materials"].list["notes" + clock.day].frames;
        
        for(var j = 0; j < frames; j++)
        {
            var image = "images/notes/" + clock.day + "/" + j + ".png"

            if(!this.resourceMasterSet.has(image))
            {
                this.notesImages.push(image);
                this.resourceMasterSet.add(image);
            }
        }
    },

    seTextbook:function()
    {
        var frames = window["materials"].list["textbook" + clock.day].frames;
        
        for(var j = 0; j < frames; j++)
        {
            var image = "images/textbook/" + clock.day + "/" + j + ".jpg"

            if(!this.resourceMasterSet.has(image))
            {
                this.textbookImages.push(image);
                this.resourceMasterSet.add(image);
            }
        }
    },

    setProps:function(props)
    {
        if(props)
        {
            for(var i = 0; i < props.length; i++)
            {
                var frames = window["props"].list[props[i].name].frames;
    
                for(var j = 0; j < frames; j++)
                {
                    var image = "images/" + props[i].type + "/" + props[i].name + "/" + j + ".png";
        
                    this.propsImages.push(image);
                    this.resourceMasterSet.add(image);
                }
            }
        }
    },

    setGameResources:function()
    {
        if(game.level.resources)
        {
            console.log("game.level.resources.length: " + game.level.resources.length);

            for(var i = 0; i < game.level.resources.length; i++)
            {
                if(this.indexes.get(game.level.resources[i].name) != undefined)
                    continue;           
    
                var frames = window["resources"].list[game.level.resources[i].name].frames;    
                
                console.log(game.level.resources[i].name);
    
                for(var j = 0; j < frames; j++)
                {
                    console.log("j: " + j);
                    //this.images.push("images/terrain/" + game.level.terrains[i].name + "/" + j + ".png");
                    console.log(this.images[this.images.length-1]);

                    var image = "images/resources/" + game.level.resources[i].name + "/" + j + ".png";

                    if(!this.resourceMasterSet.has(image))
                    {
                        this.images.push(image);
                        this.resourceMasterSet.add(image);
                    }

                    this.imageNames.push(image);
                }
                
                this.indexes.set(game.level.resources[i].name, {"index":this.overallFrames,"frames":frames}); 
                this.overallFrames = this.overallFrames + frames;
            }
        }
        else
        {
            console.log("%cWarning: No terrain was found within this map",
                'background: #000; color: #ffff00');
        }
    },

    setLights:function()
    {
        if(game.level.lights)
        {
            for(var i = 0; i < game.level.lights.length; i++)
            {
                if(this.indexes.get(game.level.lights[i].name) != undefined)
                    continue;           
    
                var frames = window["lights"].list[game.level.lights[i].name].frames;    
    
                for(var j = 0; j < frames; j++)
                {
                    var image = "images/lights/" + game.level.lights[i].name + "/" + j + ".png";

                    if(!this.resourceMasterSet.has(image))
                    {
                        this.images.push(image);
                        this.resourceMasterSet.add(image);
                    }

                    this.imageNames.push(image);
                }
                
                this.indexes.set(game.level.lights[i].name, {"index":this.overallFrames,"frames":frames}); 
                this.overallFrames = this.overallFrames + frames;

                var sfx = window["lights"].list[game.level.lights[i].name].sfx; 

                if(sfx)
                {
                    var sfxImage = "images/lights/" + game.level.lights[i].name + "/sfx.png";

                    console.log(this.imageNames.length);

                    if(!this.resourceMasterSet.has(sfxImage))
                    {
                        this.images.push(sfxImage);
                        this.resourceMasterSet.add(sfxImage);
                    }

                    this.imageNames.push(sfxImage);

                    this.indexes.set(sfxImage, {"index":this.overallFrames+1,"frames":frames}); 
                    this.overallFrames = this.overallFrames + frames;
                }
            }
        }
        else
        {
            console.log("%cWarning: No lights was found within this map",
                'background: #000; color: #ffff00');
        }
    },

    setThresholds:function(thresholds)
    {
        console.log(thresholds);

        if(thresholds)
        {
            for(var i = 0; i < thresholds.length; i++)
            {
                if(this.indexes.get(thresholds[i].name) != undefined)
                    continue;           
    
                var frames = window["thresholds"].list[thresholds[i].name].frames;         
    
                for(var j = 0; j < frames; j++)
                {
                    //this.images.push("images/terrain/" + game.level.terrains[i].name + "/" + j + ".png");

                    var image = "images/thresholds/" + thresholds[i].name + "/" + j + ".png";

                    if(!this.resourceMasterSet.has(image))
                    {
                        this.images.push(image);
                        this.resourceMasterSet.add(image);
                    }

                    this.imageNames.push(image);
                }

                this.indexes.set(game.level.thresholds[i].name, {"index":this.overallFrames,"frames":frames}); 
                this.overallFrames = this.overallFrames + frames;
            }
        }
        else
        {
            console.log("%cWarning: No thresholds was found within this map",
                'background: #000; color: #ffff00');
        }
    },

    setSidebar:function(sidebarButtons)
    {
        if(sidebarButtons)
        {
            for(var i = 0; i < sidebarButtons.length; i++)
            {            
                for(var j = 0; j < sidebarButtonStates; j++)
                {
                    this.buttonImages.push("images/buttons/sidebar/" + sidebarButtons[i].name +
                        "/" + j + ".png");
                }
    
                this.buttonIndexes.set(sidebarButtons[i].name, this.buttonOverallFrames);
                this.buttonOverallFrames = this.buttonOverallFrames + sidebarButtonStates;
            }
        }
        else
        {
            console.log("%cWarning: No sidebar was found within this map",
                'background: #000; color: #ffff00');
        }
    },

    setCharacters:function()
    {
        if(game.level.characters)
        {
            console.log("game.level.characters.length: " + game.level.characters.length);

            for(var i = 0; i < game.level.characters.length; i++)
            {
                if(this.indexes.get(game.level.characters[i].name) != undefined)
                    continue;           
    
                var image = "images/characters/" + game.level.characters[i].name + ".png";

                if(!this.resourceMasterSet.has(image))
                {
                    this.images.push(image);
                    this.resourceMasterSet.add(image);
                }

                this.imageNames.push(image);
                
                this.indexes.set(game.level.characters[i].name, {"index":this.overallFrames,"frames":1}); 
                this.overallFrames = this.overallFrames + 1;
            }
        }
        else
        {
            console.log("%cWarning: No characters was found within this map",
                'background: #000; color: #ffff00');
        }
    },

    setMinimap:function()
    {
        if(game.level.miniMapImage)
        {
            console.log(game.level.miniMapImage);
            var image = game.level.miniMapImage + "minimap.png";

            if(!this.resourceMasterSet.has(image))
            {
                this.images.push(image);
                this.resourceMasterSet.add(image);
            }

            this.imageNames.push(image);

            this.indexes.set("minimap", {"index":this.overallFrames,"frames":1}); 
            this.overallFrames = this.overallFrames + 1;
        }

        // var teamMiniMapImage = "images/minimaps/" + game.team + "/minimap.png";

        // if(!this.resourceMasterSet.has(teamMiniMapImage))
        // {
        //     this.images.push(teamMiniMapImage);
        //     this.resourceMasterSet.add(teamMiniMapImage);
        // }

        // this.imageNames.push(teamMiniMapImage);

        // this.indexes.set("teamMiniMapImage", {"index":this.overallFrames,"frames":1}); 
        // this.overallFrames = this.overallFrames + 1;
    },

    setNightTime:function()
    {
        this.nightTimeDisplay = new PIXI.layers.Layer();
        this.nightTimeDisplay.on('display', (element) => {
            element.blendMode = PIXI.BLEND_MODES.ADD;
        });
        this.nightTimeDisplay.useRenderTexture = true;
        this.nightTimeDisplay.clearColor = [0.3, 0.3, 0.4, 0.8]; // ambient gray
    },

    addTextInput:function()
    {
        this.inputTextBox = new PIXI.TextInput({
            input: {
                fontSize: '36px',
                padding: '12px',
                width: '500px',
                color: '#26272E'
            },
            box: {
                default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
                focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
                disabled: {fill: 0xDBDBDB, rounded: 12}
            }
        })
        
        this.inputTextBox.placeholder = 'Enter your Text...'
        this.inputTextBox.x = 500
        this.inputTextBox.y = 300
        this.inputTextBox.pivot.x = this.inputTextBox.width/2
        this.inputTextBox.pivot.y = this.inputTextBox.height/2
    },

    showTextInput:function()
    {
        if(!this.inputTextBoxDisplayed)
        {
            this.inputTextBoxDisplayed = true;
            this.app.stage.addChild(this.inputTextBox)
            this.inputTextBox.focus()
        }
    },

    showCharacter:function(name)
    {
        if(debug.hideNarration)
            return;

        if(debug.hideCharacter)
            return;

        for(var i = 0; i < game.characters.length; i++)
        {
            if(game.characters[i].name == name)
            {
                game.characters[i].sprite.visible = true;
                break;
            }
        }
    },

    hideCharacter:function()
    {
        for(var i = 0; i < game.characters.length; i++)
        {
            game.characters[i].sprite.visible = false;
        }
    },

    removeTextInput:function()
    {
        this.inputTextBoxDisplayed = false;

        this.app.stage.removeChild(this.inputTextBox)
    },

    setMenu:function()
    {
        // var menu_images = [];
        // menu_images.push("images/menu_button.png");
        // menu_images.push("images/menu.png");
        // menu_images.push("images/menu_save_button.png");
        // menu_images.push("images/menu_load_button.png");
        // menu_images.push("images/menu_desktop_button.png");
        // menu_images.push("images/menu_fullscreen_button.png");
        // menu_images.push("images/menu_restart_button.png");
        // menu_images.push("images/menu_resume_button.png");
        // menu_images.push("images/menu_exit_button.png");

        // for(var i = 0; i < menu_images.length; i++)
        // {
        //     if(!this.resourceMasterSet.has(menu_images[i]))
        //     {
        //         this.images.push(menu_images[i]);
        //         this.resourceMasterSet.add(menu_images[i]);
        //     }
        // }
    },

    addConversationText:function(message)
    {
        this.conversationText.text = message;
    },

    setConversationText:function()
    {
        this.conversationText = new PIXI.Text("", conversationStyle);
        this.conversationText.x = productionWidth / 2;
        this.conversationText.y = 35;
        this.conversationText.visible = false;
        this.conversationText.anchor.set(0.5, 0);
    },

    showConversationText:function(visible)
    {
        this.conversationText.visible = visible;
    },

    clearConversationText:function()
    {
        this.conversationText.text = "";
    },

    addLecturerText:function(message)
    {
        this.lecturerText.text = message;
    },

    setLecturerText: function()
    {
        const lecturerStyleWrapped = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 20,               // or your preferred size
            fill: ['#FFFFFF'],
            fontWeight: 'bold',
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 3,
            wordWrap: true,             // enable wrapping
            wordWrapWidth: productionWidth * 0.8, // wrap within 80% of screen width
            align: 'center'
        });
    
        this.lecturerText = new PIXI.Text("", lecturerStyleWrapped);
        this.lecturerText.x = productionWidth / 2;
        this.lecturerText.y = productionHeight - 100;
        this.lecturerText.visible = false;
        this.lecturerText.anchor.set(0.5, 0);
    },

    showLecturerText:function(visible)
    {
        this.lecturerText.visible = visible;
    },

    addNarratorText: function(message)
    {
        const style = new PIXI.TextStyle({
            fontFamily: "MedievalSharp, fantasy",
            fontSize: 24,
            fill: "#FFD700",
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowDistance: 2,
        });

        this.narratorContainer.removeChildren();

        const words = message.split(" ");
        const maxWidth = productionWidth - 400; // max width for a line/phrase
        const wordSpacing = 10;

        // --- Split words into phrases that fit maxWidth ---
        const phrases = [];
        let currentPhrase = [];
        let currentWidth = 0;

        words.forEach(word => {
            const t = new PIXI.Text(word, style);
            if(currentPhrase.length > 0) currentWidth += wordSpacing;
            currentWidth += t.width;

            if(currentWidth > maxWidth) {
                // Save current phrase and start new
                phrases.push(currentPhrase);
                currentPhrase = [word];
                currentWidth = t.width;
            } else {
                currentPhrase.push(word);
            }
        });
        if(currentPhrase.length > 0) phrases.push(currentPhrase);

        let phraseIndex = 0;
        let currentIndex = 0;
        let wordObjects = [];

        const showPhrase = () => {
            this.narratorContainer.removeChildren();
            wordObjects = phrases[phraseIndex].map(word => {
                const t = new PIXI.Text(word, style);
                t.anchor.set(0, 0.5);
                this.narratorContainer.addChild(t);
                return t;
            });
            currentIndex = 0;
            layoutWords();
        };

        const layoutWords = () => {
            const y = productionHeight / 2;

            // Calculate total width including scaling
            let totalWidth = 0;
            wordObjects.forEach((w, i) => {
                const scale = (i === currentIndex ? 1.8 : 1);
                totalWidth += w.width * scale;
            });
            totalWidth += (wordObjects.length - 1) * wordSpacing;

            // Starting X for centering
            let x = (productionWidth - totalWidth) / 2;
            wordObjects.forEach((w, i) => {
                const scale = (i === currentIndex ? 1.8 : 1);
                w.scale.set(scale);
                w.x = x;
                w.y = y;
                x += w.width + wordSpacing;
            });
        };

        const timePerWord = 6000 / words.length;

        if(this._wordTimer) clearInterval(this._wordTimer);
        this._wordTimer = setInterval(() => {
            currentIndex++;
            if(currentIndex >= wordObjects.length) {
                // Move to next phrase if exists
                phraseIndex++;
                if(phraseIndex >= phrases.length) {
                    clearInterval(this._wordTimer);
                    this._wordTimer = null;
                    // Reset all words to normal scale
                    wordObjects.forEach(w => w.scale.set(1));
                    layoutWords();
                    return;
                }
                showPhrase();
            } else {
                layoutWords();
            }
        }, timePerWord);

        // Show first phrase
        showPhrase();
    },

    showNarratorText:function(visible)
    {
        this.narratorContainer.visible = visible;
    },

    assignBackground:function(textures)
    {
        this.removeLoadingScreen();
        this.backgroundContainer.removeChildren();

        while(this.tiles.length > 0)
        {
            this.tiles.splice(0, 1);
        }

        if(background.tileNames.length == 0)
        {
            console.log("%cNo background tiles are set, check maps.js",
            'background: #000; color: #ff0033');
            return;
        }

        this.backgroundContainer.x = -(this.cameraOffsetX);
        this.backgroundContainer.y = -(this.cameraOffsetY);

        for(var i = 0; i < background.tileNames.length; i++)
        {
            this.tiles.push(
                PIXI.Sprite.from(
                    textures[background.tileNames[i]]));
        }

        for(var l = 0; l < background.numberOfHorizontalTiles; l++)
        {
            for(var k = 0; k < background.numberOfVerticalTiles; k++)
            {
                var tile = this.tiles[l * background.numberOfVerticalTiles + k];

                if(tile)
                {
                    tile.x = k * background.rotationXLimit;
                    tile.y = l * background.rotationYLimit + display.maininterface.mapImageYOffset;
    
                    this.backgroundContainer.addChild(tile);
                }                
            }    
        }

        this.gameplayContainer.addChild(this.backgroundContainer); 
    },

    assignDialogue: function(textures)
    {
        // --- Setup Dialogue ---
        //this.dialogueContainer.removeChildren();

        const dialogueTextureName = display.dialogue.getFileName();
        const dialogueTexture = textures?.[dialogueTextureName] || PIXI.Texture.from(dialogueTextureName);

        this.dialogueSprite = new PIXI.Sprite(dialogueTexture);
        this.dialogueSprite.visible = true;
        this.dialogueSprite.x = productionWidth / 2;
        this.dialogueSprite.y = productionHeight / 2;
        this.dialogueSprite.anchor.set(0.5, 0.5);

        // --- Setup Hardcoded Text Input ---
        this.input = new TextInputDetails();

        this.input.x = 460;
        this.input.y = 840;

        this.input.inputWidth = "1000px";
        this.input.inputFontSize = "20px";
        this.input.placeholder = "Enter your Text...";
        this.input.password = false;

        // Ensure these are all present for PIXI.TextInput
        this.input.inputPadding = 10;
        this.input.inputColor = "#ffffff";

        this.input.boxDefaultFill = "#515151";
        this.input.boxFocusedFill = "#515151";

        this.input.boxDefaultStrokeColor = "#969696";
        this.input.boxFocusedStrokeColor = "#969696";

        this.input.boxDefaultStrokeWidth = 2;
        this.input.boxFocusedStrokeWidth = 2;

        this.inputField = this.generateTextInput(this.input);
        this.inputField.visible = true;
        this.inputField.interactive = true;
        this.inputField.on('keydown', (keycode) => {
            if (keycode === 13) { // 13 is the keycode for Enter
                this.clearTextOutput();

                if(player.currentStudent)
                {
                    economy.set(player.currentStudent.name,1);
                    client.sendMessage({
                        id: game.player.networkUid,
                        role:"dumb",
                        sendTo: "smart",
                        type:"talk",
                        code:game.player.id,
                        clockDay:clock.day,
                        studentName:player.currentStudent.name,
                        message:this.inputField.text
                    });
                    this.inputField.text = '';
                }
                else if(player.currentTeacher)
                {
                    client.sendMessage({
                        id: game.player.networkUid,
                        role:"dumb",
                        sendTo: "smart",
                        type:"teacher",
                        code:game.player.id,
                        clockDay:clock.day,
                        message:this.inputField.text,
                        teacherType:player.currentTeacher.name
                    });
                    this.inputField.text = '';
                }
            }
        });

        this.outputField = new PIXI.Text("", narratorStyle);
        this.outputField.visible = true;
        this.outputField.x = 460;
        this.outputField.y = 240;

        // --- Setup Dialogue ---
        const closeTextureName = display.close.getFileName();
        const closeTexture = textures?.[closeTextureName] || PIXI.Texture.from(closeTextureName);

        this.closeSprite = new PIXI.Sprite(closeTexture);
        this.closeSprite.visible = true;
        this.closeSprite.x = 1440;
        this.closeSprite.y = 180;
        this.closeSprite.interactive = true;
        this.closeSprite.on('pointerdown', () => {
            
            if(player.currentStudent)
            {
                player.currentStudent.orders.type = "leave";
                player.currentStudent.talkCount = 0;
                player.currentStudent.state.talking = false;
                player.currentStudent.state.talkingToTutor = false;
                player.currentStudent.state.leaving = true;

                this.clearTextOutput();

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

            this.hideDialogue();
        });

        this.dialogueContainer.visible = false;
        this.dialogueContainer.addChild(this.dialogueSprite);
        this.dialogueContainer.addChild(this.inputField);
        this.dialogueContainer.addChild(this.outputField);
        this.dialogueContainer.addChild(this.closeSprite);
    },

    generateTextInput:function(details)
    {
        let temp = new TextInput({
            input: {
                fontSize: details.inputFontSize,
                padding: details.inputPadding,
                width: details.inputWidth, // Is 1000px but actually not resizing
                color: details.inputColor,
            },
            box: {
                default: {fill: details.boxDefaultFill, rounded: 6, stroke: {color: details.boxDefaultStrokeColor, width: details.boxDefaultStrokeWidth}},
                focused: {fill: details.boxFocusedFill, rounded: 6, stroke: {color: details.boxFocusedStrokeColor, width: details.boxFocusedStrokeWidth}},
                disabled: {fill: details.boxDisabledFill, rounded: 6}
            }
        });

        const dropShadowFilter = new PIXI.filters.DropShadowFilter({
                rotation: 45,
                distance: 5,
                blur: 5, // Shadow blur amount in pixels
                alpha: 0.7, // Shadow opacity (0 to 1)
                color: 0, // Shadow color (black in this case)
        });

        temp.filters = [dropShadowFilter];

        if(details.anchor)
        {
            temp.anchor.set(details.anchor);
        }
        else
        {
            if(details.anchorX && details.anchorY)
            {
                temp.anchor.set(details.anchorX, details.anchorY);
            }
            else
            {
                if(details.anchorX)
                {
                    temp.anchor.set(details.anchorX, 0);
                }

                if(details.anchorY)
                {
                    temp.anchor.set(0, details.anchorY);
                }
            }                    
        }

        if(details.password)
            temp._dom_input.type = 'password';

        if(details.placeholder)
            temp.placeholder = details.placeholder;

        console.log(details);

        if (typeof details.x === "number") temp.x = details.x;
        if (typeof details.y === "number") temp.y = details.y;

        console.log(temp);

        return temp;
    },

    generateTextOutput:function(text)
    {
        this.textbookLineCounter++;

        if((this.textbookLineCounter % 20) == 0)
            this.outputField.text = this.outputField.text + text + "\n";
        else
            this.outputField.text = this.outputField.text + text;
    },

    showTextOutput:function()
    {
        this.outputField.visible = true;
    },

    clearTextOutput:function()
    {
        this.textbookLineCounter = 0;
        this.outputField.text = "";
    },

    assignGameItems:function(textures, images, resources, items)
    {
        if(items == undefined)
        {
            console.log("%cThis level's game items are undefined and can not be assigned, check maps.js",
            'background: #000; color: #ff0033');
            return;
        }

        this.submergedItemsContainer.removeChildren();
        this.surfaceItemsContainer.removeChildren();
        this.airItemsContainer.removeChildren();

        this.playerContainer.removeChildren();
        this.otherContainer.removeChildren();

        for(var i=0; i < items.length; i++)
        {   
            var item = {};
            //game.items.push({});

            var index = game.items.length;

            // $.extend(item,window[items[i].type].list[items[i].name]);
            // $.extend(item,window[items[i].type].defaults);

            Object.assign(item, window[items[i].type].list[items[i].name]);
            Object.assign(item, window[items[i].type].defaults);

            var levelItemOffsetX;
            var levelItemOffsetY;

            if(!item.passableGrid)
            {
                console.log("%cPassable Grid is missing from the item", 
                    "background: #000; color: #ff0000");
            }

            levelItemOffsetX = Math.floor(item.passableGrid[0].length / 2);
            levelItemOffsetY = Math.floor(item.passableGrid.length / 2);

            if(this.debugUIDs.has(items[i].uid))
            {
                console.log(this.debugUIDs);
                alert("duplicate uid has been discovered in this level, uid: " + items[i].uid);
                return;
            }

            this.debugUIDs.add(items[i].uid);

            item.uid = items[i].uid;
            item.networkUid = conversations.generateNetworkUid();
            item.conversationUid = 0;
            //item.uid = this.itemUID++;
            item.type = items[i].type;
            item.name = items[i].name;
            item.team = items[i].team;
            item.direction = items[i].direction ? items[i].direction : 0;
            item.correctDirection = 0;
            item.animationDirection = item.direction;
            item.x = items[i].x + levelItemOffsetX; 
            item.y = items[i].y + levelItemOffsetY;
            item.originX = item.x;
            item.originY = item.y;
            item.orders = {};
            item.orders.type = items[i].order ? items[i].order : "stand";
            item.state = {
                searching:false,
                talking:false,
                talkingToTutor:false,
                leaving:false
            };

            if(item.name == "tutor" || item.name == "librarian")
                item.selectable = true;
            
            item.isAlive = true;
            item.hasCollided = false;

            if(item.hitPoints)
                item.life = item.hitPoints;
            else
                item.life = item.totalLife;
                
            if(item.hangerPositions)
            {
                for(var j = 0; j < item.hangerPositions.length; j++)
                {
                    item.hangerPositions[j].uid = undefined;
                }
            }

            // if(item.visionGridX)
            //     this.setVisionGrid(item);
                
            lookup.add(item.uid, index);

            let spriteTextures = [];

            for(var j = this.indexes.get(items[i].team + "_" + items[i].name).index; 
                j < this.indexes.get(items[i].team + "_" + items[i].name).index +
                this.indexes.get(items[i].team + "_" + items[i].name).frames;
                j++)
            {
                spriteTextures.push(textures[images[j]]);    
            }

            if(spriteTextures.length > 0)
                this.texturesMap.set(items[i].team + "_" + items[i].name, spriteTextures);


            if(items[i].direction)
            {
                item.sprite = PIXI.Sprite.from(
                    this.texturesMap.get(items[i].team + "_" + items[i].name)[items[i].direction]);
            }
            else
            {
                item.sprite = PIXI.Sprite.from(
                    this.texturesMap.get(items[i].team + "_" + items[i].name)[0]);
            }

            if(!items[i].spriteX)
            {
                item.sprite.x = 
                    (items[i].x + levelItemOffsetX) * game.gridSize;

                item.sprite.y = 
                    (items[i].y + levelItemOffsetY) * game.gridSize +
                    display.maininterface.mapImageYOffset;

                item.sprite.x = item.sprite.x - this.cameraOffsetX;
                item.sprite.y = item.sprite.y - this.cameraOffsetY;
            }
            else
            {
                item.sprite.x = items[i].spriteX - this.cameraOffsetX;
                item.sprite.y = items[i].spriteY - this.cameraOffsetY;
            }

            if(item.additionalSprites)
            {
                item.sprites = [];
            }

            if(item.emitter)
            {
                this.addEmitter(item);
                //items[i].emitterIndex = game.emitters.length-1;
                item.emitterIndex = game.emitters.length-1;
                //alert(items[i].emitterIndex);
            }

            item.sprite.scale.x = 1;
            item.sprite.scale.y = 1;

            item.lastMovementX = undefined;
            item.lastMovementY = undefined;

            if(items[i].rotation)
                item.sprite.rotation = degreesToRadians(items[i].rotation);

            if(item.createPolygon)
                item.createPolygon();            
        
            item.sprite.anchor.set(0.5);         
                
            item.selectionGraphicBorder = new PIXI.Graphics();

            var selectionGraphic = new PIXI.Graphics();

            selectionGraphic.
                beginFill(styles.selectionFillColor).
                drawCircle(0,0,item.selectionRadius).
                endFill();

            selectionGraphic.alpha = 0.2;

            item.selectionSprite = new PIXI.Sprite(
                this.app.renderer.generateTexture(selectionGraphic));

            item.selectionSprite.visible = false;
            item.selectionSprite.anchor.set(0.5);

            var selectionBorder = new PIXI.Graphics();
            selectionBorder.lineStyle(1, styles.selectionBorderColor, 1);

            var icon = new PIXI.Graphics();
            icon.lineStyle(2, item.iconColor, 2);

            var iconDirection = new PIXI.Graphics();
            iconDirection.lineStyle(2, item.iconColor, 2);

            iconDirection.moveTo(0, 0);
            iconDirection.lineTo(0, item.radius * 1.5);

            if(item.selectionBorderShape == "rectangle")
            {
                selectionBorder.drawRect(0, 0, 100, 100);
            }
            else if(item.selectionBorderShape == "circle")
            {
                selectionBorder.arc(0, 0, item.radius, 0, Math.PI * 2);	
            }

            if(item.iconShape == "circle")
            {
                icon.arc(0, 0, item.radius, 0, Math.PI * 2);	
            }
            else if(item.iconShape == "rect")
            {
                icon.drawRect(0, 0, item.buildableGrid[0].length * game.gridSize, item.buildableGrid.length * game.gridSize);	
            }
            else if(item.iconShape == "tri")
            {
                drawStar.call(icon, 400, 300, 3, item.radius);
            }
						
			selectionBorder.alpha = 0.5;

            item.selectionBorderSprite = new PIXI.Sprite(
                this.app.renderer.generateTexture(
                    selectionBorder));

            item.iconSprite = new PIXI.Sprite(
                this.app.renderer.generateTexture(
                    icon));

            item.iconDirectionSprite = new PIXI.Sprite(
                this.app.renderer.generateTexture(
                    iconDirection));

            item.selectionBorderSprite.anchor.set(0.5);
            item.selectionBorderSprite.visible = false;

            item.iconSprite.anchor.set(0.5);
            item.iconSprite.visible = true;
            item.iconDirectionSprite.visible = true;

            var lifeBar = new PIXI.Graphics();

            lifeBar.beginFill(styles.lifeBarHealthyFillColor);	
            lifeBar.drawRect(0, 0, 100, 100);
            lifeBar.endFill();

            item.lifeBarSprite = new PIXI.Sprite(
                this.app.renderer.generateTexture(
                    lifeBar));

            item.lifeBarSprite.anchor.set(0.5);

            item.lifeBarSprite.visible = false;

            var lifeBarBorder = new PIXI.Graphics();
            
            lifeBarBorder.lineStyle(1, 0x000000, 1);
            lifeBarBorder.drawRect(
                0, 0,
                item.pixelWidth * item.life / item.hitPoints, 4);

            item.lifeBarBorderSprite = new PIXI.Sprite(
                this.app.renderer.generateTexture(
                    lifeBarBorder));

            item.lifeBarBorderSprite.anchor.set(0.5);
            item.lifeBarBorderSprite.visible = false;

            item.pathLine = new PIXI.Graphics();            
            item.pathLine.visible = false;

            item.pathCNCLine = new PIXI.Graphics();            
            item.pathCNCLine.visible = false;
             
            item.endLine = new PIXI.Graphics();            
            item.endLine.visible = false;

            item.bodyCollision = new PIXI.Graphics();
            item.rightCollision = new PIXI.Graphics();
            item.leftCollision = new PIXI.Graphics();
            item.skinCollision = new PIXI.Graphics();
            item.headLeftCollision = new PIXI.Graphics();
            item.headRightCollision = new PIXI.Graphics();
            item.visionCollision = new PIXI.Graphics();
            item.bumperCollision = new PIXI.Graphics();
            item.nearCollision = new PIXI.Graphics();
            item.collisionBubble = new PIXI.Graphics();

            if(item.name == game.team)
            {
                if(item.layer && item.layer == "surface")
                    this.addToContainer(item, this.surfaceItemsContainer);
                else if(item.layer && item.layer == "air")
                    this.addToContainer(item, this.airItemsContainer);
                else if(item.layer && item.layer == "submerge")
                    this.addToContainer(item, this.submergedItemsContainer);
                else
                    this.addToContainer(item, this.playerContainer);

                this.cncContrainer.addChild(item.iconSprite);
                this.cncContrainer.addChild(item.iconDirectionSprite);
                this.cncContrainer.addChild(item.pathCNCLine);
            }
            else
            {
                if(item.layer && item.layer == "surface")
                    this.addToContainer(item, this.surfaceItemsContainer);
                else if(item.layer && item.layer == "air")
                    this.addToContainer(item, this.airItemsContainer);
                else if(item.layer && item.layer == "submerge")
                    this.addToContainer(item, this.submergedItemsContainer);
                else
                    this.addToContainer(item, this.otherContainer);
            }
            
            if(item.name == "player")
            {
                game.player = item;
                game.player.id = this.gamecode;
            }
            
            if(item.name == "lecturer")
            {
                game.lecturer = item;
            }

            if(item.name == "narrator")
            {
                game.narrator = item;
            }

            if(item.name == "tutor")
            {
                game.tutor = item;
            }

            if(item.name == "librarian")
            {
                game.librarian = item;
            }

            console.log(item);

            item.outputTest();
            
            this.container.addChild(this.desyncText);

            if(debug.draw)
            {
                this.container.addChild(this.fpsText);
                this.container.addChild(this.numberOfSelectedText);
                this.container.addChild(this.passByCountText);
                this.container.addChild(this.debugMsPassByText);
            }

            if(item.push)
                item.push(item);
            else
                game.items.push(item);

            if(item.init)
                item.init();
        }

        this.container.addChild(this.masks);
    },

    sendDetailsToServer:function()
    {
        let message = {
            role:"dumb",
            sendTo: "smart",
            type: "init",
            code:this.gamecode,
            day: this.clock.day,
            names: [],
            personalities:[]
        };
    
        for (var i = 0; i < game.items.length; i++)
        {
            if (game.items[i].type !== "students")
                continue;
    
            message.names.push(game.items[i].name);
            message.personalities.push(game.items[i].personality);
        }
    
        console.log("Sending initialization message:", message);
        
        client.sendMessage(message);
    },

    assignDay:function()
    {   
        this.day = {};

        this.day.spriteText = new PIXI.Text("Day", clockStyle);
        this.day.spriteText.x = 35;
        this.day.spriteText.y = 35;
        this.day.spriteText.text = "Day: " + (this.theDay);

        this.gameplayContainer.addChild(this.day.spriteText);
    },

    assignClock:function(clockData)
    {
        if(!clockData)
            return;
        
        this.clock = {};
        Object.assign(this.clock, window["clock"]);
        this.clock.timer = clockData.timer;

        this.clock.spriteText = new PIXI.Text("Clock", clockStyle);
        this.clock.spriteText.x = 35;
        this.clock.spriteText.y = 65;
        this.clock.spriteText.text = "Clock: " + Math.floor(this.clock.timer);

        this.gameplayContainer.addChild(this.clock.spriteText);
    },

    updateClockDisplay: function()
    {
        if (this.clock && this.clock.spriteText)
        {
            this.clock.spriteText.text = "Clock: " + Math.floor(this.clock.timer);
        }
    },

    assignInterface:function()
    {
        if(!this.maininterfaceDiagonal)
            return;

        this.maininterfaceDiagonal.x = screen.width * /*window.devicePixelRatio*/ - 320;
 
        this.maininterfaceVertical.x = screen.width * /*window.devicePixelRatio*/ - 160;
        this.maininterfaceVertical.y = screen.height * /*window.devicePixelRatio*/ - 192;
        this.maininterfaceHorizontalScale.x = 256;
        this.maininterfaceHorizontalScale.scale.x = screen.width * /*window.devicePixelRatio*/ - 320 - 256;
        this.maininterfaceVerticalScale.x = screen.width * /*window.devicePixelRatio*/ - 160;
        this.maininterfaceVerticalScale.y = 510;
        this.maininterfaceVerticalScale.scale.y = screen.height * /*window.devicePixelRatio*/ - 510 - 192;
    },

    assignLoadedResources:function(images, resources)
    {
        if(resources)
        {
            this.resourcesContainer.removeChildren();

            for(var i=0; i < resources.length; i++)
            {
                game.items.push({});

                var resourcesIndex = game.items.length-1;

                // $.extend(game.items[resourcesIndex],window["resources"].list[resources[resourcesIndex].name]);
                // $.extend(game.items[resourcesIndex],window["resources"].defaults);

                Object.assign(game.items[resourcesIndex], window["resources"].list[resources[resourcesIndex].name]);
                Object.assign(game.items[resourcesIndex], window["resources"].defaults);

                game.items[resourcesIndex].uid = this.itemUID++;
                game.items[resourcesIndex].type = resources[resourcesIndex].type;
                game.items[resourcesIndex].name = resources[resourcesIndex].name;
                game.items[resourcesIndex].x = resources[resourcesIndex].x /*+ Math.floor(game.items[resourcesIndex].passableGrid[0].length / 2); */
                game.items[resourcesIndex].y = resources[resourcesIndex].y /*+ Math.floor(game.items[resourcesIndex].passableGrid.length / 2);*/

                game.items[resourcesIndex].isAlive = false;

                //lookup.add(game.items[resourcesIndex].uid, resourcesIndex); <-- This is terrain

                let textures = [];

                for(var j = this.indexes.get(resources[resourcesIndex].name).index; 
                    j < this.indexes.get(resources[resourcesIndex].name).index +
                    this.indexes.get(resources[resourcesIndex].name).frames;
                    j++)
                {
                    textures.push(PIXI.Loader.shared.resources[images[j]].texture);    
                }

                if(textures.length > 0)
                    this.texturesMap.set(resources[resourcesIndex].name, textures);

                if(resources[resourcesIndex].direction)
                    game.items[resourcesIndex].sprite = new PIXI.Sprite(
                        this.texturesMap.get(resources[resourcesIndex].name)[resources[resourcesIndex].direction]);
                else
                    game.items[resourcesIndex].sprite = new PIXI.Sprite(
                        this.texturesMap.get(resources[resourcesIndex].name)[0]);

                //game.items[resourcesIndex].sprite.anchor.set(0.5);

                game.items[resourcesIndex].sprite.x =
                    resources[resourcesIndex].spriteX;

                game.items[resourcesIndex].sprite.y =
                    resources[resourcesIndex].spriteY;

                this.resourcesContainer.addChild(game.items[resourcesIndex].sprite);
            }
        }
    },

    assignLoadedGameItems:function(images, items)
    {
        if(items == undefined)
        {
            console.log("%cThis level's game items are undefined and can not be assigned, check maps.js",
            'background: #000; color: #ff0033');
            return;
        }

        console.log(items);

        for(var i=0; i < items.length; i++)
        {
            game.items.push({});

            var index = game.items.length-1;

            // $.extend(game.items[index],window[items[i].type].list[items[i].name]);
            // $.extend(game.items[index],window[items[i].type].defaults);

            Object.assign(game.items[index], window[items[i].type].list[items[i].name]);
            Object.assign(game.items[index], window[items[i].type].defaults);

            levelItemOffsetX = Math.floor(game.items[index].passableGrid[0].length / 2);
            levelItemOffsetY = Math.floor(game.items[index].passableGrid.length / 2);

            game.items[index].uid = items[i].uid;
            game.items[index].type = items[i].type;
            game.items[index].name = items[i].name;
            game.items[index].team = items[i].team;
            game.items[index].direction = items[i].direction;
            game.items[index].correctDirection = 0;
            game.items[index].x = items[i].x;
            game.items[index].y = items[i].y;

            if(items[i].orders)
            {
                game.items[index].orders = items[i].orders;
                game.items[index].orders.type = items[i].orders.type;
                game.items[index].state = {
                    searching:false,
                    attacking:false,
                    firing:false,
                    retreating:false,
                    capturing:false,
                    extracting:false,
                    detouring:false,
                    flying:false,
                };
            }
            
            game.items[index].isAlive = true;

            if(items[i].hitPoints)
                game.items[index].life = items[i].hitPoints;
            else
                game.items[index].life = items[i].totalLife;

            // if(item.visionGridX)
            //     this.setVisionGrid(game.items[index]);

            let textures = [];

            for(var j = this.indexes.get(items[i].team + "_" + items[i].name).index; 
                j < this.indexes.get(items[i].team + "_" + items[i].name).index +
                this.indexes.get(items[i].team + "_" + items[i].name).frames;
                j++)
            {
                textures.push(PIXI.Loader.shared.resources[images[j]].texture);    
            }

            this.texturesMap.set(items[i].team + "_" + items[i].name, textures);

            if(items[i].animationDirection)    
            {
                game.items[index].sprite = new PIXI.Sprite(
                    this.texturesMap.get(items[i].team + "_" + items[i].name)[
                    items[i].animationDirection]);
            }
            else
            {
                game.items[index].sprite = new PIXI.Sprite(
                    this.texturesMap.get(items[i].team + "_" + items[i].name)[0]);
            }

            game.items[index].sprite.x = items[i].spriteX;
            game.items[index].sprite.y = items[i].spriteY;

            if(items[i].box)
                game.items[index].box = items[i].box;

            if(items[i].bubble)
                game.items[index].bubble = items[i].bubble;
        
            game.items[index].sprite.anchor.set(0.5);         
                
            game.items[index].selectionGraphicBorder = new PIXI.Graphics();
            game.items[index].selectionGraphic = new PIXI.Graphics();
            game.items[index].lifeBar = new PIXI.Graphics();
            game.items[index].bodyCollision = new PIXI.Graphics();
            game.items[index].rightCollision = new PIXI.Graphics();
            game.items[index].leftCollision = new PIXI.Graphics();
            game.items[index].skinCollision = new PIXI.Graphics();
            game.items[index].headLeftCollision = new PIXI.Graphics();
            game.items[index].headRightCollision = new PIXI.Graphics();
            game.items[index].visionCollision = new PIXI.Graphics();
            game.items[index].bumperCollision = new PIXI.Graphics();
            game.items[index].nearCollision = new PIXI.Graphics();
            game.items[index].collisionBubble = new PIXI.Graphics();

            this.addMiniMapMarker(game.items[index]);

            if(game.items[index].team == game.team)
            {
                if(game.items[index].layer && game.items[index].layer == "surface")
                    this.addToContainer(game.items[index], this.surfaceItemsContainer);
                else if(game.items[index].layer && game.items[index].layer == "air")
                    this.addToContainer(game.items[index], this.airItemsContainer);
                else if(game.items[index].layer && game.items[index].layer == "submerge")
                    this.addToContainer(game.items[index], this.submergedItemsContainer);
                else
                    this.addToContainer(game.items[index], this.playerContainer);
            }
            else
            {
                if(game.items[index].layer && game.items[index].layer == "surface")
                    this.addToContainer(game.items[index], this.surfaceItemsContainer);
                else if(game.items[index].layer && game.items[index].layer == "air")
                    this.addToContainer(game.items[index], this.airItemsContainer);
                else if(game.items[index].layer && game.items[index].layer == "submerge")
                    this.addToContainer(game.items[index], this.submergedItemsContainer);
                else
                    this.addToContainer(game.items[index], this.otherContainer);
            }
            
            game.items[index].outputTest();

            if(!debug.production)
            {
                this.container.addChild(this.debugMouseX);
                this.container.addChild(this.debugMouseY);
            }
        }

        this.container.addChild(this.masks);

        game.buildPassableGrid();

        game.initPowerUsage();
        game.initPowerTotal();

        game.setBuildingTotals();
    },

    assignThresholds:function(textures, images, thresholds)
    {
        if(thresholds)
        {
            for(var i=0; i < thresholds.length; i++)
            {
                game.items.push({});

                var thresholdIndex = game.items.length-1;

                Object.assign(game.items[thresholdIndex], window["thresholds"].list[thresholds[i].name]);
                Object.assign(game.items[thresholdIndex], window["thresholds"].defaults);   

                game.items[thresholdIndex].uid = this.itemUID++;
                game.items[thresholdIndex].type = thresholds[i].type;
                game.items[thresholdIndex].name = thresholds[i].name;
                game.items[thresholdIndex].x = thresholds[i].x; 
                game.items[thresholdIndex].y = thresholds[i].y;
                game.items[thresholdIndex].direction = thresholds.direction ? thresholds.direction : 0;
                game.items[thresholdIndex].open = new Map();
                game.items[thresholdIndex].itemPreviousOrders = new Map();

                game.items[thresholdIndex].keyCollisionGfx = new PIXI.Graphics();
                game.items[thresholdIndex].lockCollisionGfx = new PIXI.Graphics();

                game.items[thresholdIndex].isAlive = false;

                //lookup.add(game.thresholds[thresholdIndex].uid, thresholdIndex); <-- This is thresholds

                let spriteTextures = [];

                for(var j = this.indexes.get(thresholds[i].name).index; 
                    j < this.indexes.get(thresholds[i].name).index +
                    this.indexes.get(thresholds[i].name).frames;
                    j++)
                {
                    spriteTextures.push(textures[images[j]]);   
                }

                if(spriteTextures.length > 0)
                {
                    this.texturesMap.set(thresholds[i].name, spriteTextures);
                }

                if(thresholds[i].direction)
                    game.items[thresholdIndex].sprite = PIXI.Sprite.from(
                        this.texturesMap.get(thresholds[i].name)[thresholds[i].direction]);
                else
                    game.items[thresholdIndex].sprite = PIXI.Sprite.from(
                        this.texturesMap.get(thresholds[i].name)[0]);

                //game.items[thresholdIndex].sprite.anchor.set(0.5);

                game.items[thresholdIndex].sprite.x =
                    thresholds[i].x * game.gridSize - this.cameraOffsetX;

                game.items[thresholdIndex].sprite.y =
                    thresholds[i].y * game.gridSize + display.maininterface.mapImageYOffset - this.cameraOffsetY;

                //if(game.items[thresholdIndex].createPolygon)
                //    game.items[thresholdIndex].createPolygon();

                this.thresholdContainer.addChild(game.items[thresholdIndex].sprite);
                this.thresholdContainer.addChild(game.items[thresholdIndex].keyCollisionGfx);
                this.thresholdContainer.addChild(game.items[thresholdIndex].lockCollisionGfx);
            }
        }
    },

    assignLoadedThresholds:function(images, thresholds)
    {
        if(thresholds)
        {
            for(var i=0; i < thresholds.length; i++)
            {
                game.items.push({});

                var thresholdIndex = game.items.length-1;

                // $.extend(game.items[thresholdIndex],window["thresholds"].list[thresholds[i].name]);
                // $.extend(game.items[thresholdIndex],window["thresholds"].defaults);

                Object.assign(game.items[thresholdIndex], window["thresholds"].list[thresholds[i].name]);
                Object.assign(game.items[thresholdIndex], window["thresholds"].defaults);

                game.items[thresholdIndex].uid = this.itemUID++;
                game.items[thresholdIndex].type = thresholds[i].type;
                game.items[thresholdIndex].name = thresholds[i].name;
                game.items[thresholdIndex].x = thresholds[i].x; 
                game.items[thresholdIndex].y = thresholds[i].y;

                game.items[thresholdIndex].isAlive = false;

                //lookup.add(game.thresholds[thresholdIndex].uid, thresholdIndex); <-- This is thresholds

                let textures = [];

                for(var j = this.indexes.get(thresholds[i].name).index; 
                    j < this.indexes.get(thresholds[i].name).index +
                    this.indexes.get(thresholds[i].name).frames;
                    j++)
                {
                    textures.push(PIXI.Loader.shared.resources[images[j]].texture);    
                }

                if(textures.length > 0)
                {
                    console.log(thresholds[i].name);
                    this.texturesMap.set(thresholds[i].name, textures);
                }

                if(thresholds[i].direction)
                    game.items[thresholdIndex].sprite = new PIXI.Sprite(
                        this.texturesMap.get(thresholds[i].name)[thresholds[i].direction]);
                else
                    game.items[thresholdIndex].sprite = new PIXI.Sprite(
                        this.texturesMap.get(thresholds[i].name)[0]);

                game.items[thresholdIndex].sprite.x =
                    thresholds[i].spriteX;

                game.items[thresholdIndex].sprite.y =
                    thresholds[i].spriteY;

                this.thresholdContainer.addChild(game.items[thresholdIndex].sprite);
            }
        }
    },

    assignLights:function(textures, images, lights)
    {
        if(lights)
        {
            const lightingSprite = new PIXI.Sprite(this.nightTimeDisplay.getRenderTexture());
            lightingSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;

            this.gameplayContainer.addChild(lightingSprite);

            for(var i=0; i < lights.length; i++)
            {
                game.items.push({});

                var lightIndex = game.items.length-1;

                // $.extend(game.items[lightIndex],window["lights"].list[lights[i].name]);
                // $.extend(game.items[lightIndex],window["lights"].defaults);

                Object.assign(game.items[lightIndex], window["lights"].list[lights[i].name]);
                Object.assign(game.items[lightIndex], window["lights"].defaults);

                game.items[lightIndex].uid = this.itemUID++;
                game.items[lightIndex].type = lights[i].type;
                game.items[lightIndex].name = lights[i].name;
                game.items[lightIndex].x = lights[i].x; 
                game.items[lightIndex].y = lights[i].y;
                game.items[lightIndex].direction = lights.direction ? lights.direction : 0;
                game.items[lightIndex].on = lights[i].on;

                game.items[lightIndex].isAlive = false;

                //lookup.add(game.lights[lightIndex].uid, lightIndex); <-- This is lights

                let spriteTextures = [];

                let spxTexture = undefined;

                for(var j = this.indexes.get(lights[i].name).index; 
                    j < this.indexes.get(lights[i].name).index +
                    this.indexes.get(lights[i].name).frames;
                    j++)
                {
                    spriteTextures.push(textures[images[j]]);

                    if(game.items[lightIndex].on)
                    {
                        spxTexture = textures[images[j+1]];
                    }
                }

                if(spriteTextures.length > 0)
                {
                    this.texturesMap.set(lights[i].name, spriteTextures);
                }

                if(lights[i].direction)
                    game.items[lightIndex].sprite = PIXI.Sprite.from(
                        this.texturesMap.get(lights[i].name)[lights[i].direction]);
                else
                    game.items[lightIndex].sprite = PIXI.Sprite.from(
                        this.texturesMap.get(lights[i].name)[0]);

                game.items[lightIndex].sprite.anchor.set(0.5);
                game.items[lightIndex].sprite.scale.x = 1;
                game.items[lightIndex].sprite.scale.y = 1;

                game.items[lightIndex].sprite.x =
                    lights[i].x * game.gridSize - this.cameraOffsetX;

                game.items[lightIndex].sprite.y =
                    lights[i].y * game.gridSize + display.maininterface.mapImageYOffset - this.cameraOffsetY;

                this.lightsContainer.addChild(game.items[lightIndex].sprite);

                if(game.items[lightIndex].on)
                {
                    game.items.push({});

                    lightIndex = game.items.length-1;

                    game.items[lightIndex].sprite = PIXI.Sprite.from(
                        spxTexture);

                    game.items[lightIndex].sprite.x = game.items[lightIndex-1].sprite.x;
                    game.items[lightIndex].sprite.y = game.items[lightIndex-1].sprite.y - 30;
                    game.items[lightIndex].sprite.anchor.set(0.5);
                    game.items[lightIndex].sprite.scale.x = 1;
                    game.items[lightIndex].sprite.scale.y = 1;
                    game.items[lightIndex].sprite.blendMode = PIXI.BLEND_MODES.ADD;

                    this.gameplayContainer.addChild(game.items[lightIndex].sprite);

                    const lightBulb = new PIXI.Graphics();

                    const rr = 1 * 0xFF | 0;
                    const rg = 1 * 0xFF | 0;
                    const rb = 1 * 0xFF | 0;
                    const a = 0.5;

                    lightBulb.beginFill((rr << 16) + (rg << 8) + rb , a);
                    lightBulb.drawCircle(0, 0, 200);
                    lightBulb.endFill();
                    
                    const lightBulbSprite = new PIXI.Sprite(
                        this.app.renderer.generateTexture(
                            lightBulb));
                    lightBulbSprite.x = game.items[lightIndex].sprite.x + 20;
                    lightBulbSprite.y = game.items[lightIndex].sprite.y + 30;
                    lightBulbSprite.filters = [new PIXI.filters.BlurFilter(32)];
                    lightBulbSprite.blendMode = PIXI.BLEND_MODES.ADD;
                    lightBulbSprite.parentLayer = this.nightTimeDisplay;
                    lightBulbSprite.anchor.set(0.5);

                    //this.container.addChild(lightBulbSprite);

                    this.gameplayContainer.addChild(this.nightTimeDisplay);
                }
            }

            // const bunnyTexture = PIXI.Texture.from('../images/bunny.png');
            
            // //for (let i = 0; i < 40; i++) {
            //     const bunny = new PIXI.Sprite(bunnyTexture);
            
            //     const angle = Math.random() * Math.PI * 2;
            //     const speed = 200.0; // px per second
            //     bunny.vx = Math.cos(angle) * speed / 60.0;
            //     bunny.vy = Math.sin(angle) * speed / 60.0;
            //     bunny.position.set(Math.random() * 1040, Math.random() * 720 + 80);
            //     bunny.anchor.set(0.5, 0.5);
            
            //     const lightbulb = new PIXI.Graphics();
            //     const rr = 1 * 0xFF | 0;
            //     const rg = 1 * 0xFF | 0;
            //     const rb = 1 * 0xFF | 0;
            //     const rad = 50 + Math.random() * 20;
            //     lightbulb.beginFill((rr << 16) + (rg << 8) + rb, 1);
            //     lightbulb.drawCircle(400, 400, rad);
            //     lightbulb.endFill();
            //     lightbulb.filters = [new PIXI.filters.BlurFilter(32)];
            //     lightbulb.parentLayer = this.nightTimeDisplay;// <-- try comment it
            
            //     this.container.addChild(lightbulb);

            //     //this.container.addChild(createBunny());
            // //}
        }
    },

    assignMenu:function(textures)
    {
        this.menu = new PIXI.Sprite(textures["images/menu.png"]);
        this.menu.x = ((productionWidth) / 2) - (this.menu.width / 2);
        this.menu.y = ((productionHeight) / 2) - (this.menu.height / 2);

        this.menu.interactive = false;
        this.menu.visible = false;

        this.gameInterfaceContainer.addChild(this.menu);
    },

    assignPauseAnimation:function()
    {
        this.pauseAnimationLines.length = 0;

        for (let i = 0; i < 3; i++)
        {
            const line = new PIXI.Graphics();
            const width = this.app.screen.width; // Random width between 50 and 200
            const thickness = Math.random() * 20 + 4; // Thin lines, between 2 and 4

            line.beginFill(styles.pauseAnimationLineColor, 0.15); // Faint transparency (alpha = 0.15)
            line.drawRect(0, 0, width, thickness);
            line.endFill();
            line.x = 0; // Random horizontal position
            line.y = Math.random() * this.app.screen.height - 10; // Start off-screen above the canvas
            line.speed = Math.random() * 0.2 + 1; // Slow speed for faint effect
            line.blendMode = PIXI.BLEND_MODES.ADD; // Optional for soft overlapping
            
            this.pauseAnimationLines.push(line);
        }
    },

    assignAdditionalRequirements:function(textures, images)
    {
        if(game.level.additional_requirements)
        {
            for(var i=0; i < game.level.additional_requirements.length; i++)
            {
                let spriteTextures = [];
                let additional_requirement = game.level.additional_requirements[i];

                if(!this.texturesMap.has(additional_requirement.team + "_" + additional_requirement.name))
                {
                    for(var j = this.indexes.get(additional_requirement.team + "_" + additional_requirement.name).index; 
                        j < this.indexes.get(additional_requirement.team + "_" + additional_requirement.name).index +
                        this.indexes.get(additional_requirement.team + "_" + additional_requirement.name).frames;
                        j++)
                    {
                        spriteTextures.push(textures[images[j]]);    
                    } 
                    
                    this.texturesMap.set(additional_requirement.team + "_" + additional_requirement.name, spriteTextures);
                }
            }
        }
    },

    assignEmitter:function(level_emitters)
    {
        if(level_emitters)
        {
            for(var i = 0; i < level_emitters.length; i++)
            {
                emitters.add(level_emitters[i]);

                if(game.emitters[i].visionGridX)
                {
                    console.log(game.emitters[i]);
                }
            }
        }
    },

    assignShaders:function(level_shaders)
    {
        if(level_shaders)
        {
            this.gameplayContainer.filters = [];

            for(var i = 0; i < level_shaders.length; i++)
            {
                if(level_shaders[i].name)
                {
                    this.shaderFilters.set(
                        level_shaders[i].name,
                        {
                            "shader":                            
                            new PIXI.Filter(null, shaders[level_shaders[i].name + "Fragment"].get(), {
                                time: 0,
                            }),
                            "active":level_shaders[i].active
                        }
                    );
                }
            }

            for(var i = 0; i < level_shaders.length; i++)
            {
                if(level_shaders[i].active)
                {
                    triggers.blackboard.set("illusion", level_shaders[i].name)
                    this.gameplayContainer.filters.push(
                        this.shaderFilters.get(level_shaders[i].name).shader);
                }

                break;
            }
        }
    },

    toggleShader:function(shader_name, active)
    {
        if(active)
        {
            this.gameplayContainer.filters = [this.shaderFilters.get(shader_name).shader];
            triggers.blackboard.set("illusion", shader_name)
        }
        else
        {
            this.gameplayContainer.filters = [];

            if (triggers.blackboard.has("illusion") && triggers.blackboard.get("illusion") === shader_name) {
                triggers.blackboard.delete("illusion");
            }
        }
    },

    drawPauseAnimation:function()
    {
        this.pauseAnimationLines.forEach((line, index) => {
            line.y += line.speed; // Move line downward
            if (line.y > this.app.screen.height) {
                // Reset line position to the top
                line.y = Math.random() * -10 + 10;
                line.x = 0;
                line.speed = Math.random() * 0.5 + 1; // Reassign a new random speed
            }
        });
    },

    assignSidebarButtons(sidebarButtons, itemName)
    {
        let counter = 0;

        // Clear current sidebar UI
        for (let i = 0; i < game.sidebarButtons.length; i++)
        {
            game.sidebarButtons[i].sprite.interactive = false;
            game.sidebarButtons[i].sprite.visible = false;
        }

        // Remove old buttons to avoid overlap
        game.sidebarButtons = [];

        for (let i = 0; i < sidebarButtons.length; i++)
        {
            const button = sidebarButtons[i];

            if (button.type !== itemName)
                continue;

            const textures = this.buttonTexturesMap.get(button.name);
            if (!textures || textures.length === 0)
                continue;

            const sprite = PIXI.Sprite.from(textures[1]); // default state texture

            sprite.x = sidebar.originButtonPointX + sidebar.offsetX * (counter % 3);
            sprite.y = sidebar.originButtonPointY + sidebar.offsetY * Math.floor(counter / 3);

            const visible = button.visible !== false;
            sprite.interactive = visible;
            sprite.visible = visible;

            sidebar.assignButtonFunction(button.name, button.type, button.produce, sprite);

            const newButton = {
                sprite: sprite,
                name: button.name,
                produce: button.type
            };

            game.sidebarButtons.push(newButton);
            this.gameInterfaceContainer.addChild(sprite);

            counter++;
        }

        // Final safety pass for visibility
        for (let i = 0; i < sidebarButtons.length; i++)
        {
            const button = sidebarButtons[i];

            if (button.type !== itemName)
                continue;

            const visible = button.visible !== false;

            for (let j = 0; j < game.sidebarButtons.length; j++)
            {
                if (game.sidebarButtons[j].produce === itemName)
                {
                    game.sidebarButtons[j].sprite.interactive = visible;
                    game.sidebarButtons[j].sprite.visible = visible;
                }
            }

            console.log(`%c${button.type} ${itemName} ${button.visible}, i: ${i}`, 'background: #000; color: #6cbf27');
            console.log(game.sidebarButtons);
        }
    },

    assignSidebar:function(buttonImages, sidebarButtons)
    {
        if(!sidebarButtons)
            return;

        const allImagesToLoad = new Set();

        for (let i = 0; i < sidebarButtons.length; i++)
        {
            const name = sidebarButtons[i].name;
            const startIndex = this.buttonIndexes.get(name);
            const endIndex = startIndex + sidebarButtonStates;

            for (let j = startIndex; j < endIndex; j++)
            {
                const img = buttonImages[j];
                if (!img || this.resourceMasterSet.has(img))
                    continue;

                this.resourceMasterSet.add(img);
                PIXI.Assets.add(img, img);
                allImagesToLoad.add(img);
            }
        }

        if (allImagesToLoad.size > 0)
        {
            PIXI.Assets.load([...allImagesToLoad]).then((textures) => {
                for (let i = 0; i < sidebarButtons.length; i++)
                {
                    const name = sidebarButtons[i].name;
                    const startIndex = this.buttonIndexes.get(name);
                    const endIndex = startIndex + sidebarButtonStates;
                    let spriteTextures = [];

                    for (let j = startIndex; j < endIndex; j++)
                    {
                        const img = buttonImages[j];
                        if (img && textures[img])
                        {
                            spriteTextures.push(textures[img]);
                        }
                    }

                    if (spriteTextures.length > 0)
                    {
                        this.buttonTexturesMap.set(name, spriteTextures);
                    }
                }
            });
        }
    },

    assignButtons:function(textures, buttons)
    {
        if(!buttons)
            return;

        for (let i = 0; i < buttons.length; i++)
        {
            game.buttons.push({});
            game.buttons[game.buttons.length-1].sprites = [];

            Object.assign(game.buttons[i], window[buttons[i].type].list[buttons[i].name]);
            
            if(game.buttons[i].cost)
                economy.add(buttons[i].name, game.buttons[i].cost);

            for (let j = 0; j < game.buttons[i].frames; j++)
            {
                game.buttons[i].name = buttons[i].name;
                game.buttons[i].sprites.push(PIXI.Sprite.from(
                    textures["images/" + buttons[i].type + "/" + buttons[i].name + "/" + j + ".png"]));
                
                if(buttons[i].text)
                {
                    game.buttons[i].text = new PIXI.Text(buttons[i].text, {fill: 'white'});
                    game.buttons[i].text.position.set(
                        buttons[i].x - 400,
                        buttons[i].y);
                }


                game.buttons[i].sprites[game.buttons[i].sprites.length-1].x = buttons[i].x;
                game.buttons[i].sprites[game.buttons[i].sprites.length-1].y = buttons[i].y;

                game.buttons[i].sprites[game.buttons[i].sprites.length-1].visible = false;

                if(game.buttons[i].visible == j)
                {
                    game.buttons[i].sprites[game.buttons[i].sprites.length-1].visible = true;
                }
    
                if (buttons[i].action && typeof buttons[i].action === 'function')
                {
                    game.buttons[i].sprites[game.buttons[i].sprites.length-1].interactive = true;
                    game.buttons[i].sprites[game.buttons[i].sprites.length-1].on('pointerdown', buttons[i].action);
                }

                if(buttons[i].text)
                {
                    this.buttonsContainer.addChild(game.buttons[i].text);
                }

                this.buttonsContainer.addChild(game.buttons[i].sprites[game.buttons[i].sprites.length-1]);
            }
        }
        this.gameplayContainer.addChild(this.buttonsContainer); 
    },

    toggleButton:function(name)
    {
        for (let i = 0; i < game.buttons.length; i++)
        {
            if(game.buttons[i].name == name)
            {
                for (let j = 0; j < game.buttons[i].sprites.length; j++)
                {
                    if(game.buttons[i].sprites[j].visible)
                    {
                        if(j == 0)
                        {
                            game.buttons[i].sprites[0].visible = false;
                            game.buttons[i].sprites[1].visible = true;
                        }
                        else
                        {
                            game.buttons[i].sprites[1].visible = false;
                            game.buttons[i].sprites[0].visible = true;
                        }

                        return;
                    }
                }
            }
        }
    },

    assignText:function()
    {
        if(game.level.text)
        {
            for(var i = 0; i < game.level.text.length; i++)
            {
                if(game.level.text[i].name == "pay")
                {
                    economy.setPayout();

                    this.payText = new PIXI.Text("Savings: ", {fill: 'white'});
                    this.payText.text = "Savings: " + economy.cash;
                    this.payText.position.set(
                        game.level.text[i].x,
                        game.level.text[i].y
                    );

                    console.log(game.level.text[i].x,
                        game.level.text[i].y);

                    this.textContainer.addChild(this.payText);
                }
            }

            this.gameplayContainer.addChild(this.textContainer); 
        }
    },

    assignProblems:function(problems)
    {
        if(problems && problems.length > 0)
        {
            let problemText = ""
            for(var i = 0; i < problems.length; i++)
            {
                problemText = problemText + problems[i] + "\n";
            }
            this.problemText = new PIXI.Text("Problems: ", {fill: 'white'});
            this.problemText.position.set(
                100,
                800
            );
            this.problemsContainer.addChild(problemText);
            this.gameplayContainer.addChild(this.textContainer); 
        }
    },

    assignMaterials:function(textures, materials)
    {
        if(game.level.materials)
        {
            for(var i = 0; i < materials.length; i++)
            {
                if(materials[i].name == "slides")
                {
                    this.assignSlides(textures);
                }

                if(materials[i].name == "notes")
                {
                    this.assignNotes(textures);
                }

                if(materials[i].name == "textbook")
                {
                    this.assignTextbook(textures);
                }
            }
        }
    },

    assignSlides:function(textures)
    {
        for (let i = 0; i < this.slidesImages.length; i++)
        {
            game.slides.push({});
            game.slides[i].sprite = PIXI.Sprite.from(
                textures[this.slidesImages[i]]);
            game.slides[i].sprite.scale.set(0.5, 0.5);
            game.slides[i].sprite.x = 58 * game.gridSize - this.cameraOffsetX;
            game.slides[i].sprite.y = 27 * game.gridSize - this.cameraOffsetY;
            game.slides[i].sprite.visible = false;
            
            if(i == 0)
            {
                game.slides[i].sprite.visible = true;
            }

            this.slidesContainer.addChild(game.slides[i].sprite);
        }
        console.log(game.slides);
        this.gameplayContainer.addChild(this.slidesContainer); 
    },

    assignNotes:function(textures)
    {
        for (let i = 0; i < this.notesImages.length; i++)
        {
            game.notes.push({});
            game.notes[i].sprite = PIXI.Sprite.from(
                textures[this.notesImages[i]]);
            game.notes[i].sprite.scale.set(0.3, 0.3);
            game.notes[i].sprite.x = 238 * game.gridSize - this.cameraOffsetX;
            game.notes[i].sprite.y = 148 * game.gridSize - this.cameraOffsetY;
            game.notes[i].sprite.visible = false;
            
            if(i == 0)
            {
                game.notes[i].sprite.visible = true;
            }

            this.notesContainer.addChild(game.notes[i].sprite);
        }
        console.log(game.notes);
        this.gameplayContainer.addChild(this.notesContainer); 
    },

    assignTextbook:function(textures)
    {
        for (let i = 0; i < this.textbookImages.length; i++)
        {
            game.textbook.push({});
            game.textbook[i].sprite = PIXI.Sprite.from(
                textures[this.textbookImages[i]]);
            game.textbook[i].sprite.scale.set(0.5, 0.5);
            game.textbook[i].sprite.x = 220 * game.gridSize - this.cameraOffsetX;
            game.textbook[i].sprite.y = 55 * game.gridSize - this.cameraOffsetY;

            this.textbookContainer.addChild(game.textbook[i].sprite);

            if(!this.closeTextbookSprite)
            {
                const closeTextureName = display.close.getFileName();
                const closeTexture = textures?.[closeTextureName] || PIXI.Texture.from(closeTextureName);
    
                this.closeTextbookSprite = new PIXI.Sprite(closeTexture);
                this.closeTextbookSprite.visible = true;
                this.closeTextbookSprite.x = 1340;
                this.closeTextbookSprite.y = 140;
                this.closeTextbookSprite.interactive = true;
                this.closeTextbookSprite.on('pointerdown', () => {
                    this.hideTextbook();
                });

                this.textbookContainer.addChild(this.closeTextbookSprite);
            }
        }
        this.textbookContainer.visible = false;
        this.gameplayContainer.addChild(this.textbookContainer); 
    },

    assignProps:function(textures, props)
    {
        if(props)
        {
            for (let i = 0; i < props.length; i++)
            {
                game.props.push({});
                game.props[i].sprite = PIXI.Sprite.from(
                    textures[this.propsImages[i]]);
                game.props[i].sprite.scale.set(1, 1);
                game.props[i].sprite.x = props[i].x * game.gridSize - this.cameraOffsetX;
                game.props[i].sprite.y = props[i].y * game.gridSize - this.cameraOffsetY;
                game.props[i].sprite.visible = true;
    
                console.log(props.name + ", " + props[i].x + " " + props[i].y);
    
                this.propsContainer.addChild(game.props[i].sprite);
            }
    
            this.gameplayContainer.addChild(this.propsContainer);
        }
    },

    setPayText:function()
    {

    },

    assignCharacters:function(textures, images)
    {
        if(game.level.characters)
        {
            this.removeCharacters();
            
            for(var i = 0; i < game.level.characters.length; i++)
            {
                game.characters.push({});

                if(!this.texturesMap.has(game.level.characters[i].name))
                {
                    let spriteTextures = [];

                    for(var j = this.indexes.get(game.level.characters[i].name).index; 
                        j < this.indexes.get(game.level.characters[i].name).index +
                        this.indexes.get(game.level.characters[i].name).frames;
                        j++)
                    {
                        spriteTextures.push(textures[images[j]]);    
                    }
    
                    if(spriteTextures.length > 0)
                        this.texturesMap.set(game.level.characters[i].name, spriteTextures);
                }

                game.characters[i].name = game.level.characters[i].name;
                game.characters[i].sprite = PIXI.Sprite.from(
                    this.texturesMap.get(game.level.characters[i].name)[0]);
                game.characters[i].sprite.x = productionWidth - 140;
                game.characters[i].sprite.y = 78 + display.maininterface.mapImageYOffset;
                game.characters[i].sprite.visible = false;

                console.log(game.characters[i].sprite);

                this.characterContainer.addChild(game.characters[i].sprite);   
            }
        }
    },

    addToContainer:function(item, container)
    {
        container.addChild(item.lifeBarSprite);
        container.addChild(item.lifeBarBorderSprite);
        container.addChild(item.selectionSprite);
        container.addChild(item.selectionBorderSprite);
        container.addChild(item.sprite);
        container.addChild(item.bodyCollision);
        container.addChild(item.rightCollision);
        container.addChild(item.leftCollision);
        container.addChild(item.skinCollision);
        container.addChild(item.headLeftCollision);
        container.addChild(item.headRightCollision);
        container.addChild(item.visionCollision);
        container.addChild(item.bumperCollision);
        container.addChild(item.nearCollision);
        container.addChild(item.collisionBubble);
        container.addChild(item.pathLine);
        container.addChild(item.endLine);
    },

    toggleAnimation:function()
    {

    },

    toggleDebugMarkers:function()
    {
        console.log("toggleDebugMarkers");
        console.log(nav.markers.length);
        this.markersVisibility = !this.markersVisibility;

        while(this.markers.length > 0)
        {
            this.markersContainer.removeChild(this.markers[0]);
            this.markers.splice(0, 1);
        }

        for (var i = 0; i < nav.markers.length; i++)
        {
            for (var j = 0; j < nav.markers[i].length; j++)
            {
                if(nav.markers[i][j] == undefined)
                    continue;

                this.markers.push(new PIXI.Graphics());

                if(nav.markers[i][j].locked == flags.LAYER_UNLOCKED)
                {
                    this.markers[this.markers.length-1].beginFill(0x009B6E);
                    this.markers[this.markers.length-1].lineStyle(1, 0x00FF00);

                }
                else if(nav.markers[i][j].locked == flags.LAYER_SUBMERGE_LOCKED)
                {
                    this.markers[this.markers.length-1].beginFill(0x9B6E00);
                    this.markers[this.markers.length-1].lineStyle(1, 0xFF0000);
                }
                else if(nav.markers[i][j].locked == flags.LAYER_SURFACE_LOCKED)
                {
                    this.markers[this.markers.length-1].beginFill(0x9B006E);
                    this.markers[this.markers.length-1].lineStyle(1, 0xFF0000);
                }

                this.markers[this.markers.length-1].drawRect(
                    nav.markers[i][j].x * game.gridSize - game.offsetX,
                    nav.markers[i][j].y * game.gridSize + display.maininterface.mapImageYOffset - game.offsetY,
                    2,
                    2);

                this.markers[this.markers.length-1].alpha = 0.8;

                this.markers[this.markers.length-1].visible = this.markersVisibility;

                this.markersContainer.addChild(this.markers[this.markers.length-1]);
            }
        }

        this.container.addChild(this.markersContainer);
    },

    toggleDebugWaypoints:function()
    {
        console.log("toggleDebugWaypoints");
        console.log(nav.wayPoints.length);
        this.wayPointsVisibility = !this.wayPointsVisibility;

        while(this.wayPoints.length > 0)
        {
            this.wayPointsContainer.removeChild(this.wayPoints[0]);
            this.wayPoints.splice(0, 1);
        }

        let numberOfWayPoints = 0;

        for (var i = 0; i < nav.wayPoints.length; i++)
        {
            for (var j = 0; j < nav.wayPoints[i].length; j++)
            {
                if(nav.wayPoints[i][j] == undefined)
                    continue;

                this.wayPoints.push(new PIXI.Graphics());

                if(nav.wayPoints[i][j].locked == flags.LAYER_UNLOCKED)
                {
                    this.wayPoints[this.wayPoints.length-1].beginFill(0x009B6E);
                    this.wayPoints[this.wayPoints.length-1].lineStyle(1, 0x00FF00);
                }
                else if(nav.wayPoints[i][j].locked == flags.LAYER_SUBMERGE_LOCKED)
                {
                    this.wayPoints[this.wayPoints.length-1].beginFill(0x9B6E00);
                    this.wayPoints[this.wayPoints.length-1].lineStyle(1, 0xFF0000);
                }
                else if(nav.wayPoints[i][j].locked == flags.LAYER_SURFACE_LOCKED)
                {
                    this.wayPoints[this.wayPoints.length-1].beginFill(0x9B006E);
                    this.wayPoints[this.wayPoints.length-1].lineStyle(1, 0xFF0000);
                }

                numberOfWayPoints++;

                this.wayPoints[this.wayPoints.length-1].drawRect(
                    (j+1) * 5 * game.gridSize - game.offsetX,
                    (i+1) * 5 * game.gridSize + display.maininterface.mapImageYOffset - game.offsetY,
                    //nav.wayPoints[i][j].x * game.gridSize - game.offsetX,
                    //nav.wayPoints[i][j].y * game.gridSize + display.maininterface.mapImageYOffset - game.offsetY,
                    2,
                    2);

                this.wayPoints[this.wayPoints.length-1].alpha = 0.8;

                this.wayPoints[this.wayPoints.length-1].visible = this.wayPointsVisibility;

                this.wayPointsContainer.addChild(this.wayPoints[this.wayPoints.length-1]);
            }
        }
        
        console.log("Number of Waypoints: ", numberOfWayPoints);
        this.container.addChild(this.wayPointsContainer);
    },

    toggleItemCells:function()
    {
        this.debugShowCells = null;
        this.debugContainer.removeChildren();
        this.container.removeChild(this.debugContainer);

        this.debugContainer.visible = !this.debugContainer.visible;

        //alert(this.debugContainer.visible)

        for(var i = 0; i < game.items.length; i++)
        {
            if(game.items[i] && game.items[i].pathLine)
            {
                game.items[i].pathLine.visible = this.debugContainer.visible;
                game.items[i].endLine.visible = this.debugContainer.visible;
                //console.log(game.items[i].pathLine.visible);
            }
        }

        if(!this.debugContainer.visible)
            return;

        if(this.debugShowCells == null)
            this.debugShowCells = [];

        for (var y=0; y < game.level.mapGridHeight; y++)
		{
			for (var x=0; x< game.level.mapGridWidth; x++)
			{
                if(game.currentTerrainMapPassableGrid[y][x] != flags.CELL_COLLISION_MODE_OFF)
                {   
                    if(game.currentTerrainMapPassableGrid[y][x] == flags.CELL_COLLISION_MODE_HARD)
                    {
                        this.debugShowCells.push(new PIXI.Graphics());

                        this.debugShowCells[this.debugShowCells.length-1].beginFill(0x629F00);
                        this.debugShowCells[this.debugShowCells.length-1].lineStyle(1, 0xFF0000);

                        this.debugShowCells[this.debugShowCells.length-1].drawRect(
                            x * game.gridSize - game.offsetX,
                            y * game.gridSize + display.maininterface.mapImageYOffset - game.offsetY,
                            game.gridSize,
                            game.gridSize);
                        this.debugShowCells[this.debugShowCells.length-1].alpha = 0.8;
    
                        this.debugShowCells[this.debugShowCells.length-1].visible = true;
                        this.debugContainer.addChild(this.debugShowCells[this.debugShowCells.length-1]);
                    }
                    else if(game.currentTerrainMapPassableGrid[y][x] == flags.CELL_COLLISION_MODE_MEDIUM)
                    {
                        this.debugShowCells.push(new PIXI.Graphics());

                        this.debugShowCells[this.debugShowCells.length-1].beginFill(0x9F6200);
                        this.debugShowCells[this.debugShowCells.length-1].lineStyle(1, 0xFF0000);

                        this.debugShowCells[this.debugShowCells.length-1].drawRect(
                            x * game.gridSize - game.offsetX,
                            y * game.gridSize + display.maininterface.mapImageYOffset - game.offsetY,
                            game.gridSize,
                            game.gridSize);
                        this.debugShowCells[this.debugShowCells.length-1].alpha = 0.8;
    
                        this.debugShowCells[this.debugShowCells.length-1].visible = true;
                        this.debugContainer.addChild(this.debugShowCells[this.debugShowCells.length-1]);
                    }
                    else if(game.currentTerrainMapPassableGrid[y][x] == flags.CELL_COLLISION_MODE_SOFT)
                    {
                        this.debugShowCells.push(new PIXI.Graphics());

                        this.debugShowCells[this.debugShowCells.length-1].beginFill(0x00629F);
                        this.debugShowCells[this.debugShowCells.length-1].lineStyle(1, 0xFF0000);

                        this.debugShowCells[this.debugShowCells.length-1].drawRect(
                            x * game.gridSize - game.offsetX,
                            y * game.gridSize + display.maininterface.mapImageYOffset - game.offsetY,
                            game.gridSize,
                            game.gridSize);
                        this.debugShowCells[this.debugShowCells.length-1].alpha = 0.8;
    
                        this.debugShowCells[this.debugShowCells.length-1].visible = true;
                        this.debugContainer.addChild(this.debugShowCells[this.debugShowCells.length-1]);
                    }                   
                }
			}
        }

        this.container.addChild(this.debugContainer);        
    },

    toggleDebugGrid:function()
    {
        this.debugShowGrid = null;
        this.debugContainer.removeChildren();
        this.container.removeChild(this.debugContainer);

        this.debugContainer.visible = !this.debugContainer.visible;

        if(!this.debugContainer.visible)
            return;

        if(this.debugShowGrid == null)
            this.debugShowGrid = [];

        this.debugTerrainCount = 0;
        this.debugShowGrid.length = 0;

        for (var y=0; y < game.level.mapGridHeight; y++)
		{
			for (var x=0; x< game.level.mapGridWidth; x++)
			{                   
                if(game.currentTerrainMapPassableGrid[y][x] == flags.CELL_COLLISION_MODE_FULL)
                {
                    if(this.debugTerrainCount < game.level.mapGridHeight * game.level.mapGridWidth)
                        this.debugShowGrid.push(new PIXI.Graphics());

                    this.debugShowGrid[this.debugShowGrid.length-1].beginFill(0x9F119F);
                    this.debugShowGrid[this.debugShowGrid.length-1].lineStyle(1, 0xFF0000);

                    this.debugShowGrid[this.debugShowGrid.length-1].drawRect(
                        x * game.gridSize - game.offsetX,
                        y * game.gridSize + display.maininterface.mapImageYOffset - game.offsetY,
                        game.gridSize,
                        game.gridSize);

                    this.debugShowGrid[this.debugShowGrid.length-1].alpha = 0.8;

                    this.debugShowGrid[this.debugShowGrid.length-1].visible = true;
                    this.debugContainer.addChild(this.debugShowGrid[this.debugShowGrid.length-1]);

                    this.debugTerrainCount++;
                }                                     
			}
        }

        this.container.addChild(this.debugContainer);        
    },

    toggleDebugIsleGrid:function()
    {
        this.debugShowGrid = null;
        this.debugContainer.removeChildren();
        this.container.removeChild(this.debugContainer);

        this.debugContainer.visible = !this.debugContainer.visible;

        if(!this.debugContainer.visible)
            return;

        if(this.debugShowGrid == null)
            this.debugShowGrid = [];

        for (var y=0; y < game.level.mapGridHeight; y++)
		{
			for (var x=0; x< game.level.mapGridWidth; x++)
			{                   
                if(game.currentIsleMapPassableGrid[y][x] == 100/*flags.CELL_COLLISION_MODE_FULL*/)
                {
                    if(this.debugIsleCount < game.level.mapGridHeight * game.level.mapGridWidth)
                        this.debugShowGrid.push(new PIXI.Graphics());

                    this.debugShowGrid[this.debugShowGrid.length-1].beginFill(0x119F9F);
                    this.debugShowGrid[this.debugShowGrid.length-1].lineStyle(1, 0xFFFF00);

                    this.debugShowGrid[this.debugShowGrid.length-1].drawRect(
                        x * game.gridSize - game.offsetX,
                        y * game.gridSize + display.maininterface.mapImageYOffset - game.offsetY,
                        game.gridSize,
                        game.gridSize);

                    this.debugShowGrid[this.debugShowGrid.length-1].alpha = 0.8;

                    this.debugShowGrid[this.debugShowGrid.length-1].visible = true;
                    this.debugContainer.addChild(this.debugShowGrid[this.debugShowGrid.length-1]);
                    this.debugIsleCount++;
                }                                     
			}
        }

        this.container.addChild(this.debugContainer);        
    },

    toggleDebugLookupGrid:function()
    {
        console.log(game.currentMapLookupTable)
        this.debugShowGrid = null;
        this.debugContainer.removeChildren();
        this.container.removeChild(this.debugContainer);

        this.debugContainer.visible = !this.debugContainer.visible;

        if(!this.debugContainer.visible)
            return;

        this.debugShowGrid = [];
        this.debugLookupCount = 0;

        for (var y=0; y < game.level.mapGridHeight; y++)
        {
            for (var x=0; x< game.level.mapGridWidth; x++)
            {
                if(this.debugLookupCount < game.level.mapGridHeight * game.level.mapGridWidth)
                    this.debugShowGrid.push(new PIXI.Graphics());

                if(game.mapTable[game.currentTerrainMapLookupTable[y][x]] == "grass")
                    this.debugShowGrid[this.debugShowGrid.length-1].beginFill(0x00FF00);
                if(game.mapTable[game.currentTerrainMapLookupTable[y][x]] == "snow")
                    this.debugShowGrid[this.debugShowGrid.length-1].beginFill(0xFFFFFF);
                if(game.mapTable[game.currentTerrainMapLookupTable[y][x]] == "sea")
                    this.debugShowGrid[this.debugShowGrid.length-1].beginFill(0x0000FF);

                this.debugShowGrid[this.debugShowGrid.length-1].lineStyle(1, 0x000000);

                this.debugShowGrid[this.debugShowGrid.length-1].drawRect(
                    x * game.gridSize - game.offsetX,
                    y * game.gridSize + display.maininterface.mapImageYOffset - game.offsetY,
                    game.gridSize,
                    game.gridSize);

                this.debugShowGrid[this.debugShowGrid.length-1].alpha = 0.8;

                this.debugShowGrid[this.debugShowGrid.length-1].visible = true;
                this.debugContainer.addChild(this.debugShowGrid[this.debugShowGrid.length-1]);
                this.debugLookupCount++;
            }
        }

        this.container.addChild(this.debugContainer);
    },

    initFPSMeasurements:function()
    {
        this.fpsText.position.set(20, 120);
        this.numberOfSelectedText.position.set(20, 160);
        this.passByCountText.position.set(20, 200);
        this.debugMsPassByText.position.set(20, 240);
        this.multiTypeText.position.set(20, 280);
    },

    initMouseMeasurements:function()
    {
        this.debugMouseX.position.set(20, 120);
        this.debugMouseY.position.set(20, 180);
        this.debugMouseDetails.position.set(20, 240);
        this.debugOffsetX.position.set(20, 300);
        this.debugOffsetY.position.set(20, 360);
    },

    initPathLength:function()
    {
        this.debugPathLength.position.set(20, 120);
    },

    toggleMeasurements:function()
    {
        this.fpsText.visible = !this.fpsText.visible;
        this.fpsRatio.visible = !this.fpsRatio.visible;
        this.pathCounterText.visible = !this.pathCounterText.visible;
        this.pathLengthText.visible = !this.pathLengthText.visible;
        this.numberOfSelectedText.visible = !this.numberOfSelectedText.visible;
        this.passByCountText.visible = !this.passByCountText.visible;
        this.debugMsPassByText.visible = !this.debugMsPassByText.visible;
        this.DeltaTimeText.visible = !this.DeltaTimeText.visible;
    },

    measureFPS:function()
    {
        this.fps.unshift(this.app.ticker.FPS);

        if (this.fps.length > this.app.ticker.maxFPS * 5) 
            this.fps.length = this.app.ticker.maxFPS * 5;

        //this.fpsText.text = "FPS Counter: " + (this.fps.reduce((a,b) => a + b, 0) / this.fps.length).toFixed(0);
        this.fpsText.text = "game.offsetYIndex: " + game.offsetYIndex;
    },

    updatePathCounter:function(pathCounter)
    {
        this.pathCounterText.text = "Path Counter (Adjusted): " + pathCounter;
    },

    updatePathLength:function(pathLength)
    {
        this.pathLengthText.text = "Path Length / 2 (Rounded down): " + pathLength;
    },

    updateNumberOfSelected:function(numberOfSelected)
    {
        this.numberOfSelectedText.text = "Number of Selected: " + numberOfSelected;
    },

    updatePassByCount:function(passByCount)
    {
        this.passByCountText.text = "Pass By Count: " + passByCount;
    },

    updatePassByMsCount:function(passByMsCount)
    {
        this.debugMsPassByText.text = "Pass By (Ms): " + passByMsCount;
    },

    enableIntroButtons:function()
    {
        this.startText.interactive = true;
    },

    disableIntroButtons:function()
    {
        this.startText.interactive = false;
    },

    enableTeamSelectionButtons:function()
    {
        this.technologySelectionHover.interactive = true;
        this.socialEarthSelectionHover.interactive = true;
    },

    disableTeamSelectiongButtons:function()
    {
        this.technologySelectionHover.interactive = false;
        this.socialEarthSelectionHover.interactive = false;
    },

    enableBriefingButtons:function()
    {
        this.missionbriefingEnter.interactive = true;
        this.missionbriefingExit.interactive = true;
        this.missionbriefingEnterHover.interactive = true;
        this.missionbriefingExitHover.interactive = true;
    },

    disableBriefingButtons:function()
    {
        this.missionbriefingEnter.interactive = false;
        this.missionbriefingExit.interactive = false;
    },

    updateGameTextList:function(id, games)
    {
        if(games.length > 0)
        {
            console.log(games);

            if(this.gameTextList.length == 0)
            {
                for(var i=0; i < games.length; i++)
                {
                    this.gameTextList.push(
                        new PIXI.Text(games[i],multiplayerGameSelectedStyle));
                    
                    this.gameTextList[i].x = 181;            
                    this.gameTextList[i].y = 118 + (i * 30);
                }

                for(var i=0; i < 15; i++)
                {
                    this.gameTextList[i].interactive = true;
                    this.gameTextList[i].selected = false;
                }

                for(var i=16; i < games.length; i++)
                {
                    this.gameTextList[i].visible = false;
                }

                this.activateGames();

                if(renderer.lobbyScreenLoaded)
                {
                    for(var i=0; i < this.gameTextList.length; i++)
                    {
                        this.lobbyContainer.addChild(this.gameTextList[i]);
                    }
                }

                console.log(renderer.lobbyScreenLoaded);
            }
            else
            {
                for(var i=0; i < this.gameTextList.length; i++)
                {
                    this.gameTextList[i].text = games[i];

                    if(this.gameTextList[i].text != "Game " + (i+1) + " Open.")
                    {
                        console.log("Green highlight");
                        
                        this.lobbyGameSelected = this.gameTextList[i].text;
                        this.lobbyGameSelectedId = i;
                        this.gameTextList[i].style = multiplayerGameSelectedReadyHighlightStyle;
                    }
                }                    
            }
        }
        else
        {
            console.log("No games from the server...");            
        }       
    },

    removeGameList:function()
    {
        for(var i=0; i < this.gameTextList.length; i++)
        {
            this.gameTextList[i].interactive = false;
            this.lobbyContainer.removeChild(this.gameTextList[i]);
        }            

        this.gameTextList.splice(0, this.gameTextList.length);
    },

    getLobbySelectedGameId:function()
    {
        for(var i=0; i < this.gameTextList.length; i++)
        {
            if(this.gameTextList[i].text != "Game " + i + " Open.")
            {
                return i;
            }
        }

        return -1;
    },

    constructItem:function(uids, itemDetails, pay=true)
    {
        itemDetails.x = itemDetails.x + itemDetails.deployX;
        itemDetails.y = itemDetails.y + itemDetails.deployY;
        
        if(itemDetails.y < 0)
        {
            itemDetails.y = 0;
        }

        this.addItem(uids, itemDetails, pay, 0, display.maininterface.mapImageYGridOffset);
    },
    
    addItem:function(uids, itemDetails, pay=true, offsetY = display.maininterface.mapImageYOffset, gridOffsetY = 0)
    {
        // if(!game.inGame)
        // {
        //     return;
        // }

        // if(!this.texturesMap.has(itemDetails.team + "_" + itemDetails.name))
        // {
        //     console.log("%cCan not add item, check for additional_requirements",
		// 				'background: #000; color: #FF69B4');
        //     return;
        // }
        
        var item = {};

        console.log("itemDetails");

        console.log(itemDetails);

        //$.extend(item,window[itemDetails.type].list[itemDetails.name]);
        //$.extend(item,window[itemDetails.type].defaults);
        Object.assign(item, window[itemDetails.type].list[itemDetails.name]);
        Object.assign(item, window[itemDetails.type].defaults);

        item.uid = this.itemUID++;
        item.type = itemDetails.type;
        item.name = itemDetails.name;
        item.team = itemDetails.team;
        item.x = itemDetails.x; 
        item.y = itemDetails.y - gridOffsetY;
        item.deployUid = itemDetails.deployUid ? itemDetails.deployUid : 0
        item.originX = item.x;
        item.originY = item.y;
        item.direction = itemDetails.direction ? itemDetails.direction : 0;   
        item.correctDirection = 0;  

        console.log(item.x + " " + item.y);
        
        lookup.lastAddedItem = item.uid;
        lookup.lastAddedItemName = item.name;

        if(pay && item.cost)
            game.buy(item.cost, item.team);       
        
        item.orders = {};

        if(itemDetails.order)
        {
            item.orders.type = itemDetails.order.type;

            item.orders.to = {};

            if(itemDetails.order.toX)
            {
                item.orders.to.x = itemDetails.order.toX * game.gridSize; // Convert x to graphics
                item.orders.to.y = itemDetails.order.toY * game.gridSize; // Convert y to graphics

                item.orders.to.x = item.orders.to.x - game.offsetX; // Subtract scroll map x from item's order's to x
                item.orders.to.y = item.orders.to.y - game.offsetY; // Subtract scroll map y from item's order's to y

                item.orders.to.x = item.orders.to.x * productionRatio; // Scale item's order's to x
                item.orders.to.y = item.orders.to.y * productionRatio; // Scale item's order's to y

                item.orders.to.y = item.orders.to.y + (offsetY * productionRatio);
            }

            if(itemDetails.speed)
                item.speed = itemDetails.speed;

            if(itemDetails.order.toAirportUid)
            {
                item.orders.to.airportUid = itemDetails.order.toAirportUid;
                item.orders.to.uid = itemDetails.order.toAirportUid;
            }
        }
        else
        {
            item.orders.type = "stand";
        }

        // if(itemDetails.type == "ships")
        //     alert("4978 orders.to.y: " + item.orders.to.y)

        item.state = {
            searching:false,
            attacking:false,
            firing:false,
            retreating:false,
            capturing:false,
            extracting:false,            
            detouring:false,
            flying:false,
            takingOff:true,
            approaching:false
        };
        
        item.life = item.totalLife;

        item.isAlive = true;
        item.hasCollided = false;

        if(item.hitPoints)
            item.life = item.hitPoints;
        else
            item.life = item.totalLife;

        if(item.animation)
            item.animation = false;

        // if(!item.deployUid)
        //     item.deployUid = uids;

        if(!item.hangerPosition)
        {
            item.currentHangerPosition = itemDetails.hangerPosition;
        }

        if(item.hangerPositions)
        {
            for(var i = 0; i < item.hangerPositions.length; i++)
            {
                item.hangerPositions[i].uid = undefined
            }
        }

        // if(item.visionGridX)
        //     this.setVisionGrid(item);

        console.log(item);

        /**
         * Cannot read properties of undefined (reading '0')
         * 
         * Check if the item is added to additional requirements
         */
        
        if(itemDetails.direction)
            item.sprite = new PIXI.Sprite(this.texturesMap.get(itemDetails.team + "_" + itemDetails.name)[itemDetails.direction]);
        else
            item.sprite = new PIXI.Sprite(this.texturesMap.get(itemDetails.team + "_" + itemDetails.name)[0]);      
        
        item.sprite.x = itemDetails.x * game.gridSize - game.offsetX;
        item.sprite.y = itemDetails.y * game.gridSize - game.offsetY + offsetY;

        if(item.createPolygon)
            item.createPolygon();

        item.sprite.anchor.set(0.5);
            
        var selectionGraphic = new PIXI.Graphics();

        selectionGraphic.
            beginFill(styles.selectionFillColor).
            drawCircle(0,0,item.selectionRadius).
            endFill();

        selectionGraphic.alpha = 0.2;

        item.selectionSprite = new PIXI.Sprite(
            this.app.renderer.generateTexture(selectionGraphic));

        item.selectionSprite.visible = false;
        item.selectionSprite.anchor.set(0.5);

        var selectionBorder = new PIXI.Graphics();
        selectionBorder.lineStyle(1, styles.selectionBorderColor, 1);

        if(item.selectionBorderShape == "rectangle")
        {
            selectionBorder.drawRect(0, 0, 100, 100);
        }
        else if(item.selectionBorderShape == "circle")
        {
            selectionBorder.arc(0, 0, item.radius, 0, Math.PI * 2);	
        }
                    
        selectionBorder.alpha = 0.5;

        item.selectionBorderSprite = new PIXI.Sprite(
            this.app.renderer.generateTexture(
                selectionBorder));

        item.selectionBorderSprite.anchor.set(0.5);

        item.selectionBorderSprite.visible = false;

        var lifeBar = new PIXI.Graphics();

        lifeBar.beginFill(styles.lifeBarHealthyFillColor);	
        lifeBar.drawRect(0, 0, 100, 100);
        lifeBar.endFill();

        item.lifeBarSprite = new PIXI.Sprite(
            this.app.renderer.generateTexture(
                lifeBar));

        item.lifeBarSprite.anchor.set(0.5);

        item.lifeBarSprite.visible = false;

        var lifeBarBorder = new PIXI.Graphics();
        
        lifeBarBorder.lineStyle(1, 0x000000, 1);
        lifeBarBorder.drawRect(
            0, 0,
            item.pixelWidth * item.life / item.hitPoints, 4);

        item.lifeBarBorderSprite = new PIXI.Sprite(
            this.app.renderer.generateTexture(
                lifeBarBorder));

        item.pathLine = new PIXI.Graphics();
        this.playerContainer.addChild(item.pathLine);
        item.pathLine.visible = false;

        item.pathCNCLine = new PIXI.Graphics();
        this.cncContrainer.addChild(item.pathCNCLine);            
        item.pathCNCLine.visible = false;

        item.endLine = new PIXI.Graphics();
        this.playerContainer.addChild(item.endLine);
        item.endLine.visible = false;

        item.lifeBarBorderSprite.anchor.set(0.5);
        item.lifeBarBorderSprite.visible = false;
        item.bodyCollision = new PIXI.Graphics();
        item.rightCollision = new PIXI.Graphics();
        item.leftCollision = new PIXI.Graphics();
        item.skinCollision = new PIXI.Graphics();
        item.headLeftCollision = new PIXI.Graphics();
        item.headRightCollision = new PIXI.Graphics();
        item.visionCollision = new PIXI.Graphics();
        item.bumperCollision = new PIXI.Graphics();
        item.nearCollision = new PIXI.Graphics();
        item.collisionBubble = new PIXI.Graphics();

        if(item.team == game.team)
        {
            if(item.layer && item.layer == "surface")
                this.addToContainer(item, this.surfaceItemsContainer);
            else if(item.layer && item.layer == "air")
                this.addToContainer(item, this.airItemsContainer);
            else if(item.layer && item.layer == "submerge")
                this.addToContainer(item, this.submergedItemsContainer);
            else
                this.addToContainer(item, this.playerContainer);
        }
        else
        {
            if(item.layer && item.layer == "surface")
                this.addToContainer(item, this.surfaceItemsContainer);
            else if(item.layer && item.layer == "air")
                this.addToContainer(item, this.airItemsContainer);
            else if(item.layer && item.layer == "submerge")
                this.addToContainer(item, this.submergedItemsContainer);
            else
                this.addToContainer(item, this.otherContainer);
        }  

        item.outputTest();

        console.log("added item");
        physics.skipQuadTreeUpdate = false;
        console.log(item);
        
        if(item.push)
            item.push(item);
        else
            game.items.push(item);

        lookup.add(item.uid, game.items.length-1);
        
        if(uids && itemDetails.type == "infantry")
        {
            if(game.primaryBarrack)
            {
                for(var i = 0; i < game.primaryBarrack.deployPosition.length; i++)
                {
                    if(game.primaryBarrack.deployPosition[i].uid == undefined)
                    {
                        game.primaryBarrack.deployPosition[i].uid = lookup.lastAddedItem;
                        break;
                    }
                }
            }
        }
        else if(uids && itemDetails.type == "vehicles")
        {
            if(game.primaryFactory)
            {
                for(var i = 0; i < game.primaryFactory.deployPosition.length; i++)
                {
                    if(game.primaryFactory.deployPosition[i].uid == undefined)
                    {
                        game.primaryFactory.deployPosition[i].uid = lookup.lastAddedItem;
                        break;
                    }
                }
            }
        }

        if(item.init)
            item.init();

        console.log(item.orders);

        // if(itemDetails.type == "ships")
        //     alert("4978 orders.to.y: " + item.orders.to.y)
    },

    setOrder:function(item, itemDetails)
    {
        if(itemDetails.order)
        {
            item.orders.type = itemDetails.order.type;

            item.orders.to = {};

            if(itemDetails.order.toX)
            {
                item.orders.to.x = itemDetails.order.toX * game.gridSize; // Convert x to graphics
                item.orders.to.y = itemDetails.order.toY * game.gridSize; // Convert y to graphics

                item.orders.to.x = item.orders.to.x - game.offsetX; // Subtract scroll map x from item's order's to x
                item.orders.to.y = item.orders.to.y - game.offsetY; // Subtract scroll map y from item's order's to y

                item.orders.to.x = item.orders.to.x * productionRatio; // Scale item's order's to x
                item.orders.to.y = item.orders.to.y * productionRatio; // Scale item's order's to y
            }

            if(itemDetails.speed)
                item.speed = itemDetails.speed;

            if(itemDetails.order.toAirportUid)
            {
                item.orders.to.airportUid = itemDetails.order.toAirportUid;
                item.orders.to.uid = itemDetails.order.toAirportUid;
            }
        }
        else
        {
            item.orders.type = "stand";
        }
    },

    setInGameSprite:function(item)
    {
        switch(item.drawInGameSprite.type)
        {
            case "circle":
                item.graphic.lineStyle(item.drawInGameSprite.outlineThickness, item.drawInGameSprite.outlineColor, 1); // Outline settings
                item.graphic.beginFill(item.drawInGameSprite.colorFill); // Yellow color

                // Draw the circle
                item.graphic.drawCircle(0, 0, item.drawInGameSprite.radius);

                item.graphic.endFill();

                if(item.drawInGameSprite.filters)
                {
                    const appliedFilters = [];

                    for (let i = 0; i < item.drawInGameSprite.filters.length; i++)
                    {
                        const filterData = item.drawInGameSprite.filters[i];
                
                        if (filterData.name === "GlowFilter") {
                            const glowFilter = new PIXI.filters.GlowFilter({
                                color: filterData.color || 0xFFFF77,  // Default to yellowish-white glow
                                distance: filterData.distance || 15,
                                outerStrength: filterData.outerStrength || 20,
                                innerStrength: filterData.innerStrength || 0,
                                quality: filterData.quality || 0.5
                            });
                
                            appliedFilters.push(glowFilter);
                        }
                    }
                
                    if (appliedFilters.length > 0)
                    {
                        item.graphic.filters = appliedFilters; // Apply all filters at once
                    }
                }

                const padding = 20; // Extra space for glow
                const renderTexture = PIXI.RenderTexture.create({ 
                    width: (item.radius + padding) * 2, 
                    height: (item.radius + padding) * 2 
                });

                item.graphic.position.set((item.radius + padding), (item.radius + padding));

                this.app.renderer.render(item.graphic, { renderTexture });

                // Create sprite from texture
                item.sprite = new PIXI.Sprite(renderTexture);
                //circleSprite.position.set(x - (radius + padding), y - (radius + padding)); // Reposition correctly

                //this.emittersContainer.addChild(circleSprite);

                //item.sprite = new PIXI.Sprite(this.app.renderer.generateTexture(item.graphic));
                break;
        }
    },

    updateGlowFilterColor:function(item, color)
    {
        item.sprite.filters[1].color = color;
    },

    addEmitter:function(item)
    {
        emitters.add(item.emitter);

        game.emitters[game.emitters.length-1].particles.updateOwnerPos(
            item.x * game.gridSize - renderer.cameraOffsetX,
            item.y * game.gridSize - renderer.cameraOffsetY + display.maininterface.mapImageYOffset
        );
    },

    removeItem:function(item, dead = true)
    {    
        if(item.team == game.team)
        {
            if(item.layer && item.layer == "surface")
                this.removeFromContainer(item, this.surfaceItemsContainer);
            else if(item.layer && item.layer == "air")
                this.removeFromContainer(item, this.airItemsContainer);
            else if(item.layer && item.layer == "submerge")
                this.removeFromContainer(item, this.submergedItemsContainer);
            else
                this.removeFromContainer(item, this.playerContainer);

            this.gameInterfaceContainer.removeChild(item.miniMapMarker);
        }
        else
        {
            if(item.layer && item.layer == "surface")
                this.removeFromContainer(item, this.surfaceItemsContainer);
            else if(item.layer && item.layer == "air")
                this.removeFromContainer(item, this.airItemsContainer);
            else if(item.layer && item.layer == "submerge")
                this.removeFromContainer(item, this.submergedItemsContainer);
            else
                this.removeFromContainer(item, this.otherContainer);

            this.gameInterfaceContainer.removeChild(item.miniMapMarker);
        }

        var deletedIndex = lookup.get(item.uid);

        if(dead)
        {
            game.deathRegistery.add(item.uid);
        }

        game.items[deletedIndex] = undefined;
    },

    removeFromContainer(item, container)
    {
        container.removeChild(item.sprite);
        container.removeChild(item.lifeBarSprite);
        container.removeChild(item.lifeBarBorderSprite);
        container.removeChild(item.selectionSprite);
        container.removeChild(item.selectionBorderSprite);
    },

    deleteItem:function(item)
    {
        var deletedIndex = lookup.get(item.uid);

        game.items[deletedIndex] = undefined;
    },

    removeAllItems:function()
    {
        this.submergedItemsContainer.removeChildren();
        this.surfaceItemsContainer.removeChildren();
        this.airItemsContainer.removeChildren();
        this.playerContainer.removeChildren();
        this.otherContainer.removeChildren();
        this.dialogueContainer.removeChildren();

        game.items.splice(0, game.items.length);

        game.items.length = 0;
    },

    hideMenu:function()
    {
        if(!this.menu)
        {
            return false;
        }

        this.menu.visible = false;
        // this.menuSaveButton.visible = false;
        // this.menuLoadButton.visible = false;        
        // this.menuRestartButton.visible = false;
        // this.menuResumeButton.visible = false;
        // this.menuDesktopButton.visible = false;
        // this.menuFullscreenButton.visible = false;
        // this.menuExitButton.visible = false;

        return true;
    },

    drawPolygon:function(poly, array, offsetX, offsetY)
    {
        for(var i = 0; i < array.length; i = i + 2)
        {
            array[i] = array[i] - offsetX;
        }

        for(var i = 1; i < array.length; i = i + 2)
        {
            array[i] = array[i] - offsetY;
        }

        poly.drawPolygon(array);
    },

    drawRectangle:function(rect, point, weight, height, offsetX, offsetY)
    {
        rect.drawRect(point.x - offsetX, point.y - offsetY, weight, height);
    },

    fadeOut:function(container, duration, removeFrom = false, action = undefined)
    {
        const initialAlpha = container.alpha; // Initial alpha value of the container
        const fadeOutSpeed = initialAlpha / (duration * 60); // Calculate speed based on duration (60 FPS assumed)
    
        const fadeOutInterval = setInterval(() => {
            container.alpha -= fadeOutSpeed; // Decrease alpha value gradually
    
            if (container.alpha <= 0)
            {
                if(removeFrom)
                {
                    this.app.stage.removeChild(container);
                }

                if(action)
                {
                    action();
                }

                container.alpha = 0; // Ensure alpha doesn't go below 0
                clearInterval(fadeOutInterval); // Stop the interval when alpha reaches 0
            }
        }, 1000 / 60); // Run every frame (60 FPS)
    },

    fadeOutToBlackAndWhite:function(container, duration, removeFrom = false, action = undefined)
    {
        const initialAlpha = container.alpha; // Initial alpha value of the container
        const fadeOutSpeed = initialAlpha / (duration * 60); // Calculate speed based on duration (60 FPS assumed)
    
        const fadeOutInterval = setInterval(() => {
            //container.alpha -= fadeOutSpeed; // Decrease alpha value gradually
    
            // Convert to black and white by adjusting the tint
            const currentTint = container.tint;
            const newTint = PIXI.utils.rgb2hex([1 - container.alpha, 1 - container.alpha, 1 - container.alpha]);
            container.tint = newTint;
    
            if (container.alpha <= 0)
            {
                if(action)
                {
                    action();
                }
                container.alpha = 0; // Ensure alpha doesn't go below 0
                clearInterval(fadeOutInterval); // Stop the interval when alpha reaches 0
            }
        }, 1000 / 60); // Run every frame (60 FPS)
    },

    colorToBlackAndWhite:function(filter, duration, removeFrom = false, action = undefined)
    {
        console.log("colorToBlackAndWhite");

        let currentTime = 0;
        const frames = duration * 60; // Total frames based on duration (60 FPS assumed)

        const initialMatrix = filter.matrix.slice(); // Get the original color matrix

        const grayscaleMatrix = [
            0, 1, 1, 0, 0,
            1, 0, 1, 0, 0,
            1, 1, 0, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 1,
        ]; // Grayscale matrix

        const interval = setInterval(() => {
            currentTime++;

            // Calculate the transition progress (from 0 to 1)
            const progress = currentTime / frames;

            // Interpolate between the original matrix and grayscale matrix
            const interpolatedMatrix = initialMatrix.map((value, index) => {
                return value + (grayscaleMatrix[index] - value) * progress;
            });

            filter.matrix = interpolatedMatrix;

            if (currentTime >= frames) {
                if(action) {
                    action();
                }
                clearInterval(interval); // Stop the interval when transition is complete
                filter = [];
            }
        }, 1000 / 60); // Run every frame (60 FPS)
    },

    drawLoadingScreen:function()
    {
        if(!this.blackScreen)
        {
            this.blackScreen = new PIXI.Graphics();

            this.blackScreen.beginFill(0x000000); // Black color
            this.blackScreen.drawRect(0, 0, 
                productionWidth, 
                productionHeight);
            this.blackScreen.endFill();
        }

        this.app.stage.addChild(this.blackScreen);

        if(!this.resourceMasterSet.has("images/loadingbox.png"))
        {
            this.loadingBox = PIXI.Sprite.from("images/loadingbox.png");
            this.loadingBox.x = productionWidth / 2;
            this.loadingBox.y = productionHeight / 2;
            this.loadingBox.anchor.set(0.5);
            this.app.stage.addChild(this.loadingBox);
         
            this.resourceMasterSet.add("images/loadingbox.png");
        }
        else
        {
            this.app.stage.addChild(this.loadingBox);
        }
    },

    showDialogue:function()
    {
        // this.inputField.text = '';
        //this.clearTextOutput();

        this.dialogueContainer.x = 0;
        this.dialogueContainer.y = 0;
        this.dialogueContainer.visible = true;
    },

    hideDialogue:function()
    {
        this.dialogueContainer.visible = false;
    },

    hideTextbook:function()
    {
        this.textbookContainer.visible = false;
    },

    removeLoadingScreen:function()
    {
        this.app.stage.removeChild(this.blackScreen);
    },

    removePixiImage:function()
    {
        this.images.splice(0, this.images.length);
    },

    removePixiButtonImage:function()
    {
        this.buttonImages.splice(0, this.buttonImages.length);
    },

    reset:function()
    {
        this.indexes.clear();
        this.overallFrames = 0;
    },

    resetCamera:function()
    {
        this.cameraOffsetX = 0;
        this.cameraOffsetY = 0;
    },

    removeAndFindResource:function(resource)
    {
        for(var i = 0; i < game.items.length; i++)
        {
            if(game.items[i] && game.items[i].uid == resource.uid)
            {
                console.log("removing terrain, uid: " + resource.uid);
                console.log(this.resourcesContainer);
                console.log(game.items[i].sprite);

                displayObject = this.resourcesContainer.removeChild(game.items[i].sprite);

                if(!displayObject)
                    console.log("No good, didn't delete terrain!");
                
                game.items.splice(i,1);
                break;
            }
        }
    },

    removeLobbyScreen:function()
    {
        this.cancel_button.interactive = false;
        this.join_button.interactive = false;
        this.join_highlight_button.interactive = false;
        this.lobbyScrollUpButton.interactive = false;
        this.lobbyScrollDownButton.interactive = false;

        this.lobbyContainer.removeChild(this.cancel_button);
        this.lobbyContainer.removeChild(this.join_button);
        this.lobbyContainer.removeChild(this.join_highlight_button);
        this.lobbyContainer.removeChild(this.lobbyScreen);
        this.lobbyContainer.removeChild(this.lobbyScrollUpButton);
        this.lobbyContainer.removeChild(this.lobbyScrollDownButton);

        this.gameTextList.splice(0,this.gameTextList.length);

        this.removeGameList();

        this.app.stage.removeChild(this.lobbyContainer);
    },

    removeThreshold:function()
    {
        this.thresholdContainer.removeChildren();
    },

    removeLights:function()
    {
        this.lightsContainer.removeChildren();
        this.lightsSpxContainer.removeChildren();
    },

    removeGameInterface:function()
    {
        this.gameInterfaceContainer.removeChild(this.maininterface);
        this.gameInterfaceContainer.removeChild(this.powerText);
        this.gameInterfaceContainer.removeChild(this.cashText);
        this.gameInterfaceContainer.removeChild(this.missionFailureText);
    },

    removeTerrain:function()
    {
        this.resourcesContainer.removeChildren();
    },

    removeMainInterface:function()
    {
        this.container.removeChild(this.maininterface);
    },

    removeBackground:function()
    {
        this.backgroundContainer.removeChildren();
        this.container.removeChild(this.backgroundContainer);
    },

    removeClock:function()
    {   
        this.gameplayContainer.removeChild(this.clock.spriteText);
    },

    removeDay:function()
    {
        this.gameplayContainer.removeChild(this.day.spriteText);
    },

    removeButtons:function()
    {
        game.buttons.length = 0;
        this.buttonsContainer.removeChildren();
    },

    removeText:function()
    {
        this.textContainer.removeChildren();
    },

    removeDebug:function()
    {
        if(!debug.production)
        {
            if(this.debugShowCells != null)
            {
                for(var i = 0; i < this.debugShowCells.length; i++)
                    this.debugShowCells[i] = null;

                this.debugShowCells = null;
            }

            if(this.waterCells != null)
            {
                for(var i = 0; i < this.waterCells.length; i++)
                    this.waterCells[i] = null;
                
                this.waterCells = null;
            }

            this.debugContainer.removeChildren();

            this.container.removeChild(this.debugMouseX);
            this.container.removeChild(this.debugMouseY);
            this.container.removeChild(this.debugMouseDetails);
            this.container.removeChild(this.debugOffsetX);
            this.container.removeChild(this.debugOffsetY);
        }
    },
};
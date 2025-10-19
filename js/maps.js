var maps =
{
    "singleplayer":[
    {
        "name":"instructions",
        "mapImages":"images/maps/instructions/",       
        "numberOfHorizontalTiles":3,
        "numberOfVerticalTiles":3,
        "backgroundWidth":1920,
        "backgroundHeight":1080,
        "startX":0,
        "startY":0,
        "mapGridWidth":96,
        "mapGridHeight":54,
        "additional_requirements":[
        ],
        "items": [

        ],
        "lights" : [
            // {"type":"lights","name":"temporary_post","x":21,"y":95,"on":true,"uid":-282},
        ],
        "thresholds":[
            //{"type":"thresholds","name":"auto_door","x":117,"y":53,"direction":0,"uid":-151}
        ],
        // "text":[
        //     {"type":"text", "name":"pay", "x":900, "y":100}
        // ],
        "clock":
        {
            "timer":9999999999
        },
        "buttons":[
            {"type":"buttons", "name":"start", "x":920, "y":1030, "action":()=>{
                renderer.clock.reset();
                game.endLevel();
                game.nextLevel();
                //economy.send();
            }},
        ],    
        "triggers" : [
        {
            "type":"conditional",
            "condition":() => {
                return false;
            },     
            "action":() => {

            } 
        }
        ]
    }, 
    {
        "name":"university",
        "mode":"learning",
        "mapImages":"images/maps/university/",
        "miniMapImage":"images/minimaps/university/",        
        "numberOfHorizontalTiles":10,
        "numberOfVerticalTiles":8,
        "backgroundWidth":6400,
        "backgroundHeight":4800,
        // "startX":80,
        // "startY":80,
        //"startX":180,
        //"startY":50,
        "startX":120,
        "startY":100,
        "mapGridWidth":320,
        "mapGridHeight":240,
        "additional_requirements":[
        ],
        "items": [
            {"type":"player","name":"player","x":166,"y":130,"direction":4,"team":"characters","uid":-1},
            {"type":"teachers","name":"lecturer","x":103,"y":57,"direction":0,"team":"characters","uid":-2},
            {"type":"teachers","name":"librarian","x":240,"y":58,"direction":0,"team":"characters","uid":-3},
            {"type":"teachers","name":"tutor","x":260,"y":170,"direction":0,"team":"characters","uid":-4},
            {"type":"teachers","name":"narrator","x":85.5,"y":178,"direction":0,"team":"characters","uid":-5},

            {"type":"students","name":"adam","x":-20,"y":-20,"direction":0,"team":"characters","uid":-6},
            {"type":"students","name":"max","x":-20,"y":-20,"direction":4,"team":"characters","uid":-7},
            {"type":"students","name":"alice","x":-20,"y":-20,"direction":0,"team":"characters","uid":-8},
            {"type":"students","name":"zoe","x":-20,"y":-20,"direction":4,"team":"characters","uid":-9},
            {"type":"students","name":"maya","x":-20,"y":-20,"direction":0,"team":"characters","uid":-10},
            {"type":"students","name":"jack","x":-20,"y":-20,"direction":4,"team":"characters","uid":-11},
            {"type":"students","name":"andrew","x":-20,"y":-20,"direction":0,"team":"characters","uid":-12},
            {"type":"students","name":"mohamed","x":-20,"y":-20,"direction":4,"team":"characters","uid":-13},
            {"type":"students","name":"rohan","x":-20,"y":-20,"direction":0,"team":"characters","uid":-14},
            {"type":"students","name":"momo","x":-20,"y":-20,"direction":4,"team":"characters","uid":-15},
            {"type":"students","name":"emma","x":-20,"y":-20,"direction":0,"team":"characters","uid":-16},
            {"type":"students","name":"li","x":-20,"y":-20,"direction":4,"team":"characters","uid":-17},

            {"type":"library","name":"desk","x":252,"y":80,"direction":0,"team":"props","uid":-18},
        ],
        "materials" : [
            {"name":"slides","x":55,"y":35},
            {"name":"notes","x":85,"y":65},
            {"name":"textbook","x":85,"y":35},
        ],
        "props" : [

        ],
        "lights" : [
        ],
        "thresholds":[
        ],
        "clock":
        {
            "timer":120
        },
        "triggers" : [
        {
        }
        ]
    },
    {
        "name":"university",
        "mode":"social",
        "mapImages":"images/maps/university/",
        "miniMapImage":"images/minimaps/university/",        
        "numberOfHorizontalTiles":10,
        "numberOfVerticalTiles":8,
        "backgroundWidth":6400,
        "backgroundHeight":4800,
        "startX":120,
        "startY":100,
        "mapGridWidth":320,
        "mapGridHeight":240,
        "additional_requirements":[
        ],
        "items": [
            {"type":"player","name":"player","x":166,"y":130,"direction":4,"team":"characters","uid":-1},
            {"type":"students","name":"adam","x":190,"y":110,"direction":0,"team":"characters","uid":-2},
            {"type":"students","name":"max","x":150,"y":150,"direction":4,"team":"characters","uid":-3},
            {"type":"students","name":"alice","x":190,"y":140,"direction":0,"team":"characters","uid":-4},
            {"type":"students","name":"zoe","x":200,"y":150,"direction":4,"team":"characters","uid":-5},
            {"type":"students","name":"maya","x":170,"y":110,"direction":0,"team":"characters","uid":-6},
            {"type":"students","name":"jack","x":190,"y":120,"direction":4,"team":"characters","uid":-7},
            {"type":"students","name":"andrew","x":130,"y":130,"direction":0,"team":"characters","uid":-8},
            {"type":"students","name":"mohamed","x":110,"y":125,"direction":4,"team":"characters","uid":-9},
            {"type":"students","name":"rohan","x":140,"y":140,"direction":0,"team":"characters","uid":-10},
            {"type":"students","name":"momo","x":190,"y":150,"direction":4,"team":"characters","uid":-11},
            {"type":"students","name":"emma","x":160,"y":150,"direction":0,"team":"characters","uid":-12},
            {"type":"students","name":"li","x":170,"y":135,"direction":4,"team":"characters","uid":-13},
        ],
        "lights" : [
            // {"type":"lights","name":"temporary_post","x":21,"y":95,"on":true,"uid":-282},
        ],
        "thresholds":[
            //{"type":"thresholds","name":"auto_door","x":117,"y":53,"direction":0,"uid":-151}
        ],
        "clock":
        {
            "timer":240
        },
        
        "triggers" : [
        {
            "type":"conditional",
            "condition":() => {
                return true;
            },     
		    "action":() => {
                game.items[1].orders.type = "search";
                game.items[2].orders.type = "search";
                game.items[3].orders.type = "search";
                game.items[4].orders.type = "search";
                game.items[5].orders.type = "search";
                game.items[6].orders.type = "search";
                game.items[7].orders.type = "search";
                game.items[8].orders.type = "search";
                game.items[9].orders.type = "search";
                game.items[10].orders.type = "search";
                game.items[11].orders.type = "search";
                game.items[12].orders.type = "search";
                
                //renderer.setOrder(game.items[1], {"order":{"type":"search"}});
                //renderer.setOrder(game.items[2], {"order":{"type":"search"}});
		    } 
        }
        ]
    },
    {
        "name":"payslip",
        "mapImages":"images/maps/payslip/",       
        "numberOfHorizontalTiles":3,
        "numberOfVerticalTiles":3,
        "backgroundWidth":1920,
        "backgroundHeight":1080,
        "startX":0,
        "startY":0,
        "mapGridWidth":96,
        "mapGridHeight":54,
        "additional_requirements":[
        ],
        "items": [

        ],
        "lights" : [
            // {"type":"lights","name":"temporary_post","x":21,"y":95,"on":true,"uid":-282},
        ],
        "thresholds":[
            //{"type":"thresholds","name":"auto_door","x":117,"y":53,"direction":0,"uid":-151}
        ],
        "text":[
            {"type":"text", "name":"pay", "x":900, "y":100}
        ],
        "buttons":[
            {"type":"buttons", "name":"confirm", "x":900, "y":900, "action":()=>{
                renderer.clock.reset();
                game.endLevel();
                game.nextLevel();
                economy.send();
            }},
            {"type":"buttons", "name":"rent", "text":"Rent", "x":1100, "y":300, "action":()=>{
                renderer.toggleButton("rent");
                economy.toggle("rent");
            }},
            {"type":"buttons", "name":"aircon_heating", "text":"Heat/Aircon", "x":1100, "y":400, "action":()=>{
                renderer.toggleButton("aircon_heating");
                economy.toggle("aircon_heating");
            }},
            {"type":"buttons", "name":"food", "text":"Eat", "x":1100, "y":500, "action":()=>{
                renderer.toggleButton("food");
                economy.toggle("food");
            }},
            {"type":"buttons", "name":"social", "text":"Socialise", "x":1100, "y":600, "action":()=>{
                renderer.toggleButton("social");
                economy.toggle("social");
            }},
            {"type":"buttons", "name":"family", "text":"Family Support", "x":1100, "y":700, "action":()=>{
                renderer.toggleButton("family");
                economy.toggle("family");
            }}
        ],    
        "triggers" : [
        {
            "type":"conditional",
            "condition":() => {
                return false;
            },     
		    "action":() => {

		    } 
        }
        ]
    }, 
    {
        "name":"survey",
        "mapImages":"images/maps/survey/",       
        "numberOfHorizontalTiles":3,
        "numberOfVerticalTiles":3,
        "backgroundWidth":1920,
        "backgroundHeight":1080,
        "startX":0,
        "startY":0,
        "mapGridWidth":96,
        "mapGridHeight":54,
        "additional_requirements":[
        ],
        "items": [

        ],
        "lights" : [
            // {"type":"lights","name":"temporary_post","x":21,"y":95,"on":true,"uid":-282},
        ],
        "thresholds":[
            //{"type":"thresholds","name":"auto_door","x":117,"y":53,"direction":0,"uid":-151}
        ],
        // "text":[
        //     {"type":"text", "name":"pay", "x":900, "y":100}
        // ],
        "buttons":[
            {"type":"buttons", "name":"first_survey", "x":900, "y":550, "action":()=>{
                window.open("https://rmit.au1.qualtrics.com/jfe/form/SV_cx7YYDMo3zBF5Nc", "_blank")
            }},
            {"type":"buttons", "name":"first_survey_qr", "x":900, "y":600},
            {"type":"buttons", "name":"return_survey", "x":600, "y":550, "action":()=>{
                window.open("https://rmit.au1.qualtrics.com/jfe/form/SV_6QXm5X7OtB01You", "_blank")
            }},
            {"type":"buttons", "name":"return_survey_qr", "x":600, "y":600},
            {"type":"buttons", "name":"last_survey", "x":1200, "y":550, "action":()=>{
                window.open("https://rmit.au1.qualtrics.com/jfe/form/SV_eFZzdAMiQYWY74y", "_blank")
            }},
            {"type":"buttons", "name":"last_survey_qr", "x":1200, "y":600},
        ],    
        "triggers" : [
        {
            "type":"conditional",
            "condition":() => {
                return false;
            },     
		    "action":() => {

		    } 
        }
        ]
    },     
]}
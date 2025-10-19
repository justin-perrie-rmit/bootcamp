var styles =
{
    
}

const conversationStyle = new PIXI.TextStyle({
    fontFamily: 'Courier',
    fontSize: 14,
    fill: ['#FFFFFF'], // gradient
});

const lecturerStyle = new PIXI.TextStyle({
    fontFamily: 'Courier',
    fontSize: 20,           // increased size
    fill: ['#FFFFFF'],      // gradient or solid white
    fontWeight: 'bold',
    dropShadow: true,        // enable shadow
    dropShadowColor: '#000000', // shadow color (black)
    dropShadowBlur: 4,       // blur radius for softer shadow
    dropShadowAngle: Math.PI / 6, // shadow angle
    dropShadowDistance: 3,   // shadow offset
});

const narratorStyle = new PIXI.TextStyle({
    fontFamily: 'Courier',
    fontSize: 14,
    fill: ['#FFFFFF'], // gradient
});

const clockStyle = new PIXI.TextStyle({
    fontFamily: 'Courier',
    fontSize: 18,
    fill: ['#FFFFFF'], // gradient
});

const introStartStyle = new PIXI.TextStyle({
    fontFamily: 'Courier',
    fontSize: 48,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff'], // gradient
    stroke: 'navy',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: 'black',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});

const introExitStyle = new PIXI.TextStyle({
    fontFamily: 'Courier',
    fontSize: 48,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff'], // gradient
    stroke: 'navy',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: 'black',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});


const showMessageStyle = new PIXI.TextStyle({
    fill: "white",
    fontSize: 13,
    wordWrap: true,
    wordWrapWidth: 450
});
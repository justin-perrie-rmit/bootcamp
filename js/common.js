/* Common functions for turning and movement */

var debugCollision = false;

function calculateAngle(direction, directions)
{
    return (direction / directions) * 360;
}

function angleDifference(a, b)
{
    return Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
}

// Finds the angle between two objects in terms of a direction (where 0 <= angle < directions) (assuming we have 8 directions)
function findAngle2(x1,y1,x2,y2)
{
	//Convert Arctan to value between (0 - 7)
	// var angle = (Math.atan2(object.y - unit.y, object.x - unit.x) * 180) / Math.PI;

	// if (angle < 0) { angle += 2 * Math.PI; }

	// return angle;
	var dy = y2 - y1;
	var dx = x2 - x1;
	var angle = (Math.atan2(dy,dx) * 180) / Math.PI;
	if (angle < 0) { angle += 2 * Math.PI; }
	return angle;
	//console.log("direction: " + direction);
}

function findAngle(object,unit,directions)
{
 	var dy = (object.y) - (unit.y);
	var dx = (object.x) - (unit.x);

	//Convert Arctan to value between (0 - 7)
	var direction = directions/2-(Math.atan2(dx,dy)*directions/(2*Math.PI));
	//console.log("direction: " + direction);
  	
	var angle = wrapDirection(direction,directions);
	
	//console.log("angle: " + angle);

  	return angle;
 }

 function findAngle2(item, other) {
	
	if(!other)
		return;

    var dy = item.y - other.y;
    var dx = item.x - other.x;

    var angleInRadians = Math.atan2(dy, dx);

    // Convert radians to degrees
    var angleInDegrees = angleInRadians * (180 / Math.PI);

    // Adjust the angle to be in the range [0, 360)
    if (angleInDegrees < 0) {
        angleInDegrees += 360;
    }

    return angleInDegrees;
}

 function findDirectionFromZeroVector(object,directions)
{
 	var dy = (object.y) - (0);
	var dx = (object.x) - (0);

	var direction = directions/2-(Math.atan2(dx,dy)*directions/(2*Math.PI));
	
  	return wrapDirection(direction,directions);;
 }

 // returns the smallest difference (value ranging between -directions/2 to +directions/2) between two angles (where 0 <= angle < directions)
function angleDiff(angle1,angle2,directions)
{
	if (angle1>=directions/2)
	{
		angle1 = angle1-directions;
	}
	
	if (angle2>=directions/2){
		angle2 = angle2-directions;
	}

	diff = angle2-angle1;

	if (diff<-directions/2){
		diff += directions;
	}
	if (diff>directions/2){
		diff -= directions;
	}

    return diff;
}

// Make sure 0 <= direction < directions
function wrapDirection(direction,directions)
{
	if(directions <= 0)
		return 0;
	
	while (direction<0)
	{
		direction += directions;
	}
	while (direction >= directions)
	{
		direction -= directions;
	}

	return direction;
}

function wrapAnimationDirection(direction,directions,animationCount=0,minimum=0)
{
	//direction = direction + directions * animationCount

	/*if (direction<0)
	{
		direction += directions + directions * animationCount;
	}
	if (direction >= directions + directions * animationCount)
	{
		direction -= directions + directions * animationCount;
	}*/

	if (direction<0)
	{
		direction += directions;
	}
	else if(direction >= directions)
	{
		direction -= directions;
	}

	// console.assert(direction >= 0,
	// 	"direction is beyond the range: " + direction);

	// console.assert(direction < directions,
	// 	"direction is beyond the range: " + direction);

	direction = (directions * animationCount) + direction;

	// console.assert(direction < (directions * animationCount) + directions,
	// 	"direction is beyond the range: " + direction);

	return direction;
}

function invertDirection(direction, directions)
{
	if(direction >= directions / 2)
	{
		return direction - directions / 2;
	}
	else
	{
		return direction + directions / 2;
	}
}

function turnToClosetCorrectDirection(d1, d2, directions, correctDirection)
{
	d1 = Math.floor(d1);
	d2 = Math.floor(d2);

	n1 = 0;
	n2 = 0;

	while(correctDirection != d1)
	{
		if(d1 < 0)
			d1 = directions;

		d1--;
		n1++;
	}

	while(correctDirection != d2)
	{
		if(d2 == directions)
			d2 = 0;

		d2++;
		n2++;
	}

	if(n1 < n2)
		return true;
	else if(n1 > n2)
		return false;
	else
		return true;
}

function distance(itemX, itemY, x, y)
{
	var distance = Math.sqrt(
		Math.pow(itemX - x, 2) + Math.pow(itemY - y, 2));

	return distance;
}

function distanceBetweenTwoPoints(startX, startY, endX, endY)
{
	var x = startX - endX;
	var y = startY - endY;

	return Math.sqrt(x * x + y * y);
}

function findDistanceToItem(player, item)
{
	return distance(player.x, player.y, item.x, item.y);
}

function findDistanceToLecturer(player, teacher)
{
	return distance(player.x, player.y, teacher.x, teacher.y);
}

function findDistanceToNarrator(player, teacher)
{
	return distance(player.x, player.y, teacher.x, teacher.y);
}

function findDistanceToTutor(player, teacher)
{
	return distance(player.x, player.y, teacher.x, teacher.y);
}

function findDistanceToLibrarian(player, teacher)
{
	return distance(player.x, player.y, teacher.x, teacher.y);
}

function findDistanceToClosestConversation(player) 
{
    let minDistance = Infinity;
    let closestMessage = null;
    const threshold = 10; // units

    for (const [uid, data] of conversations.locations)
    {
        const loc = data.location || data;
        const dx = loc.x - player.x;
        const dy = loc.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance)
        {
            minDistance = distance;
            closestMessage = data.message || data;
        }
    }

    // Check threshold
    if (minDistance <= threshold)
    {
        return closestMessage;
    }
    else
    {
        return null; // no conversation close enough
    }
}

function doCirclesOverlap(x1, y1, r1, x2, y2, r2)
{
	return Math.abs((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= (r1 + r2) * (r1 + r2);
}

function rotateSubtract(left, right, min, max)
{
	var result = left - right;
	var range = max - min;

	if(result >= max) result -= range;
	if(result < min) result += range;

	return result;
}

function rotateShortDifference(left, right, min, max)
{
	var a = rotateSubtract(right, left, min, max);
	var b = rotateSubtract(left, right, min, max);

	if(b > a)
		return a;
	else if(b < a)
		return -b;
}

function findClosestGroundItem(item, physicsQuery)
{
    let itemsFound = physicsQuery(item.near);
	
	// If no valid items are found, return null
    if (itemsFound.length === 0) {
        return null;
    }

	var closestGroundTarget = undefined;

	var dist = game.bigNumber;

	for(var i = 0; i < itemsFound.length; i++)
	{
		var newItem = game.items[lookup.get(itemsFound[i].uid)];

		if(!newItem)
		{
			console.log("perhaps dead");
			continue;
		}

		if(newItem.team == item.team)
			continue;

		if(distance(item.x, item.y, newItem.x, newItem.y) < dist)
		{
			dist = distance(item.x, item.y, newItem.x, newItem.y);
			closestGroundTarget = newItem;
		}
	}

    return closestGroundTarget;
}

function findGroundTarget(item)
{
	targetsFound = physics.queryArmy(item.near);

	if(!targetsFound)
	 	return;

	for(var i = 0; i < targetsFound.length; i++)
	{
		var newItem = game.items[lookup.get(targetsFound[i].uid)];

		if(!newItem)
			continue;

		if(item.team == newItem.team)
			continue;

		return newItem;
	}	

	return;
}

// Searches for nearest ground target
function findClosestGroundTarget(item)
{
	targetsFound = physics.queryArmy(item.near);

	if(!targetsFound)
	 	return;	

	var closestGroundTarget = undefined;

	var dist = game.bigNumber;

	for(var i = 0; i < targetsFound.length; i++)
	{
		var newItem = game.items[lookup.get(targetsFound[i].uid)];

		if(!newItem)
			continue;

		if(item.team == newItem.team)
			continue;

		if(newItem.state.attacking)
			return newItem;

		if(distance(item.x, item.y, newItem.x, newItem.y) < dist)
		{
			dist = distance(item.x, item.y, newItem.x, newItem.y);
			closestGroundTarget = newItem;
		}
	}	

	return closestGroundTarget;
}

function findFriendlyVehicles(team, vision)
{
	vehiclesFound = physics.queryArmy(vision);

	if(!vehiclesFound)
		return;

	var targets = [];

	for(var i = 0; i < vehiclesFound.length; i++)
	{
		var item = game.items[lookup.get(vehiclesFound[i].uid)];

		if(!item)
			continue;

		if(item.team != team)
			continue;

		if(item.type != "vehicles")
			continue;	

		targets.push(item);
	}	

	return targets;
}

function findFriendlyInfantry(team, near)
{
	infantryFound = physics.queryArmy(near);

	if(!infantryFound)
		return;

	var targets = [];

	for(var i = 0; i < infantryFound.length; i++)
	{
		var item = game.items[lookup.get(infantryFound[i].uid)];

		if(!item)
			continue;

		if(item.team != team)
			continue;

		if(item.type != "infantry")
			continue;	

		targets.push(item);
	}	

	return targets;
}

function findFriendlyElements(team, near)
{
	moneraFound = physics.queryArmy(near);

	if(!moneraFound)
		return;

	var targets = [];

	for(var i = 0; i < moneraFound.length; i++)
	{
		var item = game.items[lookup.get(moneraFound[i].uid)];

		if(!item)
			continue;

		if(item.team != team)
			continue;

		if(item.type != "monera")
			continue;	

		targets.push(item);
	}	

	return targets;
}

function isMoving(item)
{
	if(Array.isArray(item))
	{
		for (var i = 0; i < item.length; i++)
		{
			if(item[i].orders.type == "stand" ||
			   item[i].orders.type == "standing" ||
			   item[i].orders.type == "fire" ||
			   item[i].orders.type == "firing")
				return false;
		}
	}
	else
	{
		if(!item)
			return false;

		if(!item.orders)
			return false;

		if(item.orders.type == "stand" ||
           item.orders.type == "standing" ||
		   item.orders.type == "fire" ||
		   item.orders.type == "firing")
			return false;
	}

	
	return true;
}

function uniqueUidPair(uid, otherUid)
{
	return Math.min(uid, otherUid) + " " + Math.max(uid, otherUid);
}

function findLongestPath(item, collidedItem)
{
	if(collidedItem.orders.path && item.orders.path && collidedItem.orders.path.length > item.orders.path.length)
		return collidedItem;
	else if(collidedItem.orders.path && item.orders.path && item.orders.path.length > collidedItem.orders.path.length)
		return item;
	else
	{
		if(!collidedItem.nextStep)
		{
			return undefined;
		}

		var itemDistanceToNextStepSquared = Math.pow(item.x - item.nextStep.x, 2)
			+ Math.pow(item.y - item.nextStep.y, 2);
			
		var collidedItemDistanceToNextStepSquared = Math.pow(collidedItem.x - collidedItem.nextStep.x, 2)
			+ Math.pow(collidedItem.y - collidedItem.nextStep.y, 2);

		if(collidedItemDistanceToNextStepSquared > itemDistanceToNextStepSquared)
			return collidedItem;
		else
			return item;
	}
}

function findShortestPath(item, collidedItem)
{
	if(collidedItem.orders.path && item.orders.path && collidedItem.orders.path.length > item.orders.path.length)
		return;
	else if(collidedItem.orders.path && item.orders.path && item.orders.path.length > collidedItem.orders.path.length)
		return collidedItem;
	else
	{
		if(!collidedItem.nextStep)
			return;

		var itemDistanceToNextStepSquared = Math.pow(item.x - item.nextStep.x, 2)
			+ Math.pow(item.y - item.nextStep.y, 2);
			
		var collidedItemDistanceToNextStepSquared = Math.pow(collidedItem.x - collidedItem.nextStep.x, 2)
			+ Math.pow(collidedItem.y - collidedItem.nextStep.y, 2);

		if(collidedItemDistanceToNextStepSquared > itemDistanceToNextStepSquared)
			return;
		else
			return collidedItem;
	}
}

function moveTowardDestination(itemX, itemY, nextX, nextY, endX, endY)
{
	if(distance(itemX, itemY, endX, endY) < distance(nextX, nextY, endX, endY))
		return true;

	return false;
}

function findShortestDistance(item, collidedItem, end)
{
	if(distance(item.x, item.y, end[0], end[1]) < distance(collidedItem.x, collidedItem.y, end[0], end[1]))
		return true;
	
	return false;
}



function findLongestDistance(item, collidedItem, end)
{
	if(distance(item.x, item.y, end[0], end[1]) > distance(collidedItem.x, collidedItem.y, end[0], end[1]))
		return true;
	
	return false;
}

function findFurthestItem(item, collidedItem)
{
	var a = findAngle2(item, item.nextStep);
	var b = findAngle2(item, collidedItem.nextStep);

	var c = findAngle2(collidedItem, collidedItem.nextStep);
	var d = findAngle2(collidedItem, item.nextStep);

	let angleDifference1 = angleDifference(a, b);
	let angleDifference2 = angleDifference(c, d);

	if(angleDifference1 < angleDifference2)
		return true;

	return false;
}

function determineCollisionGrid(item)
{
	var itemCollisionGrid = {};

	if(item.radius)
	{
		itemCollisionGrid.radius = item.radius / game.gridSize;
	}
	else
	{
		itemCollisionGrid.gridY = item.passableGrid.length;
		itemCollisionGrid.gridX = item.passableGrid[0].length;
	}

	return itemCollisionGrid;
}

function spread(n)
{
	var pattern = [];

	n = reduceNumber(n);
	
	for(let i = 0; i < n; i++)
		pattern.push([]);

	/** Counters start from top left corner, both are negative */

	let xCounter = 0 - ~~(n / 2); // Bitwise ~ two's complement - js integer division
	let yCounter = 0 - ~~(n / 2);

	let startColumn = 0;
	let endColumn = n - 1;
	let startRow = 0;
	let endRow = n - 1;

	for(let j = startRow; j <= endRow; j++)
	{
		for(let i = startColumn; i <= endColumn; i++)
		{
			pattern[j][i] = {"x":xCounter,"y":yCounter};
			yCounter++;
		}

		yCounter = 0 - ~~(n / 2);
		xCounter++;
	}	

	return pattern;
}

function reduceNumber(bigN)
{
	var n = Math.sqrt(bigN);

	if(n % 1 != 0)
	{
		n = Math.floor(n) + 1;
	}

	return n;
}

function findFiringAngle(source, target, directions)
{
	var dy = target.y - source.y;
	var dx = target.x - source.x;

	if(source.type == "building")
	{
		//Convert Arctan to value between (0 - 7)
		var direction = directions/2-(Math.atan2(dx,dy)*directions/(2*Math.PI));
		  
		var angle = wrapDirection(direction,directions);
		
		return angle;

	}
	else if(source.type == "aircraft")
	{
		dy = dy + source.pixelShadowHeight / game.gridSize;
	}

	var angle = wrapDirection(directions / 2 - (Math.atan2(dx, dy) * directions / (2 * Math.PI)),directions);

	return angle;
}

function fireAngle(object, target)
{
	var angle = Math.atan2(target.y - object.y, target.x - object.x) * (180 / Math.PI) + 90;

	// Adjust angle to be in the range of [0, 360)
	if (angle < 0) {
		angle += 360;
	}

	return angle;
}

function degreesToRadians(degrees)
{
	return degrees * (Math.PI / 180);
}

function sigmoid(x, steepness, horizontalShift)
{
	return 1 / (1 + Math.exp(-steepness * (x - horizontalShift)));
}

function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}

function toTitleCase(str)
{
	return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
	  return match.toUpperCase();
	});
  }

function pause(message, lineNumber, team, name)
{
	if(debug.pauseDebug)
		alert(message + "\n" + lineNumber + "\n" + team+ "\n" + name)
}

function log(message, lineNumber, team, name)
{
	if(debug.logDebug)
		console.log(message + "\n" + lineNumber + "\n" + team+ "\n" + name)
}
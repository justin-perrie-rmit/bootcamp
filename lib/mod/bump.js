class Bump
{
    constructor(renderingEngine = PIXI)
    {
        if(renderingEngine === undefined)
            throw new Error("Please assign a rendering engine in the constructor before using bump.js");    

        this.renderer = "pixi";
    }

    //`addCollisionProperties` adds extra properties to sprites to help
    //simplify the collision code. It won't add these properties if they
    //already exist on the sprite. After these properties have been
    //added, this methods adds a Boolean property to the sprite called `_bumpPropertiesAdded` 
    //and sets it to `true` to flag that the sprite has these
    //new properties
    addCollisionProperties(sprite)
    {
        if(this.renderer === "pixi")
        {
            /*if(sprite.gx === undefined)
            {
                Object.defineProperty(sprite, "gx", {
                    get() {
                        return sprite.getGlobalPosition().x},
                        enumerable: true, configurable: true
                });
            }

            if(sprite.gy === undefined)
            {
                Object.defineProperty(sprite, "gy", {
                    get() {
                        return sprite.getGlobalPosition().y},
                        enumerable: true, configurable: true
                });
            }*/

            if(sprite.centerX === undefined)
            {
                Object.defineProperty(sprite, "centerX", {
                    get() {
                        return sprite.x + sprite.width / 2},
                        enumerable: true, configurable: true
                });
            }

            if(sprite.centerY === undefined)
            {
                Object.defineProperty(sprite, "centerY", {
                    get() {
                        return sprite.y + sprite.height / 2},
                        enumerable: true, configurable: true
                });
            }

            if(sprite.halfWidth === undefined)
            {
                Object.defineProperty(sprite, "halfWidth", {
                    get() {
                        return sprite.width / 2},
                        enumerable: true, configurable: true
                });
            }

            if(sprite.halfHeight === undefined)
            {
                Object.defineProperty(sprite, "halfHeight", {
                    get() {
                        return sprite.height / 2},
                        enumerable: true, configurable: true
                });
            }

            if(sprite.xAnchorOffset === undefined)
            {
                Object.defineProperty(sprite, "xAnchorOffset", {
                    get() {
                        if(sprite.anchor !== undefined)
                        {
                            return sprite.width * sprite.anchor.x;
                        }
                        else
                        {
                            return 0;
                        }
                    },
                    enumerable: true, configurable: true
                });
            }

            if(sprite.yAnchorOffset === undefined)
            {
                Object.defineProperty(sprite, "yAnchorOffset", {
                    get() {
                        if(sprite.anchor !== undefined)
                        {
                            return sprite.height * sprite.anchor.y;
                        }
                        else
                        {
                            return 0;
                        }
                    },
                    enumerable: true, configurable: true
                });
            }
        }

        sprite._bumpPropertiesAdded = true;
    }

    /*
    hitTestPoint
    ------------

    Use it to find out if a point is touching a circlular or rectangular sprite.
    Parameters: 
    a. An object with `x` and `y` properties.
    b. A sprite object with `x`, `y`, `centerX` and `centerY` properties.
    If the sprite has a `radius` property, the function will interpret
    the shape as a circle.
    */

    hitTestPoint(point, sprite)
    {
        if(!sprite._bumpPropertiesAdded)
            this.addCollisionProperties(sprite);

        let left, right, top, bottom, hit;

        //Get the position of the sprite's edges
        left = sprite.x - sprite.xAnchorOffset;
        right = sprite.x + sprite.width - sprite.xAnchorOffset;
        top = sprite.y - sprite.yAnchorOffset;
        bottom = sprite.y + sprite.height - sprite.yAnchorOffset;

        //Find out if the point is intersecting the rectangle
        hit = point.x > left && point.x < right && point.y > top && point.y < bottom;
        

        //`hit` will be either `true` or `false`
        return hit;
    }

    rectangleCollision(r1, r2, gridSize, grid, scale, global = true)
    {
        // Add collision properties
        //if(!r1.sprite._bumpPropertiesAdded) this.addCollisionProperties(r1.sprite);
        //if(!r2.sprite._bumpPropertiesAdded) this.addCollisionProperties(r2.sprite);

        let collision, combinedHalfWidths, combinedHalfHeights, overlapX, overlapY, vx, vy;
        
        vx = (r1.sprite.x + Math.abs(r1.sprite.width / 2) - r1.sprite.width * r1.sprite.anchor.x) -
                (r2.sprite.x + Math.abs(r2.sprite.width / 2) - r2.sprite.width * r2.sprite.anchor.x);

        vy = (r1.sprite.y + Math.abs(r1.sprite.height / 2) - r1.sprite.height * r1.sprite.anchor.y) -
                (r2.sprite.y + Math.abs(r2.sprite.height / 2) - r2.sprite.height * r2.sprite.anchor.y);
        
        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = Math.abs(r1.sprite.width / 2) + Math.abs(r2.sprite.width / 2);
        combinedHalfHeights = Math.abs(r1.sprite.height / 2) + Math.abs(r2.sprite.height / 2);

        //Check whether vx is less than the combined half widths
        if(Math.abs(vx) < combinedHalfWidths)
        {
            //A collision might be occurring!
            //Check whether vy is less than the combined half heights
            if(Math.abs(vy) < combinedHalfHeights)
            {
                //A collision has occurred! This is good!
                //Find out the size of the overlap on both the X and Y axes
                overlapX = combinedHalfWidths - Math.abs(vx);
                overlapY = combinedHalfHeights - Math.abs(vy);

                scale = 1;

                //The collision has occurred on the axis with the
                //*smallest* amount of overlap. Let's figure out which
                //axis that is

                if(overlapX >= overlapY)
                {
                    //The collision is happening on the X axis
                    //But on which side? vy can tell us

                    if(vy > 0)
                    {
                        collision = "top";

                        overlapY = overlapY / scale;

                        //Move the rectangle out of the collision
                        r1.sprite.y = r1.sprite.y + overlapY;

                        //Move the game item out of the collision
                        r1.y = r1.y + overlapY / gridSize;

                        var y = Math.floor(r1.y);
                        var x = Math.floor(r1.x);

                        y = Math.floor(r1.y);
                        x = Math.floor(r1.x);

                        if(y > -1 && x > -1 && grid[Math.floor(r1.y)][Math.floor(r1.x)] == 1)
                        {
                            r1.y = r1.y - overlapY / gridSize / 200;
                        }
                    }
                    else
                    {
                        collision = "bottom";

                        overlapY = overlapY / scale;

                        //Move the rectangle out of the collision
                        r1.sprite.y = r1.sprite.y - overlapY;

                        //Move the game item out of the collision
                        r1.y = r1.y - overlapY / gridSize;

                        var y = Math.floor(r1.y);
                        var x = Math.floor(r1.x);

                        if(y > -1 && x > -1 && grid[Math.floor(r1.y)][Math.floor(r1.x)] == 1)
                        {
                            r1.y = r1.y + overlapY / gridSize / 200;
                        }
                    }
                }
                else
                {
                    //The collision is happening on the Y axis
                    //But on which side? vx can tell us

                    if(vx > 0)
                    {
                        collision = "left";

                        overlapX = overlapX / scale;

                        //Move the rectangle out of the collision
                        r1.sprite.x = r1.sprite.x + overlapX;

                        //Move the game item out of the collision
                        r1.x = r1.x + overlapX / gridSize;

                        // if r1.x is within grid, abort
                        var y = Math.floor(r1.y);
                        var x = Math.floor(r1.x);

                        if(y > -1 && x > -1 && grid[Math.floor(r1.y)][Math.floor(r1.x)] == 1)
                        {
                            r1.x = r1.x - overlapX / gridSize / 200;
                        }
                    }
                    else
                    {
                        collision = "right";

                        overlapX = overlapX / scale;

                        //Move the rectangle out of the collision
                        r1.sprite.x = r1.sprite.x - overlapX;

                        //Move the game item out of the collision
                        r1.x = r1.x - overlapX / gridSize;

                        var y = Math.floor(r1.y);
                        var x = Math.floor(r1.x);

                        if(y > -1 && x > -1 && grid[Math.floor(r1.y)][Math.floor(r1.x)] == 1)
                        {
                            r1.x = r1.x + overlapX / gridSize / 200;
                        }
                    }
                }
            }
            else
            {
                // No collision
            }
        }
        else
        {
            // No collision
        }

        return collision;
    }

    /*
    hitTestRectangle
    ----------------

    Use it to find out if two rectangular sprites are touching.
    Parameters: 
    a. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
    b. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.

    */
    
    hitTestRectangle(r1, r2)
    {
        // Add collision properties
        //if(!r1.sprite._bumpPropertiesAdded) this.addCollisionProperties(r1.sprite);
        //if(!r2.sprite._bumpPropertiesAdded) this.addCollisionProperties(r2.sprite);

        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //A variable to determine whether there's a collision
        hit = false;

        
        vx = (r1.sprite.x + Math.abs(r1.sprite.halfWidth) - r1.sprite.xAnchorOffset) -
                (r2.sprite.x + Math.abs(r2.sprite.halfWidth) - r2.sprite.xAnchorOffset);

        vy = (r1.sprite.y + Math.abs(r1.sprite.halfHeight) - r1.sprite.yAnchorOffset) -
                (r2.sprite.y + Math.abs(r2.sprite.halfHeight) - r2.sprite.yAnchorOffset);
        

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = Math.abs(r1.sprite.halfWidth) + Math.abs(r2.sprite.halfWidth);
        combinedHalfHeights = Math.abs(r1.sprite.halfHeight) + Math.abs(r2.sprite.halfHeight);

        //Check whether vx is less than the combined half widths
        if(Math.abs(vx) < combinedHalfWidths)
        {
            //A collision might be occurring!
            //Check whether vy is less than the combined half heights
            if(Math.abs(vy) < combinedHalfHeights)
            {
                //There's definitely a collision happening
                hit = true;
            }
            else
            {
                // No collision on the y axis
                hit = false;
            }
        }
        else
        {
            // No collision on the x axis
            hit = false;
        }

        return hit;
    }



    bounceOffSurface(o, s)
    {
        if(!o._bumpPropertiesAdded) this.addCollisionProperties(o);

        let dp1, dp2,
            p1 = {},
            p2 = {},
            bounce = {},
            mass = o.sprite.mass || 1;

        //1. Calculate the collision surface's properties
        //Find the surface vector's left normal
        s.sprite.lx = s.sprite.y;
        s.sprite.ly = -s.sprite.x;

        //Find its magnitude
        s.sprite.magnitude = Math.sqrt(s.sprite.x * s.sprite.x + s.sprite.y * s.sprite.y);

        // Find its normalized values
        s.sprite.dx = s.sprite.x / s.sprite.magnitude;
        s.sprite.dy = s.sprite.y / s.sprite.magnitude;

        //2. Bounce the object (o) off the surface (s)

        //Find the dot product between the object and the surface
        dp1 = o.sprite.vx * s.sprite.dx + o.sprite.vy * s.sprite.dy; 

        //Project the object's velocity onto the collision surface
        p1.vx = dp1 * s.sprite.dx;
        p1.vy = dp1 * s.sprite.dy;

        //Find the dot product of the object and the surface's left normal (s.lx and s.ly)
        dp2 = o.sprite.vx * (s.sprite.lx / s.sprite.magnitude) + o.sprite.vy * (s.sprite.ly / s.sprite.magnitude);

        //Project the object's velocity onto the surface's left normal
        p2.vx = dp2 * (s.sprite.lx / s.sprite.magnitude);
        p2.vy = dp2 * (s.sprite.ly / s.sprite.magnitude);

        //Reverse the projection on the surface's left normal
        p2.vx *= -1;
        p2.vy *= -1;

        //Add up the projections to create a new bounce vector
        bounce.x = p1.vx + p2.vx;
        bounce.y = p1.vy + p2.vy;

        //Assign the bounce vector to the object's velocity
        //with optional mass to dampen the effect
        o.sprite.vx = bounce.x / mass;
        o.sprite.vy = bounce.y / mass;
    }

    contain(item, container, bounce = false, extra = undefined)
    {
        if(!item.sprite._bumpPropertiesAdded)
            this.addCollisionProperties(sprite);

        //Give the container x and y anchor offset values, if it doesn't
        //have any
        if (container.xAnchorOffset === undefined) container.xAnchorOffset = 0;
        if (container.yAnchorOffset === undefined) container.yAnchorOffset = 0;
        if (item.sprite.parent.gx === undefined) item.sprite.parent.gx = 0;
        if (item.sprite.parent.gy === undefined) item.sprite.parent.gy = 0;

        //Create a Set called `collision` to keep track of the
        //boundaries with which the sprite is colliding
        let collision = new Set();

        // Left
        if (item.sprite.x - item.sprite.xAnchorOffset < 
            container.x - item.sprite.parent.gx - container.xAnchorOffset)
        {
            if(bounce)
                item.sprite.vx *= -1;

            if(item.sprite.mass)
                item.sprite.vx /= item.sprite.mass;

            item.sprite.x = container.x - item.sprite.parent.gx - container.xAnchorOffset + item.sprite.xAnchorOffset;

            //Make a record of the side which the container hit
            collision.add("left");
        }

        //Top
        if (sprite.y - sprite.yAnchorOffset < container.y - sprite.parent.gy - container.yAnchorOffset)
        {
            if(bounce)
                item.sprite.vy *= -1;

            if(item.sprite.mass)
                item.sprite.vy /= item.sprite.mass;

            item.sprite.y = container.y - item.sprite.parent.gy - container.yAnchorOffset + item.sprite.yAnchorOffset;

            //Make a record of the side which the container hit
            collision.add("top");
        }

        // Right
        if (item.sprite.x - item.sprite.xAnchorOffset + item.sprite.width > 
            container.width - container.xAnchorOffset)
        {
            if(bounce)
                item.sprite.vx *= -1;

            if(item.sprite.mass)
                item.sprite.vx /= item.sprite.mass;

            item.sprite.x = container.width - item.sprite.width - container.xAnchorOffset + item.sprite.xAnchorOffset;

            //Make a record of the side which the container hit
            collision.add("right");
        }

        // Bottom
        if (item.sprite.y - item.sprite.yAnchorOffset + item.sprite.height > 
            container.height - container.yAnchorOffset)
        {
            if(bounce)
                item.sprite.vy *= -1;

            if(item.sprite.mass)
                item.sprite.vy /= item.sprite.mass;

            item.sprite.y = container.height - item.sprite.height - container.yAnchorOffset + item.sprite.yAnchorOffset;

            //Make a record of the side which the container hit
            collision.add("right");
        }

        //If there were no collisions, set `collision` to `undefined`
        if (collision.size === 0) collision = undefined;

        //Return the `collision` value
        return collision;
    }

    hit(a, b, grid, react = false, repluse, scale, global)
    {
        if(!react)
            return this.hitTestRectangle(a, b, global);
        else
            return this.rectangleCollision(a, b, game.gridSize, grid, repluse, scale, global);
    }

    /*
    hitTestCircle
    -------------

    Use it to find out if two circular sprites are touching.
    Parameters: 
    a. A sprite object with `centerX`, `centerY` and `radius` properties.
    b. A sprite object with `centerX`, `centerY` and `radius`.
    */

    collideTestCircle(c1, c2, global = false)
    {
        //Add collision properties
        if(!c1.sprte._bumpPropertiesAdded) this.addCollisionProperties(c1);
        if(!c2.sprte._bumpPropertiesAdded) this.addCollisionProperties(c2);

        let vx, vy, magnitude, combinedRadii, collide;

        //Calculate the vector between the circles’ center points
        if(global)
        {
            //Use global coordinates
            vx = (c2.sprite.gx + (c2.sprite.width / 2) - c2.sprite.xAnchorOffset) - c1.sprite.gx + (c1.sprite.width / 2) - c1.sprite.xAnchorOffset;
            vy = (c2.sprite.gy + (c2.sprite.width / 2) - c2.sprite.yAnchorOffset) - c1.sprite.gy + (c1.sprite.width / 2) - c1.sprite.yAnchorOffset;
        }
        else
        {
            vx = (c2.sprite.x + (c2.sprite.width / 2) - c2.sprite.xAnchorOffset) - c1.sprite.x + (c1.sprite.width / 2) - c1.sprite.xAnchorOffset;
            vy = (c2.sprite.y + (c2.sprite.width / 2) - c2.sprite.yAnchorOffset) - c1.sprite.y + (c1.sprite.width / 2) - c1.sprite.yAnchorOffset;
        }

        //Find the distance between the circles by calculating
        //the vector's magnitude (how long the vector is)
        magnitude = Math.sqrt(vx * vx + vy * vy);

        //Add together the circles' total radii
        combinedRadii = c1.sprite.radius + c2.sprite.radius;

        //Set `collide` to `true` if the distance between the circles is
        //less than their `combinedRadii`
        collide = magnitude < combinedRadii;

        //`collide` will be either `true` or `false`
        return collide;
    }

    /*
    movingCircleCollision
    ---------------------

    Use it to make two moving circles bounce off each other.
    Parameters: 
    a. A sprite object with `x`, `y` `centerX`, `centerY` and `radius` properties.
    b. A sprite object with `x`, `y` `centerX`, `centerY` and `radius` properties.
    The sprites can contain an optional mass property that should be greater than 1.

    */
    movingCircleCollision(c1, c2, global = false)
    {
        //Add collision properties
        if(!c1.sprte._bumpPropertiesAdded) this.addCollisionProperties(c1);
        if(!c2.sprte._bumpPropertiesAdded) this.addCollisionProperties(c2);

        let combinedRadii, overlap, xSide, ySide,
        //`s` refers to the distance vector between the circles
        s = {},
        p1A = {}, 
        p1B = {},
        p2A = {},
        p2B = {},
        collide = false;

        //Apply mass, if the circles have mass properties
        c1.sprite.mass = c1.sprite.mass || 1;
        c2.sprite.mass = c2.sprite.mass || 1;

        //Calculate the vector between the circles’ center points
        if(global)
        {
            //Use global coordinates
            s.vx = (c2.sprite.gx + (c2.sprite.width / 2) - c2.sprite.xAnchorOffset) - c1.sprite.gx + (c1.sprite.width / 2) - c1.sprite.xAnchorOffset;
            s.vy = (c2.sprite.gy + (c2.sprite.width / 2) - c2.sprite.yAnchorOffset) - c1.sprite.gy + (c1.sprite.width / 2) - c1.sprite.yAnchorOffset;
        }
        else
        {
            //Use local coordinates
            s.vx = (c2.sprite.x + (c2.sprite.width / 2) - c2.sprite.xAnchorOffset) - c1.sprite.x + (c1.sprite.width / 2) - c1.sprite.xAnchorOffset;
            s.vy = (c2.sprite.y + (c2.sprite.width / 2) - c2.sprite.yAnchorOffset) - c1.sprite.y + (c1.sprite.width / 2) - c1.sprite.yAnchorOffset;
        }

        //Find the distance between the circles by calculating
        //the vector's magnitude (how long the vector is)
        s.magnitude = Math.sqrt(vx * vx + vy * vy);

        //Add together the circles' total radii
        combinedRadii = c1.sprite.radius + c2.sprite.radius;

        //Figure out if there's a collision
        if(magnitude < combinedRadii)
        {
            //Yes, a collision is happening
            collide = true;

            //Find the amount of overlap between the circles
            overlap = combinedRadii - s.magnitude;

            //Add some "quantum padding" to the overlap
            overlap += 0.3;

            //Normalize the vector.
            //These numbers tell us the direction of the collision
            s.dx = s.vx / s.magnitude;
            s.dy = s.vy / s.magnitude;

            //Find the collision vector.
            //Divide it in half to share between the circles, and make it absolute
            s.vxHalf = Math.abs(s.dx * overlap / 2);
            s.vyHalf = Math.abs(s.dy * overlap / 2);

            //Find the side that the collision is occurring on
            (c1.sprite.x > c2.sprite.x) ? xSide = 1 : xSide = -1;
            (c1.sprite.y > c2.sprite.y) ? ySide = 1 : ySide = -1;

            //Move c1 out of the collision by multiplying
            //the overlap with the normalized vector and adding it to
            //the circles' positions
            c1.sprite.x = c1.sprite.x + (s.dx.vxHalf * xSide);
            c1.sprite.y = c1.sprite.y + (s.dx.vyHalf * ySide);
            //Modify real coordinates
            c1.x = c1.x + (s.dx.vxHalf * xSide) / game.gridSize;
            c1.y = c1.y + (s.dx.vyHalf * ySide) / game.gridSize;

            //Move c2 out of the collision
            c2.sprite.x = c2.sprite.x + (s.dx.vxHalf * -xSide);
            c2.sprite.y = c2.sprite.y + (s.dx.vyHalf * -ySide);
            //Modify real coordinates
            c2.x = c2.x + (s.dx.vxHalf * -xSide) / game.gridSize;
            c2.y = c2.y + (s.dx.vyHalf * -ySide) / game.gridSize;

            //1. Calculate the collision surface's properties

            //Find the surface vector's left normal
            s.lx = s.vy;
            s.ly = -s.vx;

            //2. Bounce c1 off the surface (s)

            //Find the dot product between c1 and the surface
            let dp1 = c1.sprite.vx * s.dx + c1.sprite.vy * s.dy;

            //Project c1's velocity onto the collision surface
            p1A.x = dp1 * s.dx;
            p1A.y = dp1 * s.dy;

            //Find the dot product of c1 and the surface's left normal (s.lx and s.ly)
            let dp2 = c1.sprite.vx * (s.lx / s.magnitude) + c1.sprite.vy * (s.ly / s.magnitude);

            //Project the c1's velocity onto the surface's left normal
            p1B.x = dp2 * (s.lx / s.magnitude);
            p1B.y = dp2 * (s.ly / s.magnitude);

            //3. Bounce c2 off the surface (s)

            //Find the dot product between c2 and the surface
            let dp3 = c2.sprite.vx * s.dx + c2.sprite.vy * s.dy;

            //Project c2's velocity onto the collision surface
            p2A.x = dp3 * s.dx;
            p2A.y = dp3 * s.dy;

            //Find the dot product of c2 and the surface's left normal (s.lx and s.ly)
            let dp4 = c2.sprite.vx * (s.lx / s.magnitude) + c2.sprite.vy * (s.ly / s.magnitude);

            //Project c2's velocity onto the surface's left normal
            p2B.x = dp4 * (s.lx / s.magnitude);
            p2B.y = dp4 * (s.ly / s.magnitude);

            //4. Calculate the bounce vectors

            //Bounce c1
            //using p1B and p2A
            c1.sprite.bounce = {};
            c1.sprite.x = p1B.x + p2A.x;
            c1.sprite.y = p1B.y + p2A.y;

            //Bounce c1
            //using p1A and p2B
            c2.sprite.bounce = {};
            c2.sprite.x = p1A.x + p2B.x;
            c2.sprite.y = p1A.y + p2B.y;

            //Add the bounce vector to the circles' velocity
            //and add mass if the circle has a mass property
            c1.sprite.vx = c1.sprite.bounce.x / c1.sprite.mass;
            c1.sprite.vy = c1.sprite.bounce.y / c1.sprite.mass;
            c2.sprite.vx = c2.sprite.bounce.x / c2.sprite.mass;
            c2.sprite.vy = c2.sprite.bounce.y / c2.sprite.mass;
        }

        return collide;
    }

    /*
    circleCollision
    ---------------

    Use it to prevent a moving circular sprite from overlapping and optionally
    bouncing off a non-moving circular sprite.
    Parameters: 
    a. A sprite object with `x`, `y` `centerX`, `centerY` and `radius` properties.
    b. A sprite object with `x`, `y` `centerX`, `centerY` and `radius` properties.
    c. Optional: true or false to indicate whether or not the first sprite
    should bounce off the second sprite.
    The sprites can contain an optional mass property that should be greater than 1.

    */

    circleCollision(c1, c2, bounce = false, global = false)
    {
        //Add collision properties
        if(!c1.sprte._bumpPropertiesAdded) this.addCollisionProperties(c1);
        if(!c2.sprte._bumpPropertiesAdded) this.addCollisionProperties(c2);

        let magnitude, combinedRadii, overlap,
            vx, vy, dx, dy, s = {},
            collide = false;

        //Calculate the vector between the circles’ center points
        if(global)
        {
            //Use global coordinates
            vx = (c2.sprite.gx + (c2.sprite.width / 2) - c2.sprite.xAnchorOffset) - c1.sprite.gx + (c1.sprite.width / 2) - c1.sprite.xAnchorOffset;
            vy = (c2.sprite.gy + (c2.sprite.width / 2) - c2.sprite.yAnchorOffset) - c1.sprite.gy + (c1.sprite.width / 2) - c1.sprite.yAnchorOffset;
        }
        else
        {
            //Use local coordinates
            vx = (c2.sprite.x + (c2.sprite.width / 2) - c2.sprite.xAnchorOffset) - c1.sprite.x + (c1.sprite.width / 2) - c1.sprite.xAnchorOffset;
            vy = (c2.sprite.y + (c2.sprite.width / 2) - c2.sprite.yAnchorOffset) - c1.sprite.y + (c1.sprite.width / 2) - c1.sprite.yAnchorOffset;
        }

        //Find the distance between the circles by calculating
        //the vector's magnitude (how long the vector is)
        s.magnitude = Math.sqrt(vx * vx + vy * vy);

        //Add together the circles' total radii
        combinedRadii = c1.sprite.radius + c2.sprite.radius;

        //Figure out if there's a collision
        if(magnitude < combinedRadii)
        {
            //Yes, a collision is happening
            collide = true;

            //Find the amount of overlap between the circles
            overlap = combinedRadii - s.magnitude;

            //Add some "quantum padding" to the overlap
            overlap += 0.3;

            //Normalize the vector.
            //These numbers tell us the direction of the collision
            dx = vx / magnitude;
            dy = vy / magnitude;

            //Move circle 1 out of the collision by multiplying
            //the overlap with the normalized vector and subtract it from
            //circle 1's position
            c1.sprite.x -= overlap * dx;
            c1.sprite.y -= overlap * dy;

            c1.x -= overlap * dx;
            c1.y -= overlap * dy;

            // Bounce
            if(bounce)
            {
                //Create a collision vector object, `s` to represent the bounce "surface".
                //Find the bounce surface's x and y properties
                //(This represents the normal of the distance vector between the circles)
                s.x = vy;
                s.y = -vx;

                // Bounce c1 off the surface
                this.bounceOffSurface(c1, s);
            }
        }

        return collide;
    }

    /*
    multipleCircleCollision
    -----------------------

    Checks all the circles in an array for a collision against
    all the other circles in an array, using `movingCircleCollision` (above)
    */
    
    multipleCircleCollision(arrayOfCircles, global = false)
    {
        for(let i = 0; i < arrayOfCircles.length; i++)
        {
            //The first circle to use in the collision check
            var c1 = arrayOfCircles[i];

            for(let j = i + 1; j < arrayOfCircles.length; j++)
            {
                //The second circle to use in the collision check
                let c2 = arrayOfCircles[j];

                //Check for a collision and bounce the circles apart if
                //they collide. Use an optional `mass` property on the sprite
                //to affect the bounciness of each marble
                this.movingCircleCollision(c1, c2, global);
            }
        }
    }

    collide(a, b, react = false, bounce = false, global)
    {
        //If the circles shouldn't react to the collision,
        //just test to see if they're touching
        if(!react)
        {
            return collideTestCircle(a, b);
        }
        else
        {
            if(a.sprite.vx + a.sprite.vy !== 0 && b.sprite.vx + b.sprite.vy !== 0)
            {
                //Yes, they are both moving
                //(moving circle collisions always bounce apart so there's)
                //no need for the third, `bounce`, argument)
                return movingCircleCollision(a, b, global);
            }
            else
            {
                //No, they're not both moving
                return circleCollision(a, b, bounce, global);
            }
        }
    }
}
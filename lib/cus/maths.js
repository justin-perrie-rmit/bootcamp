function createVector2D(x = 0, y = 0)
{
    var vec = new Vector(x, y);

    return vec;
}

class Vector  
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    add(x, y)
    {
        if(x instanceof Vector)
        {
            this.x += x.x || 0;
            this.y += x.y || 0;
            return this;
        }
        if(x instanceof Array)
        {
            this.x += x[0] || 0;
            this.y += x[1] || 0;
            return this;
        }
        this.x += x || 0;
        this.y += y || 0;
        return this;
    }

    sub(x, y)
    {
        if(x instanceof Vector)
        {
            this.x -= x.x || 0;
            this.y -= x.y || 0;
            return this;
        }
        if(x instanceof Array)
        {
            this.x -= x[0] || 0;
            this.y -= x[1] || 0;
            return this;
        }
        this.x -= x || 0;
        this.y -= y || 0;
        return this;
    }

    mult(x, y)
    {
        if(x instanceof Vector)
        {
            this.x *= x.x || 0;
            this.y *= x.y || 0;
            return this;
        }
        
        if(x instanceof Array)
        {
            if(x.length === 1)
            {
                this.x *= x[0] || 0;
                this.y *= x[0] || 0;
            }
            else
            {
                this.x *= x[0] || 0;
                this.y *= x[1] || 0;
            }

            return this;
        }
        
        if(y === undefined)
        {
            this.x *= x || 0;
            this.y *= x || 0;
        }
        else
        {
            
            this.x *= x || 0;
            this.y *= y || 0;
        }

        return this;
    }

    div(x, y)
    {
        if(x instanceof Vector)
        {
            this.x /= x.x || 0;
            this.y /= x.y || 0;
            return this;
        }
        if(x instanceof Array)
        {
            if(x.length === 1)
            {
                this.x /= x[0] || 0;
                this.y /= x[0] || 0;
            }
            else
            {
                this.x /= x[0] || 0;
                this.y /= x[1] || 0;
            }

            return this;
        }

        if(y === undefined)
        {
            this.x /= x || 0;
            this.y /= x || 0;
        }
        else
        {
            this.x /= x || 0;
            this.y /= y || 0;
        }

        return this;
    }

    set(x, y)
    {
        if(x instanceof Vector)
        {
            this.x = x.x || 0;
            this.y = x.y || 0;
            return this;
        }
        if(x instanceof Array)
        {
            this.x = x[0] || 0;
            this.y = x[1] || 0;
            return this;
        }
        this.x = x || 0;
        this.y = y || 0;
        return this;
    }

    heading()
    {
        return Math.atan2(this.y, this.x);
    }

    mag()
    {
        return Math.sqrt(this.magSq());
    }

    magSq()
    {
        const x = this.x;
        const y = this.y;

        return x * x + y * y;
    }

    setMag(n)
    {
        return this.normalise().mult(n);
    }

    normalise(v, target = undefined)
    {
        if(target === undefined)
        {
            target = v.copy();
        }
        else
        {
            target.set(v);
        }

        return target.normalise();
    }

    normalise()
    {
        const length = this.mag();

        if (length !== 0)
            this.mult(1 / length);

        return this;
    }

    limit(max)
    {
        const mSq = this.magSq();

        if (mSq > max * max)
        {
            this.div(Math.sqrt(mSq)).mult(max);
        }

        return this;
    }

    copy()
    {
        return new createVector2D(this.x, this.y);
    }

    dot(x, y)
    {
        if(x instanceof Vector)
            return this.dot(x.x, x.y);

        return this.x * (x || 0) + this.y * (y || 0);
    }

    cross(v)
    {
        return this.x * (v.x || 0)  + this.y * (v.y || 0);
    }

    static random2D()
    {        
        var rand = generate.randomNumber(generate.seed);

        var norm = generate.normalise(rand, generate.seed);        

        return Vector.fromAngle(norm * Math.PI * 2);
    }

    static fromAngle(angle, length = 1)
    {
        return createVector2D(length * Math.cos(angle), length * Math.sin(angle));
    }

    static subtract(v1, v2, target)
    {
        if(!target)
        {
            target = v1.copy();
        }
        else
        {
            target.set(v1);
        }

        target.sub(v2);

        return target;
    }

    display()
    {
        console.log("x: " + this.x + " y: " + this.y);
    }
}
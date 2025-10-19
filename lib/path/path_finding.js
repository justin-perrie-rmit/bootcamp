/**
 * Abstract Class PathFinding
 */

class PathFinding
{
    path = [];
    
    constructor()
    {
        if (this.constructor === PathFinding)
            throw new Error("Abstract classes can't be instantiated.");
    }
    
    search()
    {
        throw new Error("Method 'search()' must be implemented.");
    }
}
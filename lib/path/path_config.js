class PathConfig
{
    mode = undefined;
    range = undefined;
    
    setSoftCellCollisionMode()
    {
        this.mode = (cell, collision) => {                
            return cell <= collision;
        }
    }

    setHardCellCollisionMode()
    { 
        this.mode = (cell, collision) => {
            return cell == 0;
        }
    }

    setNotZeroRange()
    { 
        this.range = (range) => {
            return range != 0;
        }
    }
}
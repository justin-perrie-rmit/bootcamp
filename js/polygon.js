class Polygon  
{
    constructor(points, position, angle, model, overlap)
    {
        this.points = points;   // Transformed Points
        this.position = position;     // Position of shape
        this.angle = angle;     // Direction of shape
        this.model = model;     // "Model" of shape	
        this.overlap = overlap; // Flag to indicate if overlap has occurred
    }
}
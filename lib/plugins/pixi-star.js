/**
 * Draw a star shape with an arbitrary number of points.
 * @ignore
 */
class Star extends PIXI.Polygon {
    /**
     * @param {number} x - Center X position of the star
     * @param {number} y - Center Y position of the star
     * @param {number} points - The number of points of the star, must be > 1
     * @param {number} radius - The outer radius of the star
     * @param {number} [innerRadius=radius / 2] - The inner radius between points, default half `radius`
     * @param {number} [rotation=0] - The rotation of the star in radians, where 0 is vertical
     */
    constructor(x, y, points, radius, innerRadius = radius / 2, rotation = 0) {
        const startAngle = (-1 * Math.PI / 2) + rotation;
        const len = points * 2;
        const delta = Math.PI * 2 / len;
        const polygon = [];

        for (let i = 0; i < len; i++) {
            const r = i % 2 ? innerRadius : radius;
            const angle = (i * delta) + startAngle;

            polygon.push(
                x + (r * Math.cos(angle)),
                y + (r * Math.sin(angle))
            );
        }

        super(polygon);
    }
}

/**
 * Draw a star shape with an arbitrary number of points.
 *
 * _Note: Only available with **@pixi/graphics-extras**._
 * @method PIXI.Graphics#drawStar
 * @param {number} x - Center X position of the star
 * @param {number} y - Center Y position of the star
 * @param {number} points - The number of points of the star, must be > 1
 * @param {number} radius - The outer radius of the star
 * @param {number} innerRadius - The inner radius between points, default half `radius`
 * @param {number} rotation - The rotation of the star in radians, where 0 is vertical
 * @returns {PIXI.Graphics} - This Graphics object. Good for chaining method calls
 */
function drawStar(x, y, points, radius, innerRadius, rotation = 0) {
    return this.drawPolygon(new Star(x, y, points, radius, innerRadius, rotation));
}

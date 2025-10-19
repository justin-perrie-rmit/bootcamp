var heuristic =
{
    manhattan: function(startX, startY, endX, endY)
    {
        var dx = startX - endX;
        var dy = startY - endY;
        
        return dx + dy;
    },

    euclidean:function(startX, startY, endX, endY)
    {
        var x = startX - endX;
        var y = startY - endY;

        return Math.sqrt(x * x + y * y);
    },

    octile: function(startX, startY, endX, endY)
    {
        var dx = startX - endX;
        var dy = startY - endY;

        var F = Math.SQRT2 - 1;
        return (dx < dy) ? F * dx + dy : F * dy + dx;
    },

    chebyshev:function(startX, startY, endX, endY)
    {
        var x = startX - endX;
        var y = startY - endY;

        return Math.max(x, y);
    }
}
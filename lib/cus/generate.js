var generate =
{
    rand:0,
    seed:0,

    randomNumber:function(limit)
    {
        this.rand = (((this.rand * 214013 + 2531011) >> 16) & 32767);
	    return ((this.rand % limit) + 1);
    },

    normalise:function(num, limit)
    {
        return (num - 1) / (limit - 1);
    }
}
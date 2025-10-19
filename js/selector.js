var selector =
{
    techTree:undefined,

    init:function()
    {

    },

    add:function(techTree)
    {
        this.techTree = techTree;
    },

    select:function()
    {
        //return this.techTree[Math.floor(Math.random() * this.techTree.length)];
        return this.techTree[0];
    }
}
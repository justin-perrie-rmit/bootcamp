var director =
{
    learningStyles:[["active","reflective"],["sensing","intuitive"],["visual","verbal"],["sequential","global"]],

    init: function (items)
    {
        for (var i = 0; i < items.length; i++)
        {
            if (items[i].type === "students")
                continue;

            items[i].role = "student";

            // // Assign random teaching style
            // var tIndex = Math.floor(Math.random() * this.teachingStyles.length);
            // items[i].enrolled = this.teachingStyles[tIndex];

            // Assign one random learning style from each pair
            items[i].learningStyles = [];
            for (var j = 0; j < this.learningStyles.length; j++)
            {
                var pair = this.learningStyles[j];
                var lIndex = Math.floor(Math.random() * pair.length);
                items[i].learningStyles.push(pair[lIndex]);
            }
        }
    },

    requestConversation:function(
        conversationUid,
        name1, name2,
        role1, role2
    )
    {
        conversations.generate(
            conversationUid,
            name1, name2,
            role1, role2
        );
    }
}
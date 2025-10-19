var conversations =
{
    networkRegistry:undefined,
    registry:undefined,
    dialogue:undefined,
    locations:undefined,
    
    init:function()
    {
        this.networkRegistry = new Set();
        this.registry = new Set();
        this.dialogue = new Map();

        this.locations = new Map();
    },

    generateNetworkUid:function()
    {
        let networkUid;
        do {
            networkUid = Math.floor(Math.random() * 99999);
        } while (this.networkRegistry.has(networkUid));

        this.networkRegistry.add(networkUid);
        return networkUid;
    },

    generateConversationUid:function(networkUid1, networkUid2)
    {
        let conversationUid;

        conversationUid = networkUid1 * networkUid2;

        this.registry.add(conversationUid);

        return conversationUid;
    },

    generate:function(conversationUid,
        contactName, contacteeName,
        contactRole, contacteeRole)
    {
        console.log("Generate conversation for " + conversationUid);
        console.log("game.player.id " + game.player.id);

        const message = {
            id: conversationUid,
            type: "conversation",
            role:"dumb",
            sendTo: "smart",
            code:game.player.id,
            clock:clock.day,
            topic: "Discussing their plans for an upcoming exam.",
            duration: "medium",
            names: [contactName, contacteeName],
            roles: [contactRole, contacteeRole],
            collaboration: -0.8,
            emotion: "negative",
            conversationType:"static"
        };

        client.sendMessage(message);
    },

    add:function(conversationId, message)
    {
        console.log("add conversationId: " + conversationId);

        if (!this.dialogue.has(conversationId))
        {
            this.dialogue.set(conversationId, []);
        }

        this.dialogue.get(conversationId).push(message);

        console.log(this.dialogue.get(conversationId)[0]);
    },

    get:function(conversationId, contact, location)
    {
        console.log("conversationId:", conversationId);
        console.log(this.dialogue);

        const messages = this.dialogue.get(conversationId);

        if (!messages || messages.length === 0)
        {
            this.dialogue.delete(conversationId); // Safe cleanup
            return true; // No more messages
        }

        if (contact)
        {
            const message = messages.shift();
            console.log("message:", message);
            this.locations.delete(conversationId);
            this.locations.set(conversationId, {"location":location,"message":message});

            if (messages.length === 0)
            {
                this.locations.delete(conversationId);
                this.dialogue.delete(conversationId);
                return true;
            }
        }

        return false;
    },

    // Only called by the player
    display:function(player)
    {
        const message = findDistanceToClosestConversation(player)

        if(message)
        {
            renderer.showConversationText(true);
            renderer.addConversationText(message);
        }
    },

    hasConversationUid:function(networkUid1, networkUid2)
    {
        let conversationUid;

        conversationUid = networkUid1 * networkUid2;

        if(this.registry.has(conversationUid))
        {
            return false;
        }

        return true;
    },

    removeConversationUid:function(networkUid1, networkUid2)
    {
        let conversationUid;

        conversationUid = networkUid1 * networkUid2;

        if(this.registry.has(conversationUid))
        {
            this.registry.delete(conversationUid);
        }
    }
}
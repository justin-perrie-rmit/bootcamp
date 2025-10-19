var client =
{
    remoteHost: "wss://tgame.dev", // base host
    ports: [8765],     // redundant server ports
    address: undefined,
    websocket: undefined,
    role: "dumb",
    messageQueue: [],     // ✅ Queue for messages before connection opens
    connecting: false,    // ✅ Prevent multiple init calls
    retryCount: 0,        // Number of consecutive retries
    maxRetries: 10,       // Maximum retries before showing timeout error

    init: function ()
    {
        if (this.retryCount >= this.maxRetries) {
            alert(
                "Unable to connect to Bootcamp Simulator servers, please try again at a later time " +
                "and contact Justin at justin.perrie@rmit.edu.au immediately."
            );
            return;
        }

        var WebSocketObject = window.WebSocket || window.MozWebSocket;

        if (!WebSocketObject)
        {
            console.log("Your browser does not support WebSocket. Cloud will not work.");
            return;
        }

        // Pick a random port each attempt
        var port = this.ports[Math.floor(Math.random() * this.ports.length)];
        this.address = this.remoteHost + ":" + port;

        console.log("Trying to connect to: " + this.address);

        this.websocket = new WebSocketObject(this.address);

        this.websocket.onopen = () => {
            console.log("WebSocket open on " + this.address);
            this.connecting = false;
            this.retryCount = 0; // reset retries on success

            // ✅ Send queued messages
            while (this.messageQueue.length > 0) {
                const msg = this.messageQueue.shift();
                this.sendMessage(msg);
            }

            // Send initial role message
            this.sendMessage({ role: this.role });
        };

        this.websocket.onmessage = (msg) => this.handleMessage(msg);

        this.websocket.onerror = () => {
            console.log("WebSocket error on " + this.address);
        };

        this.websocket.onclose = () => {
            console.log("WebSocket connection closed. Reconnecting in 1s...");
            this.connecting = false;
            this.retryCount++;
            setTimeout(() => this.init(), 1000); // retries with random port again
        };
    },

    sendMessage: function (message)
    {
        const send = () =>
        {
            console.log("Sending message to server:", message);
            this.websocket.send(JSON.stringify(message));
        };

        if (this.websocket && this.websocket.readyState === WebSocket.OPEN)
        {
            send();
        }
        else
        {
            console.warn("WebSocket not open. Attempting to reconnect...");

            // Try to reconnect
            this.init();

            // Wait a short time for connection to establish, then send
            setTimeout(() =>
            {
                if (this.websocket && this.websocket.readyState === WebSocket.OPEN)
                {
                    send();
                }
                else
                {
                    console.error("Failed to reconnect. Cannot send message:", message);
                }
            }, 500); // 500ms delay to allow connection to open
        }
    },

    handleMessage: function (message)
    {
        console.log("handleMessage");
        let messageObject;
        try
        {
            messageObject = JSON.parse(message.data);
        }
        catch (e)
        {
            console.error("Invalid JSON received:", message.data);
            return;
        }

        console.log("Message received from server:", messageObject);

        if (messageObject.sendTo && messageObject.sendTo !== "dumb")
        {
            console.log("Message not intended for this client role, ignoring.");
            return;
        }

        const type = messageObject.type || "unknown";

        switch (type)
        {
            case "login":
                this.handleLoginMessage(messageObject);
                break;
            case "conversation":
                this.handleConversationMessage(messageObject);
                break;
            case "spoke":
                this.handleSpokenToPlayer(messageObject);
                break;
            case "enrolled_students":
                this.handleEnrolledStudentsMessage(messageObject);
                break;
            default:
                console.warn("Unhandled message type:", type, messageObject);
                break;
        }
    },

    handleLoginMessage: function(messageObject)
    {
        console.log("Login response received:", messageObject);

        if (!messageObject.message) return;

        console.log("Processing login message:", messageObject.message);

        if (messageObject.message === "success")
        {
            game.team = "technology";

            // ✅ Load economy details if provided
            if (messageObject.economy)
            {
                Object.assign(economy, messageObject.economy);
                clock.day = economy.day;
                renderer.theDay = clock.day;

                if (clock.day > 12)
                {
                    alert("Thank you for participating in this experiment. You have reached the maximum number of days you can participate.");
                    return;
                }                

                economy.expenses = new Map(Object.entries(messageObject.economy.expenses));

                // // --- Handle conditional problems from server ---
                if (Array.isArray(messageObject.reason) && messageObject.reason.length > 0)
                {
                    // Map server problem keys to expense keys in game.expenses
                    const problemToExpense = {
                        "rent_problem": "rent",
                        "aircon_heating_problem": "aircon_heating",
                        "food_problem": "food",
                        "social_problem": "social",
                        "family_problem": "family"
                    };

                    economy.penalties = [];

                    messageObject.reason.forEach(problem => {
                        const expenseKey = problemToExpense[problem];
                        if (expenseKey && economy.expenses.has(expenseKey))
                        {
                            const exp = economy.expenses.get(expenseKey);

                            if (Math.random() < 0.2)
                            {
                                economy.penalties.push(exp);
                            }
                        }
                    });
                }

                if(messageObject.bonus)
                {
                    economy.bonus = messageObject.bonus;
                }
            }

            game.startSinglePlayer();
        }
        else
        {
            alert(
                "Login failed.\n\n" +
                "The game code you entered is not valid or has expired.\n" +
                "Please check your code and try again.\n\n" +
                "Tip: Make sure there are no extra spaces before or after the code."
            );
        }
    },

    handleConversationMessage:function (messageObject)
    {
        if (messageObject.message)
        {
            console.log("Processing conversation message:", messageObject.message);
            conversations.add(messageObject.id, messageObject.message);
        }
    },

    handleSpokenToPlayer:function(messageObject)
    {
        console.log(messageObject.message);

        renderer.showTextOutput(messageObject.message);

        if (messageObject.message)
        {
            //console.log("Processing spoken message to the player: ", messageObject.message);
            renderer.generateTextOutput(messageObject.message);
        }
    },

    handleEnrolledStudentsMessage: function (messageObject)
    {
        if (messageObject.enrolled)
        {
            game.updateEnrolledStudentGroups(messageObject.enrolled);
        }
    }
};

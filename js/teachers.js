var teachers =
{
	list:
	{
        "lecturer":
		{
			name:"lecturer",
            frames:1,
            speechType:"passive",
            speechCount:0,
            speechLimit:240,
            passableGrid:[
				[1]
			],
			currentSlide:0
        },
		"narrator":
		{
			name:"narrator",
            frames:1,
            speechType:"passive",
            speechCount:0,
            speechLimit:400,
            passableGrid:[
				[1]
			],
        },
		"librarian":
		{
			name:"librarian",
			selectable:true,
			frames:1,
			radius:20,
            speechType:"active",
            passableGrid:[
				[1]
			],
		},
		"tutor":
		{
			name:"tutor",
			selectable:true,
			frames:1,
			radius:20,
            speechType:"active",
            passableGrid:[
				[1]
			],
		}
    },
    defaults:
	{
		animation:"stand",
		layer:"surface",
		orders:{type:"stand"},
		destination:undefined,
		waitForThreshold:false,
		isStudent:false,	
		selected:false,
		selectable:false,
		hidden:false,
		target:undefined,
		bullet:undefined,
		contact:false,
		talkCount:0,
		talkLimit:240,
		attackRange:0.75,
		exclusionRange:3,
		reloadTimeLeft:0,
		cellCollisionMode:1,
		scaleInnerCollision:0.75,
		scaleOuterCollision:1.00,
		selectionRadius:100,
		selectionBorderShape:"circle",
		hasCollided:false,
		hasCollidedSkin:false,
		hasCollidedStop:false,

		index:undefined,
		grid:undefined,
		path:[],
		start:[],
		end:[],

        outputTest:function()
        {
		},

		processOrders:function()
		{
			switch (this.orders.type)
			{
				case "search":
					this.search();
					break;
				case "leave":
					this.leave();
					break;
				case "searching":
					this.searching();
					break;
				case "talkingToTutor":
					this.talkingToTutor();
					break;
				case "talkToTeacher":
					this.talkToTeacher();
					break;
				case "talkToLibrarian":
					this.talkToLibrarian();
					break;
				case "talk":
					this.talk();
					break;
				case "talking":
					this.talking();
					break;
				case "move":
					this.move();
					break;
				case "moveTo":
                    this.moveTo(this.orders.to);
					break;
				case "turning":
					this.turningTo();
					break;
				case "moving":
					this.movingTo();
					break;
				case "wait":
					this.wait();
					break;
				case "standing":
					this.standing();
					break;
				case "stand":
					this.stand();
					break;
			}
		},

        init()
		{
			this.speechCount = 0;
			this.sprite.scale.set(2, 2);
		},

		update:function()
		{
            if(this.speechType == "passive")
            {
                if(this.name == "lecturer")
                {
                    this.speakLecture();
                }
				else if(this.name == "narrator")
				{
					this.speakNarration();
				}
            }
		},

        speakLecture:function()
        {
			if(this.speechCount == this.speechLimit)
            {
				this.speechCount = 0;

				if(Math.floor(materials.list["slides" + clock.day].index) == 0)
				{
					let slideIndex = Math.floor(lecturer[clock.day-1][materials.list["slides" + clock.day].index].Slide);
					game.slides[slideIndex].sprite.visible = true;
					renderer.addLecturerText(lecturer[clock.day-1][materials.list["slides" + clock.day].index].Line)
					materials.list["slides" + clock.day].index++;
				}
				else
				{
					if(materials.list["slides" + clock.day].index >= lecturer[clock.day-1].length)
					{
						game.slides[lecturer[clock.day-1][materials.list["slides" + clock.day].index-1].Slide].sprite.visible = false;
						renderer.addLecturerText("");
						this.speechCount = 0;
						materials.list["slides" + clock.day].index = 0;
					}
					else
					{
						game.slides[lecturer[clock.day-1][materials.list["slides" + clock.day].index-1].Slide].sprite.visible = false;
						let slideIndex = Math.floor(lecturer[clock.day-1][materials.list["slides" + clock.day].index].Slide);
						game.slides[slideIndex].sprite.visible = true;
	
						renderer.addLecturerText(lecturer[clock.day-1][materials.list["slides" + clock.day].index].Line)
						materials.list["slides" + clock.day].index++;					
					}
				}
			}

			this.speechCount++;
        },

		speakNarration:function()
		{
			if(this.speechCount == this.speechLimit)
            {
				this.speechCount = 0;

				if(Math.floor(materials.list["story" + clock.day].index) == 0)
				{
					renderer.addNarratorText(narrator[clock.day-1][materials.list["story" + clock.day].index].Line)
					materials.list["story" + clock.day].index++;
				}
				else
				{
					if(materials.list["story" + clock.day].index >= narrator[clock.day-1].length)
					{
						renderer.addNarratorText("");
						this.speechCount = 0;
						materials.list["story" + clock.day].index = 0;
					}
					else
					{
						console.log(narrator[clock.day-1][materials.list["story" + clock.day].index].Line);
						renderer.addNarratorText(narrator[clock.day-1][materials.list["story" + clock.day].index].Line)
						materials.list["story" + clock.day].index++;
					}
				}
			}

			this.speechCount++;
		},

		talkToTutor:function()
		{
			this.state.talking = true;
			this.state.talkingToTutor = true;
			this.contact = true;

			this.target = game.items[0];
		},

		talkToTeacher:function()
		{
			console.log("talkToTutor - dialogue box should appear");
			renderer.showDialogue();			
		},

		talkToLibrarian:function()
		{
			console.log("talkToTutor - dialogue box should appear");
			renderer.showDialogue();			
		},

        stand:function()
        {

        }
    }
}
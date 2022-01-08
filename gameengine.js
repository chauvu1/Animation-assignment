// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Context dimensions
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        // Entities to be added at the end of each update
        this.entitiesToAdd = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;

        // THE KILL SWITCH
        this.running = false;
     
        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });
    };

    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        // this.ctx.fillStyle = "Red";
        // this.ctx.strokeStyle = "Red";
        // this.ctx.fillRect(100,110,100,100);
      
      
        // Draw latest things first
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.spritesheet = ASSET_MANAGER.getAsset("./background.png");
        // this.animations = new Animator(this.spritesheet, 0, 32, 32, 32, 4, 0.5, 14, false, true);
        this.ctx.drawImage(this.ctx.spritesheet, 0, 0, 264, 152, 0, 0, 1056, 608);
      
        this.ctx.save();
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);     
        }
       
    };

    update() {
         // Update Entities
         this.entities.forEach(entity => entity.update(this));

         // Remove dead things
         this.entities = this.entities.filter(entity => !entity.removeFromWorld);

         // Add new things
         this.entities = this.entities.concat(this.entitiesToAdd);
         this.entitiesToAdd = [];

    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};

// KV Le was here :)
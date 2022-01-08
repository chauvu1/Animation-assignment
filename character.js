class Character {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet });
      
        this.loadAnimations(spritesheet);
        this.x = -40;
        this.x1 = 1055;
        this.y = 0;
        this.speed = 70;
        this.speed1 = 250;

    };

    loadAnimations(spritesheet) {
        this.walkAnim = new Animator (this.spritesheet, 0, 0, 64, 64, 4, 0.20, 0, false, true);
        this.idleAnim = new Animator (this.spritesheet, 0, 64, 64, 64, 3, 0.5, 0, false, true);
        this.ScooterAnim = new Animator (this.spritesheet, 0, 128, 64, 64, 3, 0.3, 0, false, true);
        this.ScooterIdleAnim = new Animator (this.spritesheet, 0, 128, 64, 64, 3, 0.3, 0, false, true);
    }

        
    draw(ctx) {
        // stop at 850 and then idle animation.
        this.walkAnim.drawFrame(this.game.clockTick, ctx, this.x, 397, 3);
        this.ScooterAnim.drawFrame(this.game.clockTick, ctx, this.x1, 380, 3);
        if (this.x >= 1055) {
            this.x = -40;
            this.x1 = 1055;
            //this.idleAnim.drawFrame(this.game.clockTick, ctx, -40, 397, 3); 
        }
        
        ctx.imageSmoothingEnabled = false;
      
        
    }
    update() {
        this.x += this.speed * this.game.clockTick;
        this.x1 -= this.speed1 * this.game.clockTick;
    }


}
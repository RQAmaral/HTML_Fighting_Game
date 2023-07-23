/*Definition of used Variables*/
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")
const gravity = 0.7
canvas.width = 1024
canvas.height = 576
const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}

/*Canvas Creation*/
c.fillRect[0,0, canvas.width, canvas.height]

/*Definition of class sprite, which gives the sprites properties*/
class Sprite{
    constructor({position, velocity, color}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
        this.color = color
    }

    /*Tells the canvas how to draw the player/enemy*/
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    /*Updates the player/enemy sprite in accordance to their properties*/
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }else{
            this.velocity.y += gravity
        }
    }
}

/*Creates a player*/
const player = new Sprite({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    color: 'red'
})

/*Creates an enemy*/
const enemy = new Sprite({
    position:{
        x:400,
        y:100
    },
    velocity:{
        x:0,
        y:0
    },
    color: 'blue'
})

/*Loops the animate function, in order to refresh the player/enemy animation*/ 
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //Player Movement
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    }else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
    }

    //Enemy Movement
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
    }else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
    }
}

animate()

/*Listens for button presses*/
window.addEventListener('keydown', (event) => {

    switch (event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
        break

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
        break

        case 'w':
            player.velocity.y = -20
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
        break

        case 'ArrowUp':
            enemy.velocity.y = -20
        break
    }
    console.log(event.key)
})

/*Listens for button releases*/
window.addEventListener('keyup', (event) => {

    switch (event.key){
        case 'd':
            keys.d.pressed = false
        break

        case 'a':
            keys.a.pressed = false
        break

        case 'w':
            keys.w.pressed = false
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break

        case 'ArrowUp':
            keys.ArrowUp.pressed = false
        break
    }
    console.log(event.key)
})
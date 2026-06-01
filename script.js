const game = document.getElementById("game");
const bird = document.getElementById("bird");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");

let birdY = 250;
let velocity = 0;
let gravity = 0.5;
let score = 0;
let playing = true;

const pipes = [];

function jump(){
    if(!playing){
        restart();
        return;
    }

    velocity = -8;
}

document.addEventListener("keydown",(e)=>{
    if(e.code === "Space"){
        jump();
    }
});

document.addEventListener("click",jump);

function createPipe(){

    const gap = 170;
    const topHeight = Math.random()*250 + 50;

    const topPipe = document.createElement("div");
    topPipe.className = "pipe topPipe";
    topPipe.style.height = topHeight + "px";
    topPipe.style.left = "400px";

    const bottomPipe = document.createElement("div");
    bottomPipe.className = "pipe bottomPipe";
    bottomPipe.style.height =
        (600-topHeight-gap) + "px";
    bottomPipe.style.left = "400px";

    game.appendChild(topPipe);
    game.appendChild(bottomPipe);

    pipes.push({
        x:400,
        scored:false,
        top:topPipe,
        bottom:bottomPipe
    });
}

setInterval(()=>{
    if(playing){
        createPipe();
    }
},2000);

function gameLoop(){

    if(playing){

        velocity += gravity;
        birdY += velocity;

        bird.style.top = birdY + "px";

        if(birdY < 0 || birdY > 560){
            endGame();
        }

        pipes.forEach(pipe=>{

            pipe.x -= 2;

            pipe.top.style.left = pipe.x + "px";
            pipe.bottom.style.left = pipe.x + "px";

            if(
                pipe.x < 120 &&
                !pipe.scored
            ){
                score++;
                pipe.scored = true;
                scoreText.innerText = score;
            }

            const birdRect =
                bird.getBoundingClientRect();

            const topRect =
                pipe.top.getBoundingClientRect();

            const bottomRect =
                pipe.bottom.getBoundingClientRect();

            if(
                birdRect.left < topRect.right &&
                birdRect.right > topRect.left &&
                birdRect.top < topRect.bottom
            ){
                endGame();
            }

            if(
                birdRect.left < bottomRect.right &&
                birdRect.right > bottomRect.left &&
                birdRect.bottom > bottomRect.top
            ){
                endGame();
            }

        });

    }

    requestAnimationFrame(gameLoop);
}

function endGame(){

    playing = false;

    gameOverScreen.classList.add("show");
}

function restart(){

    pipes.forEach(pipe=>{
        pipe.top.remove();
        pipe.bottom.remove();
    });

    pipes.length = 0;

    birdY = 250;
    velocity = 0;
    score = 0;

    scoreText.innerText = "0";

    gameOverScreen.classList.remove("show");

    playing = true;
}

gameLoop();

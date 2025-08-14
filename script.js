let score = 0;
let cross = true;
let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');
let musicStarted = false; // track if music is started

audio.loop = true;

// start music on first key press
document.addEventListener("keydown", () => {
    if (!musicStarted) {
        audio.play().catch(() => {
            console.log("Autoplay blocked, will play after user interaction.");
        });
        musicStarted = true;
    }
});

document.onkeydown = function (e) {
    if (e.keyCode == 38) { // up arrow
        let dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.keyCode == 39) { // right arrow
        let dino = document.querySelector('.dino');
        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dx + 112 + "px";
    }
    if (e.keyCode == 37) { // left arrow
        let dino = document.querySelector('.dino');
        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dx - 112) + "px";
    }
};

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 93 && offsetY < 52) {
        // stop background music
        audio.pause();
        audio.currentTime = 0;

        // play game over sound
        audiogo.play();

        obstacle.classList.remove('obstacleAni');

        // get highest score
        let storedHighScore = localStorage.getItem("highScore") || 0;

        if (score > storedHighScore) {
            localStorage.setItem("highScore", score);
            gameOver.innerHTML = `🎉 New Highest Score! 🎉<br>Your Score: ${score}`;
        } else {
            gameOver.innerHTML = `Game Over<br>Your Score: ${score}<br>Highest Score: ${storedHighScore}`;
        }

        gameOver.style.visibility = "visible";
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

function updateScore(score) {
    document.getElementById("scoreCont").innerHTML = "Your Score: " + score;
}

let gameSeq=[];
let userSeq=[];

let btns = ['green', 'red', 'yellow', 'blue'];


let start = false;
let level = 0;
let h2 = document.querySelector('h2');
let highScore = level;

document.addEventListener('touchstart', function(event){
    if(start == false){
        console.log("Game Started");
        start = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    }, 250);
}
function userFlash(btn){
    btn.classList.add('user-flash');
    setTimeout(function(){
        btn.classList.remove('user-flash');
    }, 250);
}



function levelUp(){
    userSeq = [];
    level++;
    
    h2.innerText = `Level ${level}`;   

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if(level > highScore){
            highScore = level;
            document.querySelector('.high-score').innerText = `High Score: ${highScore}`;
        }

        h2.innerText=`Game Over! Your score is ${level}. \n Press any key to restart`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },150);
        
        reset();
    }
}


function btnpress(){
    let btn = this;
    userFlash(btn);
   let userColor = btn.getAttribute('id');
   userSeq.push(userColor);
   console.log(userSeq);

   checkAns(userSeq.length-1);

}

let allbtns = document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener('click', btnpress);
}


function reset() {
    gameSeq=[];
    userSeq=[];
    start = false;
    level = 0;
   
}
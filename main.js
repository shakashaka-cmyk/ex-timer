const timer = document.getElementById("timer");
const startB = document.getElementById("startB");
const stopB = document.getElementById("stopB");
const continueB = document.getElementById("continueB");
const endB = document.getElementById("endB");
const resetB = document.getElementById("resetB");

let intervalId = null;
let mode = "idle"
let startTime = null;  // タイマー開始時刻
let elapsed = 0;       // 経過ミリ秒

function startTimer() {
    if(intervalId !== null) return; // すでにタイマーが動いている場合は何もしない

   
    startTime = Date.now() - elapsed;
    intervalId = setInterval(() => {
        elapsed = Date.now() - startTime;
        renderTimeFromElapsed();  // elapsed を使って表示

        if (mode === "countdown" && elapsed >= 60000) {
            clearInterval(intervalId);
            intervalId = null;
            mode = "confirm";
            updateUI();
            //自動進行
           setTimeout(() => {
        if (mode === "confirm" && intervalId === null) {
            mode = "countup";
            elapsed = 60000;
            updateUI();
            startTimer();
                }
            }, 10000)
        }
    }, 10);
}
function updateUI() {
    if (mode === "idle" || mode === "countdown"){
        startB.style.display = "inline-block"
        stopB.style.display = "inline-block"
        continueB.style.display = "none"
        endB.style.display = "none"
        resetB.style.display = "none"
    }

    if (mode === "confirm"){
        startB.style.display = "none"
        stopB.style.display = "none"
        continueB.style.display = "inline-block"
        endB.style.display = "inline-block"
    }

    if (mode === "countup") {
        startB.style.display = "inline-block"
        stopB.style.display = "inline-block"
        continueB.style.display = "none"
        endB.style.display = "none"
        resetB.style.display = "inline-block"   
    }
}


function renderTimeFromElapsed() {
     let displayMs;
    if (mode === "countdown") {
        displayMs = Math.max(0, 60000 - elapsed); // 1分カウントダウン
    } else if (mode === "countup") {
        displayMs = elapsed - 60000;
    } else if (mode === "idle") {
        displayMs = 60000;
    } else if (mode === "confirm") {
        displayMs = 0;
    }

    const hours = Math.floor(displayMs / 3600000);
    const minutes = Math.floor(displayMs % 3600000 / 60000);
    const seconds = Math.floor(displayMs % 60000 / 1000 );
    const centiseconds =  Math.floor(displayMs % 1000 / 10);
        if(displayMs < 3600000){
        timer.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0") +
        ":" +
        String(centiseconds).padStart(2, "0");
         } else {
        timer.textContent =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
    }
}


function autostart() {

  if (intervalId !== null) return;

  if (mode === "idle") {
    mode = "countdown";
  } else if (mode === "countup") {
    mode = "countup";
  }
  
  updateUI();
  startTimer();
};

startB.addEventListener("click", function () {

  if (intervalId !== null) return;

  if (mode === "idle") {
    mode = "countdown";
  } else if (mode === "countup") {
    mode = "countup";
  }
  
  updateUI();
  startTimer();
});
 

stopB.addEventListener("click", function () {
    clearInterval(intervalId);
    intervalId = null
});

continueB.addEventListener("click", function(){
    if (intervalId === null) {
    mode = "countup";
    elapsed = 60000;
    updateUI();
    startTimer();
    }
}); 

endB.addEventListener("click", function(){
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    mode = "idle";
    elapsed = 0;
    updateUI();
    renderTimeFromElapsed();
})

resetB.addEventListener("click", function() {
        if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    mode = "idle";
    elapsed = 0;
    updateUI();
    renderTimeFromElapsed();
});

updateUI();
renderTimeFromElapsed();
autostart();

const theTimer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");

var timer = [0,0,0,0];  //ذخیره دقیقه و ثانیه و صدم ثانیه

var timerRunning = false;

var interval;

function leadingZero(time){
    if (time <= 9){
        time = "0" + time;
    }

    return time;
}

function runTimer() {
    let currentTime = leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);

    theTimer.innerHTML = currentTime;

    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);   // تبدیل صدم ثانیه به دقیقه و گرد کردن
    timer[1] = Math.floor(timer[3]/100)-(timer[0]*60);
    timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));

}

function spellCompare(){
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0,textEntered.length);

  if (textEntered==originText){
     testWrapper.style.borderColor = "lightgreen";
     clearInterval(interval);
  }
  else{
    if(textEntered==originTextMatch){
        testWrapper.style.borderColor = "yellow";
    }
    else{
        testWrapper.style.borderColor = "red";
    }
  }
}

function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

function start(){
    let testEnteredLength = testArea.value.length;

    if(testEnteredLength==0 && timerRunning==false){
      
      timerRunning = true;
      interval = setInterval(runTimer,10);
    }
    
}

testArea.addEventListener("keypress",start);
testArea.addEventListener("keyup",spellCompare);
resetButton.addEventListener("click",reset);
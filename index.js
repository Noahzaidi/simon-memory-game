

var userClickedPattern=[]
 
var gamePattern=[]

var level = 0

buttonColours=["red", "blue", "green", "yellow"]

startGame()

//añadir event listeners/ añadir color al azar

function startGame(){
    $("body").off("keypress").on("keypress", function(){
        level=0;
        


        addPattern();
            
            
        
    });  
}



//añadir la siguiente secuencia de color

function nextSequence(){
    var rundomNumber= (Math.floor(Math.random() * 4))
    return rundomNumber
}   

function gameOver(){
    setBackground("red");
    var audio = new Audio("sounds/wrong.mp3");
        audio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    userClickedPattern=[]
        
    gamePattern=[]
    startGame();
}



//Añadir nuevo  color aleatorio al array del juego

function addPattern() {

    var randomChosenColour= buttonColours[  nextSequence()]

    gamePattern.push(randomChosenColour)
    

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
    level++;
    $("#level-title").text("level " + String(level) );
    console.log(gamePattern)

}

//Play sound
function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Add animtion on buttons when clicked
function animatePress(currentColor) {

    //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");
  
    //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }


//Change the background when buttons are clicked
function setBackground(currentColor) {

    $("body").addClass(currentColor);

    setTimeout(function () {
    $("body").removeClass(currentColor);
    }, 100);

}




$(".btn").click(function (event){

    if (level!=0){

        

        var buttonPressed=String(event.target.id);


        
        userClickedPattern.push(buttonPressed);

        //$("."+buttonPressed ).addClass("pressed")

        playSound(buttonPressed);

        //setBackground(buttonPressed);

        animatePress(buttonPressed);
        console.log(userClickedPattern);
        console.log(gamePattern);

        if (arraysEqualLength(userClickedPattern,gamePattern)){

            if (arraysEqual (gamePattern, userClickedPattern)) {

                setTimeout(function () {
                    addPattern()
                    userClickedPattern=[]
                }, 600);
                
            }

            else{
                gameOver()}
            
            }
        else {
            for(let i = 0; i < userClickedPattern.length; i++) {
                console.log("i:", i);
                console.log("userClickedPattern:", userClickedPattern[i]);
                console.log("userClickedPattern:", gamePattern[i]);
                if (userClickedPattern[i] !== gamePattern[i]) {
                    gameOver();
                    console.log("game over");
                    break;
                }
            }
            }

            
            

        }

    
    
    else {
        setBackground("red")
        playSound("wrong")



    }
        }

    

)


// comparar valores y longitud de arrays
function arraysEqual(a, b) {
    
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function arraysEqualLength(a, b) {
    if (a.length !== b.length) return false;

    return true;
}
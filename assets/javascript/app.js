// start

$("#start").on('click', function(){
    $("#start").remove(); // removing the button when page reloads
    game.loadQuestion();  // calling the loadQuestion function of the object game
})

$(document).on('click','.answer-button',function(e){
    game.clicked(e);

    // checks the entire document since the answer- button is dynamically being loaded here as the page changes
    // e is the event where we are passing through the event for the values of the clicked button
})

$(document).on('click','#end',function(){
    game.reset();

    // checks the entire document since the reset or Start Over button  is dynamically being loaded here as the page changes
})   

// Listing of all the Questions and Answers in an array

var questions=[{

    question: "What was the nickname of President Duvalier of Haiti?",
    answers:["Duv Li","Papa Doc","Papa Duva", "Duva Li"],
    correctAnswer:"Papa Doc",
    image: "https://media.giphy.com/media/3o7WIKZwUrlYvAZKX6/giphy.gif"
   
},


{

    question: "Which book by Ida Tarbell, discussed John D. Rockefeller's company?",
    answers:["The Work of Rockefeller", "The History of the Standard Oil Company","A Brief Background on the Petroleum Industry"],
    correctAnswer:"The History of the Standard Oil Company",
    image: "https://media.giphy.com/media/9X6OGGZ2SNyQ8/giphy.gif"
   
},

{

    question: "What tax was introduced in England and Wales in 1696 but later repealed in 1851?",
    answers:["Sugar tax","Window tax", "Feather tax","Alcohol tax"],
    correctAnswer:"Window tax",
    image: "https://media.giphy.com/media/72HahsJD4atSE/giphy.gif"
   
},


{

    question: "In 1900 Charlotte Cooper became the 1st woman to win an Olympic Gold Medal for which sport??",
    answers:["Tennis","Athletics", "Badminton","Fencing"],
    correctAnswer:"Tennis",
    image: "https://media.giphy.com/media/26BRL34YyzVRCHn20/giphy.gif"
   
},

{

    question: "What 6th century Greek poet is popularly known as the father of drama?",
    answers:["Palatus","Thespis ", "Zadian","Darian"],
    correctAnswer:"Thespis ",
    image: "https://media.giphy.com/media/F9mFf80gWWdoI/giphy.gif"
   
},


{

    question: "Which city is widely believed to be the ancient capital of Wessex?",
    answers:["Winchester","Warlsburg", "Wottsburg","Londonville"],
    correctAnswer:"Winchester",
    image: "https://media.giphy.com/media/l41YbYFrJYj30Zyco/giphy.gif"
   
},

{

    question: "Which country was first to pioneer the old age pension scheme?",
    answers:["America","Turkey", "India","Germany"],
    correctAnswer:"Germany",
    image: "https://media.giphy.com/media/3otPomYAYsXSC1B3nW/giphy.gif"
   
}];



// creating game object

var game = {

    questions: questions, // holds array with all the History Questions
    currentQuestion:0, // keeps track of the current question
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,
    
    countdown: function(){
    // changes the timer
    // posts the timer on the page
    // Checks if the counter is less than or equals to 0, then it shows the message of time up
    //  calls the timeUp function

        game.counter--;
        $("#counter").html(game.counter);
        if(game.counter<=0){
            console.log("Time Up!");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        //loadQestion function is going to load the questions and the answers to the page
        // every 3 seconds the countdown method runs which lowers the counter and posts the counter to the page
        // Also countdown function checks if the counter is less than or equal to 0

        timer=setInterval(game.countdown,3000); 
        $("#sub-wrapper").html('<h2> Time Remaining: <span id ="counter">30</span> Seconds</h2>');
        $("#sub-wrapper").append('<h2>'+questions[game.currentQuestion].question+'</h2>'); // posting the current question from the questionsHistory array
         for(var i=0;i<questions[game.currentQuestion].answers.length;i++){  // loops through until i is less than the amount of answers, in this case 4
            $("#sub-wrapper").append('<button class= "answer-button" id = "button- '+i+'"data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
            //storing the answers at i within the button and posting the button on the page anytime we have the loadQesion function.
         }
        

    },
    nextQuestion: function(){
        clearInterval(timer);
        game.counter=30; // setting the counter back to 30
        $("#counter").html(game.counter); //showing the counter back to the page
        game.currentQuestion++;
        game.loadQuestion();

    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $("#sub-wrapper").html('<h2> Time is UP!</h2>');
        $("#sub-wrapper").append('<h3> The Correct Answer Was:<br>'+questions[game.currentQuestion].correctAnswer+'</h3>');
        // $("#sub-wrapper").html('<h2>You got it right!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3000);
        } else{
            setTimeout(game.nextQuestion,3000);
        }
   

    },
    results: function(){
        clearInterval(timer); // clearing the timer
        $("#sub-wrapper").html("<h2>You are all done!"+"</h3>"); // posting the message when all the questions are answered
        $("#sub-wrapper").append("<h3>Correct Answers: "+game.correct+"</h3>"); // posting the the count of correct questions
        $("#sub-wrapper").append("<h3>Incorrect Answers: "+game.incorrect+"</h3>"); // posting the count of incorrect questions
        $("#sub-wrapper").append("<h3> Unanswered Questions: "+(game.unanswered+"</h3>"));
        $("#sub-wrapper").append("<button id = 'end'> Start Over </button>");
        




    },
    clicked: function(e){
        // clearing the interval
        clearInterval(timer);
        // checks if the current question and the value of the clicked button is the same, then game.answeredCorrectly function runs
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        }else{
            game.answeredIncorrectly(); // if the checks is not the same as current Qustion, answeredIncorrectly function runs
        }


    },
    answeredCorrectly: function(){
        // console.log("Correct Answer!");
        clearInterval(timer); 
        game.correct++;
        $("#sub-wrapper").html('<h2>You got it right!</h2>');
        $("#sub-wrapper").append("<img src='"+questions[game.currentQuestion].image+"'> ");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3000);
        } else{
            setTimeout(game.nextQuestion,3000);
        }
    },
    answeredIncorrectly: function(){
        // console.log("Wrong Answer!");
        clearInterval(timer); 
        game.incorrect++;
        $("#sub-wrapper").html('<h2>Wrong Answer!</h2>');
        $("#sub-wrapper").append('<h3> The Correct Answer Was:<br>'+questions[game.currentQuestion].correctAnswer+'</h3>');
        $("#sub-wrapper").append("<img src='"+questions[game.currentQuestion].image+"'> ");
   

       
        // $("#sub-wrapper").append(https://media.giphy.com/media/3o7WIKZwUrlYvAZKX6/giphy.gif);
        // taking the user to the result page if the answer matches else the next question loads.
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3000);
        } else{
            setTimeout(game.nextQuestion,3000);
        }

    },
    reset: function(){
        game.currentQuestion=0;
        game.counter=0;
        game.correct=0;
        game.incorrect=0;
        game.unanswered=0;
        game.loadQuestion();

    },
}





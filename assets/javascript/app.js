/**
 *  @author Gus Nguyen 
 */

//Startup stuff
$(document).ready(function() {
	display();
	$(".start-button").on("click", function() {
		$(this).attr("hidden", "");
		startTimer();
		setTimeout(stopTimer, time * 1000);
	});
});

//This is the array of questions and answer expected
var obj = {
	"questions" : [
		"Rick's Main Catchphrase",
		"Who does Morty like?",
		"Rick's daughter",
		"Creature from a box that helps with a specific task",
		"Character that makes Morty \"uncomfortable\" in a bathroom",
		"Character that uses the word \"Bitch\" a lot",
		"Hit song Rick improvises to save Earth",
		"What does Jerry's new job pay him with?"
		],

	"answers" : [
		"Wubalubadubdub",
		"Jessica",
		"Beth Smith",
		"Mr. Meeseeks",
		"Mr. Jellybean",
		"Scary Terry",
		"Get Schwifty",
		"Pills"
	],

	"choices" : {
		"Rick's Main Catchphrase": ["The Whirly Dirly", "TO GET RIGGITY RIGGITY WRECKED SON", "Wubalubadubdub"],
		"Who does Morty like?": ["Tommy", "Jessica", "Uncle Ben"],
		"Rick's daughter": ["Beth Smith", "Jerry Smith", "Garzopian"],
		"Creature from a box that helps with a specific task": ["Mr. Meeseeks", "Evil Morty", "Birdperson"],
		"Character that makes Morty \"uncomfortable\" in a bathroom": ["Squanchy","Unity","Mr. Jellybean"],
		"Character that uses the word \"Bitch\" a lot": ["Mr. Poopybutthole","Arthricia","Scary Terry"],
		"Hit song Rick improvises to save Earth": ["Get Schwifty", "The Vindicators", "Froppy Land"],
		"What does Jerry's new job pay him with?": ["Noob Noob", "Pills", "Drugs"]
	}
}

//Global variables
const choiceClass = "btn btn-success answer mx-auto";
const questionClass = "lead";
const divClass = "question-div mx-auto text-center py-3";
const buttonWrapClass = "button-wrap btn-group radio";
var time = 0;
var clockRunning = false;
var intervalId; 
//Using arrow function to simplify the this 
function display() {
	obj["questions"].forEach((value, index, array) => {
		var div =$("<div>"); 
		//Make the question as a header
		var question = $("<h1>").text(value).addClass(questionClass);
		div.append(question).addClass(divClass);
		var choices = makeChoiceButtons(obj["choices"][value], index);
		//Wrapper for choices
		var wrapper = $("<div>").addClass(buttonWrapClass)
			.data("toggle", "buttons");
		choices.forEach((value) => wrapper.append(value));
		div.append(wrapper);
		$(".content").append(div);
	})
}

/**
 *	A function to return an object of premade buttons ready to be added to the DOM
 *	@return {object} object that has field a,b,c for each of the makeChoiceButtons
 */ 
function makeChoiceButtons(choices, index){
	var buttonGroup = [];
	//First we need to get the strings from each array
	for(var i = 0; i < choices.length; i++) {
		//Then we make each string into a text button with a check mark using jQuery
		var button = $("<label>")
		//Populate the button with the required fields.
		.addClass(choiceClass)
		var input = $("<input>").attr("type", "radio").attr("name", `choice${index}`).attr("value", choices[i]);
		//Then we add
		button.append(input);
		button.append(choices[i]);

		buttonGroup.push(button);
	}
	return buttonGroup;

}

/**
 *	Function that goes through every single button checked to record the answer
 */

function grade() {
	var answers = $("input:checked");
	var key = obj.answers;
	for(var i = 0; i < answers.length; i++) {
		var lul = answers[i].value === key[i];
		console.log(lul);
	}
}

/**
 * Timer function 
 */
 function startTimer(){
	  if (!clockRunning) {
	    intervalId = setInterval(function() {
	      time--;
	      $(".timer").text(timeConverter(time));
	    }, 1000);
	    clockRunning = true;
	  }
		$(".timer").removeAttr("hidden");

 }

function stopTimer() {
	clearInterval(intervalId);
	clockRunning = false;
	grade();
}

 //TODO Make time converter
 /** 
  *	Function copied from previous homework as a utility function
  * @see stopwatch week 6
  */
function timeConverter(t) {
  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }

  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}


// Array of available universes for the quiz
let universeOptions = ["Game of Thrones", "Gravity Falls", "Star Wars", "Lord of the Rings"];

// Variables to keep track of the quiz state
let selectedUniverse;          // The universe selected by the user
let questions = [];            // Array to store the questions for the selected universe
let currentQuestion;          // Index of the current question
let score = 0;                 // User's score
let timer = 30;                // Timer for each question in seconds
let startTime;                 // Time when the current question started
let answerSubmitted = false;   // Flag to prevent multiple answers for the same question

// Arrays to store the created buttons
let uButtons = [];            // Universe selection buttons
let qButtons = [];            // Question answer buttons

// Variables to hold images
let universeImg;              // Background image for universe selection
let gotImg;                   // Image for Game of Thrones
let lotrImg;                  // Image for Lord of the Rings
let gfImg;                    // Image for Gravity Falls
let swImg;                    // Image for Star Wars

// Preload function to load images before the sketch starts
function preload() {
  universeImg = loadImage('assets/universe.png'); // Background image
  gotImg = loadImage('assets/got.png');           // Game of Thrones image
  gfImg = loadImage('assets/gf.png');             // Gravity Falls image
  swImg = loadImage('assets/sw.png');             // Star Wars image
  lotrImg = loadImage('assets/lotr.png');         // Lord of the Rings image
}

// Function to display the background universe image with rotation
function universeImage() {
  push(); // Save current drawing state
  translate(width / 2, height / 2); // Move origin to center of canvas
  rotate(radians(90));               // Rotate the image by 90 degrees
  imageMode(CENTER);                  // Draw image from the center
  image(universeImg, 0, 0, height, width); // Draw the background image
  pop(); // Restore original drawing state
}

// Function to display the image corresponding to the selected universe
function questionImage() {
  if (selectedUniverse === "Game of Thrones") {
    image(gotImg, 0, 0, width, height);
  } else if (selectedUniverse === "Gravity Falls") {
    image(gfImg, 0, 0, width, height);
  } else if (selectedUniverse === "Star Wars") {
    image(swImg, 0, 0, width, height);
  } else if (selectedUniverse === "Lord of the Rings") {
    image(lotrImg, 0, 0, width, height);
  }
}

// Helper function to create a styled button for universe selection
function createUniverseButton(text, x, y, callback) {
  let button = createButton(text);      // Create a new button with the given text
  button.position(x, y);                // Position the button on the canvas
  button.size(200, 40);                  // Set button size
  button.style('font-size', '18px');     // Set font size
  button.style('font-family', 'Arial');  // Set font family
  button.style('background-color', '#4CAF50'); // Set background color
  button.style('color', 'white');        // Set text color
  button.style('border', 'none');        // Remove border
  button.style('border-radius', '5px');  // Add rounded corners
  button.style('cursor', 'pointer');     // Change cursor on hover
  button.mousePressed(callback);         // Assign callback function on click
  return button;                         // Return the created button
}

// Setup function runs once at the beginning
function setup() {
  createCanvas(750, 750);        // Create a canvas of 750x750 pixels
  background(220);               // Set background color to light gray
  universeImage();               // Display the background universe image

  // Display the prompt to select a universe
  fill(255);                      // Set text color to white
  textSize(32);                   // Set text size
  textAlign(CENTER, CENTER);      // Center the text
  text("Select a Universe:", width / 2, height / 2 - 100);

  // Create buttons for each universe option
  for (let i = 0; i < universeOptions.length; i++) {
    // Position buttons vertically spaced by 50 pixels
    let button = createUniverseButton(
      universeOptions[i],
      width / 2 - 100,
      height / 2 - 50 + i * 50,
      selectUniverse // Callback when button is pressed
    );
    uButtons.push(button); // Add button to the universe buttons array
  }
}

// Draw function runs continuously (60 times per second by default)
function draw() {
  timerClock(); // Update and display the timer
  fill(0);      // Set fill color to black for any future drawings
}

// Callback function when a universe button is pressed
function selectUniverse() {
  selectedUniverse = this.html(); // Get the text of the pressed button as selected universe

  loadQuestions(); // Load the questions based on the selected universe

  startQuiz();     // Start the quiz
}

// Function to load questions based on the selected universe
function loadQuestions() {
  if (selectedUniverse === "Game of Thrones") {
    questions = [
      {
        question: "What is the name of the main character in Game of Thrones?",
        answers: ["Jon Snow", "Daenerys Targaryen", "Tyrion Lannister", "Arya Stark"],
        correct: 0
      },
      {
        question: "What is the name of the castle where the Stark family lives?",
        answers: ["Winterfell", "King's Landing", "Dragonstone", "Riverrun"],
        correct: 0
      },
      {
        question: "Who is the mother of Jon Snow?",
        answers: ["Cersei Lannister", "Daenerys Targaryen", "Lyanna Stark", "Margaery Tyrell"],
        correct: 2
      },
      {
        question: "What is the name of the Night King's dragon?",
        answers: ["Viserion", "Rhaegal", "Drogon", "None of the above"],
        correct: 0
      },
      {
        question: "Who is the ruler of the Iron Islands?",
        answers: ["Euron Greyjoy", "Yara Greyjoy", "Theon Greyjoy", "Balon Greyjoy"],
        correct: 0
      },
      {
        question: "What is the real name of the character known as the Hound?",
        answers: ["Sandor Clegane", "Gregor Clegane", "Tormund Giantsbane", "Ramsay Bolton"],
        correct: 0
      },
      {
        question: "Which family is known for their gold chain and wealth?",
        answers: ["Lannisters", "Starks", "Tullys", "Baratheons"],
        correct: 0
      },
      {
        question: "What is the ancestral weapon of House Stark?",
        answers: ["Valyrian steel sword", "Longclaw", "Needle", "Lightbringer"],
        correct: 1
      },
      {
        question: "Who sits on the Iron Throne at the end of the series?",
        answers: ["Bran Stark", "Jon Snow", "Daenerys Targaryen", "Sansa Stark"],
        correct: 0
      },
      {
        question: "What is the name of Arya Stark's sword?",
        answers: ["Needle", "Ice", "Longclaw", "Oathkeeper"],
        correct: 0
      },
      {
        question: "Who is known as the 'King Beyond the Wall'?",
        answers: ["Mance Rayder", "Tormund Giantsbane", "Jon Snow", "Stannis Baratheon"],
        correct: 0
      },
      {
        question: "What is the name of Daenerys Targaryen's largest dragon?",
        answers: ["Viserion", "Rhaegal", "Drogon", "Balerion"],
        correct: 2
      }
    ];
  } else if (selectedUniverse === "Gravity Falls") {
    questions = [
      {
        question: "What is the name of the main character in Gravity Falls?",
        answers: ["Dipper Pines", "Mabel Pines", "Grunkle Stan", "Soos Ramirez"],
        correct: 0
      },
      {
        question: "What is the name of the mysterious journal that Dipper finds?",
        answers: ["Journal 1", "Journal 2", "Journal 3", "The Mystery Journal"],
        correct: 0
      },
      {
        question: "Who is the villain of the show?",
        answers: ["Bill Cipher", "Gideon Gleeful", "Lil' Gideon", "The Society of the Blind Eye"],
        correct: 0
      },
      {
        question: "What is the name of the town where the show takes place?",
        answers: ["Gravity Falls", "Mystery Town", "Pineview", "Twin Peaks"],
        correct: 0
      },
      {
        question: "Who is Dipper's crush?",
        answers: ["Wendy Corduroy", "Mabel Pines", "Gideon Gleeful", "Pacifica Northwest"],
        correct: 0
      },
      {
        question: "What is the name of Grunkle Stan's tourist trap?",
        answers: ["The Mystery Shack", "The Gravity Shack", "The Adventure Shack", "The Pines Shack"],
        correct: 0
      },
      {
        question: "What supernatural entity is often featured in Gravity Falls?",
        answers: ["Gnomes", "Goblins", "Yeti", "All of the above"],
        correct: 3
      },
      {
        question: "What is the name of Mabel's pet pig?",
        answers: ["Waddles", "Porky", "Hamlet", "Bacon"],
        correct: 0
      },
      {
        question: "What musical instrument does Soos play?",
        answers: ["Guitar", "Drums", "Piano", "Accordion"],
        correct: 0
      },
      {
        question: "What is the name of the shape-shifting character?",
        answers: ["Blendin Blandin", "Gideon Gleeful", "Bill Cipher", "Ford Pines"],
        correct: 2
      },
      {
        question: "Who is Mabel's twin brother?",
        answers: ["Dipper Pines", "Ford Pines", "Stan Pines", "Grenda"],
        correct: 0
      },
      {
        question: "What secret organization does Ford Pines belong to?",
        answers: ["The Authors", "The Time Travelers", "The Bill Cipher Cult", "The Gravity Falls Initiative"],
        correct: 0
      }
    ];
  } else if (selectedUniverse === "Star Wars") {
    questions = [
      {
        question: "What is the name of the main character in the original Star Wars trilogy?",
        answers: ["Luke Skywalker", "Han Solo", "Leia Organa", "Darth Vader"],
        correct: 0
      },
      {
        question: "What is the name of the planet where Luke grows up?",
        answers: ["Tatooine", "Coruscant", "Dagobah", "Endor"],
        correct: 0
      },
      {
        question: "Who is the main villain of the original Star Wars trilogy?",
        answers: ["Darth Vader", "Emperor Palpatine", "Grand Moff Tarkin", "Boba Fett"],
        correct: 0
      },
      {
        question: "What species is Admiral Ackbar, the character known for saying 'It's a trap!'?",
        answers: ["Twi'lek", "Mon Calamari", "Bothan", "Rodian"],
        correct: 1
      },
      
      {
        question: "Who is the Jedi Master who trains Luke?",
        answers: ["Obi-Wan Kenobi", "Yoda", "Mace Windu", "Qui-Gon Jinn"],
        correct: 1
      },
      {
        question: "What is the name of Han Solo's ship?",
        answers: ["Millennium Falcon", "Star Destroyer", "X-wing", "TIE Fighter"],
        correct: 0
      },
      {
        question: "What species is Chewbacca?",
        answers: ["Ewok", "Wookiee", "Twi'lek", "Rodian"],
        correct: 1
      },
      {
        question: "Who is Luke's twin sister?",
        answers: ["Leia Organa", "Padmé Amidala", "Rey", "Ahsoka Tano"],
        correct: 0
      },
      {
        question: "What is the Sith title held by Darth Vader?",
        answers: ["Darth Sidious", "Darth Maul", "Darth Tyranus", "Lord Vader"],
        correct: 3
      },
      {
        question: "What is the name of the bounty hunter who captures Han Solo?",
        answers: ["Boba Fett", "IG-88", "Dengar", "Bossk"],
        correct: 0
      },
      {
        question: "What is the weapon used by Jedi Knights?",
        answers: ["Blaster", "Lightsaber", "Bowcaster", "Thermal Detonator"],
        correct: 1
      },
      {
        question: "What is the name of the desert planet featured in Episode I?",
        answers: ["Jakku", "Scarif", "Kashyyyk", "Tatooine"],
        correct: 3
      }
    ];
  } else if (selectedUniverse === "Lord of the Rings") {
    questions = [
      {
        question: "What is the name of the main character in The Lord of the Rings?",
        answers: ["Frodo Baggins", "Samwise Gamgee", "Aragorn", "Legolas"],
        correct: 0
      },
      {
        question: "What is the name of the mountain range where Frodo and Sam destroy the One Ring?",
        answers: ["The Misty Mountains", "The White Mountains", "The Grey Mountains", "Mount Doom"],
        correct: 3
      },
      {
        question: "Who is the main villain of The Lord of the Rings?",
        answers: ["Sauron", "Saruman", "Gollum", "The Witch-king of Angmar"],
        correct: 0
      },
      {
        question: "What is the name of the city that is the capital of Gondor?",
        answers: ["Minas Tirith", "Minas Morgul", "Osgiliath", "Dol Amroth"],
        correct: 0
      },
      {
        question: "Who is the leader of the Fellowship of the Ring?",
        answers: ["Frodo Baggins", "Samwise Gamgee", "Aragorn", "Gandalf"],
        correct: 0
      },
      {
        question: "What is the name of Aragorn's sword?",
        answers: ["Anduril", "Glamdring", "Sting", "Narsil"],
        correct: 0
      },
      {
        question: "Which creature guides Frodo and Sam to Mordor?",
        answers: ["Gollum", "Saruman", "Gandalf", "Elrond"],
        correct: 0
      },
      {
        question: "What is the Elvish name for Rivendell?",
        answers: ["Lothlórien", "Minas Tirith", "Imladris", "Mirkwood"],
        correct: 2
      },
      {
        question: "Who kills the Balrog in Moria?",
        answers: ["Frodo", "Legolas", "Gimli", "Gandalf"],
        correct: 3
      },
      {
        question: "What gift does Galadriel give to each member of the Fellowship?",
        answers: ["A sword", "A stone", "A cloak", "A lembas bread"],
        correct: 2
      },
      {
        question: "What is the name of the ent who helps Merry and Pippin?",
        answers: ["Treebeard", "Fangorn", "Quickbeam", "Leaflock"],
        correct: 0
      },
      {
        question: "What is the name of Frodo's loyal horse?",
        answers: ["Shadowfax", "Brego", "Hasufel", "Bill"],
        correct: 3
      }
    ];
  }
}

// Function to start the quiz after a universe is selected
function startQuiz() {
  removeButtons(); // Remove any existing buttons
  background(220); // Reset background
  currentQuestion = 0; // Start from the first question
  score = 0;           // Reset score
  startTime = millis(); // Record the start time
  drawQuestion();     // Display the first question

  // Remove universe selection buttons from the screen
  for (let i = 0; i < uButtons.length; i++) {
    uButtons[i].remove();
  }
  uButtons = []; // Clear the universe buttons array
}

// Function to remove all answer buttons from the screen
function removeButtons() {
  for (let i = 0; i < qButtons.length; i++) {
    qButtons[i].remove();
  }
  qButtons = []; // Clear the question buttons array
}

// Function to display the current question and its answer options
function drawQuestion() {
  removeButtons(); // Remove any existing answer buttons
  background(220); // Reset background
  questionImage(); // Display the image corresponding to the selected universe

  // Display the current question text
  textSize(24);             // Set text size for the question
  fill(255);                // Set text color to white
  textAlign(CENTER, CENTER);
  text(
    questions[currentQuestion].question,
    width / 2,
    height / 2 - 150
  );

  // Create buttons for each answer option
  for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
    let button = createButton(questions[currentQuestion].answers[i]); // Create a button with answer text
    button.position(width / 2 - 100, height / 2 - 50 + i * 50);      // Position the button
    button.size(200, 40);                                           // Set button size
    button.style('font-size', '18px');                              // Set font size
    button.style('font-family', 'Arial');                           // Set font family
    button.style('background-color', '#4CAF50');                    // Set background color
    button.style('color', 'white');                                 // Set text color
    button.style('border', 'none');                                 // Remove border
    button.style('border-radius', '5px');                           // Add rounded corners
    button.style('cursor', 'pointer');                              // Change cursor on hover
    button.mousePressed(checkAnswer);                               // Assign callback for answer selection
    qButtons.push(button);                                          // Add button to the question buttons array
  }

  // Draw the timer rectangle
  fill(225); // Light gray color for the timer background
  rect(75, 40, 600, 30); // Position and size of the timer bar

  // Display the remaining time as text
  fill(0); // Black color for the timer text
  textSize(16);
  textAlign(LEFT, CENTER);
  text("Time Remaining: " + timer.toFixed(0) + "s", 75, 55);
}

// Callback function when an answer button is pressed
function checkAnswer() {
  if (!answerSubmitted) { // Ensure that the user hasn't already submitted an answer for this question
    answerSubmitted = true; // Mark that an answer has been submitted

    let userAnswer = this.html(); // Get the text of the pressed answer button
    let correctAnswer = questions[currentQuestion].answers[questions[currentQuestion].correct]; // Get the correct answer

    fill(255); // Set text color to white for feedback
    textSize(20);
    textAlign(CENTER, CENTER);

    if (userAnswer === correctAnswer) {
      score++; // Increment score if the answer is correct
      text("Correct!", width / 2, height / 2 + 160); // Display "Correct!" feedback
    } else {
      // Display "Incorrect" feedback along with the correct answer
      text("Incorrect. The correct answer is " + correctAnswer, width / 2, height / 2 + 160);
    }

    // Move to the next question after 2 seconds
    setTimeout(nextQuestion, 2000); // 2 second delay
  }
}

// Function to proceed to the next question or end the quiz
function nextQuestion() {
  currentQuestion++; // Move to the next question index

  if (currentQuestion < questions.length) {
    startTime = millis(); // Reset the timer for the new question
    drawQuestion();       // Display the next question
    answerSubmitted = false; // Reset the answer submitted flag
  } else {
    endQuiz(); // If no more questions, end the quiz
  }
}

// Function to display the final score and end the quiz
function endQuiz() {
  removeButtons(); // Remove any remaining buttons
  background(220); // Reset background

  textSize(32); // Set text size for final messages
  fill(0);      // Set text color to black
  textAlign(CENTER, CENTER);

  // Display the user's score out of total questions
  text(
    "Quiz Complete!\nYour score is " + score + " out of " + questions.length,
    width / 2,
    height / 2 - 50
  );

  // Display the percentage of correct answers
  text(
    "You got " + (score / questions.length * 100).toFixed(0) + "% correct",
    width / 2,
    height / 2 + 10
  );

  // Optionally, you can add a "Play Again" button
  let playAgainButton = createButton("Play Again");
  playAgainButton.position(width / 2 - 100, height / 2 + 60);
  playAgainButton.size(200, 40);
  playAgainButton.style('font-size', '18px');
  playAgainButton.style('font-family', 'Arial');
  playAgainButton.style('background-color', '#4CAF50');
  playAgainButton.style('color', 'white');
  playAgainButton.style('border', 'none');
  playAgainButton.style('border-radius', '5px');
  playAgainButton.style('cursor', 'pointer');
  playAgainButton.mousePressed(restartQuiz);
}

// Function to restart the quiz
function restartQuiz() {
  // Remove the Play Again button
  this.remove();

  // Reset variables
  score = 0;
  currentQuestion = 0;
  answerSubmitted = false;

  // Display the universe selection screen again
  background(220);
  universeImage();
  fill(255);                      // Set text color to white
  textSize(32);                   // Set text size
  textAlign(CENTER, CENTER);      // Center the text
  text("Select a Universe:", width / 2, height / 2 - 100);

  // Recreate buttons for each universe option
  for (let i = 0; i < universeOptions.length; i++) {
    // Position buttons vertically spaced by 50 pixels
    let button = createUniverseButton(
      universeOptions[i],
      width / 2 - 100,
      height / 2 - 50 + i * 50,
      selectUniverse // Callback when button is pressed
    );
    uButtons.push(button); // Add button to the universe buttons array
  }
}

// Function to handle the timer for each question
function timerClock() {
  if (currentQuestion < questions.length) { // Only run if there are remaining questions
    let currentTime = millis(); // Get the current time in milliseconds
    let timeElapsed = (currentTime - startTime) / 1000; // Calculate elapsed time in seconds
    timer = 30 - timeElapsed; // Update the timer (30 seconds per question)

    if (timer < 0) {
      timer = 0; // Prevent timer from going negative
    }

    // Calculate the width of the timer bar based on remaining time
    let timerWidth = map(timer, 0, 30, 0, 600);

    // Draw the timer background
    fill(225); // Light gray color for the timer bar background
    rect(75, 40, 600, 30); // Position and size of the timer bar

    // Draw the remaining time as a filled rectangle
    fill(0); // Black color for the remaining time
    rect(75, 40, timerWidth, 30); // Adjust width based on remaining time

    // Display the remaining time as text
    fill(0); // Black color for the timer text
    textSize(16);
    textAlign(LEFT, CENTER);
    text("Time Remaining: " + timer.toFixed(0) + "s", 75, 55);

    // Check if time has run out for the current question
    if (timer <= 0 && !answerSubmitted) {
      answerSubmitted = true; // Prevent multiple triggers
      textSize(20);
      textAlign(CENTER, CENTER);
      let correctAnswer = questions[currentQuestion].answers[questions[currentQuestion].correct];
      text("Time's up! The correct answer was " + correctAnswer, width / 2, height / 2 + 150);
      setTimeout(nextQuestion, 2000); // Move to next question after 2 seconds
    }
  }
}
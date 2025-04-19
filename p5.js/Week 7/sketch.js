// Initial stats for the game character
let stats = {
  hunger: 100,
  dirtiness: 100,
  energy: 100,
  tiredness: 100,
  coins: 3000
};

let statsSaved = false; // Flag to track if stats have been saved

// Image variables
let wolfCheeksImage, wolfSleepImage, livingRoom, energyImage, controllerImage, shopImage, explodeImage, shelvesImage, shopinsideImage, invImage, burgerImage, wolfFaceImage, wolfWashaImage, wolfWashbImage, wolfD1, wolfD2, wolfD3, wolfD4;

// Game state variables
let seconds = 0;
let mainRoomPos = 0, shopPos = 976, shopping = false, inventoryOpen = false;
let wolfXOffset = 0, wolfYOffset = 200, shopX = 897, shopY = 890, shopW = 0, shopH = 0, gameW = 0, gameH = 0;
let invX = 916, invY = 60, invW = 100, invH = 100;
let inventory = {};
let invPosX = 976;
let invWidth = 300;

// Burger and energy item positions
let burgerX = 531, burgerY = 430, burgerW = 75, burgerH = 75;
let energyX = 636, energyY = 428, energyW = 75, energyH = 75;

// State flags
let sleeping = false;
let sleepToggleButton;
let washing = false;
let lastImageSwitch = 0;
let washToggleButton;
let isDead = false;
let deathAnimationStarted = false;
let deathFrame = 0;
let deathTimer = 0;
let restartButton;
let lastCoinIncrement = 0;
let coinEarnRate = 1;
let gamePos = -976;
let playingGame = false;
let flag = false;

// Wolf character attributes
let wolfSize = 100;
let wolfSpeed = 7;

// Preload game assets
function preload() {
  wolfCheeksImage = loadImage('assets/wolfcheeks.png');
  wolfFaceImage = loadImage('assets/wolfface.png');
  wolfSleepImage = loadImage('assets/wolfsleep.png');
  wolfWashaImage = loadImage('assets/washingwolfa.png');
  wolfWashbImage = loadImage('assets/washingwolfb.png');
  livingRoom = loadImage('assets/livingroom.png');
  shopImage = loadImage('assets/shop.png');
  explodeImage = loadImage('assets/boom.png');
  shelvesImage = loadImage('assets/shelves.png');
  shopinsideImage = loadImage('assets/shopinside.png');
  invImage = loadImage('assets/inv.png');
  burgerImage = loadImage('assets/burger.png');
  energyImage = loadImage('assets/monster.png');
  wolfD1 = loadImage('assets/D1.png');
  wolfD2 = loadImage('assets/D2.png');
  wolfD3 = loadImage('assets/D3.png');
  wolfD4 = loadImage('assets/D4.png');
  controllerImage = loadImage('assets/controller.png');
}

// Setup initial canvas and game state
function setup() {
  createCanvas(976, 976);
  loadStats();
  setupGUI();
}

// Setup the game's graphical user interface
function setupGUI() {
  // Create save button
  let saveButton = createButton('Save');
  saveButton.position(5, 5);
  saveButton.mousePressed(saveStats);
  saveButton.style('font-size', '18px');
  saveButton.style('background-color', '#4CAF50');
  saveButton.style('border', 'none');
  saveButton.style('border-radius', '5px');
  saveButton.style('cursor', 'pointer');

  // Display coins
  let coinDisplay = createDiv(`Coins: ${stats.coins}`);
  coinDisplay.position(5, 35);
  coinDisplay.id('coinDisplay');
  coinDisplay.style('font-size', '18px');
  coinDisplay.style('color', '#FFD700');

  // Create sleep toggle button
  sleepToggleButton = createButton('Toggle Sleep');
  sleepToggleButton.position(250, 930);
  sleepToggleButton.mousePressed(toggleSleep);
  sleepToggleButton.style('font-size', '18px');
  sleepToggleButton.style('background-color', '#FF5733');
  sleepToggleButton.style('border', 'none');
  sleepToggleButton.style('border-radius', '5px');
  sleepToggleButton.style('cursor', 'pointer');

  // Create wash toggle button
  washToggleButton = createButton('Toggle Wash');
  washToggleButton.position(400, 930);
  washToggleButton.mousePressed(toggleWash);
  washToggleButton.style('font-size', '18px');
  washToggleButton.style('background-color', '#33CFF5');
  washToggleButton.style('border', 'none');
  washToggleButton.style('border-radius', '5px');
  washToggleButton.style('cursor', 'pointer');
}

// Toggle sleeping state
function toggleSleep() {
  sleeping = !sleeping;
  washing = false;
}

// Toggle washing state
function toggleWash() {
  washing = !washing;
  sleeping = false;
}

// Load player stats from local storage
function loadStats() {
  const savedData = localStorage.getItem('stats');
  if (savedData !== null) {
    stats = JSON.parse(savedData);
  }
}

/**
 * Add item to inventory
 * @param {string} itemName Name of the item to add
 */
function addItemToInventory(itemName) {
  // Get the image associated with the item
  let itemImage;
  if (itemName === "burger") {
    itemImage = burgerImage;
  } else if (itemName === "energy") {
    itemImage = energyImage;
  }

  // If the item is already in the inventory, increment its quantity
  if (inventory[itemName]) {
    inventory[itemName].quantity++;
  } else {
    // Otherwise, add it to the inventory with a quantity of 1
    inventory[itemName] = { image: itemImage, quantity: 1 };
  }
}

// Class representing a falling item
class FallingItem {
  constructor() {
    this.type = random() < 1 / 3 ? 'burger' : 'energy';
    this.image = this.type === 'burger' ? burgerImage : energyImage;
    this.x = random(50, width - 50);
    this.y = 0;
    this.size = 50;
    this.speed = 4 + random(1, 2);
  }

  // Update item position
  update() {
    this.y += this.speed;
    image(this.image, this.x, this.y, this.size, this.size);
  }

  // Check if item is out of bounds
  outOfBounds() {
    return this.y > height + this.size;
  }

  // Check collision with wolf
  checkCollision(wolfX, wolfY, wolfSize) {
    return (
      dist(this.x, this.y, wolfX, wolfY) < (this.size + wolfSize) / 2
    );
  }
}

let fallingItems = []; // Array to store falling items

// Main draw loop
function draw() {
  background(128, 0, 128);
  imageMode(CENTER);

  if (playingGame) {
    // Add new falling items
    if (random() < 0.1) {
      fallingItems.push(new FallingItem());
    }

    // Update falling items
    for (let i = fallingItems.length - 1; i >= 0; i--) {
      let item = fallingItems[i];
      item.update();

      if (item.checkCollision(width / 2 + wolfXOffset, height / 2 + wolfYOffset, 100)) {
        if (item.type === 'burger') {
          stats.hunger = constrain(stats.hunger - 15, 0, 100);
        } else {
          stats.energy = constrain(stats.energy + 1.5, 0, 100);
        }
        fallingItems.splice(i, 1);
      } else if (item.outOfBounds()) {
        fallingItems.splice(i, 1);
      }
    }

    // Move wolf character
    wolfSize = 50;

    if (keyIsDown(65)) {
      wolfXOffset -= wolfSpeed;
    }
    if (keyIsDown(68)) {
      wolfXOffset += wolfSpeed;
    }

    wolfXOffset = constrain(wolfXOffset, -width / 2 + wolfSize / 2, width / 2 - wolfSize / 2);

  } else {
    wolfSize = 100;
  }

  // Display wolf character
  image(wolfFaceImage, width / 2 + wolfXOffset, height / 2 + wolfYOffset, wolfSize, wolfSize);

  // Increment coins over time
  const currentTime = millis();
  if (currentTime - lastCoinIncrement >= 60000) {
    stats.coins++;
    lastCoinIncrement = currentTime;
  }

  // Earn coins when sleeping or washing
  if (sleeping || washing) {
    stats.coins += coinEarnRate / 60;
  }

  // Update coin display
  select('#coinDisplay').html(`Coins: ${floor(stats.coins)}`);

  // Hide buttons when shopping or playing game
  if (shopping || playingGame) {
    sleepToggleButton.hide();
    washToggleButton.hide();
  } else {
    sleepToggleButton.show();
    washToggleButton.show();
  }

  // Display main room or shop based on position
  if (mainRoomPos > -975 || mainRoomPos < 975) {
    push();
    translate(mainRoomPos, 0);
    mainRoom();
    pop();
  }

  if (shopPos < 975) {
    push();
    translate(shopPos, 0);
    shop();
    pop();
  }

  if (gamePos > -970) {
    push();
    translate(gamePos, 0);
    game();
    pop();
  }

  // Handle controller and shop image clicks
  if (mainRoomPos < 10 || gamePos > -10 && !shopping) {
    if (!shopping) {
      checkControllerImageClick();
    }
  }

  if (mainRoomPos > -10 || shopPos < 10) {
    if (!playingGame) {
      checkShopImageClick();
    }
  }

  // Check inventory click and display inventory
  checkInventoryClick();
  displayInventory();
  invPosX = lerp(invPosX, inventoryOpen ? 550 : 1000, 0.1);
  displayStats();

  // Reset sleep and wash states when shopping or playing game
  if (shopping || playingGame) {
    sleeping = false;
    washing = false;
  }

  // Handle room transitions
  if (!isDead && !deathAnimationStarted) {
    mainRoomPos = lerp(mainRoomPos, shopping ? -976 : (playingGame ? 976 : 0), 0.05);
    shopPos = lerp(shopPos, shopping ? 0 : 976, 0.05);
    gamePos = lerp(gamePos, playingGame ? 0 : -976, 0.05);
    if (!playingGame) {
      wolfXOffset = lerp(wolfXOffset, shopping ? -300 : 0, 0.05);
      wolfYOffset = lerp(wolfYOffset, shopping ? 0 : 0, 0.05);
      wolfXOffset = lerp(wolfXOffset, sleeping ? 4200 : 0, 0.003);
      wolfYOffset = lerp(wolfYOffset, sleeping ? 350 : 525, 0.03);
    }

    // Decrease stats over time
    stats.hunger = constrain(stats.hunger - 0.005, 0, 100);
    stats.dirtiness = constrain(stats.dirtiness - 0.003, 0, 100);
    stats.energy = constrain(stats.energy - 0.0005, 0, 100);
    stats.tiredness = constrain(stats.tiredness - 0.001, 0, 100);

    // Update stats based on sleeping or washing state
    if (!playingGame) {
      if (sleeping) {
        stats.tiredness += 0.01;
        stats.energy += 0.002;
        if (wolfXOffset > 210) {
          image(wolfSleepImage, width / 2 + wolfXOffset, height / 2 + wolfYOffset);
        } else {
          image(wolfCheeksImage, width / 2 + wolfXOffset, height / 2 + wolfYOffset);
        }
      } else if (washing) {
        displayWashingAnimation();
        stats.dirtiness += 0.04;
      } else {
        image(wolfFaceImage, width / 2 + wolfXOffset, height / 2 + wolfYOffset);
      }
    }

    // Start death animation if hunger is zero
    if (stats.hunger <= 0) {
      startDeathAnimation();
    }

    displayInventory();
    invPosX = lerp(invPosX, inventoryOpen ? 550 : 1000, 0.1);
  } else if (deathAnimationStarted) {
    startDeathAnimation();
  }
}

// Game function to manage game state
function game() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Catch the energy, avoid the burger (use A & D to move)", width / 2, 70);

  image(controllerImage, 120, height - 60, gameW, gameH);

  stats.energy = constrain(stats.energy - 0.05, 0, 100);
  if (stats.energy <= 0) {
    playingGame = false;
  }
}

// Display washing animation
function displayWashingAnimation() {
  const currentTime = millis();
  if (currentTime - lastImageSwitch > 1000) {
    lastImageSwitch = currentTime;
  }
  const currentImage = (floor((currentTime - lastImageSwitch) / 500) % 2 === 0) ? wolfWashaImage : wolfWashbImage;
  image(currentImage, width / 2 + wolfXOffset, height / 2 + wolfYOffset);
}

// Display stats on screen
function displayStats() {
  const statKeys = ['hunger', 'dirtiness', 'energy', 'tiredness'];
  statKeys.forEach((key, i) => {
    const X = 150 + i * 200;
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(16);
    text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${round(stats[key])}`, X, 10);
    const statWidth = constrain(stats[key], 0, 100);
    fill(255);
    rect(X, 25, 100, 17, 10);
    fill(200, 0, 0);
    rect(X, 25, statWidth, 17, 10);
  });

  // Display save success message
  if (statsSaved) {
    textSize(16);
    fill(200, 0, 0);
    text('Save successful!', 5, 50);
  }

  image(invImage, width - 60, 60);
  checkInventoryClick();
}

// Display main room
function mainRoom() {
  imageMode(CENTER);
  image(livingRoom, width / 2, height / 2);

  shopW = shopImage.width / 2;
  shopH = shopImage.height / 2;
  image(shopImage, shopX, shopY, shopW, shopH);

  gameW = controllerImage.width / 2;
  gameH = controllerImage.height / 2;
  image(controllerImage, 120, height - 60, gameW, gameH);

  window.currentControllerX = 120;
  window.currentControllerY = height - 60;
  window.currentControllerW = gameW;
  window.currentControllerH = gameH;

  window.currentShopX = shopX;
  window.currentShopY = shopY;
  window.currentShopW = shopW;
  window.currentShopH = shopH;
}

// Display shop
function shop() {
  // Display shop interior
  image(shopinsideImage, width / 2 + 24, height / 2 + 24);

  // Display shelves
  image(shelvesImage, width / 2 + 200, height / 2 + 80, 350 * 1.7, 428 * 1.7);

  // Display shop sign
  image(shopImage, shopX, shopY, shopW, shopH);

  // Display food items
  image(burgerImage, burgerX, burgerY, 75, 75);
  image(energyImage, energyX, energyY, 75, 85);

  // Check if mouse is over either food item
  if (mouseX > burgerX - burgerW / 2 && mouseX < burgerX + burgerW / 2 &&
    mouseY > burgerY - burgerH / 2 && mouseY < burgerY + burgerH / 2) {
    // Change cursor to hand
    cursor(HAND);
  } else if (mouseX > energyX - energyW / 2 && mouseX < energyX + energyW / 2 &&
    mouseY > energyY - energyH / 2 && mouseY < energyY + energyH / 2) {
    // Change cursor to hand
    cursor(HAND);
  } else {
    // Change cursor back to arrow
    cursor(ARROW);
  }
}

// Save player stats
function saveStats() {
  statsSaved = true;
  localStorage.setItem('stats', JSON.stringify(stats));

  // Reset the saved flag after 3 seconds
  setTimeout(() => {
    statsSaved = false;
  }, 3000);
}

// Check if the shop image is clicked and toggle the shopping state
function checkShopImageClick() {
  let shopX = window.currentShopX;
  let shopY = window.currentShopY;
  let shopW = window.currentShopW;
  let shopH = window.currentShopH;

  if (mouseX > shopX - shopW / 2 && mouseX < shopX + shopW / 2 &&
    mouseY > shopY - shopH / 2 && mouseY < shopY + shopH / 2) {
    cursor(HAND);
    if (mouseIsPressed) {
      shopping = !shopping;
    }
  } else {
    cursor(ARROW);
  }
}

// Check if the inventory image is clicked
function checkInventoryClick() {
  if (mouseX > invX - invW / 2 && mouseX < invX + invW / 2 &&
    mouseY > invY - invH / 2 && mouseY < invY + invH / 2) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

// Check if the controller image is clicked
function checkControllerImageClick() {
  let controllerX = window.currentControllerX;
  let controllerY = window.currentControllerY;
  let controllerW = window.currentControllerW;
  let controllerH = window.currentControllerH;

  if (
    mouseX > controllerX - controllerW / 2 &&
    mouseX < controllerX + controllerW / 2 &&
    mouseY > controllerY - controllerH / 2 &&
    mouseY < controllerY + controllerH / 2
  ) {
    cursor(HAND);
    if (mouseIsPressed) {
      playingGame = !playingGame;
      shopping = false;
    }
  } else {
    cursor(ARROW);
  }
}

// Handle mouse clicks
function mousePressed() {
  // Do nothing if the player character is dead
  if (isDead) return;

  // Toggle inventory view if the inventory icon is clicked
  if (mouseX > invX - invW / 2 && mouseX < invX + invW / 2 &&
    mouseY > invY - invH / 2 && mouseY < invY + invH / 2) {
    inventoryOpen = !inventoryOpen;
  }

  // Add a burger to inventory if clicked and player has enough coins
  if (mouseX > burgerX - burgerW / 2 && mouseX < burgerX + burgerW / 2 &&
    mouseY > burgerY - burgerH / 2 && mouseY < burgerY + burgerH / 2 &&
    stats.coins >= 10) {
    addItemToInventory("burger");
    stats.coins -= 10;
  }

  // Add an energy item to inventory if clicked and player has enough coins
  if (mouseX > energyX - energyW / 2 && mouseX < energyX + energyW / 2 &&
    mouseY > energyY - energyH / 2 && mouseY < energyY + energyH / 2 &&
    stats.coins >= 20) {
    addItemToInventory("energy");
    stats.coins -= 20;
  }

  // Additional interaction check (customizable)
  let X = invPosX + 5;
  let itemSize = 25;

  // Set a flag if a specific area is clicked while shopping
  if (mouseX > X && mouseX < X + itemSize + 25 &&
    mouseY > 75 && mouseY < 100 + itemSize) {
    if (shopping) {
      flag = true;
    }
  }
}

// Display the inventory
function displayInventory() {
  let X = invPosX + 30;
  let Y = 100;
  let itemSize = 50;
  let inventoryHeight = 200;

  // Draw inventory background
  fill(255);
  rect(invPosX, Y - 30, invWidth, inventoryHeight, 10);

  // Set text size and color for item quantities
  textSize(16);
  fill(0);

  // Loop through each item in the inventory
  for (let itemName in inventory) {
    let item = inventory[itemName];

    // Use the inventory item if the flag is set
    if (flag) {
      useInventoryItem(itemName);
      flag = false;
    }

    // Draw item image
    image(item.image, X, Y, itemSize, itemSize);

    // Draw item quantity
    fill(255, 0, 0);
    textAlign(RIGHT, TOP);
    text(item.quantity, X + itemSize - 5, Y + 5);

    // Update position for the next item
    X += itemSize + 20;
    if (X > invPosX + invWidth - itemSize) {
      X = invPosX + 20;
      Y += itemSize + 20;
    }
  }
}

// Use an item in the inventory
function useInventoryItem(itemName) {
  // Check if the item exists in the inventory and has a positive quantity
  if (inventory[itemName] && inventory[itemName].quantity > 0) {
    inventory[itemName].quantity--;

    // Apply the effect based on the item type
    switch (itemName) {
      case 'burger':
        // Increase hunger stat, ensuring it does not exceed 100
        stats.hunger = min(stats.hunger + 20, 100);
        break;
      case 'energy':
        // Increase energy stat, ensuring it does not exceed 100
        stats.energy = min(stats.energy + 20, 100);
        break;
    }

    // Remove the item from inventory if the quantity reaches zero
    if (inventory[itemName].quantity === 0) {
      delete inventory[itemName];
    }
  }
}

// Start the death animation
function startDeathAnimation() {
  // Begin death animation if not already started
  if (!deathAnimationStarted) {
    deathAnimationStarted = true;
    deathTimer = millis();
  }

  const currentTime = millis();
  // Advance the death frame every second if not all frames have been shown
  if (currentTime - deathTimer > 1000 && deathFrame < 3) {
    deathTimer = currentTime;
    deathFrame++;
  }

  let deathImages = [wolfD1, wolfD2, wolfD3, wolfD4];

  // Display the current frame of the death animation
  if (deathImages[deathFrame]) {
    image(deathImages[deathFrame], width / 2 + wolfXOffset, height / 2 + wolfYOffset);
  }

  // Mark the character as dead after the final frame
  if (deathFrame >= 3) {
    isDead = true;
  }

  // Display the game over screen if the character is dead
  if (isDead) {
    displayGameOver();
  }
}

// Game over screen
function displayGameOver() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(255, 0, 0);
  text('GAME OVER', width / 2, height / 2 - 50);

  // Create the restart button if it doesn't exist
  if (!restartButton) {
    restartButton = createButton('Restart');
    restartButton.position(width / 2 - 50, height / 2 + 50);
    restartButton.mousePressed(restartGame);
    restartButton.style('font-size', '24px');
    restartButton.style('background-color', '#4CAF50');
    restartButton.style('border', 'none');
    restartButton.style('border-radius', '5px');
    restartButton.style('cursor', 'pointer');
  }
}

// Restart the game
function restartGame() {
  // Reset all stats to their initial values
  stats = {
    hunger: 100,
    dirtiness: 100,
    energy: 100,
    tiredness: 100,
    coins: 0
  };

  // Save the new stats
  saveStats();

  // Reset game over variables
  isDead = false;
  deathAnimationStarted = false;
  deathFrame = 0;

  // Remove the restart button
  restartButton.remove();
  restartButton = null;

  // Set up the game again
  setup();
}
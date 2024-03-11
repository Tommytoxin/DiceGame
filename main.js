// Initialize player scores (starting at 0)
let player1Score = 0;
let player2Score = 0;

// Add event listener for "Roll" button click
document.getElementById('rollButton').addEventListener('click', function() {
  // Get player names (defaulting to "Player 1" or "Player 2" if empty)
  let player1 = document.getElementById('player1').value || 'Player 1';
  let player2 = document.getElementById('player2').value || 'Player 2';
  
  // Start a new game round
  diceGame([player1, player2]);
});

// Add event listener for "New Game" button click
document.getElementById('newGameButton').addEventListener('click', function() {
  // Reset game state
  document.getElementById('player1').value = '';
  document.getElementById('player2').value = '';
  document.getElementById('results').innerHTML = '';
  player1Score = 0;
  player2Score = 0;
  document.getElementById('player1Score').innerText = 'Player 1: 0';
  document.getElementById('player2Score').innerText = 'Player 2: 0';
  document.getElementById('rollButton').disabled = false;
});

// Function to simulate a dice roll (returns a random number between 1 and 6)
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to handle the game logic (takes an array of player names)
function diceGame(players) {
  // Initialize variables
  let highestRoll = 0;
  let winner = '';
  let resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  // Array of emoji representations for dice rolls (1 to 6)
  const diceEmoji = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  // Loop through each player
  for (let i = 0; i < players.length; i++) {
    // Simulate a dice roll for the current player
    let roll = rollDice();

    // Display the player's name, rolled value, and emoji representation
    resultsDiv.innerHTML += `${players[i]} rolled <span class="dice">${diceEmoji[roll]}</span><br>`;

    // Update player score and check for winner after each roll
    if (i === 0) { // Player 1
      player1Score += roll;
      document.getElementById('player1Score').innerText = `${players[i]}: ${player1Score}`;
      if (player1Score >= 20) {
        winner = players[i];
        break; // Exit loop if Player 1 wins
      }
    } else { // Player 2
      player2Score += roll;
      document.getElementById('player2Score').innerText = `${players[i]}: ${player2Score}`;
      if (player2Score >= 20) {
        winner = players[i];
        break; // Exit loop if Player 2 wins
      }
    }

    // Keep track of the highest roll so far
    if (roll > highestRoll) {
      highestRoll = roll;
    }
  }

  // Display winner message if a winner was declared during the loop
  if (winner) {
    resultsDiv.innerHTML = `${winner} wins with a score of ${winner === players[0] ? player1Score : player2Score}!`;
  }

  // Disable "Roll" button if a winner is declared
  document.getElementById('rollButton').disabled = !!winner;
}

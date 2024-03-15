# 2048 #

## Initialize ##
1.1 Initialize a 4x4 board to NULL.

1.2 Add two 2's at random positions.

1.3 Create an array out of 16 divs, save it in a variable called 'Grid'.

Upon loading the page, the board should have two 2's in random places.

## Responding to keys ##
2.1 We need two functions that make the digits move horizontally if the right or left keys are pressed: the digits should be pushed to the 

side (right or left) and be added in that order if they are equal.

2.2 Add zeros at the end (right key pressed) or beginning (left key pressed).

2.3 Add a random 2 or 4 at an available cell on the board.

2.3.1 Write a function that stores the indexes of free cells - both row and column - to be passed to the addNumber() function.

3.1 Two more functions that respond to the up and down keys: digits should move up or down and be added in that order.

3.2 Add zeros at the end (up arrow pressed) or at the top (down arrow pressed).

3.3 Add a 2 or a 4 at a random position on available cells, calling addNumber().

## Checking for Winner or Game Over ##
4.1 The Winner variable should be initialized to false and change to true if the board has the number 2048.

4.2 If the array board doesn't have any null values left, a function to check if there are possible movements should be called:

4.2.1 The possibleMoves() function should iterate through the array and check if there are adjacent equal numbers, ex: [2,4,2,2], if 

 true then the game continues, else Game Over!

## Render Board ##
5.1 Render the board based on the board variable: the renderBoard() function should loop through the board array and render the contents 

into the divs based on the div's ID using .innerText.

5.2 Change .style.backgroundColor depending on the number inside the div using object COLORS (initialized as a constant that contains the 

corresponding color to each number).


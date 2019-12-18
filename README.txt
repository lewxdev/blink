Connect Four


Two Player Game using CSS, HTML, and JavaScript

Developed and designed by Paul Racisz, Javaughn Lewis, Ben McKenzie, and Cheria Artis
Students at Kenzie Academy for individual graded assessment and portfolio


Objectives

Be the first to have four of your chips in a vertical, horizontal, or diagonal.

x       x x x x          x
x                          x
x                            x
x                              x


Game Play

The game displays the instructions and which color has the current turn.
Each player takes a turn placing a chip on the board.
Once four of the same color chips are in a vertical, horizontal, or diagonal, that player wins.
If the board is full and no win is detected, the game is a tie.
The game displays the results when a win or a tie is detected.

**********************************************************************************************

Group Outline

1. Initialization
    A. Display a red or black disc.
    B. Stack red and black discs in a column using a flex box layout.
        a. Display a full board consisting of 7 columns.
2. Game Play
    A. Set a click handler function for each column that adds an additional disc.
    B. Take turns! Toggle the color of each successive disc added.
    C. Keep track of what color disc is at each position in the board. You should be able to console.log() debugging output after each move showing the state of the board.
    D. Once a column is full (has 6 discs), don't allow any more discs to be added.
3. Win/Tie Conditions
    A. Check whether the last disc added completed a four-in-a-row within the column (vertically).
    B. Check whether the last disc added completed four-in-a-row horizontally.
    C. Check whether the last disc added completed four-in-a-row on either an upward- or downward-sloping diagonal.
    D. Alert players of win or tie
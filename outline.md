

// grid: (HTMLElement) the main grid
    // turn: (number) flag determines player's turn

// initialGrid: => (array) creates the grid in the DOM
// return a 2D array of each cell element
    // gridArr: (array) the return array

    // outer for loop: iterate over each column --> `columnIndex`
        // column: (HTMLDivElement) column `columnIndex` of `grid`
        // sets the class to "column"
        // add a tabindex
        // add `column` to the DOM

        // add a new array (column) to `gridArr`

        // inner for loop: iterates over each cell --> `cellIndex`
            // cell: (HTMLDivElement) cell `cellIndex` of `column` of `grid`
    // set class to "cell center" 
    // add `cell` to `column` in the DOM
    // add `cell` to column in `gridArr`




        /* at this point, all cells for `column`
           have been created, added to the DOM, and the return array */

        // the onclick event handler for `column`
            // for... of...: iterates over each `cell` in `column`
                // IF `cell` doesnt have chip
                    // chip: (HTMLDivElement) a new chip
                     // set class to "chip p0/1"
                        // chip Coords represents the x and y positioning on the flex box grid.
                        // checking to see if we have 4 vertical ajacent tiles
                        /* if player wins, we display which player won
                        and refresh the page to start a new game */


/* this function is going to check a win condition based on the x and y
coordinates of the chip that was last placed. */
    // the cell that the chip is inside, holds the value of its x and y coordinates.
        // initialize a string that will fill with 1's and 0's and check for a vertical win.
        /*for each chip in the column, fill the string with a 1 for each black, and
    /* check to see if the string has 4 red values or black values ajacent in the column
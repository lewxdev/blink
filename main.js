// grid: (HTMLElement) the main grid
const grid = document.querySelector("main#grid")
    // turn: (number) flag determines player's turn
let turn = 0

// initialGrid: => (array) creates the grid in the DOM
// return a 2D array of each cell element
const initialGrid = function() {
    // gridArr: (array) the return array
    const gridArr = []

    // outer for loop: iterate over each column --> `columnIndex`
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        // column: (HTMLDivElement) column `columnIndex` of `grid`
        const column = document.createElement("div")
        column.className = "column" // sets the class to "column"
        column.setAttribute("tabindex", columnIndex + 1) // add a tabindex
        grid.appendChild(column) // add `column` to the DOM

        gridArr.push([]) // add a new array (column) to `gridArr`

        // inner for loop: iterates over each cell --> `cellIndex`
        for (let cellIndex = 0; cellIndex < 6; cellIndex++) {
            // cell: (HTMLDivElement) cell `cellIndex` of `column` of `grid`
            const cell = document.createElement("div")
            cell.className = "cell center" // set class to "cell center"
            column.appendChild(cell) // add `cell` to `column` in the DOM

            gridArr[columnIndex].push(cell) // add `cell` to column in `gridArr`
        }

        /* at this point, all cells for `column`
           have been created, added to the DOM, and the return array */

        // the onclick event handler for `column`
        column.onclick = () => {
            // for... of...: iterates over each `cell` in `column`
            for (let [index, cell] of Array.from(column.children).entries()) {
                // IF `cell` doesnt have chip
                if (!cell.querySelector(".chip")) {
                    // chip: (HTMLDivElement) a new chip
                    const chip = document.createElement("div")
                    chip.className = `chip p${turn}` // set class to "chip p0/1"
                    cell.appendChild(chip) // add to `cell` in the DOM
                        // chip Coords represents the x and y positioning on the flex box grid.
                    const chipCoords = { x: index, y: columnIndex }
                        // checking to see if we have 4 vertical ajacent tiles
                    if (checkWin(chipCoords)) {
                        /* if player wins, we display which player won
                        and refresh the page to start a new game */
                        alert(`Player ${turn + 1} Won!`)
                        location.reload()
                    } else turn = turn === 0 ? 1 : 0
                        // if no player won, let's continue the game by switching to the next turn.
                    break
                }
            }
        }
        column.onkeyup = (event) => {
            // press tab to select the columns and hit enter to place a tile
            if (event.key === "Enter") column.onclick()
        }
    }

    return gridArr
        // returning the array that represents the grid, so we can check it for a win.
}()


/* this function is going to check a win condition based on the x and y
coordinates of the chip that was last placed. */
function checkWin(coordinates) {
    // the cell that the chip is inside, holds the value of its x and y coordinates.
    const chipCell = initialGrid[coordinates.x][coordinates.y]
        // initialize a string that will fill with 1's and 0's and check for a vertical win.
    let vertStr = ""

    chipCell.parentElement.querySelectorAll(".chip").forEach(chip =>
        /*for each chip in the column, fill the string with a 1 for each black, and a red
        for each 0 */
        vertStr += chip.classList.contains("p0") ? "0" : "1"
    )

    if (vertStr.includes(turn === 0 ? "0000" : "1111"))
    /* check to see if the string has 4 red values or black values ajacent in the column
    this is how the game can check for a vertical win. */
        return true
}
const grid = document.querySelector("#grid")
const cells = []

const createGrid = function() {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const column = document.createElement("div")
        column.className = "column"
        grid.appendChild(column)
        cells.push([])

        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            const cell = document.createElement("div")
            cell.className = "cell"
            column.appendChild(cell)
            cells[columnIndex].push(cell)
        }
    }
    console.log(cells)
}()

function checkWin(chip) {


    chip.parentElement
}

// turn: (number) flag that determines which player's move it is
let turn = 0
    // gridColumns: (NodeList) all elements on the page with a class of "column"
const gridColumns = document.querySelectorAll(".column")

gridColumns.forEach(column =>
    // setting the onclick event handler for each column
    column.onclick = () => {
        // for each child element of this column, let cell = the current child
        for (let cell of column.children) {
            // if this cell doesn't have any element with the class "chip"
            if (!cell.querySelector(".chip")) {
                // create a chip with the current player's color and add it to this cell
                const chip = document.createElement("div")
                chip.classList.add("chip", `p${turn}`)
                cell.appendChild(chip)

                // switch turns and break
                turn = turn === 0 ? 1 : 0
                break
            }
        }
    }
)
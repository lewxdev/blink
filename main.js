// grid: (HTMLElement) the main grid
const grid = document.querySelector("#grid")
    // cells: (array) a two-dimensional indexed array of each cell element
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

// turn: (number) flag that determines which player's move it is
let turn = 0
    // gridColumns: (NodeList) all elements on the page with a class of "column"
const gridColumns = document.querySelectorAll(".column")

function findPlaceOf(chip) {
    let coordinates = { x: 0, y: 0 }

    grid.childNodes.forEach((column, index) => {
        if (column.contains(chip)) {
            coordinates.x = index
            column.childNodes.forEach((cell, index) => {
                if (cell.contains(chip))
                    coordinates.y = index
            })
        }
    })

    return coordinates
}

function checkWin(coordinates) {
    const chipCell = cells[coordinates.x][coordinates.y]
    let vertStr = ""

    chipCell.parentElement.querySelectorAll(".chip").forEach(chip =>
        vertStr += chip.classList.contains("p0") ? "0" : "1"
    )

    if (vertStr.includes(turn === 0 ? "0000" : "1111"))
        return true
}

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
                if (checkWin(findPlaceOf(chip))) {
                    alert(`Player ${turn + 1} Won!`)
                    location.reload()
                        // switch turns and break
                } else turn = turn === 0 ? 1 : 0
                break
            }
        }
    }
)
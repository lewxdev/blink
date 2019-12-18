// grid: (HTMLElement) the main grid
const grid = document.querySelector("main#grid")
// turn: (number) flag determines player's turn
let turn = 0

// initialGrid: => (array) creates the grid in the DOM
// return a 2D array of each cell element
const initialGrid = function () {
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
					
					const chipCoords  = { x: index, y: columnIndex }
					
					if (checkWin(chipCoords)) {
						alert(`Player ${turn + 1} Won!`)
						location.reload()
					} else turn = turn === 0 ? 1 : 0
					break
				}
			}
		}
		column.onkeyup = (event) => {
			if (event.key === "Enter") column.onclick()
		}
	}
	
	return gridArr
}()

function checkWin(coordinates) {
	const chipCell = initialGrid[coordinates.x][coordinates.y]
	let vertStr = ""

	chipCell.parentElement.querySelectorAll(".chip").forEach(chip => 
		vertStr += chip.classList.contains("p0") ? "0" : "1"
	)

	if (vertStr.includes(turn === 0 ? "0000" : "1111"))
		return true
}
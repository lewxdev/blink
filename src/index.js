const turnIndicator = document.querySelector("#turn-indicator")
const grid = document.querySelector("main#grid")
let turn = 0

function initalGrid() {
    grid.innerHTML = null
    const gridArr = []

    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {

        const column = document.createElement("div")
        column.className = "column"
        column.setAttribute("tabindex", columnIndex + 1)
        grid.appendChild(column)

        gridArr.push([])

        for (let cellIndex = 0; cellIndex < 6; cellIndex++) {
            const cell = document.createElement("div")
            cell.className = "cell center"
            column.appendChild(cell)

            gridArr[columnIndex].push(cell)
        }

        column.onclick = () => {
            for (let [index, cell] of Array.from(column.children).entries()) {
                if (!cell.querySelector(".chip")) {
                    const chip = document.createElement("div")
                    chip.className = `chip p${turn}`
                    cell.appendChild(chip)
                    const chipCoords = { y: index, x: columnIndex }

                    if (checkWin(chipCoords)) {
                        alert(`Player ${turn + 1} Won!`)
                        game = initalGrid()
<<<<<<< HEAD:main.js
                    } else turn = turn === 0 ? 1 : 0

                    turnStatus.className = `turncolor${turn}`
=======
					} else turn = turn === 0 ? 1 : 0
					
                    turnIndicator.className = `chip p${turn}`
>>>>>>> 81e977d93b7f2f2b3cf89e61419e05f15ce993a5:src/index.js
                    break
                }
            }
        }
        column.onkeyup = (event) => {
            if (event.key === "Enter") column.onclick()
        }
    }
    turnIndicator.className = `chip p${turn}`
    return gridArr
}
let game = initalGrid();

<<<<<<< HEAD:main.js
document.querySelector(".close").onclick = function() {
    document.querySelectorAll(".info, .close").forEach(element => element.classList.toggle("hidden"))
=======
document.querySelector(".close").onclick = function () {
	document.querySelectorAll(".info, .close, .content-container").forEach(element => element.classList.toggle("hidden"))
>>>>>>> 81e977d93b7f2f2b3cf89e61419e05f15ce993a5:src/index.js
}

function checkWin(coordinates) {
    const chipCell = game[coordinates.x][coordinates.y]
    let vertStr = ""
    let negDiagStr = ""
    let win = false

    for (let yIndex = coordinates.y; yIndex >= 0; yIndex--) {
        const currentCell = game[coordinates.x][yIndex].querySelector(".chip")
        vertStr += currentCell.classList.contains("p0") ? 0 : 1
        console.log(vertStr)
        if (vertStr.includes(turn === 0 ? "0000" : "1111")) {
            return true
        } else if (coordinates.y >= 3) {
            // we only want to check for a negative diaganol win if the y is greater than 3
            for (yIndex = coordinates.y; yIndex >= 0; yIndex--) {
                // starting off the for loop by counting down from the y position of the current chip
                const currentCell = game[coordinates.x][yIndex].querySelector(".chip")
                    // grabbing the coords of the current chip
                console.log(currentCell)
                for (coordinates.x = 0; coordinates.x <= coordinates.y; coordinates.x++) {
                    // at the same time, we want to be increasing the x coords that we are checking
                    negDiagStr += currentCell.classList.contains("p0") ? 0 : 1
                    if (negDiagStr.includes(turn === 0 ? "0000" : "1111")) {
                        return true
                    }
                }
            }
        }
    }
}
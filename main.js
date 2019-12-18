const turnStatus = document.querySelector("#turnstatus")
const grid = document.querySelector("main#grid")
let turn = 0

const initialGrid = function() {
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
                        location.reload()
                    } else turn = turn === 0 ? 1 : 0
                    turnStatus.className = `turncolor${turn}`
                    break
                }
            }
        }
        column.onkeyup = (event) => {
            if (event.key === "Enter") column.onclick()
        }
    }
    turnStatus.className = `turncolor${turn}`

    return gridArr
}()


function checkWin(coordinates) {
    const chipCell = initialGrid[coordinates.x][coordinates.y]
    let vertStr = ""
    let horzStr = ""

    grid.querySelectorAll(".column")

    chipCell.parentElement.querySelectorAll(".chip").forEach(chip =>
        vertStr += chip.classList.contains("p0") ? "0" : "1"
    )

    if (vertStr.includes(turn === 0 ? "0000" : "1111"))
        return true
}
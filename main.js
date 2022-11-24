

var gameData = {
    constant: new Decimal(0),
    constantCost: new Decimal(20),
    points: new Decimal(10),
    buildings: {
        generators: new Decimal(0),
        capacitator: new Decimal(0)
    } 
  }
function calculateGenPPS() {
    return gameData.buildings.generators.divide(calculateConstantSCapDivisor())
}
function calculateCapBoost() {
    return gameData.buildings.capacitator.multiply(10)
}
function calculatePointPerSecond() {
    return calculateGenPPS()
}
function calculateConstantCost() {
    return (gameData.constant.plus(2)).multiply((gameData.constant.plus(1)).multiply(20)).divide(2)
}
function calculateBuildingCost(building) {
    if (building == 1) {
        return new Decimal(10).multiply(new Decimal(1.3).pow(gameData.buildings.generators))
    }
    if (building == 2) {
        return new Decimal(15).multiply(new Decimal(1.5).pow(gameData.buildings.capacitator))
    }
}
function buyConstant(number) {
    if (gameData.points.greaterThanOrEqualTo(calculateConstantCost())) {
        gameData.constant = gameData.constant.plus(number)
        gameData.buildings.generators = new Decimal(0)
        gameData.points = new Decimal(10)
    }
}


function buyBuilding(building) {
    if (building == 1) {
        if (gameData.points.greaterThanOrEqualTo(calculateBuildingCost(1))) {
            gameData.points = gameData.points.minus(calculateBuildingCost(1))
            gameData.buildings.generators = gameData.buildings.generators.plus(1)
        }
    }
    if (building == 2) {
        if (gameData.points.greaterThanOrEqualTo(calculateBuildingCost(2))) {
            gameData.points = gameData.points.minus(calculateBuildingCost(2))
            gameData.buildings.capacitator = gameData.buildings.capacitator.plus(1)
        }
    }
}
function calcMaxInfoBuilding(base, exponent, currentOwned) {
    numerator = gameData.points.multiply(exponent.minus(1))
    denominator = base.multiply(new Decimal(exponent).pow(currentOwned)) 
    fraction = ((numerator.divide(denominator)).plus(1))
    var max = fraction.log(exponent).floor()
    var cost =  (base.multiply(exponent.pow(currentOwned)).multiply(exponent.pow(max).minus(1))).divide(exponent.minus(1))
    return [max, cost]
}
function buyMultiBuilding(building) {
    if (building == 1) {
       maxInfo = calcMaxInfoBuilding(new Decimal(10), new Decimal(1.3), gameData.buildings.generators)
        gameData.points = gameData.points.minus(maxInfo[1])
        gameData.buildings.generators = gameData.buildings.generators.plus(maxInfo[0])
    }
    if (building == 2) {
        maxInfo = calcMaxInfoBuilding(new Decimal(15), new Decimal(1.5), gameData.buildings.capacitator)
        console.log(maxInfo)
         gameData.points = gameData.points.minus(maxInfo[1])
         gameData.buildings.capacitator = gameData.buildings.capacitator.plus(maxInfo[0])
     }
}



function updateText() {
    document.getElementById("generatorCount").textContent = "Cost: " + calculateBuildingCost(1).toFixed(1)
    document.getElementById("genAmount").textContent = gameData.buildings.generators
    document.getElementById("genPPS").textContent = calculateGenPPS().toFixed(2) + " Points/sec"
    document.getElementById("genMax").textContent = "Max Cost (" + calcMaxInfoBuilding(new Decimal(10), new Decimal(1.3),gameData.buildings.generators)[0] + "): " + calcMaxInfoBuilding(new Decimal(10), new Decimal(1.3), gameData.buildings.generators)[1].toFixed(1) + " Points"
    document.getElementById("capRow").style.display = unlockCapacitator() ? "table-row" : "none"
    document.getElementById("capacitatorCount").textContent = "Cost: " + calculateBuildingCost(2).toFixed(1)
    document.getElementById("capacitatorAmount").textContent = gameData.buildings.capacitator
    document.getElementById("capBoost").textContent = "+" + calculateCapBoost().toFixed(2) + " to Constant softcap"
    document.getElementById("capMax").textContent = "Max Cost (" +calcMaxInfoBuilding(new Decimal(15), new Decimal(1.5), gameData.buildings.capacitator)[0] + "): " + calcMaxInfoBuilding(new Decimal(15), new Decimal(1.5), gameData.buildings.capacitator)[1].toFixed(1) + " Points"
    document.getElementById("pointAmount").textContent = String((gameData.points).toFixed(2));
    document.getElementById("constantAmount").textContent = String(gameData.constant)
    document.getElementById("constantCost").textContent = String(calculateConstantCost().round(1))
    if (calculateConstantSCap() !== false) {
        document.getElementById("constantSCap").style.display = "block"
        document.getElementById("constantSCap").textContent = "A Constant Softcap at "+ calculateConstantSCap().toFixed(2) + " Points is dividing your production by " + calculateConstantSCapDivisor().toFixed(2) + "."
    }
    else {
        document.getElementById("constantSCap").style.display = "none"
    }
}
function showTab(tab) {
    document.getElementById("mainTab").style.display = "none"
    document.getElementById("achTab").style.display = "none"
    document.getElementById(tab).style.display = "inline-block"
}
function save() {
    localStorage.setItem("save",JSON.stringify(gameData));
}
function load() {
    savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame !== null) {
        savegame.constant = new Decimal(savegame.constant)
        savegame.constantCost = new Decimal(savegame.constantCost)
        savegame.points = new Decimal(savegame.points)
        savegame.buildings.generators = new Decimal(savegame.buildings.generators)
        if (savegame.buildings.capacitator !== undefined) savegame.buildings.capacitator = new Decimal(savegame.buildings.capacitator)
    gameData = savegame
    }
}
function gameLoop(diff) {
    gameData.points = gameData.points.plus(calculatePointPerSecond().divide(25))
    updateText();
}
showTab("mainTab")
load()
window.setInterval(function () {gameLoop(40)}, 40)
window.setInterval(function () {save()}, 5000)


document.getElementById("generatorCount").onclick = function () {
    buyBuilding(1)
}
document.getElementById("genMax").onclick = function () {
    buyMultiBuilding(1)
}
document.getElementById("capacitatorCount").onclick = function () {
    buyBuilding(2)
}
document.getElementById("capMax").onclick = function () {
    buyMultiBuilding(2)
}
document.getElementById("mainTabButton").onclick = function () {
    showTab("mainTab")
}
document.getElementById("achTabButton").onclick = function () {
    showTab("achTab")
}
document.getElementById("increaseConstant").onclick = function () {
    buyConstant(1)
}

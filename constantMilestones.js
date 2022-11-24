function calculateConstantSCap() {
    if (gameData.constant.lessThan(3)) {
        return false
    }
    return gameData.constant.multiply(50).plus(calculateCapBoost())
}
function calculateConstantSCapDivisor() {
    if (calculateConstantSCap() !== false) {
        if (calculateConstantSCap().lessThanOrEqualTo(gameData.points)) {
            return gameData.points.minus(calculateConstantSCap()).divide(10).plus(1)
        }
        return new Decimal(1)
    }
    return new Decimal(1)
}
function unlockCapacitator() {
    if (gameData.constant.lessThan(4)) {
        return false
    }
    return true
}
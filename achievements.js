let Achievements = {
    cache: {},
    names: [
      [
        'Generation Begins...',
        'Num.goUp()',
        'Huh?',
        'To the Rescue!',
        'It\'s not constant...',
        'That\'s a lot',
        'Imagine being 2-digits',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
    ],
    requirements: [
        [
          () => gameData.buildings.generators.gt(0),
          () => gameData.constant.gte(1),
          () => gameData.constant.gte(3),
          () => gameData.buildings.capacitator.gte(1),
          () => gameData.constant.gte(5),
          () => gameData.buildings.generators.gte(15),
          () => gameData.constant.gte(10),
          () => false,
          () => false,
          () => false,
          () => false,
          () => false,
          () => false,
        ],
    ],
    situations: [
        [
          'loop',
          'loop',
          'loop',
          'loop',
          'loop',
          'loop',
          'loop',
          'loop',
          'loop',
          'loop',
          'loop',
          'loop',
          'loop',
        ],
    ],
    checkForAchievements(situation) {
        for (let row = 1; row <= 1; row++) {
          for (let column = 1; column <= 13; column++) {
            if (!this.hasAchievement(row, column) &&
              this.getAchievementSituation(row, column) === situation &&
              this.getAchievementRequirement(row, column)()) {
              this.unlockAchievement(row, column);
            }
          }
        }
      },
    unlockAchievement(row, column) {
        gameData.achTable[row - 1][column - 1] = true;
    },
    hasAchievement(row, column) {
        return gameData.achTable[row - 1][column - 1];
      },
    getAchievementSituation(row, column) {
        return this.situations[row - 1][column - 1];
    },
    getAchievementRequirement(row, column) {
        return this.requirements[row - 1][column - 1];
    },
    displayAchievements() {
        var achTable = document.getElementById('achTable');
        var achievements = achTable.getElementsByTagName('tr');
        achievements = (achievements[0]) //TODO: Make more rows
        var rowOne = achievements.getElementsByTagName('td')
        for (let column = 1; column <= 13; column++) {
            let currentAchievement = rowOne[column-1]
            currentAchievement.className = gameData.achTable[0][column-1] ? "achievementUnlocked" : "achievementLocked";
            document.getElementById('ach' + String(column)).textContent = this.names[0][column-1]
        }
    }
}
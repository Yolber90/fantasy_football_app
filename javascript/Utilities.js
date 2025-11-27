
export class Utilities {
    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.player1Data = []
        this.player2Data = []
        this.player1ScoreArray = []
        this.player2ScoreArray = []
        this.player1AllData = []
        this.player2AllData = []
    }

    setPlayersData(gamesPre) {
        let tempHolder = gamesPre.filter((e) =>
            e.plMatch[0].realname == this.player1 && e.plMatch[1].realname == this.player2 ||
            e.plMatch[1].realname == this.player1 && e.plMatch[0].realname == this.player2
        )

        this.player1AllData = gamesPre
            .filter((a) => a.plMatch[0].realname == this.player1 || a.plMatch[1].realname == this.player1)
            .map((s) => (s.plMatch[0].realname == this.player1 ? s.plMatch[0].score : s.plMatch[1].score))
            .reduce((a, b) => a + b)
        this.player2AllData = gamesPre
            .filter((a) => a.plMatch[0].realname == this.player2 || a.plMatch[1].realname == this.player2)
            .map((s) => (s.plMatch[0].realname == this.player2 ? s.plMatch[0].score : s.plMatch[1].score))
            .reduce((a, b) => a + b)

        for (let x = 0; x < tempHolder.length; x++) {
            for (let l = 0; l < 2; l++) {
                (
                    tempHolder[x].plMatch[l].realname == this.player1
                        ? this.player1Data.push({ 'name': tempHolder[x].plMatch[l].realname, 'year': tempHolder[x].year, 'week': tempHolder[x].weekId, 'score': tempHolder[x].plMatch[l].score })
                        : this.player2Data.push({ 'name': tempHolder[x].plMatch[l].realname, 'year': tempHolder[x].year, 'week': tempHolder[x].weekId, 'score': tempHolder[x].plMatch[l].score })
                )
            }
        }
    }
    // =================== match overall poitns =================== \\
    player1MatchOverallPoints() {
        return this.player1Data.map((points) => points.score).reduce((a, b) => a + b)
    }
    player2MatchOverallPoints() {
        return this.player2Data.map((points) => points.score).reduce((a, b) => a + b)
    }
    // =================== match poitns array =================== \\    
    player1pointsArray() {
        this.player1ScoreArray = this.player1Data.map((points) => points.score)
        return this.player1ScoreArray;
    }
    player2pointsArray() {
        this.player2ScoreArray = this.player2Data.map((points) => points.score)
        return this.player2ScoreArray;
    }
    // =================== weeks and years =================== \\
    getWeeksYears() {
        let weeksYears = this.player1Data.map((wy) => `${wy.week} - ${wy.year}`)
        return weeksYears;
    }
    // =================== get total vs games between two players =================== \\
    totalVsGames() {
        return this.player1Data.length
    }

    player1Wins() {
        let wins = 0
        for (let w = 0; w < this.player1ScoreArray.length; w++) {
            (this.player1ScoreArray[w] > this.player2ScoreArray[w] ? wins++ : wins)
        }
        return wins
    }

    player2Wins() {
        let wins = 0
        for (let w = 0; w < this.player1ScoreArray.length; w++) {
            (this.player2ScoreArray[w] > this.player1ScoreArray[w] ? wins++ : wins)
        }
        return wins
    }





}



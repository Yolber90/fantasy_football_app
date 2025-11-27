import players from "../db/players.js"
import games from "../db/history.js"
import { Utilities } from "./Utilities.js"

const playersList = players
const gamesPre = games.matchupHistory[0]

const playerSelect1 = document.getElementById('player1')
const playerSelect2 = document.getElementById('player2')
const player1Category = document.getElementById('player1c')
const player2Category = document.getElementById('player2c');
const player1Wins = document.getElementById('player-1-wins');
const player2Wins = document.getElementById('player-2-wins');
const player = playersList.map((p) => p.owernName)
const uniquePlayers = [...new Set(player)]
const tableData = document.getElementById('inject-table-data') // table data

const turnToFloat = (score) => { return parseFloat(score) }

// ===================================== LOAD PLAYER OPTIONS =====================================
for (let p = 0; p < uniquePlayers.length; p++) {
  playerSelect1.innerHTML +=
    `
    <option value="${uniquePlayers[p]}" >${uniquePlayers[p]}</option>
    `
  playerSelect2.innerHTML +=
    `
    <option value="${uniquePlayers[p]}">${uniquePlayers[p]}</option>
    `
}

  // Set Data
document.getElementById('chart1-div').style.display = 'none'
document.getElementById('chart2-div').style.display = 'none'
document.getElementById('chart3-div').style.display = 'none'


// FUNCTION =-=-=-=-==-=-=-========================================================================================================
// FUNCTION =-=-=-=-==-=-=-========================================================================================================
// FUNCTION =-=-=-=-==-=-=-========================================================================================================
// FUNCTION =-=-=-=-==-=-=-========================================================================================================
document.getElementById('compare').addEventListener('click', () => {

  document.getElementById('chart1-div').style.display = ''
document.getElementById('chart2-div').style.display = ''
document.getElementById('chart3-div').style.display = ''

  // Set Data
  const thisTool = new Utilities(playerSelect1.value, playerSelect2.value);
  thisTool.setPlayersData(gamesPre)
  thisTool.player2pointsArray()
  thisTool.player2pointsArray()
     

  

  replaceDataset1();



  // Function that replaces the entire dataset
  function replaceDataset1() {

    // generate new labels
    const newLabels = thisTool.getWeeksYears()
    const newLabels2 = [thisTool.player1, thisTool.player2]
  

    // generate new random values
    const newData = (thisTool.player1pointsArray())
    const newData2 = (thisTool.player2pointsArray())

    const newData3 = [thisTool.player1AllData]
    const newData4 = [thisTool.player2AllData]

    const newData5 = [thisTool.player1Wins()]
    const newData6 = [thisTool.player2Wins()]

    // replace everything
    myChart.data.labels = newLabels;
    myChart.data.datasets[0].label = thisTool.player1;
    myChart.data.datasets[1].label = thisTool.player2;
    myChart.data.datasets[0].data = newData;
    myChart.data.datasets[1].data = newData2;
   
    
    // replace everything
    myChart2.data.labels = [thisTool.player1, thisTool.player2];
    myChart2.data.datasets.label = thisTool.player1;
    // myChart2.data.datasets[1].label = thisTool.player2;
    myChart2.data.datasets[0].data = [newData3, newData4]
    // myChart2.data.datasets[1].data = [newData4]

        // replace everything
    myChart3.data.labels = [thisTool.player1, thisTool.player2];
    myChart3.data.datasets.label = [thisTool.player1, thisTool.player2];
    // myChart2.data.datasets[1].label = thisTool.player2;
    myChart3.data.datasets[0].data = [newData5, newData6]
    // myChart2.data.datasets[1].data = [newData4]

    myChart.update();
    myChart2.update();
    myChart3.update();
  }

})





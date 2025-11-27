import players from "../db/players.js"
import games from "../db/history.js"
import { Utilities } from "./Utilities.js"

const playersList = players
const gamesPre = games.matchupHistory[0]

const playerSelect1 = document.getElementById('player1')
const playerSelect2 = document.getElementById('player2')
const player = playersList.map((p) => p.owernName)
const uniquePlayers = [...new Set(player)]


// ===================================== LOAD PLAYER OPTIONS =====================================
for (let p = 0; p < uniquePlayers.length; p++) {
  playerSelect1.innerHTML +=`<option value="${uniquePlayers[p]}" >${uniquePlayers[p]}</option>`
  playerSelect2.innerHTML +=`<option value="${uniquePlayers[p]}">${uniquePlayers[p]}</option>`
}

// FUNCTION =======================================================================================================
document.getElementById('compare').addEventListener('click', () => {

  // Set Data
  const thisTool = new Utilities(playerSelect1.value, playerSelect2.value);
  thisTool.setPlayersData(gamesPre)
  thisTool.player2pointsArray()
  thisTool.player2pointsArray()
  function notations() {
    let notesDiv = document.getElementById('notes')
    function getDiff(a, b){
      let getDiff = (a - b)
      if(getDiff > 5){
        return `● At this point, <span id='team2'>${thisTool.player2}</span> should start calling <span id='team1'>${thisTool.player1}</span> his daddy`
      }if (getDiff < -5) {
        return `● At this point, <span id='team1'>${thisTool.player1}</span> should start calling <span id='team2'>${thisTool.player2}</span> his daddy`
      } else {
        return ''
      }
    }
    function customNote(a, b){
      if(a == 'Jose' || b == 'Jose'){
        return `● Fun Fact about Christian, he enjoys working outside, going to the beach, and his favorite quote is "if my grandma had wheels then she would be a bike" what a guy...
        Oh, and he will loose to the champ this week...`
      }else{
        return ''
      }
    }
    notesDiv.innerHTML =
      `
      <ul>
        <li>● <span id='team1'>${thisTool.player1}</span> and <span id='team2'>${thisTool.player2}</span> have played eachother ${thisTool.player1ScoreArray.length} times</li>
        <li>● <span id='team1'>${thisTool.player1}</span> has a record of ${thisTool.player1Wins()} - ${thisTool.player2Wins()} against <span id='team2'>${thisTool.player2}</span></li>
        <li>${getDiff(thisTool.player1Wins(), thisTool.player2Wins())}</li>
        <li>${customNote(thisTool.player1, thisTool.player2)}</li>
      </ul>
      `
  }

  replaceDataset1();

  notations();

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
    myChart2.data.datasets[0].data = [newData3, newData4]


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





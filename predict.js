// import deecision tree
import { DecisionTree } from "./libraries/decisiontree.js"

// load model
function loadSavedModel() {
    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}

function modelLoaded(model) {
    // define features
    let decisionTree = new DecisionTree(model)
    let blueGold = document.getElementById('blueGold')
    let blueMinionsKilled = document.getElementById('blueMinionsKilled')
    let blueJungleMinionsKilled = document.getElementById('blueJungleMinionsKilled')
    let blueAvgLevel = document.getElementById('blueAvgLevel')
    let redGold = document.getElementById('redGold')
    let redMinionsKilled = document.getElementById('redMinionsKilled')
    let redJungleMinionsKilled = document.getElementById('redJungleMinionsKilled')
    let redAvgLevel = document.getElementById('redAvgLevel')
    let blueChampKills = document.getElementById('blueChampKills')
    let blueHeraldKills = document.getElementById('blueHeraldKills')
    let blueDragonKills = document.getElementById('blueDragonKills')
    let blueTowersDestroyed = document.getElementById('blueTowersDestroyed')
    let redChampKills = document.getElementById('redChampKills')
    let redHeraldKills = document.getElementById('redHeraldKills')
    let redDragonKills = document.getElementById('redDragonKills')
    let redTowersDestroyed = document.getElementById('redTowersDestroyed')

    // test to see if the model works
    let match = { blueHeraldKills: blueHeraldKills.value, redHeraldKills: redHeraldKills.value}
    let prediction = decisionTree.predict(match)
    console.log("predicted " + prediction)
    if (prediction == "0") {
    document.getElementById("prediction").innerHTML = "This match is lost."
    } else if (prediction == "1") {
    document.getElementById("prediction").innerHTML = "This match is won."
    }
}

loadSavedModel();
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
    let match = { blueGold: blueGold.value, blueMinionsKilled: blueMinionsKilled.value, blueJungleMinionsKilled: blueJungleMinionsKilled.value, blueAvgLevel: blueAvgLevel.value, redGold: redGold.value, redMinionsKilled: redMinionsKilled.value, redJungleMinionsKilled: redJungleMinionsKilled.value, redAvgLevel: redAvgLevel.value, blueChampKills: blueChampKills.value, blueHeraldKills: blueHeraldKills.value, blueDragonKills: blueDragonKills.value, blueTowersDestroyed: blueTowersDestroyed.value, redChampKills: redChampKills.value, redHeraldKills: redHeraldKills.value, redDragonKills: redDragonKills.value, redTowersDestroyed: redTowersDestroyed.value}
    let prediction = decisionTree.predict(match)
    console.log("predicted " + prediction)
    if (prediction == "p") {
    document.getElementById("prediction").innerHTML = "This match is poisonous."
    } else if (prediction == "e") {
    document.getElementById("prediction").innerHTML = "This match is edible."
    }
}

loadSavedModel();
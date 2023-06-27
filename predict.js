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
    let name = document.getElementById('name')
    let win_ratio = document.getElementById('win_ratio')
    let total_fights = document.getElementById('total_fights')
    let sub_win_ratio = document.getElementById('sub_win_ratio')
    let point_win_ratio = document.getElementById('point_win_ratio')
    let n_editions_competed = document.getElementById('n_editions_competed')
    let scored_points_per_fight = document.getElementById('scored_points_per_fight')
    let suffered_points_per_fight = document.getElementById('suffered_points_per_fight')
    let fights_per_edition = document.getElementById('fights_per_edition')
    let favorite_target = document.getElementById('favorite_target')
    let most_vulnerable = document.getElementById('most_vulnerable')
    let n_weight_classes = document.getElementById('n_weight_classes')
    let main_weight_class = document.getElementById('main_weight_class')
    let avg_match_importance = document.getElementById('avg_match_importance')
    let highest_match_importance = document.getElementById('highest_match_importance')
    let open_weight_ratio = document.getElementById('open_weight_ratio')
    let n_titles = document.getElementById('n_titles')
    let champion = document.getElementById('champion')
    let custom_score = document.getElementById('custom_score')
    let n_different_subs = document.getElementById('n_different_subs')
    let fought_superfight = document.getElementById('fought_superfight')
    let total_wins = document.getElementById('total_wins')
    let debut_year = document.getElementById('debut_year')
    let female = document.getElementById('female')
    

    // test to see if the model works
    let match = { total_fights: total_fights.value, sub_win_ratio: sub_win_ratio.value, point_win_ratio: point_win_ratio.value}
    let prediction = decisionTree.predict(match)
    console.log("predicted " + prediction)
    if (prediction <= "0.5") {
    document.getElementById("prediction").innerHTML = "This match is lost."
    } else if (prediction >= "0.5") {
    document.getElementById("prediction").innerHTML = "This match is won."
    }
}

loadSavedModel();
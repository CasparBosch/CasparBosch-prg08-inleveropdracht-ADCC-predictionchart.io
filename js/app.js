import { DecisionTree } from "../libraries/decisiontree.js";
import { VegaTree } from "../libraries/vegatree.js";

//
// DATA
//
const csvFile = "./data/ADCCWINRATE/fighters_dataset.csv";
const trainingLabel = "win_ratio";
const ignored = [
    "name",
    "win_ratio",
    "n_editions_competed",
    "scored_points_per_fight",
    "suffered_points_per_fight",
    "fights_per_edition",
    "favorite_target",
    "most_vulnerable",
    "n_weight_classes",
    "main_weight_class",
    "avg_match_importance",
    "highest_match_importance",
    "open_weight_ratio",
    "n_titles",
    "champion",
    "custom_score",
    "n_different_subs",
    "fought_superfight",
    "total_wins",
    "debut_year",
    "female",
];
let amountCorrect = 0;
let winableAndWinable = 0;
let winableAndUnwinable = 0;
let unwinableAndWinable = 0;
let unwinableAndUnwinable = 0;

//
// load csv data as json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => trainModel(results.data), //console.log(results.data),   // use this data to train the model
    });
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : split data in traindata and testdata
    data.sort(() => Math.random() - 0.5);
    let trainData = data.slice(0, Math.floor(data.length * 0.8));
    let testData = data.slice(Math.floor(data.length * 0.8) + 1);

    // create algorithm
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel,
    });

    // draw tree structure - DOM element, width, height, decision tree
    let json = decisionTree.toJSON();
    let visual = new VegaTree("#view", 2300, 1000, json);

    // todo : make a prediction with a sample from testdata

    for (let i = 0; i < testData.length; i++) {
        let match = testData[i];
        // create copy of passenger, without label
        const matchNoLabel = Object.assign({}, match);
        delete matchNoLabel.win_ratio;

        // prediction
        let prediction = decisionTree.predict(matchNoLabel);

        // compare prediction with real label
        if (prediction == match.win_ratio) {
            console.log("Deze voorspelling is goed gegaan!");
            amountCorrect = amountCorrect + 1;
        }

        if (prediction >= "0.5" && match.win_ratio >= "0.5") {
            winableAndWinable = winableAndWinable + 1;
        } else if (prediction >= "0.5" && match.win_ratio <= "0.49") {
            winableAndUnwinable = winableAndUnwinable + 1;
        } else if (prediction <= "0.49" && match.win_ratio <= "0.49") {
            unwinableAndUnwinable = unwinableAndUnwinable + 1;
        } else if (prediction <= "0.49" && match.win_ratio >= "0.5") {
            unwinableAndWinable = unwinableAndWinable + 1;
        }
    }

    let totalAmount = testData.length;
    let accuracy = (amountCorrect / totalAmount) * 100;
    document.getElementById("accuracy").innerHTML =
        "The accuracy is " + accuracy + "%";

    let confusionTable = document.getElementById("confusion");
    confusionTable.rows[1].cells[1].textContent = winableAndWinable;
    confusionTable.rows[1].cells[2].textContent = winableAndUnwinable;
    confusionTable.rows[2].cells[1].textContent = unwinableAndWinable;
    confusionTable.rows[2].cells[2].textContent = unwinableAndUnwinable;
    console.log(winableAndWinable);
    console.log(winableAndUnwinable);

    let jsons = decisionTree.stringify();
    console.log(jsons);

    // trainModel()

}

loadData();

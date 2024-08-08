const resetButton = document.querySelector("#reset");
const calculateButton = document.querySelector("#calculate");
const answerSection = document.querySelector(".answer");

let c1Data = {
    userEntry: document.querySelector("#c1"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },

    unitEntry: document.querySelector("#c1units"),
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let v1Data = {
    userEntry: document.querySelector("#v1"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
    unitEntry: document.querySelector("#v1units"),
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let c2Data = {
    userEntry: document.querySelector("#c2"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },

    unitEntry: document.querySelector("#c2units"),
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,

}

let c3Data = {
    userEntry: document.querySelector("#c3"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
    unitEntry: document.querySelector("#c3units"),
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let allObjects = [c1Data, v1Data, c2Data, c3Data];

const answers = {
    ratio: null,
    volume: null
}



calculateButton.addEventListener("click", function () {
    resetData()
    updateCalcValues();

    if (!checkValidNumbers()) {
        alert("Please ensure that the number fields are filled and are not 0")
    } else {
        // alert("Working route")
        adjustNumbers()
        if (!checkValidConc()) {
            alert("Ensure that the stock concentration (C2) is greater than the other two concentration values.")
        } else {
            removeAnswer()
            calcuateRatioAndVolume();
            console.log("*******answers******");
            console.log(answers);
            createAnswer();
        }
    }

    // console.log(allObjects);

})

resetButton.addEventListener("click", function () {
    removeAnswer();
    hardReset();
})

// updates the raw numbers for the objects
const updateCalcValues = function () {
    for (let data of allObjects) {
        data.num = data.makeNumber()
        data.units = data.getUnits()
    }
}

// check to see if nums are not falsy
const checkValidNumbers = function () {
    for (let item of allObjects) {
        if (!item.num || item.num === 0) {
            return false
        }
    }
    return true
}

// make adjusted numbers for each calcobject
const adjustNumbers = function () {
    for (let item of allObjects) {
        if (item.units === "L" || item.units === "M") {
            item.adjNum = item.num
        } else if (item.units === "mM" || item.units === "mL") {
            item.adjNum = item.num / 1000
        } else if (item.units === "uM" || item.units === "uL") {
            item.adjNum = item.num / 1000000
        }
    }
}

// reset the objects data numbers to null values
const resetData = function () {
    for (let item of allObjects) {
        item.num = null;
        item.units = null;
        item.adjNum = null;
    }
    answers.ratio = null;
    answers.volume = null;
}

// resets values and empties out the fields
const hardReset = function () {
    resetData();
    for (item of allObjects) {
        item.userEntry.value = "";
    }
}

// check to see if c1 is bigger than c2
const checkValidConc = function () {
    if (c2Data.adjNum > c1Data.adjNum && c2Data.adjNum > c3Data.adjNum) return true;
    return false
}


// calculate vol and ratio
const calcuateRatioAndVolume = function () {
    let totalv2 = c2Data.adjNum - c3Data.adjNum;
    let otherComponents = (c3Data.adjNum * v1Data.adjNum) - (c1Data.adjNum * v1Data.adjNum);
    let finalv2 = otherComponents / totalv2;
    answers.volume = finalv2.toPrecision(4);
    answers.ratio = (finalv2 / v1Data.adjNum).toPrecision(4);
}


// add answer section
const createAnswer = function () {
    let p1 = document.createElement("p");
    p1.innerHTML = `You will need <span class="answer_span">${answers.volume} L</span> or <span class="answer_span">${(answers.volume *1000).toFixed(4)} mL</span> of ${c2Data.num} ${c2Data.units} concentrated stock solution to add to ${v1Data.num} ${v1Data.units} of ${c1Data.num} ${c1Data.units} starting concentration`
    answerSection.appendChild(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = `For 1 mL of ${c1Data.num} ${c1Data.units} concentration, add <span class="answer_span">${answers.ratio} mL</span> of ${c2Data.num} ${c2Data.units} concentration solution`
    answerSection.appendChild(p2);
}


// remove answer section
function removeAnswer() {
    answerSection.innerHTML = "";
}

// function createText2(resultsArray) {
//     let p1 = document.createElement("p");
//     p1.innerHTML = `You will need <span class="answer_span">${resultsArray[0]} L</span> or <span class="answer_span">${(resultsArray[0] *1000).toFixed(4)} mL</span> of ${resultsArray[4].num} ${resultsArray[4].units} concentrated stock solution to add to ${resultsArray[3].num} ${resultsArray[3].units} of ${resultsArray[2].num} ${resultsArray[2].units} starting concentration`
//     answerSection.appendChild(p1);

//     let p2 = document.createElement("p");
//     p2.innerHTML = `For 1 mL of ${resultsArray[2].num} ${resultsArray[2].units} concentration, add <span class="answer_span">${resultsArray[1]} mL</span> of ${resultsArray[4].num} ${resultsArray[4].units} concentration solution`
//     answerSection.appendChild(p2);
// }
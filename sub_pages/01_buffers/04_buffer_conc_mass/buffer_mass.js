const resetButton = document.querySelector("#reset");
const calculateButton = document.querySelector("#calculate");
const answerSection = document.querySelector(".answer");

// mw v1 v1 
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

let mwData = {
    userEntry: document.querySelector("#mw"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
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

let answers = {
    mass: null,
    noOfMoles: null

}
const allObjects = [mwData, c1Data, v1Data];


calculateButton.addEventListener("click", () => {
    resetData();
    updateInputtedValues();

    if (!checkValidNumbers()) {
        alert("Please ensure that all fields are filled and are not 0")
    } else {
        // alert("workign route");
        adjustNumbers();
        removeAnswer();
        calcuateAnswers();
        createAnswer()
        // console.log(answers);
    }
    // console.log(allObjects);
})

resetButton.addEventListener("click", () => {
    hardReset();
})

// updates the raw numbers for the objects
const updateInputtedValues = function () {
    for (let data of allObjects) {
        data.num = data.makeNumber()
        if (data !== mwData) {
            data.units = data.getUnits()
        }

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


// reset the objects data numbers to null values
const resetData = function () {
    for (let item of allObjects) {
        item.num = null;
        item.units = null;
        item.adjNum = null;
    }
    answers.mass = null;
    answers.noOfMoles = null;
}

// resets values and empties out the fields
const hardReset = function () {
    resetData();
    removeAnswer();
    for (item of allObjects) {
        item.userEntry.value = "";
    }
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

// calculate answers
const calcuateAnswers = function () {
    answers.noOfMoles = (v1Data.adjNum * c1Data.adjNum).toPrecision(4);
    answers.mass = answers.noOfMoles * mwData.num;

}

// add answer section
const createAnswer = function () {
    let p1 = document.createElement("p");
    if (answers.mass >= 1000) {
        p1.innerHTML = `You will need <span class="answer_span">${(answers.mass).toFixed(4)} g or ${(answers.mass/1000).toFixed(4)} kg</span> of your compound`
    } else if (answers.mass <= 1) {
        p1.innerHTML = `You will need <span class="answer_span">${(answers.mass).toFixed(4)} g or ${(answers.mass *1000).toFixed(4)} mg</span> of your compound`
    } else {
        p1.innerHTML = `You will need <span class="answer_span">${(answers.mass).toFixed(4)} g </span>of your compound`
    }

    let p2 = document.createElement("p");
    p2.innerHTML = `Make it up to a final volume of ${v1Data.num} ${v1Data.units} to get a ${c1Data.num} ${c1Data.units} solution`;

    answerSection.appendChild(p1);
    answerSection.appendChild(p2);
}

// remove answer section
function removeAnswer() {
    answerSection.innerHTML = "";
}
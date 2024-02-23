const resetButton = document.querySelector("#reset");
const calcButton = document.querySelector("#calculate");

let answerSection = document.querySelector(".answer");

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
    // userEntry: document.querySelector("#v1"),
    // num: null,
    // makeNumber() {
    //     return Number(this.userEntry.value)
    // },
    // unitEntry: document.querySelector("#v1units"),
    units: null,
    // getUnits() {
    //     return this.unitEntry.value
    // },
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

let v2Data = {
    userEntry: document.querySelector("#v2"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
    unitEntry: document.querySelector("#v2units"),
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let allObjects = [c1Data, v1Data, c2Data, v2Data];

// calc objects are only c1, c2 and v2
let calcObjects = [c1Data, c2Data, v2Data]

calcButton.addEventListener("click", function () {
    resetData();
    updateCalcValues();

    if (!checkValidNumbers()) {
        alert("Please ensure that the number fields are filled and are not 0");
    } else {
        adjustNumbers();
        if (!checkValidConc()) {
            alert("Please ensure C1 is greater than C2")
        } else {
            removeAnswer();
            calcuateAdjVolume();
            createAnswer();
        }
    }
})

resetButton.addEventListener("click", function () {
    removeAnswer();
    hardReset();
})


// FUNCTIONS
// reset the objects data numbers to null values
const resetData = function () {


    for (let item of allObjects) {
        item.num = null;
        item.units = null;
        item.adjNum = null;
    }
}

// resets values and empties out the fields
const hardReset = function () {
    for (item of allObjects) {
        item.num = null;
        item.units = null;
        item.adjNum = null;

    }

    for (item of calcObjects) {
        item.userEntry.value = "";
    }
}

// updates the raw numbers for the objects
const updateCalcValues = function () {
    for (let data of allObjects) {
        if (data !== v1Data) {
            data.num = data.makeNumber()
            data.units = data.getUnits()
        }
    }
}

// check to see if nums are not falsy
const checkValidNumbers = function () {
    for (let item of calcObjects) {
        if (!item.num || item.num === 0) {
            return false
        }
    }
    return true
}

// check to see if c1 is bigger than c2
const checkValidConc = function () {
    if (c1Data.adjNum > c2Data.adjNum) return true;
    return false
}

// make adjusted numbers for each calcobject

const adjustNumbers = function () {
    for (let item of calcObjects) {
        if (item.units === "L" || item.units === "M") {
            item.adjNum = item.num
        } else if (item.units === "mM" || item.units === "mL") {
            item.adjNum = item.num / 1000
        } else if (item.units === "uM" || item.units === "uL") {
            item.adjNum = item.num / 1000000
        }
    }
}

// does calculation with adjusted values
const calcuateAdjVolume = function () {
    v1Data.adjNum = (c2Data.adjNum * v2Data.adjNum / c1Data.adjNum).toFixed(3)
}

// adds text to the answer section
const createAnswer = function () {
    let p1 = document.createElement("p");
    p1.innerHTML = `You will need <span class="answer_span">${(v1Data.adjNum)} L / ${(v1Data.adjNum *1000).toFixed(3)} mL / ${(v1Data.adjNum * 1000000).toFixed(3)} uL</span> of ${c1Data.num} ${c1Data.units} stock solution`

    let newVolume = (v2Data.adjNum - v1Data.adjNum);
    let p2 = document.createElement("p");

    p2.innerHTML = `Make it up using ${(newVolume).toFixed(3)} L / ${(newVolume *1000).toFixed(3)} mL / ${(newVolume *1000000).toFixed(3)} uL of solvent to get to ${v2Data.num} ${v2Data.units} of ${c2Data.num} ${c2Data.units} of target solution`
    answerSection.appendChild(p1);
    answerSection.appendChild(p2);

}

// removes the answer text section
const removeAnswer = function () {
    answerSection.innerHTML = "";
}
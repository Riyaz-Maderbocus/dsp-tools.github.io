// Box 1 buttons and area

const resetButton_1 = document.querySelector("#reset-1");
const calculateButton_1 = document.querySelector("#calculate-1");
const answerSection_1 = document.querySelector("#answer-1");

// Box 2 buttons and area
const resetButton_2 = document.querySelector("#reset-2");
const calculateButton_2 = document.querySelector("#calculate-2");
const answerSection_2 = document.querySelector("#answer-2");

// Box 1 objects
let targetData = {
    userEntry: document.querySelector("#target"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },

    unitEntry: document.querySelector("#target-units"),
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let capacityData = {
    userEntry: document.querySelector("#capacity"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
}

let answer1Data = {
    vol: null
}

// Box 2 objects
let reqVolData = {
    userEntry: document.querySelector("#req-vol"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },

    unitEntry: document.querySelector("#req-vol-units"),
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let slurryData = {
    userEntry: document.querySelector("#slurry-conc"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
}

let compressionFactorData = {
    userEntry: document.querySelector("#comp-factor"),
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
}

let answer2Data = {
    vol: null
}


// let v1Data = {
//     userEntry: document.querySelector("#v1"),
//     num: null,
//     makeNumber() {
//         return Number(this.userEntry.value)
//     },

//     unitEntry: document.querySelector("#v1units"),
//     units: null,
//     getUnits() {
//         return this.unitEntry.value
//     },
//     adjNum: null,
// }

// let answers = {
//     mass: null,
//     noOfMoles: null

// }

const box1Objects = [targetData, capacityData];
const box2Objects = [reqVolData, slurryData, compressionFactorData];


// box 1 calculate call
calculateButton_1.addEventListener("click", () => {
    resetData_box1();
    updateInputtedValues_box1();

    if (!checkValidNumbers_box1()) {
        alert("Please ensure that all fields are filled and are not less than or equal to 0");
    } else {
        // alert("workign route");

        adjustNumbers_box1();
        removeAnswer_box1();
        calcuateAnswers_box1();
        createAnswer_box1()
        // console.log(answers);
    }
    // console.log(allObjects);
})

// box 2 calculate call
calculateButton_2.addEventListener("click", () => {
    resetData_box2();
    updateInputtedValues_box2();

    if (!checkValidNumbers_box2()) {
        alert("Please ensure that all fields are filled and are not less than or equal to 0. Also ensure your compression factor is not above 1.6")
    } else {
        adjustNumbers_box2();
        removeAnswer_box2();
        calcuateAnswers_box2();
        createAnswer_box2()
    }
})


// box1 reset call
resetButton_1.addEventListener("click", () => {
    hardReset_box1();
})

// box2 reset call
resetButton_2.addEventListener("click", () => {
    hardReset_box2();
})

// updates the raw numbers for the objects
// Box 1
const updateInputtedValues_box1 = function () {
    for (let data of box1Objects) {
        data.num = data.makeNumber()
        if (data !== capacityData) {
            data.units = data.getUnits()
        }
    }
}
// box 2
const updateInputtedValues_box2 = function () {
    for (let data of box2Objects) {
        data.num = data.makeNumber()
        if (data === reqVolData) {
            data.units = data.getUnits()
        }
    }
}

// check to see if nums are not falsy
// const checkValidNumbers = function () {
//     for (let item of allObjects) {
//         if (!item.num || item.num === 0) {
//             return false
//         }
//     }
//     return true
// }

// Box 1 check valid
const checkValidNumbers_box1 = function () {
    for (let item of box1Objects) {
        if (!item.num || item.num <= 0) {
            return false
        }
    }
    return true
}

// box 2 check valid
const checkValidNumbers_box2 = function () {
    for (let item of box2Objects) {
        if (!item.num || item.num <= 0) {
            return false
        }
    }
    if (compressionFactorData.num < 1 || compressionFactorData.num > 1.6) {
        return false
    }
    return true
}

// reset the objects data numbers to null values
// box1
const resetData_box1 = function () {
    for (let item of box1Objects) {
        item.num = null;
        item.units = null;
        item.adjNum = null;
    }
    answer1Data.vol = null;
}

// box2
const resetData_box2 = function () {
    for (let item of box2Objects) {
        item.num = null;
        item.units = null;
        item.adjNum = null;
    }
    answer2Data.vol = null;
}



// resets values and empties out the fields
// box1
const hardReset_box1 = function () {
    resetData_box1();
    removeAnswer_box1();
    for (item of box1Objects) {
        item.userEntry.value = "";
    }
}

// box2
const hardReset_box2 = function () {
    resetData_box2();
    removeAnswer_box2();
    for (item of box2Objects) {
        item.userEntry.value = "";
    }
}

// make adjusted numbers for each calcobject
// box1
const adjustNumbers_box1 = function () {
    for (let item of box1Objects) {
        if (item.units === "g") {
            item.adjNum = item.num * 1000
        } else if (item.units === "mg") {
            item.adjNum = item.num
        } else if (item.units === "ug") {
            item.adjNum = item.num / 1000
        }
    }
}

// box2
const adjustNumbers_box2 = function () {
    for (let item of box2Objects) {
        if (item.units === "L") {
            item.adjNum = item.num * 1000
        } else if (item.units === "mL") {
            item.adjNum = item.num
        } else if (item.units === "uL") {
            item.adjNum = item.num / 1000
        }
    }
}


// calculate answers
const calcuateAnswers_box1 = function () {
    answer1Data.vol = Number((targetData.adjNum / capacityData.num).toFixed(6))
    // answers.noOfMoles = (v1Data.adjNum * c1Data.adjNum).toPrecision(4);
    // answer1Data.vol = answers.noOfMoles * mwData.num;
}

const calcuateAnswers_box2 = function () {
    // answer1Data.vol = Number((targetData.adjNum / capacityData.num).toPrecision(3))
    answer2Data.vol = Number((reqVolData.adjNum * compressionFactorData.num / (slurryData.num / 100)).toFixed(6))



}

// add answer section
const createAnswer_box1 = function () {
    let p1 = document.createElement("p");
    if (answer1Data.vol >= 1000) {
        p1.innerHTML = `You will need <span class="answer_span">${(answer1Data.vol).toFixed(4)} mL or ${(answer1Data.vol/1000).toFixed(4)} L</span> of your resin`
    } else if (answer1Data.vol <= 1) {
        p1.innerHTML = `You will need <span class="answer_span">${(answer1Data.vol).toFixed(4)} mL or ${(answer1Data.vol *1000).toFixed(4)} uL</span> of your resin`
    } else {
        p1.innerHTML = `You will need <span class="answer_span">${(answer1Data.vol).toFixed(4)} mL </span>of your resin`
    }

    // let p2 = document.createElement("p");
    // p2.innerHTML = `Make it up to a final volume of ${v1Data.num} ${v1Data.units} to get a ${c1Data.num} ${c1Data.units} solution`;

    answerSection_1.appendChild(p1);
    // answerSection.appendChild(p2);
}

const createAnswer_box2 = function () {
    let p1 = document.createElement("p");
    if (answer2Data.vol >= 1000) {
        p1.innerHTML = `You will need <span class="answer_span">${(answer2Data.vol).toFixed(4)} mL or ${(answer2Data.vol/1000).toFixed(4)} L</span> of your resin`
    } else if (answer2Data.vol <= 1) {
        p1.innerHTML = `You will need <span class="answer_span">${(answer2Data.vol).toFixed(4)} mL or ${(answer2Data.vol *1000).toFixed(4)} uL</span> of your resin`
    } else {
        p1.innerHTML = `You will need <span class="answer_span">${(answer2Data.vol).toFixed(4)} mL </span>of your resin`
    }
    answerSection_2.appendChild(p1);
}

// remove answer section
function removeAnswer_box1() {
    answerSection_1.innerHTML = "";
}

function removeAnswer_box2() {
    answerSection_2.innerHTML = "";
}
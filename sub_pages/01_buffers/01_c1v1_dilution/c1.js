const form = document.querySelector("#form");
const resetButton = document.querySelector("#reset");

let answerSection = document.querySelector(".answer");

let hasCalculatedAlready = false;


let c1Data = {
    userEntry: form.elements.c1,
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },

    unitEntry: form.elements.c1units,
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let v1Data = {
    userEntry: form.elements.v1,
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
    unitEntry: form.elements.v1units,
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let c2Data = {
    userEntry: form.elements.c2,
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },

    unitEntry: form.elements.c2units,
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,

}

let v2Data = {
    userEntry: form.elements.v2,
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
    unitEntry: form.elements.v2units,
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let allObjects = [c1Data, v1Data, c2Data, v2Data];



form.addEventListener("submit", function (e) {
    e.preventDefault();
    // alert("form clicked");
    // v1Data.userEntry = 1;
    // v1Data.unitEntry = "L";
    let numArray = [];
    let unitArray = [];

    for (let data of allObjects) {

        data.num = data.makeNumber();
        data.units = data.getUnits();
        unitArray.push(data.units)
        numArray.push(data.num);
    }
    // numArray[1] = 1;

    if (numArray.includes(NaN)) {
        alert("Ensure that only numbers are used");
    } else if (elementCount(numArray, 0) != 1 || numArray.indexOf(0) === -1) {
        alert("Ensure that only one field is left blank or as 0")
    } else {
        remove_answer();
        // console.log("working route");
        let adjustedArray = [];


        for (let obj of allObjects) {
            obj.adjNum = adjustNumber(obj.num, obj.units);
            adjustedArray.push(obj.adjNum);
        }

        console.log(adjustedArray);

        let newNumber = calculate(adjustedArray);
        // console.log(newNumber);

        console.log(allObjects)
        let currentObj = null;

        // works out which object doesn't have a value in it
        for (let obj of allObjects) {
            if (obj.num === 0) {
                currentObj = obj
            }
        }

        console.log(currentObj)
        currentObj.num = newNumber;
        currentObj.num = reverseAdjustNumber(currentObj.num, currentObj.units);
        currentObj.adjNum = adjustNumber(currentObj.num, currentObj.units);
        currentObj.userEntry.value = currentObj.num;

        console.log(allObjects);

        createText(...allObjects);
    }
})



function elementCount(arr, element) {
    return arr.filter((currentElement) => currentElement == element).length;
};

function remove_answer() {
    answerSection.innerHTML = "";

}

function adjustNumber(startnum, unit) {
    if (unit === "M" || unit === "L") {
        return startnum
    } else if (unit === "mM" || unit === "mL") {
        return startnum / 1000
    } else if (unit === "uM" || unit === "uL") {
        return startnum / 1000000
    }
}


// takes the calculated value and changes it to the units int he box
function reverseAdjustNumber(startnum, unit) {
    if (unit === "M" || unit === "L") {
        return startnum
    } else if (unit === "mM" || unit === "mL") {
        return startnum * 1000
    } else if (unit === "uM" || unit === "uL") {
        return startnum * 1000000
    }
}

// takes an array of [c1, v1, c2, v2] and calculates the raw value
function calculate(arr) {
    if (arr[0] === 0) {
        return (arr[2] * arr[3] / arr[1]);
    } else if (arr[1] === 0) {
        return (arr[2] * arr[3] / arr[0]);
    } else if (arr[2] === 0) {
        return (arr[0] * arr[1] / arr[3]);
    } else if (arr[3] === 0) {
        return (arr[0] * arr[1] / arr[2]);
    }
}

function createText(c1obj, v1obj, c2obj, v2obj) {
    console.log("hello");
    let p1 = document.createElement("p");
    p1.innerHTML = `You will need <span class="answer_span">${(v1obj.adjNum).toFixed(3)} L / ${(v1obj.adjNum *1000).toFixed(3)} mL / ${(v1obj.adjNum * 1000000).toFixed(3)} uL</span> of ${c1obj.num} ${c1obj.units} stock solution`
    let newVolume = (v2obj.adjNum - v1obj.adjNum);
    let p2 = document.createElement("p");
    p2.innerHTML = `Make it up using ${(newVolume).toFixed(3)} L / ${(newVolume *1000).toFixed(3)} mL / ${(newVolume *1000000).toFixed(3)} uL of solvent to get to ${v2obj.adjNum} L of ${c2obj.num} ${c2obj.units} of target solution`
    answerSection.appendChild(p1);
    answerSection.appendChild(p2);
}

resetButton.addEventListener("click", (e) => {

    window.location.reload();
})
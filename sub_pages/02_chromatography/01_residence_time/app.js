// checkboxes

const flowCheckbox = document.querySelector("#flow_check");
const bedCheckbox = document.querySelector("#bed_check");
const resCheckbox = document.querySelector("#res_check");

const allCheckboxes = [flowCheckbox, bedCheckbox, resCheckbox];

// inputs
const flowVelocity = document.querySelector("#flow_velocity");

const bedHeight = document.querySelector("#bed_height");

const resTime = document.querySelector("#res_time");

let allInputs = [flowVelocity, bedHeight, resTime];
// buttons
const calculateButton = document.querySelector("#calculate");

const resetButton = document.querySelector("#reset");

let hasCalculatedBefore = false;


function checkTickedBoxes() {
    let results = [];
    for (let box of allCheckboxes) {
        results.push(box.checked)
    }
    // console.log(results)
    if (results.filter((v) => (v === true)).length === 2) {
        // console.log("two values are checked");
        return true
    } else {
        alert("please check two values");
        return false;
    }

}

// math functions
function getResidentTime(flowvel, bedH) {
    return (bedH / flowvel * 60).toFixed(2);
}

function getBedHeight(flowVel, resTime) {
    return ((resTime * flowVel) / 60).toFixed(2)
}

function getFlowVel(resTime, bedH) {
    return ((bedH * 60 / resTime)).toFixed(2)
}

function whichCalculation() {
    if (flowCheckbox.checked && bedCheckbox.checked) {
        // console.log("opt1");
        let result = getResidentTime(flowVelocity.value, bedHeight.value);
        resTime.value = result;

    } else if (flowCheckbox.checked && resCheckbox.checked) {
        let result = getBedHeight(flowVelocity.value, resTime.value);
        bedHeight.value = result;
    } else {
        // console.log("opt3")
        let result = getFlowVel(resTime.value, bedHeight.value);
        flowVelocity.value = result;
    }
}

calculateButton.addEventListener("click", function () {
    if (checkTickedBoxes()) {
        whichCalculation();
        hasCalculatedBefore = true;
    }
})

flowVelocity.addEventListener("input", function () {
    if (hasCalculatedBefore) {
        if (checkTickedBoxes()) {
            whichCalculation();
        }
    }
})

bedHeight.addEventListener("input", function () {
    if (hasCalculatedBefore) {
        if (checkTickedBoxes()) {
            whichCalculation();
        }
    }
})

resTime.addEventListener("input", function () {
    if (hasCalculatedBefore) {
        if (checkTickedBoxes()) {
            whichCalculation();
        }
    }
})


resetButton.addEventListener("click", function () {
    hasCalculatedBefore = false;
    for (let box of allCheckboxes) {
        box.checked = false;
    }
    for (let input of allInputs) {
        input.value = "";
    }

})
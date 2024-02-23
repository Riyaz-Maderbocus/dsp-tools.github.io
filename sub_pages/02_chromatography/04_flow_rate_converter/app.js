// checkboxes

const flowvelocityCheckbox = document.querySelector("#flowv_check");
const coldiameterCheckbox = document.querySelector("#col_check");
const volflowCheckbox = document.querySelector("#volflow_check");

const allCheckboxes = [flowvelocityCheckbox, coldiameterCheckbox, volflowCheckbox];

// inputs

const flowVelocity = document.querySelector("#flow_velocity");

const colDiameter = document.querySelector("#col_diameter");

const volFlowRate = document.querySelector("#vol_flow");

const allInputs = [flowVelocity, colDiameter, volFlowRate];
// buttons
const calculateButton = document.querySelector("#calculate");

const resetButton = document.querySelector("#reset");

let hasCalculatedBefore = false;



// second calculator

// inputs buttons and variable
const lPerH = document.querySelector("#LperH");
const mlPerMin = document.querySelector("#mLperMin");

const convert = document.querySelector("#convert");
const resetConvert = document.querySelector("#reset-convert");

let hasConvertedBefore = false;





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
function getFlowvelocity(colDiameter, volFlowRate) {

    return ((volFlowRate * 1000 / ((colDiameter / 20) ** 2 * Math.PI)).toFixed(3))
}

function getColDiameter(flowVelocity, volFlowRate) {
    const area = (volFlowRate * 1000 / flowVelocity)
    return ((Math.sqrt(area / Math.PI) * 20).toFixed(3))

}

function getVolFlowRate(flowVelocity, colDiameter) {
    return ((flowVelocity * (colDiameter / 20) ** 2 * Math.PI / 1000).toFixed(3))
}


function whichCalculation() {
    if (flowvelocityCheckbox.checked && coldiameterCheckbox.checked) {
        let result = getVolFlowRate(flowVelocity.value, colDiameter.value);
        volFlowRate.value = result;

    } else if (coldiameterCheckbox.checked && volflowCheckbox.checked) {
        let result = getFlowvelocity(colDiameter.value, volFlowRate.value);
        flowVelocity.value = result;

    } else {
        let result = getColDiameter(flowVelocity.value, volFlowRate.value);
        colDiameter.value = result;
    }
}

// event listeners

calculateButton.addEventListener("click", function () {
    if (checkTickedBoxes()) {
        whichCalculation();
        hasCalculatedBefore = true;
    }
})

// update listeners


flowVelocity.addEventListener("input", function () {
    if (hasCalculatedBefore) {
        if (checkTickedBoxes()) {
            whichCalculation();
        }
    }
})

colDiameter.addEventListener("input", function () {
    if (hasCalculatedBefore) {
        if (checkTickedBoxes()) {
            whichCalculation();
        }
    }
})

volFlowRate.addEventListener("input", function () {
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

// inputs buttons and variable
// const lPerH = document.querySelector("#L/h");
// const mlPerMin = document.querySelector("#mL/min");

// const convert = document.querySelector("#convert");
// const resetConvert = document.querySelector("#reset-convert");

// let hasConvertedBefore = false;


// secondary math functions

function getmLperMin(lperh) {
    let result = (lperh * 1000 / 60).toFixed(2);
    mlPerMin.value = result
}

function getLperH(mlpermin) {
    let result = (mlpermin * 60 / 1000).toFixed(3);
    lPerH.value = result;
}

function whichConvertCalculation() {
    if (!lPerH.value && !mlPerMin.value) {
        alert("Please ensure that both boxes are filled in and are not 0");
        hasConvertedBefore = false
    } else if (lPerH.value && mlPerMin.value) {
        // getmLperMin(lPerH.value);
        alert("Ensure that one of these fields is left blank");
        hasConvertedBefore = false;
    } else if (!lPerH.value) {
        getLperH(mlPerMin.value)
        // let result = getLperH(mlPerMin.value)
        // lPerH.value = result
    } else if (!mlPerMin.value) {
        // let result = getmLperMin(lPerH.value)
        // mlPerMin.value = result;
        getmLperMin(lPerH.value);
    }
}

lPerH.addEventListener("input", function () {
    if (hasConvertedBefore) {
        getmLperMin(this.value)
    }
})

mlPerMin.addEventListener("input", function () {
    if (hasConvertedBefore) {
        getLperH(this.value)
    }
})

convert.addEventListener("click", function () {
    hasConvertedBefore = true;
    whichConvertCalculation()

    // alert("convert")
})

resetConvert.addEventListener("click", function () {
    hasConvertedBefore = false;
    lPerH.value = "";
    mlPerMin.value = "";
    // alert("deconvert")
})
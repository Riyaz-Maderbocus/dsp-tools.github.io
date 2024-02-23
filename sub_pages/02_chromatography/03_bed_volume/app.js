// checkboxes

const bedheightCheckbox = document.querySelector("#bedh_check");
const coldiameterCheckbox = document.querySelector("#col_check");
const bedvolCheckbox = document.querySelector("#bedv_check");

const allCheckboxes = [bedheightCheckbox, coldiameterCheckbox, bedvolCheckbox];

// inputs

const bedHeight = document.querySelector("#bed_height");

const colDiameter = document.querySelector("#col_diameter");

const bedVolume = document.querySelector("#bed_volume");

let allInputs = [bedHeight, colDiameter, bedVolume];
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
function getBedVolume(bedHeight, colDiameter) {
    const area = ((colDiameter / 2) / 10) ** 2 * Math.PI;
    // console.log(area);
    return (area * bedHeight).toFixed(2);
}

function getBedHeight(bedVolume, colDiameter) {
    const area = ((colDiameter / 2) / 10) ** 2 * Math.PI;
    return (bedVolume / area).toFixed(2);
}

function getDiameter(bedHeight, bedVolume) {


    return (Math.sqrt((bedVolume / bedHeight) / Math.PI)).toFixed(2) * 20


}


function whichCalculation() {
    if (bedheightCheckbox.checked && coldiameterCheckbox.checked) {
        // console.log("opt1");
        let result = getBedVolume(bedHeight.value, colDiameter.value);

        bedVolume.value = result;

    } else if (coldiameterCheckbox.checked && bedvolCheckbox.checked) {
        let result = getBedHeight(bedVolume.value, colDiameter.value);
        bedHeight.value = result;
    } else {
        // console.log("opt3")
        let result = getDiameter(bedHeight.value, bedVolume.value);
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

bedHeight.addEventListener("input", function () {
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

bedVolume.addEventListener("input", function () {
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
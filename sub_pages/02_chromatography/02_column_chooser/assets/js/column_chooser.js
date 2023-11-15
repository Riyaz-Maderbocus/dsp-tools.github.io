class Column {
    constructor(html_id, name, img_src, diameter, minvol, maxVol, minHeight, maxHeight) {
        this.id = html_id;
        this.name = name;
        this.img_src = img_src;
        this.diameter = diameter;
        this.minVol = minvol;
        this.maxVol = maxVol;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.calculatedVolume = "";
        this.caluatedHeight = "";

    }

    getCard() {
        this.card = document.querySelector(`#${this.id}`);
    }
}


const all_columns = [
    new Column("axi_100_300", "Axichrom 100/300", "./assets/img/axichrom_stock.png", 100, 790, 2360, 10, 30),
    new Column("axi_100_500", "Axichrom 100/500", "./assets/img/axichrom_stock.png", 100, 2360, 3900, 30, 50),
    new Column("axi_140_300", "Axichrom 140/300", "./assets/img/axichrom_stock.png", 140, 1540, 4620, 10, 30),
    new Column("axi_200_300", "Axichrom 200/300", "./assets/img/axichrom_stock.png", 200, 3140, 9420, 10, 30),
    new Column("axi_70_300", "Axichrom 70/300", "./assets/img/axichrom_stock.png", 70, 390, 1150, 10, 30),
    new Column("bpg_140_950", "BPG 140/950", "./assets/img/bpg_stock.png", 140, 7080, 8400, 46, 55),
    new Column("xk_16_100", "XK 16/100", "./assets/img/xk_stock.png", 16, 136, 191, 68, 95),
    new Column("xk_16_70", "XK 16/70", "./assets/img/xk_stock.png", 16, 76, 147, 38, 65),
    new Column("xk_26_40", "XK 26/40", "./assets/img/xk_stock.png", 26, 45, 185, 8.5, 35),
    new Column("xk_26_70", "XK 26/70", "./assets/img/xk_stock.png", 26, 204, 345, 38.5, 65),
    new Column("xk_50_20", "XK 50/20", "./assets/img/xk_stock.png", 50, 20, 274, 1, 14),
    new Column("hiscale_16_20", "HiScale 16/20", "./assets/img/hiscale_stock.png", 16, 4, 40, 2, 20),
    new Column("hiscale_16_40", "HiScale 16/40", "./assets/img/hiscale_stock.png", 16, 16, 80, 8, 40),
    new Column("hiscale_26_40", "HiScale 26/40", "./assets/img/hiscale_stock.png", 26, 69, 212, 13, 40),
    new Column("hiscale_50_20", "HiScale 50/20", "./assets/img/hiscale_stock.png", 50, 19.6, 392, 1, 20),
    new Column("hiscale_50_40", "HiScale 50/40", "./assets/img/hiscale_stock.png", 50, 274, 785, 14, 40),

];

const columnsSection = document.querySelector(".columns-section");

for (let col of all_columns) {
    // Create card
    let newCard = document.createElement("div");
    newCard.id = col.id;
    newCard.classList.add("column-card");

    // create header for card
    let newHeader = document.createElement("div");
    newHeader.classList.add("column-header");
    let columnTitle = document.createElement("p");
    columnTitle.classList.add("column-title");
    columnTitle.innerText = `${col.name}`
    newHeader.append(columnTitle);
    newCard.append(newHeader);

    // create image section for card
    let imgSection = document.createElement("div");
    imgSection.classList.add("img-div");

    let newImg = document.createElement("img");
    newImg.classList.add("column-img");
    newImg.src = `${col.img_src}`;
    imgSection.append(newImg);
    newCard.append(imgSection);


    // single mode selection
    // -------------------

    // 1single column selector
    let newSingleColSelection = document.createElement("div");
    newSingleColSelection.classList.add("single-column-selection");



    // 2new mode selection div
    let newModeSelection = document.createElement("div");
    newModeSelection.classList.add("mode-selection");

    // 3a new heading for mode selection
    let newHeading = document.createElement("h3");
    newHeading.innerText = "Choose which mode you need and input your value into the relevant box";
    // 3a append new heading
    newModeSelection.append(newHeading);

    // 3b Create newSelection section
    let newSelectionSection = document.createElement("div");
    newSelectionSection.classList.add("selection-section");


    // 4a Create volume selection section pluse selector div
    let newVolumeSelectionSection = document.createElement("div");
    newVolumeSelectionSection.classList.add("volume-selection-section", "selector-div");


    // 5a create new volume label input
    let newVolumeLabelInputDiv = document.createElement("div");
    newVolumeLabelInputDiv.classList.add("label-input");

    // 6a create volume radio button

    let newVolumeRadioButton = document.createElement("input");
    newVolumeRadioButton.setAttribute("type", "radio");
    newVolumeRadioButton.setAttribute("name", "mode");
    newVolumeRadioButton.classList.add("single-radio-button");
    newVolumeRadioButton.id = `${col.id}-single-vol-mode`;

    // 6a append newVolumeRadioButton to 5a newVolumeLabelInputDiv
    newVolumeLabelInputDiv.append(newVolumeRadioButton);

    // 6b create new vol label
    let newVolumeLabel = document.createElement("label");
    newVolumeLabel.setAttribute("for", `${col.id}-single-vol-mode`);
    newVolumeLabel.innerText = "Use resin volume mode (mL)";

    // 6b append new vollabel to 5a newVolumelabelInputDiv
    newVolumeLabelInputDiv.append(newVolumeLabel);
    // 5a append newvolume label input div to 4a newVolumeSelectionSection
    newVolumeSelectionSection.append(newVolumeLabelInputDiv);

    // 5b create volume input
    let newVolumeInput = document.createElement("input");
    newVolumeInput.setAttribute("type", "number");
    newVolumeInput.setAttribute("name", "resin-volume");
    newVolumeInput.id = `${col.id}-single-resin-volume`;
    newVolumeInput.classList.add("number-input");

    // 5b append volume input to 4a newVolumeSelectionSection
    newVolumeSelectionSection.append(newVolumeInput);

    // 4a append newVolumeSelection to 3b newSelectionSection
    newSelectionSection.append(newVolumeSelectionSection);

    // 4b create new Bed selection section div
    let newBedhSelectionSection = document.createElement("div");
    newBedhSelectionSection.classList.add("bedh-selection-section", "selector-div");

    // 5c create new bedh label input div
    let newBedhLabelInputDiv = document.createElement("div");
    newBedhLabelInputDiv.classList.add("label-input");




    // 6c create bedh radio button
    let newBedhRadioButton = document.createElement("input");
    newBedhRadioButton.setAttribute("type", "radio");
    newBedhRadioButton.setAttribute("name", "mode");
    newBedhRadioButton.id = `${col.id}-single-bedh-mode`
    newBedhRadioButton.classList.add("single-radio-button");

    // 6c append bedh radio button to 5c newBedhlabelInputDiv
    newBedhLabelInputDiv.append(newBedhRadioButton);

    // 6d create bedh label
    let newBedhLabel = document.createElement("label");
    newBedhLabel.setAttribute("for", `${col.id}-single-bedh-mode`);
    newBedhLabel.innerText = "Use bed height mode (cm)";

    // 6d append bedh label to 5c newBedhlabelInputDiv
    newBedhLabelInputDiv.append(newBedhLabel);


    // 5c append new bedh label input div to 4b newBedhSelectionSection
    newBedhSelectionSection.append(newBedhLabelInputDiv);

    // 5d create bedH input
    let newBedhInput = document.createElement("input");
    newBedhInput.setAttribute("type", "number");
    newBedhInput.setAttribute("name", "bed-height");
    newBedhInput.setAttribute("step", "0.1");
    newBedhInput.id = `${col.id}-single-bedh-volume`;
    newBedhInput.classList.add("number-input");

    // 5d append bedh input to 4b newBedhSelectionSection
    newBedhSelectionSection.append(newBedhInput);
    // 4b append newbed selection section div to 3b newSelectionSection
    newSelectionSection.append(newBedhSelectionSection);

    // 4c create button div
    let newButtonSection = document.createElement("div");
    newButtonSection.classList.add("button-section", "selector-div");

    // 5e make reset button
    let newResetButton = document.createElement("button");
    newResetButton.innerText = "Reset";
    newResetButton.id = "single-reset-button";
    newResetButton.classList.add("mode-button", "single-reset-button");

    // 5e append resest button to 4c button div

    newButtonSection.append(newResetButton);

    // 5f make calc button
    let newCalcButton = document.createElement("button");
    newCalcButton.innerText = "Calculate";
    newCalcButton.id = "single-calculate-button";
    newCalcButton.classList.add("mode-button", "single-calculate-button");

    // 5f append cacl button to 4c button div
    newButtonSection.append(newCalcButton);

    // 4c append buttondive to 3b newSelectionSection
    newSelectionSection.append(newButtonSection);

    // 3b append new SelectionSection to 2 modeSelectionDiv
    newModeSelection.append(newSelectionSection);


    // 2 append new mode seleciton div to 1 newSingleColSelectionDiv
    newSingleColSelection.append(newModeSelection);

    // 1 append single column section to card
    newCard.append(newSingleColSelection);


    // --------------------------

    // column stats section
    let colStatsDiv = document.createElement("div");
    colStatsDiv.classList.add("column-stats");

    // Diameter text
    let diameterP = document.createElement("p");
    diameterP.classList.add("stats-p", "diameter");
    diameterP.innerText = "Diameter (mm): ";
    let diameterSpan = document.createElement("span");
    diameterSpan.innerText = `${col.diameter}`;
    diameterP.append(diameterSpan);
    colStatsDiv.append(diameterP);

    // Min Vol Text
    let minVolP = document.createElement("p");
    minVolP.classList.add("stats-p", "min-vol");
    minVolP.innerText = "Min Volume (mL): ";
    let minVolSpan = document.createElement("span");
    minVolSpan.innerText = `${col.minVol}`;
    minVolP.append(minVolSpan);
    colStatsDiv.append(minVolP);

    // MaxVol Text
    let maxVolP = document.createElement("p");
    maxVolP.classList.add("stats-p", "max-vol");
    maxVolP.innerText = "Max Volume (mL): ";
    let maxVolSpan = document.createElement("span");
    maxVolSpan.innerText = `${col.maxVol}`;
    maxVolP.append(maxVolSpan);
    colStatsDiv.append(maxVolP);

    // Caculated volumn
    let calcVolP = document.createElement("p");
    calcVolP.classList.add("stats-p", "calculated-volume");
    calcVolP.innerText = "Calculated Vol (mL): ";
    let calcVolSpan = document.createElement("span");
    calcVolSpan.innerText = `${col.calculatedVolume}`;
    calcVolP.append(calcVolSpan);
    colStatsDiv.append(calcVolP);

    // Min Bed height Text
    let minHeightP = document.createElement("p");
    minHeightP.classList.add("stats-p", "min-height");
    minHeightP.innerText = "Min Height (cm): ";
    let minHeightSpan = document.createElement("span");
    minHeightSpan.innerText = `${col.minHeight}`;
    minHeightP.append(minHeightSpan);
    colStatsDiv.append(minHeightP);

    // Max Bed height Text
    let maxHeightP = document.createElement("p");
    maxHeightP.classList.add("stats-p", "max-height");
    maxHeightP.innerText = "Max Height (cm): ";
    let maxHeightSpan = document.createElement("span");
    maxHeightSpan.innerText = `${col.maxHeight}`;
    maxHeightP.append(maxHeightSpan);
    colStatsDiv.append(maxHeightP);

    // Caculated height
    let calcHeightP = document.createElement("p");
    calcHeightP.classList.add("stats-p", "calculated-height");
    calcHeightP.innerText = "Calculated Height (cm): ";
    let calcHeightSpan = document.createElement("span");
    calcHeightSpan.innerText = `${col.caluatedHeight}`;
    calcHeightP.append(calcHeightSpan);
    colStatsDiv.append(calcHeightP);

    newCard.append(colStatsDiv);

    // Close button
    let closeDiv = document.createElement("div");
    closeDiv.classList.add("close-button");

    // close button lines
    let closeLines = document.createElement("div");
    closeLines.classList.add("lines");
    closeDiv.append(closeLines);

    newCard.append(closeDiv);


    // add card to the column section
    columnsSection.append(newCard);
}

// cardParentDiv.addEventListener("click", () => {
//     alert("I got clicked")
// })

const test = document.querySelector("#test");

// Radio buttons
const volMode = document.querySelector("#volume-mode");
const heightMode = document.querySelector("#bedh-mode");

// user inputs
const volInput = document.querySelector("#resin-volume");
const heightInput = document.querySelector("#bedh-height");

// Buttons
const calcButton = document.querySelector("#calculate-button");
const resetButton = document.querySelector("#reset-button");

// Settings
// let hasCalculatedAlready = false;

// column Selection area
const columnSelect = document.querySelector(".columns-section");


// This works currently
// calcButton.addEventListener("click", () => {
//     // alert("I got clicked");
//     let userVol = parseFloat(volInput.value);
//     let userHeight = parseFloat(heightInput.value);

//     if (checkMode() === "volMode") {
//         // alert("volmode")
//         if (userVol === NaN || !userVol) {
//             alert("Please enter a value in resin volume field");
//         } else {
//             for (let col of all_columns) {
//                 let newArea = (col.diameter / 20) ** 2 * Math.PI;

//                 // let newHeight = (userVol / newArea).toFixed(2);
//                 let newHeight = calculateHeight(userVol, newArea).toFixed(2);
//                 col.calculatedVolume = userVol;
//                 let volSpan = document.querySelector(`#${col.id} .calculated-volume span`);
//                 volSpan.innerText = userVol;
//                 let heightSpan = document.querySelector(`#${col.id} .calculated-height span`);
//                 heightSpan.innerText = newHeight;
//             }
//         }
//     } else {
//         alert("height mode")
//     }

// })




calcButton.addEventListener("click", () => {
    // alert("I got clicked");
    let userVol = parseFloat(volInput.value);
    let userHeight = parseFloat(heightInput.value);

    if (!volMode.checked && !heightMode.checked) {
        alert("Please choose your mode and put your value into the appropriate field")
    } else if (checkMode() === "volMode") {
        // alert("volmode")
        if (userVol === NaN || !userVol) {
            alert("Please enter a value in resin volume field");
        } else {
            for (let col of all_columns) {
                // let newArea = (col.diameter / 20) ** 2 * Math.PI;

                let newArea = getArea(col);

                // let newHeight = (userVol / newArea).toFixed(2);
                // let newHeight = calculateHeight(userVol, newArea).toFixed(2);
                // col.calculatedVolume = userVol;
                // let volSpan = document.querySelector(`#${col.id} .calculated-volume span`);
                // volSpan.innerText = userVol;
                // let heightSpan = document.querySelector(`#${col.id} .calculated-height span`);
                // heightSpan.innerText = newHeight;
                resetFormatting(col);
                calcHeight(userVol, newArea, col);
                colorText(col);
                // hasCalculatedAlready = true;
            }
        }
    } else {
        // alert("height mode");
        if (userHeight === NaN || !userHeight) {
            alert("Please enter a value in the bed height field")
        } else {
            for (let col of all_columns) {

                let newArea = getArea(col);
                resetFormatting(col);
                calcVol(userHeight, newArea, col);
                colorText(col);
                // hasCalculatedAlready = true;
            }
        }
    }

})

// making listeners for the cards

const allCards = document.querySelectorAll(".column-card");

resetButton.addEventListener("click", () => {
    // if (hasCalculatedAlready === true) {
    //     for (let col of all_columns) {
    //         resetFormatting(col);
    //         hardReset(col);
    //     }
    //     // reset gui
    //     volMode.checked = true;
    //     volInput.value = "";
    //     heightInput.value = "";
    //     hasCalculatedAlready = false;
    // } else {
    //     volMode.checked = true;
    //     volInput.value = "";
    //     heightInput.value = "";
    //     hasCalculatedAlready = false;
    // }

    for (let col of all_columns) {
        resetFormatting(col);
        hardReset(col);
    }
    // reset gui
    volMode.checked = true;
    volInput.value = "";
    heightInput.value = "";
    // hasCalculatedAlready = false;

    // for (let card of allCards) {
    //     card.classList.remove("greyed-out")
    // }
    // if (hasCalculatedAlready == true) {
    //     alert("clicked and it set to true")
    // }
})


// Check to see what mode


let checkMode = () => {
    if (volMode.checked) {
        return "volMode"
    } else {
        return "heightMode"
    }
}

// get area from column parameters
let getArea = (column) => {
    return (column.diameter / 20) ** 2 * Math.PI;
}
// Work out height from volume input

let calcHeight = (volResin, area, column) => {
    column.calculatedVolume = volResin;
    let volSpan = document.querySelector(`#${column.id} .calculated-volume span`);
    volSpan.innerText = volResin;

    column.calculatedHeight = (volResin / area).toFixed(2);
    let heightSpan = document.querySelector(`#${column.id} .calculated-height span`);
    heightSpan.innerText = column.calculatedHeight;
    // return volResin / area
}



// Work out volume from height input

let calcVol = (height, area, column) => {
    column.calculatedHeight = height;
    let heightSpan = document.querySelector(`#${column.id} .calculated-height span`);
    heightSpan.innerText = height;

    column.calculatedVolume = (height * area).toFixed(2);
    let volSpan = document.querySelector(`#${column.id} .calculated-volume span`);
    volSpan.innerText = column.calculatedVolume;
}


let colorText = (column) => {
    // height formatting
    let heightSpan = document.querySelector(`#${column.id} .calculated-height span`);
    let volSpan = document.querySelector(`#${column.id} .calculated-volume span`);
    let card = document.querySelector(`#${column.id}`);

    if (column.calculatedHeight < column.minHeight || column.calculatedHeight > column.maxHeight) {
        // let heightSpan = document.querySelector(`#${column.id} .calculated-height span`);
        heightSpan.classList.add("red-text");
        // let card = document.querySelector(`#${column.id}`);
        // card.classList.add(".greyed-out");
    } else {
        // let heightSpan = document.querySelector(`#${column.id} .calculated-height span`);
        heightSpan.classList.add("green-text");
        // let card = document.querySelector(`#${column.id}`);
        // card.classList.add("greyed-out");
    }

    // volume fomatting

    if (column.calculatedVolume < column.minVol || column.calculatedVolume > column.maxVol) {
        // let volSpan = document.querySelector(`#${column.id} .calculated-volume span`);
        volSpan.classList.add("red-text");
        // let card = document.querySelector(`#${column.id}`);
        // card.classList.add(".greyed-out");
    } else {
        // let volSpan = document.querySelector(`#${column.id} .calculated-volume span`);
        volSpan.classList.add("green-text");
    }

    // card formatting


    if (volSpan.classList.contains("red-text") || heightSpan.classList.contains("red-text")) {
        card.classList.add("greyed-out");
    }

}

// remove formatting of colours and cards
let resetFormatting = (column) => {
    let heightSpan = document.querySelector(`#${column.id} .calculated-height span`);
    let volSpan = document.querySelector(`#${column.id} .calculated-volume span`);
    let card = document.querySelector(`#${column.id}`);

    card.classList.remove("greyed-out");

    heightSpan.classList.remove("red-text", "green-text");
    volSpan.classList.remove("red-text", "green-text");


}


// hard reset - return to initial state 
let hardReset = (column) => {

    // reset column values
    column.calculatedVolume = "";
    column.calculatedHeight = "";

    // delete spans
    let heightSpan = document.querySelector(`#${column.id} .calculated-height span`);
    let volSpan = document.querySelector(`#${column.id} .calculated-volume span`);
    heightSpan.innerText = "";
    volSpan.innerText = "";





}



// let cardSelectMode = false;


// go to expand mode
for (let card of allCards) {


    card.addEventListener("click", (e) => {
        // cardSelectMode = true;
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.closest(".column-card"));

        let selectedCard = e.target.closest(".column-card");
        selectedCard.classList.add("expanded");
        selectedCard.classList.remove("greyed-out");
        // console.log(e.target.closest(".column-card").id);
        let id_key = selectedCard.id;

        let selectedColumn = null;
        for (let c of all_columns) {
            if (c.id === id_key) {
                selectedColumn = c;
            }

        }



        for (let card of allCards) {
            if (card.id !== id_key)
                card.classList.add("disable-card");
        }


        selectedCard.classList.remove("disable-card");
        document.body.classList.add("hide", "disable-main-scroll");



    })


}

// go to close mode

const allCloseButtons = document.querySelectorAll(".close-button");
let findIdcard = null



for (let closebutton of allCloseButtons) {

    closebutton.addEventListener("click", (e) => {
            // alert("I got clicked");

            // console.log(e.target);
            let closeSelectedCard = e.target.closest(".column-card");
            let selectedColumn = null;

            for (col of all_columns) {
                if (closeSelectedCard.id === col.id) {
                    selectedColumn = col
                }
            }
            // findIdcard = closeSelectedCard.id
            // console.log(closeSelectedCard.id);
            // console.log(closeSelectedCard.classList);
            closeSelectedCard.classList.remove("expanded");

            // card closing grey out
            let heightSpan = document.querySelector(`#${selectedColumn.id} .calculated-height span`);
            let volSpan = document.querySelector(`#${selectedColumn.id} .calculated-volume span`);

            if (volSpan.classList.contains("red-text") || heightSpan.classList.contains("red-text")) {
                closeSelectedCard.classList.add("greyed-out");
            }



            for (let card of allCards) {
                card.classList.remove("expanded");
                card.classList.remove("disable-card");
            }

            document.body.classList.remove("hide", "disable-main-scroll");
            e.stopPropagation()
        }

    )

}



// single labels for radio button

const singleRadioButtons = document.querySelectorAll(".single-column-selection input[type='radio']");

for (let radio of singleRadioButtons) {
    radio.addEventListener("change", (e) => {

        e.stopPropagation()
    })
}


// single check mode
let singleCheckMode = (colId) => {
    let volRadioButton = document.querySelector(`#${colId}-single-vol-mode`);
    let bedRadioButton = document.querySelector(`#${colId}-single-vol-mode`);
    if (volRadioButton.checked) {
        return "volMode"
    } else if (bedRadioButton.checked) {
        return "heightMode"
    }
}


// all single calculate buttons

const singleCalcButtons = document.querySelectorAll(".single-calculate-button");

for (let button of singleCalcButtons) {


    button.addEventListener("click", (e) => {

        // get the column id
        let selectedCard = e.target.closest(".column-card");

        // console.log(selectedCard);
        let selectedId = selectedCard.id;
        let selectedColumn = null;
        for (let col of all_columns) {
            if (col.id === selectedId) {
                selectedColumn = col
            }
        }

        // get the numbers from the input boxes
        let singleVolInputBox = document.querySelector(`#${selectedColumn.id}-single-resin-volume`);
        let singleBedInputBox = document.querySelector(`#${selectedColumn.id}-single-bedh-volume`);
        let userSingleVolInput = parseFloat(singleVolInputBox.value);
        let userSingleBedInput = parseFloat(singleBedInputBox.value);

        // adding radio check statemtent
        let singleVolRadioButton = document.querySelector(`#${selectedColumn.id}-single-vol-mode`);
        let singleBedRadioButton = document.querySelector(`#${selectedColumn.id}-single-bedh-mode`);
        // console.log(singleVolRadioButton)
        // console.log(singleBedRadioButton)

        if (!singleVolRadioButton.checked && !singleBedRadioButton.checked) {
            alert("Please choose a mode and enter a value into the number box")
        } else if (singleCheckMode(selectedColumn.id) === "volMode") {
            if (userSingleVolInput === NaN || !userSingleVolInput) {
                alert("Please enter a value in resin volume field");
            } else {
                let newArea = getArea(selectedColumn);
                resetFormatting(selectedColumn);
                calcHeight(userSingleVolInput, newArea, selectedColumn);
                colorText(selectedColumn);

                // hasCalculatedAlready = true;

            }
        } else {
            // alert("height mode")
            if (userSingleBedInput === NaN || !userSingleBedInput) {
                alert("Please enter a value in the bed height field")
            } else {
                let newArea = getArea(selectedColumn);
                resetFormatting(selectedColumn);
                calcVol(userSingleBedInput, newArea, selectedColumn);
                colorText(selectedColumn);
                // hasCalculatedAlready = true;


            }
            // alert("single c got clicked");

        }
    })
}

// all single reset buttons
const singleResetButtons = document.querySelectorAll(".single-reset-button");

// reset eventlistener for single reset buttons
for (let button of singleResetButtons) {
    button.addEventListener("click", (e) => {
        let selectedCard = e.target.closest(".column-card");

        // console.log(selectedCard);
        let selectedId = selectedCard.id;
        let selectedColumn = null;
        for (let col of all_columns) {
            if (col.id === selectedId) {
                selectedColumn = col
            }
        }

        let singleVolInputBox = document.querySelector(`#${selectedColumn.id}-single-resin-volume`);
        let singleBedInputBox = document.querySelector(`#${selectedColumn.id}-single-bedh-volume`);
        singleVolInputBox.value = "";
        singleBedInputBox.value = "";
        resetFormatting(selectedColumn);
        hardReset(selectedColumn);
        // hasCalculatedAlready = false;
    })
}
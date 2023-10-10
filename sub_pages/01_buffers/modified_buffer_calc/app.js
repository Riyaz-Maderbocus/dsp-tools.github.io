const form = document.querySelector("#form");
const resetButton = document.querySelector("#reset");

let answerSection = document.querySelector(".answer");


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

let c3Data = {
    userEntry: form.elements.c3,
    num: null,
    makeNumber() {
        return Number(this.userEntry.value)
    },
    unitEntry: form.elements.c3units,
    units: null,
    getUnits() {
        return this.unitEntry.value
    },
    adjNum: null,
}

let allOjects = [c1Data, v1Data, c2Data, c3Data];


form.addEventListener("submit", function (e) {
    e.preventDefault();




    let numArray = [];
    let unitArray = [];

    for (let data of allOjects) {

        data.num = data.makeNumber();
        data.units = data.getUnits();
        unitArray.push(data.units)
        numArray.push(data.num);
    }




    if (numArray.includes(NaN) || numArray.includes(0)) {

        alert("Use numbers, fill all inputs and don't use 0 in the inputs next time");

        // } else if (unitArray.includes("")) {
        //     alert("Please fill out all unit fields");

    } else {



        remove_answer();
        let adjustedArray = [];


        for (let obj of allOjects) {
            obj.adjNum = adjustNumber(obj.num, obj.units);
            adjustedArray.push(obj.adjNum);
        }

        console.log(adjustedArray);

        // Remove this condtional and just reun result2 and createText2 lines if needed
        if (adjustedArray[3] >= adjustedArray[2]) {
            alert("Please ensure that C3 is not greater than C2")
        } else {
            let result2 = calculate2(c1Data, v1Data, c2Data, c3Data);
            createText2(result2)
        }



    }


})



function calculate2(c1, v1, c2, c3) {
    let totalv2 = c2.adjNum - c3.adjNum;
    let otherComponents = (c3.adjNum * v1.adjNum) - (c1.adjNum * v1.adjNum);
    let finalv2 = otherComponents / totalv2;
    let finalv2Rounded = finalv2.toPrecision(4);
    let ratio = (finalv2 / v1.adjNum).toPrecision(4);

    return [finalv2Rounded, ratio, c1, v1, c2, c3];
}



function createText2(resultsArray) {
    let p1 = document.createElement("p");
    p1.innerHTML = `You will need <span class="answer_span">${resultsArray[0]} L</span> or <span class="answer_span">${(resultsArray[0] *1000).toFixed(4)} mL</span> of ${resultsArray[4].num} ${resultsArray[4].units} solution to add to ${resultsArray[3].num} ${resultsArray[3].units} of ${resultsArray[2].num} ${resultsArray[2].units} starting concentration`
    answerSection.appendChild(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = `For 1 mL of ${resultsArray[2].num} ${resultsArray[2].units} concentration, add <span class="answer_span">${resultsArray[1]} mL</span> of ${resultsArray[4].num} ${resultsArray[4].units} concentration solution`
    answerSection.appendChild(p2);
}

function remove_answer() {
    answerSection.innerHTML = "";

}

function adjustNumber(startnum, unit) {
    if (unit === "M" || unit === "L") {
        return startnum
    } else if (unit === "mM" || unit === "mL") {
        return startnum / 1000
    } else if (unit === "uM") {
        return startnum / 1000000
    }
}

resetButton.addEventListener("click", (e) => {

    window.location.reload();
})
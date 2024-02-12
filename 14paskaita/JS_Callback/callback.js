function downloadData(callback) {
    // cia vyksta kazkoks kazko atsisiuntimas... ir tai trunka ilgai
    const data = "data"; //cia yra kazkokie atsisiusti duomenys
    callback(data);
}

function printDataToConsole(data) {
    console.log(data);
}

downloadData(printDataToConsole);

// ----------------------------------------------------------------------

function handleClick() {
    console.log("button was clicked");
}
let button = document.querySelector("#button").addEventListener("click", handleClick);
// Get references to the HTML elements
// Use jQuery to select the slider elements and their corresponding value spans
const lvotSlider = $("#lvotSlider");
const lvotValue = $("#lvotValue");
const vtiSlider = $('#vtiSlider');
const vtiValue = $('#vtiValue');
const lvedvSlider = $("#lvedvSlider");
const lvedvValue = $("#lvedvValue");
const efSlider = $("#efSlider");
const efValue = $("#efValue");

// Update parameters dynamically as the user adjusts the sliders
function updateSliders() {
    const lvot = parseFloat(lvotSlider.val());
    const vti = parseFloat(vtiSlider.val());
    const lvedv = parseFloat(lvedvSlider.val());
    const ef = parseFloat(efSlider.val());

    lvotValue.text(lvot);
    lvedvValue.text(lvedv); 
    efValue.text(ef); 
    vtiValue.text(vti); //MR VTI

    //calculate & update the Total SV
    var totalSV = lvedv * ef/100;
    $('.TSV').text(totalSV.toFixed(2));

    //calculate & update RVol
    var rvol = totalSV - lvot;
    $('.rvol').text(rvol.toFixed(1));
    //update the rvol severity
    var rvolSeverity = ''
    if (rvol >= 60) {
        rvolSeverity = 'severe';
    } else if (rvol >= 30) {
        rvolSeverity = 'moderate';
    } else if (rvol >= 0) {
        rvolSeverity = 'mild';
    } else {
        rvolSeverity = 'hmm...';//error
    }
    $('.rvolSeverity').text(rvolSeverity);
    
    //calculate & update the RF
    var rf = 100 * (rvol / totalSV);
    $('.rf').text(rf.toFixed(1));
    //update the RF severity
    var rfSeverity = ''
    if (rf >= 50) {
        rfSeverity = 'severe';
    } else if (rf >= 30){
        rfSeverity = 'moderate';
    } else if (rf >= 0) {
        rfSeverity = 'mild';
    } else {
        rfSeverity = 'hmm...';//error
    }
    $('.rfSeverity').text(rfSeverity);
    //calculate & update the EROA
    var eroa = rvol / vti;
    $('.eroa').text(eroa.toFixed(3));
    //update the EROA severity
    //console.log(eroa);
    var severity = '';
    if (eroa >= 0.40) {
        severity = 'severe'
    } else if (eroa >= 0.20) {
        severity = 'moderate'; 
    } else if (eroa >=0) {
        severity = 'mild';
    } else {
        severity = 'hmm...';//error
    }
    $('.severity').text(severity);

}

// Attach an event handler to all sliders
lvotSlider.on("input", updateSliders);
lvedvSlider.on("input", updateSliders);
efSlider.on("input", updateSliders);
vtiSlider.on("input", updateSliders);

// Initialize the sliders and make calcs
lvotSlider.trigger("input");
lvedvSlider.trigger("input");
efSlider.trigger("input");
vtiSlider.trigger("input");


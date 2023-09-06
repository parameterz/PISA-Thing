// Get references to the HTML elements
const canvas = document.getElementById("hemisphereCanvas");
const ctx = canvas.getContext("2d");

// Use jQuery to select the slider elements and their corresponding value spans
const radiusSlider = $("#radiusSlider");
const radiusValue = $("#radiusValue");
const vtiSlider = $('#vtiSlider');
const vtiValue = $('#vtiValue');
const scaleSlider = $("#scaleSlider");
const scaleValue = $("#scaleValue");
const velocitySlider = $("#velocitySlider");
const velocityValue = $("#velocityValue");

// Update the hemisphere and other parameters dynamically as the user adjusts the sliders
function updateSliders() {
    const radius = parseFloat(radiusSlider.val()/100);
    const vti = parseFloat(vtiSlider.val());
    const scale = parseFloat(scaleSlider.val()/10);
    const velocity = parseFloat(velocitySlider.val());

    radiusValue.text(radius);
    scaleValue.text(scale); //aliasing velocity
    velocityValue.text(velocity); //MR peak velocity
    vtiValue.text(vti); //MR VTI

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw the hemisphere with adjusted parameters
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius*50, Math.PI, 2*Math.PI, false); //scaling?
    ctx.fillStyle = "red"; // You can change the color
    ctx.fill();
    ctx.closePath();

    //calculate & update the shell area
    var shellArea = 2 * Math.PI * Math.pow(radius, 2);
    $('.shellArea').text(shellArea.toFixed(3));

    //calculate & update the shell flow
    var shellFlow = shellArea * scale; //'scale' is the input slider for aliasing velocity
    $('.shellFlow').text(shellFlow.toFixed(1));

    //calculate & update the EROA: shell flow / MR peak veloc
    var eroa = shellFlow / velocity;
    $('.eroa').text(eroa.toFixed(3));

    //update the EROA severity
    //console.log(eroa);
    var severity = '';
    if (eroa >= 0.40) {
        severity = 'severe'
    } else if (eroa >= 0.20) {
        severity = 'moderate'; 
    } else {
        severity = 'mild';
    }
    $('.severity').text(severity);

    //calculate the RVol
    var rvol = eroa * vti;
    $('.rvol').text(rvol.toFixed(1));
    //update the rvol severity
    var rvolSeverity = ''
    if (rvol >= 60) {
        rvolSeverity = 'severe';
    } else if (rvol >= 30) {
        rvolSeverity = 'moderate';
    } else {
        rvolSeverity = 'mild';
    }
    $('.rvolSeverity').text(rvolSeverity);
}

// Attach an event handler to all sliders
radiusSlider.on("input", updateSliders);
scaleSlider.on("input", updateSliders);
velocitySlider.on("input", updateSliders);
vtiSlider.on("input", updateSliders);

// Initialize the sliders and draw the hemisphere
radiusSlider.trigger("input");
scaleSlider.trigger("input");
velocitySlider.trigger("input");
vtiSlider.trigger("input");















/* // Get references to the HTML elements
const canvas = document.getElementById("hemisphereCanvas");
const ctx = canvas.getContext("2d");
const radiusSlider = $("#radiusSlider"); // Use jQuery to select the slider element
const radiusValue = $("#radiusValue"); // Use jQuery to select the span element

// Update the hemisphere dynamically as the user adjusts the slider
radiusSlider.on("input", function() {
    const radius = parseFloat(radiusSlider.val());
    radiusValue.text(radius/200); // Update the displayed value

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw the hemisphere
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2*Math.PI, false);
    ctx.fillStyle = "red"; // You can change the color
    ctx.fill();
    ctx.closePath();
});

// Initialize the radius value and draw the hemisphere
radiusSlider.trigger("input");
 */
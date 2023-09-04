// Get references to the HTML elements
const canvas = document.getElementById("hemisphereCanvas");
const ctx = canvas.getContext("2d");
const radiusSlider = $("#radiusSlider"); // Use jQuery to select the slider element
const radiusValue = $("#radiusValue"); // Use jQuery to select the span element

// Update the hemisphere dynamically as the user adjusts the slider
radiusSlider.on("input", function() {
    const radius = parseFloat(radiusSlider.val());
    radiusValue.text(radius/200 + " cm"); // Update the displayed value

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

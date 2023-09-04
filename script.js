// Get references to the HTML elements
const canvas = document.getElementById("hemisphereCanvas");
const ctx = canvas.getContext("2d");
const radiusInput = $("#radius"); // Use jQuery to select the input element

// Update the hemisphere dynamically as the user enters a value
radiusInput.on("input", drawHemisphere);

function drawHemisphere() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get the user's input for the radius
    const radius = parseFloat(radiusInput.val()); // Use val() to get the input value

    if (isNaN(radius) || radius <= 0) {
        alert("Please enter a valid positive number for the radius.");
        return;
    }

    // Calculate the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw the hemisphere
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2*Math.PI, false);
    ctx.fillStyle = "red"; // You can change the color
    ctx.fill();
    ctx.closePath();
}

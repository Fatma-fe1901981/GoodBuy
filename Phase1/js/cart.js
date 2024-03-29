document.addEventListener("DOMContentLoaded", function () {
  // Get the first expand button
  var expandBtn = document.querySelector(".expand-btn");

  // Add click event listener to the expand button
  expandBtn.addEventListener("click", function () {
    // Find the corresponding details-expand div
    var expandDiv = this.nextElementSibling;

    // Toggle the 'active' class to show/hide the details
    expandDiv.classList.toggle("active");

    // Change the button text based on the state
    if (expandDiv.classList.contains("active")) {
      this.textContent = "_";
    } else {
      this.textContent = "+";
    }
  });
});

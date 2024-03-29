document.addEventListener("DOMContentLoaded", function () {
  // Get the first expand button
  const expandBtn = document.querySelector(".expand-btn");

  // Add click event listener to the expand button
  expandBtn.addEventListener("click", function () {
    // Find the corresponding details-expand div
    const expandDiv = this.nextElementSibling;

    // Toggle the 'active' class to show/hide the details
    expandDiv.classList.toggle("active");

    // Change the button text based on the state
    if (expandDiv.classList.contains("active")) {
      this.textContent = "_";
    } else {
      this.textContent = "+";
    }
  });
  // Get the purchase button and form expand container
  var purchaseBtn = document.querySelector(".purchase-btn");
  var formExpand = document.querySelector(".form-expand");

  purchaseBtn.addEventListener("click", function (event) {
    // Toggle the 'show' class on the form expand container
    formExpand.classList.toggle("activef");
    if (formExpand.classList.contains("activef")) {
      this.textContent = "CANCEL";
    } else {
      this.textContent = "PURCHASE";
    }
  });
});


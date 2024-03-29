let products = [];
let users = [];
const userJSON = "/database/user.json";
const itemsJSON = "/database/items.json";
const productPrice = document.getElementById("product-price"); //reference to the price of the product
const thisProductPrice = parseFloat(productPrice.innerText); // since the product value is represented as text
const productDetails = document.querySelectorAll("#detail-item");
const purchasedQuantity = document.querySelector(".quantity");
const expandBtn = document.querySelector(".expand-btn");
const purchaseBtn = document.querySelector(".purchase-btn");
const formExpand = document.querySelector(".form-expand");
const submitBtn = document.querySelector(".submit-btn");

document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.currentUser) {
    console.log("cant read user details");
  } else {
    console.log(localStorage.currentUser);
  }
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

  purchaseBtn.addEventListener("click", handleFormValidation);
  submitBtn.addEventListener("click", handleSubmitPurchase);
});

async function getSellerID(companyName) {
  const usersData = await fetch("/database/user.json");
  const usersJSON = await usersData.json();
  const sellers = usersJSON.users.filter((user) => user.role === "seller");
  const seller = sellers.find((seller) => seller.companyName === companyName);
  if (seller) {
    return seller.ID;
  } else {
    return null; // If seller not found
  }
}
async function handleFormValidation(event) {
  //get logged in user
  //get displayed product price
  //compare them
  if (10 >= thisProductPrice) {
    // console.log(users + productsJSON);
    // Toggle the 'show' class on the form expand container
    formExpand.classList.toggle("activef");
    if (formExpand.classList.contains("activef")) {
      this.textContent = "CANCEL";
    } else {
      this.textContent = "PURCHASE";
    }
  } else {
    alert("You dont have enough balance");
  }
}
function getPurchaseDetails() {
  const purchaseDetails = { purchasedQuantity };

  // Loop through each selected element
  productDetails.forEach((element) => {
    // Get the text content of each element and push it into the values array
    values.push(element.textContent);
  });
  // Now, the values array contains the text content of all selected elements
  console.log(values);
  return purchaseDetails;
}

async function handleSubmitPurchase(event) {
  event.preventDefault();
  try {
    // Step 1: Read customer data from JSON file
    const userData = await fetch("/database/user.json");
    const userJson = await userData.json();
    console.log(userJson);
    // 2: Update customer's bank account information
    userJson.user.moneyBalance -= thisProductPrice;
    // 3: Update purchase history for customer
    userJson.user.purchasedItems.push(getPurchaseDetails());
    // 4: Update sale histories for seller
    userJson.user.itemsSold.push(getPurchaseDetails());
    // 4.2: update quantity
    // 5: Display a message to the customer
    alert("Purchase successful!");
  } catch (error) {
    console.error("Error confirming purchase:", error);
    alert(
      "There was an error confirming the purchase. Please try again later."
    );
  }
}

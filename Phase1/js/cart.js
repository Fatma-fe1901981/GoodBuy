let products = [];
let users = [];
const userJSON = "/database/user.json";
const itemsJSON = "/database/items.json";
const productPrice = document.getElementById("product-price"); //reference to the price of the product
const thisProductPrice = parseFloat(productPrice.innerText); // since the product value is represented as text
const productDetails = document.querySelectorAll("#detail-item");
const productKeys = document.querySelectorAll("#detail-key");
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
function handleFormValidation(event) {
  //get logged in user
  //get displayed product price
  //compare them
  const loggedInUser = localStorage.getItem("currentUser");
  const loggedInUserData = JSON.parse(loggedInUser);
  console.log("Logged in user balance: " + loggedInUserData.moneyBalance);
  if (loggedInUserData.moneyBalance >= thisProductPrice) {
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
  // const values = {};
  const keysArray = ["purchasedQuantity"];
  const vealuesArray = [purchasedQuantity.value];

  // Loop through each selected element
  productDetails.forEach((element) => {
    // Get the text content of each element and push it into the values array
    vealuesArray.push(element.textContent.replace(/\n/g, "").trim());
  });
  productKeys.forEach((key) => {
    keysArray.push(key.textContent);
  });
  const values = keysArray.reduce((acc, key, index) => {
    acc[key] = vealuesArray[index];
    return acc;
  }, {});
  // Now, the values array contains the text content of all selected elements
  console.log(values);
  return values;
}

// Function to find an object by a specific key
function findObjectByKey(array, key, value) {
  return array.find((obj) => obj[key] === value);
}
let usersList = [];
async function handleSubmitPurchase(event) {
  event.preventDefault();
  try {
    // Step 1: Read customer data from JSON file
    //we want to update the balance so we use let instead of const

    let userData = await fetch("/database/user.json");
    let userJson = await userData.json();
    usersList = userJson.users;
    // let users = JSON.stringify(usersList);
    // console.log("Fetch: " + users);
    // 2: Update customer's bank account information
    //    1:get logged in user from local storage
    let loggedInUser = localStorage.getItem("currentUser");
    let loggedInUserData = JSON.parse(loggedInUser);
    //    console to check
    console.log("logged in username: " + loggedInUserData.username);
    //    2:check if the logged in user is a customer
    if (loggedInUserData.role == "customer") {
      //  3:get the matching user from json using the username
      let usersUsername = findObjectByKey(
        usersList,
        "username",
        loggedInUserData.username
      );
      console.log(
        "the customer that matches the logged in user from json file: " +
          JSON.stringify(usersUsername)
      );
      //  4: check balance before
      console.log(
        "Balance before Prchase: " + JSON.stringify(usersUsername.moneyBalance)
      );
      console.log("Item price: " + thisProductPrice);
      // 5: change balance
      usersUsername.moneyBalance -= thisProductPrice;
      loggedInUserData.moneyBalance -= thisProductPrice;
      console.log(
        "Logged in user balance after purchase(localsrotage): " +
          loggedInUserData.moneyBalance
      );
      console.log(
        "Logged in user balance after purchase(json file): " +
          JSON.stringify(usersUsername)
      );

      // 3: Update purchase history for customer

      usersUsername.purchasedItems.push(getPurchaseDetails());
      console.log(
        "Purchased Items: " + JSON.stringify(usersUsername.purchasedItems)
      );
    } else
      alert("You are not a customer. You can only purchase as a customer.");

    // // 4: Update sale histories for seller
    //      1:get item id
    // when an item is purchased
    // we find a seller that has that item id
    //inside the array itemsBeingSold
    //and we push the id of the item in the seller's array calledd itemsSold
    // // 4.2: update quantity of prduct
    //we get the id of the item that is being displayed
    //then we decrement it quantity property
    // // 5: Display a message to the customer
    alert("Purchase successful!");
  } catch (error) {
    console.error("Error confirming purchase:", error);
    alert(
      "There was an error confirming the purchase. Please try again later."
    );
  }
}

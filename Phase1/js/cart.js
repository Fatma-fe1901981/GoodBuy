let products = [];
let users = [];
const userJSON = "/database/user.json";
const itemsJSON = "/database/items.json";
const productPrice = document.getElementById("product-price"); //reference to the price of the product
const productPriceNumber = parseFloat(productPrice.innerText); // since the product value is represented as text
const productDetails = document.querySelectorAll("#detail-item");
const productKeys = document.querySelectorAll("#detail-key");
const purchasedQuantity = document.querySelector(".quantity");
const productQuantity = document.querySelector("#product-quantity");
const productQuantityNumber = parseFloat(productQuantity.innerText);
const formExpand = document.querySelector(".form-expand");
const productImg = document.querySelector(".image");
const formCountry = document.querySelector("#country-txt");
const formCity = document.querySelector("#city-txt");
const formStreet = document.querySelector("#street-txt");
const formBuilding = document.querySelector("#building-txt");
const detailsArea = document.querySelector(".details");

document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.currentUser) {
    console.log("cant read user details");
  } else {
    console.log(localStorage.currentUser);
  }
  //call function that displays the item selected
  displaySelectedItemDetails();
});
function handlePlusbtn() {
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
}
function handleFormValidation(event) {
  //get logged in user
  //get displayed product price
  //compare them
  const loggedInUser = localStorage.getItem("currentUser");
  const loggedInUserData = JSON.parse(loggedInUser);
  console.log("Logged in user balance: " + loggedInUserData.moneyBalance);
  if (loggedInUserData.moneyBalance >= productPriceNumber) {
    // console.log(users + productsJSON);
    // Toggle the 'show' class on the form expand container
    formExpand.classList.toggle("activef");
    if (formExpand.classList.contains("activef")) {
      this.textContent = "CANCEL";
    } else {
      this.textContent = "PURCHASE";
    }
    let productsLocal = localStorage.getItem("products");
    let productsLocalData = JSON.parse(productsLocal);
    const item = productsLocalData.find(
      (i) => i.id == localStorage.clickedProductId
    );
    // console.log(
    //   "Products from local storage " + JSON.stringify(item.product_quantity)
    // );
    purchasedQuantity.max = item.product_quantity; //max value the user can select is thax quantity if iterm
    formStreet.value = loggedInUserData.shippingAddress.street;
    formBuilding.value = loggedInUserData.shippingAddress.building;
    formCountry.value = loggedInUserData.shippingAddress.country;
    formCity.value = loggedInUserData.shippingAddress.city;
  } else {
    alert(
      "You dont have enough balance. Or you are not logged in as a Customer."
    );
  }
}
function getPurchaseDetails() {
  // const values = {};
  const keysArray = ["product_quantity", "product_price", "product_image"];
  const vealuesArray = [
    purchasedQuantity.value,
    productPriceNumber,
    productImg.src,
  ];

  // Loop through each selected element
  productDetails.forEach((element) => {
    // Get the text content of each element and push it into the values array
    vealuesArray.push(element.textContent.replace(/\n/g, "").trim());
  });
  productKeys.forEach((key) => {
    keysArray.push(key.textContent);
  });
  // console.log(productDetails.value);
  // keysArray += productDetails.value; //attempt to change the name of the values
  const values = keysArray.reduce((acc, key, index) => {
    acc[key] = vealuesArray[index];
    return acc;
  }, {});
  // Now, the values array contains the text content of all selected elements
  console.log(values);
  return values;
}
async function displaySelectedItemDetails() {
  if (!localStorage.clickedProductId) {
    console.log("cant read product ID");
  } else {
    console.log(localStorage.clickedProductId);
  }
  //find the id that matches from items.json
  let itemsData = await fetch("/database/items.json");
  let itemsJson = await itemsData.json();
  const item = itemsJson.find((i) => i.id == localStorage.clickedProductId);
  console.log(item.product_name);

  detailsArea.innerHTML = `<div class="image">
  <p value="product_tag" class="tag">${item.product_tag}</p>
  <img
    src="${item.product_image}"
    alt="product image"
  />
  <button class="purchase-btn">PURCHASE</button>
</div>
<div class="side-details">
  <div class="detail-item">
    <p id="detail-key">Product</p>
    <p value="product_name" id="detail-item">${item.product_name}</p>
  </div>
  <div class="detail-item">
    <p id="detail-key">Brand</p>
    <p value="product_brand" id="detail-item">${item.product_brand}</p>
  </div>
  <div class="detail-item">
    <p id="detail-key">Category</p>
    <p value="product_category" id="detail-item">${item.product_category}</p>
  </div>
  <div class="detail-item">
    <p id="detail-key">Sub Category</p>
    <p value="product_sub_category" id="detail-item">${item.product_sub_category}</p>
  </div>
  <div class="detail-item">
    <p id="detail-key">price</p>
    <p value="product_price" id="product-price">${item.product_price} $</p>
  </div>
  <div class="detail-item">
    <p>Available Quantity</p>
    <p id="product-quantity">${item.product_quantity}</p>
  </div>
  <div class="detail-item">
    <div>
      <p id="detail-key">Ratings</p>
      <p value="product_ratings" id="detail-item">${item.product_ratings}</p>
    </div>
    <div>
      <p id="detail-key">Reviews</p>
      <p value="product_reviews" id="detail-item">${item.product_reviews}</p>
    </div>
  </div>
  <div class="detail-item-expand">
    <span id="detail-key">Details</span>
    <button class="expand-btn">+</button>
    <div class="details-expand">
      <p value="product_details" id="detail-item">
      ${item.product_description}
      </p>
    </div>
  </div>
</div>
`;
  const expandBtn = document.querySelector(".expand-btn");
  const purchaseBtn = document.querySelector(".purchase-btn");
  const submitBtn = document.querySelector(".submit-btn");

  // Add click event listener to the expand button
  expandBtn.addEventListener("click", handlePlusbtn);
  purchaseBtn.addEventListener("click", handleFormValidation);
  submitBtn.addEventListener("click", handleSubmitPurchase);
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
    //    1.2 product from local storage
    let productsLocal = localStorage.getItem("products");
    let productsLocalData = JSON.parse(productsLocal);
    const item = productsLocalData.find(
      (i) => i.id == localStorage.clickedProductId
    );
    console.log(
      "Products from local storage " + JSON.stringify(item.product_name)
    );
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
      console.log("Item price: " + productPriceNumber);
      // 5: change balance
      usersUsername.moneyBalance -=
        productPriceNumber * purchasedQuantity.value;
      loggedInUserData.moneyBalance -=
        productPriceNumber * purchasedQuantity.value;
      //if(purchasedQuantity.value<item.product_quantity)
      item.product_quantity -= purchasedQuantity.value;
      // localStorage.setItem("products", JSON.stringify(item));
      productQuantity.innerHTML = item.product_quantity;
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
      loggedInUserData.purchasedItems.push(getPurchaseDetails());
      localStorage.setItem("currentUser", JSON.stringify(loggedInUserData));
      console.log(
        "Purchased Items: " + JSON.stringify(usersUsername.purchasedItems)
      );
    } else
      alert("You are not a customer. You can only purchase as a customer.");

    // // 4: Update sale histories for seller
    //      1:get item id
    //const sellerStrigify = JSON.stringify(usersList);

    // const seller = findObjectByKey(
    //   usersList,
    //   "itemsBeingSold",
    //   localStorage.clickedProductId
    // );
    const usersLocal = JSON.parse(localStorage.getItem("users"));
    console.log("seller: " + JSON.stringify(usersLocal));

    // console.log("Seller of this item is: " + seller);
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

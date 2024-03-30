const productCardsArea = document.querySelector(".products");
const filtering = document.querySelector("#filtering");
const search = document.querySelector("#search");
let clickedProduct;

search.addEventListener("input", searchProduct);
filtering.addEventListener("input", productsCategoryFilter);

let products = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    //localStorage.removeItem("currentUser"); //to test loged in verfication before purchase
    fetchProducts();
    productsCategoryFilter();

    // other functions????
  } catch (error) {
    console.error("Failed to load products:", error);
  }
});

// Fetch products from the database folder
async function fetchProducts() {
  if (!localStorage.products) {
    const productsData = await fetch("/database/items.json");
    const productsJSON = await productsData.json();
    localStorage.products = JSON.stringify(productsJSON);
    products = JSON.parse(localStorage.products);
    console.log(products);
    return productsData;
  } else {
    return JSON.parse(localStorage.products);
  }
}

// Display products on the page
async function displayProducts(products) {
  if (products.length == 0) {
    const productsData = await fetchProducts();
    productsData
      .map((eachProduct) => formatProductDisplay(eachProduct))
      .join(" ");
  } else if (products.length > 0) {
    products.map((eachProduct) => formatProductDisplay(eachProduct)).join(" ");
  }
}

// Format product information on the page in a card format
function formatProductDisplay(product) {
  let card = document.createElement("div");
  card.classList.add("product");
  let injectedInfo = (card.innerHTML = ` 
        <img src="${product.product_image}" alt="product image">
        <div class="productName-fav">
            <p>${product.product_name}</p>
            <button type="button" id="heart"><i class="fa-regular fa-heart"></i></button>
        </div>
        <div class="price-purchase">
            <p>QR <span>${product.product_price}</span></p>
            <button id="link" >More Information</button>
        </div>
    `);
  productCardsArea.appendChild(card);

  const linkButton = card.querySelector("#link");

  linkButton.addEventListener("click", function (event) {
    viewItem(product.id);
  });

  return injectedInfo;
}

// Filter products by category and display the result on the page
async function productsCategoryFilter() {
  productCardsArea.innerHTML = "";

  let productsData = JSON.parse(localStorage.products);
  let category = filtering.value.trim();
  let itemsAfterFilter = productsData.filter(
    (product) => product.product_category == category
  );
  console.log(itemsAfterFilter);
  console.log(category);

  if (category === "all") {
    displayProducts(productsData);
  } else if (itemsAfterFilter.length > 0) {
    displayProducts(itemsAfterFilter);
  } else {
    productCardsArea.innerHTML = `<p> No items exist in this category... </p>`;
  }
}

// Search for a product by name and display the result on the page
async function searchProduct() {
  productCardsArea.innerHTML = "";

  const productsData = await fetchProducts();
  let searchInput = search.value.trim().toLowerCase();
  let itemsAfterSearch = productsData.filter(
    (product) =>
      product.product_name &&
      product.product_name.trim().toLowerCase().includes(searchInput)
  );

  if (itemsAfterSearch.length === 0) {
    productCardsArea.innerHTML = `<h1>No items found</h1>`;
  } else {
    displayProducts(itemsAfterSearch);
  }
}

// Redirect to purchase page if user is logged in or to login page if user is not logged in
function viewItem(id) {
  console.log("Button clicked");
  let loggedInUser = localStorage.getItem("currentUser");
  if (loggedInUser === "undefined" || loggedInUser == undefined) {
    alert("Please login to view more information about the product");
    window.location.href = "/sub-pages/login.html";
  } else {
    window.location.href = "/sub-pages/cart.html"; // Redirect to purchase page
    localStorage.clickedProductId = id;
  }
}

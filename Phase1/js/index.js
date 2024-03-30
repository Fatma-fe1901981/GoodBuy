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
    // document.addEventListener("click", function (event) {
    //   //  e.preventDefault();
    //   if (event.target.id === "link") {
    //     //const clickedProduct = event.target.dataset.productId;
    //     viewItem(product.id);
    //   }
    // });
    // Select the "link" button within the card
    const linkButton = card.querySelector("#link");

    // Add click event listener to the "link" button
    linkButton.addEventListener("click", function (event) {
        viewItem(product.id); // Access the correct product id
    });
    // const moreBtn = document.querySelector("#link");
    // moreBtn.addEventListener("click", viewItem); //didnt work

    return injectedInfo;
}

async function productsCategoryFilter() {
    productCardsArea.innerHTML = '';

    let productsData = localStorage.products ? JSON.parse(localStorage.products) : await fetchProducts();
    let category = filtering.value.trim();
    let itemsAfterFilter = productsData.filter(
        product => product.product_category.toLowerCase() == category
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

async function searchProduct() {
    productCardsArea.innerHTML = '';

    const productsData = await fetchProducts();
    let searchInput = search.value.trim().toLowerCase();
    let itemsAfterSearch = productsData.filter(
        (product) => product.product_name.trim().toLowerCase().includes(searchInput)
    );

    if (itemsAfterSearch.length === 0) {
        productCardsArea.innerHTML = `<p> The item(s) you are searching for do not exist... Try again!</p>`;
    } else {
        displayProducts(itemsAfterSearch);
    }
}


function viewItem(id) {
    console.log("Button clicked");
    let loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser === "undefined") {
        alert("Please login to view more information about the product");
        window.location.href = "/sub-pages/login.html";
    } else {
        window.location.href = "/sub-pages/cart.html"; // Redirect to purchase page
        //localStorage.setItem("clickedProductId", id);
        localStorage.clickedProductId = id;
        // console.log("Product Id:" + id);
    }
}

const productCardsArea = document.querySelector('.products');
const filtering = document.querySelector('#filtering');
const search = document.querySelector('#search');

search.addEventListener('input', searchProduct);
filtering.addEventListener('input', productsCategoryFilter);

let products = [];
const user = JSON.parse(localStorage.currentUser);

document.addEventListener('DOMContentLoaded', async () => {
    try {
        fetchProducts();
        productsCategoryFilter();

        // other functions????
    } catch (error) {
        console.error("Failed to load products:", error);
    }
});

async function fetchProducts() {
    if (!localStorage.products) {
        const productsData = await fetch('/database/items.json');
        const productsJSON = await productsData.json();
        localStorage.products = JSON.stringify(productsJSON);
        products = JSON.parse(localStorage.products); 
        console.log(products)
        return productsData;
    }
    else {
        return JSON.parse(localStorage.products);
    }
}

async function displayProducts(products) {
    if(products.length == 0 ) {
        const productsData = await fetchProducts();
        productsData.map(eachProduct => formatProductDisplay(eachProduct)).join(' ');
    } else if(products.length > 0 ) {
        products.map(eachProduct => formatProductDisplay(eachProduct)).join(' ');
    }
}

function formatProductDisplay(product) {
    let card = document.createElement('div');
    card.classList.add('product');
    let injectedInfo = card.innerHTML = ` 
        <img src="${product.product_image}" alt="product image">
        <div class="productName-fav">
            <p>${product.product_name}</p>
            <button type="button" id="heart"><i class="fa-regular fa-heart"></i></button>
        </div>
        <div class="price-purchase">
            <p>QR <span>${product.product_price}</span></p>
            <a href="/sub-pages/cart.html" onclick="purchaseItem(${product.id})">Purchase Item</a>
        </div>
    `
    productCardsArea.appendChild(card);

    return injectedInfo;
}

async function productsCategoryFilter() {    
    productCardsArea.innerHTML = ` `

    const productsData = await fetchProducts();

    let category = filtering.value.trim().toLowerCase(); 
    let itemsAfterFilter = [];

    if(category == "all") {
        productCardsArea.innerHTML = ` `;
        displayProducts(productsData);
    } else if(category !== "all") {
        itemsAfterFilter = productsData.filter(product => product.product_category === category.toLowerCase().trim()); 
        if(itemsAfterFilter.length == 0) {
            productCardsArea.innerHTML = ` `;
            productCardsArea.innerHTML = `<h1> No items found in this category </h1>`
        } else {
            console.log(itemsAfterFilter)
            displayProducts(itemsAfterFilter);
        }   

    }
}

async function searchProduct() {
    productCardsArea.innerHTML = ` `

    const productsData = await fetchProducts();
    let searchInput = search.value.trim().toLowerCase();
    let itemsAfterSearch = productsData.filter(product => product.product_name.trim().toLowerCase() === searchInput);

    if(itemsAfterSearch.length == 0) {
        productCardsArea.innerHTML = ` `;
        productCardsArea.innerHTML = `<h1> No items found </h1>`
    } else {
        displayProducts(itemsAfterSearch);
    }
}

function purchaseItem(id) {
    if(user == undefined) {
        alert("Please login to view products");
    } else {
        let product = products.find(product => product.id === id);
        let cart = JSON.parse(localStorage.cart);
        cart.push(product);
        localStorage.cart = JSON.stringify(cart);
        alert("Item added to cart");
    }
}
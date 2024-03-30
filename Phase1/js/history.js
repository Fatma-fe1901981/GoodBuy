const userHistory = document.querySelector('#user-info');
const sellingInfo = document.querySelector('#productSelling')
const soldInfo = document.querySelector('#productSold')
const addProductForm = document.querySelector('#btn-add');
addProductForm.addEventListener('click', addProducBtn);

document.addEventListener('DOMContentLoaded', async () => {

    try {
        const user = JSON.parse(localStorage.currentUser)
        if (user !== "undefined") {
            if (user.role === "customer") {
                console.log("im customer");
                showHistoryCustomer();

            } else if (user.role === "seller") {
                showHistoryseller();
                console.log("im seller");
                document.getElementById("btn-add").style.display = "flex";

            }
        } else {
            console.log("you are an admin");
        }

    } catch (error) {
        alert("you need to log in")
    }
});

let purchasedItemsList = []
let sellingList = []
let SoldList = []

// Display products on the page for customer
function showHistoryCustomer() {
    const customer = JSON.parse(localStorage.currentUser)
    console.log(customer);
    purchasedItemsList = customer.purchasedItems
    console.log(purchasedItemsList);
    const htmlProducts = purchasedItemsList.map(product1 => productHtml(product1)).join(" ")
    console.log(htmlProducts);
    userHistory.innerHTML = htmlProducts
}

// Display products on the page for seller
function showHistoryseller() {
    document.getElementById("soldInfo").style.display = "block";
    document.getElementById("selling-products").style.display = "block";
    const seller = JSON.parse(localStorage.currentUser)
    sellingList=seller.itemsBeingSold
    SoldList =seller.itemsSold
     const htmlSold = SoldList.map(product1 => productHtml(product1)).join(" ")
     const htmlSelling=sellingList.map(product1 => productHtml(product1)+`  <div class="soldTo">
     <p>sold to: <span>${product1.sold_to}</span></p>
     </div>`).join(" ")
 
     sellingInfo.innerHTML=htmlSelling
     soldInfo.innerHTML= htmlSold
 
}

// Format product information on the page in a card format
function productHtml(product) {
    return ` 
        <img src="${product.product_image}" alt="product image">
        <div class="productName-fav">
            <p>${product.product_name}</p>
        </div>
        <div class="price-purchase">
            <p>QR <span>${product.product_price}</span></p>
        </div>
        <div class="quantity">
            <p>quantity: <span>${product.product_quantity}</span></p>
        </div>
    `
}

// Redirect to add product page
function addProducBtn() {
    window.location.href = "/sub-pages/sellerControl.html";
}



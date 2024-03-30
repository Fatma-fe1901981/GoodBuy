
const  userHistory= document.querySelector('#user-info');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        let customer = JSON.parse(localStorage.currentUser)
        if(customer!=undefined){
        showHistory()}
        // other functions????   
        else{    
            alert("you need to log in")
        }
    
    } catch (error) {
    
    }
});

let purchasedItemsList= []

function showHistory() {
      const customer = JSON.parse(localStorage.currentUser)
      console.log(customer);
      purchasedItemsList = customer.purchasedItems
      console.log(purchasedItemsList);
      const htmlProducts = purchasedItemsList.map(product1=> productHtml(product1) ).join("")
      console.log(htmlProducts);
      userHistory.innerHTML= htmlProducts
    
}


function productHtml(product) {
    return ` 
    <img src="${product.product_image}" alt="product image">
    <div class="productName-fav">
        <p>${product.product_name}</p>
        <button type="button" id="heart"><i class="fa-regular fa-heart"></i></button>
    </div>
    <div class="price-purchase">
        <p>QR <span>${product.product_price}</span></p>
        <a id="link" href="/sub-pages/cart.html" onclick="purchaseItem(${product.id})">More Information</a>
    </div>
`   
    
}

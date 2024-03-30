const addProductForm = document.querySelector('#add-product');
const productBrand = document.querySelector('#product_brand');
const productName = document.querySelector('#product_name');
const sellerID = document.querySelector('#seller_ID');

addProductForm.addEventListener('submit', addProduct);

let products = [];
let users = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
    } catch (error) {
        console.error("Failed to load products:", error);
    }
});


// Get products info from form and save it to an object
function getFormInfo(form) {
    const formData = new FormData(form);
    const formInfo = {};
    for (const [fieldKey, fieldValue] of formData) {
        formInfo[fieldKey] = fieldValue;
    }
    return formInfo;
}

// Add product to the products list
async function addProduct(newProductData) {
    newProductData.preventDefault();
    const newProduct = getFormInfo(newProductData.target)
    await addProductHELPER(newProduct);
}

// Helper function to add product to the products list
async function addProductHELPER(newProduct) {
    const productsData = JSON.parse(localStorage.products);
    let user = JSON.parse(localStorage.currentUser);

    let notUnique = productsData.find(product => product.productName === newProduct.product_name);
    if (notUnique) {
        alert("Product already exists");
        updateProductQuantity(notUnique);
        return;
    } else {
        newProduct.id = productsData.length + 1
        let sID = user.ID;
        newProduct.seller_ID = sID;
        let brand = user.companyName;
        newProduct.product_brand = brand;
        console.log(newProduct);
        productsData.push(newProduct);
        user.itemsBeingSold.push(newProduct.id);
        localStorage.products = JSON.stringify(productsData);
    }
    console.log(productsData);
}

// function updateProductQuantity(notUnique) {
//     addProductForm.innerHTML = ` `;
//     addProductForm.innerHTML = `
//         <div class="form-group">
//             <div>
//                 <input type="text" name="productName" id="product-name" hidden readonly>

//                 <label for="product-quantity">Product Quantity</label>
//                 <input type="number" name="productQuantity" id="product-quantity" required>

//                 <div>
//                     <button type="submit" onclick="updateQuantity(${notUnique})">Update</button>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// function updateQuantity(notUnique) {
//     let newQuantity = document.querySelector('#product-quantity').value;
//     notUnique.productQuantity = newQuantity;

//     const productsData = JSON.parse(localStorage.products);
//     const index = productsData.findIndex(product => product.id === notUnique.id);
//     productsData[index] = notUnique;
//     localStorage.products = JSON.stringify(productsData);
//     console.log("Item updated:", notUnique);
//     console.log(productsData);
// }


/*
"PL"
"GA"
"DG"
"VC"
"UB"
"OR"
"TL"
"DE"
"TO"
*/
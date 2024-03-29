const addProductForm = document.querySelector('#add-product');

addProductForm.addEventListener('submit', addProduct);

let products = [];
let users = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        fetchProducts();
        // other functions????
    } catch (error) {
        console.error("Failed to load products:", error);
    }
});
// -------------------------------------------------------------------------------
//                    Basic CURD, READ/WRITE Form/Object Functions
// -------------------------------------------------------------------------------

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

function getFormInfo(form) {
    const formData = new FormData(form);
    const formInfo = {};
    for (const [fieldKey, fieldValue] of formData) {
        formInfo[fieldKey] = fieldValue;
    }

    return formInfo;
}

async function addProduct(newProductData) {  
    newProductData.preventDefault();
    const newProduct = getFormInfo(newProductData.target)
    await addProductHELPER(newProduct);
    // await displayProducts();
}

async function addProductHELPER(newProduct) { 
    const productsData = await fetchProducts();
    products = JSON.parse(localStorage.products);
    let number = productsData.length + 1
    newProduct.id = products.seller_ID + "-" + number
    console.log(newProduct);
    productsData.push(newProduct);
    localStorage.products = JSON.stringify(productsData);
}

const productsData = fetchProducts();
products = JSON.parse(localStorage.products);
users = JSON.parse(localStorage.users);

async function getSellerID(companyName) {
    const usersData = await fetch('/database/users.json');
    const usersJSON = await usersData.json();
    const sellers = usersJSON.users.filter(user => user.role === 'seller');
    const seller = sellers.find(seller => seller.companyName === companyName);
    if (seller) {
        return seller.ID;
    } else {
        return null; // If seller not found
    }
}

// Example usage:
async function exampleUsage() {
    const sellerID = await getSellerID('Tom Ford');
    if (sellerID) {
        console.log("Seller ID:", sellerID);
    } else {
        console.log("Seller not found.");
    }
}
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
const addProductForm = document.querySelector('#add-product');
//const productBrand = document.querySelector('#product-brand');
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
    let sellerID = await getSellerID("TF");
    let number = productsData.length + 1
    newProduct.id = sellerID + "-" + number;
    console.log(newProduct);
    productsData.push(newProduct);
    localStorage.products = JSON.stringify(productsData);
}

async function getSellerID(companyName) {
    const usersData = await fetch('/database/user.json');
    const usersJSON = await usersData.json();
    const sellers = usersJSON.users.filter(user => user.role === 'seller');
    const seller = sellers.find(seller => seller.companyName === companyName);
    if (seller) {
        return seller.ID;
    } else {
        return null; // If seller not found
    }
}

// async function populateDD() {
//     const usersData = await fetch('/database/user.json');
//     const usersJSON = await usersData.json();
//     users = usersJSON.users;
//     const sellers = users.filter(user => user.role === 'seller').map(seller => seller.companyName);
//     let flag = isSeller();
//     productBrand.innerHTML = '';
//     if (flag) {
//         sellers.forEach(seller => {
//             const option = productBrand.createElement('option');
//             option.value = seller;
//             option.innerText = seller;
//             productBrand.appendChild(option);
//         });
//     }
//     else {
//         const option = productBrand.createElement('option');
//         option.value = 'Select Seller';
//         option.innerText = 'Select Seller';
//         productBrand.appendChild(option);
//     }
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
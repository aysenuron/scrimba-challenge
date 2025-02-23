import { productData } from "./data.js";

const container = document.querySelector(".container");
const orderContainer = document.querySelector(".order-container");
const selectedItemsContainer = document.querySelector(".selected-items-container");
const totalPrice = document.querySelector("#total-price-num");

let itemCount = 0;
let totalPriceCount = 0;

function getProductHtml() {
    let productHtml = "";
    productData.forEach( product => {
        productHtml += `
        <div class="product-card">
                <div class="product-info">
                    <div class="product-img">
                        <img src="${product.emoji}" alt="${product.name}">
                    </div>
                    <div class="product-description">
                        <h2>${product.name}</h2>
                        <p class="description">${product.description}</p>
                        <p class="price">$${product.price}</p>
                    </div>
                </div>
                <button class="add-product" data-price="${product.price}" data-name="${product.name}">+</button>
            </div>
        `;
    })
    return productHtml;
}

function renderProductHtml() {
    container.innerHTML = getProductHtml();
}

function handleItemSelection(item, price) {
    itemCount++;
    totalPriceCount += parseInt(price.replace("$", ""));

    const selectedItem = document.createElement("div");
    selectedItem.classList.add("selected-items");

    const selectedItemName = document.createElement("h2");
    selectedItem.appendChild(selectedItemName);
    selectedItemName.textContent = item;

    const itemPrice = document.createElement("p");
    itemPrice.classList.add("price");
    itemPrice.textContent = price;
    selectedItem.appendChild(itemPrice);

    selectedItemsContainer.appendChild(selectedItem);
}

function renderOrderContainer() {
    console.log("Rendering order container..."); 
    console.log("Total items:", itemCount);
    if(itemCount > 0) {
        orderContainer.style.display = "block";
        totalPrice.textContent = `$${totalPriceCount}`;
        console.log(itemCount);
    } else {
        orderContainer.style.display = "none";
    }
}

renderProductHtml();

container.addEventListener("click", (e) => {
    console.log("Button clicked:", e.target); // Debugging
    if (e.target.classList.contains("add-product")) {
        console.log("Add product button clicked!"); // Debugging
        const productName = e.target.dataset.name;
        const productPrice = `$${e.target.dataset.price}`;
        
        handleItemSelection(productName, productPrice);
        renderOrderContainer();
        console.log(selectedItemsContainer.innerHTML);
    }
});

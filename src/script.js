import { productData } from "./data.js";

const container = document.querySelector(".container");
const productsContainer = document.querySelector(".products-container");
const orderContainer = document.querySelector(".order-container");
const selectedItemsContainer = document.querySelector(".selected-items-container");
const totalPrice = document.querySelector("#total-price-num");

const form = document.querySelector("form");

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
    productsContainer.innerHTML = getProductHtml();
}

function handleItemSelection(item, price) {
    itemCount++;
    totalPriceCount += parseInt(price);

    const selectedItem = document.createElement("div");
    selectedItem.classList.add("selected-items");

    const selectedItemNameContainer = document.createElement("div");
    selectedItemNameContainer.classList.add("selected-item-name-container");
    selectedItem.appendChild(selectedItemNameContainer);

    const selectedItemName = document.createElement("h2");
    selectedItemNameContainer.appendChild(selectedItemName);
    selectedItemName.textContent = item;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "remove";
    removeBtn.setAttribute("data-price", price);
    selectedItemNameContainer.appendChild(removeBtn);

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
        orderContainer.style.display = "flex";
        totalPrice.textContent = `${totalPriceCount}`;
        console.log(itemCount);
    } else {
        orderContainer.style.display = "none";
    }
}

function openForm() {
    const formContainer = document.querySelector(".form-container");
    const backdrop = document.querySelector(".backdrop");

    backdrop.style.display = "block";
    formContainer.style.display = "flex";
}

renderProductHtml();

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-product")) {
        const productName = e.target.dataset.name;
        const productPrice = `${e.target.dataset.price}`;
        
        handleItemSelection(productName, productPrice);
        renderOrderContainer();
    } else if (e.target.classList.contains("remove-btn")) {
        const clickedItem = e.target.parentElement;
        const productPrice = `${e.target.dataset.price}`;
        clickedItem.parentElement.remove();

        totalPriceCount -= parseInt(productPrice);
        itemCount--;
        renderOrderContainer();
    } else if(e.target.classList.contains("complete-order")) {
        const completeOrderBtn = document.querySelector(".complete-order");
        completeOrderBtn.addEventListener("click", openForm);
    } else if (form) {
        const formContainer = document.querySelector(".form-container");
        const backdrop = document.querySelector(".backdrop");
        const successContainer = document.querySelector(".success-container");
        const userNameInput = document.getElementById("userNameInput");
        const userName = document.getElementById("name");

        backdrop.addEventListener("click", () => {
            backdrop.style.display = "none";
            formContainer.style.display = "none";
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            backdrop.style.display = "none";
            formContainer.style.display = "none";
            successContainer.style.display = "block";
            userName.textContent = userNameInput.value;
            orderContainer.style.display = "none";
            totalPriceCount = 0;
            itemCount = 0;
        })
    }
});
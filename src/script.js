const addProductBtns = document.querySelectorAll(".add-product");
const container = document.querySelector(".container");
const orderContainer = document.querySelector(".order-container");
const selectedItemsContainer = document.querySelector(".selected-items-container");
const totalPrice = document.querySelector("#total-price-num");

let itemCount = 0;
let totalPriceCount = 0;

function handleItemSelection(item, price) {
    itemCount++;

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

function render() {
    if(itemCount > 0) {
        orderContainer.style.display = "flex";
        totalPrice.textContent = totalPriceCount;
        console.log(itemCount);
    } else {
        orderContainer.style.display = "none";
    }
}

addProductBtns.forEach(button => button.addEventListener("click", (e) => {
    if (e.target.dataset.name === "pizza") {
        handleItemSelection("Pizza", `$${14}`);
        totalPriceCount += parseInt(e.target.dataset.price);
    } else if (e.target.dataset.name === "hamburger") {
        handleItemSelection("Hamburger", `$${12}`);
        totalPriceCount += parseInt(e.target.dataset.price);
    } else if (e.target.dataset.name === "beer") {
        handleItemSelection("Beer", `$${12}`);
        totalPriceCount += parseInt(e.target.dataset.price);
    }
    render();
}));
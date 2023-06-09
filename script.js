document.addEventListener("DOMContentLoaded", ready);

// Cart
const cart = document.querySelector(".cart");
const cartIcon = document.querySelector("#cart-icon");
const closeCart = document.querySelector("#close-cart");

function ready() {
  const removeCartBtns = document.querySelectorAll(".cart-remove");
  const quantityInputs = document.querySelectorAll(".cart-quantity");
  const addCart = document.querySelectorAll(".add-cart");
  const buyButton = document.querySelector(".btn-buy");

  removeCartBtns.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  quantityInputs.forEach((input) => {
    input.addEventListener("change", quantityChange);
  });

  addCart.forEach((button) => {
    button.addEventListener("click", addCartClicked);
  });

  buyButton.addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  const cartContent = document.querySelector(".cart-content");
  if (cartContent.childElementCount > 0) {
    cartContent.innerHTML = "";
    updateTotal();
    alert("Thank you for your purchase");
  } else {
    alert("Your cart is empty");
  }
}

function addCartClicked(event) {
  const button = event.target;
  const shopProducts = button.closest(".product-box");

  if (!shopProducts) {
    console.error("Unable to find parent '.product-box' element.");
    return;
  }

  const title = shopProducts.querySelector(".product-title").innerText;
  const price = shopProducts.querySelector(".price").innerText;
  const productImg = shopProducts.querySelector(".product-img").src;

  const cartContent = document.querySelector(".cart-content");
  const cartImages = cartContent.querySelectorAll(".cart-img");

  let isItemInCart = false;
  let cartBoxToUpdate;

  for (let i = 0; i < cartImages.length; i++) {
    if (cartImages[i].src === productImg) {
      isItemInCart = true;
      cartBoxToUpdate = cartImages[i].closest(".cart-box");
      break;
    }
  }

  if (isItemInCart) {
    const quantityInput = cartBoxToUpdate.querySelector(".cart-quantity");
    const currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    if (quantityInput.value == 2) {
      alert(
        "This item in already in your cart, double check quantity when checking out!!!"
      );
    }
  } else {
    addProductToCart(title, price, productImg);
  }

  updateTotal();
}
function isProductAlreadyInCart(productImg) {
  const cartContent = document.querySelector(".cart-content");
  const cartImages = cartContent.querySelectorAll(".cart-img");

  for (let i = 0; i < cartImages.length; i++) {
    if (cartImages[i].src === productImg) {
      return true;
    }
  }

  return false;
}
function addProductToCart(title, price, productImg) {
  const cartContent = document.querySelector(".cart-content");
  const cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  const cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity" min="1">
    </div>
    <i class="bx bxs-trash-alt cart-remove"></i>
  `;

  cartShopBox.innerHTML = cartBoxContent;
  cartContent.appendChild(cartShopBox);

  cartShopBox
    .querySelector(".cart-remove")
    .addEventListener("click", removeCartItem);
  cartShopBox
    .querySelector(".cart-quantity")
    .addEventListener("change", quantityChange);
}

function quantityChange(event) {
  const input = event.target;
  if (!input.value) {
    input.value = 1;
  }
  updateTotal();
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function updateTotal() {
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;

  cartBoxes.forEach((cartBox) => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".cart-quantity");

    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = parseInt(quantityElement.value);

    total += price * quantity;
  });

  const totalPriceElement = document.querySelector(".total-price");
  totalPriceElement.innerText = "$" + total.toFixed(2);
}

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
  // stop cart show up without click on small screen 
  setTimeout(() => {
    cart.style.display = "block";
  }, 50);
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
  setTimeout(() => {
    cart.style.display = "none";
  }, 300);
});

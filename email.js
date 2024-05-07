document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const cartIcon = document.getElementById("cartIcon");
  const cart = document.getElementById("cart");
  const closeCart = document.getElementById("closeCart");
  const addToCartButtons = document.querySelectorAll(".food-produce_button");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartQuantity = document.getElementById("cartQuantity");
  const checkoutForm = document.getElementById("checkoutForm");

  // Initialize cart data
  let cartItemsCount = 0;
  let cartTotalAmount = 0;
  const cartItemsData = {};

  // Add event listeners
  cartIcon.addEventListener("click", function () {
    cart.classList.add("open");
  });

  closeCart.addEventListener("click", function () {
    cart.classList.remove("open");
  });

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  checkoutForm.addEventListener("submit", handleCheckoutFormSubmit);

  // Function to add item to cart
  function addToCart() {
    const item = this.getAttribute("data-item");
    const price = parseFloat(this.getAttribute("data-price"));
    const quantityInput = this.parentElement.querySelector("input[type='number']");
    const quantity = parseInt(quantityInput.value);

    // Update cart data
    cartItemsCount += quantity;
    cartTotalAmount += price * quantity;

    // Update cart items data
    if (cartItemsData[item]) {
      cartItemsData[item].quantity += quantity;
    } else {
      cartItemsData[item] = { price, quantity };
    }

    updateCartUI();
    addToCartList(item, price, quantity);
  }

  // Function to update cart UI
  function updateCartUI() {
    cartQuantity.textContent = cartItemsCount;
    cartTotal.textContent = "$" + cartTotalAmount.toFixed(2);
  }

  // Function to add item to cart list
  function addToCartList(item, price, quantity) {
    const listItem = document.createElement("li");
    listItem.textContent = `${item} - ${quantity} x $${price.toFixed(2)} = $${(price * quantity).toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeCartItem(listItem.getAttribute("data-id"));
    });

    listItem.setAttribute("data-id", item);

    listItem.appendChild(removeButton);
    cartItems.appendChild(listItem);
  }

  // Function to remove item from cart
function removeCartItem(itemId) {
  if (cartItemsData.hasOwnProperty(itemId)) {
    const itemData = cartItemsData[itemId];
    const quantityToRemove = itemData.quantity;
    const listItem = document.querySelector(`[data-id='${itemId}']`);

    cartItemsCount -= quantityToRemove;
    cartTotalAmount -= itemData.price * quantityToRemove;
    cartItemsData[itemId].quantity -= quantityToRemove;

    if (cartItemsData[itemId].quantity <= 0) {
      delete cartItemsData[itemId];
      listItem.remove();
    } else {
      listItem.firstChild.nodeValue = `${itemData.name} - Price: $${itemData.price.toFixed(2)} - Quantity: ${itemData.quantity}`;
    }

    updateCartUI();
  }
}

  // Function to update cart display
  function updateCartDisplay() {
    const cartItemElements = cartItems.querySelectorAll("[data-id]");

    cartItemElements.forEach((cartItemElement) => {
      cartItemElement.remove();
    });

    for (const itemId in cartItemsData) {
      const item = cartItemsData[itemId];

      const listItem = document.createElement("div");
      listItem.textContent = `${item.name} - Price: ${item.price} - Quantity: ${item.quantity}`;
      listItem.setAttribute("data-id", itemId);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function () {
        removeCartItem(item);
      });

      listItem.appendChild(removeButton);
      cartItems.appendChild(listItem);
    }
  }

// Function to handle checkout form submit
function handleCheckoutFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const email = document.getElementById("emailInput").value;
  const address = document.getElementById("address").value;
  const cartItemsDataString = JSON.stringify(cartItemsData);

  let ebody = `
    <b>Name:</b> ${name}
    <br>
    <b>Email:</b> ${email}
    <br>
    <b>Phone Number:</b> ${number}
    <br>
    <b>Street Address:</b> ${address}
    <br>
    <b>Items:</b> ${cartItemsDataString}
    <br>
  `;

  Email.send({
    SecureToken: "6abbe784-df5e-4155-a3d5-05ec1e33a19a",
    To: "barrettkaleel@gmail.com",
    From: "barrettkaleel@gmail.com",
    Subject: "Order Checkout",
    Body: ebody,
    IsHtml: true,
  }).then((message) => {
    alert("Order checkout email sent successfully!");

    // Clear checkout form
    const checkoutFormInputs = checkoutForm.querySelectorAll("input, textarea");
    checkoutFormInputs.forEach((input) => {
      input.value = "";
      
    });

     // Clear cart data
     cartItemsCount = 0;
     cartTotalAmount = 0;
     cartItemsData = {};

    updateCartUI();
    updateCartDisplay();
  });
}
});

function toggleMenu() {
  var menuList = document.getElementById("menu-list");
  menuList.classList.toggle("show-menu"); // Toggle the "show-menu" class
}


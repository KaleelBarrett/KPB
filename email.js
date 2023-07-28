document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.getElementById("cartIcon");
  const cart = document.getElementById("cart");
  const closeCart = document.getElementById("closeCart");
  const addToCartButtons = document.querySelectorAll(".food-produce_button");

  cartIcon.addEventListener("click", function () {
    cart.classList.add("open");
  });

  closeCart.addEventListener("click", function () {
    cart.classList.remove("open");
  });

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartQuantity = document.getElementById("cartQuantity");

  let cartItemsCount = 0;
  let cartTotalAmount = 0;
  const cartItemsData = {};

  function addToCart() {
    const item = this.getAttribute("data-item");
    const price = parseFloat(this.getAttribute("data-price"));
    const quantityInput = this.parentElement.querySelector(
      "input[type='number']"
    );
    const quantity = parseInt(quantityInput.value);

    cartItemsCount += quantity;
    cartTotalAmount += price * quantity;

    if (cartItemsData[item]) {
      cartItemsData[item] += quantity;
    } else {
      cartItemsData[item] = quantity;
    }

    updateCartUI();
    addToCartList(item, price, quantity);
  }

  function updateCartUI() {
    cartQuantity.textContent = cartItemsCount;
    cartTotal.textContent = "$" + cartTotalAmount.toFixed(2);
  }

  function addToCartList(item, price, quantity) {
    const listItem = document.createElement("li");
    listItem.textContent = `${item} - ${quantity} x $${price.toFixed(2)} = $${(
      price * quantity
    ).toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeCartItem(listItem.getAttribute("data-id"));
    });

    listItem.setAttribute("data-id", item);

    listItem.appendChild(removeButton);
    cartItems.appendChild(listItem);
  }

  function removeCartItem(itemId) {
    if (cartItemsData.hasOwnProperty(itemId)) {
      const itemData = cartItemsData[itemId];
      const quantityToRemove = itemData.quantity;

      cartItemsCount -= quantityToRemove;
      cartTotalAmount -= itemData.price * quantityToRemove;
      cartItemsData[itemId].quantity -= quantityToRemove;

      if (cartItemsData[itemId].quantity <= 0) {
        delete cartItemsData[itemId];
      }
      updateCartUI();
      updateCartDisplay();
    }
  }

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

  const checkoutForm = document.getElementById("checkoutForm");

  checkoutForm.addEventListener("submit", function (e) {
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
    });
  });
});

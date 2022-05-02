const myCart = document.querySelector("#myCart");
// ====== display block myCart =======
document.getElementById("iconCart").onclick = () => {
  myCart.style.display = "block";
};

// ======  display none myCart ============
document.getElementById("closeMyCart").onclick = () => {
  myCart.style.display = "none";
};
// ==== onclick to delete all item of cart =======
function deleteAll() {
  if (confirm("Are you sure to delete all item of the cart?")) {
    let getLocalStorageData = localStorage.getItem("cartItems");
    cartItems = JSON.parse(getLocalStorageData);
    cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    showCartItems();
  }
}

// ===== create cartItem object with idProduct and quantity ========
function createCartItem(idProduct, quantity) {
  let cartItem = new Object();
  cartItem.idProduct = idProduct;
  cartItem.quantity = quantity;
  return cartItem;
}

//  show Shop page, from Products Lists of Shop Manager >>
function showProductsList() {
  const jsonProductList = localStorage.getItem("productList");
  const productList = JSON.parse(jsonProductList);

  let showProducts = "";
  productList.forEach((element, index) => {
    showProducts += `<div class="col-md-3 my-3 itemsBox">
                  <div class="card border-success item">
                    <img src="${element.imgProduct}" height="316.3px" weight='auto' class="imgCart" />
                    <div class="card-body">
                      <h5 class="card-title ">${element.nameProduct}</h5>
                      <p><span class="priceCart">${element.priceProduct}</span> <b>đ</b></p>
                      <button onclick="addItemToCart('${element.id}')" type="button" class="btn btn-outline-success btnCart">
                        Add to shop
                      </button>
                    </div>
                  </div>
                </div>
                `;
  });
  document.getElementById("listProducts").innerHTML = showProducts;
}
//  add product to "cartItems" with ID >>
function addItemToCart(idProduct) {
  let getLocalStorageData = localStorage.getItem("cartItems");
  cartItems = JSON.parse(getLocalStorageData);

  let exitsProduct = false;
  for (let i = 0; i < cartItems.length; i++) {
    let currentItems = cartItems[i];
    if (currentItems.idProduct == idProduct) {
      cartItems[i].quantity++;
      exitsProduct = true;
    }
  }
  if (exitsProduct == false) {
    let cartItem = createCartItem(idProduct, 1);
    cartItems.push(cartItem);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  showCartItems();
}

// Display cart: add products - user chooses >>
function showCartItems(cartItem) {
  let getLocalStorageData = localStorage.getItem("cartItems");
  cartItems = JSON.parse(getLocalStorageData);

  // show to HTML >>
  let showCart = "";
  for (let i = 0; i < cartItems.length; i++) {
    let cartItem = cartItems[i];

    let item = getProductID(cartItem.idProduct);

    showCart += `<tr>
                  <td>${i + 1}</td>
                  <td><img style="width: 70px; height: auto" src="${
                    item.imgItem
                  }" /></td>
                  <td >${item.nameItem}</td>
                  <td>${item.priceItem} <b>đ</b></td>
                  <td class="totalQuantity">${cartItem.quantity}</td>
                  <td class="subTotal">${
                    item.priceItem * cartItem.quantity
                  } <b>đ</b></td>
                  <td><button class="btn btn-outline-danger size14" onclick=Delete(${i});>Delete</button></td>
                </tr>
                `;
  }
  myCart.querySelector("#list").innerHTML = showCart;
  updateAllTotal();
  updateNumProduct();
  updateNumProduct();
}

// get all properties of item from cartItem with ID >>
function getProductID(idProduct) {
  let item = {};
  let jsonProductList = localStorage.getItem("productList");
  let productList = JSON.parse(jsonProductList);
  for (let i = 0; i < productList.length; i++) {
    let product = productList[i];
    if (product.id == idProduct) {
      item = product;
    }
  }

  item = {
    nameItem: item.nameProduct,
    imgItem: item.imgProduct,
    priceItem: item.priceProduct,
    idItem: item.id,
  };
  return item;
}

// delete one item in cart >>
function Delete(i) {
  let getLocalStorageData = localStorage.getItem("cartItems");
  cartItems = JSON.parse(getLocalStorageData);
  cartItems.splice(i, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  showCartItems();
}
// update subTotal in the cart >>
function updateAllTotal() {
  const rows = myCart.querySelector("#list");
  const totals = rows.getElementsByClassName("subTotal");

  subTotal = 0;
  for (let index = 0; index < totals.length; index++) {
    const total = totals[index].textContent;
    subTotal += parseInt(total);
  }
  document.getElementById("allTotal").innerHTML = subTotal + " đ";
}

// update quantity of all items in the cart and Show number to top iconCart >>
function updateNumProduct() {
  const rows = myCart.querySelector("#list");
  const quantityTotals = rows.getElementsByClassName("totalQuantity");

  mumProduct = 0;
  for (let num = 0; num < quantityTotals.length; num++) {
    const quantityTotal = quantityTotals[num].textContent;
    mumProduct += parseInt(quantityTotal);
  }
  document.querySelector(".numShopping").innerHTML = mumProduct;
}

window.onload = () => {
  showProductsList(); //  show Shop page, from Products Lists of Shop Manager
  showCartItems(); // Display cart: products - user chooses >>
};

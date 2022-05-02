const nameInput = document.getElementById("nameProduct");
const imgInput = document.getElementById("imgProduct");
const priceInput = document.getElementById("priceProduct");
// onclick to add product at shop Manager
function onclickAddProduct() {
  let product = {
    nameProduct: nameInput.value,
    imgProduct: imgInput.value,
    priceProduct: priceInput.value,
    id: createUuIdv4(),
  };

  let getLocalStorage = localStorage.getItem("productList");
  if (getLocalStorage == null) {
    let lists = [];
  } else {
    let lists = JSON.parse(getLocalStorage);
  }
  lists.push(product);
  localStorage.setItem("productList", JSON.stringify(lists));
  showProductsList();
  reset_form();
  uploadShop();
}
// Show product to HTML >>
function showProductsList() {
  let getLocalStorage = localStorage.getItem("productList");
  if (getLocalStorage == null) {
    lists = [];
  } else {
    lists = JSON.parse(getLocalStorage);
  }

  let showProducts = "";
  lists.forEach((element, index) => {
    showProducts += `<div class="col-md-4 my-3 itemsBox">
                  <div class="card border-success item">
                    <img src="${element.imgProduct}" height="316.3px" weight='auto' class="imgCart" />
                    <div class="card-body">
                      <h5 class="card-title titleCart">${element.nameProduct}</h5>
                      <p><span class="priceCart">${element.priceProduct}</span> <b>đ</b></p>
                      <a href="#topPage"><button type="button"  onclick= "editProduct(${index})" class="btn btn-outline-success btnEdit">
                        Edit
                      </button></a>
                      <button class="btn btn-outline-danger" onclick="deleteProduct(${index})">Delete</button>

                    </div>
                  </div>
                </div>
                `;
  });
  document.getElementById("listProducts").innerHTML = showProducts;
}
// reset form after submit product
function reset_form() {
  nameInput.value = "";
  imgInput.value = "";
  priceInput.value = "";
  nameInput.focus();
}
// delete product from shop Manager
function deleteProduct(index) {
  if (confirm("Are you sure to delete this product?")) {
    let getLocalStorage = localStorage.getItem("productList");
    lists = JSON.parse(getLocalStorage);
    lists.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(lists));
    showProductsList();
    uploadShop();
  }
}
// Edit product - add information to form - display button Update and hide button Add
function editProduct(index) {
  let getLocalStorageData = localStorage.getItem("productList");
  lists = JSON.parse(getLocalStorageData);
  nameInput.value = lists[index].nameProduct;
  imgInput.value = lists[index].imgProduct;
  priceInput.value = lists[index].priceProduct;
  document.getElementById("index").value = index;
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("btnUpdate").style.display = "block";
  uploadShop();
}
// Update information product
function updateProduct() {
  let product = {
    nameProduct: nameInput.value,
    imgProduct: imgInput.value,
    priceProduct: priceInput.value,
    id: createUuIdv4(),
  };
  let getLocalStorage = localStorage.getItem("productList");
  lists = JSON.parse(getLocalStorage);
  let index = parseInt(document.getElementById("index").value);
  lists[index] = product;
  localStorage.setItem("productList", JSON.stringify(lists));
  showProductsList();
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "block";
  reset_form();
}

window.onload = () => {
  showProductsList();
};
// Upload product to Shop page
function uploadShop() {
  window.location("http://127.0.0.1:5500/index.html");
}

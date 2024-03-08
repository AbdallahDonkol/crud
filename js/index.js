var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");

var productList;
var btnStatus = "create";
var productId;

if (localStorage.getItem("productList") === null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);
}
// ^----------------function to read data and create products in object-----------------
function createProduct() {
  // validate();
  if (
    validateName() === true &&
    validatePrice() === true &&
    validateCat() === true &&
    validateDesc() === true
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCat.value,
      description: productDesc.value,
    };
    if (btnStatus === "create") {
      productList.push(product);
    } else {
      productList[productId] = product;
    }
    displayProduct(productList);

    clearForm();
    localStorage.setItem("productList", JSON.stringify(productList));
  }
}
// ^----------------function to clear form after creating or updating products-----------------
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCat.value = "";
  productDesc.value = "";
}
// ^----------------function to display products in table-----------------
function displayProduct(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].description}</td>
        <td><button class="btn btn-warning" onclick="getUpdated(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
// ^----------------when click on delete product button to delete single product from table-----------------
function deleteProduct(index) {
  //delete from array
  productList.splice(index, 1);
  //delete from table
  displayProduct(productList);
  localStorage.setItem("productList", JSON.stringify(productList));
}
// ^----------------search for products function-----------------
function searchProduct(letter) {
  var foundedProduct = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(letter.toLowerCase())) {
      foundedProduct.push(productList[i]);
    }
  }
  if (foundedProduct.length > 0) {
    displayProduct(foundedProduct);
  } else {
    document.getElementById(
      "tableBody"
    ).innerHTML = `<tr><td colspan="7" class="text-danger fw-bold fs-1">Sorry, No data found</td></tr>`;
  }
}
// ^----------------when click on update button-----------------
function getUpdated(index) {
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCat.value = productList[index].category;
  productDesc.value = productList[index].description;
  document.getElementById("addBtn").classList.add("d-none");
  document.getElementById("updateBtn").classList.replace("d-none", "d-block");
  btnStatus = "update";
  productId = index;
}
// ^----------------when click on update product button-----------------
function updateProduct() {
  document.getElementById("updateBtn").classList.replace("d-block", "d-none");
  document.getElementById("addBtn").classList.replace("d-none", "d-block");
  createProduct();
}
// ^----------------validation on form-----------------
// function validate() {
// this function without regex
//   if (productName.value == "") {
//     document.getElementById("nameLabel").innerHTML = "Product Name* Required";
//     document.getElementById("nameLabel").style.color = "red";
//     document.getElementById("productName").style.borderColor = "red";
//     document.getElementById("addBtn").preventDefault();
//   } else {
//     document.getElementById("nameLabel").innerHTML = "Product Name";
//     document.getElementById("nameLabel").style.color = "black";
//     document.getElementById("productName").style.borderColor = "#dee2e6";
//   }
//   if (
//     productPrice.value < 1000 ||
//     productPrice.value > 100000 ||
//     productPrice.value == ""
//   ) {
//     document.getElementById("priceLabel").innerHTML =
//       "Product Price => 1000 - 100000";
//     document.getElementById("priceLabel").style.color = "red";
//     document.getElementById("productPrice").style.borderColor = "red";
//     document.getElementById("addBtn").preventDefault();
//   } else {
//     document.getElementById("priceLabel").innerHTML = "Product Price";
//     document.getElementById("priceLabel").style.color = "black";
//     document.getElementById("productPrice").style.borderColor = "#dee2e6";
//   }
//   if (
//     productCat.value.toLowerCase() != "mobile" &&
//     productCat.value.toLowerCase() != "tv" &&
//     productCat.value.toLowerCase() != "laptop" &&
//     productCat.value.toLowerCase() != "tablet"
//   ) {
//     document.getElementById("catLabel").innerHTML =
//       "Product Category => mobile, TV, laptop, tablet";
//     document.getElementById("catLabel").style.color = "red";
//     document.getElementById("productCat").style.borderColor = "red";
//     document.getElementById("addBtn").preventDefault();
//   } else {
//     document.getElementById("catLabel").innerHTML = "Product Category";
//     document.getElementById("catLabel").style.color = "black";
//     document.getElementById("productCat").style.borderColor = "#dee2e6";
//   }
//   if (productDesc.value.length > 20 || productDesc.value == "") {
//     document.getElementById("descLabel").innerHTML =
//       "Product Description => maximum 20 characters";
//     document.getElementById("descLabel").style.color = "red";
//     document.getElementById("productDesc").style.borderColor = "red";
//     document.getElementById("addBtn").preventDefault();
//   } else {
//     document.getElementById("descLabel").innerHTML = "Product Description";
//     document.getElementById("descLabel").style.color = "black";
//     document.getElementById("productDesc").style.borderColor = "#dee2e6";
//   }
// }
function validateName() {
  var regexName = /^[A-Z][a-z]{1,8}$/;
  if (regexName.test(productName.value)) {
    document.getElementById("nameError").classList.replace("d-block", "d-none");
    productName.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    document.getElementById("nameError").classList.replace("d-none", "d-block");
    productName.classList.add("is-invalid");
    return false;
  }
}
function validatePrice() {
  var regexPrice = /^[1-9][0-9]{3,5}$$/;
  if (regexPrice.test(productPrice.value)) {
    document
      .getElementById("priceError")
      .classList.replace("d-block", "d-none");
    productPrice.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    document
      .getElementById("priceError")
      .classList.replace("d-none", "d-block");
    productPrice.classList.add("is-invalid");
    return false;
  }
}
function validateCat() {
  var regexCat = /^(tv|Tv|TV|mobile|Mobile|laptop|Laptop|tablet|Tablet)$/;
  if (regexCat.test(productCat.value)) {
    document.getElementById("catError").classList.replace("d-block", "d-none");
    productCat.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    document.getElementById("catError").classList.replace("d-none", "d-block");
    productCat.classList.add("is-invalid");
    return false;
  }
}
function validateDesc() {
  var regexDesc = /^[a-zA-Z]{3,15}$/;
  if (regexDesc.test(productDesc.value)) {
    document.getElementById("descError").classList.replace("d-block", "d-none");
    productDesc.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    document.getElementById("descError").classList.replace("d-none", "d-block");
    productDesc.classList.add("is-invalid");
    return false;
  }
}

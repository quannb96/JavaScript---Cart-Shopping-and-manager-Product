function validate(inputArr) {
  let isValid = true;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      isValid = false;
      input.parentElement.children[2].classList.remove("hide");
    } else {
      isValid = true;
      if (!input.parentElement.children[2].classList.contains("hide"))
        input.parentElement.children[2].classList.add("hide");
    }
  });

  return isValid;
}

function onFormSubmit() {
  if (validate([nameInput, imgInput, priceInput])) {
    onclickAddProduct();
  }
}

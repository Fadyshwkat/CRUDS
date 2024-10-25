var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var defaultOption = document.getElementById("defaultOption");
var searchInput = document.getElementById("searchInput")
var displayItemsContainer = document.getElementById("displayItemsContainer");
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");

var updateIndex;
var productNameRegex = /^[A-Z][A-Za-z0-9]+$/
var productPriceRegex = /^[0-9]+$/
var productCategoryRegex = /^(Mobile Phone|Labtop|Camera|Printer|TV)+$/
var productDescriptionRegex = /^[A-Z][A-Za-z0-9]{3,}$/

if(JSON.parse(localStorage.getItem("productsList"))!=null){
    productsList = JSON.parse(localStorage.getItem("productsList"));
    displayProducts(productsList);
}
else {var productsList=[]}

function validateInputs(regex,element){
    if(regex.test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block","d-none")
        return true;
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace("d-none","d-block")
        return false;
    }
}
function validateImage(){
    if(productImageInput.files.length !=0){
        productImageInput.nextElementSibling.classList.replace("d-block","d-none")
            return true;
    }
    else{
        productImageInput.nextElementSibling.classList.replace("d-none","d-block")
        return false;
    }
}
function validData(){
    if(validateInputs(productNameRegex,productNameInput) & validateInputs(productPriceRegex,productPriceInput) 
        & validateInputs(productCategoryRegex,productCategoryInput) &validateInputs(productDescriptionRegex,productDescriptionInput)
    &validateImage()){
    return true}
    else{
        return false}
}

function addProduct(){
   if (validData()){
    var product = {
        productName:productNameInput.value,
        productPrice:productPriceInput.value,
        productCategory:productCategoryInput.value,
        productDescription:productDescriptionInput.value,
        productImage:productImageInput.files[0].name,
    }
    productsList.push(product);
    localStorage.setItem("productsList",JSON.stringify(productsList))
    displayProducts(productsList);
    clearInputs();
   }
}
function clearInputs(){
    productNameInput.value = null;
    productPriceInput.value = null;
    productDescriptionInput.value = null;
    productImageInput.value = null;
    defaultOption.selected = true ;
    productNameInput.classList.remove("is-invalid","is-valid")
    productPriceInput.classList.remove("is-invalid","is-valid")
    productCategoryInput.classList.remove("is-invalid","is-valid")
    productDescriptionInput.classList.remove("is-invalid","is-valid")

}

function displayProducts(arr){
    var cartona="";
    for(var i = 0 ; i<arr.length ; i++){
        cartona+= `<div class="col  p-2 rounded-1">
                        <div class="inner border p-2 shadow shadow-sm">
                            <div class="img-container">
                                <img class="w-100 h-100 object-fit-contain" src="imgs/${arr[i].productImage}" alt="">
                            </div>
                            <h3 class="mt-4 fs-4">${arr[i].productName}</h3>
                            <p class="text-secondary fs-6">${arr[i].productDescription}</p>
                            <p class="fs-6"><span class="fw-semibold">Category</span> : ${arr[i].productCategory}</p>
                            <div class="card-foot d-flex justify-content-between">
                                <p class="fw-semibold fs-6">${arr[i].productPrice} EGP</p>
                                <div class="card-icons">
                                    <i onclick="deleteProduct(${arr[i].oldIndex?arr[i].oldIndex:i})" class="fa-regular fa-trash-can text-danger fs-5 delete-icon"></i>
                                    <i onclick="moveProductInfoToInputs(${arr[i].oldIndex || i})" class="fa-solid fa-pen-to-square text-success fs-5"></i>
                                </div>
                            </div>

                        </div>
                    </div>`
 }
//  arr.oldIndex?oldIndex:i
displayItemsContainer.innerHTML = cartona;
}

function deleteProduct(index){
    productsList.splice(index,1);
    localStorage.setItem("productsList",JSON.stringify(productsList))
    displayProducts(productsList);

}

function searchProduct(term){
    filteredProductsList =[];
   for(var i = 0; i<productsList.length ; i++){
    if(productsList[i].productName.toLowerCase().includes(term.toLowerCase()) == true ){

        productsList[i].oldIndex = i; 
        filteredProductsList.push(productsList[i])
        displayProducts(filteredProductsList);
       
    }
   }

}
function moveProductInfoToInputs(index){
        productNameInput.value = productsList[index].productName;
        productPriceInput.value = productsList[index].productPrice;
        productCategoryInput.value = productsList[index].productCategory;
        productDescriptionInput.value = productsList[index].productDescription;

        addProductBtn.classList.replace("d-block","d-none");
        updateProductBtn.classList.replace("d-none","d-block");
        updateIndex = index;
        document.documentElement.scrollTop = 0;
 }
 
function updateProduct(){
    productsList[updateIndex].productName = productNameInput.value ;
    productsList[updateIndex].productPrice = productPriceInput.value;
    productsList[updateIndex].productCategory = productCategoryInput.value;
    productsList[updateIndex].productDescription = productDescriptionInput.value;
    updateProductBtn.classList.replace("d-block","d-none");
    addProductBtn.classList.replace("d-none","d-block");

    localStorage.setItem("productsList",JSON.stringify(productsList))
    displayProducts(productsList);
    clearInputs();
    document.documentElement.scrollTop = 1000;
    
 }

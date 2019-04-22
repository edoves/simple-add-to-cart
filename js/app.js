// variable

const productContainer = document.querySelector('.product__container');
const cartList = document.querySelector('.cart_list');

// Events

shoeEventListeners();
function shoeEventListeners() {

    productContainer.addEventListener('click', takeAShoes);

    cartList.addEventListener('click', removeCartItem);

    document.addEventListener('DOMContentLoaded', getItemLocalStorage);

}


// function

function takeAShoes(e) {

    e.preventDefault();
    if (e.target.classList.contains('add-cart')) {
        const shoeItemInfo = e.target.parentElement;

        getShoeItemInfo(shoeItemInfo);
    }


}

function getShoeItemInfo(shoeInfo) {

    const shoeInfoItem = {
        image: shoeInfo.querySelector('img').src,
        title: shoeInfo.querySelector('h4').textContent,
        altText: shoeInfo.querySelector('img').getAttribute('alt'),
        price: shoeInfo.querySelectorAll('li')[1].textContent,
        id: shoeInfo.querySelector('a').getAttribute('data-id')
    }


    addShoeIntoCart(shoeInfoItem);
}


function addShoeIntoCart(itemInfo) {
    const li = document.createElement('li');
    li.classList = 'cart_item';

    li.innerHTML = `
    <img class="cart_img" src="${itemInfo.image}" alt="${itemInfo.altText}">
        <div class="cart_content">
          <p>${itemInfo.title}</p>
              <strong> <span class="money">${itemInfo.price} USD</span></strong>
        </div>
    <a href="#" class="remove" title="Remove this item" data-product_id="${itemInfo.id}">X</a>
    `;

    cartList.appendChild(li);

    saveShoeItemIntoStorage(itemInfo);
}


function saveShoeItemIntoStorage(itemInfo) {
    const items = getShoeFromStorage();

    items.push(itemInfo);

    localStorage.setItem('shoe', JSON.stringify(items));
}

function getShoeFromStorage() {

    let shoeItem;

    if (localStorage.getItem('shoe') === null) {
        shoeItem = [];
    } else {
        shoeItem = JSON.parse(localStorage.getItem('shoe'));
    }

    return shoeItem;
}


function getItemLocalStorage() {

    const items = getShoeFromStorage();

    items.forEach(item => {
        const li = document.createElement('li');
        li.classList = 'cart_item';

        li.innerHTML = `
        <img class="cart_img" src="${item.image}" alt="${item.altText}">
            <div class="cart_content">
              <p>${item.title}</p>
                  <strong> <span class="money">${item.price} USD</span></strong>
            </div>
        <a href="#" class="remove" title="Remove this item" data-product_id="${item.id}">X</a>
        `;

        cartList.appendChild(li);
    });
}

function removeCartItem(e) {
    let shoe, shoeID;
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();

        shoe = e.target.parentElement;
        shoeID = shoe.querySelector('a').getAttribute('data-product_id');

        removeShoeLocalStorage(shoeID);
    }

}

function removeShoeLocalStorage(id) {
    const items = getShoeFromStorage();

    items.forEach((item, index) => {
        if (item.id === id) {
            items.splice(index, 1);
        }

        localStorage.setItem('shoe', JSON.stringify(items));
    });
}






/**
loadEventListeners

byCourse
clearCart


getCourseInfo

addIntoCart

getCoursesFromStorage
saveIntoStorage
removeCourseLocalStorage
removeCartItem
clearCart
clearLocalStorage
getFromLocalStorage

 */

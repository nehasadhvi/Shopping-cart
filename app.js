//Variables
const courseList = document.querySelector('#courses-list'),
    cartItem = document.querySelector('#cart-content tbody'),
    clearCart = document.querySelector('#clear-cart');

//Event Listeners
loadEventListeners();

function loadEventListeners() {
    courseList.addEventListener('click', buyCourse);
    cartItem.addEventListener('click', removeCartItem);
    clearCart.addEventListener('click', clearShoppingCart);
}

//Functions

function buyCourse(e) {
    e.preventDefault();
    //Use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')) {
        //read the clicked course value
        const course = e.target.parentElement.parentElement;
        getCartInfo(course);
    }
}

//To get the information of selected course
function getCartInfo(course) {
    let courseInfo = {
        img: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    };
    addToCart(courseInfo);
}

//Add the course into the cart
function addToCart(course) {
    //create a tr element
    const row = document.createElement('tr');
    
    //template for tr element
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.img}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

    // Add row to shopping cart
    cartItem.appendChild(row);
}

function removeCartItem(e) {
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
    }
}

function clearShoppingCart(e) {
        while(cartItem.firstChild) {
            cartItem.firstChild.remove();
        }
}
//Variables
const courseList = document.querySelector('#courses-list'),
    cartItem = document.querySelector('#cart-content tbody'),
    clearCart = document.querySelector('#clear-cart');

//Event Listeners
loadEventListeners();

function loadEventListeners() {
    //When new course is added
    courseList.addEventListener('click', buyCourse);

    //When the remove button is clicked
    cartItem.addEventListener('click', removeCartItem);

    //When Clear Cart button is clicked
    clearCart.addEventListener('click', clearShoppingCart);

    //Document ready
    document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
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
    addToLocalStorage(courseInfo);
}

// Add courses to local storage
function addToLocalStorage (course) {
    let courses = getFromLocalStorage();

    courses.push(course);

    localStorage.setItem('courses', JSON.stringify(courses))
}

//Get courses from local storage
function getFromLocalStorage() {
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
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

//Remove single item from cart
function removeCartItem(e) {
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId)
    //Remove from the local storage
    removeItemLocalStorage(courseId);
}

//Remove single item from local storage
function removeItemLocalStorage(id) {
    let coursesLS = getFromLocalStorage();
    
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });
    
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//Clear all the items from shopping cart
function clearShoppingCart(e) {
        while(cartItem.firstChild) {
            cartItem.firstChild.remove();
        }

        removeAllFromLocalStorage();
}

//Remove all the course items from local storage
function removeAllFromLocalStorage() {
    localStorage.removeItem('courses');
}

//Get all the items stored in the local storage
function loadFromLocalStorage() {
    let coursesLS = getFromLocalStorage();
    
    coursesLS.forEach((courseLS) => {
        addToCart(courseLS);
    })
}
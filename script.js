async function getProducts() {
    let response = await fetch("items.json")
    let products = await response.json()
    return products
}

function getCardHTML(product){
    let productsData = JSON.stringify(product)
    return `
    <div class="background-block" id="background-block_${product.number}">
        <img src="/img/${product.image}" alt="tt">
        <button class="button" id="button_${product.number}"></button>
    </div>`
}


getProducts().then(function(products){
    let productsList = document.querySelector('.container')
    if (productsList){
        products.forEach(product => {
            productsList.innerHTML += getCardHTML(product)
        });
    }
    let buyButtons = document.querySelectorAll('.button')
    if ( buyButtons){
        buyButtons.forEach(button=>{
            button.addEventListener('click', buyItem)
        })
    }
})

function searchProducts(event){
    event.preventDefault()

    let field = document.querySelector('.search_field')
    let query = field.value.toLowerCase()
    let productsList = document.querySelector('.container')
    productsList.innerHTML = ''
    getProducts().then(function(products){
        let productsList = document.querySelector('.container')
        products.forEach(product =>{
            if (product.title.toLowerCase().includes(query)){
                productsList.innerHTML += getCardHTML(product)
            }
        })
        let buyButtons = document.querySelectorAll('.buy')
        if ( buyButtons){
            buyButtons.forEach(button =>{
                button.addEventListener('click', buyItem)
            })
        }
    })
    field.value = ''
}

let searchForm = document.querySelector('.search')
searchForm.addEventListener('submit', searchProducts)
let searchBtn = document.querySelector('.search_btn')
searchBtn.addEventListener('click', searchProducts)




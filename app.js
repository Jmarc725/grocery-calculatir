// Variables error messages
let fruitError = document.querySelector('.error-fruit')
let fruitWeightError = document.querySelector('.error-weight-fruit')

// Global scope
let totalCost;
let bill = document.querySelector('.multi-columns')
let insertPrice = document.getElementById('total-fruits')

// Arrays
let fruitArray = []
let weightFruitArray = []


let priceArray = []

// Objects
let shoppingCart = {}

let fruits = {
    banana: 0.88,
    apple: 1.25,
    pear: 1.8,
    orange: 1.6,
    lemon: 1.5,
    lime: 1.4,
    peache: 3.99,
    nectarine: 4,
    apricot: 4.99,
    plum: 2.6,
    fig: 3.5,
    grappes: 5,
    kiwi: 2.2,
    canteloupe: 3,
    watermelon: 2.6,
    zuchini: 1.3,
    eggplant: 3,
    mushroom: 4.5,
    potatoe: 2.7,
    tomatoe: 3.5,
    lettuce: 2,
    asparagus: 5,
    endive: 7,
    jalapeno: 7,
    ognon: 2,
    garlic: 8,
    pepper: 5,
    beet: 3,
    parsnip: 2,
    califlower: 4,
    brocholi: 3.5,
    yam: 5,
    ginger: 3,
    cucumber: 3
}

/* ----------------------------------------------------------------------------------
--------------------------------------- Functions -----------------------------------
------------------------------------------------------------------------------------- */

getLocalStorage()

// ------------------------------------------------ fruit ------------------------------

function addToCartFruit(){

    let fruitItem = document.getElementById('fruit').value // Grab the fruit value input
    fruitArray.push(fruitItem) // Store the fruit value in the fruitArray

    let item = fruits[fruitItem] // Accessing the value from fruit object

    if(fruitItem == ''){ // Display error message if the condition is not met
        fruitError.classList.remove('hidden');  
    } else if (item == undefined){
        alert("We do not have this product in stock")
    } else {
        fruitError.classList.add('hidden')  
    }
    
    let weightFruit = document.getElementById('weight-fruit').value // Grab the weight value input
    weightFruitArray.push(weightFruit) // Store the weight value in the weightFruitArray

    if (weightFruit == ''){ // Display error message if the condition is not met
        fruitWeightError.classList.remove('hidden')   
        fruitError.classList.remove('hidden');   
    } else {
        fruitWeightError.classList.add('hidden') 
    }

    let calc = (weightFruit / 454) * item // Make the calculation
    priceArray.push(calc) // Store the calculated price for an item in the priceArray
    totalCost = fruitItem + " " + weightFruit + "g: $" + calc.toFixed(2)// Concatenation to display the details of the purchase

    // Creation of an object
    shoppingCart.name = fruitItem
    shoppingCart.quantity = weightFruit
    shoppingCart.total = calc


    // Clearing inputs
    document.getElementById('fruit').value = ""
    document.getElementById('weight-fruit').value = ""


    

    // All these conditions have to be met to invoke the functions and display all the details of purchase
    if (fruitItem != '' && item != undefined && weightFruit != '' && !isNaN(weightFruit)){
        // Display & update the price beside "Total"
        let concatFruitWeight = fruitItem + " " + weightFruit + "g"
        console.log(concatFruitWeight)

        localStorage.setItem(concatFruitWeight, calc.toFixed(2)) // Store the fruit name / fruit price in the local storage
        insertPrice.value = calc.toFixed(2) // Insert the price in the field price
         // Display the detail of purchase
         
         totalBill()
    }
}


// ------------------------------------------------------ Get Local Storage ---------------------

function getLocalStorage(){
    let getDatas = Object.keys(localStorage) // Accessing the properties of the object localstorage

    for( let i = 0; i < getDatas.length; i++){ // looping through the array of properties
        let propertyName = Object.entries(localStorage)[i][0]                
        let newItem = document.createElement('p') // create element to display the detail of purchase
        newItem.innerHTML = propertyName + ": " +  "<b>$CAD " + localStorage.getItem(getDatas[i]) + "</b>"
        bill.appendChild(newItem)
    }
    finalPrice()
}

// getLocalStorage()

// ------------------------------------------------------- Total bill -------------------------

function totalBill(){ // Create new element (item, weight, price) after clicking the button
    let newElement = document.createElement('p')
    newElement.innerText = totalCost // Display the detail of purchase
    bill.appendChild(newElement)
}


// ----------------------------------------------------------- Final price -------------------------

function finalPrice(){ 
    let totalArray = Object.values(localStorage)
    let total = totalArray.map((num) => Number(num))
    
    let finalCost = document.querySelector('#total-cost')
    let addFigures = 0

    for(let i = 0; i < total.length; i++){
        addFigures += total[i]
        finalCost.innerText = addFigures.toFixed(2)
    }
}




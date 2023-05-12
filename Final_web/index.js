
//Question 1 -----------------------------------------------------------

//creating the objects and the array of objects
let inventory = JSON.parse(localStorage.getItem('inventory')) || [
    {
        id:10,
        name: "TR2 trail running shoes – Men",
        quantity: 0
    },
    {
        id:20,
        name: "TR2 trail running shoes – Women",
        quantity: 5
    },
    {
        id:30,
        name: "Marathon Running Vest ",
        quantity: 1
    },
    {
        id:40,
        name: "Men’s Trail Running Jacket – Khaki ",
        quantity: 2
    },
    {
        id:50,
        name: "Trail running bottle holder belt ",
        quantity: 0
    },
    {
        id:60,
        name: "RUN500 invisible running socks X2 ",
        quantity: 7
    },
    {
        id:70,
        name: "Easynet 3m Badminton net Orange ",
        quantity: 0
    },
    {
        id:80,
        name: "Badminton Racket - BR 500 Black/Yellow ",
        quantity: 0
    },
    {
        id:90,
        name: "BS190 Badminton Shoe - Men",
        quantity: 2
    },
    {
        id:100,
        name: "Backcountry Skis with Bindings and Skins",
        quantity: 3
    }

]

//saving the array in the local storage

localStorage.setItem('inventory', JSON.stringify(inventory))

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//Question 2 - Populate the table with the data from local storage ----------------

function populateTable(){
    const tbody = document.querySelector('#tableInventory tbody')
    tbody.innerHTML=""
    inventory.forEach(element =>{
    
        if(element.quantity > 0){
            const bodyRow = document.createElement('tr')
            const tdId = document.createElement('td')
            const tdName = document.createElement('td')
            const tdQuantity = document.createElement('td')
            tdId.textContent = element.id;
            tdName.textContent = element.name;
            tdQuantity.textContent = element.quantity;
            bodyRow.appendChild(tdId)
            bodyRow.appendChild(tdName)
            bodyRow.appendChild(tdQuantity)
            tbody.appendChild(bodyRow)
        }
        
    })
    
}
populateTable()

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//Question 3 - Form Purchase -----------------------------------------------------

//First we need to add the items options in the select field of the form

function getItems(){
    let getItems = document.querySelector('#selectItem')
    
    inventory.forEach(element=>{
        let optionItem = document.createElement('option')
        optionItem.value = element.id
        optionItem.textContent = element.name

        getItems.appendChild(optionItem)
        
    })
}
getItems()

//now we need to update the quantity and the table considering the quantity purchased in the form
// considering the retailer point of view, when they buy, they increase to their inventory

let purchaseForm = document.querySelector('#buyForm')
purchaseForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let itemSelected = document.querySelector('#selectItem').value
    let qtdAmount = document.querySelector('#qtdInput').value
    inventory.forEach(element=>{

        if(itemSelected == element.id){
            //quantity from the local storage converted in Integer type
            element.quantity += parseInt(qtdAmount) //balance updated
        }
        //send the quantity updated to the local storage
        localStorage.setItem('inventory', JSON.stringify(inventory))
        
    })
    
    //rewrite the table based in the new values in the local storage
    populateTable()
    getItems2()
    purchaseForm.reset()
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//Question 4 - Form Sale -------------------------------------------------------------------

//the same way of the last question, we first configure the options of items in the form
function getItems2(){
    
    let getItems = document.querySelector('#selectSellItems')
    getItems.innerHTML=""
    //defining a default option, because the default in html doesn't work anymore
    let defaultOption = document.createElement('option')
    defaultOption.value = ""
    defaultOption.textContent = "select the item"
    defaultOption.selected = true
    getItems.appendChild(defaultOption)
    //---------------------------------------------------------------------------
    inventory.forEach(element=>{

        if(element.quantity > 0){ 
            let optionItem = document.createElement('option')
            optionItem.value = element.id
            optionItem.textContent = element.name

            getItems.appendChild(optionItem)

        }
        
    })
}
getItems2()

//update the quantity with the sale
// considering the retailer point of view, when they sell, they decrease to their inventory

let sellForm = document.querySelector('#sellForm')
sellForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let ItemSelected = document.querySelector('#selectSellItems').value
    let qtdSellInput = document.querySelector('#qtdSellInput').value
    

    inventory.forEach(element=>{
        if(ItemSelected == element.id){
            
            if(qtdSellInput <= element.quantity){ 
                element.quantity -= parseInt(qtdSellInput)
            }
            else{
                alert(`max quantity available for this item: ${element.quantity}`)
            }
            
        }
        
    })
    localStorage.setItem('inventory', JSON.stringify(inventory))
    populateTable()
    getItems2()
    sellForm.reset()

})
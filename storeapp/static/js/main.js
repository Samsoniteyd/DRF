// detail html 
// detail html 
// detail html 
let counter = "{{counter}}"
  let heartIcon = document.getElementById('heart')
  let heartContainer = document.getElementById('heartContainer')
  let form = document.getElementById("form");

 
  form.addEventListener("submit", function(e) {
    e.preventDefault()
    document.getElementById('heartSpinner').style.display = 'block'
    if(user=='AnonymousUser'){
      console.log('nsnsnsnsn')
      
      document.getElementById('alertdanger').style.display = 'flex'
      document.getElementById('removeItem').innerText = 'You need to be signed in'
      document.getElementById('heartSpinner').style.display = 'none'
    }
    
    console.log(e.target)
    counter++;
    product_id = e.target.dataset.id
    console.log(product_id)
    if (counter % 2 == 0) {
      counter = 0;
      
    }
    console.log(counter);
   
   
    const data = { counter: counter, d: product_id };
    console.log(data['d'])
    let url = '/addsaveitems'
    fetch(url, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        console.log(typeof(data))
        if(data > 0){
         
            console.log('weeeeeeeeeeeeeeeee')
            document.getElementById('alert').style.display = 'flex'
            document.getElementById('alertdanger').style.display = 'none'
            heartIcon.setAttribute("class","bi bi-heart-fill" )
            document.getElementById('heartSpinner').style.display = 'none'
            
            
        }
        else{
            
            
            document.getElementById('alertdanger').style.display = 'flex'
            document.getElementById('alert').style.display = 'none'
            heartIcon.setAttribute("class","bi bi-heart" )
            document.getElementById('heartSpinner').style.display = 'none'
            
            
            
        }
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });


  });

//   checkout html 
//   checkout html 
//   checkout html 

var total = "{{cart.cart_total}}"
  
// Render the PayPal button into #paypal-button-container
paypal.Buttons({
    // Set up the transaction
    createOrder: function(data, actions) {
      
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: parseFloat(total).toFixed(2)
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
            // Successful capture! For demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures[0];
            confirmPayment()
           
            // Replace the above to show a success message within this page, e.g.
            // const element = document.getElementById('paypal-button-container');
            // element.innerHTML = '';
            // element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  actions.redirect('thank_you.html');
        });
    }


}).render('#paypal-button-container');


let inputss = document.getElementsByTagName('input')
for(let i = 0; i<inputss.length; i++){
inputss[i].classList.add('form-control')
}

function confirmPayment(){
const data = { total: total };
console.log(data.total)
let url = "/payment"

fetch(url, {
method: 'POST', // or 'PUT'
headers: {
'Content-Type': 'application/json',
'X-CSRFToken': csrftoken
},
body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
console.log('Success:', data);
alert('Transaction completed')
window.location.href=" {% url 'index' %} "
})
.catch((error) => {
console.error('Error:', error);
alert('There is an issue with your purchase')
});

}



// cart html 
// cart html 
// cart html 

let cartitemContainer = document.getElementById('cartitems')
let qtyField = document.getElementsByTagName('input')
let grandTotal = document.getElementById('grandTotal')
let spinners = document.getElementsByClassName('spinner-border')

for(let i = 0; i<qtyField.length; i++){
    qtyField[i].addEventListener('change', updateQuantity)
}
function updateQuantity(e){

  
  document.getElementById('spinner').style.display='block'

    let grandParent = e.target.parentElement.parentElement
    let subtotalParent = grandParent.children[4]
    console.log(subtotalParent)


    let quantity = e.target.value
    let product_id = e.target.dataset.p_id
    let price = e.target.dataset.price
    let items = document.getElementById('cartTotal')
    console.log(items)
    console.log(quantity)
    if(e.target.value < 2){
        e.target.value = 1
    }
    

    

    const data = { id: product_id, qty: quantity, product_price: price};
    let url = '/updatequantity'
    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
          console.log(data)
          qty.innerText = data.num
         
          document.getElementById('list_of_items').innerHTML = `<strong>Items: ${data.num}</strong>`
          document.getElementById('cartTotal').innerHTML = `<strong>Total: $${parseFloat(data.total).toFixed(2)}</strong>`
          subtotalParent.innerHTML = `<h5> $${parseFloat(data.qty*data.price).toFixed(2)} </h5>` 

          document.getElementById('spinner').style.display='none'

          
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      

}
let delBtns = document.getElementsByClassName('del')
for(let i = 0; i<delBtns.length; i++){
    delBtns[i].addEventListener('click', removeCartitems)
}
function removeCartitems(e){
    pro_id = e.target.dataset.p_id
    console.log(pro_id)

    const data = {id:pro_id}
    let url = '/deleteitems'
    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data =>{
       
          console.log(data)
          location.reload()
         
          
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
}

// update user 
// update user 
// update user 

let inputs = document.getElementsByTagName('input')
for(let i = 0; i<inputs.length; i++){
  inputs[i].classList.add('form-control')
}

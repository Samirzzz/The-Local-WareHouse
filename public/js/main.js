function addToWishlist(productId) {
  // Send an AJAX request to the server to add the product to the wishlist
  fetch(`/wishlist/${productId}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      // Product added to the wishlist, you can show a success message or update the UI as needed
      console.log('Product added to wishlist:', data);
    })
    .catch(error => {
      // Error occurred while adding the product to the wishlist
      console.error('Error adding product to wishlist:', error);
    });
}

function removeFromWishlist(productId) {
  console.log(productId);
  fetch(`/wishlist/${productId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // Refresh the page or update the wishlist content
      location.reload();
    } else {
      console.error('Error removing product from wishlist:', response.status);
      // Handle the error
    }
  })
  .catch(error => {
    console.error('Error removing product from wishlist:', error);
    // Handle the error
});
}

function addToCart(productId) {
  // Send an AJAX request to the server to add the product to the cart
  fetch(`/cart/${productId}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      // Product added to the cart, you can show a success message or update the UI as needed
      console.log('Product added to cart:', data);
    })
    .catch(error => {
      // Error occurred while adding the product to the cart
      console.error('Error adding product to cart:', error);
    });
}



function removeFromCart(productId) {
  console.log(productId);
  fetch(`/cart/${productId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // Refresh the page or update the cart content
      location.reload();
    } else {
      console.error('Error removing product from cart noo:', response.status);
      // Handle the error
    }
  })
  .catch(error => {
    console.error('Error removing product from cart yees:', error);
    // Handle the error
});
}


function editCart(amount,productId) {
console.log(amount,productId);
fetch(`/cart/${productId}`, {
  method: 'PUT' ,
  headers: {
    'Content-type': 'application/json'
  },
  body:JSON.stringify(
    {
    amount:amount
  })
})
.then(response => {
  if (response.ok) {
    // Refresh the page or update the cart content
    location.reload();
  } else {
    console.error('Error removing product from cart noo:', response.status);
    // Handle the error
  }
})
.catch(error => {
  console.error('Error removing product from cart yees:', error);
  // Handle the error
});
}



////////

async function buyOrder() {
// Send an AJAX request to the server to process the payment and complete the order
fetch(`/cart/buyOrder`, { method: 'POST', body: JSON.stringify({}) })
  .then(response => response.json())
  .then(data => {
    // Payment successful, you can show a success message or update the UI as needed
    console.log('Payment successful:', data);
    // Redirect the user to a new route or display a success message
     window.location.href = data.url; 
    // Replace '/success' with the actual route for the success message
  })
  .catch(error => {
    // Error occurred while processing the payment
    console.error('Error processing payment:', error);
    // Handle the error, display an error message, etc.
  });
}
const product = require('../models/productschema');
const table=document.querySelectorAll('.search');



function sendData(e) {
    const searchResults = document.getElementById("searchResults");
    let match = e.value.match(/^[a-zA-Z]*/);
    let match2 = e.value.match(/^\s*/);
    
    if (match2&&match2[0] == e.value) {
        searchResults.innerHTML = '';
        return;
        
    }
    if (match&&match[0] == e.value) {
        fetch('/product/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload: e.value })
        }).then(res => res.json())
        .then(data => {
            let payload = data.payload;
            searchResults.innerHTML = '';
            if (payload.length < 1) {
                searchResults.innerHTML = '<p>Sorry. Nothing Found</p>';
                return;
            }
            payload.forEach(async (product, index) => {
                if (index > 0) searchResults.innerHTML += '<hr>';
                
                 const productLink = document.createElement('a');
                 productLink.innerHTML = `<p>${product.name}</p>`;
                productLink.href = `/product/product-details/${product._id}`;
            
            
                searchResults.appendChild(productLink);
                searchResults.innerHTML += `<p>${product.price}"$"</p>`;
          });



        });
        return;
    }
    searchResults.innerHTML = '';
}
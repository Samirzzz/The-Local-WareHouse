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


function buyOrder() {
  // Send an AJAX request to the server to add the product to the cart
  fetch(`/cart/buyOrder`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      // Product added to the cart, you can show a success message or update the UI as needed
      console.log('Product added to cart:', data); //window.location=
    })
    .catch(error => {
      // Error occurred while adding the product to the cart
      console.error('Error adding product to cart:', error);
    });
}
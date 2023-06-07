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









////////

// var currentPage = 1;
// var totalPages = 5;

// function changePage(page) {
//   if (page < 1 || page > totalPages) {
//     return;
//   }

//   currentPage = page;
//   updatePagination();
//   // Perform any additional actions or fetch data for the new page here
// }

// function previousPage() {
//   changePage(currentPage - 1);
// }

// function nextPage() {
//   changePage(currentPage + 1);
// }

// function updatePagination() {
//   var paginationLinks = document.getElementsByClassName('page');
//   for (var i = 0; i < paginationLinks.length; i++) {
//     paginationLinks[i].classList.remove('active');
//   }
//   paginationLinks[currentPage].classList.add('active');
// }

////////

function buyOrder() {
  // Send an AJAX request to the server to process the payment and complete the order
  fetch(`/cart/buyOrder`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      // Payment successful, you can show a success message or update the UI as needed
      console.log('Payment successful:', data);
      // Redirect the user to a new route or display a success message
      window.location.href = '/cart/message'; // Replace '/success' with the actual route for the success message
    })
    .catch(error => {
      // Error occurred while processing the payment
      console.error('Error processing payment:', error);
      // Handle the error, display an error message, etc.
    });
}

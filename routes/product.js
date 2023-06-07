const { Router } = require('express');
var bodyParser = require('body-parser');
var router = Router();
router.use(bodyParser.json());

const product = require('../models/productschema');
const productt = require("../controllers/usercontrol");
/////////

// // // Get pagination elements
// // const pagination = document.querySelector('.pagination');
// // const prevLink = pagination.querySelector('.prev');
// // const nextLink = pagination.querySelector('.next');
// // const pageLinks = pagination.querySelectorAll('.page');

// // // Handle click events for page links
// // pageLinks.forEach(link => {
// //   link.addEventListener('click', (event) => {
// //     event.preventDefault();
    
// //     // Remove 'active' class from all page links
// //     pageLinks.forEach(page => page.classList.remove('active'));
    
// //     // Add 'active' class to the clicked page link
// //     link.classList.add('active');
    
// //     // Get the page number from the clicked link
// //     const pageNumber = parseInt(link.textContent);
    
// //     // Perform necessary actions for the selected page, e.g., fetch data, update UI, etc.
// //     // ...
// //   });
// // });

// // // Handle click event for previous link
// // prevLink.addEventListener('click', (event) => {
// //   event.preventDefault();
  
// //   // Find the currently active page
// //   const activeLink = pagination.querySelector('.active');
  
// //   // If the active link is not the first page, navigate to the previous page
// //   if (activeLink && activeLink !== pageLinks[0]) {
// //     // Get the previous page number
// //     const pageNumber = parseInt(activeLink.textContent) - 1;
    
// //     // Remove 'active' class from the current page link
// //     activeLink.classList.remove('active');
    
// //     // Add 'active' class to the previous page link
// //     pageLinks[pageNumber - 1].classList.add('active');
    
// //     // Perform necessary actions for the selected page, e.g., fetch data, update UI, etc.
// //     // ...
// //   }
// // });

// // // Handle click event for next link
// // nextLink.addEventListener('click', (event) => {
// //   event.preventDefault();
  
// //   // Find the currently active page
// //   const activeLink = pagination.querySelector('.active');
  
// //   // If the active link is not the last page, navigate to the next page
// //   if (activeLink && activeLink !== pageLinks[pageLinks.length - 1]) {
// //     // Get the next page number
// //     const pageNumber = parseInt(activeLink.textContent) + 1;
    
// //     // Remove 'active' class from the current page link
// //     activeLink.classList.remove('active');
    
// //     // Add 'active' class to the next page link
// //     pageLinks[pageNumber - 1].classList.add('active');
    
// //     // Perform necessary actions for the selected page, e.g., fetch data, update UI, etc.
// //     // ...
// //   }
// // });






// //beta3 rob3

// // const shopcontent = document.querySelectorAll('.product-box');
// // const itemsPerPage = 2;
// // const totalPages = Math.ceil(prod.length / itemsPerPage);
// // let currentPage = 1;

// // showPage(currentPage);

// // function showPage(page) {
// //   const startIndex = (page - 1) * itemsPerPage;
// //   const endIndex = startIndex + itemsPerPage;
// //   prod.forEach((prod, index) => {
// //     if (index >= startIndex && index < endIndex) {
// //         prod.style.display = 'flex';
// //     } else {
// //         prod.style.display = 'none';
// //     }
// //   });
// // }

// // const pageLinks = document.querySelectorAll('.page-link');
// // pageLinks.forEach(pageLink => {
// //  pageLink.addEventListener('click', (event) => {
// //     event.preventDefault();
// //     const newPage = parseInt(event.target.textContent);
// //     currentPage = newPage;
// //     showPage(currentPage);
// //     updatePagination();
// //   });
// // });

// // function updatePagination() {
// //   pageLinks.forEach(pageLink => {
// //     if (parseInt(pageLink.textContent) === currentPage) {
// //       pageLink.classList.add('active');
// //     } else {
// //       pageLink.classList.remove('active');
// //     }
// //   });
// // }

// /////////



// // Define a route handler for the pagination
// router.get('/pagination', (req, res) => {
//     const currentPage = parseInt(req.query.page) || 1;
//     const totalPages = 5; // Total number of pages
//     const baseUrl = '/pagination'; // Base URL for pagination links
  
//     let paginationHTML = '<div class="pagination">';
  
//     // Previous page link
//     if (currentPage > 1) {
//       paginationHTML += `<a href="${baseUrl}?page=${currentPage - 1}" class="prev">&laquo; Before</a>`;
//     } else {
//       paginationHTML += '<span class="prev">&laquo; Before</span>';
//     }
  
//     // Page links
//     for (let i = 1; i <= totalPages; i++) {
//       if (i === currentPage) {
//         paginationHTML += `<a href="${baseUrl}?page=${i}" class="page active">${i}</a>`;
//       } else {
//         paginationHTML += `<a href="${baseUrl}?page=${i}" class="page">${i}</a>`;
//       }
//     }
  
//     // Next page link
//     if (currentPage < totalPages) {
//       paginationHTML += `<a href="${baseUrl}?page=${currentPage + 1}" class="next">After &raquo;</a>`;
//     } else {
//       paginationHTML += '<span class="next">After &raquo;</span>';
//     }
  
//     paginationHTML += '</div>';
  
//     // Render the pagination HTML
//     res.send(paginationHTML);
//   });
  


// //   // Define a route handler for the pagination
// // app.get('/pagination', (req, res) => {
// //   const currentPage = parseInt(req.query.page) || 1;
// //   const totalPages = 5; // Total number of pages
// //   const baseUrl = '/pagination'; // Base URL for pagination links

// //   let paginationHTML = '<div class="pagination">';

// //   // Previous page link
// //   if (currentPage > 1) {
// //     paginationHTML += `<a href="${baseUrl}?page=${currentPage - 1}" class="prev">&laquo; Before</a>`;
// //   } else {
// //     paginationHTML += '<span class="prev">&laquo; Before</span>';
// //   }

// //   // Page links
// //   for (let i = 1; i <= totalPages; i++) {
// //     if (i === currentPage) {
// //       paginationHTML += `<a href="${baseUrl}?page=${i}" class="page active">${i}</a>`;
// //     } else {
// //       paginationHTML += `<a href="${baseUrl}?page=${i}" class="page">${i}</a>`;
// //     }
// //   }

// //   // Next page link
// //   if (currentPage < totalPages) {
// //     paginationHTML += `<a href="${baseUrl}?page=${currentPage + 1}" class="next">After &raquo;</a>`;
// //   } else {
// //     paginationHTML += '<span class="next">After &raquo;</span>';
// //   }

// //   paginationHTML += '</div>';

// //   // Render the pagination HTML
// //   res.send(paginationHTML);
// // });


// // Mock data representing products on each page
// const productsPerPage = 10;
// const totalProducts = 5;
// const totalPages = Math.ceil(totalProducts / productsPerPage);

// // Define a route handler for the pagination
// router.get('/pagination', (req, res) => {
//   const currentPage = parseInt(req.query.page) || 1;
//   const baseUrl = '/pagination'; // Base URL for pagination links

//   let paginationHTML = '<div class="pagination">';

//   // Previous page link
//   if (currentPage > 1) {
//     paginationHTML += `<a href="${baseUrl}?page=${currentPage - 1}" class="prev">&laquo; Before</a>`;
//   } else {
//     paginationHTML += '<span class="prev">&laquo; Before</span>';
//   }

//   // Page links
//   for (let i = 1; i <= totalPages; i++) {
//     if (i === currentPage) {
//       paginationHTML += `<a href="${baseUrl}?page=${i}" class="page active">${i}</a>`;
//     } else {
//       paginationHTML += `<a href="${baseUrl}?page=${i}" class="page">${i}</a>`;
//     }
//   }

//   // Next page link
//   if (currentPage < totalPages) {
//     paginationHTML += `<a href="${baseUrl}?page=${currentPage + 1}" class="next">After &raquo;</a>`;
//   } else {
//     paginationHTML += '<span class="next">After &raquo;</span>';
//   }

//   paginationHTML += '</div>';

//   // Check if the current page has any products
//   const startIndex = (currentPage - 1) * productsPerPage;
//   const endIndex = startIndex + productsPerPage;
//   const productsOnPage = getProducts(startIndex, endIndex);

//   if (productsOnPage.length === 0) {
//     paginationHTML += '<p>No more products available.</p>';
//   }

//   // Render the pagination HTML
//   res.send(paginationHTML);
// });

// // Mock function to get products for a given range
// function getProducts(startIndex, endIndex) {
//   const products = [];
//   for (let i = startIndex; i < endIndex && i < totalProducts; i++) {
//     products.push(`Product ${i + 1}`);
//   }
//   return products;
// }



/////////
/* GET products page. */
router.get('/', (req, res) => {
    product.find()
    .then(result=>{
        res.render('product', { product: result ,user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err=>{
    console.log(err);
    })
});
router.get('/Tshirts', (req, res) => {
    product.find()
    .then(result=>{
        res.render('Tshirts', { product: result ,user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err=>{
    console.log(err);
    })
});
router.get('/Hoodies', (req, res) => {
    product.find()
    .then(result=>{
        res.render('Hoodies', { product: result ,user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err=>{
    console.log(err);
    })
});
router.get('/Cargos', (req, res) => {
    product.find()
    .then(result=>{
        res.render('Cargos', { product: result ,user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err=>{
    console.log(err);
    })
});

router.get('/product-details/:id', productt.prodpage)


module.exports = router;

// Send a message to the content script to extract product info
const productDiv = document.getElementById("product");
const productInfoDiv = document.getElementById("product-info");
// const bkg = chrome.extension.getBackgroundPage();

// async function getSimilarProducts(productName) {
//     const apiKey = "your-ebay-api-key"; // Replace with a real eBay API key
//     const apiUrl = `https://serpapi.com/search.json?engine=google_shopping&q=RED%20TEMPTATION%2080%20ML`;
  
//     const response = await fetch(apiUrl);
//     const data = await response.json();
  
//     if (data.shopping_results) {
//       return data.shopping_results;
//     } else {
//       return [];
//     }
//   }
  
  // Function to display similar products
  function displaySimilarProducts(similarProducts) {
    let similarProductsHTML = '<h3 style="font-family: \'Helvetica\', Arial, sans-serif;">Similar Products:</h3><ul style="list-style: none; padding: 0;">';
  
    similarProducts.forEach((product, index) => {
      similarProductsHTML += `
        <li style="margin-bottom: 10px;">
        <a href="${product.product_link}" target="_blank" style="font-family: 'Helvetica', Arial, sans-serif; text-decoration: none; color: #3498db;">
        <p>${product.title}</p>
            <img src="${product.thumbnail}" style="max-width: 50px; vertical-align: middle; margin-right: 10px; border-radius: 5px;" />
            ${product.price}
          </a>
          <br/>
        </li>`;
        if (index < similarProducts.length - 1) {
            similarProductsHTML += '<hr style="border: none; border-top: 1px solid #eee; margin: 10px 0;" />';
          }
    });
  
    similarProductsHTML += '</ul>';
    return similarProductsHTML;
  }
  
  // Function to handle the button click to fetch similar products
  function handleShowSimilarProducts(productName) {
    productInfoDiv.innerHTML = "fetching similar products ...";
    chrome.runtime.sendMessage({ action: "getSimilarProducts", productName }, (response) => {
      if (response.similarProducts) {
        productInfoDiv.innerHTML = "";
        // bkg.console.log(response.similarProducts, "-res");
        
        // Handle the display of similar products here
        productDiv.innerHTML += displaySimilarProducts(response.similarProducts);
      } else if (response.error) {
        productInfoDiv.innerHTML = "";
        console.error(response.error);
      }
    });
  }
  
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

  chrome.tabs.sendMessage(
    tabs[0]?.id,
    { action: "getProductInfo" },
    (response) => {
      if (response) {
        productInfoDiv.innerHTML = "";
        productDiv.innerHTML = `
          <div class="product" style="font-family: 'Helvetica', Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="font-family: 'Helvetica', Arial, sans-serif; font-size: 18px; color: #333; margin-bottom: 10px;">${response.name}</h2>
          <p style="font-family: 'Helvetica', Arial, sans-serif; font-size: 16px; color: #666; margin-bottom: 10px;">Price: <strong style="color: #000;">${response.price}</strong></p>
          <p style="font-family: 'Helvetica', Arial, sans-serif; font-size: 14px; color: #888; margin-bottom: 10px;">
            Image URL: <a href=${response.imageUrl} style="color: #3498db; text-decoration: none;">Right click and copy Image</a>
          </p>
          <img src="${response.imageUrl}" alt="Product Image" style="max-width: 150px; margin-top: 15px;" />
        </div>
        <button id="show-similar-products" style="font-family: 'Helvetica', Arial, sans-serif; background-color: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">Show Similar Products</button>
        <div id="similar-products" style="margin-top: 20px;"></div>
        `;
        const showSimilarProductsButton = document.getElementById("show-similar-products");
        showSimilarProductsButton.addEventListener('click', () => {
          handleShowSimilarProducts(response.name);
        });
      } else {
        productInfoDiv.innerHTML = "";
        productDiv.innerHTML = "<p>Product information not found.</p>";
      }
    }
  );
});

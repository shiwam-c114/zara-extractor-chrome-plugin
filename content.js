// Function to extract product details
function extractProductInfo() {
    let productName = document.querySelector(".product-detail-info__header-name").innerText;
    let productPrice = document.querySelector(".money-amount__main").innerText;
    let productImage = document.querySelector(".media-image img")?.src;

    // Return product details as an object
    return {
      name: productName,
      price: productPrice,
      imageUrl: productImage
    };
  }
  
  // Listen for messages from the popup to send product data
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getProductInfo") {
      const productInfo = extractProductInfo();
      sendResponse(productInfo);
    }
  });
  
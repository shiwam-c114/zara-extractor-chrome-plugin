// Send a message to the content script to extract product info
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const productDiv = document.getElementById("product");
    const productInfoDiv = document.getElementById("product-info");
    chrome.tabs.sendMessage(tabs[0]?.id, { action: "getProductInfo" }, (response) => {
      if (response) {
        productInfoDiv.innerHTML = "";
        productDiv.innerHTML = `
            <h2>${response.name}</h2>
            <p>Price: ${response.price}</p>
            <p>Image URL: <a href=${response.imageUrl}>${response.imageUrl} </a> </p>
            <img src="${response.imageUrl}" alt="Product Image" />
        `;
      } else {
        productInfoDiv.innerHTML = "";
        productDiv.innerHTML = "<p>Product information not found.</p>";
      }
    });
  });
  
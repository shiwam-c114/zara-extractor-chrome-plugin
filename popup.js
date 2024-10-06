// Send a message to the content script to extract product info
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const productDiv = document.getElementById("product");
  const productInfoDiv = document.getElementById("product-info");
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
        `;
      } else {
        productInfoDiv.innerHTML = "";
        productDiv.innerHTML = "<p>Product information not found.</p>";
      }
    }
  );
});

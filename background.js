chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSimilarProducts") {
        const myHeaders = new Headers();
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = `${proxyUrl}https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(request.productName)}&api_key=ae7b03c53c36314c09c2a9342c4d41ad003f2716b8205934510b5a96d9836e16`;
        
    //   const apiUrl = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(request.productName)}&api_key=ae7b03c53c36314c09c2a9342c4d41ad003f2716b8205934510b5a96d9836e16`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(first)
          sendResponse({ similarProducts: data?.shopping_results });
        })
        .catch(error => {
          console.error("Error fetching similar products:", error);
          sendResponse({ error: "Error fetching similar products" });
        });
      
      return true;  // Indicates asynchronous sendResponse
    }
  });
  
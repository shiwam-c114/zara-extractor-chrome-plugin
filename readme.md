# Lumu Saas Zara Product Info Extractor Chrome Extension

## Overview

This Chrome extension extracts product information (name, price, and image) from a product page on Zara website and displays it in a popup. Additionally, it includes a feature that fetches similar products from serpapi.com API which fetches data from google and displays them in the popup when a button is clicked.

## Features

- Extract product information from Zara website.
  - **Product Name**
  - **Price**
  - **Product Image**
- Display the extracted information in a popup when clicking the extension icon.
- **Bonus Feature**: Fetch and display similar products by interacting with serpapi.com API.
- Simple minimalist design.

## Requirements

- **Google Chrome** browser.
- A valid API key for serpapi.com (a free apikey with 100 free searchs in added in the code base).


## Installation

Follow these steps to install and test the Chrome extension locally:

### 1. Download and extract the extention zip file

1. Download the extention zip file.
2. Extract using any zip extractor.

### 2. Load the Extension in Chrome

1. Open **Google Chrome**.
2. Navigate to the Chrome extensions page by typing `chrome://extensions/` in the address bar.
3. Enable **Developer Mode** by toggling the switch in the upper-right corner.
4. Click **"Load unpacked"** and select the folder where you extracted the extension files.

### 4. Test the Extension

1. Visit [Zara e-commerce website](https://www.zara.com/).
2. Go to the product page of any item.
3. Click the extension icon in the Chrome toolbar.
4. The popup will display the extracted product details (name, price, and image).
5. Click the "Show Similar Products" button to see a list of similar products.

## Usage

- **Product Information**: When visiting a product page on a fashion e-commerce site, click the extension icon. The popup will show the product’s name, price, and image.
- **Find Similar Products**: Click the **"Show Similar Products"** button in the popup to fetch and display similar products from an external API.

## Troubleshooting

- **CORS Issues**: Even though a CORS proxy has been implemented, if you still encounter CORS issues when fetching similar products, consider using a browser CORS extension (e.g., CORS Unblock) to temporarily bypass the restrictions.
- **API Key Issues**: If you don’t see any similar products, it maybe because of the provided api key's quota exceeded. Please consider getting a new fee API key from serpapi.com and add it in background.js in place of api key.

---
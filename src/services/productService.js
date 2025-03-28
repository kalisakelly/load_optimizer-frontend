export async function fetchProductPackages() {
    const response = await fetch('http://localhost:3000/product-package'); // Your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch product packages');
    }
    return response.json();
  }
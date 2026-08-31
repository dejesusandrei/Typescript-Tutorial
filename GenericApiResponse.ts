// Generic Wrapper para sa lahat ng backend responses
type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};

// Data Models
type User = {
  id: number;
  name: string;
  email: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
};

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP Error status: ${response.status}`);
  }

  // Awtomatikong ikakasta ang na-parse na JSON bilang ApiResponse<T>
  const data: ApiResponse<T> = await response.json();
  return data;
}

async function runExample() {
  try {
    // 1. Pag-fetch ng User Data
    const userResponse = await fetchData<User>("https://api.example.com/users/1");
    
    if (userResponse.success) {
      // ✅ Auto-complete at Type Safe!
      console.log(`User Name: ${userResponse.data.name}`);
      console.log(`Email: ${userResponse.data.email}`);
    }

    // 2. Pag-fetch ng Product Data
    const productResponse = await fetchData<Product>("https://api.example.com/products/p99");
    
    if (productResponse.success) {
      // ✅ Auto-complete para sa Product fields!
      console.log(`Product: ${productResponse.data.title}`);
      console.log(`Price: $${productResponse.data.price}`);
    }

  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// Bakit magandang practice ito?
// Reusability – Hindi mo kailangang gumawa ng hiwalay na fetch function para sa bawat API endpoint (e.g., fetchUser(), fetchProduct()).
// Type Safety & Auto-complete – Habang nagta-type ka ng userResponse.data., lalabas lang ang mga properties na umiiral sa User (id, name, email).
// Early Error Catching – Kung susubukan mong i-access ang userResponse.data.price, magbibigay agad ng error si TypeScript bago mo pa man i-run ang application.
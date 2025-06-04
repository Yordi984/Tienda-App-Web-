export const getProducts = async (options?: {
  searchTerm?: string;
  category?: string;
}) => {
  console.log('-'.repeat(10), 'Fetching products', '-'.repeat(10));
  console.log('Fetching products with options:', options);

  const baseUrl = 'http://localhost:3000/productos';
  const url = new URL(baseUrl);

  if (options?.searchTerm) {
    url.searchParams.append('q', options.searchTerm);
  }

  if (options?.category) {
    url.searchParams.append('filter', options.category);
  }

  console.log('Fetching products from:', url.toString());

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log('Products fetched successfully:', data);

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  } finally {
    console.log('-'.repeat(10), 'End fetching products', '-'.repeat(10));
  }
};

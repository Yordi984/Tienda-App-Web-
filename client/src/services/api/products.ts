export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  disponibilidad: string;
  precio: number;
  whatsapp: number;
  imagen?: string;
}

export const getProducts = async (options?: {
  searchTerm?: string;
  category?: string;
}) => {
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
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

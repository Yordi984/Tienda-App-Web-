import type { Product } from '../../types';

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

export const getFavoriteProducts = async (
  vendedorId: number,
  options?: {
    searchTerm?: string;
    category?: string;
  },
) => {
  console.log('-'.repeat(10), 'Fetching favorite products', '-'.repeat(10));
  console.log('Fetching favorite products with options:', options);

  const baseUrl = `http://localhost:3000/vendedores/${vendedorId}/favoritos`;
  const url = new URL(baseUrl);

  if (options?.searchTerm) {
    url.searchParams.append('q', options.searchTerm);
  }

  if (options?.category) {
    url.searchParams.append('filter', options.category);
  }

  console.log('Fetching favorite products from:', url.toString());

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

    console.log('Favorite products fetched successfully:', data);

    return data;
  } catch (error) {
    console.error('Error fetching favorite products:', error);
    return [];
  } finally {
    console.log(
      '-'.repeat(10),
      'End fetching favorite products',
      '-'.repeat(10),
    );
  }
};

export const changeFavorite = (product: Product, cb?: () => void) => {
  console.log(`Favoriting product: ${product.id}`);

  fetch(`http://localhost:3000/favorito/${product.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ vendedorId: product.vendedor.id }),
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Product ${product.id} favorited successfully.`);
        cb?.();
      } else {
        console.error(`Failed to favorite product ${product.id}.`);
      }
    })
    .catch((error) => {
      console.error('Error favoriting product:', error);
    });
};

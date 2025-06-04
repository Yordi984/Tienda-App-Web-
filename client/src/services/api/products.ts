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

export const changeFavorite = (
  vendedorId: number,
  productId: number,
  cb?: () => void,
) => {
  console.log(`Favoriting product: ${productId}`);

  fetch(`http://localhost:3000/favorito/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ vendedorId: vendedorId }),
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Product ${productId} favorited successfully.`);
        cb?.();
      } else {
        console.error(`Failed to favorite product ${productId}.`);
      }
    })
    .catch((error) => {
      console.error('Error favoriting product:', error);
    });
};

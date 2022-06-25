const fetchProducts = async () => {
  const response = await fetch('http://localhost:1337/products');
  const products = await response.json();

  return products;
};

const fetchProduct = async (id) => {
  const response = await fetch(`http://localhost:1337/products/${id}`);
  const product = await response.json();

  return product;
};

const createProduct = async ({ description, quantity }) => {
  const response = await fetch('http://localhost:1337/products', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description,
      quantity
    })
  });

  const reponseData = await response.json();

  return reponseData;
};

const updateProduct = async ({ description, quantity }, id) => {
  const response = await fetch(`http://localhost:1337/products/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description,
      quantity
    })
  });

  const reponseData = await response.json();

  return reponseData;
};

const deleteProduct = async ({ id }) => {
  await fetch(`http://localhost:1337/products/${id}`, {
    method: 'DELETE'
  });
};

const ApiService = {
  fetchProducts,
  fetchProduct,
  createProduct,
  deleteProduct,
  updateProduct
};

export default ApiService;

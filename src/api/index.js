export const getProducts = async (category = '') => {
    let requestUrl = `http://localhost:4001/products`;

    if(category !== ''){
      const parseURL = category.split('-');
      const categoryId = parseInt(parseURL[1]);
      requestUrl = `http://localhost:4001/products?category=${categoryId}`;
    }
    const response = await fetch(requestUrl)
      .then(res => {
        return res.json();
      });

    return response;
};


export const getCategories = async () => {
  const requestUrl = new URL(`http://localhost:4001/categories`);
  const response = fetch(requestUrl)
                    .then(res => { return res.json() });
  return response;
};

export const getToken = async (email, password) => {
  const requestUrl = new URL(`http://localhost:4001/login`);
  const header = { 'Content-Type': 'application/json'};
  return fetch(requestUrl, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({email: email, password: password})
  })
    .then(data => data.json())
};


export const getCartItems = async (token) => {
  let requestUrl = `http://localhost:4001/cart/`;
  const header = { 
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(requestUrl, {
      headers: header,
    })
    .then(res => {
      return res.json();
    });
  
  return response;

};

export const getProductById = async (id) => {
  let requestUrl = `http://localhost:4001/products/${id}`;
  const response = await fetch(requestUrl)
      .then(res => { return res.json() });
  return response;
};

export const sendToCart = async (token, quantity, id) => {
  let requestUrl = `http://localhost:4001/cart`;
  const header = { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };
  return await fetch(requestUrl, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({productId: id, quantity: quantity})
  })
    .then(data => data.json());
};

export const order = async (token) => {
  let requestUrl = `http://localhost:4001/orders`;
  const header = { 
      'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };
  const response = await fetch(requestUrl, {
      method: 'POST',
      headers: header
  })
    .then(data => data.json());
  return response;
};

export const getUserInfo = async (token) => {
  let requestUrl = `http://localhost:4001/user`;
  const header = { 
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(requestUrl, {
      headers: header,
    })
    .then(res => {
      return res.json();
    });
  return response;
  };

export const getOrders = async (token) => {
  let requestUrl = `http://localhost:4001/orders`;
  const header = { 
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(requestUrl, {
      headers: header,
    })
    .then(res => {
      return res.json();
    });
  return response;
}

export const getOrderDetails = async (token, id) => {
  let requestUrl = `http://localhost:4001/orders/${id}`;
  const header = { 
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(requestUrl, {
      headers: header,
    })
    .then(res => {
      return res.json();
    });
  return response;
};

export const checkoutPayment = async (token, id) => {
  let requestUrl = `http://localhost:4001/orders/${id}/checkout`;
  const header = { 
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(requestUrl, {
      method: 'POST',
      headers: header,
    })
    .then(res => {
      return res.json();
    });
  return response;
};




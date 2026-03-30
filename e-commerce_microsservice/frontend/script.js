const API = {
  user: "http://localhost:3002",
  product: "http://localhost:3001",
  order: "http://localhost:3005"
};

function showResponse(data) {
  document.getElementById("response").textContent =
    JSON.stringify(data, null, 2);
}

/* ================= USER ================= */
async function createUser() {
  const res = await fetch(`${API.user}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value
    })
  });

  const data = await res.json();
  showResponse(data);
}

/* ================= PRODUCT ================= */
async function createProduct() {
  const res = await fetch(`${API.product}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("productName").value,
      price: Number(document.getElementById("price").value)
    })
  });

  const data = await res.json();
  showResponse(data);

  loadProducts(); // atualiza catálogo
}

/* ================= ORDER ================= */
async function createOrder() {
  const res = await fetch(`${API.order}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: document.getElementById("userId").value,
      products: [
        {
          productId: document.getElementById("productId").value,
          quantity: Number(document.getElementById("quantity").value)
        }
      ]
    })
  });

  const data = await res.json();
  showResponse(data);
}

/* ================= CATÁLOGO ================= */
async function loadProducts() {
  try {
    const res = await fetch(`${API.product}/products`);
    const products = await res.json();

    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-item";

      div.innerHTML = `
        <strong>${p.name}</strong><br>
        R$ ${p.price}<br>
        <small>${p._id}</small>
      `;

      // 🔥 clique automático
      div.onclick = () => {
        document.getElementById("productId").value = p._id;
        showResponse({
          message: "Produto selecionado com sucesso",
          productId: p._id
        });
      };

      list.appendChild(div);
    });

  } catch (err) {
    console.log("Erro ao carregar produtos");
  }
}
/* CARREGA AO ABRIR */
loadProducts();
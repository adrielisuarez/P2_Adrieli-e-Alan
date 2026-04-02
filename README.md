🗂️ Estrutura do Projeto
ecommerce/
├── user-service/       → Porta 3002
├── product-service/    → Porta 3001
├── order-service/      → Porta 3005
├── payment-service/    → Porta 3004
└── frontend/
    ├── index.html
    ├── script.js
    └── style.css

⚙️ Variáveis de Ambiente
Crie um arquivo .env na raiz de cada serviço (exceto o payment-service, que não usa banco):
envMONGO_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority
PORT=<porta do serviço>
ServiçoNome do banco sugeridouser-serviceuser-dbproduct-serviceproduct-dborder-serviceorder-db

⚠️ Nunca suba o arquivo .env para o repositório. Adicione-o ao .gitignore.


🚀 Como inicializar cada serviço
Execute os comandos abaixo dentro de cada pasta de serviço:
bashnpm install
node server.js
Recomendamos iniciar na seguinte ordem:
1. user-service
2. product-service
3. payment-service
4. order-service

🌐 Portas utilizadas
ServiçoPortaProduct Service3001User Service3002Payment Service3004Order Service3005

📦 Descrição dos Serviços
👤 User Service — porta 3002
Responsável pelo cadastro e consulta de usuários.
MétodoRotaDescriçãoBodyPOST/usersCriar usuário{ name, email }GET/users/:idBuscar usuário—

📦 Product Service — porta 3001
Responsável pelo catálogo de produtos e controle de estoque. O estoque é gerenciado dentro do próprio serviço — ao criar um produto, a quantidade em estoque já é definida.
MétodoRotaDescriçãoBodyPOST/productsCriar produto{ name, price, quantity }GET/productsListar produtos—GET/products/:idBuscar produto—PATCH/products/:id/decrementDecrementar estoque{ quantity }

💳 Payment Service — porta 3004
Simula o processamento de pagamento. Não utiliza banco de dados. Aprova 70% e recusa 30% das transações de forma aleatória.
MétodoRotaDescriçãoBodyPOST/paymentsProcessar pagamento{ amount }

🧾 Order Service — porta 3005
Responsável pela criação e consulta de pedidos. Internamente, consulta o Product Service para verificar preço e estoque, chama o Payment Service para processar o pagamento e decrementa o estoque após aprovação.
MétodoRotaDescriçãoBodyPOST/ordersCriar pedido{ userId, products: [{ productId, quantity }] }GET/orders/:idBuscar pedido—
Fluxo interno do pedido:
Recebe pedido
   → Consulta produto e verifica estoque (Product Service)
   → Calcula total
   → Salva pedido com status CRIADO
   → Envia para pagamento (Payment Service)
   → Se APROVADO: decrementa estoque e atualiza status para PAGO
   → Se RECUSADO: atualiza status para CANCELADO

🖥️ Frontend
Abra o arquivo frontend/index.html diretamente no navegador. O painel permite:

Criar usuários e produtos (com quantidade em estoque)
Visualizar o catálogo com estoque disponível
Selecionar um produto clicando no card (preenche o ID automaticamente)
Criar pedidos e visualizar a resposta em tempo real


Certifique-se de que todos os serviços estão rodando antes de usar o painel.


🧪 Testando com Insomnia
Importe o arquivo insomnia-collection.json no Insomnia via File → Import. A coleção contém as seguintes requisições prontas:

✅ Criação de usuário
✅ Criação de produto (com estoque)
✅ Listagem de produtos
✅ Criação de pedido
✅ Consulta de status do pedido
✅ Processamento de pagamento
✅ Decremento de estoque

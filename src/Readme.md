LabEcommerce Backend
Bem-vindo ao LabEcommerce, o backend responsável por fornecer uma API poderosa para o seu e-commerce. Este projeto utiliza uma variedade de tecnologias avançadas, como Knex, SQLite, TypeScript, métodos HTTP, CORS e Express para facilitar o seu trabalho.

Utilização
Para começar a usar o LabEcommerce, siga as instruções abaixo:

Certifique-se de ter o Node.js instalado em seu sistema(requisito obrigatório).
Clone este repositório em sua máquina local.
Navegue até o diretório raiz do projeto.
Execute o comando npm install para instalar as dependências node_modules do projeto.
Após a instalação e configuração, execute o comando npm run dev para iniciar o servidor local para dar inicio ao seu projeto.
O servidor estará disponível em http://localhost:3003.

O LabEcommerce oferece uma API rica com os seguintes endpoints:

Usuários
GET /users: Retorna todos os usuários cadastrados ao banco de dados.
POST /users: Cria um novo usuário ao banco de dados.
Produtos
GET /products: Retorna todos os produtos cadastrados ao banco de dados.
GET /products/search?name=nomedoproduto: Retorna um produto específico com base no nome fornecido pelo usuário.
POST /products: Cria um novo produto ao banco de dados.
PUT /products/:id: Atualiza os dados de um produto existente com base no ID fornecido.
Compras
POST /purchase: Cria uma nova compra utilizando os produtos cadastrados ao banco de dados.
GET /purchase/:id: Retorna uma compra já cadastrada ao banco de dados  com base no ID fornecido.
DELETE /purchase/:id: Exclui uma compra já efetuada ao banco de dados com base no ID fornecido.
Documentação do Postman
A documentação completa da API do LabEcommerce está disponível no formato do Postman, onde você pode encontrar mais  detalhes sobre cada endpoint criado e ver cada um espeficado em detalhes, exemplos de requisições e respostas, bem como testar a API de forma interativa e simplificada.

Para acessar a documentação do Postman para o LabEcommerce, clique aqui https://documenter.getpostman.com/view/26594502/2s946h6rYg. Este link será útil para todos os interessados em explorar e utilizar a API do LabEcommerce de forma mais eficiente e intuitiva.

Agora você tem todo o poder para interagir com o banco de dados e manipular os dados do seu e-commerce e facilitar o seu projeto. Não se esqueça de utilizar um software como o Postman ou desenvolver uma aplicação cliente para fazer as requisições adequadas para melhor utilização da API acima.

Divirta-se explorando o LabEcommerce e boa sorte com o seu e-commerce!
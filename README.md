
# Gestão Web

Este é um projeto de gestão financeira desenvolvido com Node.js, Express e Sequelize. O objetivo do projeto é permitir que os usuários gerenciem suas receitas e despesas de forma simples e intuitiva.

## Funcionalidades
- **Autenticação de Usuário**: Os usuários podem se registrar e fazer login para acessar suas informações financeiras.
- **Gerenciamento de Receitas**: Os usuários podem cadastrar, editar, excluir e visualizar suas receitas.
- **Gerenciamento de Despesas**: Os usuários podem cadastrar, editar, excluir e visualizar suas despesas.
- **Relatórios Mensais**: Os usuários podem filtrar receitas e despesas por mês.
- **Perfil do Usuário**: Os usuários podem visualizar um resumo de suas receitas e despesas em seu perfil.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construção de aplicações web em Node.js.
- **Sequelize**: ORM para Node.js que facilita a interação com bancos de dados SQL.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados.
- **EJS**: Motor de template para renderização de views em HTML.

## Estrutura do Projeto

```
gestao-web/
├── src/                        # Diretório principal do código-fonte
│   ├── config/                 # Configurações do aplicativo
│   ├── controller/             # Controladores para gerenciar a lógica de negócios
│   ├── database/               # Configuração do banco de dados e modelos
│   ├── middleware/             # Middleware para autenticação e validação
│   ├── router/                 # Definições de rotas
│   ├── views/                  # Views EJS
│   └── server.js               # Arquivo principal do servidor
├── assets/                     # Arquivos estáticos (CSS, imagens, etc.)
├── .env                        # Variáveis de ambiente
├── package.json                # Dependências e scripts do projeto
└── README.md                   # Documentação do projeto
```

## Instalação
1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/gestao-web.git
cd gestao-web
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados no arquivo `.env` (não se esqueça de criar o banco de dados no PostgreSQL):

```ini
DB_NAME=db_gestao
DB_USER=postgres
DB_PASSWORD=12345678
DB_HOST=localhost
```

4. Inicie o servidor:

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:3000`.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

# api-devices-cypress

Automated API tests for https://api.restful-api.dev using Cypress

## Visão Geral
Este projeto utiliza o Cypress para realizar testes automatizados de API (E2E) em endpoints públicos. Cada arquivo de teste cobre um método HTTP ou cenário específico.

## Estrutura do Projeto
- `cypress/e2e/`: Especificações de testes para cada endpoint (GET, POST, PUT, DELETE)
- `cypress/fixtures/`: Dados estáticos para uso nos testes
- `cypress/support/`: Comandos customizados e configurações globais
- `cypress.config.js`: Configuração do Cypress
- `package.json`: Dependências do projeto

## Como rodar os testes
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute os testes em modo headless:
   ```bash
   npx cypress run
   ```
   Ou abra a interface gráfica do Cypress:
   ```bash
   npx cypress open
   ```

## Padrões e Convenções
- Todos os testes usam `cy.api()` do `cypress-plugin-api` para requisições HTTP.
- Os dados de teste são definidos dentro dos próprios testes.
- Cada teste é independente e prepara seus próprios dados.
- Testes de erro e validação de mensagens são cobertos.

## Exemplo de Teste
```js
cy.api({ method: 'POST', url, body }).as('postDevice');
cy.get('@postDevice').then((response) => {
  cy.api({ method: 'DELETE', url: `${url}/${response.body.id}` }).as('deleteDevice');
  cy.get('@deleteDevice').then((deleteResponse) => {
    expect(deleteResponse.status).equal(200);
  });
});
```

## Requisitos
- Node.js >= 14
- npm

## Autor
Mateus Almeida

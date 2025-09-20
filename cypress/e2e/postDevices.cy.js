/// <reference types="cypress"/>

describe("Cadastro de dispositivos", () => {
  it("Deve cadastrar um dispositivo", () => {
    //Guardando data atual para validação da chave "createdAt"
    const dataAtual = new Date().toISOString().slice(0, 10);

    //Definindo a massa do cadastro
    const body = {
      name: "Nokia Tijolão 128 GB",
      data: {
        year: 2025,
        price: 3500.0,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      },
    };

    //Chamada do método POST
    cy.api({
      method: "POST",
      url: "/objects",
      failOnStatusCode: false,
      body: body,
    }).as("postDevice");

    //Validações dos dados
    cy.get("@postDevice").then((response) => {
      expect(response.status).equal(200);

      expect(response.body.id).not.empty;
      expect(response.body.name).not.empty;
      expect(response.body.data).not.empty;

      expect(response.body.name).equal(body.name);
      expect(response.body.data.year).equal(body.data.year);
      expect(response.body.data.price).equal(body.data.price);
      expect(response.body.createdAt.slice(0, 10)).equal(dataAtual);
    });
  });

  it.only("Deve retornar erro quando não passar o corpo de requisição", () => {
    const msgError =
      "400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.";

    cy.api({
      method: "POST",
      url: "/objects",
      failOnStatusCode: false,
      body: "",
    }).as("postDeviceInvalido");

    cy.get("@postDeviceInvalido").then((responsePost) => {
      expect(responsePost.status).equal(400);
      expect(responsePost.body.error).equal(msgError);
    });
  });

});

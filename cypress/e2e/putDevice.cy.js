/// <reference types="cypress"/>

describe("Alterar um dispositivos", () => {
  it("Deve alterar um dispositivo", () => {

    //Definindo massa do cadastro que deve existir antes do PUT
    const body = {
      name: "Nokia Tijolão 128 GB",
      data: {
        year: 2025,
        price: 3500.0,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      },
    };

    //Definindo massa de atualização do dispositivo cadastrado anteriormente, adicionando novas chaves: "color" e "owner"
    const body_update = {
      name: "Nokia tijolinho 128 GB",
      data: {
        year: 2025,
        price: 3500.0,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
        color: "Black",
        owner: "Mateus Almeida",
      },
    };

    //Chamada do POST para cadastro do dispositivo
    cy.api({
      method: "POST",
      url: "/objects",
      failOnStatusCode: false,
      body: body,
    }).as("postDevice");

    //Validações do POST
    cy.get("@postDevice").then((responsePost) => {
      expect(responsePost.status).equal(200);
      expect(responsePost.body.name).equal(body.name);

      //Guardando id do dispositivo cadastrado, pois será passado via URL para ser atualizado
      const deviceIdPut = responsePost.body.id;

      //Chamada do método PUT
      cy.api({
        method: "PUT",
        url: `/objects/${deviceIdPut}`,
        failOnStatusCode: false,
        body: body_update,
      }).as("putDevice");

      //Validações da resposta do PUT
      cy.get("@putDevice").then((responsePut) => {
        expect(responsePut.status).equal(200);
        expect(responsePut.body.name).equal(body_update.name);
        expect(responsePut.body.data.owner).equal(body_update.data.owner);
        expect(responsePut.body.data.color).equal(body_update.data.color);
      });
    });
  });
});

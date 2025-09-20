/// <reference types="cypress"/>

describe("Deletar dispositivo", () => {
  it("Deve deletar um dispositivo", () => {
    //Definindo massa de cadastro pois deve existir um dipositivo para o DELETE
    const body = {
      name: "Nokia Tijolão 128 GB",
      data: {
        year: 2025,
        price: 3500.0,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      },
    };

    //Chamada do método POST para o cadastro do dispositivo
    cy.api({
      method: "POST",
      url: "/objects",
      failOnStatusCode: false,
      body: body,
    }).as("postDevice");

    //Confirmando se o cadastro obteve sucesso
    cy.get("@postDevice").then((responsePost) => {
      expect(responsePost.status).equal(200);

      //Chamada do método DELETE
      cy.api({
        method: "DELETE",
        url: `/objects/${responsePost.body.id}`,
        failOnStatusCode: false,
      }).as("deleteDevice");

      //Validações dos dados
      cy.get("@deleteDevice").then((responseDelete) => {
        expect(responseDelete.status).equal(200);
        expect(responseDelete.body.message).equal(
          `Object with id = ${responsePost.body.id} has been deleted.`
        );
      });
    });
  });

  it("Deletar um dispositivo não existente", () => {
    const id_invalido = "abc000";
    const msgError = `Object with id = ${id_invalido} doesn't exist.`;

    cy.api({
      method: "DELETE",
      url: `/objects/${id_invalido}`,
      failOnStatusCode: false,
    }).as("deleteDevice");

    cy.get("@deleteDevice").then((responseDelete) => {
      expect(responseDelete.status).equal(404);
      expect(responseDelete.body.error).equal(msgError);
    });
  });

  it.only("Não deve permitir deletar um dispositivo reservado", () => {
    const id_reservado = "1";
    const msgError = `${id_reservado} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`;

    cy.api({
      method: "DELETE",
      url: `/objects/${id_reservado}`,
      failOnStatusCode: false,
    }).as("deleteDevice");

    cy.get("@deleteDevice").then((reponseDelete) => {
      expect(reponseDelete.status).equal(405);
      expect(reponseDelete.body.error).equal(msgError);
    });
  });

});

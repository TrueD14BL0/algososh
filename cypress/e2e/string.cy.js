import { DELAY_IN_MS } from '../../src/constants/delays'

describe('app works correctly with routes', function() {
  beforeEach(function() {
    cy.visit('/recursion');
  });

  it('should string page', function() {
    cy.contains('Строка');
  });

  //https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

  it('should button disabled while input empty', function() {
    cy.get("button").should('be.disabled');
    cy.get('input').should('be.empty');
  });

  it('animation test', function() {
    cy.get('input').type('hello');
    cy.get("button").contains('Развернуть').should('be.not.disabled').as('start_button');
    cy.get("@start_button").click();
    cy.get("@start_button").get('[data-cy="loader"]').should('exist');
    cy.get('input').should('be.disabled');
    cy.wait(DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('h');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
    cy.get('[data-cy="circle"]').eq(1).contains('e');
    cy.get('[data-cy="circle"]').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="circle"]').eq(2).contains('l');
    cy.get('[data-cy="circle"]').eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="circle"]').eq(3).contains('l');
    cy.get('[data-cy="circle"]').eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="circle"]').eq(4).contains('o');
    cy.get('[data-cy="circle"]').eq(4).should('have.css', 'border-color', 'rgb(210, 82, 225)');
    cy.wait(DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('o');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.get('[data-cy="circle"]').eq(1).contains('e');
    cy.get('[data-cy="circle"]').eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)');
    cy.get('[data-cy="circle"]').eq(2).contains('l');
    cy.get('[data-cy="circle"]').eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="circle"]').eq(3).contains('l');
    cy.get('[data-cy="circle"]').eq(3).should('have.css', 'border-color', 'rgb(210, 82, 225)');
    cy.get('[data-cy="circle"]').eq(4).contains('h');
    cy.get('[data-cy="circle"]').eq(4).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.wait(DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('o');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.get('[data-cy="circle"]').eq(1).contains('l');
    cy.get('[data-cy="circle"]').eq(1).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.get('[data-cy="circle"]').eq(2).contains('l');
    cy.get('[data-cy="circle"]').eq(2).should('have.css', 'border-color', 'rgb(210, 82, 225)');
    cy.get('[data-cy="circle"]').eq(3).contains('e');
    cy.get('[data-cy="circle"]').eq(3).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.get('[data-cy="circle"]').eq(4).contains('h');
    cy.get('[data-cy="circle"]').eq(4).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.wait(DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('o');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.get('[data-cy="circle"]').eq(1).contains('l');
    cy.get('[data-cy="circle"]').eq(1).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.get('[data-cy="circle"]').eq(2).contains('l');
    cy.get('[data-cy="circle"]').eq(2).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.get('[data-cy="circle"]').eq(3).contains('e');
    cy.get('[data-cy="circle"]').eq(3).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.get('[data-cy="circle"]').eq(4).contains('h');
    cy.get('[data-cy="circle"]').eq(4).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    cy.get("@start_button").get('[data-cy="loader"]').should('not.exist');
    cy.get('input').should('be.not.disabled');
  });

}); 
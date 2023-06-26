import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'

describe('app works correctly with routes', function() {
  beforeEach(function() {
    cy.visit('/fibonacci');
  });

  it('should string page', function() {
    cy.contains('Последовательность Фибоначчи');
  });

  //https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

  it('should button disabled while input empty', function() {
    cy.get("button").should('be.disabled');
    cy.get('input').should('be.empty');
  });

  it('animation test', function() {
    cy.get('input').type('5');
    cy.get("button").contains('Рассчитать').should('be.not.disabled').as('start_button');
    cy.get("@start_button").click();
    cy.get("@start_button").get('[data-cy="loader"]').should('exist');
    cy.get('input').should('be.disabled');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('1');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(0).contains('0');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('1');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(0).contains('0');
    cy.get('[data-cy="circle"]').eq(1).contains('1');
    cy.get('[data-cy="circle"]').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(1).contains('1');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('1');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(0).contains('0');
    cy.get('[data-cy="circle"]').eq(1).contains('1');
    cy.get('[data-cy="circle"]').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(1).contains('1');
    cy.get('[data-cy="circle"]').eq(2).contains('2');
    cy.get('[data-cy="circle"]').eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(2).contains('2');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('1');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(0).contains('0');
    cy.get('[data-cy="circle"]').eq(1).contains('1');
    cy.get('[data-cy="circle"]').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(1).contains('1');
    cy.get('[data-cy="circle"]').eq(2).contains('2');
    cy.get('[data-cy="circle"]').eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(2).contains('2');
    cy.get('[data-cy="circle"]').eq(3).contains('3');
    cy.get('[data-cy="circle"]').eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(3).contains('3');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('1');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(0).contains('0');
    cy.get('[data-cy="circle"]').eq(1).contains('1');
    cy.get('[data-cy="circle"]').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(1).contains('1');
    cy.get('[data-cy="circle"]').eq(2).contains('2');
    cy.get('[data-cy="circle"]').eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(2).contains('2');
    cy.get('[data-cy="circle"]').eq(3).contains('3');
    cy.get('[data-cy="circle"]').eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(3).contains('3');
    cy.get('[data-cy="circle"]').eq(4).contains('5');
    cy.get('[data-cy="circle"]').eq(4).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(4).contains('4');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="circle"]').eq(0).contains('1');
    cy.get('[data-cy="circle"]').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(0).contains('0');
    cy.get('[data-cy="circle"]').eq(1).contains('1');
    cy.get('[data-cy="circle"]').eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(1).contains('1');
    cy.get('[data-cy="circle"]').eq(2).contains('2');
    cy.get('[data-cy="circle"]').eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(2).contains('2');
    cy.get('[data-cy="circle"]').eq(3).contains('3');
    cy.get('[data-cy="circle"]').eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(3).contains('3');
    cy.get('[data-cy="circle"]').eq(4).contains('5');
    cy.get('[data-cy="circle"]').eq(4).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(4).contains('4');
    cy.get('[data-cy="circle"]').eq(5).contains('8');
    cy.get('[data-cy="circle"]').eq(5).should('have.css', 'border-color', 'rgb(0, 50, 255)');
    cy.get('[data-cy="index"]').eq(5).contains('5');

    cy.get("@start_button").get('[data-cy="loader"]').should('not.exist');
    cy.get('input').should('be.not.disabled');
  });

}); 
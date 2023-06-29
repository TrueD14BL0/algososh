import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { BORDER_DEFAULT, CIRCLE_BORDER_SELECTOR, CIRCLE_ELEMENT_SELECTOR, CIRCLE_INDEX_SELECTOR, CIRCLE_LETTER_SELECTOR, LOADER_SELECTOR } from '../constants/cy-constants';

const resultArr = [1, 1, 2, 3, 5, 8];

const checkElements = (cy) => {
  cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index)=>{
    cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('have.text', resultArr[index]);
    cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
    cy.wrap(circle).find(CIRCLE_INDEX_SELECTOR).should('have.text', index);
  });
}

describe('page open correctly', function() {
  beforeEach(function() {
    cy.visit('/fibonacci');
  });

  it('should string page', function() {
    cy.contains('Последовательность Фибоначчи');
  });

  //https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

  it('should button disabled while input empty', function() {
    cy.get("button").eq(1).should('be.disabled');
    cy.get('input').should('be.empty');
  });

  it('animation test', function() {
    cy.get('input').type(resultArr.length-1);
    cy.get("button").eq(1).should('be.not.disabled').as('start_button');
    cy.get("@start_button").click();
    cy.get("@start_button").get(LOADER_SELECTOR).should('exist');
    cy.get('input').should('be.disabled');
    resultArr.forEach(()=>{
      cy.wait(SHORT_DELAY_IN_MS);
      checkElements(cy);
    });
    cy.get("@start_button").get(LOADER_SELECTOR).should('not.exist');
    cy.get('input').should('be.not.disabled');
  });

}); 
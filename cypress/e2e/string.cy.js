import { DELAY_IN_MS } from '../../src/constants/delays'
import { BORDER_CHANGING, BORDER_DEFAULT, BORDER_MODIFIED, CIRCLE_BORDER_SELECTOR, CIRCLE_ELEMENT_SELECTOR, CIRCLE_LETTER_SELECTOR, LOADER_SELECTOR } from '../constants/cy-constants';

const QTY_STEP = 5;

const step1 = [
  {value: 'h', border: BORDER_DEFAULT},
  {value: 'e', border: BORDER_DEFAULT},
  {value: 'l', border: BORDER_DEFAULT},
  {value: 'l', border: BORDER_DEFAULT},
  {value: 'o', border: BORDER_DEFAULT},
];
const step2 = [
  {value: 'h', border: BORDER_CHANGING},
  {value: 'e', border: BORDER_DEFAULT},
  {value: 'l', border: BORDER_DEFAULT},
  {value: 'l', border: BORDER_DEFAULT},
  {value: 'o', border: BORDER_CHANGING},
];
const step3 = [
  {value: 'o', border: BORDER_MODIFIED},
  {value: 'e', border: BORDER_CHANGING},
  {value: 'l', border: BORDER_DEFAULT},
  {value: 'l', border: BORDER_CHANGING},
  {value: 'h', border: BORDER_MODIFIED},
];
const step4 = [
  {value: 'o', border: BORDER_MODIFIED},
  {value: 'l', border: BORDER_MODIFIED},
  {value: 'l', border: BORDER_CHANGING},
  {value: 'e', border: BORDER_MODIFIED},
  {value: 'h', border: BORDER_MODIFIED},
];
const step5 = [
  {value: 'o', border: BORDER_MODIFIED},
  {value: 'l', border: BORDER_MODIFIED},
  {value: 'l', border: BORDER_MODIFIED},
  {value: 'e', border: BORDER_MODIFIED},
  {value: 'h', border: BORDER_MODIFIED},
];

const getResultArr = (step) => {
  switch (step) {
    case 0:
      return step1;
    case 1:
      return step2;
    case 2:
      return step3;
    case 3:
      return step4;
    case 4:
      return step5;
  }
}

describe('page open correctly', function() {
  beforeEach(function() {
    cy.visit('/recursion');
  });

  it('should string page', function() {
    cy.contains('Строка');
  });

  //https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

  it('should button disabled while input empty', function() {
    cy.get("button").eq(1).should('be.disabled');
    cy.get('input').should('be.empty');
  });

  it('animation test', function() {
    cy.get('input').type('hello');
    cy.get("button").eq(1).should('be.not.disabled').as('start_button');
    cy.get("@start_button").click();
    cy.get("@start_button").get(LOADER_SELECTOR).should('exist');
    cy.get('input').should('be.disabled');
    for (let i = 0; i < QTY_STEP; i++) {
      cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index)=>{
        cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('have.text', getResultArr(i)[index].value);
        cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', getResultArr(i)[index].border);
      });
      cy.wait(DELAY_IN_MS);
    }
    cy.get("@start_button").get(LOADER_SELECTOR).should('not.exist');
    cy.get('input').should('be.not.disabled');
  });

}); 
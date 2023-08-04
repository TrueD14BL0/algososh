import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { BORDER_CHANGING, BORDER_DEFAULT, CIRCLE_BORDER_SELECTOR, CIRCLE_ELEMENT_SELECTOR, CIRCLE_HEAD_SELECTOR, CIRCLE_LETTER_SELECTOR, CIRCLE_TAIL_SELECTOR, LOADER_SELECTOR } from "../constants/cy-constants";

describe('page open correctly', function() {
  beforeEach(function() {
    cy.visit('/queue');
  });

  it('should be queue page', function() {
    cy.contains('Очередь');
  });

  it('should button disabled while input empty', function() {
    cy.get('button').eq(1).should('be.disabled');
    cy.get('input').should('be.empty');
  });
  
  it('should add element', function() {
    for (let i = 0; i < 5; i++) {
      cy.get('input').type(i);
      cy.get('button').eq(1).should('be.not.disabled').as('add_button');
      cy.get('@add_button').click();
      cy.get('@add_button').get(LOADER_SELECTOR).should('exist');
      cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index, collection)=>{
        if(index===i){
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
        }else{
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
          if(index<i){
            cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.text', index);
          }
        }
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_HEAD_SELECTOR).should('exist').and('have.text', 'head');
      cy.get(CIRCLE_ELEMENT_SELECTOR).eq(i).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
      cy.get(CIRCLE_ELEMENT_SELECTOR).eq(i).find(CIRCLE_TAIL_SELECTOR).should('exist').and('have.text', 'tail');
    }
  });

  it('should del element', function() {

    const lastIndexAddingElements = 4;

    for (let i = 0; i <= lastIndexAddingElements; i++) {
      cy.get('input').type(i);
      cy.get('button').eq(1).should('be.not.disabled').as('add_button');
      cy.get('@add_button').click();
      cy.wait(SHORT_DELAY_IN_MS);
    }

    for (let i = 0; i < 3; i++) {
      cy.get('button').eq(2).should('be.not.disabled').as('del_button');
      cy.get('@del_button').click();
      cy.get('@del_button').get(LOADER_SELECTOR).should('exist');
      cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index, collection)=>{
        if(index===i){
          cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).and('have.text', 'head');
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
        }else{
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
        }
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE_ELEMENT_SELECTOR).eq(i).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
      cy.get(CIRCLE_ELEMENT_SELECTOR).eq(i).find(CIRCLE_HEAD_SELECTOR).should('be.empty');
      cy.get(CIRCLE_ELEMENT_SELECTOR).eq(i+1).find(CIRCLE_HEAD_SELECTOR).should('have.text', 'head');
    }

  });

  it('should clear queue', function() {
    const lastIndexAddingElements = 4;
    for (let i = 0; i <= lastIndexAddingElements; i++) {
      cy.get('input').type(i);
      cy.get('button').eq(1).should('be.not.disabled').as('add_button');
      cy.get('@add_button').click();
      cy.wait(SHORT_DELAY_IN_MS);
    }

    cy.get('button').eq(3).should('be.not.disabled').as('clear_button');
    cy.get('@clear_button').click();
    cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle)=>{
      cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('be.empty');
      cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).should('be.empty');
      cy.wrap(circle).find(CIRCLE_TAIL_SELECTOR).should('be.empty');
    });
  });

});
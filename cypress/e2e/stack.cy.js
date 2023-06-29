import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { BORDER_CHANGING, BORDER_DEFAULT, CIRCLE_BORDER_SELECTOR, CIRCLE_ELEMENT_SELECTOR, CIRCLE_HEAD_SELECTOR, CIRCLE_INDEX_SELECTOR, CIRCLE_LETTER_SELECTOR, LOADER_SELECTOR } from "../constants/cy-constants";

describe('page open correctly', function() {
  beforeEach(function() {
    cy.visit('/stack');
  });

  it('should be stack page', function() {
    cy.contains('Стек');
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
      cy.get("@add_button").get(LOADER_SELECTOR).should('exist');
      cy.get(CIRCLE_ELEMENT_SELECTOR).should('have.length', i+1);
      cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index, collection)=>{
        if(index<collection.length-1){
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
          cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).should('be.empty');
        }else{
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
          cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).and('have.text', 'top');
        }
        cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('have.text', index);
        cy.wrap(circle).find(CIRCLE_INDEX_SELECTOR).should('have.text', index);
      });
      cy.wait(SHORT_DELAY_IN_MS);
    }
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
    cy.get("@add_button").get(LOADER_SELECTOR).should('not.exist');
  });

  it('should del element', function() {
    for (let i = 0; i < 5; i++) {
      cy.get('input').type(i);
      cy.get('button').eq(1).should('be.not.disabled').as('add_button');
      cy.get('@add_button').click();
      cy.wait(SHORT_DELAY_IN_MS);
    }
    for (let i = 0; i < 2; i++) {
      cy.get('button').eq(2).should('be.not.disabled').as('del_button');
      cy.get('@del_button').click();
      cy.get("@del_button").get(LOADER_SELECTOR).should('exist');
      cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index, collection)=>{
        if(index<collection.length-1){
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
          cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).should('be.empty');
        }else{
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
          cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).and('have.text', 'top');
        }
        cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('have.text', index);
        cy.wrap(circle).find(CIRCLE_INDEX_SELECTOR).should('have.text', index);
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index, collection)=>{
        if(index<collection.length-1){
          cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).should('be.empty');
        }else{
          cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).and('have.text', 'top');
        }
        cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
        cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('have.text', index);
        cy.wrap(circle).find(CIRCLE_INDEX_SELECTOR).should('have.text', index);
      });
      cy.get("@del_button").get(LOADER_SELECTOR).should('not.exist');
    }
  });

  it('should clear stack', function() {
    for (let i = 0; i < 5; i++) {
      cy.get('input').type(i);
      cy.get('button').eq(1).should('be.not.disabled').as('add_button');
      cy.get('@add_button').click();
      cy.wait(SHORT_DELAY_IN_MS);
    }
    cy.get('button').eq(3).should('be.not.disabled').as('clear_button');
    cy.get('@clear_button').click();
    cy.get(CIRCLE_ELEMENT_SELECTOR).should('have.length', 0);
  });
});
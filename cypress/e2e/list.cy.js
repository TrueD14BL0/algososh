import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { BORDER_CHANGING, BORDER_DEFAULT, BORDER_MODIFIED, CIRCLE_BORDER_SELECTOR, CIRCLE_ELEMENT_SELECTOR, CIRCLE_HEAD_SELECTOR, CIRCLE_INDEX_SELECTOR, CIRCLE_LETTER_SELECTOR, CIRCLE_TAIL_SELECTOR, LOADER_SELECTOR } from "../constants/cy-constants";

describe('page open correctly', function() {
  beforeEach(function() {
    cy.visit('/list');
  });

  it('should string page', function() {
    cy.contains('Связный список');
  });

  it('should button disabled while input empty', function() {
    cy.get('input').eq(0).should('be.empty');
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(5).should('be.disabled');
    cy.get('button').eq(6).should('be.disabled');
  });

  it('should index button disabled while index input empty', function() {
    cy.get('input').eq(0).type('1');
    cy.get('input').eq(1).should('be.empty');
    cy.get('button').eq(1).should('not.be.disabled');
    cy.get('button').eq(2).should('not.be.disabled');
    cy.get('button').eq(5).should('be.disabled');
    cy.get('button').eq(6).should('be.disabled');
  });
  
  it('should fill in the initial data correctly ', function() {
    cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index, collection)=>{
      cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
      cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('not.be.empty');
      cy.wrap(circle).find(CIRCLE_INDEX_SELECTOR).should('have.text', index);
      if(index>0&&index<collection.length-1){
        cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).should('be.empty');
        cy.wrap(circle).find(CIRCLE_TAIL_SELECTOR).should('be.empty');
      }
    })
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().get(CIRCLE_HEAD_SELECTOR).should('have.text', 'head');
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().get(CIRCLE_TAIL_SELECTOR).should('have.text', 'tail');
  });

  it('should add element to head correctly ', function() {
    cy.get('input').eq(0).type('666');
    cy.get('button').eq(1).should('not.be.disabled').as('add_to_head_btn');
    cy.get('@add_to_head_btn').click();
    cy.get('@add_to_head_btn').get(LOADER_SELECTOR).should('exist');
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_HEAD_SELECTOR).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_HEAD_SELECTOR).find(CIRCLE_LETTER_SELECTOR).should('have.text', '666');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_MODIFIED);
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_HEAD_SELECTOR).should('have.text', 'head');
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_LETTER_SELECTOR).should('have.text', '666');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_LETTER_SELECTOR).should('have.text', '666');
    cy.get('@add_to_head_btn').get(LOADER_SELECTOR).should('not.exist');
  });

  it('should add element to tail correctly ', function() {
    cy.get('input').eq(0).type('666');
    cy.get('button').eq(2).should('not.be.disabled').as('add_to_tail_btn');
    cy.get('@add_to_tail_btn').click();
    cy.get('@add_to_tail_btn').get(LOADER_SELECTOR).should('exist');
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_LETTER_SELECTOR).should('have.text', '666');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_MODIFIED);
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_HEAD_SELECTOR).should('be.empty');
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_TAIL_SELECTOR).should('have.text', 'tail');
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_LETTER_SELECTOR).should('have.text', '666');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_LETTER_SELECTOR).should('have.text', '666');
    cy.get('@add_to_tail_btn').get(LOADER_SELECTOR).should('not.exist');
  });

  it('should del element from head correctly ', function() {
    cy.get('button').eq(3).should('not.be.disabled').as('del_from_head_btn');
    cy.get('@del_from_head_btn').click();
    cy.get('@del_from_head_btn').get(LOADER_SELECTOR).should('exist');
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_LETTER_SELECTOR).should('be.empty');
    cy.get(CIRCLE_ELEMENT_SELECTOR).first().find(CIRCLE_TAIL_SELECTOR).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("body").then($body => {
      if ($body.find(CIRCLE_BORDER_SELECTOR).length > 0) {
        cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index, collection)=>{
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
          cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('not.be.empty');
          cy.wrap(circle).find(CIRCLE_INDEX_SELECTOR).should('have.text', index);
          if(index>0&&index<collection.length-1){
            cy.wrap(circle).find(CIRCLE_HEAD_SELECTOR).should('be.empty');
            cy.wrap(circle).find(CIRCLE_TAIL_SELECTOR).should('be.empty');
          }
        });
        cy.get(CIRCLE_ELEMENT_SELECTOR).first().get(CIRCLE_HEAD_SELECTOR).should('have.text', 'head');
        cy.get(CIRCLE_ELEMENT_SELECTOR).last().get(CIRCLE_TAIL_SELECTOR).should('have.text', 'tail');
      }
    });
    cy.get('@del_from_head_btn').get(LOADER_SELECTOR).should('not.exist');
  });

  it('should del element from tail correctly ', function() {
    cy.get('button').eq(4).should('not.be.disabled').as('del_from_head_btn');
    cy.get('@del_from_head_btn').click();
    cy.get('@del_from_head_btn').get(LOADER_SELECTOR).should('exist');
    cy.get(CIRCLE_ELEMENT_SELECTOR).last().find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
    cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index, collection)=>{
      if(index === collection.length-2){
        cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('be.empty');
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("body").then($body => {
      if ($body.find(CIRCLE_BORDER_SELECTOR).length > 0) {
        cy.get(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
        cy.get(CIRCLE_ELEMENT_SELECTOR).first().get(CIRCLE_HEAD_SELECTOR).should('have.text', 'head');
        cy.get(CIRCLE_ELEMENT_SELECTOR).last().get(CIRCLE_TAIL_SELECTOR).should('have.text', 'tail');
      }
    });
    cy.get('@del_from_head_btn').get(LOADER_SELECTOR).should('not.exist');
  });

  it('should add element to index correctly ', function() {
    cy.get("body").then($body => {
      const indexToAdd = Math.floor($body.find(CIRCLE_ELEMENT_SELECTOR).length / 2);
      cy.get('input').eq(0).type('666');
      cy.get('input').eq(1).type(indexToAdd);
      cy.get('button').eq(5).should('not.be.disabled').as('add_to_index_btn');
      cy.get('@add_to_index_btn').click();
      cy.get('@add_to_index_btn').get(LOADER_SELECTOR).should('exist');
      for (let i = 0; i <= indexToAdd; i++) {
        cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index)=>{
          if(index <= i){
            cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
          }
        });    
        cy.wait(SHORT_DELAY_IN_MS);
      }
      cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index)=>{
        if(index < indexToAdd){
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
        }
        if(index === indexToAdd){
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_MODIFIED);
        }
      });  
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index)=>{
        cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
        if(index === indexToAdd){
          cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('have.text', '666');
        }
      });
      cy.get('@add_to_index_btn').get(LOADER_SELECTOR).should('not.exist');
    });
  });

      
  it('should del element to index correctly ', function() {
    cy.get("body").then($body => {
      const indexToDel = Math.floor($body.find(CIRCLE_ELEMENT_SELECTOR).length / 2);
      const initialLength = $body.find(CIRCLE_ELEMENT_SELECTOR).length;
      cy.get('input').eq(1).type(indexToDel);
      cy.get('button').eq(6).should('not.be.disabled').as('del_from_index_btn');
      cy.get('@del_from_index_btn').click();
      cy.get('@del_from_index_btn').get(LOADER_SELECTOR).should('exist');
      for (let i = 0; i <= indexToDel; i++) {
        cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index)=>{
          if(index <= i){
            cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
          }
        });    
        cy.wait(SHORT_DELAY_IN_MS);
      }
      cy.get(CIRCLE_ELEMENT_SELECTOR).each((circle, index)=>{
        if(index < indexToDel){
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
        }else if(index === indexToDel){
          cy.wrap(circle).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
          cy.wrap(circle).find(CIRCLE_LETTER_SELECTOR).should('be.empty');
          cy.wrap(circle).find(CIRCLE_TAIL_SELECTOR).find(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_CHANGING);
        }
      });  
      cy.wait(SHORT_DELAY_IN_MS);  
      cy.get("body").then($body => {
        if ($body.find(CIRCLE_BORDER_SELECTOR).length > 0) {
          cy.get(CIRCLE_BORDER_SELECTOR).should('have.length', initialLength-1);
          cy.get(CIRCLE_BORDER_SELECTOR).should('have.css', 'border-color', BORDER_DEFAULT);
          cy.get(CIRCLE_ELEMENT_SELECTOR).first().get(CIRCLE_HEAD_SELECTOR).should('have.text', 'head');
          cy.get(CIRCLE_ELEMENT_SELECTOR).last().get(CIRCLE_TAIL_SELECTOR).should('have.text', 'tail');
        }
      });
      cy.get('@del_from_index_btn').get(LOADER_SELECTOR).should('not.exist');
    })
  });

})

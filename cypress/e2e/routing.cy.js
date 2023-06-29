describe('app works correctly with routes', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('should open main page', function() {
    cy.contains('МБОУ АЛГОСОШ');
  });

  //https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

  it('should open string reverse page after continue href click', function() {
    cy.get('[data-cy="recursion"]').click();
    cy.contains('Строка');
  });

  it('should open fibonacci page after continue href click', function() {
    cy.get('[data-cy="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('should open sorting page after continue href click', function() {
    cy.get('[data-cy="sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('should open stack page after continue href click', function() {
    cy.get('[data-cy="stack"]').click();
    cy.contains('Стек');
  });
  
  it('should open queue page after continue href click', function() {
    cy.get('[data-cy="queue"]').click();
    cy.contains('Очередь');
  });

  it('should open list page after continue href click', function() {
    cy.get('[data-cy="list"]').click();
    cy.contains('Связный список');
  });

}); 
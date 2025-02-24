describe('Portfolio Website', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the home page', () => {
    cy.get('.hero-text h1').should('be.visible');
    cy.get('.nfc-demo-container').should('exist');
  });

  it('demonstrates NFC interaction', () => {
    cy.get('#nfc-canvas')
      .trigger('mousemove', { clientX: 200, clientY: 200 })
      .wait(500)
      .get('.status-dot')
      .should('have.class', 'active');
  });

  it('shows project details', () => {
    cy.get('.project').first().click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-title').should('not.be.empty');
    cy.get('.close-modal').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('submits contact form', () => {
    cy.get('#contact-form').within(() => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('textarea[name="message"]').type('Test message');
      cy.get('button[type="submit"]').click();
    });
    cy.get('.notification.success').should('be.visible');
  });
}); 
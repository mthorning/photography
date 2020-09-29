describe('gallery', () => {
    
    it('shows gallery', () => {
        cy.visit('/')
        cy.get('a[href="/gallery"]').click()
        cy.get('[data-test="gallery"]').should('exist')
    })

    it('shows fullsize images', () => {
        cy.visit('/gallery')
        cy.get('[data-test="thumbnail"]').first().click()
        cy.get('[data-test="lightbox"] img').should('have.attr', 'src').then(firstImg => {
                cy.repeat(() => {
                    cy.get('body').type('{leftarrow}')    
                    cy.get('[data-test="lightbox"] img').should('have.attr', 'src').and('not.eq', firstImg)
                }, 10)
                cy.repeat(() => {
                    cy.get('body').type('{rightarrow}')    
                }, 10)
            cy.get('[data-test="lightbox"] img').should('have.attr', 'src').and('eq', firstImg)
        })
    })

    it('closes fullsize image on escape press', () => {
        cy.visit('/gallery')
        cy.get('[data-test="thumbnail"]').eq(8).click()
        cy.get('[data-test="lightbox"]').should('be.visible')
        cy.get('body').type('{esc}')
        cy.get('[data-test="lightbox"]').should('not.be.visible')
        cy.get('[data-test="gallery"]').should('exist')
    })

});

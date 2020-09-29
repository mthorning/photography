describe('image page', () => {
    let pageData

    before(() => {
        cy.visit('/gallery')
        cy.get('[data-test="thumbnail"]').first().click()
        cy.repeat(() => cy.get('body').type('{leftarrow}'), 15)
        cy.get('[data-test="lightbox"] img').then($el => {
            const src = $el.attr('src').split('/').slice(-1)[0]
            cy.request(`localhost:3000/image/${src.replace('jpg', 'json')}`).then(res => {
            pageData = res.body
            })
            $el.click()
        })
    })

    it('displays title', () => {
        cy.get('h1').contains(pageData.fileName.substr(9).replace(/_/g, ' '))
    })

    it('shows the image', () => {
        cy.get(`img[src="images/fullsize/${pageData.fileName}.jpg"]`)
    })

    it('shows the meta', () => {
        const { apperture, shutter, iso, focalLength } = pageData.meta
        const info = `f${apperture} | ${shutter}sec | ISO ${iso} | ${focalLength}mm`
        cy.get('p').contains(info)
    })

    it('shows description', () => {
        cy.get('p').contains(pageData.meta.description)
    })

    it('displays purchase panel', () => {
        cy.get('[data-test="purchasePanel"]')
            .should('exist')
            .and('be.visible')

        cy.get('[data-test="purchasePanel"] td').should('have.length.greaterThan', 1)
        
        cy.get('.paypal-buttons').should('exist').and('be.visible')
        cy.get('[data-test="printInfo"]').should('exist').and('be.visible')
    })

    // it('shows image fullsize on click')
    // it('goes to the next image')
    // it('goes to the previous image')
})

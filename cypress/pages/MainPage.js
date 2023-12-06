class MainPage {

    // web elements with their locators
    webElements = {
        dropdownJobArea: () => cy.get('.selection').eq(0),
        dropdownSeniority: () => cy.get('.selection').eq(1),
        dropdownEnglishLevel: () => cy.get('.selection').eq(2),
        visibleDropdownValues: () => cy.get('.select2-results__option'),
        searchInput: () => cy.get('[name="search"]'),
        jobBlocks: () => cy.get('.block-jobs'),
        jobTitles: () => cy.get('.block-jobs__content .title'),
        getToKnowUs: () => cy.contains('.title', 'Get to know us better'),
        backSpan: () => cy.contains('span', 'Back')
    };

    // page actions
    visit() {
        cy.visit('/');
    }
    navigateToGetToKnowUs() {
        this.webElements.getToKnowUs().click();
    }
    navigateBack() {
        this.webElements.backSpan().click();
    }

    selectJobArea(valuesToSelect) {
        this.#selectDropdownValues(this.webElements.dropdownJobArea, valuesToSelect);
    }

    selectSeniority(valuesToSelect) {
        this.#selectDropdownValues(this.webElements.dropdownSeniority, valuesToSelect);
    }

    selectEnglishLevel(valuesToSelect) {
        this.#selectDropdownValues(this.webElements.dropdownEnglishLevel, valuesToSelect);
    }

    search(valueToSearch) {
        this.webElements.searchInput().type(valueToSearch + "{enter}");
    }

    #selectDropdownValues(dropdownToClick, valuesToSelect) {
        for (let value of valuesToSelect) {
            dropdownToClick().click();

            cy.intercept({
                method: 'GET',
                url: '**/jobs/**'
            }).as('searchResults');

            this.webElements.visibleDropdownValues().contains(value).click();

            // Wait for response.status to be 200
            cy.wait('@searchResults').its('response.statusCode').should('equal', 200)
        }
    }

    // page validations
    validateLength(expectedLength) {
        this.webElements.jobBlocks().should('have.length', expectedLength);
    }
    validateJobTitles(expectedTitles) {
        this.webElements.jobTitles().each(($dropdownElement) => {
            cy.wrap($dropdownElement) // wrap this element to use cypress commands on it
                .invoke('text')
                .should('be.oneOf', expectedTitles);
        });
    }
    validateJobTitlesToContainCaseInsensitiveString(value) {
        this.webElements.jobTitles().each(($dropdownElement) => {
            expect($dropdownElement.text().toLowerCase()).to.contain(value.toLowerCase());
        });
    }
}
export default MainPage;
import MainPage from '../pages/MainPage';

describe('Search Functionality', () => {

  it('should display expected jobs for a valid search query with all possible fields', () => {
    cy.fixture('searchDataSets').then((testdata) => {
      for (const data of Object.values(testdata)) {

        const mainPage = new MainPage();

        mainPage.visit();

        mainPage.selectJobArea(data.jobAreas);
        mainPage.selectSeniority(data.seniorities);
        mainPage.selectEnglishLevel(data.englishLevels);
        mainPage.search(data.keywords);

        mainPage.validateLength(data.results.length);
        mainPage.validateJobTitles(data.results);
      }
    });
  })
  it('should retain search results after navigating', () => {
    cy.fixture('searchDataSets').then((testdata) => {
      const data = Object.values(testdata)[0];

      const mainPage = new MainPage();

      mainPage.visit();

      mainPage.selectJobArea(data.jobAreas);
      mainPage.selectSeniority(data.seniorities);
      mainPage.selectEnglishLevel(data.englishLevels);
      mainPage.search(data.keywords);

      mainPage.navigateToGetToKnowUs();
      mainPage.navigateBack();

      mainPage.validateLength(data.results.length);
      mainPage.validateJobTitles(data.results);
    });
  })

  it('should return jobs that have the entered keyword in the title (case insensitive)', () => {
    cy.fixture('searchValues').then((testData) => {
      for (const data of Object.values(testData)) {
        const mainPage = new MainPage();
        mainPage.visit();

        mainPage.search(data.searchValue);

        mainPage.validateJobTitlesToContainCaseInsensitiveString(data.searchValue);
      }
    });
  })
})
import MainPage from '../pages/MainPage';

describe('Search Functionality', () => {
  let mainPage;

  beforeEach(() => {
    mainPage = new MainPage();
  });

  it('should display expected jobs for a valid search query with all possible fields', () => {
    cy.fixture('searchDataSets').then((searchData) => {
      for (const data of Object.values(searchData)) {
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
    cy.fixture('searchDataSets').then((searchData) => {
      const data = Object.values(searchData)[0];
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
    cy.fixture('searchValues').then((searchData) => {
      for (const data of Object.values(searchData)) {
        mainPage.visit();
        mainPage.search(data.searchValue);

        mainPage.validateJobTitlesToContainCaseInsensitiveString(data.searchValue);
      }
    });
  })
})
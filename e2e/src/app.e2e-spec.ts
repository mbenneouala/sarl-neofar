import { AppPage } from './app.po';
import { protractor, element, by, browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Money Manager');
  });

  it('should display application name', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Money Manager');
  });

});

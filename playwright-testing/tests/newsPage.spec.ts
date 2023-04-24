import { test, expect, Page } from '@playwright/test';
import { NewsPage } from '../pages/newsPage';


test.describe('Automation testing of IRIS page', () => {

  let page: Page;
  let newsPage: NewsPage

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    newsPage = new NewsPage(page);

  })

  test('Testing of News page', async () => {
    await test.step('Navigation to contact group', async () => {
      await page.goto("https://osa-web.t-cg.co.uk/");
      await newsPage.navigatingToGroup();
    })

    await test.step('Test for headring contents', async () => {
     // await page.goto("https://osa-web.t-cg.co.uk/qatest");
      let data = await newsPage.expectingHeadings();
      expect(data.count).toBe(2);
      expect(data.headingText).toContain('News')
      expect(data.allReadText).toContain('Mark All As Read')

    })

    await test.step('testing news container', async () => {
      let newsContainerData= await newsPage.expectingNewsList();
      expect(newsContainerData.isNewListContainer).toBe(true);
      expect(newsContainerData.noOfNewsItems).toBeGreaterThanOrEqual(5);
    })
    

  })


})



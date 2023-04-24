import { test, Locator, expect, Page } from "@playwright/test";


export class NewsPage {

    page: Page;
    searchText: Locator;
    searchButton: Locator;
    contactGroup: Locator;
    loadingText: Locator;
    h1Text: Locator;
    markAllAsRead: Locator;
    newsList: Locator;
    newsItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchText = this.page.locator("#main");
        this.searchButton = this.page.getByTestId("searchPostcodeButton")
        this.contactGroup = this.page.locator('[data-testid="activeIcon"]').nth(15)
        this.loadingText = this.page.getByTestId('finishedLoadingText');
        this.h1Text = this.page.locator('.h2');
        this.markAllAsRead = this.page.locator(".col-8");
        this.newsList = this.page.locator(".pl-0")
        this.newsItems = this.page.getByTestId("loadRecentNewsItemFromNewsList");
    }

    /**
     *  navigating to desired classes as mentioned (class group)
     */
    async navigatingToGroup() {
        await this.searchText.fill("B16 8PE");
        await this.searchButton.click();
        await this.contactGroup.click();


    }

    /**
     * expecting the datas of header titles and count of loaders
     * @returns - count of loaders and text of headers
     */
    async expectingHeadings(): Promise<any> {
        await this.page.waitForTimeout(5000)
        
        let Count = await this.loadingText.count();
        let heading_text = await this.h1Text.innerText();
        let all_read_text = await this.markAllAsRead.innerText();
        return { count: Count, headingText: heading_text, allReadText: all_read_text }
    }

    /**
     * expecting the news list count and presence of newsList container
     * @returns - count and boolean value of newslistcontainer
     */
    async expectingNewsList() {

        let is_news_list_container = await this.newsList.isVisible();
        let no_of_items = await this.newsItems.count();
        return { isNewListContainer: is_news_list_container, noOfNewsItems: no_of_items }

    }

}
import { BrowserContext, Page } from "@playwright/test";
import { PlaywrightWrapper } from "../helpers/playwright";

export class SalesforceHomePage extends PlaywrightWrapper {
    private readonly selectors = {
        applauncherIcon: ".slds-icon-waffle",
        viewAllBtn: `//button[text()="View All"]`,
        appItemSearchField: "one-app-launcher-modal input.slds-input",
        appOrItem: (appName: string) => `//mark[text()='${appName}']`,
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async appLauncher() {
        await this.validateElementVisibility(this.selectors.applauncherIcon, "App Launcher");
        await this.click(this.selectors.applauncherIcon, "App Launcher", "Button");
        return this;
    }

    public async viewAll() {
        await this.waitSelector(this.selectors.viewAllBtn);
        await this.page.locator(this.selectors.viewAllBtn).highlight();
        await this.click(this.selectors.viewAllBtn, "View All", "Button");
    }

    public async searchApp(value: string) {
        await this.type(this.selectors.appItemSearchField, "Search Field", value);
    }

    public async selectApp(data: string) {
        await this.click(this.selectors.appOrItem(data), data, "Button");
    }

    public async clickMobilePublisher() {
        await this.childTab("//span[text()='Learn More']");
    }
}

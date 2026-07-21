import { PlaywrightWrapper } from '../helpers/playwright';
import { BrowserContext, Page } from "@playwright/test";

export class SalesforceMobilePublisherPage extends PlaywrightWrapper {
    private readonly selectors = {
        confirmBtn: "//button[text()='Confirm']",
        products: "span:text-is('Products')",
        agentforce: "span:text-is('Agentforce')",
        pricing: "span:text-is('Pricing')",
        agentforcePricing: "span:text-is('Agentforce Pricing')",
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async clickConfirmButton(): Promise<any> {
        this.switchToChildPage(1);
        await this.click(this.selectors.confirmBtn, "Confirm", "Button");
    }

    public async clickProduct(): Promise<any> {
        await this.click(this.selectors.products, "Product", "Button");
    }

    public async clickAgentforce() {
        await this.click(this.selectors.agentforce, "Agentforce", "Link");
    }

    public async hoverPricing() {
        await this.mouseHover(this.selectors.pricing, "Pricing");
        await this.click(this.selectors.agentforcePricing, "Agent Pricing", "Button");
    }
}

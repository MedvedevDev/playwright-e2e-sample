import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
    this.mobileBurgerMenuBtn = page.locator('[data-qa="burger-button"]');
  }

  getBasketCount = async () => {
    const text = await this.basketCounter.innerText();
    return parseInt(text);
  };

  goToCheckout = async () => {
    // open the burger menu if it`s mobile viewport
    if (!isDesktopViewport(this.page)) {
      await this.mobileBurgerMenuBtn.waitFor();
      await this.mobileBurgerMenuBtn.click();
    }
    await this.checkoutLink.click();
    await this.page.waitForURL("/basket");
  };
}

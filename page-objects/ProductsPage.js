import { expect } from "@playwright/test";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addToBasketButtons = page.locator('[data-qa="product-button"]'); // array
  }

  visitHomePage = async () => {
    await this.page.goto("/");
  };

  addProductsToBasket = async (index) => {
    const addButton = this.addToBasketButtons.nth(index);

    await addButton.waitFor();
    await expect(addButton).toHaveText("Add to Basket");

    await addButton.click();
    await expect(addButton).toHaveText("Remove from Basket");
  };
}

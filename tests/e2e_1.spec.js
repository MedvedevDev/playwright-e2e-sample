import { test, expect } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";

test.only("New user full end-to-end", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visitHomePage();

  await productsPage.addProductsToBasket(0);
  await productsPage.addProductsToBasket(1);
});

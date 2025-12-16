import { test, expect } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { CheckoutPage } from "../page-objects/CheckoutPage";

test.only("New user full end-to-end", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visitHomePage();
  await productsPage.addProductsToBasket(0);
  await productsPage.addProductsToBasket(1);

  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new CheckoutPage(page);
  await checkout.removeCheapestProduct();
});

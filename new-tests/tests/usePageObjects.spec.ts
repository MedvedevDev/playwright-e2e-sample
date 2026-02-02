import { expect, test } from "@playwright/test";
import { NavigationPage } from "../page-objects/NavigationPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test("navigation across all pages", async ({ page }) => {
  const navigation = new NavigationPage(page);
  await navigation.formLayoutsPage();
  await navigation.datepickerPage();
  await navigation.smartTablePage();
  await navigation.toastrPage();
  await navigation.tooltipPage();
});

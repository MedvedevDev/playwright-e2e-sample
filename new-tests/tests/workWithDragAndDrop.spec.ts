import { expect, test } from "@playwright/test";

test.skip("drag and drop within iFrame", async ({ page }) => {
  await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
  // locata iFrame
  const iframeContainer = page.frameLocator(
    '[rel-title="Photo Manager"] iframe',
  );
  await iframeContainer
    .locator("li", { hasText: "High Tatras 2" })
    .dragTo(iframeContainer.locator("#trash"));

  //more procise control by mouse
  await iframeContainer.locator("li", { hasText: "High Tatras 4" }).hover();
  await page.mouse.down();
  await iframeContainer.locator("#trash").hover();
  await page.mouse.up();
});

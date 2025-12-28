import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { addCookieContext } from "../utils/addCookieContext";
import { admin } from "../data/loginDetails";

test("My account using cookie injection and mocking network request", async ({
  page,
}) => {
  // Make a request to get login token
  const token = await getLoginToken(admin.username, admin.password);

  // MOCKING ERROR
  // ** any url what match /api/user . doesnt matter what comes infront and after
  // await page.route("**/api/user**", async (route, request) => {
  //   route.fulfill({
  //     status: 500,
  //     contentType: "application/json",
  //     body: JSON.stringify({ message: "ERROR FROM MOCKING" }),
  //   });
  // });

  // MOCKING SOME ADRESS DATA
  await page.route("**/api/address**", async (route, request) => {
    const data = await route.fetch();
    const json = await data.json();

    json[0].firstName = "MOCKED NAME";
    json[0].street = "MOCKED STREET";
    await route.fulfill({
      body: JSON.stringify(json),
    });
  });

  // Inject the login token into the browser
  const myAccount = new MyAccountPage(page);
  await myAccount.visit();

  await page.evaluate(
    ([tokenInsideBrowserCode]) => {
      document.cookie = "token=" + tokenInsideBrowserCode;
    },
    [token]
  );
  // await addCookieContext(page, token); // set cookie using context.addCookies

  await myAccount.visit();
  await myAccount.waitForPageHeading();
});

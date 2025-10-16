import { test, expect, type Page } from '@playwright/test';

const checkReferrer = async (page: Page, referrer: string) => {
  await page.route('**/api/stat', (route) => {
    const request = route.request();
    const postData = request.postData();

    const payload = JSON.parse(postData!) as { referrer: string };
    expect(payload.referrer).toBe(referrer);

    route.continue();
  });
};

test('레퍼러 값 테스트', async ({ page }) => {
  let idx = 22;

  await page.goto(`/dynamic/${idx}`);
  checkReferrer(page, '');

  await page.getByRole('link', { name: /다음/ }).click();
  checkReferrer(page, 'http://localhost:3000/dynamic/22');
  await expect(page).toHaveURL('http://localhost:3000/dynamic/23');

  await page.getByRole('link', { name: /다음/ }).click();
  checkReferrer(page, 'http://localhost:3000/dynamic/23');
  await expect(page).toHaveURL('http://localhost:3000/dynamic/24');

  await page.getByRole('link', { name: /다음/ }).click();
  checkReferrer(page, 'http://localhost:3000/dynamic/24');
  await expect(page).toHaveURL('http://localhost:3000/dynamic/25');

  await page.getByRole('link', { name: /이전/ }).click();
  checkReferrer(page, 'http://localhost:3000/dynamic/25');
  await expect(page).toHaveURL('http://localhost:3000/dynamic/24');

  await page.getByRole('link', { name: /이전/ }).click();
  checkReferrer(page, 'http://localhost:3000/dynamic/24');
  await expect(page).toHaveURL('http://localhost:3000/dynamic/23');

  checkReferrer(page, 'http://localhost:3000/dynamic/24');
  await page.getByRole('button', { name: /클릭 통계 버튼/ }).click();
});

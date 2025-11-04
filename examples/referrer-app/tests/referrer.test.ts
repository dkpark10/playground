import { test, expect, type Page } from '@playwright/test';

const checkReferer = async (page: Page, referer: string) => {
  await page.route('**/api/stat', (route) => {
    const request = route.request();
    const postData = request.postData();

    const payload = JSON.parse(postData!) as { referer: string };
    expect(payload.referer).toBe(referer);

    route.continue();
  });
};

test('레퍼러 테스트', async ({ page }) => {
  checkReferer(page, '');
  await page.goto('/dynamic/22');

  checkReferer(page, 'http://localhost:3000/dynamic/22');
  await page.getByRole('link', { name: /다음 페이지 이동/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/dynamic/23');

  checkReferer(page, 'http://localhost:3000/dynamic/23');
  await page.getByRole('link', { name: /다음 페이지 이동/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/dynamic/24');

  checkReferer(page, 'http://localhost:3000/dynamic/24');
  await page.getByRole('link', { name: /다음 페이지 이동/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/dynamic/25');

  checkReferer(page, 'http://localhost:3000/dynamic/25');
  await page.getByRole('button', { name: /뒤로/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/dynamic/24');

  checkReferer(page, 'http://localhost:3000/dynamic/24');
  await page.getByRole('button', { name: /뒤로/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/dynamic/23');

  checkReferer(page, 'http://localhost:3000/dynamic/23');
  await page.getByRole('button', { name: /앞으로/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/dynamic/24');

  checkReferer(page, 'http://localhost:3000/dynamic/23');
  await page.getByRole('button', { name: /클릭 통계 버튼/ }).click();
});
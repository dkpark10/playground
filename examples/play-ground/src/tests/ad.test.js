import { describe, expect, test, vi } from 'vitest';
import { AlyacAdManager } from '../ad';

const TEST_DELAY = 1_000;

describe.skip('광고 테트스', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('광고 매니저의 초기 상태는 INACTIVE여야 한다.', () => {
    const adManager = new AlyacAdManager(() => {});
    expect(adManager.status).toBe('inActive');
  });

  test('광고 활성화 상태에서 주기적으로 광고를 호출해야 한다.', () => {
    const adRefreshCallback = vi.fn();

    const adManager = new AlyacAdManager(adRefreshCallback);
    vi.spyOn(adManager, 'getAdReloadTime').mockReturnValue(TEST_DELAY);

    adManager.init();
    adManager.reloadActive();
    expect(adManager.status).toBe('active');

    vi.advanceTimersByTime(100);
    expect(adRefreshCallback).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(TEST_DELAY - 100);
    expect(adRefreshCallback).toHaveBeenCalledTimes(1);

    for (let i = 0; i < 10; i++) {
      vi.advanceTimersByTime(TEST_DELAY);
      expect(adRefreshCallback).toHaveBeenCalledTimes(i + 2);
    }
  });

  test('광고 새로고침 후 300ms 경과하고 비활성화 이후 다시 활성화 된다면 700ms 후애 광고 새로고침을 해야 한다.', () => {
    const adRefreshCallback = vi.fn();

    const adManager = new AlyacAdManager(adRefreshCallback);
    vi.spyOn(adManager, 'getAdReloadTime').mockReturnValue(TEST_DELAY);

    adManager.init();
    adManager.reloadActive();

    vi.advanceTimersByTime(TEST_DELAY);
    expect(adRefreshCallback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300);
    adManager.reloadInactive();
    expect(adManager.status).toBe('inActive');

    adManager.reloadActive();
    expect(adManager.status).toBe('active');
    vi.advanceTimersByTime(400);
    expect(adRefreshCallback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300);
    expect(adRefreshCallback).toHaveBeenCalledTimes(2);

    for (let i = 0; i < 10; i++) {
      vi.advanceTimersByTime(TEST_DELAY);
      expect(adRefreshCallback).toHaveBeenCalledTimes(i + 3);
    }
  });

  test('마지막 새로고침이 1시간 전이라면 활성화 이후 그 즉시 새로고침 한다.', () => {
    const adRefreshCallback = vi.fn();

    const adManager = new AlyacAdManager(adRefreshCallback);
    vi.spyOn(adManager, 'getAdReloadTime').mockReturnValue(TEST_DELAY);

    adManager.init();
    adManager.reloadActive();

    vi.advanceTimersByTime(TEST_DELAY);
    expect(adRefreshCallback).toHaveBeenCalledTimes(1);

    adManager.reloadInactive();
    vi.advanceTimersByTime(1000 * 60 * 60);

    adManager.reloadActive();
    vi.advanceTimersByTime(0);
    expect(adRefreshCallback).toHaveBeenCalledTimes(2);

    for (let i = 0; i < 10; i++) {
      vi.advanceTimersByTime(TEST_DELAY);
      expect(adRefreshCallback).toHaveBeenCalledTimes(i + 3);
    }
  });

  test('초기 어떠한 상태변화 없이 비활성화 상태에서 한시간 경과 후 활성화할 시 즉시 새고로침이 되어야 한다.', () => {
    const adRefreshCallback = vi.fn();

    const adManager = new AlyacAdManager(adRefreshCallback);
    vi.spyOn(adManager, 'getAdReloadTime').mockReturnValue(TEST_DELAY);
    vi.advanceTimersByTime(1000 * 60 * 60);
    adManager.reloadActive();
    vi.advanceTimersByTime(0);

    expect(adRefreshCallback).toHaveBeenCalledTimes(1);
  });

  test('상태 변경에 따른 로그함수를 매번 출력해야 한다.', () => {
    const adRefreshCallback = vi.fn();

    const adManager = new AlyacAdManager(adRefreshCallback);
    vi.spyOn(adManager, 'getAdReloadTime').mockReturnValue(TEST_DELAY);

    const logSpy = vi.spyOn(adManager, 'printLogs');

    adManager.reloadActive();
    expect(logSpy).toHaveBeenCalledTimes(1);

    adManager.reloadInactive();
    expect(logSpy).toHaveBeenCalledTimes(2);

    adManager.reloadActive();
    expect(logSpy).toHaveBeenCalledTimes(3);

    adManager.reloadInactive();
    expect(logSpy).toHaveBeenCalledTimes(4);
  });
});

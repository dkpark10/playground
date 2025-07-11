import { describe, expect, test, vi } from 'vitest';

const TEST_DELAY = 1000;

function AlyacAdManager(adRefreshCallback) {
  this.status = 'inActive';

  let timer = null;
  /** @desc 활성화된 시간 */
  let activateTime = null;
  /** @desc 비활성화된 시간 */
  let inActivateTime = null;
  /** @desc 마지막 광로 로드 시간 */
  let lastestReloadTime = new Date().getTime();
  /** @desc 비활성화 상태에서 다음 광고 리프레시 호출까지 남은 시간 */
  let remainingTime = null;

  const maxTime = 20;
  const minTime = 20;

  const ONE_HOUR = 60 * 60 * 1000; // 1시간
  const ONE_MINUTE = 60 * 1000; // 1분

  const emitter = new EventTarget();
  const EVNET_NAME = 'onEndAdRefresh';

  // min ,max 사이 랜덤한 값을 반환
  this.getAdReloadTime = () => {
    return (Math.ceil(Math.random() * maxTime) + minTime) * 1000;
  };
  this.adReloadTimeCycle = null;

  const startSetTimerAd = (delay) => {
    this.adReloadTimeCycle = this.getAdReloadTime();
    const delayOrFallback = delay !== undefined && delay !== null ? delay : this.adReloadTimeCycle;

    /** @desc min ~ max 사이 랜덤한 딜레이로 광고 호출 */
    timer = setTimeout(() => {
      adRefreshCallback();
      lastestReloadTime = new Date().getTime();
      emitter.dispatchEvent(new Event(EVNET_NAME));

      /** @desc delay 변수가 없음 기존 딜레이로 */
    }, delayOrFallback);
  };

  this.init = () => {
    emitter.addEventListener(EVNET_NAME, () => {
      startSetTimerAd();
    });
  };

  this.reloadActive = () => {
    if (this.status === 'active') {
      return;
    }
    this.status = 'active';
    activateTime = new Date().getTime();

    /** @desc 활성화 시 마지막 광고 리로드 시간이 1시간 이후라면 즉시 리로드 */
    if (activateTime - lastestReloadTime >= ONE_HOUR) {
      startSetTimerAd(0);
      this.printLogs();
      return;
    }

    if (remainingTime !== null) {
      startSetTimerAd(remainingTime);
      this.printLogs();
      return;
    }

    startSetTimerAd();
    this.printLogs();
  };

  this.reloadInactive = () => {
    if (this.status === 'inActive') {
      return;
    }
    this.status = 'inActive';
    inActivateTime = new Date().getTime();

    clearTimeout(timer);
    remainingTime = this.adReloadTimeCycle - (inActivateTime - lastestReloadTime);
    this.printLogs();
  };

  this.printLogs = () => {
    console.group('=== AlyacAdManager === time info');
    console.info('현재 상태: ', this.status);
    console.info('새로고침 주기: ', this.adReloadTimeCycle);
    console.info('마지막 새로고침: ', new Date(lastestReloadTime).toString());
    console.info('비활성화시 새로고침 남은시간: ', remainingTime);
    if (remainingTime == 0) {
      console.info('다음 새로고침 시간: ', new Date(lastestReloadTime + this.adReloadTimeCycle).toString());
      console.info(
        '실시간 새로고침 남은시간: ',
        lastestReloadTime + this.adReloadTimeCycle - new Date().getTime()
      );
    } else {
      if (activateTime - lastestReloadTime >= ONE_MINUTE) {
        console.info('=== 바로 새로고침 ===');
      } else {
        console.info('다음 새로고침 시간: ', new Date(activateTime + remainingTime).toString());
        console.info('실시간 새로고침 남은시간: ', activateTime + remainingTime - new Date().getTime());
      }
    }
    console.groupEnd();
  };
}

describe('광고 테트스', () => {
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

  test('광고 활성화 상태에서 주기적으로 광로를 호출해야 한다.', () => {
    const adRefreshCallback = vi.fn();

    const adManager = new AlyacAdManager(adRefreshCallback);
    vi.spyOn(adManager, 'getAdReloadTime').mockReturnValue(TEST_DELAY);

    adManager.init();
    adManager.reloadActive();
    expect(adManager.status).toBe('active');

    vi.advanceTimersByTime(100);
    expect(adRefreshCallback).not.toHaveBeenCalled();

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

export function AlyacAdManager(adRefreshCallback) {
  this.status = 'inActive';

  let timer = null;
  /** @desc 활성화된 시간 */
  let activateTime = null;
  /** @desc 비활성화된 시간 */
  let inActivateTime = new Date().getTime();
  /** @desc 마지막 광로 로드 시간 */
  let lastestReloadTime = new Date().getTime();
  /** @desc 비활성화 상태에서 다음 광고 리프레시 호출까지 남은 시간 */
  let remainingTime = null;

  const maxTime = 5;
  const minTime = 5;
  const REFRESH_LIMIT = 60 * 1000;

  const emitter = new EventTarget();
  const EVNET_NAME = 'onEndAdRefresh';

  // min ,max 사이 랜덤한 값을 반환
  this.getAdReloadTime = () => {
    return (Math.ceil(Math.random() * maxTime) + minTime) * 1000;
  };

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
    if (activateTime - lastestReloadTime >= REFRESH_LIMIT) {
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

    const adReloadTimeCycleLog = !this.adReloadTimeCycle
      ? '활성화 상태가 한번도 되지 않았습니다.'
      : this.adReloadTimeCycle / 1000 + '초';
    console.info('새로고침 주기: ', adReloadTimeCycleLog);

    console.info('마지막 새로고침: ', new Date(lastestReloadTime).toLocaleString());

    if (this.status === 'inActive') {
      const inactiveTimeLog = !this.adReloadTimeCycle
        ? '활성화 상태가 한번도 되지 않았습니다.'
        : (this.adReloadTimeCycle - (inActivateTime - lastestReloadTime)) / 1000 + '초';

      console.info('비활성화시 새로고침 남은시간: ', inactiveTimeLog);
    }

    if (activateTime - lastestReloadTime >= REFRESH_LIMIT) {
      console.info('=== 바로 새로고침 ===');
    }

    if (this.status === 'active') {
      console.info(
        '다음 새로고침 시간: ',
        new Date(lastestReloadTime + this.adReloadTimeCycle).toLocaleString(),
      );

      /** @desc 활성화 시간이 마지막 리로드보다 저 긴 경우 즉 첫 활성화 시점 */
      const realTimeReamainLog =
        activateTime > lastestReloadTime
          ? this.adReloadTimeCycle -
            (inActivateTime - lastestReloadTime) -
            (new Date().getTime() - activateTime)
          : this.adReloadTimeCycle - (new Date().getTime() - lastestReloadTime);

      console.info('실시간 새로고침 남은시간: ', realTimeReamainLog / 1000 + '초');
    }
    console.groupEnd();
  };
}

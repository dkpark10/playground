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

  const maxTime = 4;
  const minTime = 4;

  const REFRESH_LIMIT = 60 * 1000;

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
    if (activateTime - lastestReloadTime >= REFRESH_LIMIT) {
      this.printLogs();
      startSetTimerAd(0);
      return;
    }

    if (remainingTime !== null) {
      this.printLogs();
      startSetTimerAd(remainingTime);
      return;
    }

    this.printLogs();
    startSetTimerAd();
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
    console.info('새로고침 주기: ', !this.adReloadTimeCycle ? '활성화 상태가 한번도 되지 않았습니다.' : (this.adReloadTimeCycle / 1000) + '초');
    console.info('마지막 새로고침: ', new Date(lastestReloadTime).toLocaleString());

    if (this.status === 'inActive') {
      console.info('비활성화시 새로고침 남은시간: ', (this.adReloadTimeCycle - (inActivateTime - lastestReloadTime)) / 1000 + '초');
    }

    if (activateTime - lastestReloadTime >= REFRESH_LIMIT) {
      console.info('=== 바로 새로고침 ===');
    }

    if (this.status === 'active') {
      console.info('다음 새로고침 시간: ', new Date(lastestReloadTime + this.adReloadTimeCycle).toLocaleString());

      const temp1 = this.adReloadTimeCycle - (activateTime - lastestReloadTime);
      const temp2 = temp1 - (new Date().getTime() - activateTime);
      console.info('실시간 새로고침 남은시간: ', temp2 / 1000 + '초');
    }
    console.groupEnd();
  };
}

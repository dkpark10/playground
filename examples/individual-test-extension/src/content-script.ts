import { MSW_ACTIVATE, SAVE_DATA, MSW_LOAD_REWARD_DATA } from './constants';

const injectedScript = document.createElement('script');
injectedScript.id = 'injected';
// 경로는 빌드파일에 manifest.json을 루트로 기준삼음
injectedScript.src = chrome.runtime.getURL('injected.js');
(document.head || document.documentElement).appendChild(injectedScript);

declare global {
  interface Window {
    __MSW_INTERCEPTOR_APPLIED__: boolean;
  }
}

injectedScript.onload = () => {
  chrome.storage.local.get<{ rewardData: any }>(['rewardData'], (result) => {
    if (result.rewardData) {
      console.log('초기 리워드 데이터', result.rewardData);
      window.postMessage({ type: MSW_LOAD_REWARD_DATA, payload: result.rewardData }, '*');
    }
    window.dispatchEvent(new CustomEvent(MSW_ACTIVATE));
  });
};

const isEmpty = (value: any): boolean => {
  if (value === null) return true;
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
};

/** @description 모킹 응답시 데이터 실시간 저장 */
window.addEventListener('message', (event) => {
  if (event.data?.type === SAVE_DATA) {
    const data = JSON.parse(event.data.payload);
    console.log('저장될 리워드 데이터', data);

    if (!isEmpty(data)) {
      chrome.storage.local.set({ rewardData: data });
    }
  }
});

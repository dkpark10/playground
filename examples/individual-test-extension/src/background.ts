import { PAGE_RELOAD } from "@/constants";
import { rewardFakeService } from "@/services/reward";

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === PAGE_RELOAD) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        rewardFakeService.initialize();
        chrome.tabs.reload(tabs[0].id as number);
      }
    });
  }
});

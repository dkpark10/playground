import { PAGE_RELOAD } from "@/constants";
import "./App.css";

export default function App() {
  const onClick = () => {
    chrome.storage.local.set({ rewardData: null }, () => {
      chrome.runtime.sendMessage({ action: PAGE_RELOAD });
    });
  }

  return (
    <div>
      <button onClick={onClick} type="button">
        리워드 수행한 미션 초기화
      </button>
    </div>
  );
}

import { rewardFakeService } from '@/services/reward';
import { BatchInterceptor } from '@mswjs/interceptors';
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest';
import { MSW_ACTIVATE, SAVE_DATA, MSW_LOAD_REWARD_DATA } from './constants';

export const interceptor = new BatchInterceptor({
  name: 'my-interceptor',
  interceptors: [new XMLHttpRequestInterceptor()],
});

window.addEventListener('message', (event) => {
  if (event.data?.type === MSW_LOAD_REWARD_DATA) {
    rewardFakeService.setSavedData(event.data.payload);
  }
});

const parseResponse = (data: any, responseInit?: ResponseInit) => {
  window.postMessage({
    type: SAVE_DATA,
    payload: JSON.stringify(rewardFakeService.getSavedData()),
  });

  return new Response(JSON.stringify(data), {
    ...responseInit,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

window.addEventListener(MSW_ACTIVATE, () => {
  interceptor.apply();

  interceptor.on('request', async ({ request, controller }) => {
    if (/^https?:\/\/example.reward.com/.test(request.url)) {
      /** @description 오늘 미션 반환 */
      if (
        request.method.toLowerCase() === 'get' &&
        /^https?:\/\/example.reward.com\/api\/missions/.test(request.url)
      ) {
        return controller.respondWith(parseResponse(rewardFakeService.getMission(), { status: 200 }));
      }

      if (request.method.toLowerCase() === 'get') {
        /** @description 오늘 유저가 수행한 미션 반환 */
        if (/^https?:\/\/example.reward.com\/api\/user\/missions/.test(request.url)) {
          return controller.respondWith(parseResponse(rewardFakeService.getUserMission(), { status: 200 }));
        }

        /** @description 미션 포인트 적립했는지 */
        if (/^https?:\/\/example.reward.com\/api\/user\/earn/.test(request.url)) {
          const missionId = new URL(request.url).pathname.split('/').slice(-1)[0];
          const result = rewardFakeService.isEarnedMission(Number(missionId));
          return controller.respondWith(parseResponse(result, { status: 201 }));
        }

        /** @description 포인트 반환 */
        if (/^https?:\/\/example.reward.com\/api\/user\/point/.test(request.url)) {
          const result = rewardFakeService.getPoint();
          return controller.respondWith(parseResponse(result, { status: 200 }));
        }
      }

      if (request.method.toLowerCase() === 'post') {
        /** @description 포인트 적립 */
        if (/^https?:\/\/example.reward.com\/api\/user\/point\/save/.test(request.url)) {
          const { missionId, point } = await request.json();
          const result = rewardFakeService.savePoint({
            missionId,
            point,
          });
          return controller.respondWith(parseResponse(result, { status: 201 }));
        }

        /** @description 미션참여 */
        if (/^https?:\/\/example.reward.com\/api\/user\/mission\/join/.test(request.url)) {
          const missionId = new URL(request.url).pathname.split('/').slice(-1)[0];
          const result = rewardFakeService.joinMission(Number(missionId));
          return controller.respondWith(parseResponse(result, { status: 201 }));
        }
      }
    }
  });
});

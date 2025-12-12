const missionListContainer = document.getElementById('mission_list');

function xhrPromise({ method = 'GET', url, body = null, headers = {} }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }

    xhr.onload = () => {
      const result = {
        status: xhr.status,
        headers: xhr.getAllResponseHeaders(),
        data: JSON.parse(xhr.responseText),
      };

      if (xhr.status >= 200 && xhr.status < 300) {
        return resolve(result);
      }
      return reject(result);
    };

    xhr.onerror = () => reject();
    xhr.ontimeout = () => reject();
    xhr.send(body);
  });
}

(async function () {
  // injected 참고
  /**
   * @type {{ missionId: number, url: string, title: string, point: number, missionType: string; }[]}
   */
  const { data: missionList } = await xhrPromise({
    url: 'https://example.reward.com/api/missions',
  });

  /**
   * @type {{ id: number, name: string }[]}
   */
  const { data: userMissionList } = await xhrPromise({
    url: 'https://example.reward.com/api/user/missions',
  });

  missionList.forEach((mission) => {
    const missionStatus = userMissionList.find((userMission) => userMission.id === mission.id);

    const li = document.createElement('li');

    li.innerHTML = `
      <div class="item_container">
        <div>${mission.title}</div>
        <button data-missionid=${mission.missionId}>${missionStatus ? '완료' : '미완료'}</button>
      </div>
    `;

    missionListContainer.appendChild(li);
  });

  missionList.forEach((mission) => {
    const missionStatus = userMissionList.find((userMission) => userMission.id === mission.id);
    // 미션 타입이 뷰이고 미션을 아직 수행하지 않았다면
    if (mission.missionType === 'VIEW' && !missionStatus) {
      const missionUrl = new URL(mission.url);
      if (missionUrl.pathname === window.location.pathname) {
        console.log(123);
      }
    }
  });
})();

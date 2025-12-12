import type { Mission, CommonResponse } from '@/types';
import MissionMock from '@/mocks/mission.json';

class RewardFakeService {
  // @ts-ignore
  private mission: Array<Mission>;

  /** @description 수행중인 미션 리스트 */
  private performedMission: Array<Mission> = [];

  /** @description 적립된 미션 리스트 */
  private accumulatedMission: Array<Mission['missionId']> = [];

  private point = 0;

  constructor() {
    this.mission = MissionMock;
  }

  public initialize() {
    this.performedMission = [];
    this.accumulatedMission = [];
    this.point = 0;
  }

  /** @description 특정 미션을 찾음 순수함수 반환 */
  private findMission(missionId: Mission['missionId']) {
    return this.mission.find((item) => item.missionId === missionId)!;
  }

  /** @description 유저가 수행한 특정 미션을 찾음 순수함수 반환 */
  private findUserMission(missionId: Mission['missionId']) {
    return this.performedMission.find((item) => item.missionId === missionId);
  }

  /** @description 오늘의 미션을 반환 */
  public getMission() {
    return this.mission;
  }

  /** @description 유저가 수행한 미션을 반환 */
  public getUserMission() {
    return this.performedMission;
  }

  /** @description 포인트 적립 */
  public savePoint({
    missionId,
  }: {
    missionId: Mission['missionId'];
    point: Mission['point'];
  }): CommonResponse {
    if (this.isEarnedMission(missionId).success) {
      return {
        success: false,
        message: '이미 적립이 완료된 미션입니다.',
        status: 406,
      };
    }

    if (!this.isCompletedMisson(missionId)) {
      return {
        success: false,
        message: '인증되지 않은 요청',
        status: 401,
      };
    }

    const mission = this.findMission(missionId);

    this.point += this.validateCheckPoint(mission.missionId);
    this.accumulatedMission.push(mission.missionId);

    return {
      success: true,
      status: 201,
    };
  }

  /** @description 미션참여 */
  public joinMission(missionId: Mission['missionId']) {
    const mission = this.findMission(missionId);

    if (!mission || this.performedMission.find((item) => item.missionId === missionId)) {
      return {
        success: false,
        message: '이미 참여중인 미션입니다.',
        status: 404,
      };
    }

    this.performedMission.push(mission);

    return {
      success: true,
      status: 201,
    };
  }

  /** @description 특정 미션 적립 여부 반환 */
  public isEarnedMission(missionId: Mission['missionId']): CommonResponse {
    // 적립 안되어 있으면
    if (!this.accumulatedMission.find((item) => item === missionId)) {
      return {
        success: false,
        message: '미션에 대한 적립 내역이 없습니다.',
        status: 204,
      };
    }

    return {
      success: true,
      message: '',
      status: 200,
    };
  }

  /** @description 포인트 반환 */
  public getPoint() {
    return this.point;
  }

  public validateCheckPoint(missionId: Mission['missionId']): number {
    const mission = this.findMission(missionId);
    return mission.point;
  }

  public isCompletedMisson(missionId: Mission['missionId']) {
    return this.findUserMission(missionId);
  }

  public setSavedData({
    performedMission,
    accumulatedMission,
    point,
  }: {
    performedMission: Array<Mission>;
    accumulatedMission: Array<Mission['missionId']>;
    point: number;
  }) {
    this.performedMission = performedMission;
    this.accumulatedMission = accumulatedMission;
    this.point = point;
  }

  public getSavedData(): {
    performedMission: Array<Mission>;
    accumulatedMission: Array<Mission['missionId']>;
    point: number;
  } | null {
    if (this.performedMission.length <= 0 && this.accumulatedMission.length <= 0) return null;
    return {
      performedMission: this.performedMission,
      accumulatedMission: this.accumulatedMission,
      point: this.point,
    };
  }
}

const rewardFakeService = new RewardFakeService();

export { rewardFakeService };

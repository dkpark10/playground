export interface Mission {
  missionId: number;
  url: string;
  title: string;
  point: number;
}

export interface CommonResponse {
  success: boolean;
  status: number;
  message?: string;
}

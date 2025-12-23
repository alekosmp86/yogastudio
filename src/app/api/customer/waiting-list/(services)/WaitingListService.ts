export interface WaitingListService {
  addToWaitingList(userId: number, classId: number): Promise<void>;
}

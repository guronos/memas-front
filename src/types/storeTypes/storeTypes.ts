import type { GameEvent } from '@/enums/GameEvent';
import type { StatusRoom } from '@/enums/StatusRoom';

// ROOM
export type TUsersData = Record<string, any>

export interface IQuestions {
    id: string;
    value: string;
    rating: string;
}

export interface IRoomData {
    roomUid: string;
    roomName: string;
    socketIds: string[];
    socketId: string;
    questions: IQuestions[];
    status: StatusRoom;
    createdAt: Date;
    owner: string;
    ownerUserId: string;
    selectedImage: Record<string, any>;
    usersData: {
        [key: string]: TUsersData,
    },
}

//Game
export interface IGameData {
    round: number,
    question: IQuestions,
    userImages: Record<string, string[]>,
    imageSelected?: Record<string, string>,
    gameEvent: GameEvent
}
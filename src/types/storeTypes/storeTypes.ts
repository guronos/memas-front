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
    questions: IQuestions[],
    status: string;
    createdAt: Date,
    usersData: {
        [key: string]: TUsersData,
    },
}

//Game
export interface IGameData {
    question: IQuestions,
    userImages: Record<string, string[]>
}
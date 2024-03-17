import { ChatRoom } from "../interface/chatRoom.interface";

export interface User {
    username: string;
    id: string;
    chatRooms: ChatRoom[];
}
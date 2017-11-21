export class Message {
    // content: string;
    // username: string;
    // messageId: string;
    // userId: string;

    constructor(
        public content: string,
        public username: string,
        public messageId?: string,
        public userId?: string,
    ) {

    }
}
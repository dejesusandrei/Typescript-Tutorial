export type MessageProps = {
    id: number;
    sender: string;
    message: string;
    timestamp: string;
    isMine: boolean;
};

export type MessageListProps = {
    messages: MessageProps[];
}
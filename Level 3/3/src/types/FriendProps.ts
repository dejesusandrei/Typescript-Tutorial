export type FriendProps = {
    id: number;
    name: string;
    email: string;
    isOnline: boolean;
};

export type FriendActionProps = {
    onSelect: (id: number) => void;
    onDelete: (id: number) => void;
}

export type FriendComponentProps = FriendProps & FriendActionProps;

export type FriendListProps = {
    friends: FriendProps[];
} & FriendActionProps;
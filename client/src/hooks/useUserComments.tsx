import { usePostUserComments , useGetUsersComments } from "librechat-data-provider/react-query";
import type { TUserComments } from "librechat-data-provider/dist/types";

interface IUserComments{
    comments?: string;
    date?: Date;
}

type UserCommentsAction = (params: TUserComments) => void;

export default function useUserComments(params?: IUserComments):
{
    usersCommentsList: TUserComments[] | undefined,
    postUserComments: UserCommentsAction,
}
{
    const parameters: TUserComments = { comments: params?.comments ?? "", date: params?.date ?? new Date()};
    const {data: usersCommentsList} = useGetUsersComments();
    const {mutate: postUserComments} = usePostUserComments(parameters);

    return{
        usersCommentsList,
        postUserComments
    }
}


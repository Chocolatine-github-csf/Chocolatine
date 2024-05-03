import { usePostFeedback, useGetFeedbackByPreset, useGetFeedbacks, useGetFeedbackByPresetAndPositivity } from "librechat-data-provider/react-query";
import type { TFeedBack } from "librechat-data-provider/dist/types";
import { useEffect } from 'react';
import { useToastContext } from "~/Providers/ToastContext";
import { FeedBackBadIcon, FeedBackGoodIcon } from "../components/svg";


interface IFeedback{
    messageId?: string;
    message?: string;
    feedback?: boolean;
}

type FeedbackAction = (params: TFeedBack) => void;

export default function useFeedback(params?: IFeedback):
{
    feedbackListByPreset: TFeedBack[] | undefined,
    feedbacksList: TFeedBack[] | undefined,
    feedbackListByPresetAndPositivity: TFeedBack[] | undefined,
    postFeedback: FeedbackAction,
}
{
    const parameters: TFeedBack = {messageId: params?.messageId ?? "", message: params?.message ?? "", feedback: params?.feedback ?? false};
    const {data: feedbackListByPreset} = useGetFeedbackByPreset(parameters?.messageId || '');
    const {data: feedbacksList} = useGetFeedbacks();
    const {data: feedbackListByPresetAndPositivity} = useGetFeedbackByPresetAndPositivity(parameters?.messageId || '', parameters?.feedback || false);
    // console.log("Hook: " + parameters.feedback + " " + parameters.messageId + " " + parameters.message);
    const {mutate: postFeedback} = usePostFeedback(parameters);


    return{
        feedbackListByPreset,
        feedbacksList,
        feedbackListByPresetAndPositivity,
        postFeedback
    };
}
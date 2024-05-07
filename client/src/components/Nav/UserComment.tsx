import { useState } from "react";
import { Button, Textarea, Label } from "../ui";
import { useUserComments } from "~/hooks";

export const UserComment = () => {
    const [text, setText] = useState<string>('');
    const [thanks, setThanks] = useState<string>('');
    const date = new Date(Date.now());
    const { postUserComments } = useUserComments({comments: text, date: date});

    const sendComment = async () => {
        if(text !== ''){
            await postUserComments({comments: text, date: date});
            setText('');
            setThanks('Merci !');
        }
        else{
            setThanks('');
        }
    }

    return (
    <div>
        <h1><Label className="p-3">Laisser un commentaire !</Label></h1>
        <div className="p-3">
            <Textarea value={text} onChange={e => setText(e.target.value)}></Textarea>
        </div>
        <div className="p-3">
            <Button onClick={sendComment}>Submit</Button><Label>{thanks}</Label>
        </div>
    </div>
    )
}
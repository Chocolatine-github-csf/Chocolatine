import useFeedback from "~/hooks/useFeedback";
import { TableBody, TableHead, TableRow, Table, TableCell } from "../ui/Table";
import { Label } from "../ui";


export const FeedBackTable = () => {
    const { feedbacksList } = useFeedback({});

    return(
        <div className="container mx-auto p-6">
            <h3><Label>FeedBack</Label></h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="border px-4 py-2"><Label>Message ID</Label></TableCell>
                        <TableCell className="border px-4 py-2"><Label>Message</Label></TableCell>
                        <TableCell className="border px-4 py-2"><Label>Feedback</Label></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feedbacksList?.map((feedback) => 
                        <TableRow key={feedback.messageId}>
                            <TableCell className="border px-4 py-2"><Label>{feedback.messageId}</Label></TableCell>
                            <TableCell className="border px-4 py-2"><Label>{feedback.message}</Label></TableCell>
                            <TableCell className="border px-4 py-2"><Label>{feedback.feedback ? "Good" : "Bad"}</Label></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default FeedBackTable;
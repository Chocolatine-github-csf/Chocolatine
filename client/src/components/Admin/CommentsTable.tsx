import { useUserComments } from "~/hooks";
import { TableBody, TableHead, TableRow, Table, TableCell } from "../ui/Table";
import { Label } from "../ui";


export const CommentsTable = () => {
    const { usersCommentsList } = useUserComments({});

    return(
        <div className="container mx-auto p-6">
            <h3><Label>Commentaires</Label></h3>
            <Table>
                <TableBody>
                    {usersCommentsList?.map((comment) => 
                        <TableRow>
                            <TableCell className="border px-4 py-2"><Label>{comment.comments}</Label></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default CommentsTable;
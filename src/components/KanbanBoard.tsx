import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { moveIssue } from "../redux/repoSlice";
import IssueColumn from "./IssueColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface KanbanBoardProps {
    repoUrl: string;
  }

const KanbanBoard: React.FC<KanbanBoardProps> = ({repoUrl}) => {
    console.log("Current repo URL:", repoUrl);
  const { columnOrder, issues } = useSelector((state: RootState) => state.repo);
  const dispatch = useDispatch();

  const handleMoveIssue = (issueId: string, to: "todo" | "inProgress" | "done") => {
    dispatch(moveIssue({ id: issueId, to }));
  };
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    dispatch(moveIssue({ id: result.draggableId, to: result.destination.droppableId as "todo" | "inProgress" | "done" }));
  };

  const columns: ("todo" | "inProgress" | "done")[] = ["todo", "inProgress", "done"];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {columns.map((column) => (
            <IssueColumn
              key={column}
              column={column}
              issues={issues.filter((issue) => columnOrder[column].includes(issue.id))}
              onMoveIssue={handleMoveIssue}
            />
          ))}
        </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
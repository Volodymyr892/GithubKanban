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

  const handleMoveIssue = (issueId: string, from: "todo" | "inProgress" | "done", to: "todo" | "inProgress" | "done") => {
    // Тут буде лише рухання в колонку
    dispatch(moveIssue({ id: issueId, from, to, newIndex: 0 }));
  };
  const handleDragEnd = (result: DropResult) => { 
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // Якщо місце перетягування не змінилося, нічого не робимо
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return;
    }

    // Викликаємо moveIssue з усіма параметрами
    dispatch(moveIssue({
        id: draggableId,
        from: source.droppableId as "todo" | "inProgress" | "done",  // джерело
        to: destination.droppableId as "todo" | "inProgress" | "done", // нове місце
        newIndex: destination.index // новий індекс
    }));
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
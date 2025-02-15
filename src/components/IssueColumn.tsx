import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface Issue {
    id: string;
    title: string;
  }
interface IssueColumnProps {
    column: "todo" | "inProgress" | "done";
    issues?: Issue[];
    onMoveIssue: (issueid: string, to: "todo" | "inProgress" | "done")=>void;
} 

const IssueColumn: React.FC<IssueColumnProps> = ({ 
    column,
    issues = [], // Default value for issues if not passed
    onMoveIssue,
})=>{
    return(
        <Droppable droppableId={column}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ border: "1px solid gray", padding: "10px", width: "300px" }}
        >
          <h2>{column}</h2>
          {issues.map((issue, index) => (
            <Draggable key={issue.id} draggableId={issue.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    marginBottom: "10px",
                    backgroundColor: "#f0f0f0",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <p>{issue.title}</p>
                  <button onClick={() => onMoveIssue(issue.id, "done")}>Move to Done</button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    );
};

export default IssueColumn;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Issue {
  id: string;
  title: string;
  state: "open" | "closed";
  assignee: string | null;
}

interface RepoState {
  issues: Issue[];
  repoUrl: string;
  columnOrder: {
    todo: string[];
    inProgress: string[];
    done: string[];
  };
  ownerProfileUrl: string; // Посилання на профіль власника
  repoUrlLink: string;
}
const savedState = localStorage.getItem("kanbanState");
const initialState: RepoState = savedState ? JSON.parse(savedState) :{
  issues: [],
  repoUrl: "",
  columnOrder: {
    todo: [],
    inProgress: [],
    done: [],
  },
  ownerProfileUrl: "",
  repoUrlLink: "",
};

const initialIssues = [
  { id: "1", title: "Тестова задача 1", state: "open", assignee: null },
  { id: "2", title: "Тестова задача 2", state: "open", assignee: "user1" },
  { id: "3", title: "Тестова задача 3", state: "closed", assignee: "user2" },
  { id: "4", title: "Тестова задача 4", state: "open", assignee: null },
];

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setRepoUrl(state, action: PayloadAction<string>) {
      state.repoUrl = action.payload;
      state.repoUrlLink = `${action.payload}`; // Додаємо посилання на репозиторій
      const owner = action.payload.split("/")[3];
      state.ownerProfileUrl = `https://github.com/${owner}`;
    },
    setIssues(state, action: PayloadAction<Issue[]>) {
      state.issues = action.payload || initialIssues;
      // Заповнення колонок за статусами
      state.columnOrder.todo = action.payload
        .filter((issue) => issue.state === "open" && !issue.assignee)
        .map((issue) => issue.id);
      state.columnOrder.inProgress = action.payload
        .filter((issue) => issue.state === "open" && issue.assignee)
        .map((issue) => issue.id);
      state.columnOrder.done = action.payload
        .filter((issue) => issue.state === "closed")
        .map((issue) => issue.id);
    },
    moveIssue(state, action: PayloadAction<{ id: string; from: "todo" | "inProgress" | "done"; to: "todo" | "inProgress" | "done"; newIndex: number }>) {
      const {  id, to  } = action.payload;
      // Переміщуємо issue між колонками
      for (const column in state.columnOrder) {
        const index = state.columnOrder[column as keyof typeof state.columnOrder].indexOf(id);
        if (index !== -1) {
          state.columnOrder[column as keyof typeof state.columnOrder].splice(index, 1);
          break; // Виходимо з циклу, як тільки знайшли і видалили задачу
        }
      }
    
      state.columnOrder[to].push(id);
    
      localStorage.setItem("kanbanState", JSON.stringify(state));
    },
  },
});

export const { setRepoUrl, setIssues, moveIssue } = repoSlice.actions;
export default repoSlice.reducer;
import { useState } from "react"
import { RepoUrlInput } from "./components/RepUrlInput";


export default function App() {
  const [repUrl, setRepoUrl] = useState<string>('');

  return (
    <div>
       <h1>GitHub Issues Kanban Board</h1>
       <RepoUrlInput setRepoUrl={setRepoUrl}/>
    </div>
  )
}

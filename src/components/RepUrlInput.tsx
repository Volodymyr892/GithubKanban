import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIssues } from "../redux/repoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Issue {
  id: string;
  title: string;
  state: "open" | "closed";
  assignee: string | null;
}
interface RepoUrlInputProps {
    setRepoUrl: (url: string) => void;
  }

export const RepoUrlInput: React.FC<RepoUrlInputProps> = ({setRepoUrl})=>{ 
    const [url, setUrl] = useState<string>('');
    const dispatch = useDispatch();

    const repoUrlLink = useSelector((state: RootState) => state.repo.repoUrlLink);

    const handleSubmit =async (e: React.FormEvent)=>{
        e.preventDefault();
        setRepoUrl(url);

        // const repoParts = url.split("/");
        // const owner = repoParts[3];
        // const repo = repoParts[4];
    
        // try {
        //   const response = await fetch(
        //     `https://api.github.com/repos/${owner}/${repo}/issues`
        //   );
        //   const issues = await response.json();
        //   if (Array.isArray(issues)) {
        //     dispatch(setIssues(issues)); // Диспатчимо задачі в store
        //   }
        // } catch (error) {
        //   console.error("Помилка при отриманні задач:", error);
        // }
        const issues: Issue[] = [
          { id: "1", title: "Тестова задача 1", state: "open", assignee: null },
          { id: "2", title: "Тестова задача 2", state: "open", assignee: "user1" },
          { id: "3", title: "Тестова задача 3", state: "closed", assignee: "user2" },
          { id: "4", title: "Тестова задача 4", state: "open", assignee: null },
        ];
    
        dispatch(setIssues(issues));
    }

    return(
        <div>ommit 
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Enter GitHub Repo URL"
                value={url}
                onChange={(e)=> setUrl(e.target.value)}
                 />
                <button type="submit">Load</button>
            </form>

            <div>
            {repoUrlLink && (
                <div>
                    <a href={repoUrlLink} target="_blank" rel="noopener noreferrer">
                        Перейти до репозиторію
                    </a>
                </div>
            )}
      </div>
        </div>
    )
}
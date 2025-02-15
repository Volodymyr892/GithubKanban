import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIssues } from "../redux/repoSlice";


interface RepoUrlInputProps {
    setRepoUrl: (url: string) => void;
  }

export const RepoUrlInput: React.FC<RepoUrlInputProps> = ({setRepoUrl})=>{ 
    const [url, setUrl] = useState<string>('');
    const dispatch = useDispatch();

    const handleSubmit =async (e: React.FormEvent)=>{
        e.preventDefault();
        setRepoUrl(url);

        const repoParts = url.split("/");
        const owner = repoParts[3];
        const repo = repoParts[4];
    
        try {
          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues`
          );
          const issues = await response.json();
          if (Array.isArray(issues)) {
            dispatch(setIssues(issues)); // Диспатчимо задачі в store
          }
        } catch (error) {
          console.error("Помилка при отриманні задач:", error);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Enter GitHub Repo URL"
                value={url}
                onChange={(e)=> setUrl(e.target.value)}
                 />
                <button type="submit">Load</button>
            </form>
{/* 
            <div>
        <a href={repoUrlLink} target="_blank" rel="noopener noreferrer">
          Перейти до репозиторію
        </a>
        <br />
        <a href={ownerProfileUrl} target="_blank" rel="noopener noreferrer">
          Перейти до профілю власника
        </a>
      </div> */}
        </div>
    )
}
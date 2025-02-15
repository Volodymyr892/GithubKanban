import React, { useState } from "react";


interface RepoUrlInputProps {
    setRepoUrl: (url: string) => void;
  }

export const RepoUrlInput: React.FC<RepoUrlInputProps> = ({setRepoUrl})=>{ 
    const [url, setUrl] = useState<string>('');

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        setRepoUrl(url);
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
        </div>
    )
}
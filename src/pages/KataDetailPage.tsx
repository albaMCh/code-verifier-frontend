import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "../components/editor/Editor";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getKataByID } from "../services/kataService";
import { Kata } from "../utils/config/types/Kata.types";

export const KatasDetailPage = () => {
  let loggedIn = useSessionStorage("sessionJWTToken");
  let navigate = useNavigate();
  // Find id from params
  let { id } = useParams();
  const [kata, setkata] = useState<Kata |undefined>(undefined);
  const [showSolution, setshowSolution] = useState ();

  const[]

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    }else{
      if(id){
      getKataByID(loggedIn, id).then((response: AxiosResponse) =>{
         if (response.status === 200 && response.data){
           let kataData = {
             _id: response.data._id,
             name: response.data.name,
             description: response.data.description,
             stars: response.data.stars,
             level: response.data.level,
             intents: response.data. intents,
             creator: response.data.solution,
             solution: response.data.solution,
             participants: response.data.participants

           }
           setkata(kataData);
          

           console.table(kata);
         }


      }).catch((error) => console.error(`[Kata By ID ERROR]: ${error}`))
    }else{
      return navigate ('/login');
    }

  }, [loggedIn]);

  return (
    <div>
      <h1>Kata Detail Page: {id}</h1>
      { kata ?
      <div className="kata-data">
      <h2>{kata?.description}</h2>
      <h3>Rating: {kata.stars}/5</h3>
      <button onClick={() => setshowSolution(!showSolution)}>{showSolution ? 'Show Solution': 'Hide Solution'}</button>

  { showSolution ? null: <Editor >{kata.solution}</Editor>}
      </div>
      :
      <div>
      <h2>
        Loading data...
      </h2>
    </div>
  }
  
  </div>
  )
}


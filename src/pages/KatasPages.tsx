import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";
import { getAllKatas } from "../services/kataService";

import { Kata } from "../utils/config/types/Kata.types";

export const KatasPage = () => {
  let loggedIn = useSessionStorage("sessionJWTToken");
  let navigate = useNavigate();
  // state os component
  const [katas, setKatas] = useState<Kata[]>([]); // initial katas is empty
  const [totalPages, setTotalPages] = useState(1); // initial default value
  const [currentPage, setCurrentPages] = useState(1); // initial default value

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    } else {
      getAllKatas(loggedIn, 2, 1)
        .then((response: AxiosResponse) => {
          debugger;
          if (
            response.status === 200 &&
            response.data.katas &&
            response.data.totalPages &&
            response.data.currentPage
          ) {
            console.table(response.data);
            let { katas, totalPages, currentPage } = response.data;

            const katasArray = katas as Kata[];
            setKatas(katasArray);
            setTotalPages(totalPages);
            setCurrentPages(currentPage);
          } else {
            throw new Error(`Error obtaining katas: ${response.data}`);
          }
        })
        .catch((error) => console.error(`[Get All Katas Error] ${error}`));
    }
  }, [loggedIn]);

  /**
   * Metho to navigate to Kata details
   * @param id of Kata to navigate to
   */
  const navigateToKataDetail = (id: number) => {
    navigate(`/katas/${id}`);
  };

  return (
    <div>
      <h1>Katas Page</h1>

      {katas.length > 0 ? (
        <div>
          {/* TODO: Export tp isolated Component */}
          {katas.map((kata: any) => (
            <div key={kata._id}>
              <h3 onClick={() => navigateToKataDetail(kata._id)}>
                {kata.name}
              </h3>
              <h4>{kata.description}</h4>
              <h5>Creator:{kata.creator}</h5>
              <p>Rating: {kata.valoration}/5</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h5>No katas found</h5>
        </div>
      )}
    </div>
  );
};

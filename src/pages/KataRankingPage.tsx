import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";
import { getAllKatas } from "../services/kataService";

import { Rating } from "@mui/material";

export const KataRankingPage = () => {
  const loggedIn = useSessionStorage("sessionJWTToken");

  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [limit, setLimit] = useState(5);
  const [sortType, setSortType] = useState("desc");
  const [sortProperty, setSortProperty] = useState("stars.average");

  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    } else {
      getAllKatas(rowsPerPage, currentPage, limit, sortType, sortProperty).then(
        (response) => {
          setRanking(response.data.katas);
        }
      );
    }
  }, [loggedIn]);

  const style = {
    verticalAlign: "text-bottom",
  };

  return (
    <div>
      <h2>Ranking de katas</h2>
      <ol>
        {ranking.map((kata: any) => (
          <li key={kata._id}>
            <span>{kata.name}</span> |{" "}
            <span>
              <Rating
                name="read-only"
                value={kata.stars.average}
                readOnly
                precision={0.5}
                style={style}
              />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

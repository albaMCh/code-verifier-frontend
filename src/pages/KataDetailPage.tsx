import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "../components/editor/Editor";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getKataByID } from "../services/kataService";
import { Kata } from "../utils/types/Kata.types";
// import ReactTooltip from "react-tooltip";

// Theme personalitzation for material UI
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

// Material lists
import List from "@mui/material/List";

// Material Grids and Boxs
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { fontStyle } from "@mui/system";
import { Button, Stack } from "@mui/material";

// Define theme
const myTheme = createTheme();

export const KataDetailPage = () => {
  const loggedIn = useSessionStorage("sessionJWTToken");
  let navigate = useNavigate();
  // Find id from params
  const { id } = useParams();
  const [kata, setKata] = useState<Kata | undefined>(undefined);
  const [showSolution, setShowSolution] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showVote, setShowVote] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    } else {
      if (id) {
        getKataByID(loggedIn, id)
          .then((response: AxiosResponse) => {
            if (response.status === 200 && response.data) {
              let kataData: Kata = {
                _id: response.data._id,
                name: response.data.name,
                description: response.data.description,
                level: response.data.level,
                intents: response.data.intents,
                stars: {
                  average: response.data.stars.average,
                  users: response.data.stars.users,
                },
                creator: response.data.creator,
                solution: response.data.solution,
                participants: response.data.participants,
              };

              let userID: string =
                sessionStorage?.getItem("sessionUserID") || " ";
              setKata(kataData);
              if (kataData.creator === userID) {
                setShowEdit(true);
              }
              if (kataData.participants.indexOf(userID) >= 0) {
                setShowVote(true);
              }
            }
          })
          .catch((error) => console.error(`[Kata By ID ERROR]: ${error}`));
      } else {
        return navigate("/katas");
      }
    }
  }, [loggedIn]);

  return (
    <ThemeProvider theme={myTheme}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {kata?.name}
      </Typography>

      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        {kata?.description}
      </Typography>

      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{
          flexGrow: 1,
        }}
      >
        Rating: {kata?.stars.average}/5
      </Typography>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        {showVote ? (
          <Button
            variant="contained"
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? "Hide Solution" : "Show Solution"}
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            {showSolution ? "Hide Solution" : "Show Solution"}
          </Button>
        )}
        {showVote ? (
          <Button variant="contained">Vote Kata</Button>
        ) : (
          <Button variant="outlined" disabled>
            Vote Kata
          </Button>
        )}
        {showEdit ? (
          <Button variant="contained">Edit Kata</Button>
        ) : (
          <Button variant="outlined" disabled>
            Edit Kata
          </Button>
        )}
      </Stack>
      <Container sx={{ py: 8 }} maxWidth="md">
        {showSolution ? <Editor>{kata?.solution}</Editor> : null}
      </Container>
    </ThemeProvider>
  );
};

import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewEditor } from "../components/editor/NewEditor";
import { Editor } from "../components/editor/Editor";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getKataByID, solveKata, voteKata } from "../services/kataService";
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
import { Button, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material";

import { FileUploader } from "../components/uploader/FileUploader";

import { updateKata } from "../services/kataService";

// Define theme
const myTheme = createTheme();

export const KataParticipatePage = () => {
  const loggedIn = useSessionStorage("sessionJWTToken");
  let navigate = useNavigate();
  // Find id from params
  const { id } = useParams();
  const [kata, setKata] = useState<Kata | undefined>(undefined);

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

              setTypedName(kataData.name);
              setTypedDescription(kataData.description);
              setSelectedLevel(kataData.level);

              let userID: string =
                sessionStorage?.getItem("sessionUserID") || "";

              if (kataData.participants.indexOf(userID) >= 0) {
                setShowVote(true);
              }

              setKata(kataData);
            }
          })
          .catch((error) => console.error(`[Kata By ID ERROR]: ${error}`));
      } else {
        return navigate("/katas");
      }
    }
  }, [loggedIn]);

  const [typedName, setTypedName] = React.useState("");
  const [typedDescription, setTypedDescription] = React.useState("");
  const [selectedLevel, setSelectedLevel] = React.useState("Basic");

  const [solutionDisabled, setSolutionDisabled] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [showVote, setShowVote] = useState(false);

  const handleSolve = async () => {
    try {
      await solveKata(kata?._id as string);

      setSolutionDisabled(false);
    } catch (e) {
      alert("Ha habido un error al resolver la kata");
    }
  };

  if (kata) {
    return (
      <ThemeProvider theme={myTheme}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Resolución de Kata <strong>{kata.name}</strong>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Nombre"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                disabled
                value={typedName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="description"
                name="description"
                label="Descripción"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={typedDescription}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                required
                id="level"
                name="level"
                label="Dificultad"
                fullWidth
                variant="standard"
                value={selectedLevel}
                disabled
              >
                <MenuItem value="Basic">Básico</MenuItem>
                <MenuItem value="Medium">Medio</MenuItem>
                <MenuItem value="High">Alto</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <label>Aporta tu solución</label>
              <NewEditor />
            </Grid>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {showVote ? (
                <Button variant="contained">
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  disabled={solutionDisabled}
                  onClick={() => setShowSolution(!showSolution)}
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </Button>
              )}
            </Stack>

            <Container sx={{ py: 1 }} maxWidth="md">
              {showSolution ? <Editor>{kata?.solution}</Editor> : null}
            </Container>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => handleSolve()}
                sx={{ mt: 3, ml: 1 }}
              >
                Resolver
              </Button>
            </Box>
          </Grid>
        </React.Fragment>
      </ThemeProvider>
    );
  }

  return <div>Loading...</div>;
};

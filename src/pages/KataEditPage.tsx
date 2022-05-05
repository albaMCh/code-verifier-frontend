import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewEditor } from "../components/editor/NewEditor";
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
import { Button, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { FileUploader } from "../components/uploader/FileUploader";

import { updateKata } from "../services/kataService";

// Define theme
const myTheme = createTheme();

export const KataEditPage = () => {
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedName(event.target.value as string);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTypedDescription(event.target.value as string);
  };

  const handleLevelChange = (event: SelectChangeEvent) => {
    setSelectedLevel(event.target.value as string);
  };

  const handleSubmit = async () => {
    try {
      await updateKata(
        kata?._id as string,
        typedName,
        typedDescription,
        selectedLevel
      );

      navigate("/katas");
    } catch (e) {
      alert("Ha habido un error al editar la kata");
    }
  };

  if (kata) {
    return (
      <ThemeProvider theme={myTheme}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Edición de Kata
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
                onChange={handleNameChange}
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
                onChange={handleDescriptionChange}
                value={typedDescription}
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
                onChange={handleLevelChange}
              >
                <MenuItem value="Basic">Básico</MenuItem>
                <MenuItem value="Medium">Medio</MenuItem>
                <MenuItem value="High">Alto</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <NewEditor />
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, ml: 1 }}
              >
                Guardar
              </Button>
            </Box>
          </Grid>
        </React.Fragment>
      </ThemeProvider>
    );
  }

  return <div>Loading...</div>;
};

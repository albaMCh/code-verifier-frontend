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
import { Button, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { FileUploader } from "../components/uploader/FileUploader";

import { createKata } from "../services/kataService";

// Define theme
const myTheme = createTheme();

export const KataCreatePage = () => {
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
      await createKata(typedName, typedDescription, selectedLevel);

      navigate("/katas");
    } catch (e) {
      alert("Ha habido un error al crear la kata");
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Nueva Kata
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
          {/* <Grid item xs={12}>
            <FileUploader />
  </Grid> */}

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, ml: 1 }}
            >
              Crear
            </Button>
          </Box>
        </Grid>
      </React.Fragment>
    </ThemeProvider>
  );
};

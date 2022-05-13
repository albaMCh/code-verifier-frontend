import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSessionStorage } from "../hooks/useSessionStorage";
import { getAllKatas, deleteKata } from "../services/kataService";
import { Kata } from "../utils/types/Kata.types";
import TablePagination from "@mui/material/TablePagination";

const theme = createTheme();

export const KatasPage = () => {
  const loggedIn = useSessionStorage("sessionJWTToken");
  let navigate = useNavigate();
  // State of the component
  const [katas, setKatas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    } else {
      getAllKatas(rowsPerPage, currentPage)
        .then((response: AxiosResponse) => {
          if (
            response.status === 200 &&
            response.data.katas &&
            response.data.totalPages &&
            response.data.currentPage
          ) {
            let { katas, totalPages, currentPage } = response.data;
            setKatas(katas);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
          } else {
            throw new Error(`Error obtaining katas: ${response.data}`);
          }
        })
        .catch((error) => console.error(`[GET ALL KATAS ERROR]: ${error}`));
    }
  }, [loggedIn]);

  /**
   * Method to navigate to Kata details
   * @param id  of Kata to navigate to
   */
  const navigateToKataDetail = (id: string) => {
    navigate(`/katas/${id}`);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setCurrentPage(+page + 1);
    getAllKatas(rowsPerPage, +page + 1)
      .then((response: AxiosResponse) => {
        if (
          response.status === 200 &&
          response.data.katas &&
          response.data.totalPages &&
          response.data.currentPage
        ) {
          let { katas, totalPages, currentPage } = response.data;
          setKatas(katas);
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
        } else {
          throw new Error(`Error obtaining katas: ${response.data}`);
        }
      })
      .catch((error) => console.error(`[GET ALL KATAS ERROR]: ${error}`));
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
    getAllKatas(+event.target.value, 1)
      .then((response: AxiosResponse) => {
        if (
          response.status === 200 &&
          response.data.katas &&
          response.data.totalPages &&
          response.data.currentPage
        ) {
          let { katas, totalPages, currentPage } = response.data;
          setKatas(katas);
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
        } else {
          throw new Error(`Error obtaining katas: ${response.data}`);
        }
      })
      .catch((error) => console.error(`[GET ALL KATAS ERROR]: ${error}`));
  };

  const onDeleteClick = async (id: string) => {
    try {
      await deleteKata(id);

      return getAllKatas(rowsPerPage, currentPage)
        .then((response: AxiosResponse) => {
          if (
            response.status === 200 &&
            response.data.katas &&
            response.data.totalPages &&
            response.data.currentPage
          ) {
            let { katas, totalPages, currentPage } = response.data;
            setKatas(katas);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
          } else {
            throw new Error(`Error obtaining katas: ${response.data}`);
          }
        })
        .catch((error) => console.error(`[GET ALL KATAS ERROR]: ${error}`));
    } catch (e) {
      alert("Hubo un error al eliminar la kata");
    }
  };

  const onParticipateClick = (id: string) => {
    navigate(`/katas/${id}/participate`);
  };
  const isKataEditable = (kata: any) => {
    return kata.creator === window.sessionStorage.getItem("sessionUserID");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 1,
            pb: 1,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 1 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={() => navigate("/katas/create")}
              >
                Crear
              </Button>
              {/* <Button variant="outlined">Secondary action</Button>*/}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {katas.map((kata: Kata) => (
              <Grid item key={kata._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {kata.name}
                    </Typography>
                    <Typography>{kata.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigateToKataDetail(kata._id)}
                    >
                      Ver
                    </Button>
                    <Button
                      size="small"
                      onClick={() => navigate(`/katas/${kata._id}/edit`)}
                      disabled={!isKataEditable(kata)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      onClick={() => onDeleteClick(kata._id)}
                      disabled={!isKataEditable(kata)}
                    >
                      Eliminar
                    </Button>
                    <Button
                      size="small"
                      onClick={() => onParticipateClick(kata._id)}
                    >
                      Participar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <TablePagination
          component="div"
          count={totalPages * rowsPerPage}
          page={currentPage - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          labelRowsPerPage="Katas por página"
        />
      </main>
      {/* End footer */}
    </ThemeProvider>
  );
};

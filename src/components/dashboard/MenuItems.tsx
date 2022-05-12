import React from "react";
import { useNavigate } from "react-router-dom";

// Material List Components
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Material Icon Components
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

export const MenuItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {/* Dashboard to Katas Button */}
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Katas" onClick={() => navigate("/katas")} />
      </ListItemButton>
      {/* Users */}
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      {/* Ranking */}
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText
          primary="Ranking"
          onClick={() => navigate("/katas/ranking")}
        />
      </ListItemButton>
    </React.Fragment>
  );
};

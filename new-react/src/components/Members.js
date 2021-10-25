import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

const useStyles = makeStyles({});

const Members = () => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <div>
        <Typography>My Name</Typography>
      </div>
    </Drawer>
  );
};

export default Members;

import IconButton from "@mui/material/IconButton";
import { SnackbarProvider } from "notistack";
import { createRef } from "react";
import "./assets/App.scss";
import TaskSection from "./components/TaskSection";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const toastRef = createRef<any>();

  const onClickDismiss = (key: any) => () => {
    toastRef.current.closeSnackbar(key);
  };

  return (
    <div className="App">
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        ref={toastRef}
        preventDuplicate
        autoHideDuration={5000}
        action={(key: any) => (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClickDismiss(key)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      >
        <TaskSection />
      </SnackbarProvider>
    </div>
  );
}

export default App;

import { createRef, lazy, Suspense } from "react";
import "./assets/App.scss";

// Importing Layouts - Mudasir Nizamani
import Layout from "./core/layouts/Layout";

// Importing Pages - Mudasir Nizamani
const Index = lazy(() => import("./pages/Index"));
const CreateList = lazy(() => import("./pages/CreateList"));
const CreateItem = lazy(() => import("./pages/CreateItem"));

// Importing Material Ui Components - Mudasir Nizamani
import IconButton from "@mui/material/IconButton";
import { SnackbarProvider } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { Route, Routes } from "react-router-dom";

function App() {
  // Creating a red for the toast to open and close - Mudasir Nizamani
  const toastRef = createRef<any>();

  const onClickDismiss = (key: any) => () => {
    toastRef.current.closeSnackbar(key);
  };

  return (
    <div className="App">
      {/* Just Using the React Router - Mudasir Nizamani */}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<h2>plz wait loading</h2>}>
              {/* using the SnackbarProvider component from notistack so I can show notification in the App - Mudasir Nizamani */}
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                ref={toastRef}
                preventDuplicate
                autoHideDuration={3000}
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
                <Layout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<Index />} />
          <Route path="create/list" element={<CreateList />} />
          <Route path="create/item" element={<CreateItem />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

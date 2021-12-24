import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "../core/api/axios";
import { useSnackbar } from "notistack";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListsEndpoints } from "../core/api/endpoints";
import { AxiosError } from "axios";

// On this Page user will create a new Todo List -  Mudasir Nizamani
function CreateList() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // if the user does not add any title and try to submit then the user
    // will get an error - Mudasir Nizamani
    if (title === "" || title === null || title === undefined) {
      enqueueSnackbar("Title cannot be empty", { variant: "error" });
    }
    await axios
      .post(ListsEndpoints.CreateList, { title: title })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Todo List successfully created", {
            variant: "success",
          });
          navigate("/", { replace: true });
        }
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 500) {
          enqueueSnackbar("Server Error, Plz try again", {
            variant: "warning",
          });
        } else if (err.response?.data.code === "ListExists") {
          // If the user has given a title that already exists in the database
          // then the user will also get an error - Mudasir Nizamani
          enqueueSnackbar(err.response?.data.error, { variant: "error" });
        }
      });
  };

  return (
    <div className="form_box">
      <form
        onSubmit={(event) => {
          Submit(event);
        }}
      >
        <TextField
          sx={{ marginTop: "14px" }}
          id="outlined-basic"
          label="Name *"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="standard"
        />
        <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateList;

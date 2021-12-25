import { Autocomplete, Button, TextareaAutosize } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "../core/api/axios";
import { useSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsEndpoints, ListsEndpoints } from "../core/api/endpoints";
import { AxiosError } from "axios";
import { IList } from "../core/models/IList.interface";
import { ICreateItem } from "../core/models/ICreateItem.interface";

function CreateItem() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [lists, setLists] = useState<IList[]>([]);

  // FormData - Mudasir Nizamani
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [listId, setListId] = useState<string>("");

  useEffect(() => {
    const getLists = async () => {
      await axios
        .get<IList[]>(ListsEndpoints.GetLists)
        .then((res) => setLists(res.data));
    };

    getLists();

    return () => {
      setLists([]);
    };
  }, []);

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // if the user does not add any title and try to submit then the user
    // will get an error - Mudasir Nizamani
    if (title === "" || title === null || title === undefined) {
      enqueueSnackbar("Title cannot be empty", { variant: "error" });
      return;
    } else if (listId === "" || listId === null || listId === undefined) {
      enqueueSnackbar("Plz select a List", { variant: "error" });
      return;
    }
    const model: ICreateItem = {
      description: description,
      listId: listId.toString(),
      title: title.toString(),
    };
    await axios
      .post(ItemsEndpoints.CreateItem, model)
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Todo Item successfully created", {
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
        } else if (err.response?.data.code === "ItemExists") {
          // If the user has given a title that already exists in the database
          // then the user will also get an error - Mudasir Nizamani
          enqueueSnackbar(err.response?.data.error, { variant: "error" });
        } else if (err.response?.data.code === "ListNotFound") {
          enqueueSnackbar(err.response?.data.error, { variant: "error" });
        } else if (err.response?.data.code === "ListArchived") {
          enqueueSnackbar("The List is Archived, choose another one", {
            variant: "error",
          });
        }
      });
  };

  const defaultProps = {
    options: lists,
    getOptionLabel: (option: IList) => `${option.title}`,
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
          label="Title *"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="standard"
        />
        <Autocomplete
          {...defaultProps}
          id="clear-on-escape"
          sx={{ marginTop: "1rem" }}
          clearOnEscape
          freeSolo
          onChange={(event, value: any) => setListId(value?.ID)}
          renderInput={(params) => (
            <TextField {...params} label="Select List *" variant="standard" />
          )}
        />
        <div style={{ marginTop: "1rem" }}>
          <TextareaAutosize
            style={{
              width: "100%",
            }}
            minRows={3}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button variant="contained" type="submit" sx={{ marginTop: "1.5rem" }}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateItem;

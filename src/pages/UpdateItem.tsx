import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../core/api/axios";
import { ItemsEndpoints } from "../core/api/endpoints";
import { IItem } from "../core/models/IItem.interface";
import { IUpdateItem } from "../core/models/IUpdateItem.interface";

function UpdateItem() {
  const [item, setItem] = useState<IItem | null>();
  const { item_id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // FormData - Mudasir Nizamani
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const getItem = async () => {
      await axios
        .get<IItem>(`${ItemsEndpoints.GetItem}${item_id}`)
        .then((res) => {
          setItem(res.data);
        });
    };

    getItem();
    return () => {};
  }, []);

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // if the user does not add any title and try to submit then the user
    // will get an error - Mudasir Nizamani
    if (title === "" || title === null || title === undefined) {
      enqueueSnackbar("Title cannot be empty", { variant: "error" });
      return;
    }
    let model: IUpdateItem = {
      completed: item?.completed!,
      description: description,
      listId: item?.listId!,
      id: item?.ID.toString()!,
      title: title,
    };
    await axios
      .post(ItemsEndpoints.UpdateItem, model)
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Updated Item", {
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
        }
      });
  };

  return (
    <div>
      <div className="form_box">
        <form
          onSubmit={(event) => {
            Submit(event);
          }}
        >
          <TextField
            sx={{ marginTop: "14px" }}
            label="Title *"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="standard"
          />
          <div style={{ marginTop: "1rem" }}>
            <TextareaAutosize
              style={{
                width: "100%",
              }}
              minRows={3}
              defaultValue={item?.description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateItem;

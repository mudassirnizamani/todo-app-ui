import axios from "../core/api/axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { IList } from "../core/models/IList.interface";
import { useNavigate, useParams } from "react-router-dom";
import { ListsEndpoints } from "../core/api/endpoints";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { IUpdateList } from "../core/models/IUpdateList.interface";

function UpdateList() {
  const [list, setList] = useState<IList | null>();
  const { list_id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // FormData - Mudasir Nizamani
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getList = async () => {
      await axios
        .get<IList>(`${ListsEndpoints.GetList}${list_id}`)
        .then((res) => {
          setList(res.data);
        });
    };

    getList();

    return () => {
      setList(null);
    };
  }, []);

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // if the user does not add any title and try to submit then the user
    // will get an error - Mudasir Nizamani
    if (title === "" || title === null || title === undefined) {
      enqueueSnackbar("Title cannot be empty", { variant: "error" });
      return;
    }
    let model: IUpdateList = {
      archived: list?.archived!,
      id: list_id!,
      title: title,
    };
    await axios
      .post(ListsEndpoints.UpdateList, model)
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Updated List", {
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
            id="outlined-basic"
            label="Title *"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            defaultValue={list?.title}
            variant="standard"
          />
          <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateList;

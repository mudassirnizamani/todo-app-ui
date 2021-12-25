import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { IItem } from "../core/models/IItem.interface";
import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "../core/api/axios";
import { ItemsEndpoints } from "../core/api/endpoints";
import { IUpdateItem } from "../core/models/IUpdateItem.interface";
import { AxiosError } from "axios";

interface props {
  itemData: IItem;
  listArchive: boolean;
}

function Item(props: props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [removed, setRemoved] = useState<boolean>(false);

  const Delete = async () => {
    await axios
      .get(`${ItemsEndpoints.DeleteItem}${props.itemData.ID}`)
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Todo Item Removed", { variant: "info" });
          setRemoved(true);
        }
      });
  };

  const MarkOrUnMark = async () => {
    if (props.listArchive) {
      enqueueSnackbar("List is Archived", { variant: "warning" });
      return;
    }

    const model: IUpdateItem = {
      completed: !props.itemData.completed,
      description: props.itemData.description,
      id: props.itemData.ID.toString(),
      listId: props.itemData.listId,
      title: props.itemData.title,
    };

    await axios
      .post(ItemsEndpoints.UpdateItem, model)
      .then((res) => {
        if (res.status === 200) {
          navigate("/create");
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
    <div
      className={`item_wrapper ${removed ? "display_none" : ""}`}
      key={props.itemData.ID}
    >
      <div className="top">
        <div
          className={`title ${props.itemData.completed ? "strike" : ""}`}
          onClick={MarkOrUnMark}
        >
          <p>{props.itemData.title}</p>
          <p>{props.itemData.description}</p>
        </div>
        <div className="list_btns">
          <button
            className="blue_outlined"
            onClick={() => {
              if (props.listArchive) {
                enqueueSnackbar("This list is archived", {
                  variant: "warning",
                });
                return;
              }
              navigate(`/update/item/${props.itemData.ID}`);
            }}
          >
            Edit
          </button>
          <button className="red_outlined" onClick={Delete}>
            <RemoveIcon fontSize="small" sx={{ fontSize: "15px" }} />
          </button>
          <button
            className="green_outlined"
            onClick={() => {
              if (props.listArchive) {
                enqueueSnackbar("This list is archived", {
                  variant: "warning",
                });
                return;
              }
              navigate("/create/item");
            }}
          >
            <AddIcon fontSize="small" sx={{ fontSize: "15px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;

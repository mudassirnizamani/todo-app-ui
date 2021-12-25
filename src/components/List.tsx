import { IList } from "../core/models/IList.interface";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IItem } from "../core/models/IItem.interface";
import axios from "../core/api/axios";
import { ListsEndpoints } from "../core/api/endpoints";
import Item from "./Item";
import { useSnackbar } from "notistack";

// Importing Material Ui Component - Mudasir Nizamani
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IUpdateList } from "../core/models/IUpdateList.interface";

interface props {
  listData: IList;
}

function List(props: props) {
  const navigate = useNavigate();
  const [items, setItems] = useState<IItem[]>();
  const [removed, setRemoved] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      await axios
        .get<IItem[]>(`${ListsEndpoints.GetItems}${props.listData.ID}`)
        .then((res) => setItems(res.data));
    };
    getItems();
    return () => setItems([]);
  }, []);

  const Delete = async () => {
    await axios
      .get(`${ListsEndpoints.DeleteList}${props.listData.ID}`)
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Deleted todo list successfully", {
            variant: "info",
          });
          setRemoved(true);
          setOpen(false);
        }
      });
  };
  const Archive = async () => {
    const model: IUpdateList = {
      archived: true,
      id: props.listData.ID.toString(),
      title: props.listData.title,
    };
    await axios.post(ListsEndpoints.UpdateList, model).then((res) => {
      if (res.status === 200) {
        enqueueSnackbar("Archived List", { variant: "info" });
        navigate("/create");
        navigate("/", { replace: true });
      }
    });
  };
  const UnArchive = async () => {
    const model: IUpdateList = {
      archived: false,
      id: props.listData.ID.toString(),
      title: props.listData.title,
    };
    await axios.post(ListsEndpoints.UpdateList, model).then((res) => {
      if (res.status === 200) {
        enqueueSnackbar("UnArchived List", { variant: "info" });
        navigate("/create");
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <>
      <div
        className={`list_wrapper ${removed ? "display_none" : ""}`}
        key={props.listData.ID}
      >
        <div className="top">
          <div className="title">{props.listData.title}</div>
          <div className="list_btns">
            {props.listData.archived ? (
              <button className="black_outlined" onClick={UnArchive}>
                UnArchive
              </button>
            ) : (
              <button className="black_outlined" onClick={Archive}>
                Archive
              </button>
            )}
            <button
              className="blue_outlined"
              onClick={() => {
                if (props.listData.archived) {
                  enqueueSnackbar("This list is archived", {
                    variant: "warning",
                  });
                  return;
                }
                navigate(`/update/list/${props.listData.ID}`);
              }}
            >
              Edit
            </button>
            <button className="red_outlined" onClick={() => setOpen(true)}>
              <RemoveIcon fontSize="small" sx={{ fontSize: "15px" }} />
            </button>
            <button
              className="green_outlined"
              onClick={() => {
                if (props.listData.archived) {
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
        <div className="items">
          {items?.map((item: IItem) => {
            return (
              <Item itemData={item} listArchive={props.listData.archived} />
            );
          })}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure, you want to delete this"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting the list means that the items in the list will be also
            deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={Delete} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default List;

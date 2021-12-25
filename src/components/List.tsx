import { IList } from "../core/models/IList.interface";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IItem } from "../core/models/IItem.interface";
import axios from "../core/api/axios";
import { ListsEndpoints } from "../core/api/endpoints";
import Item from "./Item";

interface props {
  listData: IList;
}

function List(props: props) {
  const navigate = useNavigate();
  const [items, setItems] = useState<IItem[]>();

  useEffect(() => {
    const getItems = async () => {
      await axios
        .get<IItem[]>(`${ListsEndpoints.GetItems}${props.listData.ID}`)
        .then((res) => setItems(res.data));
    };
    getItems();
    return () => setItems([]);
  }, []);

  const Delete = async () => {};
  const Edit = async () => {};
  const Archive = async () => {};
  const UnArchive = async () => {};

  return (
    <div className="list_wrapper" key={props.listData.ID}>
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
          <button className="blue_outlined" onClick={Edit}>
            Edit
          </button>
          <button className="red_outlined" onClick={Delete}>
            <RemoveIcon fontSize="small" sx={{ fontSize: "15px" }} />
          </button>
          <button
            className="green_outlined"
            onClick={() => navigate("/create/item")}
          >
            <AddIcon fontSize="small" sx={{ fontSize: "15px" }} />
          </button>
        </div>
      </div>
      <div className="items">
        {items?.map((item: IItem) => {
          return <Item itemData={item} />;
        })}
      </div>
    </div>
  );
}

export default List;

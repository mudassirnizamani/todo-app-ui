import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { IItem } from "../core/models/IItem.interface";

interface props {
  itemData: IItem;
}

function Item(props: props) {
  const navigate = useNavigate();

  const Delete = async () => {};
  const Edit = async () => {};
  return (
    <div className="item_wrapper" key={props.itemData.ID}>
      <div className="top">
        <div className="title">
          {props.itemData.title}
          <p>{props.itemData.description}</p>
        </div>
        <div className="list_btns">
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
    </div>
  );
}

export default Item;

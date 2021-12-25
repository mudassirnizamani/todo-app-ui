import List from "../components/List";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import axios from "../core/api/axios";
import { ListsEndpoints } from "../core/api/endpoints";
import { IList } from "../core/models/IList.interface";

function Index() {
  const [lists, setLists] = useState<IList[]>([]);

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
  return (
    <>
      {lists?.map((list: IList) => {
        return <List listData={list} />;
      })}
    </>
  );
}

export default Index;

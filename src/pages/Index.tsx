import { useSnackbar } from "notistack";
import { useEffect } from "react";
function Index() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar("The app is not Completed Yet", { variant: "info" });
  }, []);
  return <>Hello World</>;
}

export default Index;

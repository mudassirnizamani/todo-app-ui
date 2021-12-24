import { useSnackbar } from "notistack";
import { useEffect } from "react";

function TaskSection() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar("The app is not Completed Yet", { variant: "info" });
  }, []);

  return (
    <>
      <div className="task_container">Hello World</div>
    </>
  );
}

export default TaskSection;

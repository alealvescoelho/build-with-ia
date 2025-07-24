import { Alert, Snackbar } from "@mui/material";

interface Props {
  type: "error" | "warning" | "success" | "info";
  message: string;
}

export default function Notify({ type, message }: Props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open
      autoHideDuration={2000}
    >
      <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

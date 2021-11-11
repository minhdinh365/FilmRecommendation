import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog(props) {
  const content = [
    "Bạn đã đánh giá cho phim này!",
    "Bạn có muốn thay thế đánh giá trước đó bằng đánh giá hiện tại?",
  ];
  const [open, setOpen] = React.useState(true);

  const handleAgree = () => {
    props.updateComment();
    setOpen(false);
    props.handleCloseAlert();
  };

  const handleClose = () => {
    setOpen(false);
    props.handleCloseAlert();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content[0]}
            <br />
            {content[1]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleAgree} autoFocus>
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

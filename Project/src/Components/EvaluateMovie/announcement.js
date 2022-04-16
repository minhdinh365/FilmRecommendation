import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { withStyles } from '@material-ui/core/styles';

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

  const DialogTitleT = withStyles({
    root: {
      color: '#333',
      fontSize: '20px'
    },

  })(DialogTitle);
  const DialogContentTextT = withStyles({
    root: {
      color: '#333',
      fontSize: '15px'
    },

  })(DialogContentText);
  const ButtonT = withStyles({
    root: {
      fontSize: '15px'
    },

  })(Button);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitleT id="alert-dialog-title"
        >{"Thông báo"}</DialogTitleT>

        <DialogContent>
          <DialogContentTextT id="alert-dialog-description">
            {content[0]}
            <br />
            {content[1]}
          </DialogContentTextT>
        </DialogContent>
        <DialogActions>
          <ButtonT onClick={handleClose}>Hủy</ButtonT>
          <ButtonT onClick={handleAgree} autoFocus>
            Chấp nhận
          </ButtonT>
        </DialogActions>
      </Dialog>
    </div>
  );
}

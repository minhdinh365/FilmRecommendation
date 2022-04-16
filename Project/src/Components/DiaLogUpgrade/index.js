import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { listPackge } from '../../API/const';

const AlertDialog = (props) => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpgrage = () => {
        history.push('/upgrade_user')
    };

    const DiaLogMain = withStyles({
        root: {
            backgroundColor: 'rgb(37, 35, 35, 0.6)',
        }
    })(Dialog)

    const DialogTitleT = withStyles({
        root: {
            color: 'yellow',
            fontSize: '20px',
            fontWeight: 600,
        },

    })(DialogTitle);
    const DialogContentTextT = withStyles({
        root: {
            color: 'white   ',
            fontSize: '15px'
        },

    })(DialogContentText);
    const ButtonT = withStyles({
        root: {
            fontSize: '15px',
            fontWeight: 700,
            color: 'yellow'
        },

    })(Button);

    var date_start = new Date(props.data.date_start).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
    var date_end = new Date(props.data.date_end).toISOString().replace('-', '/').split('T')[0].replace('-', '/');

    return (
        <div>
            <ion-icon name="open" onClick={handleClickOpen}></ion-icon>
            <DiaLogMain
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        backgroundColor: '#333',
                        padding: '20px',
                    }
                }}
            >
                <DialogTitleT id="alert-dialog-title">
                    {"Thông tin gói cước"}
                </DialogTitleT>
                <DialogContent>
                    <DialogContentTextT id="alert-dialog-description">
                        Tên gói cước: Gói {props.data.package_up}
                    </DialogContentTextT>
                    <DialogContentTextT id="alert-dialog-description">
                        Giá cước: {listPackge[props.data.package_up - 1].package}
                    </DialogContentTextT>
                    <DialogContentTextT id="alert-dialog-description">
                        Ngày đăng kí: {date_start}
                    </DialogContentTextT>
                    <DialogContentTextT id="alert-dialog-description">
                        Ngày hết hạn: {date_end}
                    </DialogContentTextT>
                </DialogContent>
                <DialogActions>
                    <ButtonT onClick={handleClose}>Đã rõ</ButtonT>
                    <ButtonT onClick={handleUpgrage} autoFocus>
                        Thay đổi gói
                    </ButtonT>
                </DialogActions>
            </DiaLogMain>
        </div>
    );
}

export default AlertDialog;
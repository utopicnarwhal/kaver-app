import "./Login-button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState, Fragment } from "react";
import { Modal, Fade, Backdrop, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "10px",
      outline: "none",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function LoginButton() {
    const classes = useStyles();
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    return (
        <Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={loginModalOpen}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Авторизация</h2>
                    </div>
                </Fade>
            </Modal>
            <div className="Login-block">
                <FontAwesomeIcon icon={faSignInAlt} size="3x" className="Sign-in-icon" onClick={() => setLoginModalOpen(true)} />
            </div>
        </Fragment>
    );
}

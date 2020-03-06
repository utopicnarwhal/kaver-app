import "./Login-button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles, Theme, createStyles, TextField, Button, CircularProgress } from "@material-ui/core";
import { IAppState } from "../../redux/store";
import { connect } from "react-redux";
import { login, fetchUserData } from "../../redux/reducers/auth/auth_actions_creators";

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
        loginButton: {
            margin: theme.spacing(1),
        }
    }),
);

interface IProps {
    login: any;
    isAuth: boolean;
    isFetching: boolean | undefined;
}

function LoginButton(props: IProps) {
    const classes = useStyles();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.login(username, password);
    };

    const handleUsernameFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    let icon;
    if (props.isFetching) {
        icon = <CircularProgress />;
    } else if (props.isAuth) {
        icon = <FontAwesomeIcon icon={faSignOutAlt} size="3x" className="Sign-in-icon" />;
    } else {
        icon = <FontAwesomeIcon icon={faSignInAlt} size="3x" className="Sign-in-icon" />;
    }

    return (
        <>
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
                        <form onSubmit={handleLoginSubmit} className={"Auth-form"}>
                            <TextField id="username" label="Логин" variant="outlined" onChange={handleUsernameFieldChange} margin={"normal"}/>
                            <TextField id="password" label="Пароль" variant="outlined" onChange={handlePasswordFieldChange} margin={"normal"} type="password"/>
                            <Button variant="contained" type="submit" color="primary" className={"loginButton"}>Войти</Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
            <div className="Login-block" onClick={() => setLoginModalOpen(true)}>
                {icon}
            </div>
        </>
    );
}

// Make data available on props
const mapStateToProps = (store: IAppState) => {
    return {
        isAuth: store.authState.isAuth,
        isFetching: store.authState.isFetching,
    };
};

// Make functions available on props
const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (username: string, password: string) => dispatch(login(username, password)),
        fetchUserData: () => dispatch(fetchUserData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);

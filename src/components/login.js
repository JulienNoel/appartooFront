import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/login.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { redirect } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [fetchUrl, setFetchUrl] = useState("");
  const [error, setError] = useState(null);
  const [userExist, setUserExist] = useState(false)

  const tokenExist = window.localStorage.getItem('schtroumpfToken')

  async function handleSubmit() {
    isLogin ? setFetchUrl("login") : setFetchUrl("register");
    const data = await fetch(`/${fetchUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `user=${userName}&password=${password}`,
    });

    const body = await data.json();
    if (body.result) {
      window.localStorage.setItem('schtroumpfToken', body.user.token)
      setUserExist(true)
    } else {
      setError(body.error)
      
    }
  }


  if(userExist || tokenExist){
    return redirect('/profil')
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <TextField
          sx={{ width: 280 }}
          id="outlined-basic"
          label="Mail"
          variant="outlined"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <TextField
          sx={{ width: 280 }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button sx={{ width: 280 }} variant="contained" onClick={handleSubmit}>
          {isLogin ? "Schtroumpf Login" : "Schtroumpf Register"}
        </Button>
        {!error || (
          <Stack sx={{ width: 280 }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
        )}

        <div onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? (
            <p>Pas de Compte ?</p>
          ) : (
            <p>J'ai déja un compte je connais le grand Schtroumpf</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

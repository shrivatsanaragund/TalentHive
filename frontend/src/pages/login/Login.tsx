import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface MyLoginProps {
  t: (key: string) => string;
}

function MyLogin({ t }: MyLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
toast.success("Logged in successfully!");      
if(res.data.isAdmin===true){
  setTimeout(() => {
    navigate("/admin");
  }, 1000);
      }else{
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }     
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data);
      } else {
        // Handle other types of errors if necessary
        toast.error("Error logging user. Please try again.");
        console.error("Non-Axios error occurred:", err);
      }
    }
  };
  console.log("Translation object:", i18n.getDataByLanguage('en'));
  console.log("Translated text:", t('welcome'));

  return (
    
    <div className="my-login">
      <form onSubmit={handleSubmit}>
      
        <h1>{t('login.Welcome')}</h1>

        <label htmlFor="my-username">
          <FontAwesomeIcon icon={faUser} />
          {t('login.Username')}
        </label>
        <input
          id="my-username"
          name="my-username"
          type="text"
          placeholder={t('login.EnterU')}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="my-password">
          <FontAwesomeIcon icon={faLock} />
          {t('login.Password')}
        </label>
        <input
          id="my-password"
          name="my-password"
          type="password"
          placeholder={t('login.EnterP')}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">{t('login.Login')}</button>
      </form>

      <div className="my-options">
        <a href="/register">{t('login.Account')}</a>
        <a href="/my-forgot-password">{t('login.Forgot')}</a>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MyLogin;

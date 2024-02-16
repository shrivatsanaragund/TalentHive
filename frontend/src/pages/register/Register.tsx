import React, { useState, ChangeEvent, FormEvent } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faUnlockAlt,
  faMobileAlt,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function Register() {
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    description: "",
    skills: "",
    certification: "",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });

    // Display a success toast when the seller account is activated
    if (e.target.checked) {
      toast.success(t('register.Seller account activated successfully!'));
    } else {
      toast.warning(t('register.Seller account deactivated.'));
    }
  };

  const handleTermsChange = () => {
    setAgreeToTerms((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreeToTerms) {
      toast.error(t('register.Please agree to terms and conditions.'));
      return;
    }

    const url = await upload(file);
    try {
      await newRequest.post("/register", {
        ...user,
        img: url,
      });

      // Show a success notification
      toast.success(t('register.User created successfully!'));

      // Delay the navigation
      setTimeout(() => {
        navigate("/");
      }, 1000); // Adjust the delay as needed
    } catch (err) {
      console.log(err);
      // Show an error notification
      toast.error(t('register.Error creating user. Please try again.'));
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>{t('register.Create Account')}</h1>
          <label htmlFor="name">
            <FontAwesomeIcon icon={faUser} />
            {t('register.Name')} <span className="required">*</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder={t('register.Name')}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="username">
            <FontAwesomeIcon icon={faIdCard} />
            {t('register.Username')} <span className="required">*</span>
          </label>
          <input
            name="username"
            type="text"
            placeholder={t('register.Username')}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} />
            {t('register.Email')} <span className="required">*</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder={t('register.Email')}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">
            <FontAwesomeIcon icon={faUnlockAlt} />
            {t('register.Password')} <span className="required">*</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder={t('register.Password')}
            onChange={handleChange}
            required
          />

          <label htmlFor="profile-picture">
            <FontAwesomeIcon icon={faIdCard} />
            {t('register.Profile Picture')}
          </label>
          <input
            id="profile-picture"
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />

          <label htmlFor="country">
            <FontAwesomeIcon icon={faIdCard} />
            {t('register.Country')}
          </label>
          <input
            name="country"
            type="text"
            placeholder={t('register.Country')}
            onChange={handleChange}
          />

          <label htmlFor="phone">
            <FontAwesomeIcon icon={faMobileAlt} />
            {t('register.Phone Number')} <span className="required">*</span>
          </label>
          <input
            name="phone"
            type="text"
            placeholder={t('register.Phone Number')}
            onChange={handleChange}
            required
          />

          <label
            htmlFor="terms"
            className={`checkbox-label ${agreeToTerms ? "checked" : ""}`}
          >
            <input
              id="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={handleTermsChange}
            />
            {t('register.I agree to terms and conditions')}<span className="required">*</span>
          </label>

          <button
            type="submit"
            className={`${!agreeToTerms ? "disabled" : ""}`}
            disabled={!agreeToTerms}
          >
            {t('register.Sign Up')}
          </button>
        </div>
        <div className="right">
          <h1>{t('register.I want to become a seller')}</h1>

          <div className="toggle seller-section">
            <label htmlFor="activate-seller">{t('register.Activate the seller account')}</label>
            <label className="switch">
              <input
                id="activate-seller"
                type="checkbox"
                onChange={handleSeller}
              />
              <span className="slider round"></span>
            </label>
          </div>

          {user.isSeller && (
            <>
              <label htmlFor="skills">
                <FontAwesomeIcon icon={faIdCard} />
                {t('register.Skills')}<span className="required">*</span>
              </label>
              <input
                name="skills"
                type="text"
                placeholder={t('register.Skills')}
                onChange={handleChange}
                required
              />

              <label htmlFor="certification">
                <FontAwesomeIcon icon={faIdCard} />
                {t('register.Certification')}
              </label>
              <input
                name="certification"
                type="text"
                placeholder={t('register.Certification')}
                onChange={handleChange}
              />
            </>
          )}

          {user.isSeller && (
            <>
              <label htmlFor="description">
                <FontAwesomeIcon icon={faIdCard} />
                {t('register.Description')}
              </label>
              <textarea
                id="description"
                placeholder={t('register.Write about yourself')}
                name="description"
                cols={30}
                rows={10}
                onChange={handleChange}
              ></textarea>
            </>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;

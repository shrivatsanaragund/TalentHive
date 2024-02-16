import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useTranslation } from 'react-i18next';
import "./Navbar.scss";
import { useIndex } from "../../context/currentIndexCon";


interface User {
  isSeller: boolean;
  img: string | null;
  username: string | null;
}

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
const {t} = useTranslation();
  const [activeNavbar, setActiveNavbar] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const {currentIndex} = useIndex();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setActiveNavbar(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { pathname } = useLocation();

  const currentUser: User | null = JSON.parse(localStorage.getItem("currentUser") || "null");

  const navigate = useNavigate();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }

  const handleLogout = async () => {
    try {
      await newRequest.post("/logout");
      localStorage.setItem("currentUser", JSON.stringify(null));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={activeNavbar || pathname !== "/" ? `navbar active bg-${currentIndex}` : `navbar bg-${currentIndex}`}>
      <div className="nav-container">
        <div className="logo">
          <Link className="link" to="/">
            <span>{t('navbar.TalentHive')}</span>
          </Link>
        </div>
        <div className="navbar-link">
          <div className="language-dropdown">
            <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language} className={`select-lang bg-${currentIndex}`}>
              <option value="en">{t('navbar.English')}</option>
              <option value="fr">{t('navbar.French')}</option>
              {/* Add more language options as needed */}
            </select>
          </div>
          {currentUser ? (
            <div className="user" onClick={() => setOpenMenu(!openMenu)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {openMenu && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/myJobs">
                        {t('navbar.MyJobPosts')}
                      </Link>
                      <Link className="link" to="/add">
                        {t('navbar.AddNewJobPost')}
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    {t('navbar.Orders')}
                  </Link>
                  <Link className="link" to="/messages">
                    {t('navbar.Messages')}
                  </Link>
                  <button className="button-logout link" onClick={handleLogout}>
                    {t('navbar.Logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                <button className={`bg-${currentIndex}`}>{t('navbar.SignIn')}</button>
              </Link>
              <Link className="link" to="/register">
                <button className={`bg-${currentIndex}`}>{t('navbar.Join')}</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(activeNavbar || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className={`link menuLink  bg-${currentIndex}`} to="/jobs?cat=GraphicsDesign">
              {t('navbar.GraphicsDesign')}
            </Link>
            <Link className={`link menuLink  bg-${currentIndex}`} to="/jobs?cat=ProgrammingTech">
              {t('navbar.ProgrammingTech')}
            </Link>
            <Link className={`link menuLink  bg-${currentIndex}`} to="/jobs?cat=DigitalMarketing">
              {t('navbar.DigitalMarketing')}
            </Link>
            <Link className={`link menuLink  bg-${currentIndex}`} to="/jobs?cat=VideoAnimation">
              {t('navbar.VideoAnimation')}
            </Link>
            <Link className={`link menuLink  bg-${currentIndex}`} to="/jobs?cat=WritingTranslation">
              {t('navbar.WritingTranslation')}
            </Link>
            <Link className={`link menuLink  bg-${currentIndex}`} to="/jobs?cat=MusicAudio">
              {t('navbar.MusicAudio')}
            </Link>
            <Link className={`link menuLink  bg-${currentIndex}`} to="/jobs?category=Business">
              {t('navbar.Business')}
            </Link>
            <Link className={`link menuLink  bg-${currentIndex}`} to="/jobs?category=Data">
              {t('navbar.Data')}
            </Link>
            <Link className={`link menuLink  bg-${currentIndex}`} to="/jobs?category=Photography">
              {t('navbar.Photography')}
            </Link>
          </div>
        </>
      )}
    </div>
  );
  
}

export default Navbar;

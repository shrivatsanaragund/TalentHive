import React from "react";
import "./Footer.scss";
import { useIndex } from "../../context/currentIndexCon";
import { useTranslation } from "react-i18next";

function Footer() {
    const { t } = useTranslation();
    const {currentIndex} = useIndex();
    return (
        <div className="footer">
          <div className="container2">
            <div className="footer-content">
              <h3>{t('footer.Categories')}</h3>
              <ul className="list">
                <li>{t('footer.Graphics & Design')}</li>
                <li>{t('footer.Digital Marketing')}</li>
                <li>{t('footer.Writing & Translation')}</li>
                <li>{t('footer.Video & Animation')}</li>
                <li>{t('footer.Music & Audio')}</li>
                <li>{t('footer.Programming & Tech')}</li>
                <li>{t('footer.Data')}</li>
                <li>{t('footer.Business')}</li>
                <li>{t('footer.Lifestyle')}</li>
                <li>{t('footer.Photography')}</li>
                <li>{t('footer.Sitemap')}</li>
              </ul>
            </div>
            <div className="footer-content">
              <h3>{t('footer.Support')}</h3>
              <ul className="list">
                <li>{t('footer.Help & Support')}</li>
                <li>{t('footer.Trust & Safety')}</li>
                <li>{t('footer.Selling on Talent Hive')}</li>
                <li>{t('footer.Buying on Talent Hive')}</li>
                <li>{t('footer.Investor Relations')}</li>
                <li>{t('footer.Contact Sales')}</li>
              </ul>
            </div>
            <div className="footer-content">
              <h3>{t('footer.About')}</h3>
              <ul className="list">
                <li>{t('footer.Press & News')}</li>
                <li>{t('footer.Partnerships')}</li>
                <li>{t('footer.Privacy Policy')}</li>
                <li>{t('footer.Terms of Service')}</li>
                <li>{t('footer.Intellectual Property Claims')}</li>
              </ul>
            </div>
            <div className="footer-content">
              <h3>{t('footer.Community')}</h3>
              <ul className="list">
                <li>{t('footer.Customer Success Stories')}</li>
                <li>{t('footer.Community hub')}</li>
                <li>{t('footer.Forum')}</li>
                <li>{t('footer.Events')}</li>
                <li>{t('footer.Blog')}</li>
                <li>{t('footer.Influencers')}</li>
                <li>{t('footer.Invite a Friend')}</li>
                <li>{t('footer.Community Standards')}</li>
              </ul>
            </div>
          </div>
          <div className={`bottom-bar bg-${currentIndex}`}>
            <p>&copy; 2023 Talent Hive. {t('footer.All rights reserved')}</p>
            <div className="right">
              <div className="social">
                <button className="footerLinks"><img src="/img/twitter.png" alt="" /></button>
                <button className="footerLinks"><img src="/img/facebook.png" alt="" /></button>
                <button className="footerLinks"><img src="/img/linkedin.png" alt="" /></button>
                <button className="footerLinks"><img src="/img/pinterest.png" alt="" /></button>
                <button className="footerLinks"><img src="/img/instagram.png" alt="" /></button>
              </div>
            </div>
          </div>
        </div>
      );
      
}
 
export default Footer;
import React from "react";
import "./Job.scss";
import { Slider } from "infinite-react-carousel";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import { useTranslation } from 'react-i18next';

function Job() {
  const { t } = useTranslation();
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const { isLoading, error, data } = useQuery({
    queryKey: ["job"],
    queryFn: () =>
      newRequest.get(`/job-posts/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="job">
      {isLoading ? (
        t('job.loading')
      ) : error ? (
        t('job.Something went wrong!')
      ) : (
        <div className="container">
          <div className="left">
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              t('job.loading')
            ) : errorUser ? (
              t('job.Something went wrong!')
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalRating / data.rating) && (
                  <div className="stars">
                    {Array(Math.round(data.totalRating / data.rating))
                      .fill(undefined)
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalRating / data.rating)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img: string) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>{t('job.About This Job')}</h2>
            <p>{data.description}</p>
            {isLoadingUser ? (
              t('job.loading')
            ) : errorUser ? (
              t('job.Something went wrong!')
            ) : (
              <div className="seller">
                <h2>{t('job.About The Seller')}</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalRating / data.rating) && (
                      <div className="stars">
                        {Array(Math.round(data.totalRating / data.rating))
                          .fill(undefined)
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalRating / data.rating)}
                        </span>
                      </div>
                    )}
                    <button className="btnclr">Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">{t('job.From')}</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">{t('job.Member since')}</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">{t('job.Avg. response time')}</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">{t('job.Last delivery')}</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">{t('job.Languages')}</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.description}</p>
                </div>
              </div>
            )}
            <Reviews jobId={id || ''} />
          </div>
          <div className="right">
            <div className="price">
              <h3 className="blackc">{data.shortTitle}</h3>
              <h2>$ {data.cost}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} {t('job.Days Delivery')}</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span
                  className="desc">{data.revisionTotal} {t('job.Revisions')}</span>
              </div>
            </div>
            <div className="features">
              {data.jobFeatures.map((feature: string) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {currentUser.isSeller === false ? (
  <Link to={`/pay/${id}`}>
    <button>{t('job.Continue')}</button>
  </Link>
) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Job;

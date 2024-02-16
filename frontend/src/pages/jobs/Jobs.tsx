import React, { useEffect, useRef } from "react";
import "./Jobs.scss";
import JobCard from "../../components/jobCard/JobCard";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";


function Jobs() {
  const { t } = useTranslation();
  const minBudgetRef = useRef<HTMLInputElement>(null);
  const maxBudgetRef = useRef<HTMLInputElement>(null);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const selectedCategory = queryParams.get("cat");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["jobs", selectedCategory],
    queryFn: () =>
      newRequest
        .get(
          `/job-posts?cat=${selectedCategory}&min=${minBudgetRef.current!.value}&max=${maxBudgetRef.current!.value}`
        )
        .then((res) => res.data),
  });

  useEffect(() => {
    refetch();
  }, [selectedCategory]);

  const applyFilters = () => {
    refetch();
  };

  const getBackgroundImage = (category: string | null): string => {
    // Define mappings between categories and background images
    const categoryBackgrounds = {
      "GraphicsDesign": '/img/graphic.PNG',
      "Data": '/img/dataimg.PNG',
      "ProgrammingTech":'/img/program.PNG',
      "DigitalMarketing":'/img/digitalmarket.PNG',
      "VideoAnimation":'/img/videoandanimation.PNG',
      "WritingTranslation":'/img/writentranslate.PNG',
      "Business":'/img/businessimg.PNG',
      "Photography":'/img/photoimg.PNG',
      "MusicAudio" : "/img/musicnrec.PNG"
    };

    // Return the background image for the given category
    return category ? categoryBackgrounds[category] || '' : '';
  };

  // Get the background image based on the selected category
  const backgroundImg = getBackgroundImage(selectedCategory);

  return (
    <div className="jobs">
      <div className="container">
        <h1 style={{ backgroundImage: `url(${backgroundImg})` }} className="selected-category">{selectedCategory}</h1>
        <div className="menu">
          <div className="left">
            <span>{t('jobs.Filter By')}</span>
            <input ref={minBudgetRef} type="number" placeholder={t('jobs.Min Price')} />
            <input ref={maxBudgetRef} type="number" placeholder={t('jobs.Max Price')} />
            <span className="filterIcon" onClick={applyFilters}>
              <FontAwesomeIcon icon={faFilter} />
            </span>
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? t('jobs.loading')
            : error
            ? t('jobs.Something went wrong!')
            : (data as any[]).map((job) => (
                <JobCard key={job._id} item={job} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;

import React, { useReducer, useState } from "react";
import "./Add.scss";
import { addPostsReducer, INITIAL_STATE } from "../../reducer/addPostsReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient, InvalidateQueryFilters } from "react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Add = () => {
  const { t } = useTranslation();
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(addPostsReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const coverImage = singleFile ? await upload(singleFile) : null;

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { coverImage, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (job) => {
      return newRequest.post("/job-posts", job);
    },
    onSuccess: () => {
      console.log("Mutation Success:");
      queryClient.invalidateQueries(["jobs"] as InvalidateQueryFilters);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myJobs");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>{t('Add New Job')}</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">{t('add.Title')}</label>
            <input
              type="text"
              name="title"
              placeholder={t('Brief descriptions to introduce your service to customers')}
              onChange={handleChange}
            />
            <label htmlFor="">{t('Category')}</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="GraphicsDesign">Graphics & Design</option>
              <option value="ProgrammingTech">Programming & Tech</option>
              <option value="DigitalMarketing">Digital Marketing</option>
              <option value="VideoAnimation">Video Animation</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">{t('Cover Image')}</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files ? e.target.files[0] : null)}
                />
                <label htmlFor="">{t('Upload Images')}</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? t('Uploading') : t('Upload')}
              </button>
            </div>
           
            <label htmlFor="">{t('Description')}</label>
            <textarea
              name="description"
              id=""
              placeholder={t('Brief descriptions to introduce your service to customers')}
              cols={0}
              rows={16}
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>{t('Create')}</button>
          </div>
          <div className="details">
            <label htmlFor="">{t('Service Title')}</label>
            <input
              type="text"
              name="shortTitle"
              placeholder={t('One-page web design')}
              onChange={handleChange}
            />
            <label htmlFor="">{t('Short Description')}</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder={t('Short description of your service')}
              cols={30}
              rows={10}
            ></textarea>
            <label htmlFor="">{t('Delivery Time (e.g. 3 days)')}</label>
            <input type="number" name="duration" onChange={handleChange} />
            <label htmlFor="">{t('Revision Number')}</label>
            <input
              type="number"
              name="revisionTotal"
              onChange={handleChange}
            />
            <label htmlFor="">{t('Add Features')}</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder={t('add.e.g. page design')} />
              <button type="submit">{t('Add')}</button>
            </form>
            <div className="addedFeatures">
              {state?.jobFeatures?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">{t('Price')}</label>
            <input type="number" onChange={handleChange} name="cost" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;

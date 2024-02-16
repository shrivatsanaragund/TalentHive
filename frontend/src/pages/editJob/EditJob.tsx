import React, { useReducer, useState } from "react";
import "./EditJob.scss";
import { addPostsReducer, INITIAL_STATE } from "../../reducer/addPostsReducer";
import upload from "../../utils/upload";
import {
  useMutation,
  useQueryClient,
  InvalidateQueryFilters,
} from "react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditJob = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  // Use the editedJob to initialize the state or perform any other logic

  const { isLoading, error, data } = useQuery({
    queryKey: ["edit"],
    queryFn: () =>
      newRequest.get(`/job-posts/${id}`).then((res) => {
        return res.data;
      }),
  });

  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(addPostsReducer, data);

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
      // Use PUT request to update the existing job
      return newRequest.put(`/job-posts/${id}`, job);
    },
    onSuccess: () => {
      console.log("Mutation Success:");
      queryClient.invalidateQueries(["jobs"] as InvalidateQueryFilters);
      toast.success(t("Update Successful")); // Import toast from your toast library
      navigate("/myJobs");
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  return (
    <div className="add">
      <div className="container">
        <h1>{t("add.Add New Job")}</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">{t("add.Title")}</label>
            <input
              type="text"
              name="title"
              placeholder={t(
                "add.Brief descriptions to introduce your service to customers"
              )}
              onChange={handleChange}
              value={state?.title}
            />
            <label htmlFor="">{t("add.Category")}</label>
            <select
              name="cat"
              id="cat"
              onChange={handleChange}
              value={state?.cat}
            >
              <option value="Graphics & Design">
                {t("add.Graphics & Design")}
              </option>
              <option value="Programming & Tech">
                {t("add.Programming & Tech")}
              </option>
              <option value="Digital Marketing">
                {t("add.Digital Marketing")}
              </option>
              <option value="Video and Animation">
                {t("add.Video and Animation")}
              </option>
              <option value="Writing and Translation">
                {t("add.Writing and Translation")}
              </option>
              <option value="Music & Audio">{t("add.Music & Audio")}</option>
              <option value="Business">
                {t("add.Business")}
              </option>
              <option value="Data">
                {t("add.Data")}
              </option>
              <option value="Photography">
                {t("add.Photography")}
              </option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">{t("add.Cover Image")}</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setSingleFile(e.target.files ? e.target.files[0] : null)
                  }
                />
                {state?.coverImage && (
                  <div>
                    <strong>{t("Existing Cover Image")}:</strong>
                    <div>
                      <span>{state?.coverImage}</span>
                    </div>
                  </div>
                )}
                <label htmlFor="">{t("add.Upload Images")}</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
                {state?.images && (
                  <div>
                    <strong>{t("Existing Images")}:</strong>
                    <div>
                      {state?.images.map((image, index) => (
                        <span key={index}>{image}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
            </div>
            <button onClick={handleUpload}>
                {uploading ? t("add.Uploading") : t("add.Upload")}
              </button>
            <label htmlFor="">{t("add.Description")}</label>
            <textarea
              name="description"
              id=""
              placeholder={t(
                "add.Brief descriptions to introduce your service to customers"
              )}
              cols={0}
              rows={16}
              onChange={handleChange}
              value={state?.description || ""}
            ></textarea>
            <button onClick={handleUpdate}>{t("Update")}</button>
          </div>
          <div className="details">
            <label htmlFor="">{t("add.Service Title")}</label>
            <input
              type="text"
              name="shortTitle"
              placeholder={t("add.One-page web design")}
              onChange={handleChange}
              value={state?.shortTitle || ""}
            />
            <label htmlFor="">{t("add.Short Description")}</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder={t("add.Short description of your service")}
              cols={30}
              rows={10}
            ></textarea>
            <label htmlFor="">{t("add.Delivery Time (e.g. 3 days)")}</label>
            <input
              type="number"
              name="duration"
              onChange={handleChange}
              value={state?.duration || ""}
            />
            <label htmlFor="">{t("add.Revision Number")}</label>
            <input
              type="number"
              name="revisionTotal"
              onChange={handleChange}
              value={state?.revisionTotal || ""}
            />
            <label htmlFor="">{t("add.Price")}</label>
            <input
              type="number"
              onChange={handleChange}
              name="cost"
              value={state?.cost || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJob;

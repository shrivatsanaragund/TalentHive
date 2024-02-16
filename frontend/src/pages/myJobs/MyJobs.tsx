import React, { useEffect, useRef } from "react";
import "./MyJobs.scss";
import MyJobCard from "../../components/MyjobCard/MyJobCard";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Job from "../job/Job";
import { useMutation, useQueryClient,InvalidateQueryFilters } from "react-query";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

function MyJobs() {
   
  const minBudgetRef = useRef<HTMLInputElement>(null);
  const maxBudgetRef = useRef<HTMLInputElement>(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: "jobs", // Use a fixed key to fetch all jobs
    queryFn: () =>
      newRequest
        .get(
          `/job-posts?min=${minBudgetRef.current!.value}&max=${maxBudgetRef.current!.value}&userId=${currentUser?._id}` 
        )
        .then((res) => res.data),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/job-posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myJobs"]);
      alert("Job Post Deleted Successfully");
    },
  });

  
  const editMutation = useMutation({
    mutationFn: (id) => {
      // Replace the following line with your actual request logic for editing a job
      return newRequest.put(`/job-posts/${id}`, { /* your update data */ });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myJobs"]);
      alert("Job Post Edited Successfully");
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
    mutation.mutate(id);
    }
  };
 
  const handleEdit = (id) => {
    // Add logic to handle the edit action
    if (window.confirm("Are you sure you want to edit this job post?")) {
      // You can perform any additional logic before making the edit request
      // For now, let's just initiate the edit mutation
      editMutation.mutate(id);
      
      // Retrieve the job details based on the job ID (you may need to fetch it)
      const editedJob = data.find(job => job._id === id);
      
      // Navigate to the "Add" page with pre-filled information
      navigate(`/editJob/${editedJob._id}`);
    }
  };

  useEffect(() => {
    refetch();
  }, []); // No specific dependency for fetching all jobs

  const applyFilters = () => {
    refetch();
  };

  return (
    <div className="myjobs">
      <div className="container">
        <h1>All Jobs</h1>
        <div className="menu">
          <div className="left">
            <span>Filter By</span>
            <input ref={minBudgetRef} type="number" placeholder="Min Price" />
            <input ref={maxBudgetRef} type="number" placeholder="Max Price" />
            <span className="filterIcon" onClick={applyFilters}>
              <FontAwesomeIcon icon={faFilter} />
            </span>
          </div>
        </div>
        <div className="cards">
  {isLoading ? (
    "loading"
  ) : error ? (
    "Something went wrong!"
  ) : (
    (data as any[]).map((job) => (
      <div key={job._id} className="jobContainer">
        <MyJobCard item={job} />
       

        <div className="deleteImage">
          <img src="./img/deleteimage.svg" alt="Delete" onClick={() => handleDelete(job._id)}/>
        </div>

        <div className="editImage">
        
                    <img src="./img/editButton.svg" alt="Edit" onClick={() => handleEdit(job._id)} />
                          </div>
        
      </div>
    ))
  )}
</div>

       
      </div>
    </div>
  );
}

export default MyJobs;
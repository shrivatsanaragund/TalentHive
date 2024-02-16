// Import necessary modules from React and react-query
import { useMutation, useQuery, useQueryClient } from "react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

// Functional component representing a single message conversation
const Message = () => {
  // Extract the 'id' parameter from the URL using react-router's useParams hook
  const { id } = useParams<{ id: string }>();

  // Get the current user information from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // Initialize the react-query queryClient
  const queryClient = useQueryClient();

  // Use the react-query useQuery hook to fetch message data based on the 'id'
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  // Use the react-query useMutation hook to handle message submission
  const mutation = useMutation<void, Error, { conversationId: string; description: string }>({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      // Invalidate the queries related to messages after successful submission
      queryClient.invalidateQueries(["messages"]);
    },
  });

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textarea = e.currentTarget[0] as HTMLTextAreaElement;
    const message = {
      conversationId: id || "",
      description: textarea.value,
    };
    mutation.mutate(message);
    textarea.value = "";
  };

  // Render the Message component
  return (
    <div className="message">
      <div className="container">
        {/* Breadcrumbs linking back to the Messages page */}
        <span className="breadcrumbs">
          <Link to="/messages" className="msgLink">Messages</Link>
        </span>
        {/* Display loading or error messages during data fetching */}
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          // Display the message history
          // <div className="messages">
          //   {data.map((m) => (
          //     <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>

          //       {currentUser.isBuyer ? (
          //         <img
          //           src="https://play-lh.googleusercontent.com/Hz5jiybLawpC0GSXNy7hWtCL1QVpj3Q79rqEWfsUFit7eRHgEYARFH07J5u3awoXagE"  
          //           alt=""
          //         />
          //       ) : (
          //         <img
          //           src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"  
          //           alt=""
          //         />
          //       )}


          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                {m.userId === currentUser._id ? (
                  // Display this image if the message is sent by the current user
                  <img
                    src="https://play-lh.googleusercontent.com/Hz5jiybLawpC0GSXNy7hWtCL1QVpj3Q79rqEWfsUFit7eRHgEYARFH07J5u3awoXagE"
                    alt=""
                  />
                ) : (
                  // Display this image if the message is sent by the seller
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
                    alt=""
                  />
                )}

                {/* <img
                  src="https://play-lh.googleusercontent.com/Hz5jiybLawpC0GSXNy7hWtCL1QVpj3Q79rqEWfsUFit7eRHgEYARFH07J5u3awoXagE"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww
                  "
                  alt=""
                /> */}
                <p>{m.description}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        {/* Form for writing and submitting a new message */}
        <form className="write" onSubmit={handleSubmit}>
          <textarea placeholder="Send a message..." />
          {/* Button to submit the form and send the message */}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

// Export the Message component as the default export
export default Message;

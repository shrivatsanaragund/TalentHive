// Import necessary modules and interfaces
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import moment from "moment";
import "./Messages.scss";

// Interface representing a conversation
interface Conversation {
  id: number;
  buyerId: number;
  sellerId: number;
  readByBuyer: boolean;
  readBySeller: boolean;
  lastMessage: string;
  updatedAt: string;
}

// Interface representing user display names
interface UserDisplayNames {
  buyerName: string;
  sellerName: string;
}

// Functional component representing the Messages page
const Messages: React.FC = () => {
  // Get the current user information from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // Initialize the react-query queryClient
  const queryClient = useQueryClient();

  // State to store user display names
  const [userDisplayNames, setUserDisplayNames] = useState<UserDisplayNames[]>([]);

  // Use the react-query useQuery hook to fetch conversation data
  const { isLoading, error, data } = useQuery<Conversation[], Error>({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get("/conversations").then((res) => {
        return res.data;
      }),
  });

  // Use the react-query useMutation hook to handle marking conversations as read
  const mutation = useMutation<void, unknown, number>({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      // Invalidate the queries related to conversations after successful update
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  // Function to handle marking a conversation as read
  const handleRead = (id: number) => {
    mutation.mutate(id);
  };

  // Fetch buyer and seller names based on IDs
  useEffect(() => {
    const fetchUserDisplayNames = async () => {
      const names = await Promise.all(
        data?.map(async (conversation) => {
          const buyerResponse = await newRequest.get(`/users/${conversation.buyerId}`);
          const sellerResponse = await newRequest.get(`/users/${conversation.sellerId}`);
          return {
            buyerName: buyerResponse.data.name,
            sellerName: sellerResponse.data.name,
          };
        }) || []
      );

      setUserDisplayNames(names);
    };

    // Fetch user display names only when conversation data is available
    if (data) {
      fetchUserDisplayNames();
    }
  }, [data]);

  // Render the Messages component
  return (
    <div className="messages">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">Error loading messages</div>
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr className="messageHeader">
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((c, index) => (
                <tr
                  className={
                    ((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) &&
                    "active"
                  }
                  key={c.id}
                >
                  <td>{currentUser.isSeller ? userDisplayNames[index]?.buyerName : userDisplayNames[index]?.sellerName}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className="link">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td className="date">{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button className="read" onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Export the Messages component as the default export
export default Messages;

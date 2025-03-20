import React from "react";
import { FaBell } from "react-icons/fa";

const ProfileHeader = ({ user }) => {
  // Ensure user exists before accessing properties
  const userName = user?.name || "Guest"; // Default to 'Guest' if user is undefined
  const profileImage = user?.profilePicture || "/default-avatar.png"; // Default image path

  return (
    <div className="profile-header">
      {/* Display profile image */}
      <img
        src={profileImage}
        alt={`${userName}'s profile`}
        className="profile-image" // Optionally add a class for styling
      />
      <div className="user-info">
        <h2>Welcome, {userName}</h2>
      </div>
      <div className="notification-container">
        <FaBell className="notification-icon" />
        {/* Optionally, you can add a notification badge */}
        {/* <span className="notification-badge">3</span> */}
      </div>
    </div>
  );
};

export default ProfileHeader;

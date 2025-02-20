import React from 'react';

const ExpandedComponent = ({ data }) => {

  if (!data) return null;


    const profileImageUrl = data.profile
    ? data.profile.props.src  
    : 'https://via.placeholder.com/100'; 
  return (
    <div style={styles.card}>
      {/* Profile Photo */}
      <div style={styles.profileContainer}>
        <img
          src={profileImageUrl}
          alt="Profile"
          style={styles.profileImage}
        />
      </div>

      {/* Employee Details */}
      <h3 style={styles.title}>Employee Details</h3>
      <div style={styles.cardContent}>
        <div style={styles.cardRow}>
          <strong>ID:</strong> <span>{data.id}</span>
        </div>
        <div style={styles.cardRow}>
          <strong>Name:</strong> <span>{data.name}</span>
        </div>
        <div style={styles.cardRow}>
          <strong>Birthdate:</strong> <span>{data.birthdate}</span>
        </div>
        <div style={styles.cardRow}>
          <strong>Department:</strong> <span>{data.department}</span>
        </div>
        <div style={styles.cardRow}>
          <strong>Age:</strong> <span>{data.age}</span>
        </div>
        <div style={styles.cardRow}>
          <strong>Salary:</strong> <span>{data.salary}</span>
        </div>
        <div style={styles.cardRow}>
          <strong>Sex:</strong> <span>{data.sex}</span>
        </div>
      </div>
    </div>
  );
};


const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    marginBottom: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    transition: 'max-height 0.3s ease-out, padding 0.3s ease-out',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileContainer: {
    marginBottom: '15px',
  },
  profileImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #007bff',
    marginTop: '10px',
  },
  title: {
    marginBottom: '10px',
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-evenly',
    fontSize: '14px',
    color: '#555',
    width: '140px',
    marginBottom: '5px',
  },
};

export default ExpandedComponent;

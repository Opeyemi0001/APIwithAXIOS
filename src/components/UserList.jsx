import React, { useEffect, useState } from 'react'
import axios from 'axios';

const UserList = () => {

  const [data, setData] = useState([]); //where to store the returned data
  const [error, setError] = useState(null); // where to store the coming error
  const limit = 4

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data); //set the data directly
      } catch (err) {
        setError(err.message); //store the error message
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data ? (
        <div>
          <h3>User Data:</h3>
          <div style={{display:"flex"}}>
            {data.slice(0, limit).map((user) => (
              <div key={user.id}>
                <div   style={{height:"15rem", border:"1px solid black", margin:"1.5rem", borderRadius:"1.5rem", padding:"0.5rem"}}>
                  <p> <strong>ID:</strong> {user.id}</p>
                  <p> <strong>Name:</strong> {user.name}</p>
                  <p> <strong>Email Address:</strong> {user.email} </p>
                  <p> <strong>Address:</strong> {`${user.address.street}, ${user.address.city}`} </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      ) : (
        <p>Loading...</p> //Display while fetching data
      )}
    </div>
  );
};

export default UserList
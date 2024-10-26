import React, { useEffect, useState } from 'react';

const HomePage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:6969/api/test')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Welcome to the Party Planner App</h1>
            <p>{data ? data.message : "Loading..."}</p>
        </div>
    );
};

export default HomePage;

import React from 'react';
import Url from '../UrlComponent/UrlComponent';
const Dashboard = (props) => {
    return (
        <div>
            {props.urls.map((url) => {
                return <Url {...url} />
            })}
        </div>
    );
};

export default Dashboard;
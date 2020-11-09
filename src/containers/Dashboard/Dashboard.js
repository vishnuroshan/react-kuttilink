import React, { Component } from 'react';
import Url from '../../components/UrlComponent/UrlComponent';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.urls.map((url) => {
                    return <Url
                        key={url._id}
                        {...url}
                    />
                })}
            </React.Fragment>
        );
    }
};

export default Dashboard;
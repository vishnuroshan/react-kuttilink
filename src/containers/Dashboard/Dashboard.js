import React, { Component } from 'react';
import Url from '../../components/UrlComponent/UrlComponent';
import Aux from '../../hoc/Aux';

class Dashboard extends Component {
    render() {
        return (
            <Aux>
                {this.props.urls.map((url) => {
                    return <Url
                        key={url._id}
                        {...url}
                    />
                })}
            </Aux >
        );
    }
};

export default Dashboard;
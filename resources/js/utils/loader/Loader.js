import React from 'react';
import ReactLoading from 'react-loading';

import classes from './Loader.module.css';

const Loader = () => {
    return(
        <div className={classes.Loader}>
            <div className={classes.Icon}>
                <ReactLoading type='spin' color='#2f8e9b'/>
            </div>
        </div>
    );
};

export default Loader;

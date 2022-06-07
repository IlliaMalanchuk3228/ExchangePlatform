import React from 'react';
import classes from './Profile.module.css';

const ProfileWrapperAuthorized = (props) => {

    return (
        <>
            <p>hello</p>
            <div style={{ marginLeft: '15px' }}>
                <p className={classes.Name}>
                    <a href="/">{JSON.parse(localStorage.getItem('userData')).username}</a>
                </p>
            </div>
            <div
                className={classes.LogOut}
                /* eslint-disable-next-line react/prop-types */
                onClick={props.clicked}>
                <i className="fa fa-sign-out" aria-hidden="true" ></i>
            </div>
        </>
    );
};

export default ProfileWrapperAuthorized;

import React from 'react';


const LoadingSpinner = () => (
    <div className={`${'loading-spinner__overlay'}`}>
        <div className="lds-dual-ring"></div>
    </div>
);

export default LoadingSpinner;

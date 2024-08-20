import React from 'react';
import './SignaturePreview.css'

const SignaturePreview = ({ values }) => {
  return (
    <div className="signature-wrapper">
      {values.photoPreview && <img className="photo" src={values.photoPreview} alt="Profile Photo" />}
      <div className="info-wrapper">
        <h1 className="name">{`${values.firstName} ${values.lastName}`}</h1>
        <p className="position">{values.position}</p>
        <p className="contact-info">
          <a href={values.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
        <p className="contact-info">Phone: <a href={`tel:${values.phone}`}>{values.phone}</a></p>
      </div>
    </div>
  );
};

export default SignaturePreview;

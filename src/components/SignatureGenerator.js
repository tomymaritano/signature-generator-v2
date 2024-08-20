import React, { useState } from 'react';
import SignatureForm from './SignatureForm';
import SignaturePreview from './SignaturePreview';
import emailjs from 'emailjs-com';
import axios from 'axios';
import './SignatureGenerator.css'; // Importa el archivo CSS

const SignatureGenerator = () => {
  const [signatureData, setSignatureData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setSignatureData(values);
  };

  const handleSendEmail = () => {
    const signatureHTML = `
      <div style="display: flex; align-items: center; font-family: Arial, sans-serif; color: #333; padding: 20px; border-radius: 10px;">
        <img src="${signatureData.photoURL}" alt="Profile Photo" style="border-radius: 50%; width: 80px; height: 80px; margin-right: 15px; object-fit: cover;">
        <div style="line-height: 1.4;">
          <h1 style="font-size: 16px; margin: 0; color: #007BFF;">${signatureData.firstName} ${signatureData.lastName}</h1>
          <p style="font-size: 14px; margin: 0px 0; font-weight: 600; color: #FF5733;">${signatureData.position}</p>
          <p style="margin: 0px 0; font-size: 14px;">
            <a href="${signatureData.linkedIn}" target="_blank" style="color: #007BFF; text-decoration: none;">LinkedIn</a>
          </p>
          <p style="margin: 0px 0; font-size: 14px;">
            Phone: <a href="tel:${signatureData.phone}" style="color: #007BFF; text-decoration: none;">${signatureData.phone}</a>
          </p>
        </div>
      </div>
    `;

    const templateParams = {
      email: userEmail,
      signatureHTML,
    };

    emailjs.send('firma_digital', 'template_xutq89b', templateParams, '9c3-tNF2vQfZO6De2')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Email sent successfully!');
      })
      .catch((err) => {
        console.error('Failed to send email.', err);
        alert('Failed to send email. Please try again.');
      });
  };

  return (
    <div className="container">
      <h1 className="header">Gmail Signature Generator</h1>
      <div className="form-wrapper">
        <SignatureForm onSubmit={handleSubmit} />
      </div>
      {loading && <p>Loading...</p>}
      {signatureData && (
        <>
          <div className="preview-wrapper">
            <SignaturePreview values={signatureData} />
          </div>
          <input
            type="email"
            className="email-input"
            placeholder="Enter your email address"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button className="send-button" onClick={handleSendEmail}>Send Signature via Email</button>
        </>
      )}
    </div>
  );
};

export default SignatureGenerator;

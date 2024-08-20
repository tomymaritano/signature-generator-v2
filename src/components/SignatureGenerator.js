import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import SignatureForm from './SignatureForm';
import SignaturePreview from './SignaturePreview';
import emailjs from 'emailjs-com';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 40px;
`;

const FormWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const PreviewWrapper = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SendButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SignatureGenerator = () => {
  const [signatureData, setSignatureData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', 'your_api_key'); // Reemplaza con tu API key de Cloudinary
    formData.append('timestamp', (Date.now() / 1000) | 0); // Genera un timestamp
    formData.append('folder', 'Signatures'); // Especifica la carpeta donde se guardarán las imágenes

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dm9driroe/image/upload', formData);
      return response.data.secure_url; // Devuelve la URL pública de la imagen
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  const handleImageUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const imageUrl = await uploadImage(file);
    setLoading(false);
    if (imageUrl) {
      setSignatureData((prevData) => ({ ...prevData, photoURL: imageUrl }));
    }
  };

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
    <Container>
      <Header>Gmail Signature Generator</Header>
      <FormWrapper>
        <SignatureForm onSubmit={handleSubmit} />
        <input type="file" onChange={handleImageUpload} />
      </FormWrapper>
      {loading && <p>Uploading image...</p>}
      {signatureData && (
        <>
          <PreviewWrapper>
            <SignaturePreview values={signatureData} />
          </PreviewWrapper>
          <EmailInput
            type="email"
            placeholder="Enter your email address"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <SendButton onClick={handleSendEmail}>Send Signature via Email</SendButton>
        </>
      )}
    </Container>
  );
};

export default SignatureGenerator;

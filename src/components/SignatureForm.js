import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SignatureForm = ({ onSubmit }) => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      position: '',
      linkedIn: '',
      photoURL: '',
      phone: ''
    },
    onSubmit: values => {
      onSubmit({ ...values, photoPreview });
    },
  });

  const handleOpenWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
              cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'], // Opciones disponibles en el widget
        multiple: false, // Selección de una sola imagen
        folder: 'Signatures', // Carpeta en Cloudinary
        clientAllowedFormats: ['png', 'jpg', 'jpeg'], // Formatos permitidos
        maxImageWidth: 500, // Redimensionar imágenes
        cropping: false, // No permitir recortes
      },
      (error, result) => {
        if (result.event === 'success') {
          setPhotoPreview(result.info.secure_url);
          formik.setFieldValue('photoURL', result.info.secure_url);
        } else if (error) {
          console.error('Error during upload:', error);
          alert('Error uploading image: ' + error.message);
        }
      }
    );
    widget.open(); // Abre el widget
  };

  return (
    <FormWrapper>
      <form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Label>First Name:</Label>
          <Input
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
        </InputGroup>
        <InputGroup>
          <Label>Last Name:</Label>
          <Input
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
        </InputGroup>
        <InputGroup>
          <Label>Position:</Label>
          <Input
            type="text"
            name="position"
            onChange={formik.handleChange}
            value={formik.values.position}
          />
        </InputGroup>
        <InputGroup>
          <Label>LinkedIn URL:</Label>
          <Input
            type="url"
            name="linkedIn"
            onChange={formik.handleChange}
            value={formik.values.linkedIn}
          />
        </InputGroup>
        <InputGroup>
          <Label>Photo:</Label>
          <Button type="button" onClick={handleOpenWidget}>Upload Image</Button>
          {photoPreview && <img src={photoPreview} alt="Profile Preview" style={{ marginTop: '10px', borderRadius: '50%', width: '80px', height: '80px' }} />}
        </InputGroup>
        <InputGroup>
          <Label>Phone:</Label>
          <Input
            type="tel"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </InputGroup>
        <Button type="submit">Generate Signature</Button>
      </form>
    </FormWrapper>
  );
};

export default SignatureForm;

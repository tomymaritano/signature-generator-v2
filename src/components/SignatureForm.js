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
      photoFile: null,
      phone: ''
    },
    onSubmit: values => {
      onSubmit({ ...values, photoPreview });
    },
  });

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue('photoFile', file);
    }
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
          <Input
            type="file"
            name="photoFile"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
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

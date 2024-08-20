import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, FormControl, FormLabel, Input, Button, FormErrorMessage } from '@chakra-ui/react';

const SignatureForm = ({ onSubmit }) => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleOpenWidget = (setFieldValue) => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        folder: 'Signatures',
        clientAllowedFormats: ['png', 'jpg', 'jpeg'],
        maxImageWidth: 500,
        cropping: false,
      },
      (error, result) => {
        if (result.event === 'success') {
          setPhotoPreview(result.info.secure_url);
          setFieldValue('photoURL', result.info.secure_url);
        } else if (error) {
          console.error('Error during upload:', error);
          alert('Error uploading image: ' + error.message);
        }
      }
    );
    widget.open(); // Abre el widget de Cloudinary
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        position: '',
        linkedIn: '',
        photoURL: '',
        phone: ''
      }}
      onSubmit={(values) => {
        onSubmit({ ...values, photoPreview });
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <Box color="black" p={8} bg="white"  maxWidth="container.lg" mx="auto">
            <Field name="firstName">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.firstName && form.touched.firstName} mb={6}>
                  <FormLabel>First Name</FormLabel>
                  <Input 
                    {...field} 
                    placeholder="Enter your first name" 
                    variant="outline" 
                    borderColor="gray.300" 
                    _placeholder={{ color: 'gray.500' }} 
                  />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="lastName">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.lastName && form.touched.lastName} mb={6}>
                  <FormLabel>Last Name</FormLabel>
                  <Input 
                    {...field} 
                    placeholder="Enter your last name" 
                    variant="outline" 
                    borderColor="gray.300" 
                    _placeholder={{ color: 'gray.500' }} 
                  />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="position">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.position && form.touched.position} mb={6}>
                  <FormLabel>Position</FormLabel>
                  <Input 
                    {...field} 
                    placeholder="Enter your position" 
                    variant="outline" 
                    borderColor="gray.300" 
                    _placeholder={{ color: 'gray.500' }} 
                  />
                  <FormErrorMessage>{form.errors.position}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="linkedIn">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.linkedIn && form.touched.linkedIn} mb={6}>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <Input 
                    {...field} 
                    placeholder="Enter your LinkedIn URL" 
                    variant="outline" 
                    borderColor="gray.300" 
                    _placeholder={{ color: 'gray.500' }} 
                  />
                  <FormErrorMessage>{form.errors.linkedIn}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <FormControl mb={6}>
              <FormLabel>Photo</FormLabel>
              <Button type="button" onClick={() => handleOpenWidget(setFieldValue)} colorScheme="teal">
                Upload Image
              </Button>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  style={{
                    marginTop: '15px',
                    borderRadius: '50%',
                    width: '100px',
                    height: '100px',
                    border: '2px solid teal',
                  }}
                />
              )}
            </FormControl>

            <Field name="phone">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.phone && form.touched.phone} mb={6}>
                  <FormLabel>Phone</FormLabel>
                  <Input 
                    {...field} 
                    placeholder="Enter your phone number" 
                    variant="outline" 
                    borderColor="gray.300" 
                    _placeholder={{ color: 'gray.500' }} 
                  />
                  <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Generate Signature
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignatureForm;

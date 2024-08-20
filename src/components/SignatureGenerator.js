import React, { useState } from 'react';
import { Box, Button, Input, Heading, VStack, Spinner } from '@chakra-ui/react';
import SignatureForm from './SignatureForm';
import SignaturePreview from './SignaturePreview';
import emailjs from 'emailjs-com';
import Layout from './Layout';

const SignatureGenerator = () => {
  const [signatureData, setSignatureData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setSignatureData(values);
  };

  const handleSendEmail = () => {
    setLoading(true);
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

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((response) => {
      setLoading(false);
      console.log('Email sent successfully!', response.status, response.text);
      alert('Email sent successfully!');
    })
    .catch((err) => {
      setLoading(false);
      console.error('Failed to send email.', err);
      alert('Failed to send email. Please try again.');
    });
  };

  return (
    <Layout>
      <Box p={8} borderRadius="xl">
        <VStack spacing={4} align="stretch">
          <Box bg="white" p={6}>
            <SignatureForm onSubmit={handleSubmit} />
          </Box>
          {loading && <Spinner size="xl" color="teal.500" />}
          {signatureData && (
            <>
              <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
                <SignaturePreview values={signatureData} />
              </Box>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                variant="filled"
                size="md"
              />
              <Button
                colorScheme="teal"
                onClick={handleSendEmail}
                isFullWidth
                mt={4}
                isLoading={loading}
              >
                Send Signature via Email
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Layout>
  );
};

export default SignatureGenerator;

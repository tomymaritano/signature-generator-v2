import React from 'react';
import styled from 'styled-components';

const SignatureWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  border-radius: 10px;
`;

const Photo = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 15px;
  object-fit: cover;
`;

const InfoWrapper = styled.div`
  line-height: 1.4;
`;

const Name = styled.h1`
  font-size: 16px;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Position = styled.p`
font-size: 14px;
  margin: 0px 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ContactInfo = styled.p`
  margin: 0px 0;
  font-size: 14px;
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const SignaturePreview = ({ values }) => {
  return (
    <SignatureWrapper>
      {values.photoPreview && <Photo src={values.photoPreview} alt="Profile Photo" />}
      <InfoWrapper>
        <Name>{`${values.firstName} ${values.lastName}`}</Name>
        <Position>{values.position}</Position>
        <ContactInfo>
          <a href={values.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </ContactInfo>
        <ContactInfo>Phone: <a href={`tel:${values.phone}`}>{values.phone}</a></ContactInfo>
      </InfoWrapper>
    </SignatureWrapper>
  );
};

export default SignaturePreview;


# Gmail Signature Generator

## Project Description

The **Gmail Signature Generator** is a web application developed in React that allows users to create and send personalized email signatures for Gmail. Users can enter their information, upload a profile image via Cloudinary, and generate a styled HTML signature that is sent directly to their email with installation instructions.

## Key Features

- **Custom Form**: Uses Formik and Chakra UI to create a user-friendly and visually appealing form.
- **Image Upload**: Integration with Cloudinary allows users to upload images from their computer, which are then used in the generated signature.
- **Email Sending**: Uses EmailJS to send the generated signature directly to the user's email.
- **Responsive Design**: The application is fully responsive, ensuring a consistent user experience on both desktop and mobile devices.

## Technologies Used

- **React**: Main framework for building the user interface.
- **Chakra UI**: A component library for building accessible and beautiful user interfaces.
- **Formik**: Used for managing forms, validation, and form state management.
- **Cloudinary**: Cloud service for image management and uploads.
- **EmailJS**: Service for sending emails directly from the web application without a backend.
- **Styled Components**: For managing styles within React components.
- **dotenv**: For environment variable management.

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.

### Clone the Repository

```bash
git clone https://github.com/your-username/gmail-signature-generator.git
cd gmail-signature-generator
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root of the project with the following content:

```bash
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_USER_ID=your_user_id
```

Make sure to replace the values with your specific Cloudinary and EmailJS configurations.

### Start the Project

```bash
npm start
```

This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. **Complete the Form**: Enter your first name, last name, position, LinkedIn URL, and phone number.
2. **Upload Image**: Use the "Upload Image" button to upload an image from your computer.
3. **Generate and Send**: Click "Generate Signature" to create the signature. Then, enter your email address and click "Send Signature via Email" to receive the signature in your inbox.

## Project Structure

```bash
/src
│
├── /components
│   ├── Layout.js               # General layout component
│   ├── SignatureForm.js        # Form to generate the signature
│   ├── SignaturePreview.js     # Preview of the generated signature
│   ├── SignatureGenerator.js   # Main component that combines the form and preview
│
├── /styles
│   ├── GlobalStyle.js          # Global styles for the application
│   ├── SignatureGenerator.css  # Specific styles for the SignatureGenerator component
│
├── index.js                    # Entry point of the application
├── App.js                      # Root component of the application
└── theme.js                    # Custom theme configuration for Chakra UI
```

## Customization

To customize the colors and styles of buttons and other components, you can edit the `theme.js` file in the project root. Here, you can define a custom `colorScheme` that will be applied to all buttons in the application.

## Security Considerations

- **Environment Variables**: Make sure not to share your `.env` file publicly. Add this file to your `.gitignore` to avoid uploading it to the repository.
- **Validation**: Implement additional validations if you plan to expand the form's functionality, especially to protect input fields against attacks like code injection.

## Future Enhancements

- **User Authentication**: Implement authentication to allow users to save and manage multiple signatures.
- **Multi-Language Support**: Add support for multiple languages in the interface and email content.
- **Signature Themes**: Offer different templates and signature styles for advanced customization.

## Contribution

If you want to contribute to the project, please open an issue or create a pull request. Any kind of collaboration is appreciated.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

# Project Name

## Overview

This project is designed to provide a robust and user-friendly application with a rich text editor and efficient form handling. Below are the tools and technologies used in this project.

## Tools and Technologies

### Backend as a Service

- **Appwrite**: We are using [Appwrite](https://appwrite.io/) as our backend service to handle server-side functionalities, including database management, authentication, and more.

### Rich Text Editor

- **TinyMCE**: For text editor functionality, we have integrated [TinyMCE](https://www.tiny.cloud/) a powerful rich text editor that provides a wide range of features for content creation.

### HTML Parsing

- **html-react-parser**: To parse HTML content within our React application, we are using [html-react-parser](https://www.npmjs.com/package/html-react-parser). This allows us to safely convert HTML strings into React components.

### Form Handling

- **React Hook Form**: We utilize [React Hook Form](https://react-hook-form.com/) to manage and validate input forms efficiently. It simplifies form handling by leveraging React hooks.

### Environment Variables

- **.env File**: We store sensitive information and configuration settings in a `.env` file to keep our environment variables secure and organized.

### Configuration

#### Appwrite Setup

1. **Create a Project**:

   - Log in to your Appwrite console.
   - Create a new project.

2. **Create a Database**:

   - Inside your project, navigate to the "Database" section.
   - Create a new collection.

3. **Set Collection Permissions**:

   - Go to the collection settings.
   - Set the necessary permissions for users.

4. **Define Collection Attributes**:

   - Inside the collection, define the attributes (table structure) as needed for your application.

5. **Create a Storage Bucket for storing images**:

   - Navigate to the "Storage" section.
   - Create a new bucket.

6. **Set Bucket Permissions**:
   - For the created bucket, add the necessary user permissions.

#### Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Add your environment variables to the `.env` file. For example:
   ```env
   VITE_APPWRITE_ENDPOINT="https://your-appwrite-endpoint"
   VITE_API_KEY=your-appwrite-api-key
   ```

### Running the Application

1. Start the development server:
   ```sh
   npm run dev
   ```

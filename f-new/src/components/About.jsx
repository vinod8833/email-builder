import React, { useState, useEffect } from 'react';

const EmailBuilder = () => {
  const [emailLayout, setEmailLayout] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [textColor, setTextColor] = useState('#555');
  const [fontSize, setFontSize] = useState('16px');

  useEffect(() => {
    fetch('/getEmailLayout')
      .then((res) => res.text())
      .then((data) => setEmailLayout(data))
      .catch((err) => console.error('Error fetching email layout:', err));
  }, []);

  const handleImageUpload = (event) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    fetch('/uploadImage', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setUploadedImage(data.imageUrl))
      .catch((err) => console.error('Error uploading image:', err));
  };

  const handleDownloadTemplate = () => {
    fetch('/renderAndDownloadTemplate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        layout: emailLayout,
        textColor,
        fontSize,
        image: uploadedImage,
      }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'email_template.html';
        link.click();
      })
      .catch((err) => console.error('Error downloading template:', err));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Build Your Email</h1>
        <button onClick={handleDownloadTemplate} style={styles.saveButton}>Save and Download</button>
      </header>

      <div style={styles.builderContainer}>
        {/* Email Preview Section */}
        <div style={styles.emailPreview}>
          {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={styles.uploadedImage} />}
          <div
            dangerouslySetInnerHTML={{
              __html: emailLayout.replace(/{{textColor}}/g, textColor).replace(/{{fontSize}}/g, fontSize),
            }}
            style={{ ...styles.dynamicContent, color: textColor, fontSize }}
          />
        </div>

        {/* Controls Section */}
        <div style={styles.controlsContainer}>
          <h3 style={styles.controlsTitle}>Customize Your Email</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.fileInput} />
          <p>Upload an image to include in your email.</p>
          <div>
            <label>Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              style={styles.colorInput}
            />
          </div>
          <div>
            <label>Font Size:</label>
            <input
              type="number"
              value={parseInt(fontSize, 10)}
              onChange={(e) => setFontSize(`${e.target.value}px`)}
              style={styles.fontSizeInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    padding: '20px',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  builderContainer: {
    display: 'flex',
    gap: '20px',
  },
  emailPreview: {
    flex: 2,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  dynamicContent: {
    fontSize: '16px',
    color: '#555',
  },
  uploadedImage: {
    maxWidth: '100%',
    marginBottom: '10px',
  },
  controlsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  controlsTitle: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
  },
  fileInput: {
    marginBottom: '10px',
  },
  colorInput: {
    marginBottom: '10px',
  },
  fontSizeInput: {
    marginBottom: '10px',
    width: '60px',
  },
};

export default EmailBuilder;

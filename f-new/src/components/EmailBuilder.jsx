import React, { useState } from 'react';

function EmailBuilder() {
  const [text, setText] = useState('Email has never been easier');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="email-builder">
      <div className="header">
        <button className="back-button">Back</button>
        <h2>Welcome email</h2>
      </div>
      <div className="content">
        <div className="left-panel">
          <div className="logo-container">
            <button className="add-logo-button">ADD LOGO</button>
          </div>
          <div className="main-text-container">
            <h2>Email has never been easier</h2>
            <p>
              Create beautiful and sophisticated emails in minutes, with no
              coding required, and minimal setup. The way email should be.
            </p>
            <button className="get-started-button">Get started</button>
            <button className="learn-more-button">Learn more</button>
          </div>
          <div className="image-container">
            <img
              src="https://thumbs.dreamstime.com/z/happy-black-woman-celebrating-success-laptop-credit-card-online-cashback-concept-portrait-raising-hands-excitement-343512552.jpg?w=992"
              alt="Woman working on laptop"
            />
          </div>
        </div>
        <div className="right-panel">
          <h3>Text</h3>
          <div className="text-editor">
            <textarea value={text} onChange={handleTextChange} />
            <div className="editor-buttons">
              <button className="bold-button">B</button>
              <button className="italic-button">I</button>
              <button className="underline-button">U</button>
              <button className="strikethrough-button">S</button>
              <button className="link- button">Link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailBuilder;
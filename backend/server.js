const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(express.json());

// Serve static files (images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API to get email layout
app.get("/getEmailLayout", (req, res) => {
  const layoutPath = path.join(__dirname, "layout.html");
  fs.readFile(layoutPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error loading layout.");
    } else {
      res.send(data);
    }
  });
});

// Image upload API
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// API to upload images
app.post("/uploadImage", upload.single("image"), (req, res) => {
  if (req.file) {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } else {
    res.status(400).send("No file uploaded.");
  }
});

// API to save email template config
app.post("/uploadEmailConfig", (req, res) => {
  const { title, content, footer, imageUrl } = req.body;
  // Save the email template in the database
  // Example: Save in MongoDB or in a file
  // For now, we'll just log the data
  console.log("Email Template:", { title, content, footer, imageUrl });

  res.status(200).send("Email Template saved successfully!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

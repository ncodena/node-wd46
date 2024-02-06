import { pool } from "../db/pool.js";

export const profilePictureUpload = (req, res) => {
    if (req.file) {
        res.send(`<div><h2>Here's the picture:</h2><img width="500" src='/uploads/${req.file.filename}'/></div>`);
    } else {
        res.send("No file uploaded.");
    }
};

// export const catPicturesUpload = (req, res) => {
//     if (req.files && req.files.length > 0) {
//         let imgTags = req.files.map(file => `<img width="200" src='/uploads/${file.filename}'/>`).join('');
//         res.send(`<div><h2>Here are your cat pictures:</h2>${imgTags}</div>`);
//     } else {
//         res.send("No files uploaded.");
//     }
// };

export const catPicturesUpload = async (req, res) => {
    if (req.files && req.files.length > 0) {
        try {
          // Loop through all files and insert their information into the database
          for (const file of req.files) {
            const insertQuery = 'INSERT INTO pictures(name, path) VALUES($1, $2)';
            await pool.query(insertQuery, [file.originalname, file.path]);
          }
    
          res.send("Files uploaded and data stored in database successfully.");
        } catch (error) {
          console.error('Database Insert Error:', error);
          res.status(500).send('Error storing file information in database');
        }
      } else {
        res.send("No files uploaded.");
      }
};

export const getImagesUploaded = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pictures');
        let html = '<h2>Uploaded Pictures</h2><ul>';
        // Assuming pic_id is used as a unique identifier for the image
        result.rows.forEach(pic => {
          html += `<li><a href="/image/${pic.pic_id}" target="_blank">${pic.name}</a></li>`;
        });
        html += '</ul>';
        res.send(html);
      } catch (error) {
        console.error('Database Query Error:', error);
        res.status(500).send('Error retrieving pictures from database');
      }
};
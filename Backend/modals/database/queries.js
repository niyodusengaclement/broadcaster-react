const report = `DROP TABLE IF EXISTS reports; CREATE TABLE IF NOT EXISTS
     reports (id SERIAL PRIMARY KEY, 
      title TEXT NOT NULL, 
      type VARCHAR(100) NOT NULL, 
      createdOn VARCHAR(100), 
      createdBy INTEGER, 
      comment TEXT NOT NULL, 
      location VARCHAR(100), 
      status VARCHAR(50), 
      images VARCHAR(255),
      videos VARCHAR(255),
      tag VARCHAR(100)
      ); 
      INSERT INTO reports (title, type, createdOn, createdBy, comment, location, status) values
      ('Test', 'redflag', '20 Nov 2019', '4', 'my comment', '0.163 0.2635', 'under investigation'),
      ('Test', 'redflag', '20 Nov 2019', '4', 'my comment', '0.163 0.2635', 'pending'),
      ('Test', 'redflag', '20 Nov 2019', '1', 'my comment', '0.163 0.2635', 'rejected'),
      ('Test', 'redflag', '20 Nov 2019', '4', 'my comment', '0.163 0.2635', 'resolved')
      `;
const users = `DROP TABLE IF EXISTS users; CREATE TABLE IF NOT EXISTS
    users (id SERIAL PRIMARY KEY, 
      firstname VARCHAR(30) NOT NULL, 
      lastname VARCHAR(30) NOT NULL, 
      email VARCHAR(30) NOT NULL UNIQUE, 
      phone VARCHAR(14) NOT NULL, 
      username VARCHAR(30) NOT NULL, 
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN NOT NULL DEFAULT FALSE
      );
      INSERT INTO users (firstname, lastname, email, phone, username, password)
      values ('Mistico', 'Clement', 'clementmistico@gmail.com', '250780282575', 'Mistico', '$2b$10$cVjjDBFR8BY1EtM3avYy0eQEdHuUlm8O2fulYVx9PFDcdYqdr19Be'),
      ('Mugenzi', 'Oscar', 'mugenzioscar@gmail.com', '250780282575', 'Mugenzi', '$2b$10$cVjjDBFR8BY1EtM3avYy0eQEdHuUlm8O2fulYVx9PFDcdYqdr19Be')`;
export default {
  report,
  users,
};

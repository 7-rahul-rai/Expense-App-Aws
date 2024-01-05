<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body>

<h1>Expense Tracker</h1>

<p>Welcome to the Expense Tracker application, a Node.js-based platform that allows users to manage their expenses efficiently. This application is built using HTML, JavaScript, Bootstrap, and integrated with the Node.js and Express.js framework. Sequelize is employed as an ORM for the SQL database.</p>

<h2>Features</h2>

<h3>User Authentication</h3>

<ul>
  <li><strong>Secure Sign-Up:</strong> Users can securely sign up with their credentials.</li>
  <li><strong>Password Hashing:</strong> Passwords are hashed using bcrypt for enhanced security.</li>
  <li><strong>JWT-Based Authentication:</strong> Protected routes are secured using JSON Web Tokens.</li>
</ul>

<h3>Premium Features</h3>

<ul>
  <li><strong>Razorpay Integration:</strong> Premium users can access advanced features with Razorpay integration.</li>
  <li><strong>Leaderboard:</strong> A leaderboard showcases users with the maximum expenses.</li>
</ul>

<h3>Expense Management</h3>

<ul>
  <li><strong>Add and Remove Expenses:</strong> Users can easily add and remove their expenses for efficient tracking.</li>
</ul>

<h3>Report Generation</h3>

<ul>
  <li><strong>Premium User Reports:</strong> Premium users can generate and download reports of their expenses.</li>
  <li><strong>Secure Storage:</strong> Reports are stored securely in an S3 bucket.</li>
</ul>

<h3>Password Management</h3>

<ul>
  <li><strong>Password Reset:</strong> Users can reset their passwords via an email link.</li>
  <li><strong>Email Notifications:</strong> Powered by Sendinblue SDK, users receive email notifications for password-related actions.</li>
</ul>

<h2>Deployment</h2>

<p>The application is deployed on AWS EC2 instances, ensuring reliability and scalability.</p>

<ul>
  <li><strong>Server Deployment:</strong> Application deployed on AWS EC2 instances.</li>
  <li><strong>Reverse Proxy and Load Balancing:</strong> Nginx is used for reverse proxy and load balancing.</li>
</ul>

<h2>Continuous Integration</h2>

<p>Jenkins is configured for a robust CI/CD workflow, automating the deployment process for increased efficiency.</p>

<h2>Access</h2>

<p>The deployed application is accessible at <a href="http://16.16.87.135">http://16.16.87.135</a>.</p>

<h2>Getting Started</h2>

<ol>
  <li>Clone the repository: <code>git clone https://github.com/your-username/expense-tracker.git</code></li>
  <li>Install dependencies: <code>npm install</code></li>
  <li>Set up your database and configure Sequelize accordingly.</li>
  <li>Run the application: <code>npm start</code></li>
</ol>

<p>Feel free to explore and customize the codebase to fit your specific needs.</p>

<h2>Contribution</h2>

<p>Contributions are welcome! Feel free to open issues or submit pull requests to enhance the functionality or fix bugs.</p>

<h2>License</h2>

<p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>

<p>Happy Expense Tracking!</p>

</body>
</html>

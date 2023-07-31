<<<<<<< HEAD
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("clicked");

  // Get form input values
  const name = document.getElementById("Name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simple validation (you can add more complex validation if needed)
  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    alert("Please fill in all the fields.");
    return;
  }

  let ebody = `
  <b>Name:</b> ${name}
  <br>
  <b>Email:</b> ${email}
  <br>
  <b>Message:</b> ${message}
  <br>
`;

  // Send the email using smtp.js
  Email.send({
    SecureToken: "f19781fa-8daf-40b2-b591-25008a525e3b", // Your smtp.js SecureToken
    To: "kaleelbarrett@gmail.com", // Receiver's email address
    From: "kaleelbarrett@gmail.com", // Sender's email address
    Subject: "Contact Form Submission",
    Body: ebody, // Use the email body with form input values
    IsHtml: true,
  }).then((message) => {
    alert("Email sent successfully!");
  });
});
=======
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("clicked");

  // Get form input values
  const name = document.getElementById("Name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simple validation (you can add more complex validation if needed)
  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    alert("Please fill in all the fields.");
    return;
  }

  let ebody = `
  <b>Name:</b> ${Name}
  <br>
  <b>Email:</b> ${email}
  <br>
  <b>Message:</b> ${message}
  <br>
`;

  // Send the email using smtp.js
  Email.send({
    SecureToken: "f19781fa-8daf-40b2-b591-25008a525e3b", // Your smtp.js SecureToken
    To: "kaleelbarrett@gmail.com", // Receiver's email address
    From: "kaleelbarrett@gmail.com", // Sender's email address
    Subject: "Contact Form Submission",
    Body: ebody, // Use the email body with form input values
    IsHtml: true,
  }).then((message) => {
    alert("Email sent successfully!");
  });
});
>>>>>>> b3f81b3d86c086eb917cf930daccb7cce499712c

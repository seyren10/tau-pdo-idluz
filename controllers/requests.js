const { Building } = require("../models/building");
const Request = require("../models/request");
const nodemailer = require("nodemailer");
const path = require("path");

module.exports.index = async (req, res) => {
  const { buildingName } = req.query;
  const buildings = await Building.find({});

  res.render("requests", { buildings, buildingName });
};

module.exports.create = async (req, res) => {
  const { building } = req.body.request;
  const buildingMatched = await Building.findOne({ name: building });

  if (!buildingMatched) {
    req.flash(
      "error",
      "Building doesn't exist. please make sure to enter a valid one."
    );
    return res.redirect("/request");
  }

  const { request } = req.body;
  const newRequest = new Request({
    buildingName: request.building,
    fullName: request.name,
    contactNo: request.contact,
    company: request.company,
    position: request.position,
    email: request.email,
    purpose: request.purpose,
  });
  await newRequest.save();

  req.flash(
    "success",
    "Request sent. Please check your email inbox or spam within 24 hours."
  );
  res.redirect("/evaluation/new");
};

module.exports.manage = async (req, res) => {
  const requests = await Request.find({});
  res.render("requests/manage", { requests });
};

module.exports.send = async (req, res) => {
  const { email, approve, name, building, id } = req.query;

  const successEmail = `<h2 style='margin-bottom:0'>TARLAC AGRICULTURAL UNIVERSITY</h2>
  <h4 style='margin-top:0'>Camiling, Tarlac</h4>
  <p style='color:#606368;'><strong>Hello ${name},</strong></p>
  
  <p>your request for <strong>${building}</strong> floor plan has been <span style='color:#34A853;'>approved</span>. Please find the attached file in this email.
  We must remind you that this file is the property of Tarlac Agricultural University and must not be altered, changed or shared with anyone without prior written consent from the university.
  If you have any further questions or concerns, please visit our office TAU Data Center bldg., TAU-IDLUZ Office (2nd Floor) .
  Thank you for your cooperation.</p>
  <p>Best regards,</p>
  <p>TAU-IDLUZ Team</p>`;

  const failEmail = `<h2 style='margin-bottom:0'>TARLAC AGRICULTURAL UNIVERSITY</h2>
  <h4 style='margin-top:0'>Camiling, Tarlac</h4>
  <p style='color:#606368;'><strong>Hello ${name},</strong></p>
  
  <p>We regret to inform you that your request for <strong>${building}</strong> floor plan has been <span style='color:#E74033;'>disapproved</span>.
  After careful consideration, we have determined that we are unable to fulfill your request at this time. 
  If you have any questions or concerns regarding this decision, please visit our office TAU Data Center bldg., TAU-IDLUZ Office (2nd Floor).</p>
  
  <p>Best regards,</p>
  <p>TAU-IDLUZ Team</p>
  `;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  let mailDetails = {};
  if (approve === "true") {
    mailDetails = {
      from: process.env.EMAIL,
      to: email,
      html: successEmail,
      attachments: [
        {
          filename: "sample-floor-plan.png",
          path: path.join(
            __dirname,
            "../",
            "public",
            "images",
            "background.png"
          ),
        },
      ],
    };
  } else {
    mailDetails = {
      from: process.env.EMAIL,
      to: email,
      html: failEmail,
    };
  }

  mailTransporter.sendMail(mailDetails, async (err, info) => {
    if (err) {
      console.log(err);
      req.flash("error", "Something went wrong. Please try again.");
      return res.redirect("/request/manage");
    } else {
      await Request.deleteOne({ _id: id });
      req.flash("success", "Email Successfuly sent. (" + info.messageId + ")");
      return res.redirect("/request/manage");
    }
  });
};

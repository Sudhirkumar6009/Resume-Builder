const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    education: [{ school: String, degree: String, year: String }],
    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
        current: Boolean,
      },
    ],
    skills: [
      {
        name: String,
        level: String,
      },
    ],
    certificates: [
      {
        name: String,
        issuer: String,
        issueDate: String,
        expiryDate: String,
        credentialId: String,
      },
    ],
    template: String,
    uuid: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;


const dataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    ref: "User",
    required: true,
  },
  lastName: {
    type: String,
    ref: "User",
    required: true,
  },
  dateOfBirth: {
    type: String,
  },  
  gender: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
    ref: "User",
    required: true,
  },  
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  profilePictureUrl: {
    type: String,
    default: '',
  },
  jobType: {
    type: String,
    default: '',
  },
  primarySpecialty: {
    type: String,
  },
  subSpecialty: {
    type: String,
  },
  medicalSchool: {
    type: String,
  },
  degreeObtained: [{
    course: {
      type: String,
    },
    degree: {
      type: String,
    },
    institution: {
      type: String,
    },
    year: {
      type: String,
    },
  }],
  yearOfGraduation: {
    type: String,
  },
  currentOrganization: {
    type: String,
  },
  currentOrganizationCountry: {
    type: String,
  },
  currentOrganizationState: {
    type: String,
  },
  yearsOfExperience: {
    type: String,
  },
  mdcnLicenseNo: {
    type: String,
  },
  mdcnRegistrationNo: {
    type: String,
  },
});

const Application = mongoose.model("Application", dataSchema);

export default Application;

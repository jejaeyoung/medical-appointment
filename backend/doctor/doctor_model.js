const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define timeSlotSchema for morning and afternoon time slots
const timeSlotSchema = new mongoose.Schema({
    startTime: String,
    endTime: String,
    interval: Number,
    available: { type: Boolean, default: false }
});

// Define dailyAvailabilitySchema using timeSlotSchema for morning and afternoon availability
const dailyAvailabilitySchema = new mongoose.Schema({
    morning: { type: timeSlotSchema, default: () => ({}) },
    afternoon: { type: timeSlotSchema, default: () => ({}) }
});

// Define DoctorSchema
const DoctorSchema = new Schema({
    dr_image: {
        type: String,
        default: '' // Default image path if needed
    },
    dr_firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    dr_lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    dr_middleInitial: {
        type: String,
        maxlength: 1
    },
    dr_email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v); // Validate email format
            },
            message: props => `${props.value} is not a valid email address.`
        }
    },
    dr_password: {
        type: String,
        required: true,
        minlength: 6,
    },
    dr_dob: {
        type: Date,
        required: true,
    },
    dr_age:{
        type:String,
    },
    dr_contactNumber: {
        type: String,
        required: true,
        unique: true,
    },
    dr_specialty: {
        type: String,
    },
    dr_patients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    dr_posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    dr_appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    dr_medicalHistories: [{
        type: Schema.Types.ObjectId,
        ref: 'MedicalHistory',
        default: null
    }],
    dr_prescriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'Prescription'
    }],

    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    twoFactorSecret: { type: String },
    twoFactorEnabled: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    activeAppointmentStatus: {
        type: Boolean,
        default: false
    },
    availability: {
        monday: { type: dailyAvailabilitySchema, default: () => ({}) },
        tuesday: { type: dailyAvailabilitySchema, default: () => ({}) },
        wednesday: { type: dailyAvailabilitySchema, default: () => ({}) },
        thursday: { type: dailyAvailabilitySchema, default: () => ({}) },
        friday: { type: dailyAvailabilitySchema, default: () => ({}) },
        saturday: { type: dailyAvailabilitySchema, default: () => ({}) },
        sunday: { type: dailyAvailabilitySchema, default: () => ({}) }
    }
}, { timestamps: true });

// Define a method on DoctorSchema to generate QR code for two-factor authentication
DoctorSchema.methods.generateQRCode = async function() {
    const otpAuthUrl = speakeasy.otpauthURL({ 
      secret: this.twoFactorSecret, 
      label: `Landagan Kids Clinic:${this.dr_email}`, 
      issuer: 'Landagan Kids Clinic',
      encoding: 'base32'
    });
    console.log('Generated OTP Auth URL:', otpAuthUrl); // Log the URL for debugging
    return await QRCode.toDataURL(otpAuthUrl);
};

// Create Doctor model based on DoctorSchema
const Doctor = model('Doctor', DoctorSchema);

module.exports = Doctor;

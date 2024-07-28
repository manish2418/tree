import mongoose from "mongoose";

const AutoIncrement = require('mongoose-sequence')(mongoose);

const EmployeeSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["HR", "Employee", "Manager"],
            default: "Employee",
        },
        department: {
            type: String,
            required: true,
        },
        mobile_no: {
            type: String,
            required: true,
        },
        experience_in_years: {
            type: Number,
            required: true,
        },
        personal_email: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: Date,
            required: true,
        },
        date_of_joining: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true
        },
        emergency_contact_number: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false },
        hr: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false },
    },
    {
        timestamps: true,
    }
);

EmployeeSchema.plugin(AutoIncrement, { inc_field: 'employee_id' });


EmployeeSchema.index({ first_name : 'text', last_name: "text", email: "text" })

export default mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

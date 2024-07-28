import mongoose from "mongoose";

const SalarySchema = mongoose.Schema(
    {

        basic_salary: {
            type: Number,
            required: true,
        },
        house_rent_allowance: {
            type: Number,
            required: true,
        },
        telephone_allowance: {
            type: Number,
            required: true,
        },
        lta: {
            type: Number,
            required: true,
        },
        special_allowance: {
            type: Number,
            required: true,
        },
        performance_incentive: {
            type: Number,
            required: true,
        },
        retention_bonus: {
            type: Number,
            required: true,
        },
        provident_fund: {
            type: Number,
            required: true,
        },
        professional_tax: {
            type: Number,
            required: true,
        },
        income_tax: {
            type: Number,
            required: true,
        },
        national_pention_scheme_amount: {
            type: Number,
            required: true,
        },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
        updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
        employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
        currency: {
            type: String,
            required: true,
            enum: ["INR"],
            default: "INR"
        },
        effective_from: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Salary || mongoose.model("Salary", SalarySchema);
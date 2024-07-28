import { ClaimStatus } from "@/app/lib/constants/claim";
import mongoose from "mongoose";

const ClaimSchema = mongoose.Schema(
    {
        claim_name: {
            type: String,
            required: true
        },
        claim_description: {
            type: String,
            required: true
        },
        // TODO: Convert to enum
        status: {
            type: String,
            required: true,
            default: ClaimStatus.IN_REVIEW_BY_MANAGER,
        },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
        updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
        submitted_at: {
            type: Date,
            required: false,
        },
        expenses: [
            {
                hr: {
                    approval: {
                        reason: {
                            type: String,
                        },
                        by: {
                            type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
                        },
                        at: {
                            type: Date,
                        },
                        amount: {
                            type: Number,
                        }
                    },
                    rejection: {
                        reason: {
                            type: String,
                        },
                        by: {
                            type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
                        },
                        at: {
                            type: Date,
                        }
                    },
                    revert: [{
                        reason: {
                            type: String,
                        },
                        by: {
                            type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
                        },
                        at: {
                            type: Date,
                        }
                    }],
                },
                manager: {
                    approval: [{
                        reason: {
                            type: String,
                        },
                        by: {
                            type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
                        },
                        at: {
                            type: Date,
                        }
                    }],
                    rejection: {
                        reason: {
                            type: String,
                        },
                        by: {
                            type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
                        },
                        at: {
                            type: Date,
                        }
                    },
                    revert: [{
                        reason: {
                            type: String,
                        },
                        by: {
                            type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
                        },
                        at: {
                            type: Date,
                        }
                    }],
                },
                approved_amount: {
                    type: Number,
                    required: false,
                },
                type: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true,
                },
                description: {
                    type: String,
                    required: true
                },
                proof_link: {
                    type: String,
                    required: true
                },
                from: {
                    type: Date,
                    required: true
                },
                to: {
                    type: Date,
                    required: true
                },
            }
        ],
    },
    {
        timestamps: true,
    }
);


export default mongoose.models.Claim || mongoose.model("Claim", ClaimSchema);


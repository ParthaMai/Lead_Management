import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    source: {
        type: String,
        enum: ["website", "facebook_ads", "google_ads", "referral", "events", "other"],
        required: true
    },
    status: {
        type: String,
        enum: ["new", "contacted", "qualified", "lost", "won"],
        required: true
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    lead_value: {
        type: Number,
        required: true
    },
    last_activity_at: {
        type: Date,
        default: null
    },
    is_qualified: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });


const leadModel = mongoose.models.lead || mongoose.model("Lead",leadSchema)

export default leadModel;  
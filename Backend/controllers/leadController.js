import Lead from "../models/leadModel.js";

import fs from 'fs';
import { parseFilters } from "../utils/parseFilters.js";

// import parseFilters from "../utils/filterParser.js";

const allowedFields = [
    "first_name", "last_name", "email", "phone", "company", "city", "state",
    "source", "status", "score", "lead_value", "last_activity_at", "is_qualified"
];

// add Lead
const createLead = async (req, res) => {
    try {
        const body = {};
        for (const k of allowedFields) {
            if (req.body[k] !== undefined) body[k] = req.body[k];
        }

        if (!body.first_name || !body.last_name || !body.email) {
            return res.status(400).json({ success: false, message: "first_name, last_name, email required" });
        }

        // body.userId = req.user.userId;
        // Only add userId if req.user exists
        if (req.user && req.user.userId) {
            body.userId = req.user.userId;
        }
        const created = await Lead.create(body);

        res.status(201).json({ success: true, data: created });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating lead" });
    }
};

// Get Leads with pagination & filters
const getLeads = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const filters = parseFilters(req.query);

    console.log("Fetching leads with filters:", filters, "page:", page, "limit:", limit);

    const [total, data] = await Promise.all([
      Lead.countDocuments(filters),
      Lead.find(filters).sort({ created_at: -1 }).skip(skip).limit(limit),
    ]);

    console.log("Found leads:", data);

    res.json({
      success: true,
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error in getLeads:", error);
    res.status(500).json({ success: false, message: "Error fetching leads" });
  }
};

// Get Single Lead
const getLead = async (req, res) => {
    try {
        const id = req.params.id;
        const lead = await Lead.findOne({ _id: id, userId: req.user.userId });
        if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });

        res.json({ success: true, data: lead });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching lead" });
    }
};

// Update Lead
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLead = await Lead.findByIdAndUpdate(id, req.body, {
      new: true, // return updated doc
      runValidators: true,
    });

    if (!updatedLead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    res.json({ success: true, data: updatedLead });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ success: false, message: "Error updating lead" });
  }
};

// Delete Lead
const deleteLead = async (req, res) => {
   try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Lead deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting lead" });
  }
};

export { createLead, getLeads, getLead, updateLead, deleteLead };

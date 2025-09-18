import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./CreateLead.css";

const CreateLead = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "website",
    status: "new",
    score: 0,
    lead_value: 0,
    is_qualified: false,
  });

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!form.first_name || !form.email) {
      alert("Please fill in required fields: First Name and Email");
      return;
    }

    try {
      await api.post("/api/lead/create", form); // POST to your API
      navigate("/"); // Redirect after success
    } catch (error) {
      console.error("Error creating lead:", error.response?.data || error.message);
      alert("Failed to create lead. Please try again.");
    }
  };

  return (
    <div className="create-lead-container">
      <h2>New Lead</h2>
      <form onSubmit={handleSubmit} className="create-lead-form">
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={onChangeHandler}
          required
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={onChangeHandler}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChangeHandler}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={onChangeHandler}
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={onChangeHandler}
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={onChangeHandler}
        />
        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={onChangeHandler}
        />

        <select name="source" value={form.source} onChange={onChangeHandler}>
          <option value="website">Website</option>
          <option value="facebook_ads">Facebook Ads</option>
          <option value="google_ads">Google Ads</option>
          <option value="referral">Referral</option>
          <option value="events">Events</option>
          <option value="other">Other</option>
        </select>

        <select name="status" value={form.status} onChange={onChangeHandler}>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
          <option value="won">Won</option>
        </select>

        <input
          name="score"
          type="number"
          placeholder="Score"
          value={form.score}
          onChange={onChangeHandler}
        />
        <input
          name="lead_value"
          type="number"
          placeholder="Lead Value"
          value={form.lead_value}
          onChange={onChangeHandler}
        />

        <label className="checkbox-label">
          Qualified?
          <input
            name="is_qualified"
            type="checkbox"
            checked={form.is_qualified}
            onChange={onChangeHandler}
          />
        </label>

        <button type="submit">Create Lead</button>
      </form>
    </div>
  );
};

export default CreateLead;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditLead = () => {
  const { id } = useParams();
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

  // fetch existing lead
  useEffect(() => {
    const fetchLead = async () => {
      const res = await api.get(`/api/lead/${id}`);
      setForm(res.data);
    };
    fetchLead();
  }, [id]);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/api/lead/${id}`, form);
    navigate("/Lead_list");
  };

  return (
    <div className="create-lead-container">
      <h2>Edit Lead</h2>
      <form onSubmit={handleSubmit} className="create-lead-form">
        <input
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        />
        <input
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <input
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />

        <select
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        >
          <option value="website">Website</option>
          <option value="facebook_ads">Facebook Ads</option>
          <option value="google_ads">Google Ads</option>
          <option value="referral">Referral</option>
          <option value="events">Events</option>
          <option value="other">Other</option>
        </select>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
          <option value="won">Won</option>
        </select>

        <input
          type="number"
          placeholder="Score"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
        />
        <input
          type="number"
          placeholder="Lead Value"
          value={form.lead_value}
          onChange={(e) => setForm({ ...form, lead_value: e.target.value })}
        />

        <label>
          Qualified?
          <input
            type="checkbox"
            checked={form.is_qualified}
            onChange={(e) =>
              setForm({ ...form, is_qualified: e.target.checked })
            }
          />
        </label>

        <button type="submit">Update Lead</button>
      </form>
    </div>
  );
};

export default EditLead;

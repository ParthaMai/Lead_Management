import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

// 👇 Import AG Grid CSS
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// 👇 Import and register AG Grid community modules
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Lead_list.css";

const Lead_list = () => {
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const navigate = useNavigate();

  const fetchLeads = async (page = 1) => {
    try {
      const res = await api.get(`/api/lead/list?page=${page}&limit=20`);
      console.log("Fetched leads:", res.data.data);
      setRowData(res.data.data || []);
      setPagination({ page: res.data.page, totalPages: res.data.totalPages });
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const columns = [
  { headerName: "First Name", field: "first_name", flex: 1 },
  { headerName: "Last Name", field: "last_name", flex: 1 },
  { headerName: "Email", field: "email", flex: 2 },
  { headerName: "Company", field: "company", flex: 1 },
  { headerName: "Status", field: "status", flex: 1 },
  { headerName: "Score", field: "score", flex: 1 },
  {
    headerName: "Actions",
    flex: 1,
    cellRenderer: (params) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => navigate(`/leads/${params.data._id}/edit`)}
          style={{ background: "#2196f3", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px" }}
        >
          Edit
        </button>
        <button
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete this lead?")) {
              try {
                await api.delete(`/api/lead/${params.data._id}`);
                fetchLeads(pagination.page); // refresh after delete
              } catch (err) {
                console.error("Error deleting lead:", err);
              }
            }
          }}
          style={{ background: "#f44336", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px" }}
        >
          Delete
        </button>
      </div>
    ),
  },
];


  return (
    <div className="leads-container">
      <h2>Leads</h2>

      <div className="ag-theme-alpine grid-wrapper">
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination={false}
        />
      </div>

      <div className="pagination-controls">
        <button
          disabled={pagination.page === 1}
          onClick={() => fetchLeads(pagination.page - 1)}
        >
          Prev
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => fetchLeads(pagination.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Lead_list;

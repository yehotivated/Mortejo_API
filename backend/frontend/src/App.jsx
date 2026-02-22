import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    course: "",
    year_level: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("FORM DATA:", form);

    if (!form.name || !form.course || !form.year_level) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      await axios.put(`http://localhost:5000/students/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/students", form);
    }

    setForm({ name: "", course: "", year_level: "" });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };

  const handleLogout = () => {
    alert("Logged out!");
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Student Management</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <LogoutIcon className="btn-icon" />
          Logout
        </button>
      </div>

      <div className="form-row">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <select name="course" value={form.course} onChange={handleChange}>
          <option value="">Select Course</option>
          <option>BSIT</option>
          <option>BSCS</option>
          <option>BSIS</option>
        </select>

        <select
          name="year_level"
          value={form.year_level}
          onChange={handleChange}
        >
          <option value="">Select Year</option>
          <option>Year 1</option>
          <option>Year 2</option>
          <option>Year 3</option>
          <option>Year 4</option>
        </select>

        <button className="add-btn" onClick={handleSubmit}>
          {editId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <ul className="student-list">
        {students.map((s) => (
          <li key={s.id} className="student-item">
            <span>
              {s.name} — {s.course} ({s.year_level})
            </span>

            <div className="actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(s)}
              >
                <EditIcon className="btn-icon" />
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(s.id)}
              >
                <DeleteIcon className="btn-icon" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
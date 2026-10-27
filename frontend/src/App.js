import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ employeeId: '', fullName: '', department: '', position: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  // API URL - Chú ý phần này phải trỏ về backend đang chạy ở cổng 5000
  const API_URL = 'http://localhost:5000/api/employees';

  // 1. Lấy danh sách nhân viên
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      showMessage('Lỗi khi tải danh sách nhân viên!', 'danger');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Xử lý thay đổi form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hiển thị thông báo
  const showMessage = (msg, type) => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  // 2. Thêm mới hoặc Cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editId}`, formData);
        showMessage('Cập nhật nhân viên thành công!', 'success');
      } else {
        await axios.post(API_URL, formData);
        showMessage('Thêm nhân viên thành công!', 'success');
      }
      setFormData({ employeeId: '', fullName: '', department: '', position: '' });
      setIsEditing(false);
      setEditId(null);
      fetchEmployees();
    } catch (error) {
      showMessage('Có lỗi xảy ra, vui lòng thử lại!', 'danger');
    }
  };

  // 3. Chuẩn bị dữ liệu để Sửa
  const handleEdit = (employee) => {
    setFormData({
      employeeId: employee.employeeId,
      fullName: employee.fullName,
      department: employee.department,
      position: employee.position
    });
    setIsEditing(true);
    setEditId(employee._id);
  };

  // 4. Xóa nhân viên
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        showMessage('Đã xóa nhân viên!', 'success');
        fetchEmployees();
      } catch (error) {
        showMessage('Lỗi khi xóa nhân viên!', 'danger');
      }
    }
  };

  // 5. Lọc danh sách theo từ khóa tìm kiếm
  const filteredEmployees = employees.filter(emp => 
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Hệ Thống Quản Lý Nhân Sự</h2>

      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{isEditing ? 'Cập nhật nhân viên' : 'Thêm nhân viên mới'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <input type="text" name="employeeId" className="form-control" placeholder="Mã nhân viên" value={formData.employeeId} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3 mb-3">
                <input type="text" name="fullName" className="form-control" placeholder="Họ và tên" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3 mb-3">
                <input type="text" name="department" className="form-control" placeholder="Phòng ban" value={formData.department} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3 mb-3">
                <input type="text" name="position" className="form-control" placeholder="Chức vụ" value={formData.position} onChange={handleInputChange} required />
              </div>
            </div>
            <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-success'}`}>
              {isEditing ? 'Lưu Cập Nhật' : 'Thêm Nhân Viên'}
            </button>
            {isEditing && <button type="button" className="btn btn-secondary ms-2" onClick={() => { setIsEditing(false); setFormData({ employeeId: '', fullName: '', department: '', position: '' }) }}>Hủy</button>}
          </form>
        </div>
      </div>

      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Tìm kiếm theo Tên hoặc Mã nhân viên..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Mã NV</th>
              <th>Họ và Tên</th>
              <th>Phòng Ban</th>
              <th>Chức Vụ</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(emp => (
                <tr key={emp._id}>
                  <td>{emp.employeeId}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(emp)}>Sửa</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(emp._id)}>Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">Không tìm thấy nhân viên nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
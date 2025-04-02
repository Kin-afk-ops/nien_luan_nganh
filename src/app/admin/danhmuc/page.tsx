'use client';

import Link from 'next/link';

const DanhMuc = () => {
  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary d-flex align-items-center">
            QUẢN LÝ DANH MỤC <i className='fas fa-list ms-2'></i>
          </h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Tên loại giày</th>
                  <th>Thay đổi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Giày thể thao</td>
                  <td>
                    <Link href="#" className="btn btn-warning btn-sm mr-2">Sửa</Link>
                    <Link href="#" className="btn btn-danger btn-sm">Xóa</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card shadow">
        <div className="card-header">
          <h5 className="m-0 font-weight-bold text-primary">Tùy chỉnh:</h5>
        </div>
        <div className="card-body">
          <Link href="#" className="btn btn-info">Thêm Loại giày</Link>
        </div>
      </div>
    </div>
  );
};

export default DanhMuc;
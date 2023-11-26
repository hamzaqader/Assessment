import React, { useState, useEffect } from 'react';
import { Table, Avatar, Pagination, Input, Space } from 'antd';


const UserTable = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Assuming user data is stored in sessionStorage with the key "userData"
    const data = JSON.parse(sessionStorage.getItem('userData'));
    if (data) setUserData(data);
  }, []);

  const columns = [
    {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Profile Picture',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => <Avatar src={text} alt={record.username} />,
    },
    {
      title: 'Country',
      dataIndex: 'Country',
      key: 'Country',
    },
    {
      title: 'State',
      dataIndex: 'States',
      key: 'States',
    },
  ];

  const onChangePagination = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const filteredData = userData.filter(
    (user) =>
      (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = currentPage * pageSize;
  const currentData = filteredData.slice(startIdx, endIdx);

  return (
    <div className="user-table-container">
      <div className="search-bar">
        <Space direction="vertical">
          <label className="search-label">Search by name or email</label>
          <Input
            placeholder="Enter your search term"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </Space>
      </div>
      <Table
        dataSource={currentData}
        columns={columns}
        pagination={false}
        rowKey="email"
        scroll={{ x: true }}
      />

      <div className="pagination-container">
        <Pagination
          total={filteredData.length}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={onChangePagination}
          current={currentPage}
          itemRender={(current, type, originalElement) => {
            if (type === 'prev') {
              return <a className="pagination-link">Previous</a>;
            }
            if (type === 'next') {
              return <a className="pagination-link">Next</a>;
            }
            return <div className="pagination-link">{originalElement}</div>;
          }}
        />
      </div>
    </div>
  );
};

export default UserTable;

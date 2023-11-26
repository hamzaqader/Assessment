import React, { useState, useEffect } from 'react';
import { Table, Avatar, Pagination, Input, Space } from 'antd';
import Userdata from "../usertable/userdata";

const UserTable = () => {
  const pageSize = 10; // Number of users per page
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Your data fetching logic (if required)
    // For now, using the provided static data
    setDataSource(Userdata);
  }, []);

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Profile Picture',
      dataIndex: 'profilePicture',
      key: 'profilePicture',
      render: (text, record) => <Avatar src={text} alt={record.fullName} />,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
  ];

  const onChangePagination = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reset page to 1 when search term changes
  };

  const filteredData = dataSource.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = currentPage * pageSize;
  const currentData = filteredData.slice(startIdx, endIdx);

  return (
    <div style={{
      background : '#FFF',
      padding : '15px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', position: 'sticky', top: '0px', zIndex: '5', background: '#FFF' }}>
        <Space direction="vertical">
          <label style={{ marginBottom: '8px', display: 'block', color: '#333' }}>Search by name or email</label>
          <Input
            placeholder="Enter your search term"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: '300px', marginBottom: '8px' }}
          />
        </Space>
      </div>
      <Table
        dataSource={currentData}
        columns={columns}
        pagination={false}
        rowKey="email"
        virtual
        scroll={{ y: 450 , x : 2000}}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Pagination
          total={filteredData.length}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={onChangePagination}
          style={{ marginRight: '16px' }}
          current={currentPage}
          itemRender={(current, type, originalElement) => {
            if (type === 'prev') {
              return <a style={{

                border: '1px solid #ddd',
                borderRadius: '2px',
                padding: "5px"

              }}>Previous</a>;
            }
            if (type === 'next') {
              return <a style={{

                border: '1px solid #ddd',
                borderRadius: '2px',
                padding: "5px"

              }}>Next</a>;
            }
            return (
              <div
                style={{

                  border: '1px solid #ddd',
                  borderRadius: '2px',

                }}
              >
                {originalElement}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default UserTable;

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Input, Popconfirm, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const LeaveModal = ({ holidays, modelOpen, onClose, isHR }) => {
  const [isModalOpen, setIsModalOpen] = useState(modelOpen);
  // const [dataSource, setDataSource] = useState(holidays);
  const [dataSource, setDataSource] = useState(holidays?.map((holiday, index) => ({ ...holiday, key: `${index}` })));
  const [count, setCount] = useState(holidays?.length);

  const handleDelete = (key) => {
    const newData = dataSource?.filter((item,index) => index !== key);
    setDataSource(newData);
  };

  useEffect(() => {
    setIsModalOpen(modelOpen);
  }, [modelOpen]);

  useEffect(() => {
    setDataSource(holidays);
    setCount(holidays?.length);
  }, [holidays]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    onClose();
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      date: moment().format('YYYY-MM-DD'),
      description: 'decription...',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('/api/updateHolidays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holidays: dataSource, year: `${new Date().getFullYear()}` }), 
      });
      if (response.ok) {
        message.success('Holidays updated successfully!');
        onClose();
        setIsModalOpen(false);
      } else {
        throw new Error('Failed to update holidays');
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSaveRow = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const defaultColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: '30%',
      editable: isHR,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      editable: isHR,
    },
  ];

  if (isHR) {
    defaultColumns.push({
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    });
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSaveRow,
      }),
    };
  });

  return (
    <Modal
      title="Holiday List"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      style={{ top: '10vh', height: '70vh' }}
    >
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource?.map((item, index) => ({ ...item, key: index }))}
          columns={columns}
          pagination={false}
          scroll={{ y: 'calc(70vh - 55px - 39px)' }}
        />
        {isHR && (
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <Button
              onClick={handleAdd}
              type="primary"
              style={{
                marginRight: 8,
              }}
              icon={<PlusOutlined />}
            >
              Add a row
            </Button>
            <Button type="primary" onClick={handleSaveChanges}>
              Save
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default LeaveModal;

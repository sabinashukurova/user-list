import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table, Tooltip, Typography } from "antd";
import { EditableCellProps, Item } from "../types";
import baseService from "../baseService";

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TablePage: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Array<Item>>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const formRef = useRef<Item>(null)

  useEffect(() => {
    baseService.get("/items").then(({ data: _data }) => {
      setData(_data);
    });
  }, []);

  const isEditing = useCallback(
    (record: Item) => record.id === editingId,
    [editingId]
  );

  const cancel = () => {
    setEditingId(null);
  };

  const columns = useMemo(
    () => [
      {
        title: "№",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Ad",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "Soyad",
        dataIndex: "last_name",
        key: "last_name",
      },
      {
        title: "E-poçt",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Telefon nömrəsi",
        dataIndex: "phone",
        key: "phone",
      },
    ],
    [editingId, isEditing]
  );



  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default TablePage;

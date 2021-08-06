import { Table } from 'antd';

const columns = [
  {
    title: 'Autor',
    dataIndex: 'AUTOR',
    key: '_id',
  },
  {
    title: 'Codigo',
    dataIndex: 'CODIGO',
    key: '_id',
  },
  {
    title: 'Codigo Alterno',
    dataIndex: 'ALTERNO',
    key: '_id',
  },
  {
    title: 'Descripcion',
    dataIndex: 'DESCRIPCION',
    key: '_id',
  }
]

const Tabla = ({ dataTabla }) => {
  return (
    <div className="table__styles">
      <Table dataSource={dataTabla} columns={columns} scroll={{ x: 1300 }} />
    </div>
  )
}


export default Tabla
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { MDBDataTableV5 } from 'mdbreact';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { fetchStreet } from '../http/streetAPI'

const EditableTable = observer(({ onEdit, onDelete }) => {
  const { streets } = useContext(Context);
  useEffect(() => {
    fetchStreet().then(data => streets.setStreets(data));
  }, []);

  const [searchItem, setSearchItem] = useState('');

  const datatable = {
    columns: [
      { label: '№', field: 'id', sort: 'asc', width: 150 },
      { label: 'Название', field: 'street_name', sort: 'asc', width: 270 },
      { label: 'Описание', field: 'description', sort: 'asc', width: 200 },
      { label: 'Действия', field: 'actions', sort: 'disabled', width: 100 },
    ],
    rows: streets.streets.map(street => ({
      id: street.id,
      street_name: street.street_name,
      description: street.description,
      actions: <><FaEdit onClick={() => onEdit(street)} style={{ cursor: 'pointer', marginRight: '10px' }} /><FaTrashAlt onClick={() => onDelete(street.id)} style={{ cursor: 'pointer' }} />
      </>
    })),
  };
  useEffect(() => {
    if (searchItem === '') {
      datatable.rows = streets.streets.map(street => ({
        id: street.id,
        street_name: street.street_name,
        description: street.description,
      }));
    } else {
      datatable.rows = streets.streets
        .filter(street => street.street_name.toLowerCase().includes(searchItem.toLowerCase()))
        .map(street => ({
          id: street.id,
          street_name: street.street_name,
          description: street.description,
        }));
    }
  }, [searchItem, streets.streets]);
  return (
    <div className='mt-5'>
      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={datatable}
        searchTop
        searchBottom={false}
      />
    </div>
  );
});

export default EditableTable;

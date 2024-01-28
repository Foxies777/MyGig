import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Table, Form } from "react-bootstrap";
import { MDBInput } from "mdbreact";
import { Context } from '../main';

import { fetchStreet } from '../http/streetAPI';

const EditableTable = observer(() => {
  const { streets } = useContext(Context)




  useEffect(() => {
    fetchStreet().then(data => streets.setStreets(data))
  }, [])

  const [searchItem, setSearchItem] = useState('')
  const [filteredStreets, setFilteredStreets] = useState(streets.streets.map(street => street.street_name))
  console.log(streets.streets.map(street => street.street_name));
  const handleInputChange = (e) => {
    const searchTerm = e.target.value
    setSearchItem(searchTerm)

    const filteredItems = streets.streets.filter((street) =>
      street.street_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredStreets(filteredItems);
  }


  return (
    <div className='mt-5'>
      <Form.Control 
      type="text" 
      placeholder="Поиск" 
      value={searchItem}
      onChange={handleInputChange} />
      
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>№</th>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {filteredStreets.map((street) => {
            return <tr key={street.id}>
              <td>
                {street.id}
              </td>
              <td>
                {street.street_name}
              </td>
              <td>
                {street.description}
              </td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>
  );
});

export default EditableTable;
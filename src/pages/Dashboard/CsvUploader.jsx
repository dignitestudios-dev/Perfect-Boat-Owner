import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvUploader = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            console.log("result",results?.data)
          const parsedData = results.data.map((item) => ({
            name: item.name || '',
            email: item.email || '',
            jobTitle: item.jobTitle || '',
            image: item.image || '',
          }));
          setData(parsedData);
          console.log(parsedData)
          checkForErrors(parsedData);
        },
      });
    }
  };

  const checkForErrors = (parsedData) => {
    const newErrors = parsedData.reduce((acc, item, index) => {
      const errorFields = [];
      if (!item.name) errorFields.push('name');
      if (!item.email) errorFields.push('email');
      if (!item.jobTitle) errorFields.push('jobTitle');
      if (!item.image) errorFields.push('image');
      
      if (errorFields.length > 0) {
        acc[index] = errorFields;
      }
      return acc;
    }, {});
    
    setErrors(newErrors);
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <table className='bg-black'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody className='bg-black'>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className='bg-black'
                />
              </td>
              <td>
                <input
                  type="email"
                  value={item.email}
                  onChange={(e) => handleChange(index, 'email', e.target.value)}
                  className='bg-black'
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.jobTitle}
                  onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                  className='bg-black'
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.image}
                  onChange={(e) => handleChange(index, 'image', e.target.value)}
                  className='bg-black'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Object.keys(errors).length > 0 && (
        <div>
          <h3>Errors:</h3>
          <ul>
            {Object.entries(errors).map(([index, fields]) => (
              <li key={index}>
                Row {parseInt(index) + 1}: Missing {fields.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
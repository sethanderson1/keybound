import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import { Accordion, AccordionHeader } from './Accordion';

const Row = ({ record, children }) => {
  return (
    <tr className="text-left py-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, [record])
      )}
    </tr>
  );
};

const TableHeaders = ({ columns = [] }) => {
  return (
    <thead>
      <tr className="text-left">
        {columns.map((column: any) => (
          <th key={column?.header} className="text-sm sm:text-base p-2">
            {column?.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableRows = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((record) => (
        <Row key={record.id} record={record}>
          {columns.map((column) => (
            <Fragment key={column.header}>{column.component(record)}</Fragment>
          ))}
        </Row>
      ))}
    </tbody>
  );
};

const Table = ({ title, data, columns }) => {
  const [accordionId, setAccordionId] = useState('');

  useEffect(() => {
    setAccordionId(title);
  }, []);

  const toggleCollapse = (id) => () => {
    setAccordionId((prevState) => (prevState !== id ? id : ''));
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl mx-3">
          <h1 className="mt-11 mb-3 text-2xl p-2 bg-gray-700 text-gray-100">
            <AccordionHeader
              id={title}
              accordionId={accordionId}
              onClick={toggleCollapse(title)}
            >
              {title}
            </AccordionHeader>
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <Accordion id={title} isOpen={accordionId}>
          <table className="table-fixed w-full max-w-2xl mx-3">
            <colgroup>
              {columns.map((column) => {
                return <col key={column.header} className={column.colWidth} />;
              })}
            </colgroup>
            <TableHeaders columns={columns} />
            <TableRows data={data} columns={columns} />
          </table>
        </Accordion>
      </div>
    </div>
  );
};

const KeybindList = ({ sheetData = [], columns, titleField }) => {
  const titleNames = [...new Set(sheetData.map((el) => el[titleField]))];

  return titleNames.map((title, i) => {
    const tableData = _.filter(sheetData, { categoryId: i + 1 });
    return (
      <Table key={title} title={title} data={tableData} columns={columns} />
    );
  });
};

export default KeybindList;

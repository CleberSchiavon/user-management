'use client'
import React from 'react'

interface TableComponentProps {
  headers: string[]
  rows: string[][]
}

const TableComponent: React.FC<TableComponentProps> = ({ headers, rows }) => {
  return (
    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-white w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableComponent

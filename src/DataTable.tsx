import React, { useState, useCallback, useMemo } from 'react';
import { DataTableProps, Column, SortConfig } from './types';
import './DataTable.css';

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Generate unique row IDs
  const getRowId = useCallback((row: T, index: number): string => {
    return `row-${index}`;
  }, []);

  // Handle sorting
  const handleSort = useCallback((columnKey: string) => {
    setSortConfig((currentSort) => {
      if (currentSort?.key === columnKey) {
        return {
          key: columnKey,
          direction: currentSort.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key: columnKey, direction: 'asc' };
    });
  }, []);

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  // Handle row selection
  const handleRowSelect = useCallback((row: T, index: number) => {
    if (!selectable) return;

    const rowId = getRowId(row, index);
    setSelectedRows((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(rowId)) {
        newSelected.delete(rowId);
      } else {
        newSelected.add(rowId);
      }
      return newSelected;
    });
  }, [selectable, getRowId]);

  // Handle select all
  const handleSelectAll = useCallback(() => {
    if (!selectable) return;

    setSelectedRows((prev) => {
      if (prev.size === sortedData.length) {
        return new Set();
      } else {
        return new Set(sortedData.map((row, index) => getRowId(row, index)));
      }
    });
  }, [selectable, sortedData, getRowId]);

  // Notify parent of selected rows
  React.useEffect(() => {
    if (onRowSelect) {
      const selectedData = sortedData.filter((row, index) => 
        selectedRows.has(getRowId(row, index))
      );
      onRowSelect(selectedData);
    }
  }, [selectedRows, sortedData, onRowSelect, getRowId]);

  // Loading state
  if (loading) {
    return (
      <div className="datatable-container" role="table" aria-label="Data table loading">
        <div className="datatable-loading">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="datatable-container" role="table" aria-label="Data table empty">
        <div className="datatable-empty">
          <div className="empty-icon">📊</div>
          <h3>No data available</h3>
          <p>There are no records to display at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="datatable-container" role="table" aria-label="Data table">
      <div className="datatable-header">
        <table className="datatable-table">
          <thead>
            <tr>
              {selectable && (
                <th className="datatable-header-cell select-cell">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === sortedData.length && sortedData.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`datatable-header-cell ${
                    column.sortable ? 'sortable' : ''
                  } ${sortConfig?.key === column.key ? `sort-${sortConfig.direction}` : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                  role={column.sortable ? 'button' : undefined}
                  tabIndex={column.sortable ? 0 : undefined}
                  aria-label={
                    column.sortable
                      ? `Sort by ${column.title} ${
                          sortConfig?.key === column.key
                            ? sortConfig.direction === 'asc'
                              ? 'descending'
                              : 'ascending'
                            : 'ascending'
                        }`
                      : undefined
                  }
                >
                  <span className="header-content">
                    {column.title}
                    {column.sortable && (
                      <span className="sort-indicator">
                        {sortConfig?.key === column.key
                          ? sortConfig.direction === 'asc'
                            ? ' ↑'
                            : ' ↓'
                          : ' ↕'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => {
              const rowId = getRowId(row, index);
              const isSelected = selectedRows.has(rowId);
              
              return (
                <tr
                  key={rowId}
                  className={`datatable-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleRowSelect(row, index)}
                  role="row"
                  aria-selected={selectable ? isSelected : undefined}
                >
                  {selectable && (
                    <td className="datatable-cell select-cell">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleRowSelect(row, index)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="datatable-cell"
                      data-label={column.title}
                    >
                      {String(row[column.dataIndex] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*
Example Usage:

import React, { useState } from 'react';
import { DataTable } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const userData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
];

const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <DataTable 
      data={userData} 
      columns={columns}
      selectable={true}
      onRowSelect={setSelectedUsers}
    />
  );
}
*/ 
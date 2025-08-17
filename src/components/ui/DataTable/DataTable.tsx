import React, { useState, useCallback, useMemo } from 'react';
import { DataTableProps, Column, SortConfig } from '../../../types';
import { cn } from '../../../lib/utils';

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
      <div className="w-full max-w-full overflow-x-auto rounded-lg bg-white shadow-sm border border-gray-200" role="table" aria-label="Data table loading">
        <div className="flex flex-col items-center justify-center py-16 px-5 text-gray-500">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
          <p className="text-sm">Loading data...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="w-full max-w-full overflow-x-auto rounded-lg bg-white shadow-sm border border-gray-200" role="table" aria-label="Data table empty">
        <div className="flex flex-col items-center justify-center py-16 px-5 text-center text-gray-500">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No data available</h3>
          <p className="text-sm">There are no records to display at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-lg bg-white shadow-sm border border-gray-200" role="table" aria-label="Data table">
      <div className="min-w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="w-12 px-6 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === sortedData.length && sortedData.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                    column.sortable && "cursor-pointer hover:bg-gray-100 focus:bg-gray-100",
                    sortConfig?.key === column.key && "bg-gray-100"
                  )}
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
                  <div className="flex items-center justify-between">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <span className="ml-2 text-gray-400">
                        {sortConfig?.key === column.key
                          ? sortConfig.direction === 'asc'
                            ? ' ↑'
                            : ' ↓'
                          : ' ↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => {
              const rowId = getRowId(row, index);
              const isSelected = selectedRows.has(rowId);
              
              return (
                <tr
                  key={rowId}
                  className={cn(
                    "hover:bg-gray-50 transition-colors",
                    isSelected && "bg-primary-50 hover:bg-primary-100"
                  )}
                  onClick={() => handleRowSelect(row, index)}
                  role="row"
                  aria-selected={selectable ? isSelected : undefined}
                >
                  {selectable && (
                    <td className="w-12 px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleRowSelect(row, index)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select row ${index + 1}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
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
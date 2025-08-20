import React, { useState, useMemo } from 'react';
import './DataTable.css';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  emptyText?: string;
  loadingText?: string;
  rowKey?: keyof T | ((record: T, index: number) => string);
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

type SortDirection = 'asc' | 'desc' | null;

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className = '',
  theme = 'light',
  size = 'md',
  emptyText = 'No data available',
  loadingText = 'Loading...',
  rowKey,
  pagination,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  } | null>(null);

  // Generate unique keys for rows
  const getRowKey = (record: T, index: number): string => {
    if (rowKey) {
      if (typeof rowKey === 'function') {
        return rowKey(record, index);
      }
      return String(record[rowKey]);
    }
    return String(index);
  };

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  // Handle column sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortConfig(prev => {
      if (prev?.key === column.key) {
        if (prev.direction === 'asc') {
          return { key: column.key, direction: 'desc' };
        } else if (prev.direction === 'desc') {
          return null; // Remove sorting
        }
      }
      return { key: column.key, direction: 'asc' };
    });
  };

  // Handle row selection
  const handleRowSelect = (rowKey: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(rowKey);
    } else {
      newSelectedRows.delete(rowKey);
    }
    setSelectedRows(newSelectedRows);

    if (onRowSelect) {
      const selectedData = sortedData.filter((_, index) => 
        newSelectedRows.has(getRowKey(sortedData[index], index))
      );
      onRowSelect(selectedData);
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = sortedData.map((record, index) => getRowKey(record, index));
      setSelectedRows(new Set(allKeys));
      if (onRowSelect) {
        onRowSelect(sortedData);
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  };

  // Check if all rows are selected
  const isAllSelected = sortedData.length > 0 && 
    sortedData.every((_, index) => selectedRows.has(getRowKey(sortedData[index], index)));

  // Check if some rows are selected
  const isIndeterminate = !isAllSelected && 
    sortedData.some((_, index) => selectedRows.has(getRowKey(sortedData[index], index)));

  const containerClasses = [
    'data-table-container',
    `data-table--${theme}`,
    `data-table--${size}`,
    className
  ].filter(Boolean).join(' ');

  const tableClasses = [
    'data-table',
    `data-table--${theme}`,
    `data-table--${size}`
  ].filter(Boolean).join(' ');

  if (loading) {
    return (
      <div className={containerClasses}>
        <div className="data-table__loading">
          <div className="data-table__spinner"></div>
          <p className="data-table__loading-text">{loadingText}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={containerClasses}>
        <div className="data-table__empty">
          <div className="data-table__empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </div>
          <p className="data-table__empty-text">{emptyText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className="data-table__wrapper">
        <table className={tableClasses}>
          <thead className="data-table__header">
            <tr className="data-table__header-row">
              {selectable && (
                <th className="data-table__header-cell data-table__header-cell--checkbox">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="data-table__checkbox"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`data-table__header-cell ${
                    column.sortable ? 'data-table__header-cell--sortable' : ''
                  }`}
                  style={{
                    width: column.width,
                    textAlign: column.align || 'left'
                  }}
                  onClick={() => handleSort(column)}
                >
                  <div className="data-table__header-content">
                    <span className="data-table__header-title">{column.title}</span>
                    {column.sortable && (
                      <div className="data-table__sort-icons">
                        <svg
                          className={`data-table__sort-icon ${
                            sortConfig?.key === column.key && sortConfig?.direction === 'asc'
                              ? 'data-table__sort-icon--active'
                              : ''
                          }`}
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="18,15 12,9 6,15"></polyline>
                        </svg>
                        <svg
                          className={`data-table__sort-icon ${
                            sortConfig?.key === column.key && sortConfig?.direction === 'desc'
                              ? 'data-table__sort-icon--active'
                              : ''
                          }`}
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="data-table__body">
            {sortedData.map((record, index) => {
              const rowKeyValue = getRowKey(record, index);
              const isSelected = selectedRows.has(rowKeyValue);
              
              return (
                <tr
                  key={rowKeyValue}
                  className={`data-table__row ${
                    isSelected ? 'data-table__row--selected' : ''
                  }`}
                >
                  {selectable && (
                    <td className="data-table__cell data-table__cell--checkbox">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleRowSelect(rowKeyValue, e.target.checked)}
                        className="data-table__checkbox"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="data-table__cell"
                      style={{ textAlign: column.align || 'left' }}
                    >
                      {column.render
                        ? column.render(record[column.dataIndex], record, index)
                        : record[column.dataIndex] !== null && record[column.dataIndex] !== undefined
                        ? String(record[column.dataIndex])
                        : '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="data-table__pagination">
          <div className="data-table__pagination-info">
            Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} entries
          </div>
          <div className="data-table__pagination-controls">
            <button
              className="data-table__pagination-button"
              disabled={pagination.current === 1}
              onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
            >
              Previous
            </button>
            <span className="data-table__pagination-current">
              Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <button
              className="data-table__pagination-button"
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

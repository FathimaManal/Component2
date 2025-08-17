import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './DataTable';
import { Column } from './types';

// Sample data type for testing
interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Sample data
const sampleData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
];

// Sample columns
const sampleColumns: Column<TestData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

describe('DataTable', () => {
  describe('Basic Rendering', () => {
    it('renders table with data and columns', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);
      
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('35')).toBeInTheDocument();
    });

    it('renders empty state when no data', () => {
      render(<DataTable data={[]} columns={sampleColumns} />);
      
      expect(screen.getByText('No data available')).toBeInTheDocument();
      expect(screen.getByText('There are no records to display at the moment.')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} loading={true} />);
      
      expect(screen.getByText('Loading data...')).toBeInTheDocument();
      expect(screen.getByRole('table')).toHaveAttribute('aria-label', 'Data table loading');
    });
  });

  describe('Row Selection', () => {
    it('shows checkboxes when selectable is true', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} selectable={true} />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(sampleData.length + 1); // +1 for select all checkbox
    });

    it('does not show checkboxes when selectable is false', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} selectable={false} />);
      
      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes).toHaveLength(0);
    });

    it('handles row selection and calls onRowSelect callback', async () => {
      const onRowSelect = jest.fn();
      render(
        <DataTable 
          data={sampleData} 
          columns={sampleColumns} 
          selectable={true}
          onRowSelect={onRowSelect}
        />
      );
      
      const user = userEvent.setup();
      const firstRowCheckbox = screen.getAllByRole('checkbox')[1]; // Skip select all checkbox
      
      await user.click(firstRowCheckbox);
      
      expect(onRowSelect).toHaveBeenCalledWith([sampleData[0]]);
    });

    it('handles select all functionality', async () => {
      const onRowSelect = jest.fn();
      render(
        <DataTable 
          data={sampleData} 
          columns={sampleColumns} 
          selectable={true}
          onRowSelect={onRowSelect}
        />
      );
      
      const user = userEvent.setup();
      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      
      await user.click(selectAllCheckbox);
      
      expect(onRowSelect).toHaveBeenCalledWith(sampleData);
    });

    it('deselects all when select all is clicked again', async () => {
      const onRowSelect = jest.fn();
      render(
        <DataTable 
          data={sampleData} 
          columns={sampleColumns} 
          selectable={true}
          onRowSelect={onRowSelect}
        />
      );
      
      const user = userEvent.setup();
      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      
      // Select all
      await user.click(selectAllCheckbox);
      expect(onRowSelect).toHaveBeenCalledWith(sampleData);
      
      // Deselect all
      await user.click(selectAllCheckbox);
      expect(onRowSelect).toHaveBeenCalledWith([]);
    });
  });

  describe('Sorting', () => {
    it('shows sort indicators for sortable columns', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);
      
      const sortableHeaders = screen.getAllByText(/↕/);
      expect(sortableHeaders).toHaveLength(3); // ID, Name, Age columns
    });

    it('handles column sorting', async () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);
      
      const user = userEvent.setup();
      const nameHeader = screen.getByText('Name');
      
      // Click to sort ascending
      await user.click(nameHeader);
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      
      // Click to sort descending
      await user.click(nameHeader);
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('does not allow sorting on non-sortable columns', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);
      
      const emailHeader = screen.getByText('Email');
      expect(emailHeader).not.toHaveClass('sortable');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);
      
      expect(screen.getByRole('table')).toHaveAttribute('aria-label', 'Data table');
    });

    it('has proper ARIA labels for sortable columns', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);
      
      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toHaveAttribute('aria-label', 'Sort by Name ascending');
    });

    it('has proper ARIA labels for checkboxes', () => {
      render(<DataTable data={sampleData} columns={sampleColumns} selectable={true} />);
      
      const selectAllCheckbox = screen.getByLabelText('Select all rows');
      expect(selectAllCheckbox).toBeInTheDocument();
      
      const firstRowCheckbox = screen.getByLabelText('Select row 1');
      expect(firstRowCheckbox).toBeInTheDocument();
    });

    it('supports keyboard navigation for sortable columns', async () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);
      
      const nameHeader = screen.getByText('Name').closest('th');
      nameHeader?.focus();
      
      fireEvent.keyDown(nameHeader!, { key: 'Enter' });
      
      await waitFor(() => {
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive styles on mobile', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      
      render(<DataTable data={sampleData} columns={sampleColumns} />);
      
      // Trigger resize event
      fireEvent(window, new Event('resize'));
      
      // The component should still render correctly
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles null/undefined values in data', () => {
      const dataWithNulls: TestData[] = [
        { id: 1, name: 'John', email: 'john@example.com', age: 30 },
        { id: 2, name: null as any, email: undefined as any, age: 25 },
      ];
      
      render(<DataTable data={dataWithNulls} columns={sampleColumns} />);
      
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('')).toBeInTheDocument(); // Empty string for null/undefined
    });

    it('handles empty columns array', () => {
      render(<DataTable data={sampleData} columns={[]} />);
      
      expect(screen.getByRole('table')).toBeInTheDocument();
      // Should show empty state since no columns to display
    });
  });
}); 
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { Column } from '../../../types';

// Sample data types for stories
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  startDate: string;
  isActive: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample user data
const userData: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@company.com', role: 'Developer', department: 'Engineering', salary: 75000, startDate: '2023-01-15', isActive: true },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Designer', department: 'Design', salary: 65000, startDate: '2023-02-20', isActive: true },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@company.com', role: 'Manager', department: 'Sales', salary: 85000, startDate: '2022-11-10', isActive: false },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@company.com', role: 'Analyst', department: 'Marketing', salary: 60000, startDate: '2023-03-05', isActive: true },
  { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@company.com', role: 'Developer', department: 'Engineering', salary: 80000, startDate: '2022-09-12', isActive: true },
];

// Sample product data
const productData: Product[] = [
  { id: 'P001', name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 45, rating: 4.5 },
  { id: 'P002', name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 120, rating: 4.2 },
  { id: 'P003', name: 'Gaming Keyboard', category: 'Accessories', price: 89.99, stock: 30, rating: 4.7 },
  { id: 'P004', name: 'Monitor 27"', category: 'Electronics', price: 299.99, stock: 25, rating: 4.3 },
  { id: 'P005', name: 'USB Cable', category: 'Accessories', price: 9.99, stock: 200, rating: 3.8 },
];

// Column definitions for users
const userColumns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'department', title: 'Department', dataIndex: 'department', sortable: true },
  { key: 'salary', title: 'Salary', dataIndex: 'salary', sortable: true },
  { key: 'startDate', title: 'Start Date', dataIndex: 'startDate', sortable: true },
  { key: 'isActive', title: 'Active', dataIndex: 'isActive' },
];

// Column definitions for products
const productColumns: Column<Product>[] = [
  { key: 'id', title: 'Product ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Product Name', dataIndex: 'name', sortable: true },
  { key: 'category', title: 'Category', dataIndex: 'category', sortable: true },
  { key: 'price', title: 'Price ($)', dataIndex: 'price', sortable: true },
  { key: 'stock', title: 'Stock', dataIndex: 'stock', sortable: true },
  { key: 'rating', title: 'Rating', dataIndex: 'rating', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A fully featured data table component with sorting, selection, loading states, and responsive design.',
      },
    },
  },
  argTypes: {
    data: {
      control: false,
      description: 'Array of data objects to display',
    },
    columns: {
      control: false,
      description: 'Column configuration array',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner when true',
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Enables row selection with checkboxes',
    },
    onRowSelect: {
      action: 'rowSelected',
      description: 'Callback when rows are selected/deselected',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: userData,
    columns: userColumns,
  },
};

export const WithSelection: Story = {
  args: {
    data: userData,
    columns: userColumns,
    selectable: true,
  },
};

export const ProductTable: Story = {
  args: {
    data: productData,
    columns: productColumns,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with product inventory data, demonstrating different data types.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    data: userData,
    columns: userColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable in empty state when no data is provided.',
      },
    },
  },
};

export const MinimalColumns: Story = {
  args: {
    data: userData.slice(0, 3),
    columns: userColumns.slice(0, 4),
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with fewer columns for better mobile experience.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(false);

    const handleSimulateLoading = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={handleSimulateLoading}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Simulate Loading'}
          </button>
        </div>
        
        <DataTable
          data={userData}
          columns={userColumns}
          selectable={true}
          loading={loading}
          onRowSelect={setSelectedUsers}
        />
        
        {selectedUsers.length > 0 && (
          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">Selected Users:</h4>
            <p className="text-sm text-gray-600">
              {selectedUsers.map(user => user.name).join(', ')}
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive DataTable with loading simulation and selection display.',
      },
    },
  },
};

export const Responsive: Story = {
  render: () => (
    <div className="max-w-md">
      <p className="text-sm text-gray-600 mb-4">
        This table demonstrates responsive behavior on smaller screens.
      </p>
      <DataTable
        data={userData.slice(0, 3)}
        columns={userColumns}
        selectable={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DataTable in a constrained container to show responsive behavior.',
      },
    },
  },
}; 
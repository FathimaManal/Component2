import React, { useState } from 'react';
import { DataTable } from './DataTable';
import { Column } from './types';

// Example data types
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

export function DataTableDemo() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUserSelect = (users: User[]) => {
    setSelectedUsers(users);
    console.log('Selected users:', users);
  };

  const handleProductSelect = (products: Product[]) => {
    setSelectedProducts(products);
    console.log('Selected products:', products);
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>React DataTable Component Demo</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Basic DataTable</h2>
        <p>A simple table with sorting capabilities:</p>
        <DataTable 
          data={userData} 
          columns={userColumns}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Selectable DataTable</h2>
        <p>A table with row selection functionality:</p>
        <DataTable 
          data={userData} 
          columns={userColumns}
          selectable={true}
          onRowSelect={handleUserSelect}
        />
        {selectedUsers.length > 0 && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <strong>Selected Users:</strong> {selectedUsers.map(user => user.name).join(', ')}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Product Inventory Table</h2>
        <p>A table with different data types (strings, numbers, decimals):</p>
        <DataTable 
          data={productData} 
          columns={productColumns}
          selectable={true}
          onRowSelect={handleProductSelect}
        />
        {selectedProducts.length > 0 && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <strong>Selected Products:</strong> {selectedProducts.map(product => product.name).join(', ')}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Loading State</h2>
        <p>A table showing loading state:</p>
        <button 
          onClick={simulateLoading}
          style={{ 
            marginBottom: '10px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Simulate Loading'}
        </button>
        <DataTable 
          data={userData} 
          columns={userColumns}
          loading={loading}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Empty State</h2>
        <p>A table with no data:</p>
        <DataTable 
          data={[]} 
          columns={userColumns}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Responsive Design</h2>
        <p>This table adapts to mobile screens. Try resizing your browser window:</p>
        <DataTable 
          data={userData.slice(0, 3)} 
          columns={userColumns}
          selectable={true}
        />
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>✅ Fully typed with TypeScript</li>
          <li>✅ Dynamic column configuration</li>
          <li>✅ Column sorting (click on sortable column headers)</li>
          <li>✅ Row selection with checkboxes</li>
          <li>✅ Select all functionality</li>
          <li>✅ Loading state with spinner</li>
          <li>✅ Empty state with friendly message</li>
          <li>✅ Responsive design for mobile devices</li>
          <li>✅ Accessibility features (ARIA labels, keyboard navigation)</li>
          <li>✅ Modern, clean styling</li>
          <li>✅ Callback for selected rows</li>
        </ul>
      </div>
    </div>
  );
} 
import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  DataTable 
} from './ui';
import { Column } from '../types';

// Sample data for DataTable
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

const userData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', department: 'Design' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', department: 'Sales' },
];

const userColumns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'department', title: 'Department', dataIndex: 'department', sortable: true },
];

export function ComponentShowcase() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [buttonCount, setButtonCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInteractiveButton = async () => {
    setIsLoading(true);
    // Simulate some async work
    await new Promise(resolve => setTimeout(resolve, 1500));
    setButtonCount(prev => prev + 1);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
            React UI Components
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A collection of thoughtfully crafted, accessible components built with modern web technologies.
          </p>
        </div>

        {/* Button Section */}
        <section className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">Button Component</h2>
            </div>
            <p className="text-gray-600 mb-10 text-lg">
              Versatile buttons with multiple variants, sizes, and interactive states.
            </p>

            {/* Button Variants */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Sizes</h3>
              <div className="flex items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">+</Button>
              </div>
            </div>

            {/* Button States */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">States</h3>
              <div className="flex items-center gap-4">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button onClick={() => setButtonCount(prev => prev + 1)}>
                  Clicked {buttonCount} times
                </Button>
              </div>
            </div>

            {/* Interactive Example */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Interactive Example</h3>
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <p className="text-gray-700 mb-4 font-medium">
                  This button demonstrates loading state and click handling:
                </p>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    leftIcon={<span>🎯</span>}
                    rightIcon={<span>→</span>}
                    onClick={handleInteractiveButton}
                    loading={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Interactive Button'}
                  </Button>
                  {buttonCount > 0 && (
                    <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                      Clicked {buttonCount} time{buttonCount !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Card Section */}
        <section className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">Card Component</h2>
            </div>
            <p className="text-gray-600 mb-10 text-lg">
              Flexible cards with header, content, and footer sections.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Basic Card */}
              <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>A simple card with all sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    This card demonstrates the basic structure with header, content, and footer.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>

              {/* Card with Actions */}
              <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle>Project Alpha</CardTitle>
                  <CardDescription>Leading edge technology</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Innovative solutions for modern problems.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Create</Button>
                </CardFooter>
              </Card>

              {/* Interactive Card */}
              <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Hover over this card</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    This card has hover effects and can be made interactive.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm">Learn More</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* DataTable Section */}
        <section className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">DataTable Component</h2>
            </div>
            <p className="text-gray-600 mb-10 text-lg">
              Fully featured data table with sorting, selection, and responsive design.
            </p>

            <div className="space-y-8">
              {/* Basic Table */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Table</h3>
                <DataTable 
                  data={userData} 
                  columns={userColumns}
                />
              </div>

              {/* Selectable Table */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Selectable Table</h3>
                <DataTable 
                  data={userData} 
                  columns={userColumns}
                  selectable={true}
                  onRowSelect={setSelectedUsers}
                />
                {selectedUsers.length > 0 && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Selected Users:</h4>
                    <p className="text-blue-700">
                      {selectedUsers.map(user => user.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 
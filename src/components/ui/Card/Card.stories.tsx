import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with header, content, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">Footer content</p>
      </CardFooter>
    </Card>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This project will be created in your workspace.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="p-6">
        <p>This is a simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600" />
      <CardHeader>
        <CardTitle>Featured Project</CardTitle>
        <CardDescription>
          A beautiful project showcase with gradient background.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates how to include images or decorative elements.</p>
      </CardContent>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover over this card to see effects.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has hover effects and can be made interactive.</p>
      </CardContent>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Project Alpha</CardTitle>
          <CardDescription>Leading edge technology</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Innovative solutions for modern problems.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Learn More</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Beta</CardTitle>
          <CardDescription>Scalable architecture</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Built to grow with your business needs.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">View Details</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Gamma</CardTitle>
          <CardDescription>Performance focused</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Optimized for speed and efficiency.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="secondary">Get Started</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Card className="w-[350px] border-primary-200 bg-gradient-to-br from-white to-primary-50">
      <CardHeader className="border-b border-primary-100">
        <CardTitle className="text-primary-800">Custom Styled</CardTitle>
        <CardDescription className="text-primary-600">
          This card has custom colors and styling.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-primary-700">
        <p>Custom styling can be applied through className props.</p>
      </CardContent>
      <CardFooter className="border-t border-primary-100">
        <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-50">
          Custom Button
        </Button>
      </CardFooter>
    </Card>
  ),
}; 
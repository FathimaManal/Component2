import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { 
  HeartIcon, 
  ArrowRightIcon, 
  PlusIcon,
  TrashIcon 
} from '@heroicons/react/24/outline';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side of the button',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side of the button',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <HeartIcon className="h-4 w-4" />,
    children: 'Like',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRightIcon className="h-4 w-4" />,
    children: 'Continue',
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <PlusIcon className="h-4 w-4" />,
    'aria-label': 'Add item',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together for comparison.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const handleClick = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCount(prev => prev + 1);
      setLoading(false);
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-600">Count: {count}</p>
        <Button onClick={handleClick} loading={loading}>
          {loading ? 'Processing...' : 'Click me!'}
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive button example with loading state and counter.',
      },
    },
  },
}; 
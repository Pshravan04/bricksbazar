import { Metadata } from 'next';
import PostPropertyWizard from '@/features/properties/PostPropertyWizard';

export const metadata: Metadata = {
  title: 'Post Property | 14-Step Listing Submission | BricksBazar',
  description:
    'List your residential flat, luxury villa, commercial office, or land on BricksBazar. Fast 14-step guided wizard with RERA compliance verification.',
};

export default function PostPropertyPage() {
  return <PostPropertyWizard />;
}


import { Metadata } from 'next';
import PostPropertyWizard from '@/features/properties/PostPropertyWizard';

export const metadata: Metadata = {
  title: 'Post Free Property Ad | BricksBazar',
  description:
    'Post your property for sale or rent on BricksBazar. Reach thousands of verified buyers and high-credit tenants across Mumbai, Pune, Thane, Bengaluru, and Delhi NCR.',
};

export default function PublicPostPropertyPage() {
  return <PostPropertyWizard />;
}


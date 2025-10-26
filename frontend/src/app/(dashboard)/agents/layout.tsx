import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Agent Conversation | Genera AI',
  description: 'Interactive agent conversation powered by Genera AI',
  openGraph: {
    title: 'Agent Conversation | Genera AI',
    description: 'Interactive agent conversation powered by Genera AI',
    type: 'website',
  },
};

export default async function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

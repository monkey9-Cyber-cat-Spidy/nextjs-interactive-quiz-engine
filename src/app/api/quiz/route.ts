import { NextResponse } from 'next/server';

export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'PostgreSQL Internals',
    question: 'Which index type is best suited for geospatial and multi-dimensional spatial bounding box queries in PostgreSQL?',
    options: ['B-Tree Index', 'GiST (Generalized Search Tree)', 'Hash Index', 'BRIN Index'],
    correctIndex: 1,
    explanation: 'GiST indexes support spatial operators such as ST_DWithin and bounding box overlap (&&) required by PostGIS.'
  },
  {
    id: 2,
    category: 'Next.js 14 App Router',
    question: 'How do React Server Components (RSC) improve performance compared to traditional client-side rendering?',
    options: [
      'They send JavaScript bundles for all component logic to the browser',
      'They eliminate client bundle size for imported backend dependencies and run securely on the server',
      'They replace CSS stylesheets with server workers',
      'They bypass HTTP/2 multiplexing'
    ],
    correctIndex: 1,
    explanation: 'RSC code stays on the server, resulting in zero client JavaScript bundle cost for heavy server libraries.'
  },
  {
    id: 3,
    category: 'Distributed Systems',
    question: 'In BullMQ / Redis queues, what mechanism guarantees that failed jobs are isolated rather than infinitely crashing workers?',
    options: ['Exponential backoff with Dead Letter Queue (DLQ)', 'Round-robin roundtrips', 'DNS failover', 'Direct disk fsync'],
    correctIndex: 0,
    explanation: 'Dead Letter Queues isolate persistently failing payloads once maximum retry attempts are exhausted.'
  },
  {
    id: 4,
    category: 'VPS Architecture',
    question: 'Which tool is industry standard for managing reverse proxying, SSL termination, and static asset caching on an Ubuntu VPS?',
    options: ['Systemd Daemon', 'Nginx Reverse Proxy', 'Bcrypt worker', 'PM2 cluster only'],
    correctIndex: 1,
    explanation: 'Nginx acts as the frontline reverse proxy handling incoming port 80/443 traffic, TLS termination, and upstream load balancing.'
  }
];

export async function GET() {
  return NextResponse.json({ questions: QUESTIONS });
}

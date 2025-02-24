import { useQuery } from '@tanstack/react-query';
import { Project } from '../types/project';

const projects: Project[] = [
  {
    id: 1,
    slug: 'nfc-legal',
    title: 'NFC Legal Docs',
    description: 'Smart document management system using NFC technology',
    previewImage: 'assets/nfc-legal-preview.jpg',
    technologies: ['NFC', 'React', 'Node.js'],
    demoUrl: '#',
    sourceUrl: '#',
    features: [
      'Secure document signing',
      'Real-time tracking',
      'Blockchain verification'
    ]
  },
  {
    id: 2,
    slug: 'ai-support',
    title: 'AI Support Bot',
    description: 'Advanced customer support automation with AI',
    previewImage: 'assets/ai-support-preview.jpg',
    technologies: ['AI', 'Python', 'TensorFlow'],
    demoUrl: '#',
    sourceUrl: '#',
    features: [
      'Natural language processing',
      'Context-aware responses',
      'Multi-language support'
    ]
  },
  {
    id: 3,
    slug: 'iot-automation',
    title: 'IoT Automation',
    description: 'Smart home automation using IoT devices',
    previewImage: 'assets/iot-preview.jpg',
    technologies: ['IoT', 'C++', 'MQTT'],
    demoUrl: '#',
    sourceUrl: '#',
    features: [
      'Device synchronization',
      'Energy monitoring',
      'Custom automation rules'
    ]
  }
];

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => Promise.resolve(projects),
    staleTime: Infinity
  });
} 
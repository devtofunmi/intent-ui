// Shared TypeScript interfaces and types for the Intent-UI workspace

export interface Thread {
  id: string;
  messages?: Message[];
  [key: string]: any;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content?: ContentItem[];
  component?: {
    componentName?: string;
  };
  renderedComponent?: React.ReactNode;
  createdAt?: Date | string;
  [key: string]: any;
}

export interface ContentItem {
  type: string;
  text?: string;
  [key: string]: any;
}

export interface CanvasItem {
  id: string;
  component: React.ReactNode;
  name: string;
}

// Component Props Interfaces
export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  threads: Thread[];
  activeThreadId?: string;
  onSelectThread: (id: string) => void;
  onDeleteThread: (id: string) => void;
  onCreateThread: () => Promise<Thread | void>;
}

export interface HeaderProps {
  isHistoryOpen: boolean;
  setHistoryOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isPending: boolean;
  onBack: () => void;
  viewMode: 'preview' | 'code';
  setViewMode: (mode: 'preview' | 'code') => void;
  viewportSize: 'desktop' | 'tablet' | 'mobile';
  setViewportSize: (size: 'desktop' | 'tablet' | 'mobile') => void;
  handleExport: () => void;
  canvasItems: CanvasItem[];
}

export interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  thread: Thread | null;
  chatHistory: Message[];
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  isPending: boolean;
}

export interface CanvasProps {
  thread: Thread | null;
  canvasItems: CanvasItem[];
  viewMode: 'preview' | 'code';
}

export interface LandingProps {
  onLaunch: () => void;
}

// UI Component Props
export interface NavProps {
  logoText?: string;
  links?: Array<string | { label: string; href: string }>;
  onLaunch?: () => void;
}

export interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

export interface StatsProps {
  stats?: Array<{
    label?: string;
    value?: string;
  }>;
}

export interface Feature {
  title?: string;
  description?: string;
  icon?: string;
}

export interface FeaturesProps {
  title?: string;
  features?: Feature[];
}

export interface PricingPlan {
  name?: string;
  price?: string;
  features?: string[];
  recommended?: boolean;
}

export interface PricingProps {
  title?: string;
  plans?: PricingPlan[];
}

export interface Testimonial {
  name?: string;
  role?: string;
  quote?: string;
  rating?: number;
  avatar?: string;
}

export interface TestimonialsProps {
  title?: string;
  items?: Testimonial[];
}

export interface CTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title?: string;
  items?: Array<string | FooterLink>;
}

export interface FooterProps {
  logoText?: string;
  socials?: Array<{
    label?: string;
    href?: string;
  }>;
  links?: FooterLinkGroup[];
  showLegal?: boolean;
  showBottomBar?: boolean;
}

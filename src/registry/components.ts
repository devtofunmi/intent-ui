import { z } from "zod";
import { DataSummary, dataSummarySchema } from '../components/DataSummary';
import Metric from '../components/Metric';
import DataTable from '../components/DataTable';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";

import UserOverview from "../components/UserOverview";
import ActivityFeed from "../components/ActivityFeed";
import MetricGrid from "../components/MetricGrid";
import QuickActions from "../components/QuickActions";

export const registry = [
  {
    name: "Nav",
    description: "Crucial top-of-page component for landing pages and marketing sites. Includes logo and horizontal navigation links.",
    component: Nav,
    propsSchema: z.object({
      logoText: z.string().nullable().optional(),
      links: z.array(z.object({ label: z.string().nullable().optional(), href: z.string().nullable().optional() })).nullable().optional().describe("List of navigation links")
    })
  },
  {
    name: "Hero",
    description: "High-impact introduction for public websites. Displays a bold marketing headline, subtext, and primary CTA.",
    component: Hero,
    propsSchema: z.object({
      title: z.string().nullable().optional().describe("Main bold headline"),
      subtitle: z.string().nullable().optional().describe("Supporting text below the headline"),
      ctaText: z.string().nullable().optional().describe("Text for the primary button"),
    }),
  },
  {
    name: "UserOverview",
    description: "Core dashboard profile header. Shows user avatar, role, status, and system settings. Use this at the top of authenticated dashboard views.",
    component: UserOverview,
    propsSchema: z.object({
      name: z.string().nullable().optional(),
      role: z.string().nullable().optional().describe("User's access level or job title"),
      status: z.string().nullable().optional().describe("Current connection or session status"),
      lastActive: z.string().nullable().optional(),
      avatar: z.string().nullable().optional().describe("URL or seed for the user profile image")
    })
  },
  {
    name: "QuickActions",
    description: "Utility bar for dashboards. Contains a primary action button, search filter, and common tools (share, download). Place this below the header in apps.",
    component: QuickActions,
    propsSchema: z.object({
      primaryText: z.string().nullable().optional().describe("Text for the main action button"),
      showSearch: z.boolean().nullable().optional()
    })
  },
  {
    name: "MetricGrid",
    description: "Horizontal row of data summaries for dashboards. Efficiently groups multiple key performance indicators (KPIs).",
    component: MetricGrid,
    propsSchema: z.object({
      metrics: z.array(z.object({
        title: z.string().nullable().optional(),
        value: z.string().nullable().optional(),
        trend: z.string().nullable().optional()
      })).nullable().optional()
    })
  },
  {
    name: "Metric",
    description: "Individual heavy-impact data point card. Use for single large metrics in a dashboard.",
    component: Metric,
    propsSchema: z.object({
      title: z.string().nullable().optional(),
      value: z.string().nullable().optional(),
      trend: z.string().nullable().optional()
    })
  },
  {
    name: "DataSummary",
    description: "Multi-metric system overview. Use for analytics summaries. Includes mainMetric (label, value, trend), a list of metrics, and a systemLoad percentage.",
    component: DataSummary,
    propsSchema: dataSummarySchema
  },
  {
    name: "Dashboard",
    description: "Alias for DataSummary. Use for analytics summaries.",
    component: DataSummary,
    propsSchema: dataSummarySchema
  },
  {
    name: "Table",
    description: "Structured data list for dashboards. Use for transactions, user lists, or logs. Includes status columns and ID tracking.",
    component: DataTable,
    propsSchema: z.object({
      title: z.string().nullable().optional()
    })
  },
  {
    name: "ActivityFeed",
    description: "Vertical timeline of recent system events or user actions. Great for the sidebar or secondary panels in a dashboard.",
    component: ActivityFeed,
    propsSchema: z.object({
      title: z.string().nullable().optional(),
      items: z.array(z.object({
        title: z.string().nullable().optional(),
        desc: z.string().nullable().optional(),
        time: z.string().nullable().optional(),
        type: z.enum(['success', 'warning', 'info']).nullable().optional()
      })).nullable().optional()
    })
  },
  {
    name: "Stats",
    description: "Trust-building numbers for landing pages (e.g., 'Used by 10k companies'). Distinct from dashboard metrics.",
    component: Stats,
    propsSchema: z.object({
      stats: z.array(z.object({
        label: z.string().nullable().optional(),
        value: z.string().nullable().optional()
      })).nullable().optional()
    })
  },
  {
    name: "Features",
    description: "Grid of benefit cards for marketing sites. Explains high-level value propositions to new users.",
    component: Features,
    propsSchema: z.object({
      title: z.string().nullable().optional().describe("Section heading"),
      features: z.array(z.object({
        title: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        icon: z.string().nullable().optional().describe("Icon name from Lucide")
      })).nullable().optional()
    })
  },
  {
    name: "Pricing",
    description: "Marketing table of subscription tiers. Used on landing pages to convert users.",
    component: Pricing,
    propsSchema: z.object({
      title: z.string().nullable().optional(),
      plans: z.array(z.object({
        name: z.string().nullable().optional(),
        price: z.string().nullable().optional(),
        features: z.array(z.string()).nullable().optional(),
        recommended: z.boolean().nullable().optional()
      })).nullable().optional()
    })
  },
  {
    name: "Testimonials",
    description: "Social proof for landing pages. Displays a grid of user reviews and avatars.",
    component: Testimonials,
    propsSchema: z.object({
      title: z.string().nullable().optional(),
      items: z.array(z.object({
        name: z.string().nullable().optional(),
        role: z.string().nullable().optional(),
        quote: z.string().nullable().optional(),
        rating: z.number().nullable().optional(),
        avatar: z.string().nullable().optional()
      })).nullable().optional()
    })
  },
  {
    name: "CTA",
    description: "Final marketing banner for landing pages. Large and bold button to drive conversion.",
    component: CTA,
    propsSchema: z.object({
      title: z.string().nullable().optional(),
      subtitle: z.string().nullable().optional(),
      buttonText: z.string().nullable().optional()
    })
  },
  {
    name: "Footer",
    description: "The bottom of marketing pages. Includes copyright and public site links.",
    component: Footer,
    propsSchema: z.object({
      logoText: z.string().nullable().optional(),
      socials: z.array(z.object({
        label: z.string().nullable().optional(),
        href: z.string().nullable().optional()
      })).nullable().optional(),
      links: z.array(z.object({
        title: z.string().nullable().optional(),
        items: z.array(z.object({ label: z.string().nullable().optional(), href: z.string().nullable().optional() })).nullable().optional()
      })).nullable().optional()
    })
  }
];

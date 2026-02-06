import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  Tabs,
  Accordion,
  DataTable,
  Hero,
  CodeFrame
} from "./wrappers";

export const registry = [
  {
    name: "Hero",
    description: "The primary header section for landing pages. Includes a badge, large title, subtitle, and call-to-action buttons.",
    component: Hero,
    propsSchema: z.object({
      badge: z.string().optional(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      ctaText: z.string().optional(),
      secondaryCtaText: z.string().optional(),
      className: z.string().optional()
    })
  },
  {
    name: "CodeFrame",
    description: "Renders raw HTML/CSS inside an isolated iframe. Use this for full-page previews, custom landing pages, or when standard components don't fit.",
    component: CodeFrame,
    propsSchema: z.object({
      html: z.string().describe("The raw HTML code to render").optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Button",
    description: "Standard Shadcn button for actions and navigation.",
    component: Button,
    propsSchema: z.object({
      children: z.string().describe("Button label").optional(),
      variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).optional(),
      size: z.enum(["default", "sm", "lg", "icon"]).optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Card",
    description: "Container for content with optional header and footer. Best for feature cards or dashboard widgets.",
    component: Card,
    propsSchema: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.string().optional().describe("Primary content (text/markdown)"),
      footer: z.string().optional(),
      className: z.string().optional()
    })
  },
  {
    name: "DataTable",
    description: "A structured data table with headers and rows. Good for lists and logs.",
    component: DataTable,
    propsSchema: z.object({
      title: z.string().optional(),
      columns: z.array(z.object({
        key: z.string(),
        label: z.string()
      })).describe("Column definitions").optional(),
      data: z.array(z.any()).describe("Table row data").optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Input",
    description: "Text input field.",
    component: Input,
    propsSchema: z.object({
      placeholder: z.string().optional(),
      type: z.string().optional().default("text"),
      className: z.string().optional()
    })
  },
  {
    name: "Badge",
    description: "Small status indicator.",
    component: Badge,
    propsSchema: z.object({
      children: z.string().optional(),
      variant: z.enum(["default", "secondary", "destructive", "outline"]).optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Checkbox",
    description: "Toggleable checkbox.",
    component: Checkbox,
    propsSchema: z.object({
      checked: z.boolean().optional(),
      label: z.string().optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Switch",
    description: "Toggle switch.",
    component: Switch,
    propsSchema: z.object({
      checked: z.boolean().optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Separator",
    description: "Horizontal or vertical divider.",
    component: Separator,
    propsSchema: z.object({
      orientation: z.enum(["horizontal", "vertical"]).optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Tabs",
    description: "Tabbed interface for switching between views.",
    component: Tabs,
    propsSchema: z.object({
      defaultValue: z.string().optional(),
      items: z.array(z.object({
        label: z.string().optional(),
        value: z.string().optional(),
        content: z.string().optional()
      })).optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Accordion",
    description: "Collapsible content sections.",
    component: Accordion,
    propsSchema: z.object({
      type: z.enum(["single", "multiple"]).optional(),
      items: z.array(z.object({
        trigger: z.string().optional(),
        content: z.string().optional()
      })).optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Label",
    description: "Semantic label for form elements.",
    component: Label,
    propsSchema: z.object({
      children: z.string().optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Textarea",
    description: "Multi-line text input.",
    component: Textarea,
    propsSchema: z.object({
      placeholder: z.string().optional(),
      className: z.string().optional()
    })
  },
  {
    name: "Skeleton",
    description: "Loading placeholder for components.",
    component: Skeleton,
    propsSchema: z.object({
      className: z.string().optional()
    })
  }
];
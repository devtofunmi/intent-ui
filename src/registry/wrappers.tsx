import React from "react";
import {
  Card as ShadcnCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion as ShadcnAccordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

export const Card = ({ title, description, content, footer, className }: any) => (
  <ShadcnCard className={cn("glass-card noise premium-border", className)}>
    {(title || description) && (
      <CardHeader>
        {title && <CardTitle className="tracking-tight text-white">{title}</CardTitle>}
        {description && <CardDescription className="text-zinc-500 font-medium">{description}</CardDescription>}
      </CardHeader>
    )}
    {content && <CardContent className="text-zinc-400 leading-relaxed">{content}</CardContent>}
    {footer && <CardFooter className="border-t border-white/5 pt-4 mt-2">{footer}</CardFooter>}
  </ShadcnCard>
);

export const Tabs = ({ defaultValue, items, className }: any) => (
  <ShadcnTabs defaultValue={defaultValue} className={cn("w-full", className)}>
    <TabsList className="bg-zinc-900/50 border border-white/5 h-auto p-1 rounded-xl">
      {items?.map((item: any, idx: number) => (
        <TabsTrigger 
          key={item.value || idx} 
          value={item.value}
          className="rounded-lg px-6 py-2.5 data-[state=active]:bg-brand data-[state=active]:text-white transition-all uppercase text-[10px] font-black tracking-widest"
        >
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
    {items?.map((item: any, idx: number) => (
      <TabsContent key={item.value || idx} value={item.value} className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {item.content}
      </TabsContent>
    ))}
  </ShadcnTabs>
);

export const Accordion = ({ type = "single", items, className }: any) => (
  <ShadcnAccordion type={type} collapsible className={cn("w-full space-y-4", className)}>
    {items?.map((item: any, index: number) => (
      <AccordionItem key={index} value={`item-${index}`} className="border border-white/5 rounded-2xl px-6 bg-white/[0.02] overflow-hidden">
        <AccordionTrigger className="hover:no-underline py-6">
          <span className="text-left font-bold text-white tracking-tight">{item.trigger}</span>
        </AccordionTrigger>
        <AccordionContent className="pb-6 text-zinc-400 leading-relaxed">
          {item.content}
        </AccordionContent>
      </AccordionItem>
    ))}
  </ShadcnAccordion>
);



export const CodeFrame = ({ html, className, isLoading }: any) => (
  <div className={cn("w-full h-full flex-1 bg-white shadow-2xl relative", className)}>
    {!html || isLoading ? (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 space-y-4">
        <div className="w-6 h-6 border-2 border-brand/20 border-t-brand rounded-full animate-spin" />
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest animate-pulse">Generating Interface...</p>
      </div>
    ) : (
      <iframe
        srcDoc={`
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <script src="https://cdn.tailwindcss.com"></script>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
              <style>
                body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background: white; min-height: 100vh; }
                ::-webkit-scrollbar { width: 10px; }
                ::-webkit-scrollbar-track { background: #f8f9fa; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 5px; border: 2px solid #f8f9fa; }
                ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
                #preview-root { min-height: 100vh; }
              </style>
            </head>
            <body>
              <div id="preview-root">
                ${html}
              </div>
            </body>
          </html>
        `}
        className="w-full h-full min-h-[85vh] border-0 block"
        title="Live Preview"
        sandbox="allow-scripts"
      />
    )}
  </div>
);

export const DataTable = ({ title, columns, data, className }: any) => (
  <div className={cn("space-y-4", className)}>
    {title && <h3 className="text-lg font-bold">{title}</h3>}
    <div className="rounded-md border border-white/10 overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow>
            {columns?.map((col: any, idx: number) => (
              <TableHead key={col.key || idx}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row: any, i: number) => (
            <TableRow key={i} className="border-white/5 hover:bg-white/[0.02]">
              {columns?.map((col: any, idx: number) => (
                <TableCell key={col.key || idx}>{row[col.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
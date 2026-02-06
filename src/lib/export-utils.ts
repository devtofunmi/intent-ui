export const generateComponentCode = (item: any) => {
  const isCodeFrame = item.name === 'CodeFrame';
  if (isCodeFrame) {
    const html = item.props?.html?.replace(/`/g, '\\`').replace(/\${/g, '\\${') || '';
    return `
import React from "react";

export const CodeFrame = () => {
  return (
    <div className="w-full h-screen bg-white" dangerouslySetInnerHTML={{ __html: \`${html}\` }} />
  );
};

export default CodeFrame;
    `.trim();
  }

  const propsStr = item.props ? Object.entries(item.props)
    .map(([key, value]) => {
      if (typeof value === 'string') return `${key}="${value}"`;
      if (typeof value === 'object') return `${key}={${JSON.stringify(value, null, 2)}}`;
      return `${key}={${value}}`;
    })
    .join(' ') : '';

  return `
import React from "react";
import { ${item.name} as Shadcn${item.name} } from "@/components/ui/wrappers";

export const ${item.name} = () => {
  return (
    <Shadcn${item.name} ${propsStr} />
  );
};

export default ${item.name};
  `.trim();
};

export const generateAppCode = (canvasItems: any[]) => {
  const hasCodeFrame = canvasItems.some(i => i.name === 'CodeFrame');
  const itemsToRender = hasCodeFrame 
    ? canvasItems.filter(i => i.name === 'CodeFrame')
    : canvasItems;

  const imports = itemsToRender.map(item => `import ${item.name} from "./components/${item.name}";`).join('\n');
  const components = itemsToRender.map(item => `      <${item.name} />`).join('\n');

  return `
import React from "react";
${imports}

export default function App() {
  return (
    <div className="${hasCodeFrame ? 'w-full h-screen' : 'min-h-screen bg-zinc-950 text-white p-8 space-y-12 flex flex-col items-center'}">
${components}
    </div>
  );
}
  `.trim();
};

export const getProjectStructure = (canvasItems: any[]) => {
  const files: Record<string, any> = {
    '/src/App.tsx': generateAppCode(canvasItems),
    '/src/components/ui/wrappers.tsx': '// Shadcn Wrapper components...',
    '/package.json': JSON.stringify({
      dependencies: {
        'react': '^18.0.0',
        'react-dom': '^18.0.0',
        'lucide-react': 'latest',
        'tailwindcss': 'latest'
      }
    }, null, 2),
    '/tailwind.config.js': '// Tailwind config...'
  };

  canvasItems.forEach(item => {
    files[`/src/components/${item.name}.tsx`] = generateComponentCode(item);
  });

  return files;
};

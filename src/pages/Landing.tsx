import Nav from '../components/Nav';
import Stats from '../components/Stats';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Hero from '../components/Hero';

const Landing = ({ onLaunch }) => {
  const landingLinks = [
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "GitHub", href: "https://github.com/devtofunmi/intent-ui" }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-[60] py-6 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <Nav 
              logoText="INTENT" 
              onLaunch={onLaunch}
              links={landingLinks} 
            />
          </div>
        </div>
        
        {/* Full-width Hero Section */}
        <Hero 
          title="UI That Follows Your Intent."
          subtitle="The first generative UI engine that translates natural language into premium, production-ready interfaces in real-time."
          ctaText="Launch Workspace"
          onCtaClick={onLaunch}
          showDisclaimer={true}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-32 pb-32">
        <div id="stats">
          <Stats 
            stats={[
              { label: "Components", value: "12+" },
              { label: "Synthesis Speed", value: "< 2s" },
              { label: "Custom Styles", value: "∞" },
              { label: "Users", value: "Alpha" }
            ]}
          />
        </div>

        <div id="features">
          <Features 
            title="Engineered for Intent"
            features={[
              { 
                title: "Context-Aware", 
                description: "Our engine understands the nuance of your request, whether it's a dashboard or a sales funnel.",
                icon: "Zap"
              },
              { 
                title: "Atomic Registry", 
                description: "Every component is a high-quality building block designed for maximum flexibility.",
                icon: "Shield"
              },
              { 
                title: "Real-time Synthesis", 
                description: "Watch your interface build itself section-by-section as the AI thinks.",
                icon: "Activity"
              }
            ]}
          />
        </div>

        <div id="testimonials">
          <Testimonials 
            title="Built for the Future"
            items={[
              { 
                name: "Alex Rivera", 
                role: "Product Lead", 
                quote: "Intent-UI has completely changed how we prototype. We went from days to minutes.",
                rating: 5,
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              },
              { 
                name: "Jordan Smith", 
                role: "Frontend Architect", 
                quote: "The interface quality is surprisingly clean. It's not just a demo, it's a tool.",
                rating: 5,
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
              },
              { 
                name: "Sarah Chen", 
                role: "UX Director", 
                quote: "The way it handles design tokens and semantic intent is simply revolutionary.",
                rating: 5,
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
              }
            ]}
          />
        </div>

        <CTA 
          title="Ready to build?"
          subtitle="Join the evolution of generative interfaces today."
          buttonText="Launch Workspace Now"
          onLaunch={onLaunch}
        />

        <Footer 
          logoText="INTENT"
          showLegal={false}
          showBottomBar={false}
          socials={[
            { label: 'G', href: 'https://github.com/devtofunmi/intent-ui' }
          ]}
          links={[
            { title: "Ecosystem", items: landingLinks }
          ]}
        />
      </div>
      
     
    </div>
  );
};

export default Landing;
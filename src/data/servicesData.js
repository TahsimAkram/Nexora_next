import {
  BarChart3,
  Blocks,
  Box,
  Check,
  Code2,
  CreditCard,
  Gauge,
  Globe2,
  LayoutDashboard,
  Layers3,
  Megaphone,
  Palette,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

import websiteDevelopmentImage from "../assets/website-development.png";
import webApplicationImage from "../assets/02-web-application-development.png";
import ecommerceImage from "../assets/03-ecommerce-development.png";
import uiUxImage from "../assets/04-ui-ux-design.png";
import graphicDesignImage from "../assets/05-graphic-design-branding.png";
import digitalGrowthImage from "../assets/06-seo-digital-marketing.png";

export const services = [
  {
    id: "website-development",
    number: "01",
    category: "WEBSITE DEVELOPMENT",
    title: "A website that works as hard as your business.",
    intro:
      "Your website is often the first impression people have of your business. We create clear, responsive websites that communicate your value, build credibility, and guide visitors towards the information they need.",
    color: "lime",
    image: websiteDevelopmentImage,
    imageAlt:
      "Website development concept shown as a premium laptop and website interface",
    imageNote: "Digital presence, built with purpose.",
    icon: Globe2,
    capabilities: [
      {
        icon: LayoutDashboard,
        title: "Business websites",
        description:
          "Professional multi-page websites that present your company, services, and expertise clearly.",
      },
      {
        icon: Target,
        title: "Landing pages",
        description:
          "Focused pages for specific services, offers, launches, and marketing campaigns.",
      },
      {
        icon: Blocks,
        title: "CMS integration",
        description:
          "Manage key website content through a content management system where appropriate.",
      },
      {
        icon: Smartphone,
        title: "Responsive development",
        description:
          "Layouts designed to work across mobile phones, tablets, laptops, and larger screens.",
      },
      {
        icon: Gauge,
        title: "Performance optimization",
        description:
          "Optimized assets and front-end implementation for a faster, smoother experience.",
      },
      {
        icon: Search,
        title: "SEO-ready foundations",
        description:
          "Logical page structure, metadata, semantic markup, and crawl-friendly implementation.",
      },
    ],
    deliverables: [
      "Custom page design",
      "Responsive implementation",
      "Content setup",
      "Technical SEO foundations",
      "Browser and device testing",
      "Deployment support",
    ],
    outcome:
      "A credible online presence that explains what you do and makes it easier for the right customers to take the next step.",
  },
  {
    id: "web-applications",
    number: "02",
    category: "WEB APPLICATION DEVELOPMENT",
    title: "Custom applications for the way you work.",
    intro:
      "When a standard website is not enough, a custom web application can bring workflows, information, and teams together. We build practical digital tools around your business requirements instead of forcing your processes into a one-size-fits-all product.",
    color: "blue",
    image: webApplicationImage,
    imageAlt:
      "Custom web application dashboard with analytics panels and responsive interface",
    imageNote: "Complex workflows, made clearer.",
    icon: Code2,
    capabilities: [
      {
        icon: LayoutDashboard,
        title: "Dashboards and reporting",
        description:
          "Bring key metrics, records, and operational activity into one organized workspace.",
      },
      {
        icon: Workflow,
        title: "Workflow automation",
        description:
          "Reduce repetitive manual steps with structured processes, approvals, and notifications.",
      },
      {
        icon: Users,
        title: "Portals and platforms",
        description:
          "Create customer portals, employee tools, booking platforms, and internal business systems.",
      },
      {
        icon: Blocks,
        title: "API integrations",
        description:
          "Connect your application with suitable third-party services and existing systems.",
      },
      {
        icon: ShieldCheck,
        title: "Authentication and access",
        description:
          "Implement login flows and role-based access controls appropriate to the application.",
      },
      {
        icon: TrendingUp,
        title: "Scalable architecture",
        description:
          "Structure the application so features and capacity can evolve as requirements change.",
      },
    ],
    deliverables: [
      "Requirements mapping",
      "Application UI",
      "Frontend and backend",
      "API integrations",
      "Testing and QA",
      "Deployment documentation",
    ],
    outcome:
      "Purpose-built software that helps your team manage information, reduce friction, and work more consistently.",
  },
  {
    id: "ecommerce-development",
    number: "03",
    category: "E-COMMERCE DEVELOPMENT",
    title: "An online store made for better shopping.",
    intro:
      "A good online store makes products easy to discover and the path to purchase easy to follow. We create e-commerce experiences that bring product presentation, checkout, and store management together in a cohesive shopping journey.",
    color: "orange",
    image: ecommerceImage,
    imageAlt:
      "E-commerce storefront displayed across desktop and mobile shopping interfaces",
    imageNote: "From product discovery to checkout.",
    icon: ShoppingBag,
    capabilities: [
      {
        icon: Palette,
        title: "Storefront design",
        description:
          "A branded shopping experience with clear navigation and product-focused layouts.",
      },
      {
        icon: Box,
        title: "Product catalog",
        description:
          "Organize products, categories, variants, pricing, imagery, and inventory information.",
      },
      {
        icon: CreditCard,
        title: "Cart and checkout",
        description:
          "Create a straightforward purchasing flow with clear order summaries and checkout steps.",
      },
      {
        icon: ShieldCheck,
        title: "Payment integration",
        description:
          "Integrate suitable payment gateways based on your markets, platform, and business needs.",
      },
      {
        icon: Workflow,
        title: "Order management",
        description:
          "Set up practical tools for reviewing orders and managing fulfilment information.",
      },
      {
        icon: BarChart3,
        title: "Store analytics",
        description:
          "Connect suitable analytics to help you understand sales and customer activity.",
      },
    ],
    deliverables: [
      "Storefront setup",
      "Product and category structure",
      "Payment gateway integration",
      "Shipping and tax configuration",
      "Checkout testing",
      "Store handover",
    ],
    outcome:
      "A manageable online store that helps customers shop with confidence and gives your team control over daily operations.",
  },
  {
    id: "ui-ux-design",
    number: "04",
    category: "UI/UX DESIGN",
    title: "Thoughtful interfaces. Easier experiences.",
    intro:
      "Good design is more than how a screen looks. We organize information, simplify user journeys, and shape interfaces around real tasks so people can understand a product and use it with less friction.",
    color: "purple",
    image: uiUxImage,
    imageAlt:
      "Layered user interface and mobile screen design concepts for a digital product",
    imageNote: "Designed around people, not just screens.",
    icon: Layers3,
    capabilities: [
      {
        icon: Users,
        title: "User and audience research",
        description:
          "Clarify user needs, expectations, and pain points to inform design decisions.",
      },
      {
        icon: Workflow,
        title: "User flows and wireframes",
        description:
          "Map key journeys and establish a clear structure before visual design begins.",
      },
      {
        icon: Palette,
        title: "Interface design",
        description:
          "Create polished screens that balance visual identity, hierarchy, and usability.",
      },
      {
        icon: Blocks,
        title: "Design systems",
        description:
          "Define reusable components, patterns, and visual rules for a consistent interface.",
      },
      {
        icon: Smartphone,
        title: "Responsive experiences",
        description:
          "Adapt layouts and interactions to the needs of different screen sizes.",
      },
      {
        icon: Check,
        title: "Prototypes and usability",
        description:
          "Make concepts testable and identify confusing interactions before development.",
      },
    ],
    deliverables: [
      "User flows",
      "Wireframes",
      "High-fidelity UI screens",
      "Interactive prototype",
      "Reusable components",
      "Developer handoff",
    ],
    outcome:
      "A more coherent product experience that helps users find their way, complete tasks, and understand your offering.",
  },
  {
    id: "graphic-design-branding",
    number: "05",
    category: "GRAPHIC DESIGN & BRANDING",
    title: "A visual identity people can recognize.",
    intro:
      "Your brand is expressed through every visual detail customers encounter. We help shape a consistent identity and create practical design assets that make your business look recognizable across digital and print touchpoints.",
    color: "pink",
    image: graphicDesignImage,
    imageAlt:
      "Brand identity presentation with logo applications, stationery, packaging, and social media artwork",
    imageNote: "One brand, expressed consistently.",
    icon: Sparkles,
    capabilities: [
      {
        icon: Sparkles,
        title: "Logo design",
        description:
          "Create a distinctive logo direction and practical variations for different applications.",
      },
      {
        icon: Palette,
        title: "Brand identity systems",
        description:
          "Establish color, typography, graphic elements, and visual rules for consistency.",
      },
      {
        icon: Megaphone,
        title: "Social media creatives",
        description:
          "Design branded posts, stories, covers, and templates for your social channels.",
      },
      {
        icon: Target,
        title: "Marketing collateral",
        description:
          "Create brochures, presentations, banners, ads, and other campaign materials.",
      },
      {
        icon: Box,
        title: "Packaging and print",
        description:
          "Prepare visual concepts and print-ready artwork for suitable packaging and stationery.",
      },
      {
        icon: Layers3,
        title: "Brand guidelines",
        description:
          "Document how to use the identity, including logo spacing, colors, and typography.",
      },
    ],
    deliverables: [
      "Logo files and variations",
      "Color and typography system",
      "Brand guideline document",
      "Social media templates",
      "Marketing artwork",
      "Print-ready exports when required",
    ],
    outcome:
      "A consistent visual language that helps your business look professional and recognizable across customer touchpoints.",
  },
  {
    id: "seo-digital-marketing",
    number: "06",
    category: "SEO & DIGITAL MARKETING",
    title: "Build visibility. Reach the right audience.",
    intro:
      "Being online is only the beginning. We help improve how people discover your business through search optimization, useful content, social media, and paid campaigns aligned with your goals and audience.",
    color: "teal",
    image: digitalGrowthImage,
    imageAlt:
      "Search visibility and digital campaign analytics dashboard with traffic charts and social campaign metrics",
    imageNote: "Measure activity. Learn. Improve.",
    icon: TrendingUp,
    capabilities: [
      {
        icon: Search,
        title: "Search engine optimization",
        description:
          "Review technical foundations, on-page elements, content relevance, and search opportunities.",
      },
      {
        icon: Globe2,
        title: "Local SEO",
        description:
          "Improve local business information and location-focused search visibility where relevant.",
      },
      {
        icon: Palette,
        title: "Content marketing",
        description:
          "Plan useful website content and campaign assets around audience questions and search intent.",
      },
      {
        icon: Users,
        title: "Social media optimization",
        description:
          "Improve profile presentation, content consistency, and engagement across relevant channels.",
      },
      {
        icon: Megaphone,
        title: "Paid campaign management",
        description:
          "Plan and manage suitable search or social advertising campaigns against agreed objectives.",
      },
      {
        icon: BarChart3,
        title: "Analytics and reporting",
        description:
          "Track relevant traffic, engagement, and conversion indicators to guide future improvements.",
      },
    ],
    deliverables: [
      "SEO and channel audit",
      "Keyword and content plan",
      "On-page optimization",
      "Campaign setup where agreed",
      "Analytics configuration",
      "Performance reporting",
    ],
    outcome:
      "A more considered digital growth plan with clearer visibility into what is working and where to improve.",
  },
];

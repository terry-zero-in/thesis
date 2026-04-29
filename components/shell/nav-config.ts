import {
  CheckSquare,
  FileText,
  FlaskConical,
  LayoutDashboard,
  ListChecks,
  Settings,
  Target,
  Wallet,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Work",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Watchlist", href: "/watchlist", icon: ListChecks },
      { label: "Research Queue", href: "/research-queue", icon: FlaskConical },
      { label: "Triggers", href: "/triggers", icon: Zap },
      { label: "Opportunities", href: "/opportunities", icon: Target },
      { label: "Memos", href: "/memos", icon: FileText },
      { label: "Decisions", href: "/decisions", icon: CheckSquare },
      { label: "Portfolio", href: "/portfolio", icon: Wallet },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Workflows", href: "/workflows", icon: Workflow },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

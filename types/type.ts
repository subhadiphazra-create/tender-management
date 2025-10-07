export interface SidebarItem {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  children?: { title: string; href: string }[];
}
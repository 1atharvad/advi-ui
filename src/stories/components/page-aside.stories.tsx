import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageAside, PageAsideNavItem } from "@/components/PageAside";
import { Home, Settings, Users, BarChart, FileText } from "lucide-react";

const meta: Meta<typeof PageAside> = {
  title: "Components/PageAside",
  component: PageAside,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof PageAside>;

export const Default: Story = {
  render: () => (
    <PageAside title="Dashboard">
      <PageAsideNavItem icon={Home} label="Home" />
      <PageAsideNavItem icon={Users} label="Users" />
      <PageAsideNavItem icon={BarChart} label="Analytics" />
      <PageAsideNavItem icon={FileText} label="Reports" />
      <PageAsideNavItem icon={Settings} label="Settings" />
    </PageAside>
  ),
};

export const WithUser: Story = {
  render: () => (
    <PageAside
      title="My App"
      userName="atharva@example.com"
      onLogout={() => alert("Logged out")}
    >
      <PageAsideNavItem icon={Home} label="Home" />
      <PageAsideNavItem icon={Users} label="Team" />
      <PageAsideNavItem icon={BarChart} label="Analytics" />
      <PageAsideNavItem icon={Settings} label="Settings" />
    </PageAside>
  ),
};

export const Minimal: Story = {
  render: () => (
    <PageAside>
      <PageAsideNavItem icon={Home} label="Home" />
      <PageAsideNavItem icon={Settings} label="Settings" />
    </PageAside>
  ),
};

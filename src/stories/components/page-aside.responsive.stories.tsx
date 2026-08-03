import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AsideDrawer, PageAside } from "@/components/PageAside";
import { Button } from "@/components/ui/button";
import { Home, Users, BarChart, FileText, Settings, LogOut, Menu } from "lucide-react";

const navItems = [
  { icon: <Home className="h-4 w-4" />, label: "Home" },
  { icon: <Users className="h-4 w-4" />, label: "Users" },
  { icon: <BarChart className="h-4 w-4" />, label: "Analytics" },
  { icon: <FileText className="h-4 w-4" />, label: "Reports" },
  { icon: <Settings className="h-4 w-4" />, label: "Settings" },
];

const meta: Meta<typeof AsideDrawer> = {
  title: "Components/PageAside/Responsive",
  component: AsideDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
For a sidebar that's a static \`PageAside\` on desktop and an off-canvas drawer on mobile, render \`PageAside\` **twice** — once wrapped in \`AsideDrawer\` (mobile), once plain (desktop) — with the same \`items\`/\`title\`/\`footer\`, and let CSS pick which one is visible at a given breakpoint.

\`AsideDrawer\` is \`PageAside\` pre-wired into a \`Modal\` (\`vi-modal-slide-left\` variant, padding stripped via \`.vi-aside-modal\` so the aside fills the panel edge to edge). It forwards every \`PageAside\` prop except \`open\`/\`onToggle\`, which are replaced by the modal's own \`open\`/\`onOpenChange\` + \`trigger\`.

\`\`\`tsx
<div className="dashboard-topbar">
  {logo}
  <AsideDrawer
    open={menuOpen}
    onOpenChange={setMenuOpen}
    trigger={<button aria-label="Open menu"><Menu /></button>}
    title={logo}
    items={navItems}
    footer={asideFooter}
  />
</div>

<PageAside title={logo} items={navItems} footer={asideFooter} className="hidden md:flex" />
\`\`\`

Which instance is visible at which width is entirely up to your own CSS — \`AsideDrawer\`'s trigger and the plain desktop \`PageAside\` aren't hidden by default, so wrap them in your own breakpoint classes (as above) or a JS media-query hook, same as you would for any other responsive layout piece.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AsideDrawer>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "A topbar with a hamburger trigger (shown below `md` via `md:hidden` on the wrapper) opens the drawer; at `md` and up the plain desktop `PageAside` (shown via `hidden md:flex`) takes over instead. Resize the window to see it switch.",
      },
      source: {
        language: "tsx",
        code: `
const [menuOpen, setMenuOpen] = useState(false);

<div className="flex h-screen">
  <PageAside
    title="My App"
    items={items}
    footer={() => <AsideBtn icon={<LogOut className="h-4 w-4" />} label="Log out" onClick={() => {}} />}
    className="hidden md:flex"
  />

  <div className="flex-1 flex flex-col min-w-0">
    <div className="md:hidden shrink-0 p-3 border-b border-border">
      <AsideDrawer
        open={menuOpen}
        onOpenChange={setMenuOpen}
        trigger={<Button variant="outline" size="icon"><Menu className="h-4 w-4" /></Button>}
        title="My App"
        items={items.map(item => ({ ...item, onClick: () => setMenuOpen(false) }))}
        footer={() => <AsideBtn icon={<LogOut className="h-4 w-4" />} label="Log out" onClick={() => {}} />}
      />
    </div>
    <main className="flex-1 p-8">...</main>
  </div>
</div>`.trim(),
      },
    },
  },
  render: () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
      <div className="h-screen flex">
        <PageAside
          title="My App"
          items={navItems.map(item => ({ ...item, onClick: () => {} }))}
          footer={() => (
            <div className="p-1.5">
              <Button variant="ghost" size="sm" className="vi-aside-item w-full justify-start gap-2">
                <LogOut className="h-4 w-4" /> Log out
              </Button>
            </div>
          )}
          className="hidden md:flex"
        />

        <div className="flex-1 flex flex-col min-w-0">
          <div className="md:hidden shrink-0 p-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-medium">My App</span>
            <AsideDrawer
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              }
              title="My App"
              items={navItems.map(item => ({ ...item, onClick: () => setMenuOpen(false) }))}
              footer={() => (
                <div className="p-1.5">
                  <Button variant="ghost" size="sm" className="vi-aside-item w-full justify-start gap-2">
                    <LogOut className="h-4 w-4" /> Log out
                  </Button>
                </div>
              )}
            />
          </div>
          <div className="flex-1 p-8 text-sm text-muted-foreground">
            Resize the window — below <code>md</code> the topbar hamburger opens a drawer;
            at <code>md</code> and up the static sidebar on the left takes over.
          </div>
        </div>
      </div>
    );
  },
};

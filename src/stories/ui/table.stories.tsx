import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption,
} from "@/components/ui/table";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Composable table built from semantic sub-components. The root \`Table\` wraps the native \`<table>\` in an overflow-scrollable container with a border.

**Sub-components**

| Component | Element | Role |
|---|---|---|
| \`Table\` | \`<table>\` | Root — adds scroll wrapper and border |
| \`TableHeader\` | \`<thead>\` | Header section with muted background |
| \`TableBody\` | \`<tbody>\` | Body rows |
| \`TableFooter\` | \`<tfoot>\` | Footer section with muted background |
| \`TableRow\` | \`<tr>\` | Row — hover highlight, bottom border |
| \`TableHead\` | \`<th>\` | Header cell — muted, medium weight |
| \`TableCell\` | \`<td>\` | Data cell |
| \`TableCaption\` | \`<p>\` | Muted caption rendered outside and below the table |

All sub-components forward refs and accept \`className\`.
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
  { id: "INV-001", status: "Paid",    method: "Credit Card", amount: "$250.00" },
  { id: "INV-002", status: "Pending", method: "PayPal",      amount: "$150.00" },
  { id: "INV-003", status: "Unpaid",  method: "Bank Transfer", amount: "$350.00" },
  { id: "INV-004", status: "Paid",    method: "Credit Card", amount: "$450.00" },
  { id: "INV-005", status: "Paid",    method: "PayPal",      amount: "$550.00" },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Basic table with a header and body rows." },
      source: {
        code: `
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((inv) => (
      <TableRow key={inv.id}>
        <TableCell className="font-medium">{inv.id}</TableCell>
        <TableCell>{inv.status}</TableCell>
        <TableCell>{inv.method}</TableCell>
        <TableCell className="text-right">{inv.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`.trim(),
      },
    },
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  name: "With Footer",
  parameters: {
    docs: {
      description: { story: "`TableFooter` sits below the body with a muted background — useful for totals or summaries." },
      source: {
        code: `
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((inv) => (
      <TableRow key={inv.id}>
        <TableCell className="font-medium">{inv.id}</TableCell>
        <TableCell>{inv.status}</TableCell>
        <TableCell>{inv.method}</TableCell>
        <TableCell className="text-right">{inv.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3} className="font-medium">Total</TableCell>
      <TableCell className="text-right font-medium">$1,750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`.trim(),
      },
    },
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-medium">Total</TableCell>
          <TableCell className="text-right font-medium">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithCaption: Story = {
  name: "With Caption",
  parameters: {
    docs: {
      description: { story: "`TableCaption` renders muted text below the table — useful for attribution or notes." },
      source: {
        code: `
<Table>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
<TableCaption>A list of recent invoices.</TableCaption>`.trim(),
      },
    },
  },
  render: () => (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-medium">{inv.id}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell>{inv.method}</TableCell>
              <TableCell className="text-right">{inv.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableCaption>A list of recent invoices.</TableCaption>
    </div>
  ),
};

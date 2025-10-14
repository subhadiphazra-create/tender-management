export interface ChartDataItem {
  value: number;
  name: string;
}

export interface AnalyticsData {
  id: string;
  title: string;
  type: "Line-Chart" | "Bar-Chart" | "Pie-Chart";
  data: ChartDataItem[];
  configurationObj: {
    title?: string;
    showLegend?: boolean;
    showCursor?: boolean;
    showoverallTooltip?: boolean;
    overallTooltip?: string;
    colors: string[];
    categoryKey?: string;
    valueKey?: string;
    showScrollx?: boolean;
    showScrolly?: boolean;
  };
}

// Dark-themed color palette
const darkColors = [
  "#1e40af",
  "#6e36c9",
  "#7c3aed",
  "#e11d48",
  "#f59e0b",
  "#10b981",
];
export const analyticsBuyerData: AnalyticsData[] = [
  {
    id: "0",
    title: "Tender Volume Over Time",
    type: "Line-Chart",
    data: [
      { value: 2, name: "Jan" },
      { value: 4, name: "Feb" },
      { value: 6, name: "Mar" },
      { value: 3, name: "Apr" },
      { value: 5, name: "May" },
      { value: 8, name: "Jun" },
    ],
    configurationObj: { colors: [darkColors[0]] },
  },
  {
    id: "1",
    title: "Tender Value by Category",
    type: "Bar-Chart",
    data: [
      { value: 3, name: "Agriculture" },
      { value: 5, name: "Education" },
      { value: 2, name: "Energy" },
      { value: 4, name: "Finance" },
      { value: 6, name: "IT" },
    ],
    configurationObj: { colors: darkColors },
  },
  {
    id: "2",
    title: "Tender Status Distribution",
    type: "Pie-Chart",
    data: [
      { value: 5, name: "Pending" },
      { value: 3, name: "In Progress" },
      { value: 2, name: "Completed" },
    ],
    configurationObj: { colors: darkColors },
  },
  {
    id: "3",
    title: "Bid-to-Award Ratio",
    type: "Bar-Chart",
    data: [
      { value: 15, name: "Bids" },
      { value: 10, name: "Awards" },
    ],
    configurationObj: { colors: darkColors },
  },
  {
    id: "4",
    title: "Revenue from Tenders",
    type: "Line-Chart",
    data: [
      { value: 100000, name: "Jan" },
      { value: 250000, name: "Feb" },
      { value: 400000, name: "Mar" },
      { value: 600000, name: "Apr" },
      { value: 900000, name: "May" },
    ],
    configurationObj: { colors: [darkColors[2]] },
  },
];

export const analyticsSupplierData: AnalyticsData[] = [
  {
    id: "pie-0",
    type: "Pie-Chart",
    title: "Tender Status Distribution",
    data: [
      { value: 1, name: "Submitted" },
      { value: 1, name: "Won" },
      { value: 0, name: "Lost" },
    ],
    configurationObj: {
      title: "Tender Status",
      showLegend: true,
      showCursor: true,
      showoverallTooltip: true,
      overallTooltip: "{b}: {c}",
      colors: ["#1e40af", "#6e36c9", "#7c3aed", "#e11d48", "#f59e0b"],
    },
  },
  {
    id: "line-0",
    type: "Line-Chart",
    title: "Tenders Submitted Over Months",
    data: [
      { value: 0, name: "January" },
      { value: 0, name: "February" },
      { value: 0, name: "March" },
      { value: 0, name: "April" },
      { value: 0, name: "May" },
      { value: 0, name: "June" },
      { value: 0, name: "July" },
      { value: 0, name: "August" },
      { value: 1, name: "September" },
      { value: 0, name: "October" },
      { value: 0, name: "November" },
      { value: 0, name: "December" },
    ],
    configurationObj: {
      categoryKey: "name",
      valueKey: "value",
      showLegend: true,
      showCursor: true,
      title: "Monthly Tender Count",
      showScrollx: false,
      showScrolly: false,
      colors: ["#1e40af"],
    },
  },
  {
    id: "line-1",
    type: "Line-Chart",
    title: "Revenue Over Months",
    data: [
      { value: 0, name: "January" },
      { value: 0, name: "February" },
      { value: 0, name: "March" },
      { value: 0, name: "April" },
      { value: 0, name: "May" },
      { value: 0, name: "June" },
      { value: 0, name: "July" },
      { value: 0, name: "August" },
      { value: 2000000, name: "September" },
      { value: 0, name: "October" },
      { value: 0, name: "November" },
      { value: 0, name: "December" },
    ],
    configurationObj: {
      categoryKey: "name",
      valueKey: "value",
      showLegend: true,
      showCursor: true,
      title: "Monthly Revenue",
      showScrollx: false,
      showScrolly: false,
      colors: ["#7c3aed"],
    },
  },
  {
    id: "bar-0",
    type: "Bar-Chart",
    title: "Tenders By Sector",
    data: [
      { value: 0, name: "Agriculture" },
      { value: 0, name: "Education" },
      { value: 0, name: "Energy" },
      { value: 0, name: "Finance" },
      { value: 0, name: "Healthcare" },
      { value: 0, name: "IT" },
      { value: 0, name: "Manufacturing" },
      { value: 0, name: "Retail" },
      { value: 0, name: "Telecommunications" },
      { value: 0, name: "Transportation" },
    ],
    configurationObj: {
      categoryKey: "name",
      valueKey: "value",
      showLegend: true,
      showCursor: true,
      title: "Sector-wise Tender Distribution",
      showScrollx: true,
      showScrolly: true,
      colors: ["#1e40af", "#6e36c9", "#7c3aed", "#e11d48", "#f59e0b"],
    },
  },
  {
    id: "bar-1",
    type: "Bar-Chart",
    title: "Bid-to-Award Ratio",
    data: [
      { value: 15, name: "Bids" },
      { value: 10, name: "Awards" },
    ],
    configurationObj: {
      categoryKey: "name",
      valueKey: "value",
      showLegend: true,
      showCursor: true,
      title: "Bid-to-Award Ratio",
      showScrollx: false,
      showScrolly: false,
      colors: ["#10b981", "#f59e0b"],
    },
  },
];

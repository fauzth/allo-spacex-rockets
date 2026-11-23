export const formatCost = (v) =>
  v ? `$${Number(v).toLocaleString("en-US")}` : "N/A";

export const formatDate = (v) =>
  v ? new Date(v).toLocaleDateString("en-GB", { dateStyle: "long" }) : "N/A";

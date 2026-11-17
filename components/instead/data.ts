export type Group = "needs" | "waiting" | "working" | "uptodate";

export type Client = { name: string; badge: string; group: Group; status: string };

export const GROUPS: { id: Group; label: string; count: number }[] = [
  { id: "needs", label: "Needs you", count: 5 },
  { id: "waiting", label: "Waiting on client", count: 4 },
  { id: "working", label: "Instead is working", count: 3 },
  { id: "uptodate", label: "Up to date", count: 34 },
];

export const CLIENTS: Client[] = [
  { name: "Aditya & Oswal Partners", badge: "1065", group: "needs", status: "3 decisions to approve in the 2026 tax plan" },
  { name: "Filbert Holdings", badge: "1065", group: "needs", status: "2 diagnostics to clear before the return can file" },
  { name: "Bhatia Household", badge: "1040", group: "needs", status: "CP2000 reply is drafted and ready for review" },
  { name: "Northgate Dental Group", badge: "1120S", group: "needs", status: "Payroll true-up needs your sign-off" },
  { name: "Reyes Family Trust", badge: "1041", group: "needs", status: "Trustee distribution question is open" },
  { name: "Marlow Design Studio", badge: "1120S", group: "waiting", status: "Waiting on Q3 bank statements" },
  { name: "Chen Household", badge: "1040", group: "waiting", status: "Waiting on a signed engagement letter" },
  { name: "Okafor Dental", badge: "1120S", group: "waiting", status: "Waiting on equipment invoices" },
  { name: "Brightwater Cafe", badge: "1065", group: "waiting", status: "Waiting on partner K-1 addresses" },
  { name: "Summit Ridge Partners", badge: "1065", group: "working", status: "Instead is reconciling the year-end ledger" },
  { name: "Patel Household", badge: "1040", group: "working", status: "Instead is gathering brokerage 1099s" },
  { name: "Lakeshore Logistics", badge: "1120", group: "working", status: "Instead is preparing the extension" },
  { name: "Alder & Co", badge: "1120S", group: "uptodate", status: "Nothing open" },
  { name: "Baxter Household", badge: "1040", group: "uptodate", status: "Return filed, nothing open" },
  { name: "Calloway Capital", badge: "1065", group: "uptodate", status: "Estimates paid, nothing open" },
  { name: "Dunmore Realty", badge: "1065", group: "uptodate", status: "Nothing open" },
  { name: "Easton Family Trust", badge: "1041", group: "uptodate", status: "Return filed, nothing open" },
  { name: "Fairbanks Architects", badge: "1120S", group: "uptodate", status: "Nothing open" },
];

export type Row = {
  id: string;
  title: string;
  scope: string;
  kind: "client" | "workflow";
  badge?: string;
  due: string;
  detail: string;
  special?: "decisions";
};

export const NEEDS: Row[] = [
  { id: "n1", title: "Approve 3 decisions in the 2026 tax plan", scope: "Aditya & Oswal Partners", kind: "client", badge: "1065", due: "Due Nov 17", detail: "", special: "decisions" },
  { id: "n2", title: "Make 3 calls in the year-end strategy analysis", scope: "Workflow across 18 clients", kind: "workflow", due: "Due Nov 20", detail: "Instead finished the analysis for 15 clients. Three clients need a call before the plan can go out: the owners have trade-offs that are better talked through than emailed. Call notes and talking points are ready for each." },
  { id: "n3", title: "Approve the CP2000 reply", scope: "Bhatia Household", kind: "client", badge: "1040", due: "Due Nov 27", detail: "The IRS notice flags unreported brokerage income. Instead matched it to the 1099-B the client sent and drafted a reply with the supporting schedule attached. It needs your review before it goes out." },
  { id: "n4", title: "Release 1 held Q4 estimate reminder", scope: "Workflow across 31 clients", kind: "workflow", due: "Sends Dec 1", detail: "Reminders went out to every client except one. Instead held it because the client's income changed after the last projection. Release it as is, or let Instead update the amount first." },
  { id: "n5", title: "Clear 2 diagnostics to finish the Filbert return", scope: "Filbert Holdings", kind: "client", badge: "1065", due: "Due Dec 15", detail: "Two diagnostics are blocking the return: a K-1 address mismatch and a missing basis schedule. Instead has a suggested fix for each. Confirm them and it will refile the checks." },
];

export type Workflow = {
  id: string;
  name: string;
  scope: string;
  done: number;
  total: number;
  unit: string;
  status: "Running" | "Waiting on you" | "Paused";
  next: string;
};

export const WORKFLOWS: Workflow[] = [
  { id: "w1", name: "Year-end strategy analysis", scope: "Workflow across 18 clients", done: 15, total: 18, unit: "done", status: "Waiting on you", next: "Calls due Nov 20" },
  { id: "w2", name: "Q4 estimate reminders", scope: "Workflow across 31 clients", done: 30, total: 31, unit: "sent", status: "Waiting on you", next: "Sends Dec 1" },
  { id: "w3", name: "2026 tax plan", scope: "Aditya & Oswal Partners", done: 4, total: 7, unit: "steps done", status: "Waiting on you", next: "Due Nov 17" },
  { id: "w4", name: "Extension prep", scope: "Workflow across 6 clients", done: 2, total: 6, unit: "done", status: "Running", next: "Next batch Nov 24" },
  { id: "w5", name: "Document gathering", scope: "Workflow across 22 clients", done: 17, total: 22, unit: "done", status: "Running", next: "Reminder Nov 18" },
  { id: "w6", name: "Filbert return diagnostics", scope: "Filbert Holdings", done: 5, total: 7, unit: "cleared", status: "Waiting on you", next: "Due Dec 15" },
  { id: "w7", name: "New client onboarding", scope: "Workflow across 2 clients", done: 1, total: 2, unit: "done", status: "Paused", next: "Resumes Nov 30" },
];

export const THREADS: { id: string; title: string; scope: string; needs?: boolean; detail: string; special?: "decisions" }[] = [
  { id: "t1", title: "2026 tax plan for Aditya & Oswal", scope: "Aditya & Oswal Partners", needs: true, detail: "", special: "decisions" },
  { id: "t2", title: "Who hasn't signed for 2027?", scope: "All clients", detail: "Across all 46 clients, 9 engagement letters for 2027 are still unsigned. Instead listed them by how long they have been waiting and can send a reminder to each." },
  { id: "t3", title: "Filbert K-1 address mismatch", scope: "Filbert Holdings", detail: "The address on the K-1 does not match the one on file. Instead found the newer address in the client's last email and suggests updating the record." },
  { id: "t4", title: "Filbert K-2 connection error", scope: "Filbert Holdings", detail: "The connection to the K-2 data source dropped during import. Instead retried twice and wants to reconnect with fresh credentials." },
  { id: "t5", title: "Filbert K-3 data loss detected", scope: "Filbert Holdings", detail: "Some rows from the K-3 import did not come through. Instead compared the source and the import and listed the missing lines for review." },
  { id: "t6", title: "Filbert K-4 timeout issue", scope: "Filbert Holdings", detail: "The K-4 sync timed out. Instead split the import into smaller batches and can run it again whenever you are ready." },
];

export const DECISIONS = [
  { id: "d1", title: "Fund the partner retirement plan before year end", body: "Contributing now lowers this year's taxable income for both partners." },
  { id: "d2", title: "Elect bonus depreciation on the new equipment", body: "Deducts the full cost this year instead of spreading it over several years." },
  { id: "d3", title: "Move the Q4 estimated payment to Dec 15", body: "Keeps cash in the business a little longer and still lands before the deadline." },
];

export const CHIPS: { label: string; prompt: string }[] = [
  { label: "Onboard a client", prompt: "Onboard a new client: " },
  { label: "Gather documents", prompt: "Gather missing documents for the 2026 return from: @" },
  { label: "Prep an extension", prompt: "Prep an extension for these clients: @" },
  { label: "Run a strategy analysis", prompt: "Run a year-end strategy analysis for: @" },
  { label: "Send estimate reminders", prompt: "Send Q4 estimate reminders to: @" },
];

export type FileItem = { id: string; name: string; size: string; client: string; date: string; type: "pdf" | "xlsx" | "docx" };

export const FIRM = "Firm";

export const FILES: FileItem[] = [
  { id: "f1", name: "2025 Form 1065 draft.pdf", size: "1.8 MB", client: "Aditya & Oswal Partners", date: "Nov 12", type: "pdf" },
  { id: "f2", name: "Partner K-1 packet.pdf", size: "940 KB", client: "Aditya & Oswal Partners", date: "Nov 9", type: "pdf" },
  { id: "f3", name: "CP2000 notice.pdf", size: "312 KB", client: "Bhatia Household", date: "Nov 6", type: "pdf" },
  { id: "f4", name: "2025 1099-B Schwab.pdf", size: "1.1 MB", client: "Bhatia Household", date: "Oct 30", type: "pdf" },
  { id: "f5", name: "Q3 trial balance.xlsx", size: "86 KB", client: "Filbert Holdings", date: "Nov 10", type: "xlsx" },
  { id: "f6", name: "K-1 address change letter.pdf", size: "148 KB", client: "Filbert Holdings", date: "Nov 13", type: "pdf" },
  { id: "f7", name: "Payroll summary 2025.xlsx", size: "212 KB", client: "Northgate Dental Group", date: "Nov 4", type: "xlsx" },
  { id: "f8", name: "Engagement letter template.docx", size: "42 KB", client: FIRM, date: "Sep 18", type: "docx" },
  { id: "f9", name: "2026 tax calendar.pdf", size: "220 KB", client: FIRM, date: "Oct 2", type: "pdf" },
  { id: "f10", name: "Client intake checklist.docx", size: "58 KB", client: FIRM, date: "Aug 21", type: "docx" },
];

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type LeadType = "quote" | "contact";

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  phone?: string;
  email?: string;
  kw?: string;
  address?: string;
  subject?: string;
  message?: string;
  createdAt: string;
}

export type NewLead = Omit<Lead, "id" | "createdAt">;

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

// Simple in-process write queue so concurrent submissions never clobber
// each other's read-modify-write cycle (there's no DB to handle this for us).
let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function getLeads(): Promise<Lead[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addLead(input: NewLead): Promise<Lead> {
  const task = writeQueue.then(async () => {
    await ensureFile();
    const leads = await getLeads();
    const lead: Lead = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    leads.unshift(lead);
    await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
    return lead;
  });
  writeQueue = task.catch(() => {});
  return task;
}

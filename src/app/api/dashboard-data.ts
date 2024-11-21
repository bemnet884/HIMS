// pages/api/dashboard-data.ts
import { getDashboardData } from "@/lib/getMetrics";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await getDashboardData();
  res.status(200).json(data);
}
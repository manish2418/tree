import clientPromise from "@/lib/mongoDb";
import { getServerSession } from "next-auth/next";
import authConfig from "./auth/[...nextauth]";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db('employeeDashboard');

  const session = await getServerSession(req, res, authConfig);

        if (!session) {
            console.error("Unauthorized: No session found");
            return res.status(401).json({ message: "Unauthorized" });
        }

  if (req.method === 'POST') {
    const { holidays, year } = req.body;

    try {
      const result = await db.collection('holiday_list').updateOne(
        { year },
        {
          $set: {
            holidays,
          },
        },
        { upsert: true }
      );

      if (result.modifiedCount > 0 || result.upsertedCount > 0) {
        res.status(200).json({ message: 'Holidays updated successfully!' });
      } else {
        res.status(500).json({ message: 'Failed to update holidays' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
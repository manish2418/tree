import clientPromise from "@/lib/mongoDb";
import { getServerSession } from "next-auth/next";
import authConfig from "./auth/[...nextauth]";

async function getHandler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("employeeDashboard");

        const { id, status } = req.query;
        let reviews;


        if (id) {
            reviews = await db.collection("performance_reviews").find({ employee_id: +id }).toArray();
            if (!reviews) {
                return res.status(404).json({ message: "Review not found" });
            }
        } else if(id && status) {
            reviews = await db.collection("performance_reviews").find({employee_id: +id, isActive: false }).toArray();
        }else {
            reviews = await db.collection("performance_reviews").find({}).toArray();
        }
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function postHandler(req, res) {
    const performanceReview = {
        ...req.body,
        updated_at: new Date(),
    };

    try {
        const client = await clientPromise;
        const db = client.db("employeeDashboard");

        const result = await db.collection("performance_reviews").findOneAndUpdate(
            { employee_id: performanceReview.employee_id, review_year: new Date().getFullYear(), isActive: true },
            { $set: performanceReview },
            { upsert: true, returnDocument: "after"}
        );
        return res.status(201).json({ message: "Review submitted successfully", data: result });
    } catch (error) {
        console.error("Error while submitting review:", error);
        return res.status(500).json({ error: "Error while submitting review" });
    }
}

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authConfig);

        if (!session) {
            console.error("Unauthorized: No session found");
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (req.method === "GET") {
            return await getHandler(req, res);
        } else if (req.method === "POST") {
            return await postHandler(req, res);
        } else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

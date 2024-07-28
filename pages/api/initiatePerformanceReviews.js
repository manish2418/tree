import clientPromise from "@/lib/mongoDb";
import { getServerSession } from "next-auth/next";
import authConfig from "./auth/[...nextauth]";
// import { message } from "antd";
export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authConfig);
    console.log("Session data:", session); // Debugging: Log session data
    if (!session || session.user.email !== 'HR@treedigit.com') {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "POST") {
      const { employeeIds } = req.body;

      if (!employeeIds || employeeIds.length === 0) {
        return res.status(400).json({ message: "No employees selected" });
      }

      const client = await clientPromise;
      const db = client.db("employeeDashboard");

      const performanceReviews = employeeIds.map(emp => ({
        ...emp,
        hr_name: "",
        hr_id: null,
        namager_name: "",
        employeeReview: { created_at: new Date() },
        managerReview: { created_at: new Date() },
        // hrReview: { created_at: new Date() },
        created_at: new Date(),
        updated_at: new Date(),
        review_year: new Date().getFullYear(),
        isActive: true,
        isRejected: false,
        isApproved: false,
        currently_with: emp.employee_id,
        isEmpoyeeSubmitted: false,
        isManagerSubmitted: false,
        isHrSubmitted: false,
        // isApproved_manager: false,
        // isApproved_hr: false,
        // isRejected_manager: false,
        // isRejected_hr: false,
        // isRejected_employee: false,
        // isEmployeeSubmitted: false,
        // isManagerSubmitted: false,
        // isHrSubmitted: false,
        rating: 0,
      }));

      await db.collection("performance_reviews").insertMany(performanceReviews);

      return res.status(201).json({ message: "Performance reviews initiated successfully" });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error initiating performance reviews:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

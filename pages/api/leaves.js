// import clientPromise from "@/lib/mongoDb";
// import { getServerSession } from "next-auth/next";
// import authConfig from "./auth/[...nextauth]"
// import {ObjectId} from "mongodb"

// export default async function handler(req, res) {
//   const session = await getServerSession(req,res,authConfig);
//   if (!session) {
//     res.status(401).json({ message: "unAuthorised" });
//     return;
//   }
//   if (req.method === "POST") {
//     const { leaveData, employeeId, employeeName, employeeManager } = req.body;
//     // let type = "leaves.total_paid_leaves_available";
//     // let value = leaveData.total_days * -1;
//     // if (leaveData.type !== "paid") {
//     //   type = "leaves.total_unpaid_leaves";
//     //   value = leaveData.total_days;
//     // }
//     let remainingLeaveQuery = {};

//     switch(leaveData.type) {
//       case "paid":
//         remainingLeaveQuery = {
//           $inc: {
//             "leaves.paid_leaves.used": leaveData.total_days,
//             "leaves.paid_leaves.available": -leaveData.total_days
//           }
//         };
//         break;
//       case "optional":
//         remainingLeaveQuery = {
//           $inc: {
//             "leaves.optional_holidays.used": leaveData.total_days,
//             "leaves.optional_holidays.available": -leaveData.total_days
//           }
//         };
//         break;
//       case "parental":
//         remainingLeaveQuery = {
//           $inc: {
//             "leaves.parental_leaves.used": leaveData.total_days,
//             "leaves.parental_leaves.available": -leaveData.total_days
//           }
//         };
//         break;
//       case "unpaid":
//         remainingLeaveQuery = {
//           $inc: {
//             "leaves.unpaid_leaves.used": leaveData.total_days
//           }
//         };
//         break;
//     }
//     const leaveRecord = {
//       name: employeeName,
//       employee_id: employeeId,
//       currently_with: employeeManager,
//       // isApproved_manager: false,
//       // isApproved_hr: false,
//       isApproved: false,
//       isRejected: false,
//       approveReason:"",
//       rejectReason:"",
//       description: leaveData.description,
//       type: leaveData.type,
//       to_date: leaveData.to_date,
//       from_date: leaveData.from_date,
//       total_days: leaveData.total_days,
//       isActive:true
//     };

//     try {
//       const client = await clientPromise;
//       const db = client.db("employeeDashboard");
//       // const up = await db.collection("employee").updateOne(
//       //   { employee_id: employeeId },
//       //   {
//       //     $push: { "leaves.applied_leaves": leaveData },
//       //     $inc: { [`${type}`]: value },
//       //   }
//       // );
//       await db.collection("employee").updateOne(
//         { employee_id: employeeId },
//         updateQuery
//       );

//       await db.collection("leave_request").insertOne(leaveRecord);
//       res.status(201).json({ message: "Update success" });
//     } catch (e) {
//       console.log("Error while updating", e);
//       res.status(500).json({ error: "Error while updating DB" });
//     }
//   } else if (req.method === "PUT") {
//     const { isApproved,approveReason, rejectReason, leaveData } = req.body;
//     if (isApproved) {
//       try {
//         const client = await clientPromise;
//         const db = client.db("employeeDashboard");
//         let data;
//         // if (session.user.email === "HR@treedigit.com") {
//           data = {
//             isApproved: true,
//             approveReason,
//             // managerApproveReason: approveReason,
//             // isApproved_hr: true,
//             // hrApproveReason: approveReason,
//             isActive: false,
//           };
//           let type = "leaves.total_paid_leaves_available";
//           let value = leaveData.total_days * -1;
//           if (leaveData.type !== "paid") {
//             type = "leaves.total_unpaid_leaves";
//             value = leaveData.total_days;
//           }
//           await db.collection("employee").updateOne(
//             { employee_id: leaveData.employee_id },
//             {
//               $inc: { [`${type}`]: value },
//             }
//           );
//         // } else {
//         //   data = {
//         //     isApproved_manager: true,
//         //     currently_with: 1,
//         //     managerApproveReason: approveReason,
//         //   };
//         // }
//         await db
//           .collection("leave_request")
//           .updateOne({ _id: new ObjectId(leaveData._id) }, {$set:data}, {upsert: true},);
//         res.status(201).json({ message: "Update success" });
//       } catch (e) {
//         console.log("Error while updating", e);
//         res.status(500).json({ error: "Error while updating DB" });
//       }
//     }else{
//       const client = await clientPromise;
//       const db = client.db("employeeDashboard");
//       let data = {
//         // isApproved_manager: false,
//         // isApproved_hr: false,
//         isActive: false,
//         isRejected:true,
//         rejectReason,
//       };
//       await db
//       .collection("leave_request")
//       .updateOne(
//         { _id: new ObjectId(leaveData._id) },
//         {$set: data}, 
//         {upsert: true},
//       );
//     res.status(201).json({ message: "Update success" });
//     }
//   }
// }
import clientPromise from "@/lib/mongoDb";
import { getServerSession } from "next-auth/next";
import authConfig from "./auth/[...nextauth]"
import {ObjectId} from "mongodb"

export default async function handler(req, res) {
  const session = await getServerSession(req,res,authConfig);
  if (!session) {
    res.status(401).json({ message: "unAuthorised" });
    return;
  }

  if (req.method === "POST") {
    const { leaveData, employeeId, employeeName, employeeManager, employee } = req.body;
    
    try {
      const client = await clientPromise;
      const db = client.db("employeeDashboard");

      // Fetch the employee to check their gender and available leave
      // const employee = await db.collection("employee").findOne({ employee_id: employeeId });
      
      let updateQuery = {};
      let canApply = true;
      let errorMessage = "";

      switch(leaveData.type) {
        case "paid":
          if (leaveData.total_days > employee.leaves.paid_leaves.available) {
            canApply = false;
            errorMessage = "Requested paid leave exceeds available balance";
          } 
          break;
        case "optional":
          if (leaveData.total_days > employee.leaves.optional_holidays.available) {
            canApply = false;
            errorMessage = "Requested optional holiday exceeds available balance";
          } 
          break;
        case "parental":
          const maxParentalLeave = employee.gender === 'male' ? 5 : 180;
          if (leaveData.total_days > employee.leaves.parental_leaves.available) {
            canApply = false;
            errorMessage = "Requested parental leave exceeds available balance";
          } else if (leaveData.total_days > maxParentalLeave) {
            canApply = false;
            errorMessage = `Parental leave cannot exceed ${maxParentalLeave} days`;
          }
          break;
      }

      if (!canApply) {
        return res.status(400).json({ error: errorMessage });
      }

      const leaveRecord = {
        name: employeeName,
        employee_id: employeeId,
        currently_with: employeeManager,
        isApproved: false,
        isRejected: false,
        approveReason: "",
        rejectReason: "",
        description: leaveData.description,
        type: leaveData.type,
        to_date: leaveData.to_date,
        from_date: leaveData.from_date,
        total_days: leaveData.total_days,
        isActive: true
      };

      // await db.collection("employee").updateOne(
      //   { employee_id: employeeId },
      //   updateQuery
      // );
      
      await db.collection("leave_request").insertOne(leaveRecord);
      res.status(201).json({ message: "Leave request created successfully" });
    } catch (e) {
      console.log("Error while updating", e);
      res.status(500).json({ error: "Unable to create leave request" });
    }
  } else if (req.method === "PUT") {
    const { isApproved, approveReason, rejectReason, leaveData } = req.body;
    
    try {
      const client = await clientPromise;
      const db = client.db("employeeDashboard");

      if (isApproved) {
        let data = {
          isApproved: true,
          approveReason,
          isActive: false,
        };

        let updateQuery = {};
        switch(leaveData.type) {
          case "paid":
            updateQuery = {
              $inc: {
                "leaves.paid_leaves.used": leaveData.total_days,
                "leaves.paid_leaves.available": -leaveData.total_days
              }
            };
            break;
          case "optional":
            updateQuery = {
              $inc: {
                "leaves.optional_holidays.used": leaveData.total_days,
                "leaves.optional_holidays.available": -leaveData.total_days
              }
            };
            break;
          case "parental":
            updateQuery = {
              $inc: {
                "leaves.parental_leaves.used": leaveData.total_days,
                "leaves.parental_leaves.available": -leaveData.total_days
              }
            };
            break;
          case "unpaid":
            updateQuery = {
              $inc: {
                "leaves.unpaid_leaves.used": leaveData.total_days
              }
            };
            break;
        }

        await db.collection("employees").updateOne(
          { employee_id: leaveData.employee_id },
          updateQuery
        );

        await db.collection("leave_request").updateOne(
          { _id: new ObjectId(leaveData._id) },
          { $set: data },
          { upsert: true }
        );

        res.status(200).json({ message: "Leave approved successfully" });
      } else {
        let data = {
          isActive: false,
          isRejected: true,
          rejectReason,
        };

        await db.collection("leave_request").updateOne(
          { _id: new ObjectId(leaveData._id) },
          { $set: data },
          { upsert: true }
        );

        res.status(200).json({ message: "Leave rejected successfully" });
      }
    } catch (e) {
      console.log("Error while updating", e);
      res.status(500).json({ error: "Error while updating DB" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
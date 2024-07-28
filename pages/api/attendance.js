import moment from 'moment';
import clientPromise from "@/lib/mongoDb";
import { getServerSession } from "next-auth/next";
import authConfig from "./auth/[...nextauth]"

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authConfig);
    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const { method } = req;
    const client = await clientPromise;
    const db = client.db("employeeDashboard");
    const usersCollection = db.collection('attendance');

    const today = moment().format('DD/MM/YYYY');

    switch (method) {
        case 'POST':
            const { action, employee_id } = req.body;

            if (action === 'checkin') {
                try {
                    let user = await usersCollection.findOne({ employee_id: employee_id });

                    if (!user) {
                        user = {
                            employee_id: employee_id,
                            attendance: []
                        };
                        await usersCollection.insertOne(user);
                    }

                    const existingRecord = user.attendance.find(record => record.date === today);

                    if (existingRecord) {
                        return res.status(400).json({ success: false, message: 'Already checked in today' });
                    }

                    const checkInTime = moment().format('HH:mm');

                    const newAttendance = {
                        date: today,
                        status: 'Present',
                        check_in: checkInTime,
                        check_out: '-NA-',
                        duration: '-NA-',
                    };

                    await usersCollection.updateOne(
                        { employee_id: employee_id },
                        { $push: { attendance: newAttendance } }
                    );

                    res.status(201).json({ success: true, data: newAttendance });
                } catch (error) {
                    res.status(400).json({ success: false, message: error.message });
                }
            } else if (action === 'checkout') {
                try {
                    const user = await usersCollection.findOne({ employee_id: employee_id });

                    if (!user) {
                        return res.status(404).json({ success: false, message: 'User not found' });
                    }

                    const existingRecord = user.attendance.find(record => record.date === today);

                    if (!existingRecord || existingRecord.check_in === '-NA-') {
                        return res.status(400).json({ success: false, message: 'No check-in record found for today' });
                    }

                    if (existingRecord.check_out !== '-NA-') {
                        return res.status(400).json({ success: false, message: 'Already checked out today' });
                    }

                    const checkOutTime = moment().format('HH:mm');
                    const checkInTime = moment(existingRecord.check_in, 'HH:mm');
                    const duration = moment.duration(moment(checkOutTime, 'HH:mm').diff(checkInTime)).asHours().toFixed(2);

                    existingRecord.check_out = checkOutTime;
                    existingRecord.duration = `${duration} hrs`;

                    await usersCollection.updateOne(
                        { employee_id: employee_id, "attendance.date": today },
                        { $set: { "attendance.$": existingRecord } }
                    );

                    res.status(200).json({ success: true, data: existingRecord });
                } catch (error) {
                    res.status(400).json({ success: false, message: error.message });
                }
            } else {
                res.status(400).json({ success: false, message: 'Invalid action' });
            }
            break;

        case 'GET':
            try {
                const { employee_id } = req.query;
                const user = await usersCollection.findOne({ employee_id: +employee_id });

                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }

                res.status(200).json({ success: true, data: user.attendance });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}

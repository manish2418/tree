import { hashPassword } from "@/lib/auth";

export const postEmployeeToMongoEmployee = async ({ values, reportingManager, reportingHr }) => {
    return {
        first_name: values.first_name,
        last_name: values.last_name,
        designation: values.designation,
        location: values.location,
        email: values.org_email,
        role: values.role,
        department: values.department,
        mobile_no: values.mobile_no?.toString(),
        experience_in_years: values.experience_in_years,
        personal_email: values.personal_email,
        date_of_birth: new Date(values.date_of_birth),
        emergency_contact_number: values.emergency_contact_number?.toString(),
        gender: values.gender,
        password: await hashPassword(values.confirm_password),
        manager: reportingManager?._id,
        hr: reportingHr?._id,
        address: values.address,
        date_of_joining: new Date(values.date_of_joining),
    };
}

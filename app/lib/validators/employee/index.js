import { z } from "zod"

export const postEmployeeSchema = z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100),
    designation: z.string().min(1),
    location: z.string().min(1),
    org_email: z.string().email(),
    role: z.enum(["HR", "Employee", "Manager"]),
    department: z.string().min(1),
    mobile_no: z.string(),
    emergency_contact_number: z.string(),
    experience_in_years: z.number().min(0),
    personal_email: z.string().email(),
    password: z.string().min(4, { message: 'Password must be at least 6 characters' }),
    confirm_password: z.string().min(4),
    manager: z.string().email(),
    hr: z.string().email().optional(),
    address: z.string().min(0),
    date_of_birth: z.coerce.date(),
    date_of_joining: z.coerce.date(),
    basic_salary: z.number().min(0),
    house_rent_allowance: z.number().min(0),
    telephone_allowance: z.number().min(0),
    lta: z.number().min(0),
    special_allowance: z.number().min(0),
    performance_incentive: z.number().min(0),
    retention_bonus: z.number().min(0),
    provident_fund: z.number().min(0),
    professional_tax: z.number().min(0),
    income_tax: z.number().min(0),
    national_pention_scheme_amount: z.number().min(0),
}).refine((schema) => {
    return schema.password === schema.confirm_password
}, {
    message: "confirm password and password must be the same",
    path: ["confirm_password"]
})

export const getEmployeesSchema = z.object({
    searchKey: z.string().optional(),
    limit: z.coerce.number().optional().default(5),
    offset: z.coerce.number().optional().default(0),
    includeOnlyMyReportees: z.enum(['true', 'false']).optional().transform((value) => value === 'true').default(false)
});

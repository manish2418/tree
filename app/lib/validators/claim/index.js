import { z } from "zod"
import { ClaimStatus } from "../../constants/claim";

const expenseSchema = z.object({
    amount: z.number().min(1),
    description: z.string().min(1).max(100),
    proof_link: z.string().min(1).max(100),
    type: z.string().min(1).max(100),
    from: z.coerce.date(),
    to: z.coerce.date(),
}).refine((schema) => {
    return new Date(schema.from) <= new Date(schema.to)
}, {
    message: "from date/time should be less than or equal to to date/time",
    path: ["from"]
})

export const postClaimSchema = z.object({
    claim_name: z.string().min(1).max(30),
    claim_description: z.string().min(1).max(100),
    is_draft: z.boolean().default(false),
    expenses: z.array(expenseSchema)
})

export const getClaimsSchema = z.object({
    statuses: z.string().optional().transform(value => value?.split(',') || [])
        .pipe(z.enum(Object.values(ClaimStatus)).optional().array()),
    limit: z.coerce.number().optional().default(5),
    offset: z.coerce.number().optional().default(0),
    assignedToMe: z.enum(['true', 'false']).optional().transform((value) => value === 'true').default(false)
});

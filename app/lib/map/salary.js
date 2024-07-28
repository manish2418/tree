export const postSalaryToMongoSalary = ({ values, createdBy, employee }) => {
    return {
        basic_salary: values.basic_salary,
        house_rent_allowance: values.house_rent_allowance,
        telephone_allowance: values.telephone_allowance,
        lta: values.lta,
        special_allowance: values.special_allowance,
        performance_incentive: values.performance_incentive,
        retention_bonus: values.retention_bonus,
        provident_fund: values.provident_fund,
        professional_tax: values.professional_tax,
        income_tax: values.income_tax,
        national_pention_scheme_amount: values.national_pention_scheme_amount,
        created_by: createdBy._id,
        updated_by: createdBy._id,
        employee_id: employee._id,
        currency: "INR",
        effective_from: new Date(values.date_of_joining),
    }
}


const CreateClaimMailTemplate = ({ employeeName, claimName, expenseCount, contentFor }) => {

    let html = (
        <>
            <p>New claim created by {employeeName} for {claimName} with {expenseCount} expense{expenseCount > 0 ? "s" : ""}</p>
            <p>Please do not reply to this email, as this is system generated.</p>
        </>
    );

    if (contentFor === "Employee") {
        html = (
            <>
                <p>Your claim request {claimName} with {expenseCount} expense{expenseCount > 0 ? "s" : ""} is semt to your manager for review</p>
                <p>Please do not reply to this email, as this is system generated.</p>
            </>
        );
    }

    return html
};

export default CreateClaimMailTemplate;

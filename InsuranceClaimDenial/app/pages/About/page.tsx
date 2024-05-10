export default function About() {
    return <>
        <div className="h-screen flex flex-col items-left font-poppins gap-2 font-lg pt-32 pl-20">
            <p><strong>Gender:</strong> The gender of the patient, typically categorized as male, female, or other.</p>
            <p><strong>Medical Condition:</strong> The specific health issue or diagnosis for which the claim was filed.</p>
            <p><strong>ICD 10 Code:</strong> A standardized medical code used to classify diseases and medical conditions for billing and record-keeping purposes.</p>
            <p><strong>Type of Claim:</strong> The nature of the insurance claim, such as medical treatment, medication, or therapy.</p>
            <p><strong>Type of Condition:</strong> The general category or classification of the medical condition, such as chronic, acute, or pre-existing.</p>
            <p><strong>Type of Service:</strong> The specific healthcare service or treatment provided, such as surgery, consultation, or diagnostic testing.</p>
            <p><strong>Claim Status:</strong> The current status of the insurance claim, indicating whether its approved, denied, or pending.</p>
            <p><strong>Age:</strong> The age of the patient at the time the claim was filed, providing context for their healthcare needs.</p>
        </div>
    </>
}
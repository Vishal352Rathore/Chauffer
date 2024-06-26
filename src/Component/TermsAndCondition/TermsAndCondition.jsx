import React from "react";
import './TermsAndCondition.css'

const TermsAndCondition = () => {
  const termsAndConditionsData = {
    companyName: "Dummy Company",
    websiteName: "Dummy Website",
    agreement:
      "These Terms and Conditions ('Terms') govern your use of Dummy Website ('Service') provided by Dummy Company ('Company').",
    eligibility: "You must be 18 years or older to use this Service.",
    acceptance:
      "By accessing or using the Service, you agree to be bound by these Terms.",
    privacyPolicy:
      "For information about how we collect, use, and share your personal information, please refer to our Privacy Policy.",
    disclaimer:
      "This Service is provided 'as is' and 'as available'. We do not warrant that the Service will be uninterrupted or error-free.",
    termination:
      "We reserve the right to terminate or suspend your access to the Service at any time without prior notice.",
    governingLaw:
      "These Terms shall be governed by and construed in accordance with the laws of Dummy Country.",
    contactInfo:
      "If you have any questions about these Terms, please contact us at contact@dummycompany.com.",
  };
  return (
    <div>
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-title margin_top_4 padding_left_20">
              <h3>
                Terms and <span>Conditions</span>
              </h3>
            </div>
          </div>
        </div>
      </section>
      <div className="terms-container">
      <p>{termsAndConditionsData.agreement}</p>
      </div>

      <div className="terms-container">
        <h2> Acceptance of Terms</h2>
        <p>{termsAndConditionsData.acceptance}</p>

        <h2> Eligibility</h2>
        <p>{termsAndConditionsData.eligibility}</p>

        <h2> Privacy Policy</h2>
        <p>{termsAndConditionsData.privacyPolicy}</p>

        <h2> Disclaimer</h2>
        <p>{termsAndConditionsData.disclaimer}</p>

        <h2> Termination</h2>
        <p>{termsAndConditionsData.termination}</p>

        <h2> Governing Law</h2>
        <p>{termsAndConditionsData.governingLaw}</p>

        <h2> Contact Information</h2>
        <p>{termsAndConditionsData.contactInfo}</p>
      </div>
    </div>
  );
};

export default TermsAndCondition;

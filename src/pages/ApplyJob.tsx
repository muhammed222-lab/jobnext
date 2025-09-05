import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const applyMutation = useMutation(api.applications.create);
  const [isLoading, setIsLoading] = useState(false);
  const userEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("userEmail") || ""
      : "";
  const [form, setForm] = useState({
    // Personal Information
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    phone: "",
    address: "",
    nextOfKin: "",
    emergencyContact: "",
    // Identification & Legal
    nationalId: "",
    passport: "",
    tin: "",
    ssn: "",
    workPermit: "",
    // Employment Details
    jobTitle: "",
    department: "",
    employeeId: "", // will be auto-generated
    joiningDate: "",
    employmentType: "",
    workLocation: "",
    supervisor: "",
    // Education & Professional
    education: [""],
    certifications: "",
    previousEmployment: [""],
    skills: "",
    // Payroll & Banking
    bankName: "",
    bankAccount: "",
    bankAccountName: "",
    paymentMethod: "",
    salary: "",
    pensionAccount: "",
    // Tax & Statutory
    taxId: "",
    pensionScheme: "",
    healthInsurance: "",
    otherContributions: "",
    // Company-Specific
    contractAccepted: false,
    offerAccepted: false,
    ndaAccepted: false,
    handbookAccepted: false,
    workTools: "",
    // Application
    resumeUrl: "",
    coverLetter: "",
  });
  // Dropdown options
  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const maritalStatusOptions = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Other",
  ];
  const countryOptions = [
    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa",
    "United States",
    "United Kingdom",
    "Canada",
    "India",
    "Other",
  ];
  // Dynamic education/experience handlers
  const handleEducationChange = (idx, value) => {
    setForm((prev) => {
      const updated = [...prev.education];
      updated[idx] = value;
      return { ...prev, education: updated };
    });
  };
  const addEducation = () => {
    setForm((prev) => ({ ...prev, education: [...prev.education, ""] }));
  };
  const handleExperienceChange = (idx, value) => {
    setForm((prev) => {
      const updated = [...prev.previousEmployment];
      updated[idx] = value;
      return { ...prev, previousEmployment: updated };
    });
  };
  const addExperience = () => {
    setForm((prev) => ({
      ...prev,
      previousEmployment: [...prev.previousEmployment, ""],
    }));
  };
  const [section, setSection] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Auto-generate employeeId
      const employeeId = `EMP-${Math.random().toString(36).substr(2, 9)}`;
      await applyMutation({
        jobId,
        userId: userEmail,
        ...form,
        education: form.education.join("; "),
        previousEmployment: form.previousEmployment.join("; "),
        employeeId,
        email: "",
      });
      navigate("/dashboard");
    } catch (err) {
      // Optionally show error toast
    }
    setIsLoading(false);
  };

  // Section titles and fields
  const sections = [
    {
      title: "Personal Information",
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <Input
            name="dob"
            value={form.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            type="date"
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          >
            <option value="">Select Gender</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          >
            <option value="">Select Marital Status</option>
            {maritalStatusOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          >
            <option value="">Select Country</option>
            {countryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          {/* Email field removed, always use logged-in user's email */}
          <Input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Residential Address"
          />
          <Input
            name="nextOfKin"
            value={form.nextOfKin}
            onChange={handleChange}
            placeholder="Next of Kin"
          />
          <Input
            name="emergencyContact"
            value={form.emergencyContact}
            onChange={handleChange}
            placeholder="Emergency Contact"
          />
        </div>
      ),
    },
    {
      title: "Identification & Legal",
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="nationalId"
            value={form.nationalId}
            onChange={handleChange}
            placeholder="National ID Number"
          />
          <Input
            name="passport"
            value={form.passport}
            onChange={handleChange}
            placeholder="Passport Number"
          />
          <Input
            name="tin"
            value={form.tin}
            onChange={handleChange}
            placeholder="Tax Identification Number (TIN)"
          />
          <Input
            name="ssn"
            value={form.ssn}
            onChange={handleChange}
            placeholder="Social Security Number"
          />
          <Input
            name="workPermit"
            value={form.workPermit}
            onChange={handleChange}
            placeholder="Work/Residency Permit"
          />
        </div>
      ),
    },
    {
      title: "Employment Details",
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            placeholder="Job Title / Designation"
          />
          <Input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department / Unit"
          />
          {/* employeeId is auto-generated, not shown */}
          <Input
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            placeholder="Date of Joining"
            type="date"
          />
          <Input
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            placeholder="Employment Type"
          />
          <Input
            name="workLocation"
            value={form.workLocation}
            onChange={handleChange}
            placeholder="Work Location / Branch"
          />
          <Input
            name="supervisor"
            value={form.supervisor}
            onChange={handleChange}
            placeholder="Reporting Manager / Supervisor"
          />
        </div>
      ),
    },
    {
      title: "Educational & Professional Background",
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Education</label>
            {form.education.map((edu, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={edu}
                  onChange={(e) => handleEducationChange(idx, e.target.value)}
                  placeholder={`Education #${idx + 1}`}
                />
                {idx === form.education.length - 1 && (
                  <Button type="button" size="sm" onClick={addEducation}>
                    Add
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Input
            name="certifications"
            value={form.certifications}
            onChange={handleChange}
            placeholder="Professional Certifications"
          />
          <div>
            <label className="block font-medium mb-1">Experience</label>
            {form.previousEmployment.map((exp, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Textarea
                  value={exp}
                  onChange={(e) => handleExperienceChange(idx, e.target.value)}
                  placeholder={`Experience #${idx + 1}`}
                  rows={2}
                />
                {idx === form.previousEmployment.length - 1 && (
                  <Button type="button" size="sm" onClick={addExperience}>
                    Add
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Textarea
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skills & Competencies"
            rows={2}
          />
        </div>
      ),
    },
    {
      title: "Payroll & Banking",
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="bankName"
            value={form.bankName}
            onChange={handleChange}
            placeholder="Bank Name"
          />
          <Input
            name="bankAccount"
            value={form.bankAccount}
            onChange={handleChange}
            placeholder="Bank Account Number"
          />
          <Input
            name="bankAccountName"
            value={form.bankAccountName}
            onChange={handleChange}
            placeholder="Account Name"
          />
          <Input
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            placeholder="Preferred Payment Method"
          />
          <Input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary Structure / Agreed Remuneration"
          />
          <Input
            name="pensionAccount"
            value={form.pensionAccount}
            onChange={handleChange}
            placeholder="Pension Account Details"
          />
        </div>
      ),
    },
    {
      title: "Tax & Statutory Deductions",
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="taxId"
            value={form.taxId}
            onChange={handleChange}
            placeholder="Tax Identification Details"
          />
          <Input
            name="pensionScheme"
            value={form.pensionScheme}
            onChange={handleChange}
            placeholder="Pension Scheme Information"
          />
          <Input
            name="healthInsurance"
            value={form.healthInsurance}
            onChange={handleChange}
            placeholder="Health Insurance / National Health Coverage"
          />
          <Input
            name="otherContributions"
            value={form.otherContributions}
            onChange={handleChange}
            placeholder="Other Statutory Contributions"
          />
        </div>
      ),
    },
    {
      title: "Company-Specific Documents",
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="contractAccepted"
              checked={form.contractAccepted}
              onChange={handleChange}
            />
            Signed Employment Contract
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="offerAccepted"
              checked={form.offerAccepted}
              onChange={handleChange}
            />
            Offer Letter Acceptance
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ndaAccepted"
              checked={form.ndaAccepted}
              onChange={handleChange}
            />
            NDA / Confidentiality Agreement
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="handbookAccepted"
              checked={form.handbookAccepted}
              onChange={handleChange}
            />
            Employee Handbook Acknowledgment
          </label>
          <Textarea
            name="workTools"
            value={form.workTools}
            onChange={handleChange}
            placeholder="Work Tools Issued (laptop, ID card, SIM card, etc.)"
            rows={2}
          />
        </div>
      ),
    },
    {
      title: "Resume & Cover Letter",
      fields: (
        <div>
          <Input
            name="resumeUrl"
            value={form.resumeUrl}
            onChange={handleChange}
            placeholder="Resume URL (Google Drive, Dropbox, etc.)"
            required
          />
          <Textarea
            name="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            placeholder="Cover Letter"
            rows={6}
            required
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-2 py-8">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight drop-shadow-lg">
            Apply for Your Dream Job
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete the application below. Your details are safe and secure.
          </p>
        </div>
        {/* Progress Bar / Stepper */}
        <div className="flex items-center justify-between mb-6 px-2">
          {sections.map((s, idx) => (
            <div key={s.title} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${section === idx ? "bg-gradient-to-br from-blue-400 to-purple-400 text-white border-blue-400 scale-110 shadow-lg" : "bg-white text-muted-foreground border-gray-300"}`}
              >
                {idx + 1}
              </div>
              <span
                className={`mt-2 text-xs font-semibold ${section === idx ? "text-primary" : "text-muted-foreground"}`}
              >
                {s.title.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
        {/* Card Layout */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 animate-fade-in"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mr-2"></span>
              {sections[section].title}
            </h2>
            <div className="transition-all duration-300 animate-slide-in">
              {sections[section].fields}
            </div>
          </div>
          <div className="flex gap-4 justify-between mt-8">
            {section > 0 && (
              <Button
                type="button"
                variant="outline"
                className="rounded-full px-6 py-2 font-semibold border-2 border-blue-400 hover:bg-blue-50 transition-all"
                onClick={() => setSection(section - 1)}
              >
                ← Previous
              </Button>
            )}
            <div className="flex-1"></div>
            {section < sections.length - 1 ? (
              <Button
                type="button"
                className="rounded-full px-6 py-2 font-semibold bg-gradient-to-br from-blue-400 to-purple-400 text-white shadow-lg hover:scale-105 transition-all"
                onClick={() => setSection(section + 1)}
              >
                Next →
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-full px-6 py-2 font-semibold bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-lg hover:scale-105 transition-all"
              >
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;

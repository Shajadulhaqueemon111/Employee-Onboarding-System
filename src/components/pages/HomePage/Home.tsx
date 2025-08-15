import EmployeeOnboardingForm from "../Employee-Onboarding-page/EmployeeOnboardingForm";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Employee Onboarding</h1>
        <p className="text-gray-600">
          Complete your registration to join our team
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-lg">
        <EmployeeOnboardingForm />
      </div>
    </div>
  );
};

export default Home;

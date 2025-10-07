export default function BasicInformation() {
  const data = {
    companyName: "N/A",
    yearEstablished: "N/A",
    companyWebsite: "N/A",
    businessType: "N/A",
    industrySector: "N/A",
    numEmployees: "N/A",
    annualRevenue: "N/A",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
      <div>
        <p className="text-gray-400">Company/Organization Name</p>
        <p className="text-gray-200">{data.companyName}</p>
      </div>
      <div>
        <p className="text-gray-400">Year Established</p>
        <p className="text-gray-200">{data.yearEstablished}</p>
      </div>
      <div>
        <p className="text-gray-400">Company Website</p>
        <p className="text-gray-200">{data.companyWebsite}</p>
      </div>
      <div>
        <p className="text-gray-400">Business Type</p>
        <p className="text-gray-200">{data.businessType}</p>
      </div>
      <div>
        <p className="text-gray-400">Industry/Sector</p>
        <p className="text-gray-200">{data.industrySector}</p>
      </div>
      <div>
        <p className="text-gray-400">Number of Employees</p>
        <p className="text-gray-200">{data.numEmployees}</p>
      </div>
      <div>
        <p className="text-gray-400">Annual Revenue Range</p>
        <p className="text-gray-200">{data.annualRevenue}</p>
      </div>
    </div>
  );
}

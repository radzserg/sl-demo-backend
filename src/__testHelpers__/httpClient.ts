import axios from "axios";

export const buildTestHttpClient = () => {
  const axiosInstance = axios.create({
    baseURL: `http://localhost:4000`,
  });
  axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
  axiosInstance.defaults.headers.patch["Content-Type"] = "application/json";

  axiosInstance.interceptors.response.use((res) => {
    if (process.env.CONTRACT_TEST) {
      const criticalSeverityList = ["Error"];
      let contractViolations = [];

      if ("sl-violations" in res.headers) {
        contractViolations = JSON.parse(res.headers["sl-violations"]);
      }

      contractViolations.forEach((violation: any) => {
        console.log(`API violation found:`, violation);
        const severity = violation["severity"];
        if (criticalSeverityList.includes(severity)) {
          throw `Contract Violation!`;
        }
      });
    }

    return res;
  });

  return axiosInstance;
};

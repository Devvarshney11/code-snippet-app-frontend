import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axios from "axios";

const CodeSnippetTable = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.React_App_Get_URL);
      console.log(response);
      setData(response.data.values);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const formatTime = (submissionTimestamp) => {
    const dateObject = new Date(submissionTimestamp);
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedTime = dateObject.toLocaleString("en-IN", options);
    return formattedTime;
  };

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                UserName
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Code Language
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                STDIN
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Timestamp
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Source Code
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                STDOUT
              </h5>
            </div>
          </div>

          {data?.map((data) => {
            return (
              <div className={`grid grid-cols-3 sm:grid-cols-6`} key={data.id}>
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className=" text-black dark:text-white sm:block">
                    {data.username}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {data.code_language}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {data.stdin === "" ? "No Input" : data.stdin}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {formatTime(data.submission_timestamp)}
                  </p>
                </div>
                <div className=" items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-meta-3">
                    {data.source_code.substring(0, 100)}
                  </p>
                </div>
                <div className=" items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p>{data.stdout === "" ? "No Output" : data.stdout}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CodeSnippetTable;

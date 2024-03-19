import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axios from "axios";
import { languages, output_api_url } from "../Components/constants";

const SubmitForm = () => {
  const [username, setUsername] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("");
  const [stdin, setStdin] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const [output, setOutput] = useState("");
  const options = {
    method: "POST",
    url: output_api_url,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.React_App_API_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: codeLanguage,
      source_code: btoa(sourceCode),
      stdin: btoa(stdin),
    },
  };
  const fetchOutput = async () => {
    try {
      const response = await axios.request(options);
      if (response.data.stdout) setOutput(atob(response.data.stdout));
      else if (response.data.stderr) setOutput(atob(response.data.stderr));
      else setOutput(atob(response.data.compile_output));
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    fetchOutput();
  };
  const postData = async () => {
    if (output !== "") {
      try {
        const data = {
          username: username,
          code_language: codeLanguage,
          stdin: stdin,
          source_code: sourceCode,
          stdout: output,
        };
        console.log(data);
        const response = await axios.post(process.env.React_App_Post_URL, data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    postData();
  }, [output]);
  useEffect(() => {
    setCodeLanguage("");
    setUsername("");
    setStdin("");
    setSourceCode("");
    setOutput("");
  }, []);
  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="p-6.5">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Username: <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter UserName"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-black dark:text-white">
                        Preferred Code Language:{" "}
                        <span className="text-meta-1">*</span>
                      </label>
                      <select
                        onChange={(e) => setCodeLanguage(e.target.value)}
                        className="w-full rounded border border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-stroke dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {languages.map((language) => (
                          <option key={language.id} value={language.id}>
                            {language.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        STDIN
                      </label>
                      <textarea
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        rows={2}
                        placeholder="Standard Input (stdin)"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Source Code: <span className="text-meta-1">*</span>
                    </label>
                    <textarea
                      value={sourceCode}
                      onChange={(e) => setSourceCode(e.target.value)}
                      rows={15}
                      placeholder="Source Code"
                      className="w-full h-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>
                <div className="mb-2.5 block text-black dark:text-white">
                  {"Output : " + output}
                </div>
                <button
                  className="w-full mt-6 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SubmitForm;

import React,{useState} from "react";
// border-4 border-red-600
const Home = () => {
  const [code ,setCode]=useState('');
  const [input ,setInput]=useState('');
  const [output ,setOutput]=useState([]);
  const handleCodeChange = (event)=>{
    setCode(event.target.value);
  }
  const handleInputChange = (event)=>{
    setInput(event.target.value);
  }
  const handleSubmit= async()=>{
    const data={
      code:code,
      input:input.replace(/\n/g, ' ')
    };
    setOutput([]);
    const res=await fetch('http://localhost:8000/api/v1/submit',{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
    },
      body:JSON.stringify(data),
     });
     const outputValue = await res.json();
     console.log(outputValue);
     const val=[outputValue];
     setOutput(val)
  }
  return (
    <div className="flex flex-col ">
      <div className="flex justify-center py-3 border-b-2 border-b-slate-100 ">
        <h1 className="font-mono text-slate-600 text-2xl">
          Compile<span className="font-extrabold text-blue-900">C++</span>
        </h1>
      </div>
      <div className="flex flex-row ">
        <div className="flex flex-col basis-2/3 border-r-4 border-r-slate-100">
          <div className="flex flex-row ">
            <div className="basis-1/5 text-center bg-gray-50 border-b border-b-neutral-300 py-3">
              main.cpp
            </div>
            <div className="flex justify-end px-3 basis-4/5 border-b-2 border-b-neutral-400 border-l-2 border-l-neutral-400 ">
              <div className="bg-sky-400 px-2 py-2 font-serif cursor-pointer" onClick={handleSubmit}>Run</div>
            </div>
          </div>
          <div className="px-4 py-2 h-96">
            <textarea
              className="w-full h-full border bg-gray-50  border-l-slate-100 outline-none resize-none"
              placeholder="Enter your cpp code here"
              value={code}
              onChange={handleCodeChange}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col  basis-1/3 ">
          <div className="flex flex-col basis-1/2 border-b border-b-black">
            <div className="flex flex-row">
              <div className="basis-1/5 text-center bg-gray-50 border-b border-b-neutral-300 py-3">
                Input
              </div>
              <div className="basis-4/5 border-b-2 border-b-neutral-400 border-l-2 border-l-neutral-400"></div>
            </div>
            <div className="px-4 py-2 h-full">
              <textarea
                className="w-full h-full border bg-gray-50  border-l-neutral-400 outline-none resize-none"
                placeholder="Enter your input"
                value={input}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col basis-1/2">
            <div className="flex flex-row">
              <div className="basis-1/5 text-center bg-gray-50 border-b border-b-neutral-300 py-3">
                Output
              </div>
              <div className="basis-4/5 border-b-2 border-b-neutral-400 border-l-2 border-l-neutral-400"></div>
            </div>
            <div className="flex flex-col px-4 py-2 h-full">
              {/* <textarea
                className="w-full h-full border bg-gray-50  border-l-neutral-400 outline-none resize-none"
                placeholder="Your output comes here"
                value={output}
                onChange={handleOutputChange}
              ></textarea> */}
              {output===[] ? <div className="font-mono">Your output comes here</div>:<><div className="font-serif font-semibold">{output[0]?.status}</div>
              {output[0]?.msg===0 ?<div className="font-mono"></div>:<div className="font-mono">{output[0]?.msg}</div>}
              
              <div className="font-mono">{output[0]?.output}</div></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

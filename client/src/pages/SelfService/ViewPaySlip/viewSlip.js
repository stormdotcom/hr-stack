import React from 'react'
import {FaBarcode} from "react-icons/fa"
import {IoMdClose} from "react-icons/io"
import moment from 'moment'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
function viewSlip({data, currentSlip, handleClose, months}) {
    const pxToMm = (px) => {
        return Math.floor(px/document.getElementById('myMm').offsetHeight);
      };
      
    const handleDownload = ()=>{
        const input = document.getElementById('invoice-form');
        const inputHeightMm = pxToMm(input.offsetHeight);
        const a4WidthMm = 210;
        const a4HeightMm = 297; 

        
        let pdf;
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            
            // Document of a4WidthMm wide and inputHeightMm high
            if (inputHeightMm > a4HeightMm) {
              // elongated a4 (system print dialog will handle page breaks)
               pdf = new jsPDF('p', 'mm', [inputHeightMm+16, a4WidthMm]);
            } else {
              // standard a4
               pdf = new jsPDF();
            }
            
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`${data.fullname} Payslip.pdf`);
          });
        ;      
      }
    return (
        <div className='z-auto payslipSection'>

             <div className="flex items-center justify-center min-h-screen bg-gray-100 " >
            <div className="w-3/5 bg-white shadow-lg">
                <div id="invoice-form">
                <div className="flex justify-between p-4">
                <div id="myMm" style={{height: "1mm"}} />
                    <div>
                        <h1 className="text-3xl italic font-extrabold tracking-widest text-indigo-500">example company</h1>
                    </div>
                    <div className="p-2">
                        <ul className="flex">
                            <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span className="text-sm">
                                    www.examplecompany.com
                                </span>
                                <span className="text-sm">
                                    www.hrstack.com
                                </span>
                            </li>
                            <li className="flex flex-col p-2 border-l-2 border-indigo-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm">
                                   example company, 2821 Kensington Road,Avondale Estates, GA 30002 USA
                                </span>
                            </li>
                            <li style={{cursor:"pointer"}} onClick={()=>handleClose(false)}> <IoMdClose /> </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-indigo-500"></div>
                <div className="flex justify-between p-4">
                    <div>
                        <h6 className="font-bold"> Date : <span className="text-sm font-medium"> {moment(currentSlip.date).utc().format('DD-MM-YYYY')}  </span></h6>
                        <h6 className="font-bold">Employee ID : <span className="text-sm font-medium"> {data?.empID} </span></h6>
                    </div>
                    <div className="w-40">
                        <address className="text-sm">
                            <span className="font-bold"> Days Payble  : </span>
                            30
                
                        </address>
                    </div>
                    <div className="w-40">
                        <address className="text-sm">
                            <span className="font-bold">Account No :</span>
                            {data?.bankDetails?.accountNumber}
                        </address>
                    </div>
                    <div></div>
                </div>
                <div className="flex justify-center p-4">
                    <div className="border shadow w-100">
                        <table className=' w-100 border border-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Basic
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Deductions
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Allowance
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 ">
                                        Tax
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="whitespace-nowrap border-b">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    {currentSlip.amountPayable - currentSlip.allowance}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {currentSlip.deductions}
                                    
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">     {currentSlip.allowance}  </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    %10
                                    </td>
                                </tr>
                        
                                <tr className="">
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    </td>
                                    <td className="text-sm font-bold">Net Pay</td>
                                    <td className="text-sm font-bold tracking-wider"><b> {currentSlip.amountPayable}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-between p-4">
                    <div>
                       
                        <ul className="text-xs list-disc list-inside">
                            <li>"This is an auto-generated pay-slip and does not require any signature". If you have any queries, please email support support@hrstack.com</li>
                        </ul>
                    </div>
                    <div className="p-4">
                        <small>Digitally Signed</small>
                        <div className="text-4xl italic text-indigo-500"><FaBarcode  className='w-full'/> </div>
                    </div>
                </div>
                </div>
                <div className="w-full h-0.5 bg-indigo-500"></div>

                <div className="p-4">
                    <div className="flex items-end justify-end space-x-3">
                    <div className='button-1 ' onClick={()=>handleDownload()}> Download</div> 
                    </div>
                </div>
            </div>
            <iframe title={data.fullname +" | "+ data.empID} id="ifmcontentstoprint" style={{height: '0', width: '0'}} />
        </div>
        </div>
    )
}

export default viewSlip

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight mb-6">Manufacturing Performance</h3>
        
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-[13px] mb-1.5">
              <span className="font-medium text-slate-700">Yield %</span>
              <span className="font-bold text-slate-900">94.2%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '94.2%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-[13px] mb-1.5">
              <span className="font-medium text-slate-700">Overall Equipment Effectiveness (OEE)</span>
              <span className="font-bold text-slate-900">82.5%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82.5%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-[13px] mb-1.5">
              <span className="font-medium text-slate-700">Downtime (Hours)</span>
              <span className="font-bold text-slate-900">14.5h</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-[13px] mb-1.5">
              <span className="font-medium text-slate-700">Quality Score</span>
              <span className="font-bold text-slate-900">99.1%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '99.1%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight mb-6">Top Supplier Performance</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="pb-3 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Vendor</th>
                <th className="pb-3 font-semibold text-slate-500 uppercase tracking-wider text-[11px] text-center">On-Time</th>
                <th className="pb-3 font-semibold text-slate-500 uppercase tracking-wider text-[11px] text-center">Quality</th>
                <th className="pb-3 font-semibold text-slate-500 uppercase tracking-wider text-[11px] text-right">Cost Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-medium text-slate-900">TechComponents Ltd</td>
                <td className="py-3 text-center text-emerald-600 font-medium">98%</td>
                <td className="py-3 text-center text-slate-700">99.5%</td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">A+</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-slate-900">Global Silicon Inc.</td>
                <td className="py-3 text-center text-slate-700 font-medium">94%</td>
                <td className="py-3 text-center text-slate-700">98.2%</td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">A</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-slate-900">DisplayTech Solutions</td>
                <td className="py-3 text-center text-amber-600 font-medium">82%</td>
                <td className="py-3 text-center text-slate-700">97.4%</td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">B</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-slate-900">PowerCell Batteries</td>
                <td className="py-3 text-center text-slate-700 font-medium">96%</td>
                <td className="py-3 text-center text-slate-700">99.1%</td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">A-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

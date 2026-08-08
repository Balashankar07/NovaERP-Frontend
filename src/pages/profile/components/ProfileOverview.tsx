import { useMemo } from "react";
import { User as UserIcon, Mail, Building2, MapPin, Clock, Calendar, ShieldCheck, CheckCircle2, ShieldAlert } from "lucide-react";
import type { CurrentUser, User as FullUser } from "@/types";

interface ProfileOverviewProps {
  currentUser: CurrentUser;
  fullUser: FullUser | null;
}

export function ProfileOverview({ currentUser, fullUser }: ProfileOverviewProps) {
  // Use detailed data if available, fallback to JWT claims
  const email = fullUser?.email || currentUser.email;
  const firstName = fullUser?.firstName || "";
  const lastName = fullUser?.lastName || "";
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : email.split("@")[0];
  const role = currentUser.role;
  const companyId = fullUser?.companyId || currentUser.companyId;
  const branchId = currentUser.branchId; // from JWT context
  const isActive = fullUser ? fullUser.isActive : true; // Assuming true if not loaded yet, or false. Better to assume true since they are logged in.

  // Mock metadata for presentation as requested
  const lastLogin = "Just now"; // Placeholder
  const accountCreated = "2023-01-15"; // Placeholder
  const department = "Engineering"; // Placeholder
  const emailVerified = true; // Placeholder
  const passwordLastChanged = "3 months ago"; // Placeholder
  const mfaEnabled = false; // Placeholder

  // Weighted Profile Completion logic
  const completionPercentage = useMemo(() => {
    let score = 0;
    let totalWeight = 0;
    
    // Define fields and their weights
    const fields = [
      { weight: 25, isComplete: !!firstName },
      { weight: 25, isComplete: !!lastName },
      { weight: 20, isComplete: !!fullUser?.phone },
      { weight: 15, isComplete: !!email },
      { weight: 15, isComplete: false }, // Avatar upload (mocked as incomplete)
    ];

    fields.forEach(field => {
      totalWeight += field.weight;
      if (field.isComplete) score += field.weight;
    });

    return Math.round((score / totalWeight) * 100);
  }, [firstName, lastName, fullUser?.phone, email]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

      {/* Left Column: Avatar & Completion */}
      <div className="flex flex-col items-center gap-6 relative z-10 w-full lg:w-48 flex-shrink-0">
        <div className="h-32 w-32 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-slate-400 group relative">
          <UserIcon className="w-16 h-16" strokeWidth={1.5} />
          
          {/* Extension Point: Avatar Upload */}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-not-allowed">
            <span className="text-white text-xs font-medium px-2 text-center">Upload Avatar<br/>(Pending API)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isActive ? (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              Active Account
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20">
              Disabled Account
            </span>
          )}
        </div>

        {/* Profile Completion Widget */}
        <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-medium text-slate-600">Profile Completion</span>
            <span className="text-sm font-bold text-indigo-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-3">
            <div 
              className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          {completionPercentage < 100 ? (
            <p className="text-[11px] text-slate-500 leading-tight">
              Complete your profile to unlock all enterprise features.
            </p>
          ) : (
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Profile complete
            </p>
          )}
        </div>
      </div>

      {/* Right Column: Info & Expanded Metadata */}
      <div className="flex-1 space-y-8 relative z-10 w-full">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {displayName}
          </h1>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            {role} {department ? `— ${department}` : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Contact</span>
            <div className="flex items-center gap-3 text-sm text-slate-700 mt-1">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">{email}</span>
              {emailVerified && (
                <span title="Verified">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Organization</span>
            <div className="flex items-center gap-3 text-sm text-slate-700 mt-1">
              <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">Company: {companyId || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">Branch: {branchId || "N/A"}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Timeline</span>
            <div className="flex items-center gap-3 text-sm text-slate-700 mt-1">
              <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">Created: {accountCreated}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">Last Login: {lastLogin}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Security Status</span>
            <div className="flex items-center gap-3 text-sm text-slate-700 mt-1">
              <ShieldAlert className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">Password: {passwordLastChanged}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">2FA: {mfaEnabled ? "Enabled" : "Not Enabled"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

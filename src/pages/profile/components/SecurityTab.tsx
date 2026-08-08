import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { toast } from "@/utils/toast";

import { useFormValidation } from "@/hooks/use-form-validation";
import { ValidationSummary } from "@/components/ui/ValidationSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SecurityValues = z.infer<typeof securitySchema>;

export function SecurityTab() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<SecurityValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { globalErrors, withValidation, isSubmitting } = useFormValidation({ form });

  const onSubmit = withValidation(async () => {
    // In a real implementation, we would call:
    // await authApi.changePassword(values as ChangePasswordRequest);
    // For now, we simulate API delay and show a pending feature toast.
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast.info("Change Password backend integration is pending.", {
      description: "The UI validation and flow are ready for when the API endpoint is available.",
    });
    
    // Optional: form.reset() if it was a real success
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 md:p-8">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-semibold text-slate-900">Security Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your password and security preferences.</p>
      </div>

      <div className="mb-8 p-4 bg-amber-50 rounded-xl border border-amber-200 flex gap-3 items-start">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium">Backend Integration Pending</p>
          <p className="opacity-90 mt-1">
            The Change Password API endpoint is currently unavailable. This form demonstrates the UI and validation flow.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md" noValidate>
          <ValidationSummary errors={globalErrors} />

          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showCurrent ? "text" : "password"} 
                      placeholder="••••••••" 
                      {...field} 
                      disabled={isSubmitting} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showNew ? "text" : "password"} 
                      placeholder="••••••••" 
                      {...field} 
                      disabled={isSubmitting} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showConfirm ? "text" : "password"} 
                      placeholder="••••••••" 
                      {...field} 
                      disabled={isSubmitting} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-start pt-2">
            <Button
              type="submit"
              disabled={isSubmitting || !form.formState.isDirty}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

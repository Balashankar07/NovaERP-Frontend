import React from "react";
import { Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePermissions } from "@/hooks/use-permissions";

export interface DataTableToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  searchPlaceholder?: string;
  hasSelections?: boolean;
  selectedCount?: number;
  onDeleteSelected?: () => void;
  onCancelSelection?: () => void;
  itemTypeName?: string;
  deletePermission?: string;
}

export function DataTableToolbar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = "Search...",
  hasSelections = false,
  selectedCount = 0,
  onDeleteSelected,
  onCancelSelection,
  itemTypeName = "items",
  deletePermission
}: DataTableToolbarProps) {
  const { hasPermission } = usePermissions();
  const canDelete = deletePermission ? hasPermission(deletePermission) : true;

  return (
    <>
      {hasSelections && (
        <div className="absolute top-0 left-0 right-0 h-14 bg-indigo-50/95 backdrop-blur-sm border-b border-indigo-100 flex items-center justify-between px-4 z-10 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-indigo-600 hover:bg-indigo-600">{selectedCount}</Badge>
            <span className="text-sm font-medium text-indigo-900">{itemTypeName} selected</span>
          </div>
          <div className="flex items-center gap-2">
            {canDelete && onDeleteSelected && (
              <Button variant="outline" size="sm" className="text-rose-600 border-rose-200 hover:bg-rose-50 h-8" onClick={onDeleteSelected}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </Button>
            )}
            {onCancelSelection && (
              <Button variant="ghost" size="sm" className="text-indigo-600 h-8" onClick={onCancelSelection}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <form onSubmit={onSearchSubmit} className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label="Search"
            className="pl-9 bg-white border-slate-200 focus-visible:ring-indigo-500/20"
          />
        </form>
      </div>
    </>
  );
}

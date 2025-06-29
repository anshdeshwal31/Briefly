'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { deleteSummaryAction } from '@/actions/summary-actions';
import { toast } from 'sonner';

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    // TODO: Delete summary
    const result = await deleteSummaryAction({summaryId});
    if(!result.success){
        toast("Error",{
            description:"Error while deleting the summary. try again ❌",
        })
    }
    else{
        toast("success",{
            description:"deleted the summary successfully ✅",
        })
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-red-100 bg-gray-200"
        >
          <Trash2 className="h-4 w-4 " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-gray-500 hover:bg-gray-600 transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            // variant="destructive"
            className="🔲bg-red-500 transition-all duration-200 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
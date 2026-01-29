'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualTriggerDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            This trigger runs the workflow manually — no settings required.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <p className='text-muted-foreground'>
            Manual Trigger executes the workflow immediately with no settings.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

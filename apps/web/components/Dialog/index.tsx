import * as React from "react";
import { XCircle } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface IDialogComponent {
  /**
   * @param {React.ReactNode} [children] - The content of the dialog.
   */
  children: React.ReactNode;
  /**
   * @param {string} [title] - The title of the dialog.
   */
  title?: string;

  /**
   * @param {boolean} [open] - Determines whether the dialog is open or closed.
   */
  open: boolean;
  /**
   * @param {() => void} [onCloseDialog] - A function to be called when the dialog is closed.
   */
  onCloseDialog: () => void;
  /**
   * @param {React.ReactNode} [modalFooter] - The actions to be displayed in the dialog footer.
   */
  modalFooter?: React.ReactNode;

  /**
   * @param {boolean} [showCloseButton] - Determines if the close button is displayed.
   */
  showCloseButton?: boolean;
}

const DialogRoot = DialogPrimitive.Root;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed  left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border border-border-light gap-4 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  onCloseDialog,
  showCloseButton = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /**
   * @param {boolean} [showCloseButton] - Determines if the close button is displayed.
   */
  showCloseButton?: boolean;
  /**
   *
   * @param {void} [onCloseDialog] - A function to be called when the dialog is closed.
   */
  onCloseDialog?: () => void;
}) => (
  <div className="flex flex-row justify-between">
    <div className={cn(className)} {...props} />
    {showCloseButton && (
      <DialogPrimitive.Close onClick={() => onCloseDialog}>
        <XCircle />
      </DialogPrimitive.Close>
    )}
  </div>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-row justify-end gap-2 mt-6", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-md font-semibold text-black", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export const Dialog = ({
  children,
  title,
  open,
  onCloseDialog,
  showCloseButton,
  modalFooter,
}: IDialogComponent) => {
  return (
    <DialogRoot open={open}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader
          showCloseButton={showCloseButton}
          onCloseDialog={onCloseDialog}
        >
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        {modalFooter && <DialogFooter>{modalFooter}</DialogFooter>}
      </DialogContent>
    </DialogRoot>
  );
};
export default {
  Dialog,
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
};

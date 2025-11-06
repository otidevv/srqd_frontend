import { Toaster as Sonner } from 'sonner'
import type { ComponentProps } from 'react'

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900 group-[.toaster]:border-green-200 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-green-700',
          actionButton: 'group-[.toast]:bg-green-600 group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-green-100 group-[.toast]:text-green-900',
          success: 'group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900 group-[.toaster]:border-green-200',
          error: 'group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900 group-[.toaster]:border-red-200',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

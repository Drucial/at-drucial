"use client"

import type * as React from "react"

import { MinusIcon, PlusIcon } from "lucide-react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 group flex flex-1 items-center justify-between gap-6 rounded-md py-6 text-left text-4xl font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 md:text-5xl",
          className
        )}
        {...props}
      >
        {children}
        <div className="relative size-8 shrink-0">
          <MinusIcon className="text-muted-foreground absolute inset-0 size-8 transition-all duration-200 group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100 group-data-[state=closed]:rotate-90 group-data-[state=closed]:opacity-0" />
          <PlusIcon className="text-muted-foreground absolute inset-0 size-8 transition-all duration-200 group-data-[state=closed]:rotate-0 group-data-[state=closed]:opacity-100 group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-base md:text-lg"
      {...props}
    >
      <div className={cn("pb-6 pt-2", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

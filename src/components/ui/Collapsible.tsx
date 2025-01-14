import cn from '@/utils/cn'
import { applyPropsToChildrenOfType } from '@/utils/manipulateReactComponents'
import React, { useId } from 'react'
import { HiChevronRight } from 'react-icons/hi2'
import { type VariantProps, cva } from 'class-variance-authority'

type CollapsibleProps = React.ComponentPropsWithRef<'div'> & {
  className?: string
  openByDefault?: boolean
  duration?: number
  accordionId?: string
} & VariantProps<typeof cvaCollapsibleContent>

const Collapsible: React.FC<CollapsibleProps> = ({ children, className, openByDefault = false, duration = 300, animation, accordionId }) => {
  const id = useId()
  children = applyPropsToChildrenOfType(children, { id, openByDefault, animation, accordionId }, [CollapsibleContent, CollapsibleTrigger])
  return (
    <div className={cn('relative', className)} style={{ '--animation-duration': `${duration}ms` } as React.CSSProperties}>
      {children}
    </div>
  )
}
Collapsible.displayName = 'Collapsible'

type CollapsibleTriggerProps = React.ComponentPropsWithRef<'label'> & {
  openByDefault?: boolean
  classNames?: { icon?: string }
  accordionId?: string
}

const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({ id, classNames = {}, children, className, openByDefault, accordionId, ref, ...props }) => (
  <>
    <input type={accordionId ? 'radio' : 'checkbox'} name={accordionId || undefined} id={id} className="peer hidden" defaultChecked={openByDefault} />
    <label
      htmlFor={id}
      ref={ref}
      className={cn('collapsible group grid cursor-pointer select-none grid-flow-col grid-cols-[minmax(0,_1fr)_auto] items-center', className)}
      {...props}>
      {children}
      <span
        className={cn(
          `h-8 w-8 justify-self-end p-1 text-black outline-none transition-transform [transition-duration:var(--animation-duration)]
          peer-checked:group-[.collapsible]:rotate-90 dark:text-white`,
          classNames?.icon
        )}>
        <HiChevronRight className="h-full w-full" />
      </span>
    </label>
  </>
)
CollapsibleTrigger.displayName = 'CollapsibleTrigger'

const cvaCollapsibleContent = cva(
  `group grid origin-top transform-gpu grid-rows-[0fr] overflow-hidden transition-all ease-in-out [transition-duration:var(--animation-duration)]
  peer-checked:grid-rows-[1fr] peer-[:not(:checked)]:!py-0`,
  {
    variants: {
      animation: {
        fade: [
          `opacity-0 [transition-duration:var(--animation-duration)] peer-checked:opacity-100 [&>*]:invisible [&>*]:opacity-0 [&>*]:transition-all
          peer-checked:[&>*]:visible peer-checked:[&>*]:opacity-100`
        ],
        'slide-down': [
          `origin-top -translate-y-2 opacity-0 [transition-duration:var(--animation-duration)] peer-checked:translate-y-0 peer-checked:opacity-100
          [&>*]:invisible [&>*]:opacity-0 [&>*]:transition-all [&>*]:ease-in-out peer-checked:[&>*]:visible peer-checked:[&>*]:opacity-100`
        ],
        'scale-fade': [
          `origin-top scale-95 opacity-0 [transition-duration:var(--animation-duration)] peer-checked:scale-100 peer-checked:opacity-100 [&>*]:invisible
          [&>*]:opacity-0 [&>*]:transition-all [&>*]:ease-in-out [&>*]:[transition-duration:var(--animation-duration)] peer-checked:[&>*]:visible
          peer-checked:[&>*]:opacity-100`
        ],
        none: '[&>*]:visible'
      }
    }
  }
)

type CollapsibleContentProps = React.ComponentPropsWithoutRef<'div'> & {
  innerClassName?: string
  accordionId?: string
} & VariantProps<typeof cvaCollapsibleContent>

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ children, className, innerClassName, animation = 'scale-fade', ...props }) => (
  <div
    className={cn(
      cvaCollapsibleContent({
        animation
      }),
      className
    )}
    {...props}>
    <div className={cn('min-h-0', innerClassName)}>{children}</div>
  </div>
)
CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleContent, CollapsibleTrigger }

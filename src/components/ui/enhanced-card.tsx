
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  iconColor?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, icon, iconColor = "roomly-primary", title, description, children, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(
        "relative overflow-hidden transition-all duration-200 hover:shadow-md",
        `border-l-4 border-l-${iconColor}`,
        className
      )}
      style={{
        borderLeftColor: iconColor.startsWith('#') ? iconColor : `hsl(var(--${iconColor}))`
      }}
      {...props}
    >
      {(icon || title || description) && (
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            {icon && (
              <div 
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: iconColor.startsWith('#') 
                    ? `${iconColor}20` 
                    : `hsl(var(--${iconColor}) / 0.1)`
                }}
              >
                {React.cloneElement(icon as React.ReactElement, {
                  className: cn("h-5 w-5"),
                  style: {
                    color: iconColor.startsWith('#') ? iconColor : `hsl(var(--${iconColor}))`
                  }
                })}
              </div>
            )}
            <div className="flex-1">
              {title && <CardTitle className="text-lg">{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
    </Card>
  )
)
EnhancedCard.displayName = "EnhancedCard"

export { EnhancedCard }

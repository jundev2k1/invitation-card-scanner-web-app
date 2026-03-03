"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components";
import { type IconType } from "@/icons";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

export interface IconTextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftText?: string;
  rightText?: string;
  required?: boolean;
}

export function IconTextBox({
  label,
  description,
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftText,
  rightText,
  className,
  required,
  ...props
}: IconTextBoxProps) {
  const hasLeft = !!(LeftIcon || leftText);
  const hasRight = !!(RightIcon || rightText);

  return (
    <Field className="space-y-1.5">
      {label && (
        <FieldLabel htmlFor={props.id} className={cn(error && "text-destructive")}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </FieldLabel>
      )}

      <InputGroup>
        {hasLeft && (
          <InputGroupAddon align="inline-start">
            {LeftIcon ? (
              <InputGroupText>
                <LeftIcon className="h-4 w-4" />
              </InputGroupText>
            ) : (
              leftText && <InputGroupText>{leftText}</InputGroupText>
            )}
          </InputGroupAddon>
        )}

        <InputGroupInput
          className={cn(
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          id={props.id}
          {...props}
        />

        {hasRight && (
          <InputGroupAddon align="inline-end">
            {RightIcon ? (
              <InputGroupText>
                <RightIcon className="h-4 w-4" />
              </InputGroupText>
            ) : (
              rightText && <InputGroupText>{rightText}</InputGroupText>
            )}
          </InputGroupAddon>
        )}
      </InputGroup>

      {error && <FieldError>{error}</FieldError>}
      {description && !error && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}

"use client";

import { ReactNode, useState } from "react";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  InformationCircleIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type ValueFormatter<T> = (value: T) => string;
type ValueParser<T> = (value: string) => T;

export interface SelectOption {
  label: string;
  value: string;
}

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

export interface CountryOption {
  code: string;
  flag: string;
  name: string;
}

// Base Field Props
interface BaseFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  helperText?: string;
  className?: string;
  disabled?: boolean;
}

// Text Input Field
interface TextFieldProps<
  TForm extends FieldValues,
  TValue = string,
> extends BaseFieldProps<TForm> {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];

  format?: ValueFormatter<TValue>;
  parse?: ValueParser<TValue>;
}

export function TextField<TForm extends FieldValues, TValue = string>({
  control,
  name,
  label,
  required,
  helperText,
  type = "text",
  placeholder,
  inputMode,
  format,
  parse,
  className,
  disabled,
}: TextFieldProps<TForm, TValue>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const rawValue = field.value as TValue;

        const displayValue =
          format && rawValue !== undefined && rawValue !== null
            ? format(rawValue)
            : ((rawValue as unknown as string) ?? "");

        return (
          <FormItem>
            <FormLabel className="text-sm font-bold text-slate-700">
              <span>
                {label}
                {required && <span className="text-red-500">*</span>}
              </span>
            </FormLabel>

            <FormControl>
              <Input
                type={type}
                inputMode={inputMode}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "h-11 rounded-lg bg-slate-50/50 border-slate-200 focus:bg-white transition-all",
                  className,
                )}
                value={displayValue}
                onChange={(e) => {
                  const val = e.target.value;

                  field.onChange(
                    parse ? parse(val) : (val as unknown as TValue),
                  );
                }}
              />
            </FormControl>

            {helperText && (
              <span className="text-gray-500 text-xs ml-2">{helperText}</span>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

// Textarea Field
interface TextareaFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string;
  rows?: number;
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  helperText,
  placeholder,
  rows = 4,
  className,
  disabled,
}: TextareaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-bold text-slate-700">
            <span>
              {label}
              {required && <span className="text-red-500">*</span>}
            </span>
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              rows={rows}
              className={cn(
                "rounded-xl bg-slate-50/50 border-slate-200 resize-none focus:bg-white",
                className,
              )}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          {helperText && (
            <span className="text-gray-500 text-xs ml-2">{helperText}</span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Select Field
interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  options: SelectOption[];
  placeholder?: string;
  searchable?: boolean;
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  helperText,
  options,
  placeholder = "Select option",
  searchable,
  className,
  disabled,
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-bold text-slate-700 gap-0">
            <span>
              {label}
              {required && <span className="text-red-500">*</span>}
            </span>
          </FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "w-full h-11! rounded-lg bg-slate-50/50 border-slate-200 focus:bg-white transition-all cursor-pointer",
                  className,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent
              className="min-w-(--radix-select-trigger-width) rounded-lg"
              searchable={searchable}
            >
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {helperText && (
            <span className="text-gray-500 text-xs ml-2">{helperText}</span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Select or Input Field
interface SelectOrInputFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  options: SelectOption[];
  placeholder?: string;
  customInputPlaceholder?: string;
  customLabel?: string;
  backButtonLabel?: string;
  isLoading?: boolean;
  loadingText?: string;
  onCustomModeChange?: (isCustom: boolean) => void;
  customModeFieldName?: Path<T>;
  searchable?: boolean;
}

export function SelectOrInputField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  helperText,
  options,
  placeholder = "-- Select or Add Custom --",
  customInputPlaceholder = "Enter custom value",
  customLabel = "+ Add Custom",
  backButtonLabel = "Back to selection",
  isLoading = false,
  loadingText = "Loading options...",
  className,
  onCustomModeChange,
  customModeFieldName,
  searchable,
  disabled,
}: SelectOrInputFieldProps<T>) {
  const [internalCustomMode, setInternalCustomMode] = useState(false);

  const customModeValue = useWatch({
    control,
    name: customModeFieldName as Path<T>,
    disabled: !customModeFieldName,
  });

  const isCustomMode =
    customModeFieldName && typeof customModeValue === "boolean"
      ? customModeValue
      : internalCustomMode;

  const handleCustomModeChange = (isCustom: boolean) => {
    setInternalCustomMode(isCustom);
    onCustomModeChange?.(isCustom);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-bold text-slate-700">
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            <div className="space-y-3">
              {isLoading ? (
                <div className="h-11 flex items-center justify-center bg-slate-50/50 rounded-lg border border-slate-200">
                  <span className="text-sm text-slate-500">{loadingText}</span>
                </div>
              ) : !isCustomMode ? (
                <Select
                  value={field.value as string}
                  onValueChange={(value) => {
                    if (value === "__custom__") {
                      handleCustomModeChange(true);
                      field.onChange("");
                    } else {
                      handleCustomModeChange(false);
                      field.onChange(value);
                    }
                  }}
                  disabled={disabled}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full h-11! rounded-lg bg-slate-50/50 border-slate-200 focus:bg-white transition-all cursor-pointer",
                      className,
                    )}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent
                    className="min-w-(--radix-select-trigger-width) rounded-lg"
                    searchable={searchable}
                  >
                    <SelectItem
                      value="__custom__"
                      className="cursor-pointer font-semibold text-primary-600 border-b mb-2 pb-2"
                    >
                      {customLabel}
                    </SelectItem>

                    {options.length === 0 ? (
                      <SelectItem
                        value="__empty__"
                        disabled
                        className="text-gray-400 italic cursor-not-allowed"
                      >
                        No options available
                      </SelectItem>
                    ) : (
                      options.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder={customInputPlaceholder}
                    value={(field.value as string) || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="h-11 rounded-lg bg-slate-50/50 border-slate-200 focus:bg-white transition-all placeholder:normal-case"
                    autoFocus
                    disabled={disabled}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleCustomModeChange(false);
                      field.onChange("");
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer transition-colors inline-flex items-center gap-1"
                  >
                    <span>←</span>
                    <span>{backButtonLabel}</span>
                  </button>
                </div>
              )}
            </div>
          </FormControl>

          {helperText && (
            <span className="text-gray-500 text-xs ml-2">{helperText}</span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Date Field
interface DateFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
}

export function DateField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  helperText,
  placeholder = "Select date",
  disableFuture,
  disablePast,
  className,
  disabled,
}: DateFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-bold text-slate-700">
            <span>
              {label}
              {required && <span className="text-red-500">*</span>}
            </span>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal bg-slate-50/50 border-slate-200 hover:bg-white transition-all cursor-pointer",
                    !field.value && "text-muted-foreground",
                    className,
                  )}
                >
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    className="mr-2 h-4 w-4 text-primary-600"
                  />
                  {field.value ? format(field.value, "PPP") : placeholder}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => {
                  if (disableFuture && date > new Date()) return true;
                  if (disablePast && date < new Date()) return true;
                  if (disabled) return true;
                  return false;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {helperText && (
            <span className="text-gray-500 text-xs ml-2">{helperText}</span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Checkbox Field
interface CheckboxFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  description?: string;
}

export function CheckboxField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  disabled,
}: CheckboxFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-start space-x-3 space-y-0",
            className,
          )}
        >
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className="cursor-pointer"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm font-medium cursor-pointer">
              {label}
            </FormLabel>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

// Switch Field
interface SwitchFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  description?: string;
}

export function SwitchField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  disabled,
}: SwitchFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between rounded-lg border p-4",
            className,
          )}
        >
          <div>
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className="cursor-pointer"
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

// Radio Group Field
interface RadioGroupFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  options: RadioOption[];
}

export function RadioGroupField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  options,
  className,
  disabled,
}: RadioGroupFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-sm font-bold text-slate-700">
            <span>
              {label}
              {required && <span className="text-red-500">*</span>}
            </span>
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className={cn("flex flex-col space-y-2", className)}
              disabled={disabled}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <div className="space-y-0">
                    <FormLabel className="font-normal cursor-pointer">
                      {option.label}
                    </FormLabel>
                    {option.description && (
                      <p className="text-xs text-gray-500">
                        {option.description}
                      </p>
                    )}
                  </div>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Phone Field
interface PhoneFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  countries: CountryOption[];
  countryCodeField: Path<T>;
  placeholder?: string;
}

export function PhoneField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  countries,
  countryCodeField,
  placeholder,
  className,
  disabled,
}: PhoneFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-sm font-bold text-slate-700">
              <span>
                {label}
                {required && <span className="text-red-500">*</span>}
              </span>
            </FormLabel>
            <FormControl>
              <div className="flex w-full items-center h-11 rounded-lg border border-slate-200 bg-slate-50/50 overflow-hidden focus-within:ring-1 focus-within:ring-slate-400 focus-within:bg-white transition-all">
                <FormField
                  control={control}
                  name={countryCodeField}
                  render={({ field: countryField }) => (
                    <Select
                      value={countryField.value}
                      onValueChange={countryField.onChange}
                      disabled={disabled}
                    >
                      <SelectTrigger className="w-auto h-full border-0 shadow-none rounded-none focus:ring-0 flex items-center gap-2 bg-transparent px-3 cursor-pointer">
                        <SelectValue>
                          {(() => {
                            const selected = countries.find(
                              (c) => c.code === countryField.value,
                            );
                            return (
                              <div className="flex items-center gap-2">
                                {selected && (
                                  <Image
                                    src={`https://flagcdn.com/w20/${selected.flag}.png`}
                                    alt={selected.name}
                                    width={20}
                                    height={20}
                                    className="h-4 w-4 rounded-full object-cover"
                                  />
                                )}
                                <span className="text-sm font-medium">
                                  {selected?.code ?? countries[0]?.code}
                                </span>
                              </div>
                            );
                          })()}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem
                            key={country.code}
                            value={country.code}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <Image
                                src={`https://flagcdn.com/w20/${country.flag}.png`}
                                alt={country.name}
                                width={20}
                                height={20}
                                className="h-4 w-4 rounded-full"
                              />
                              <span className="font-medium">
                                {country.code}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {country.name}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <div className="h-6 w-px bg-slate-200" />

                <Input
                  {...field}
                  type="tel"
                  className={cn(
                    "border-0 h-full rounded-none focus-visible:ring-0 flex-1 bg-transparent px-4",
                    className,
                  )}
                  placeholder={placeholder}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .replace(/^0+/, "");
                    field.onChange(value);
                  }}
                  disabled={disabled}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

// Icon Field
interface IconFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  helperText?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function IconField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  helperText,
  placeholder = "Enter icon name",
  className,
  disabled,
}: IconFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-bold text-slate-700">
            <span>
              {label}
              {required && <span className="text-red-500">*</span>}
            </span>
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                className={cn(
                  "h-11 rounded-lg bg-slate-50/50 border-slate-200 focus:bg-white transition-all pr-10",
                  className,
                )}
                disabled={disabled}
                {...field}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 cursor-pointer transition-colors"
                    >
                      <HugeiconsIcon
                        icon={InformationCircleIcon}
                        className="w-4 h-4"
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-75 text-sm">
                    <p>
                      Find the icon name at{" "}
                      <a
                        href="https://hugeicons.com/icons"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white hover:underline font-semibold"
                      >
                        Hugeicons
                      </a>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </FormControl>
          {helperText && (
            <span className="text-gray-500 text-xs ml-2">{helperText}</span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  helperText?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  helperText,
  placeholder,
  className,
  disabled,
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-bold text-slate-700">
            <span>
              {label}
              {required && <span className="text-red-500">*</span>}
            </span>
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className={cn(
                  "h-11 rounded-lg bg-slate-50/50 border-slate-200 focus:bg-white transition-all pr-10",
                  className,
                )}
                disabled={disabled}
                {...field}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 cursor-pointer transition-colors"
              >
                <HugeiconsIcon
                  icon={showPassword ? ViewIcon : ViewOffSlashIcon}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </FormControl>
          {helperText && (
            <span className="text-gray-500 text-xs ml-2">{helperText}</span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface CustomFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  render: (field: {
    value: unknown;
    onChange: (value: unknown) => void;
  }) => ReactNode;
}

export function CustomField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  helperText,
  render,
}: CustomFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-bold text-slate-700">
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>{render(field)}</FormControl>
          {helperText && (
            <span className="text-gray-500 text-xs ml-2">{helperText}</span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

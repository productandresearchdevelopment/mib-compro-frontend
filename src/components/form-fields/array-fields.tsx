"use client";

import {
  Control,
  FieldValues,
  Path,
  useFieldArray,
  UseFormReturn,
} from "react-hook-form";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Delete02Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Textarea } from "../ui/textarea";

type HugeIconType = Parameters<typeof HugeiconsIcon>[0]["icon"];

interface SortableItemProps {
  id: string;
  children: ReactNode;
  isDraggable: boolean;
}

function SortableItem({ id, children, isDraggable }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !isDraggable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {isDraggable && (
        <div
          {...attributes}
          {...listeners}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <HugeiconsIcon icon={Menu01Icon} className="w-5 h-5" />
        </div>
      )}
      {children}
    </div>
  );
}

// Simple Array Field
interface SimpleArrayFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  valueKey: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  addButtonText?: string;
  addButtonIcon?: HugeIconType;
  removeButtonIcon?: HugeIconType;
  minItems?: number;
  maxItems?: number;
  itemPlaceholder?: (index: number) => string;
  className?: string;
  enableSorting?: boolean;
  multiline?: boolean;
  rows?: number;
}

export function SimpleArrayField<T extends FieldValues>({
  control,
  name,
  valueKey,
  label,
  required,
  placeholder,
  addButtonText = "Add Item",
  addButtonIcon = Add01Icon,
  removeButtonIcon = Delete02Icon,
  minItems = 0,
  maxItems = 10,
  itemPlaceholder,
  className,
  enableSorting = false,
  multiline = false,
  rows = 3,
}: SimpleArrayFieldProps<T>) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: name as never,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const effectiveMinItems = required ? Math.max(1, minItems) : minItems;

  const canRemoveItem = (index: number) => {
    if (required && index === 0) {
      return false;
    }
    return fields.length > effectiveMinItems;
  };

  const canDragItem = (index: number) => {
    if (!enableSorting) return false;
    if (required && index === 0) {
      return false;
    }
    return true;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      if (required && newIndex === 0) {
        return;
      }
      if (required && oldIndex === 0) {
        return;
      }

      move(oldIndex, newIndex);
    }
  };

  const content = (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <FormLabel className="text-sm font-bold text-slate-700">
          <span>
            {label}
            {required && <span className="text-red-500">*</span>}
          </span>
        </FormLabel>
        {fields.length < maxItems && (
          <button
            type="button"
            onClick={() => append({ [valueKey]: "" } as never)}
            className="flex items-center gap-2 h-8 px-3 rounded-lg font-semibold text-xs transition-all shadow-md bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
          >
            <HugeiconsIcon icon={addButtonIcon} className="w-4 h-4" />
            {addButtonText}
          </button>
        )}
      </div>

      <div
        className={cn(
          "space-y-2",
          enableSorting && fields.length > 0 && "pl-8",
        )}
      >
        {fields.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
            <p className="text-sm text-gray-500">
              No items added yet. Click &quot;{addButtonText}&quot; to get
              started.
            </p>
          </div>
        ) : (
          fields.map((field, index) => (
            <SortableItem
              key={field.id}
              id={field.id}
              isDraggable={canDragItem(index)}
            >
              <div
                className={cn(
                  "flex gap-2 items-start",
                  enableSorting &&
                    fields.length > 0 &&
                    !canDragItem(index) &&
                    "-ml-8",
                )}
              >
                <FormField
                  control={control}
                  name={`${name}.${index}.${valueKey}` as Path<T>}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        {multiline ? (
                          <Textarea
                            {...field}
                            rows={rows}
                            placeholder={
                              itemPlaceholder
                                ? itemPlaceholder(index)
                                : `${placeholder || "Enter value"} ${index + 1}`
                            }
                            className="min-h-20 rounded-lg bg-slate-50/50 border-slate-200 focus:bg-white transition-all resize-none"
                          />
                        ) : (
                          <Input
                            {...field}
                            placeholder={
                              itemPlaceholder
                                ? itemPlaceholder(index)
                                : `${placeholder || "Enter value"} ${index + 1}`
                            }
                            className="h-11 rounded-lg bg-slate-50/50 border-slate-200 focus:bg-white transition-all"
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {canRemoveItem(index) && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={cn(
                      "border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all active:scale-95 flex items-center justify-center cursor-pointer",
                      multiline ? "h-11 w-11 mt-0 self-start" : "h-11 w-11",
                    )}
                  >
                    <HugeiconsIcon
                      icon={removeButtonIcon}
                      className="w-4 h-4"
                    />
                  </button>
                )}
              </div>
            </SortableItem>
          ))
        )}
      </div>
    </div>
  );

  if (!enableSorting) {
    return content;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {content}
      </SortableContext>
    </DndContext>
  );
}

// Nested Array Field
interface NestedArrayFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  addButtonText?: string;
  addButtonIcon?: HugeIconType;
  removeButtonIcon?: HugeIconType;
  minItems?: number;
  maxItems?: number;
  itemLabel?: (index: number) => string;
  defaultValue: Record<string, unknown>;
  renderFields: (index: number) => ReactNode;
  className?: string;
  enableSorting?: boolean;
}

export function NestedArrayField<T extends FieldValues>({
  form,
  name,
  label,
  required,
  addButtonText = "Add Item",
  addButtonIcon = Add01Icon,
  removeButtonIcon = Delete02Icon,
  minItems = 0,
  maxItems = 10,
  itemLabel,
  defaultValue,
  renderFields,
  className,
  enableSorting = false,
}: NestedArrayFieldProps<T>) {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: name as never,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const effectiveMinItems = required ? Math.max(1, minItems) : minItems;

  const canRemoveItem = (index: number) => {
    if (required && index === 0) {
      return false;
    }
    return fields.length > effectiveMinItems;
  };

  const canDragItem = (index: number) => {
    if (!enableSorting) return false;
    if (required && index === 0) {
      return false;
    }
    return true;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      if (required && newIndex === 0) {
        return;
      }
      if (required && oldIndex === 0) {
        return;
      }

      move(oldIndex, newIndex);
    }
  };

  const content = (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <FormLabel className="text-sm font-bold text-slate-700">
          <span>
            {label}
            {required && <span className="text-red-500">*</span>}
          </span>
        </FormLabel>
        {fields.length < maxItems && (
          <button
            type="button"
            onClick={() => append(defaultValue as never)}
            className="flex items-center gap-2 h-8 px-3 rounded-lg font-semibold text-xs transition-all shadow-md bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
          >
            <HugeiconsIcon icon={addButtonIcon} className="w-4 h-4" />
            {addButtonText}
          </button>
        )}
      </div>

      <div
        className={cn(
          "space-y-4",
          enableSorting && fields.length > 0 && "pl-8",
        )}
      >
        {fields.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
            <p className="text-sm text-gray-500">
              No items added yet. Click &quot;{addButtonText}&quot; to get
              started.
            </p>
          </div>
        ) : (
          fields.map((field, index) => (
            <SortableItem
              key={field.id}
              id={field.id}
              isDraggable={canDragItem(index)}
            >
              <div
                className={cn(
                  "p-4 border border-gray-200 rounded-lg space-y-3",
                  enableSorting &&
                    fields.length > 0 &&
                    !canDragItem(index) &&
                    "-ml-8",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {itemLabel ? itemLabel(index) : `Item #${index + 1}`}
                  </span>
                  {canRemoveItem(index) && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      <HugeiconsIcon
                        icon={removeButtonIcon}
                        className="w-4 h-4"
                      />
                    </button>
                  )}
                </div>

                {renderFields(index)}
              </div>
            </SortableItem>
          ))
        )}
      </div>
    </div>
  );

  if (!enableSorting) {
    return content;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {content}
      </SortableContext>
    </DndContext>
  );
}

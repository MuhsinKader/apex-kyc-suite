import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const FormField = ({ 
  label, 
  required = false, 
  type = "text",
  placeholder,
  value,
  onChange,
  className = ""
}: FormFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-background border-input focus:border-primary focus:ring-primary/20"
      />
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  required?: boolean;
  placeholder: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SelectField = ({ 
  label, 
  required = false,
  placeholder,
  options,
  value,
  onChange,
  className = ""
}: SelectFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-background border-input focus:border-primary focus:ring-primary/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
